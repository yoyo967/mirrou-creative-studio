import os
import re

brain_dir = r"C:\Users\HP\.gemini\antigravity\brain\9ad75e8c-7bcb-4273-8ab4-9910c8bb819c"

# Spacing and ligature cleanups
REPLACEMENTS = {
    # Ligatures
    "ﬀ": "ff",
    "ﬃ": "ffi",
    "ﬄ": "ffl",
    "ﬁ": "fi",
    "ﬂ": "fl",
    "Œ": "OE",
    "œ": "oe",
    "Æ": "AE",
    "æ": "ae",
    
    # OCR Spacing errors
    "A/B-T esting": "A/B-Testing",
    "A/B-T ests": "A/B-Tests",
    "A/B-T est": "A/B-Test",
    "V ersion": "Version",
    "W oche": "Woche",
    "W ochen": "Wochen",
    "F atigue": "Fatigue",
    "W ettbewerbsanalyse": "Wettbewerbsanalyse",
    "W ettbewerb": "Wettbewerb",
    "T ransparenz": "Transparenz",
    "T est-Struktur": "Test-Struktur",
    "W inner-Kombination": "Winner-Kombination",
    "Eﬀizienz": "Effizienz",
    "eﬀektive": "effektive",
    "eﬀiziente": "effiziente",
    "speziﬁschen": "spezifischen",
    "identiﬁzieren": "identifizieren",
    "V elocity": "Velocity",
    "A wareness": "Awareness",
    "F ormat": "Format",
    "F ormat-V arianten": "Format-Varianten",
    "F rühere": "Frühere",
    "T exture-Shots": "Texture-Shots",
    "V erantwortlich": "Verantwortlich",
    "Co-F ounder": "Co-Founder",
    "Co-F ounder": "Co-Founder",
    "Oﬀene": "Offene",
    "oﬀen": "offen",
    "veröﬀentlicht": "veröffentlicht",
    "Veröﬀentlichung": "Veröffentlichung",
}

