---
name: legal-compliance
description: Mirrou Creative Studio – Rechtliche Grundlagen, AVV-Template, DSGVO-Checkliste, EU AI Act
version: 1.0
---

# Legal & Compliance – Mirrou Creative Studio

> Mirrou ist ab Tag 1 compliant. Dieses Dokument ist die interne Referenz für alle rechtlichen Anforderungen — kein Ersatz für Rechtsberatung, aber die operative Grundlage.

---

## Übersicht: Relevante Regulierungen

| Regulierung | In Kraft | Mirrou-Status |
|-------------|---------|--------------|
| **DSGVO** (EU 2016/679) | Seit Mai 2018 | ✅ Umgesetzt |
| **EU AI Act** (EU 2024/1689) | August 2026 (Hochrisiko-Pflichten) | ✅ Proaktiv umgesetzt |
| **Data Act** (EU 2023/2854) | September 2025 | ✅ Umgesetzt |
| **HCVO** (Health Claims Verordnung) | Laufend | ✅ In Creative Briefs integriert |
| **UrhG / Urheberrecht** | Laufend | ✅ Klare Regeln im Workflow |

---

## DSGVO-Compliance

### Was Mirrou umsetzt

| Maßnahme | Umsetzung |
|---------|-----------|
| **Hosting in EU** | GCP Cloud Run · europe-west3 (Frankfurt) |
| **IP-Anonymisierung** | Google Analytics 4 (IP anonymisiert, kein US-Transfer) |
| **Cookie-Einwilligung** | Cookie-Banner auf mirrou.studio |
| **Datenschutzerklärung** | Live auf mirrou.studio/datenschutz |
| **Impressum** | Live auf mirrou.studio/impressum |
| **AVV mit Kunden** | Standard in jedem Vertrag (siehe unten) |
| **Keine Kundendaten in KI-Prompts** | Interne Policy: Kundendaten niemals in Perplexity/Claude/Gemini ohne AVV-Grundlage |

### Auftragsverarbeitungsvertrag (AVV) — Kurzform

Wenn Mirrou personenbezogene Daten im Auftrag eines Kunden verarbeitet (z.B. Zugriff auf Ad Account, Kundendaten für Reporting):

**Pflichtbestandteile des AVV (Art. 28 DSGVO):**
- Gegenstand und Dauer der Verarbeitung
- Art und Zweck der Verarbeitung
- Art der personenbezogenen Daten
- Kategorien betroffener Personen
- Pflichten und Rechte des Verantwortlichen (Kunde)
- Technische und organisatorische Maßnahmen (TOMs)
- Unterauftragsverarbeiter (GCP, Perplexity — mit EU-AVV)

> **Mirrou-Policy**: Kein Projektstart ohne unterzeichneten AVV wenn Kundendaten verarbeitet werden.

**Wichtige Unterauftragsverarbeiter von Mirrou:**

| Anbieter | Dienst | AVV-Status |
|---------|--------|-----------|
| Google Cloud Platform | Hosting | ✅ Google Data Processing Terms |
| Google Analytics 4 | Analytics | ✅ Data Processing Amendment |
| Adobe Creative Cloud | Produktion | ✅ Adobe DPA |
| Perplexity AI | Intelligence | ⚠️ Enterprise-Plan prüfen |
| Anthropic (Claude) | AI | ⚠️ Enterprise-Plan prüfen |

---

## EU AI Act — Mirrous Compliance

### Was gilt ab August 2026

Der EU AI Act klassifiziert KI-Systeme in Risikostufen. Für Mirrous Creative-Produktion relevant:

| Anwendung | Risikostufe | Pflichten |
|-----------|------------|---------|
| KI-generierte Hintergründe in Werbung | Niedrig | Kennzeichnung |
| KI-generierte Personen/Models | Niedrig–Mittel | Deutliche Kennzeichnung |
| KI-generierter Text in Werbung | Niedrig | Kennzeichnung empfohlen |
| Vollständig KI-generierte Werbeanzeige | Niedrig | Kennzeichnung |

### Mirrous Kennzeichnungs-System

**C2PA-Metadaten** (Content Credentials):
- Adobe Firefly: automatisch C2PA-konform
- Midjourney: manuell via C2PA-Tool
- Runway ML: manuell

**Visuelle Kennzeichnung (Caption / Story):**