# Luminous Aura Case Study Table Replacements
LUMINOUS_AURA_TABLES = [
    # 1. Kunden-Profil
    (
        "Attribut Detail\nBranche Premium Skincare / D2C\nStandort Deutschland\nProdukt Luxuriöses Serum mit natürlichen Inhaltsstoffen\nZielgruppe Frauen 25–40, urban, hohe Kaufkraft, Wert auf\nNachhaltigkeit\nMonatlicher Ad-Spend (vor MIRROU) ~25.000 €\nHerausforderung ROAS-Decline trotz Budget-Erhöhung,\nCreative-Fatigue nach 6 Wochen",
        "| Attribut | Detail |\n| :--- | :--- |\n| **Branche** | Premium Skincare / D2C |\n| **Standort** | Deutschland |\n| **Produkt** | Luxuriöses Serum mit natürlichen Inhaltsstoffen |\n| **Zielgruppe** | Frauen 25–40, urban, hohe Kaufkraft, Wert auf Nachhaltigkeit |\n| **Monatlicher Ad-Spend (vor MIRROU)** | ~25.000 € |\n| **Herausforderung** | ROAS-Decline trotz Budget-Erhöhung, Creative-Fatigue nach 6 Wochen |"
    ),
    # 2. Hypothesen
    (
        "# Hypothese Psychologischer\nMechanismus\nErwarteter Impact\n1 „Ritual-First”-Hook\noutperformt\n„Product-First”\nNeed for Self-Care,\nAspirational Lifestyle\nCTR +30%\n2 Makro-Texture-Shots\noutperformen\nLifestyle-Shots bei Cold\nAudience\nSensorische Aktivierung,\nCuriosity\nCTR +25%\n3 30-Tage-Transformation-\nStory outperformt\nEinzel-Produkt-Shot\nNarrative Transportation,\nHope\nCVR +20%\n4 ASMR-Style-Video\noutperformt\nStandard-Video\nImmersion, Authentizität VTR +40%",
        "| # | Hypothese | Psychologischer Mechanismus | Erwarteter Impact |\n| :-: | :--- | :--- | :---: |\n| **1** | „Ritual-First”-Hook outperformt „Product-First” | Need for Self-Care, Aspirational Lifestyle | CTR +30% |\n| **2** | Makro-Texture-Shots outperformen Lifestyle-Shots bei Cold Audience | Sensorische Aktivierung, Curiosity | CTR +25% |\n| **3** | 30-Tage-Transformation-Story outperformt Einzel-Produkt-Shot | Narrative Transportation, Hope | CVR +20% |\n| **4** | ASMR-Style-Video outperformt Standard-Video | Immersion, Authentizität | VTR +40% |"
    ),
    # 3. Creative-Varianten
    (
        "Variante Hook Visual Format Funnel-Stage\nA „The 2-Minute\nRitual”\nMakro-Texture +\nModel\n9:16 Video Awareness\nB „70% tragen Serum\nfalsch auf ”\nSplit-Screen\nEducational\n4:5 Static Awareness\nC „30 Tage: Von\ntrocken zu\nstrahlend”\nBefore/After\nTime-lapse\n9:16 Video Consideration\nD „Ihre neue\nMorgenroutine”\nLifestyle, natürliches\nLicht\n4:5 Static Conversion\nE „ Von der Natur. Für\nIhre Haut. ”\nEditorial Packshot 1:1 Static Conversion",
        "| Variante | Hook | Visual | Format | Funnel-Stage |\n| :-: | :--- | :--- | :---: | :---: |\n| **A** | „The 2-Minute Ritual” | Makro-Texture + Model | 9:16 Video | Awareness |\n| **B** | „70% tragen Serum falsch auf” | Split-Screen Educational | 4:5 Static | Awareness |\n| **C** | „30 Tage: Von trocken zu strahlend” | Before/After Time-lapse | 9:16 Video | Consideration |\n| **D** | „Ihre neue Morgenroutine” | Lifestyle, natürliches Licht | 4:5 Static | Conversion |\n| **E** | „Von der Natur. Für Ihre Haut.” | Editorial Packshot | 1:1 Static | Conversion |"
    ),
    # 4. Test-Struktur
    (
        "Test Variablen Budget Dauer Winner\nHook-Test A (Ritual) vs. B\n(Educational)\n500 €/Variante 7 Tage A (+32% CTR)\nVisual-Test A (Makro) vs. C\n(Before/After)\n500 €/Variante 7 Tage A (+28% CTR)\nFormat-Test 9:16 vs. 4:5 400 €/Variante 5 Tage 9:16 (+22% VTR)\nCTA-Test „Shop Now ”\nvs. „Discover Your\nRitual”\n300 €/Variante 5 Tage „Discover”(+18%\nCTR)",
        "| Test | Variablen | Budget | Dauer | Winner |\n| :--- | :--- | :---: | :---: | :--- |\n| **Hook-Test** | A (Ritual) vs. B (Educational) | 500 €/Variante | 7 Tage | A (+32% CTR) |\n| **Visual-Test** | A (Makro) vs. C (Before/After) | 500 €/Variante | 7 Tage | A (+28% CTR) |\n| **Format-Test** | 9:16 vs. 4:5 | 400 €/Variante | 5 Tage | 9:16 (+22% VTR) |\n| **CTA-Test** | „Shop Now” vs. „Discover Your Ritual” | 300 €/Variante | 5 Tage | „Discover” (+18% CTR) |"
    ),
    # 5. Performance-Metriken (combining part 1 and part 2)
    (
        "Metrik Vor MIRROU Nach MIRROU (Tag\n90)\nVeränderung\nROAS 2,1× 4,8× +129%\nCTR 1,8% 3,4% +89%\nCVR 2,2% 3,1% +41%\nCPM 8,50 € 6,20 € -27%\n\nTable 5 – continued\nMetrik Vor MIRROU Nach MIRROU (Tag\n90)\nVeränderung\nCreative Velocity 8/Monat 42/Monat +425%\nCreative\nFatigue-Zeit\n4 Wochen 8+ Wochen +100%\nA/B-Test-Rate 0% 100% Neu\nEU AI\nAct-Compliance\nUnbekannt 100% Neu",
        "| Metrik | Vor MIRROU | Nach MIRROU (Tag 90) | Veränderung |\n| :--- | :---: | :---: | :---: |\n| **ROAS** | 2,1× | 4,8× | +129% |\n| **CTR** | 1,8% | 3,4% | +89% |\n| **CVR** | 2,2% | 3,1% | +41% |\n| **CPM** | 8,50 € | 6,20 € | -27% |\n| **Creative Velocity** | 8/Monat | 42/Monat | +425% |\n| **Creative Fatigue-Zeit** | 4 Wochen | 8+ Wochen | +100% |\n| **A/B-Test-Rate** | 0% | 100% | Neu |\n| **EU AI Act-Compliance** | Unbekannt | 100% | Neu |"
    ),
    # 6. Business Impact
    (
        "Metrik Wert\nZusätzlicher monatlicher Umsatz (durch\nROAS-Steigerung)\n~37.500 €\nEinsparungen durch interne Creative-Produktion ~8.000 €/Monat (1 FTE Designer)\nGesamter ROI auf MIRROU-Investment 412% (über 90 Tage)\nPayback-Periode 6 Wochen",
        "| Metrik | Wert |\n| :--- | :--- |\n| **Zusätzlicher monatlicher Umsatz (durch ROAS-Steigerung)** | ~37.500 € |\n| **Einsparungen durch interne Creative-Produktion** | ~8.000 €/Monat (1 FTE Designer) |\n| **Gesamter ROI auf MIRROU-Investment** | 412% (über 90 Tage) |\n| **Payback-Periode** | 6 Wochen |"
    ),
    # 7. Skalierbarkeit
    (
        "Phase Zeitaufwand Team-Bedarf\nAnalyse & Hypothesen 3–5 Tage 1 Strategist + 1 Data Analyst\nProduktion 5–7 Tage 1 Creative Lead + 1 Photographer\n+ 1 KI-Operator\nA/B-Testing 14–21 Tage 1 Performance Manager\nOptimierung & Skalierung 7–14 Tage 1 Strategist + 1 Performance\nManager\nGesamt 29–47 Tage 3–4 Personen",
        "| Phase | Zeitaufwand | Team-Bedarf |\n| :--- | :---: | :--- |\n| **Analyse & Hypothesen** | 3–5 Tage | 1 Strategist + 1 Data Analyst |\n| **Produktion** | 5–7 Tage | 1 Creative Lead + 1 Photographer + 1 KI-Operator |\n| **A/B-Testing** | 14–21 Tage | 1 Performance Manager |\n| **Optimierung & Skalierung** | 7–14 Tage | 1 Strategist + 1 Performance Manager |\n| **Gesamt** | **29–47 Tage** | **3–4 Personen** |"
    ),
    # 8. Anwendbarkeit
    (
        "Brand-Typ Warum relevant?\nPremium Skincare D2C Identische Zielgruppe und Pain Points\nClean Beauty / Naturkosmetik Ähnliche Werte-Positionierung\nLifestyle-Brand mit Self-Care-Fokus Gleiche psychologischen Trigger\nBrand mit ROAS-Decline Identische Herausforderung\nBrand mit Creative-Bottleneck Identische operative Herausforderung",
        "| Brand-Typ | Warum relevant? |\n| :--- | :--- |\n| **Premium Skincare D2C** | Identische Zielgruppe und Pain Points |\n| **Clean Beauty / Naturkosmetik** | Ähnliche Werte-Positionierung |\n| **Lifestyle-Brand mit Self-Care-Fokus** | Gleiche psychologischen Trigger |\n| **Brand mit ROAS-Decline** | Identische Herausforderung |\n| **Brand mit Creative-Bottleneck** | Identische operative Herausforderung |"
    )
]