| KI-Anteil | Pflicht-Kennzeichnung | Mirrou-Standard |
|-----------|----------------------|-----------------|
| KI-Hintergrund | „KI-unterstützt" | ✅ In Delivery Handover dokumentiert |
| KI-generiertes Element | „Enthält KI-generierte Inhalte" | ✅ Standard |
| Vollständig KI-generiert | „KI-generiert" prominent | ✅ Standard |

**Dateinamens-Konvention (Mirrou-intern):**
```
brand_creative_v1_KI-bg.jpg      → KI-Hintergrund, Produkt echt
brand_creative_v1_KI-gen.jpg     → vollständig KI-generiert
brand_creative_v1_full-photo.jpg → vollständig fotografiert
```

**KI-Transparenzklausel im Kundenvertrag:**
```
Mirrou Creative Studio setzt bei der Produktion von Creatives KI-basierte
Werkzeuge ein. Alle KI-generierten oder KI-unterstützten Elemente werden
gemäß EU AI Act (Verordnung 2024/1689) gekennzeichnet. Der Auftraggeber
erklärt sich mit dieser Kennzeichnung einverstanden und verpflichtet sich,
die Kennzeichnungshinweise bei der Veröffentlichung zu übernehmen.
```

---

## Data Act — Compliance

Der Data Act (EU 2023/2854) regelt den Zugang zu und die Portabilität von Daten.

**Mirrous Umsetzung:**
- **Learning Logs**: Alle Kampagnen-Erkenntnisse sind in strukturierter Form (MD-Dateien) im Google Drive des Kunden gespeichert — vollständig portabel
- **Asset-Archive**: Alle produzierten Assets werden dem Kunden übergeben — kein Mirrou-Lock-in
- **Kein proprietäres Format**: Alle Dokumente in offenen Formaten (MD, PDF, PNG, JPG, MP4)

> **Mirrou-Policy**: Bei Retainer-Ende erhält der Kunde innerhalb von 14 Tagen das vollständige Asset-Archiv inkl. Learning Logs.

---

## HCVO (Health Claims Verordnung) — Für Health/Supplement-Kunden

Die HCVO regelt, welche Gesundheitsaussagen in Werbung gemacht werden dürfen.

**Mirrous Verantwortung:**
- Mirrou ist **nicht verantwortlich** für die inhaltliche Korrektheit von Health Claims — das ist Kundenpflicht
- Mirrou **weist aktiv darauf hin** wenn Claims problematisch erscheinen
- Im Creative Brief: Explizite Abfrage ob Health Claims geplant sind + Pflicht zur Beleg-Vorlage

**Checkliste für Health/Supplement-Kunden:**
- [ ] Alle Claims aus der EU-Health-Claims-Verordnung (Anhang) zulässig?
- [ ] Wissenschaftliche Belege für verwendete Claims vorhanden?
- [ ] Keine Krankheits-Heilungs-Versprechen (verboten gemäß HCVO Art. 7)
- [ ] Keine Aussagen über spezifische medizinische Wirkungen ohne klinische Belege

---

## Urheberrecht & Nutzungsrechte

| Situation | Regel |
|-----------|-------|
| Fotografierte Assets | Nutzungsrechte gehen nach vollständiger Zahlung auf Kunden über |
| KI-generierte Assets (Midjourney) | Midjourney Commercial License — Nutzungsrechte beim Käufer (Mirrou/Kunde) |
| KI-generierte Assets (Firefly) | Adobe Commercial License — rechtssicher für kommerzielle Nutzung |
| Musik in Videos | Lizenzfreie Musik verwenden (Artlist, Epidemic Sound) oder Kunde stellt |
| Stock-Fotos als Referenz | Niemals direkt verwenden — nur als Moodboard-Referenz |

---

## DSGVO-Checkliste (vor Projektstart)

- [ ] AVV unterschrieben (wenn Kundendaten verarbeitet werden)
- [ ] Zugriff auf Ad Account nur mit schriftlicher Genehmigung
- [ ] Keine Kundendaten in öffentliche KI-Prompts
- [ ] GCP europe-west3 als Hosting-Region bestätigt
- [ ] Google Analytics: IP-Anonymisierung aktiv
- [ ] Datenschutzerklärung auf mirrou.studio aktuell

## EU AI Act-Checkliste (vor jedem Delivery)

- [ ] KI-Anteil je Asset dokumentiert (in Delivery Handover)
- [ ] C2PA-Metadaten gesetzt (Firefly: automatisch, andere: manuell)
- [ ] Dateinamens-Konvention eingehalten
- [ ] KI-Transparenzklausel im Vertrag vorhanden
- [ ] Kunden-Briefing zur Kennzeichnung erfolgt