# Vitality Pulse Case Study Table Replacements
VITALITY_PULSE_TABLES = [
    # 1. Kunden-Profil
    (
        "Attribut Detail\nBranche Health & Wellness / Nahrungsergänzung / D2C\nStandort Deutschland\nProdukt Premium Nahrungsergänzungsmittel (Vitamine,\nAdaptogene)\nZielgruppe Männer & Frauen 28 –45, health-conscious, urban,\nbusy professionals\nMonatlicher Ad-Spend (vor MIRROU) ~18.000 €\nHerausforderung Erste Paid-Social-Kampagne, keine\nCreative-Erfahrung, hohe CAC",
        "| Attribut | Detail |\n| :--- | :--- |\n| **Branche** | Health & Wellness / Nahrungsergänzung / D2C |\n| **Standort** | Deutschland |\n| **Produkt** | Premium Nahrungsergänzungsmittel (Vitamine, Adaptogene) |\n| **Zielgruppe** | Männer & Frauen 28–45, health-conscious, urban, busy professionals |\n| **Monatlicher Ad-Spend (vor MIRROU)** | ~18.000 € |\n| **Herausforderung** | Erste Paid-Social-Kampagne, keine Creative-Erfahrung, hohe CAC |"
    ),
    # 2. Hypothesen
    (
        "# Hypothese Psychologischer\nMechanismus\nErwarteter Impact\n1 „Science-First”-Hook\noutperformt\n„Discount-First”\nAuthority Bias, Need for\nEvidence\nCTR +25%\n2 „Energy-Transformation”\n-Story outperformt\nProdukt-Feature\nTransformation Narrative,\nHope\nCVR +30%\n3 UGC-Style-Video\noutperformt\nhochproduziertes Video\nSocial Proof, Authenticity CTR +20%\n4 „Morning Routine ”\n-Context outperformt\nisoliertes Produkt\nHabit Formation,\nRelatability\nVTR +35%",
        "| # | Hypothese | Psychologischer Mechanismus | Erwarteter Impact |\n| :-: | :--- | :--- | :---: |\n| **1** | „Science-First”-Hook outperformt „Discount-First” | Authority Bias, Need for Evidence | CTR +25% |\n| **2** | „Energy-Transformation”-Story outperformt Produkt-Feature | Transformation Narrative, Hope | CVR +30% |\n| **3** | UGC-Style-Video outperformt hochproduziertes Video | Social Proof, Authenticity | CTR +20% |\n| **4** | „Morning Routine”-Context outperformt isoliertes Produkt | Habit Formation, Relatability | VTR +35% |"
    ),
    # 3. Creative-Varianten
    (
        "Variante Hook Visual Format Funnel-Stage\nA „Backed by Science:\n23 Clinical Studies ”\nIngredient-Makro +\nGraph\n4:5 Static Awareness\nB „From 3pm Crash to\nAll-Day Energy ”\nSplit-Screen Before/\nAfter\n9:16 Video Awareness\nC „How I Fixed My\nEnergy in 30 Days ”\nUGC-Style\nTestimonial\n9:16 Video Consideration\nD „Your New Morning\nRoutine: 30\nSeconds”\nLifestyle, Kaffee +\nSupplement\n4:5 Static Conversion\n\nTable 3 – continued\nVariante Hook Visual Format Funnel-Stage\nE „Clean Ingredients.\nReal Results. ”\nEditorial Packshot +\nZertifikate\n1:1 Static Conversion",
        "| Variante | Hook | Visual | Format | Funnel-Stage |\n| :-: | :--- | :--- | :---: | :---: |\n| **A** | „Backed by Science: 23 Clinical Studies” | Ingredient-Makro + Graph | 4:5 Static | Awareness |\n| **B** | „From 3pm Crash to All-Day Energy” | Split-Screen Before/After | 9:16 Video | Awareness |\n| **C** | „How I Fixed My Energy in 30 Days” | UGC-Style Testimonial | 9:16 Video | Consideration |\n| **D** | „Your New Morning Routine: 30 Seconds” | Lifestyle, Kaffee + Supplement | 4:5 Static | Conversion |\n| **E** | „Clean Ingredients. Real Results.” | Editorial Packshot + Zertifikate | 1:1 Static | Conversion |"
    ),
    # 4. Test-Struktur
    (
        "Test Variablen Budget Dauer Winner\nHook-Test A (Science) vs. B\n(Transformation)\n400 €/Variante 7 Tage B (+28% CTR)\nVisual-Test B (Before/After)\nvs. C (UGC)\n400 €/Variante 7 Tage C (+22% CTR)\nFormat-Test 9:16 vs. 4:5 300 €/Variante 5 Tage 9:16 (+30% VTR)\nCTA-Test „Shop Now ”\nvs. „Start Your\nRoutine”\n250 €/Variante 5 Tage „Start”(+20%\nCTR)",
        "| Test | Variablen | Budget | Dauer | Winner |\n| :--- | :--- | :---: | :---: | :--- |\n| **Hook-Test** | A (Science) vs. B (Transformation) | 400 €/Variante | 7 Tage | B (+28% CTR) |\n| **Visual-Test** | B (Before/After) vs. C (UGC) | 400 €/Variante | 7 Tage | C (+22% CTR) |\n| **Format-Test** | 9:16 vs. 4:5 | 300 €/Variante | 5 Tage | 9:16 (+30% VTR) |\n| **CTA-Test** | „Shop Now” vs. „Start Your Routine” | 250 €/Variante | 5 Tage | „Start” (+20% CTR) |"
    ),
    # 5. Performance-Metriken
    (
        "Metrik Vor MIRROU Nach MIRROU (Tag 90) Veränderung\nROAS 1,4× (erste Kampagne) 3,6× +157%\nCTR 1,2% 2,9% +142%\nCVR 1,5% 2,8% +87%\nCAC 85 € 42 € -51%\nCPM 9,20 € 7,10 € -23%\nCreative Velocity 0/Monat 38/Monat Neu\nBrand Awareness <5% 12% (gemessen via Brand\nLift Study)\n\n+140%\nEU AI\nAct-Compliance\nUnbekannt 100% Neu",
        "| Metrik | Vor MIRROU | Nach MIRROU (Tag 90) | Veränderung |\n| :--- | :---: | :---: | :---: |\n| **ROAS** | 1,4× (erste Kampagne) | 3,6× | +157% |\n| **CTR** | 1,2% | 2,9% | +142% |\n| **CVR** | 1,5% | 2,8% | +87% |\n| **CAC** | 85 € | 42 € | -51% |\n| **CPM** | 9,20 € | 7,10 € | -23% |\n| **Creative Velocity** | 0/Monat | 38/Monat | Neu |\n| **Brand Awareness** | <5% | 12% (via Brand Lift Study) | +140% |\n| **EU AI Act-Compliance** | Unbekannt | 100% | Neu |"
    ),
    # 6. Business Impact
    (
        "Metrik Wert\nZusätzlicher monatlicher Umsatz (durch\nROAS-Steigerung)\n~28.000 €\nEinsparungen durch effiziente\nCreative-Produktion\n~6.000 €/Monat\nGesamter ROI auf MIRROU-Investment 380% (über 90 Tage)\nPayback-Periode 7 Wochen",
        "| Metrik | Wert |\n| :--- | :--- |\n| **Zusätzlicher monatlicher Umsatz (durch ROAS-Steigerung)** | ~28.000 € |\n| **Einsparungen durch effiziente Creative-Produktion** | ~6.000 €/Monat |\n| **Gesamter ROI auf MIRROU-Investment** | 380% (über 90 Tage) |\n| **Payback-Periode** | 7 Wochen |"
    ),
    # 7. Methodik
    (
        "Phase Zeitaufwand Besonderheit\nAnalyse & Hypothesen 5–7 Tage Umfassende Markt- und\nKonkurrenz-Analyse\nProduktion 7–10 Tage UGC-Style erforderte authentische\nDarsteller\nA/B-Testing 14–21 Tage Konservativer Ansatz bei\nBudget-Limitierung\nOptimierung & Skalierung 14–21 Tage Langsameres Scaling bei erster\nKampagne\nGesamt 40–59 Tage —",
        "| Phase | Zeitaufwand | Besonderheit |\n| :--- | :---: | :--- |\n| **Analyse & Hypothesen** | 5–7 Tage | Umfassende Markt- und Konkurrenz-Analyse |\n| **Produktion** | 7–10 Tage | UGC-Style erforderte authentische Darsteller |\n| **A/B-Testing** | 14–21 Tage | Konservativer Ansatz bei Budget-Limitierung |\n| **Optimierung & Skalierung** | 14–21 Tage | Langsameres Scaling bei erster Kampagne |\n| **Gesamt** | **40–59 Tage** | — |"
    ),
    # 8. Anwendbarkeit
    (
        "Brand-Typ Warum relevant?\nEarly-Stage Health D2C Identische Herausforderung: Erste Kampagne, kein\nCreative\nWellness / Nahrungsergänzung Gleiche Zielgruppe und psychologischen Trigger\nClean Label / Science-Backed Ähnliche Werte-Positionierung\nBrand mit hohem CAC Identische Herausforderung: Effizienz steigern\nBrand mit Compliance-Bedenken Identische Sorge: EU AI Act, KI-Nutzung",
        "| Brand-Typ | Warum relevant? |\n| :--- | :--- |\n| **Early-Stage Health D2C** | Identische Herausforderung: Erste Kampagne, kein Creative |\n| **Wellness / Nahrungsergänzung** | Gleiche Zielgruppe und psychologische Trigger |\n| **Clean Label / Science-Backed** | Ähnliche Werte-Positionierung |\n| **Brand mit hohem CAC** | Identische Herausforderung: Effizienz steigern |\n| **Brand mit Compliance-Bedenken** | Identische Sorge: EU AI Act, KI-Nutzung |"
    )
]

def clean_content(content, filename):
    # 1. Global replacements (watermarks, extraction notices, ligatures)
    content = re.sub(r'Generated by Kimi\.ai\s*', '', content, flags=re.IGNORECASE)
    content = re.sub(r'>\s*\*\*HINWEIS:\*\*\s*Dieser Text wurde automatisch aus der PDF-Datei.*?\n', '', content)
    content = re.sub(r'^##\s*Seite\s*\d+.*?\n', '', content, flags=re.M)
    
    # Replace standard OCR spaces and ligatures
    for target, rep in REPLACEMENTS.items():
        # Match word bounds with possible whitespace in between
        pattern = re.escape(target)
        content = re.sub(pattern, rep, content)
    
    # 2. File-specific replacements (Tables & Images)
    basename = filename.lower()
    
    if "luminous_aura" in basename:
        # Apply Luminous Aura tables
        for target, rep in LUMINOUS_AURA_TABLES:
            content = content.replace(target, rep)
        
        # Inject images
        # Image 1 (Packshot) after Kunden-Profil table
        content = content.replace(
            "| **Herausforderung** | ROAS-Decline trotz Budget-Erhöhung, Creative-Fatigue nach 6 Wochen |",
            "| **Herausforderung** | ROAS-Decline trotz Budget-Erhöhung, Creative-Fatigue nach 6 Wochen |\n\n![Luminous Aura Premium Serum Packshot](visuals/Loumina%202.png)"
        )
        # Image 2 (Macro texture) after production phase
        content = content.replace(
            "3.2 Phase 2: Produktion (Woche 2–3)\nShooting-Plan:",
            "3.2 Phase 2: Produktion (Woche 2–3)\n\n![Luminous Aura Macro Ingredient Texture](visuals/Loumina%203.png)\n\nShooting-Plan:"
        )

    elif "vitality_pulse" in basename:
        # Apply Vitality Pulse tables
        for target, rep in VITALITY_PULSE_TABLES:
            content = content.replace(target, rep)
            
        # Inject images
        # Image 1 (Packshot) after Kunden-Profil table
        content = content.replace(
            "| **Herausforderung** | Erste Paid-Social-Kampagne, keine Creative-Erfahrung, hohe CAC |",
            "| **Herausforderung** | Erste Paid-Social-Kampagne, keine Creative-Erfahrung, hohe CAC |\n\n![Vitality Pulse Premium Nutrition Packshot](visuals/Vitality%20Pulse1.png)"
        )
        # Image 2 (Macro texture) after production phase
        content = content.replace(
            "3.2 Phase 2: Produktion (Woche 2–3)\nShooting-Plan:",
            "3.2 Phase 2: Produktion (Woche 2–3)\n\n![Vitality Pulse Macro Texture](visuals/Vitality%20Pulse4.png)\n\nShooting-Plan:"
        )

    elif "gtm_strategy" in basename:
        # Inject images into GTM strategy
        # Header image at top
        if not content.startswith("!["):
            content = "![Mirrou Creative Studio Go-To-Market Strategy Header](visuals/mirrou-logo-horizontal-2000x600%20(4).png)\n\n" + content
        # Stack workflow
        content = content.replace(
            "## 5. Technische Architektur & Infrastruktur",
            "## 5. Technische Architektur & Infrastruktur\n\n![OMM System OS 5-Layer Workflow](visuals/3beb031e-8d81-4a2f-a248-27ddb4e0ca9b.png)"
        )
        # Conversion loop
        content = content.replace(
            "## 2. A/B-Testing & Kampagnen-Iterationen",
            "## 2. A/B-Testing & Kampagnen-Iterationen\n\n![Conversion Loop Logic](visuals/6bbb083e-c0bd-4c3a-9221-1c1b779975ab.png)"
        )

    elif "creative_briefing" in basename:
        if not content.startswith("!["):
            content = "![Creative Shoot Styling Reference](visuals/Loumina%204.png)\n\n" + content

    elif "prompt_blueprints" in basename:
        if not content.startswith("!["):
            content = "![AI Generated Background Render](visuals/Loumina%206.png)\n\n" + content
        content = content.replace(
            "## 3. Wellness & Supplements Background Prompts",
            "## 3. Wellness & Supplements Background Prompts\n\n![AI Generated Wellness Background](visuals/Vitality%20Pulse%206.png)"
        )

    elif "asset_liste" in basename:
        if not content.startswith("!["):
            content = "![Mirrou Icon](visuals/mirrou-logo-icon-mr-512%20(1).png)\n\n" + content

    elif "abschlussbericht" in basename and "abschlussbericht_mirrou" in basename:
        if not content.startswith("!["):
            content = "![Mirrou Creative Studio Primary Logo](visuals/mirrou-logo-horizontal-2000x600%20(4).png)\n\n" + content
        content = content.replace(
            "## 5. Technische Architektur",
            "## 5. Technische Architektur\n\n![OMM System OS 5-Layer Workflow](visuals/3beb031e-8d81-4a2f-a248-27ddb4e0ca9b.png)"
        )
        
    return content

def run_polish():
    print(f">> Scanning directory: {brain_dir}")
    polished_count = 0
    for filename in os.listdir(brain_dir):
        if filename.endswith(".md"):
            filepath = os.path.join(brain_dir, filename)
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
                
            polished = clean_content(content, filename)
            
            if polished != content:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(polished)
                print(f"  [OK] Polished: {filename}")
                polished_count += 1
                
    print(f">> Polished {polished_count} files successfully.")

if __name__ == "__main__":
    run_polish()
