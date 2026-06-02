# 🎯 Team-Briefing — Mirrou Creative Studio
## Vorbereitung auf die DCI-Abschlusspräsentation

**Präsentation / Abgabe:** 19.06.2026 · **Dozentin:** Steffany Fischer
**An:** Olha · Denys · Ralph · Yahya
**Ziel dieses Dokuments:** In ~90 Minuten seid ihr presentation-ready — ihr versteht **(1)** was Mirrou ist, **(2)** eure Rolle, **(3)** das GitHub-Repo, **(4)** die Fakten, die ihr auswendig könnt.

> Lest dieses Briefing **einmal ganz**, dann arbeitet die Checkliste in Abschnitt 5 ab.
> Wir präsentieren **keine Hausaufgabe**, sondern eine **live laufende, auditierte Agentur**.

---

## 1. Was ist Mirrou? (gemeinsames Verständnis in 5 Sätzen)

1. Mirrou Creative Studio ist ein **AI-natives Performance Creative Studio** für D2C-Beauty/Health/Lifestyle-Brands — **HQ Hamburg** (Produktion & Creative Direction) + **Studio Berlin** (Performance, AI & Growth).
2. Unser Claim ist **„Algorithm of Soul"**: algorithmische Präzision (CTR-Hypothesen, A/B-Testing, Data Feedback Loop) **+** kreative Intuition (editorial-grade „Dark Luxury"-Ästhetik). Website-Hero: *„Wo Ästhetik Algorithmus wird."*
3. Wir lösen **Creative Fatigue** — das strukturelle Problem, dass bis zu **70 % des Kampagnenerfolgs am Creative** hängen, während die Akquisekosten (CAC) zuletzt um bis zu **60 % gestiegen** sind.
4. Wir arbeiten als **Frontier Firm**: ein 4-Personen-Team orchestriert KI über den gesamten Stack und erreicht den Output eines 15–20-köpfigen klassischen Studios.
5. Das ist **kein Konzept** — die Website ist **live** unter **mirrou.studio**, EU-gehostet, mit Lighthouse-Desktop-Score **100/100/100/100**, und wir sind ab Tag 1 **EU AI Act-compliant**.

> **Fürs gemeinsame Auftreten:** Buch und Bericht erzählen jetzt **eine** kohärente Geschichte (Frontier Firm). Tretet selbstbewusst, aber ehrlich auf — das einzige offene Gap ist der erste bezahlte Kunde mit echten Live-Daten.
>
> ⚠️ **Ehrlichkeits-Regel (wichtig fürs Q&A):** Alle Case Studies — **Luminous Aura, Vitality Pulse, Essence Drift, Neural Glow** (Olha) und der **LumiSkin-Pilot** (Denys) — sind **konzeptionell bzw. Benchmark-basierte Simulationen**, keine realen Kundenergebnisse. Genau so präsentieren. Das ist **kein** Schwachpunkt: System, Stack, Methodik und die Live-Website stehen real — es fehlt nur der erste zahlende Kunde.

---

## 2. Eure Rollen & Positionen

### 👑 Olha Yevtushenko — Creative Director & Founder · Performance Marketing · Hamburg · 120 h / 29 %
- **Du verantwortest (alles real im Repo):** Dark-Luxury-Designsystem (Onyx + Gold — `02_brand/brand-assets.md`, live im Code), Brandbook (`02_brand/mirrou_branding_kit.md` + Live-`BrandBookPage`), **12 Logo-Varianten** (`02_brand/*.svg` + `visuals/mirrou-logo-*`), **25 Case-Visuals** (`public/images/cases/`) zu 4 **Demo-Brands** (Luminous Aura, Vitality Pulse, Essence Drift, Neural Glow — Neural Glow bewusst 100 % KI), hunderte produzierte Visuals (`visuals/`, `public/images/gallery/`), Hybrid Production.
- **Dein Merksatz:** „Jedes Asset, das das Studio verlässt, geht durch meine Direction. Das **Produkt wird nie KI-generiert** — nur die Welt drumherum."
- **Du präsentierst:** Brand Identity & das Creative-System (Hybrid Production) + die Case Studies — **und die Brücke Creative → Performance** (Data Feedback Loop).
- 📎 **Doppelrollen-Guide:** [`OLHA_DOPPELROLLE.md`](OLHA_DOPPELROLLE.md) — Performance-Grundlagen, Creative→Performance-Logik, Benchmarks, neue Q&A-Fragen.

### 📊 Denys Demyanyshyn — Performance & Analytics · Berlin · 80 h / 20 %
- **Du verantwortest:** Benchmark-Bibliothek (`01_strategie/benchmark-library.md`) und Platform Intelligence — **echte, ausgearbeitete Dateien**; die A/B-Testing-**Methodik** (Buch Kap. 7.5); den Data Feedback Loop als **Learning-Log-Template** (`05_sops_templates/template-learning-log.md` — Struktur steht, echte Zahlen kommen mit dem ersten Kunden); den **LumiSkin-Pilot als Benchmark-Simulation**; den KI-Literacy-Nachweis (`07_compliance/ki-literacy-nachweis.md`).
- **Dein Merksatz:** „Ich mache aus Kreativität eine **wiederholbare, messbare Engine**."
- **Du präsentierst:** Marktproblem (Creative Fatigue + Benchmarks), Methodik (5-Schritt-Algorithmus), den Pilot-Case **als Benchmark-basierte Simulation** (ehrlich benennen — noch keine Live-Daten).

### 🤝 Ralph Kindermann — CRM & Client Success · Berlin · 60 h / 15 %
- **Du verantwortest (real im Repo):** CRM/Pipeline (`01_strategie/mirrou_os_crm_ralph_optimiert.md`), Onboarding-System (`05_sops_templates/onboarding.md`), Retainer-SOP (`sop-retainer-management.md`), Kunden-Übergabestandard (`template-delivery-handover.md`), Redaktion/Konsistenz des Buches. **AVV:** als Rahmen/Kurzform dokumentiert (`07_compliance/legal-compliance.md` — Pflichtbestandteile Art. 28 DSGVO + Unterauftragsverarbeiter), **noch kein voll ausformulierter Mandanten-Vertrag** — so benennen.
- **Dein Merksatz:** „Ich sorge dafür, dass gute Arbeit **gehalten** wird — Retention ist günstiger als Neuakquise."
- **Du präsentierst:** Geschäftsmodell & Pricing, Team & Rollen, Onboarding/Retainer-Prozess, Förderperspektive.

### 🧠 Yahya Yildirim — Systems Architect & Growth Lead · Berlin · 150 h / 37 %
- **Du verantwortest (real im Repo):** die **Website selbst** (`src/` — 34 Komponenten, 30 Routen, 8 Sprachen, GCP, Lighthouse 100), Compliance-Architektur (`07_compliance/`), MCP-Stack (`.mcp.json` + `docs/DEVTOOLS_MCP.md`), Frontier-Firm-Architektur (Doku + `src/components/Frontier.tsx`), Positionierung/ICP, Growth/Outreach, Projektsteuerung. **Die 5 Perplexity-Spaces laufen extern in Perplexity** — im Repo liegen ihre Konfiguration/Skill-Prompts/Briefings (`06_perplexity_skills/`).
- **Dein Merksatz:** „Ich bin der **Architekt des Systems** — nicht nur der Agentur, sondern der Art, wie sie denkt und skaliert."
- **Du präsentierst:** Frontier-Firm-Architektur, Website/Tech (**Live-Demo!**), Compliance, Strategie & Ausblick.

> **Gesamtaufwand:** 410 h · 6 Wochen · 4 Personen.

---

## 3. Das GitHub-Repo erfassen — Lesereihenfolge (~90 Min)

Das Repo **ist** die Website **und** die komplette Projektdoku. Lest in dieser Reihenfolge:

| # | Datei / Ort | Warum | Priorität |
|---|-------------|-------|-----------|
| 1 | `CLAUDE.md` | 1-Seiten-Überblick: was, Stack, Konventionen | alle |
| 2 | `memory.md` → `AUDIT.md` | Strategie + echter Mess-/Gesundheitsstand (Lighthouse, Security) | alle |
| 3 | `00_abschlussbericht/AOS_AbschlussprojektBuch_KOMPLETT.md` | **Das Buch** — eure Hauptvorlage für die Folien | alle + eigenes Kapitel im Detail |
| 4 | `00_abschlussbericht/Abschlussbericht_Mirrou_Creative_Studio.pdf` | Formaler Bericht (Frontier-Firm-Struktur) | alle |
| 5 | `00_abschlussbericht/Deep_Audit_Report.pdf` | Investor-Audit — die stärksten Proof-Points | alle |
| 6 | `00_abschlussbericht/follow_ups/` | 5 Go-to-Market-Playbooks (Roadmap, ICP, Pricing, Vertrieb, 30-Tage) | Ralph / Yahya / Denys |
| 7 | **mirrou.studio** (live im Browser) | Durchklicken — DE/EN, alle Seiten, Trust Center | alle |
| 8 | `src/` | Der echte Code (nur grob: Routen, Komponenten, Locales) | Yahya |

> **Praktisch:** Repo klonen oder direkt auf GitHub durchklicken. Jede:r liest **mindestens** Punkt 1–3 + das **eigene Kapitel** gründlich.

---

## 4. Faktenblatt — das können alle auswendig

- **Positionierung:** AI-natives Performance Creative Studio · Frontier Firm · HQ Hamburg + Studio Berlin · Claim „Algorithm of Soul"
- **Live & Tech:** mirrou.studio · React 19 + Vite 6 + TypeScript + Tailwind v4 · statisch vorgerendert (vite-react-ssg) · GCP Cloud Run (Frankfurt, EU) · **8 Sprachen** · **345 vorgerenderte Seiten** · 280 Sitemap-URLs
- **Qualität:** Lighthouse **Desktop 100/100/100/100**, **Mobile 82/97/100/100** (gemessen 2026-06-02, Median aus 3 Läufen, Rev. `00046-bk4`) · **6/6 Security-Header** · 0 npm-Sicherheitslücken
- **Frontier Firm:** 4 Personen ≈ Output von 15–20 · 5 Perplexity-Spaces · MCP-Stack · „Perfect Twin" (Mensch + KI je Domäne)
- **Compliance:** **7 Schichten** — EU AI Act (volle Anwendung **2. Aug 2026**), KI-Labeling-Matrix, **C2PA**, DSGVO, Data Act, **HCVO**, 3-Jahres-Audit-Log
- **Methode:** 5-Schritt-Algorithmus — Creative Audit → Visual Brief → Hybrid Execution → Performance Layer → Data Feedback Loop · **9–20 Tage** (vs. 4–8 Wochen klassisch)
- **Pricing:** Shooting 1.5–3k € · Kampagnenset 2–5k € · Retainer S–L **2–15k €/Monat**
- **Markt:** D2C Beauty/Health DACH · Creative = bis **70 %** Kampagnenerfolg · CAC zuletzt **+60 %** · Rückenwind: EU AI Act + TikTok Shop DACH
- **Brand:** Dark Luxury — Onyx `#080808`, Gold `#C8A25A`, Ivory `#F2EFE9` · Cormorant Garamond + Inter + JetBrains Mono

> Wenn die Dozentin **einen** Satz hören will:
> **„Eine live laufende, EU-konforme Performance-Creative-Agentur mit Desktop-Lighthouse 100/100/100/100 in 8 Sprachen — gebaut von 4 Leuten in 6 Wochen."**

---

## 5. Präsentations-Vorbereitung — Checkliste

**Diese Woche, jede:r für sich:**
- [ ] Briefing ganz gelesen + **eigenes Kapitel** im Buch gründlich gelesen
- [ ] Repo überflogen (Lesereihenfolge oben) + Live-Site mirrou.studio durchgeklickt
- [ ] Faktenblatt (Abschnitt 4) sitzt — besonders die **eigenen** Zahlen
- [ ] Eigenen 3–4-Minuten-Part **frei** formulieren können (ohne Ablesen)
- [ ] 2–3 mögliche Dozentin-Fragen zum eigenen Bereich vorbereiten

**Vorschlag Präsentations-Split** (15 Min, anpassbar):
| Block | Inhalt | Lead |
|-------|--------|------|
| 1 · Hook & Problem | Creative Fatigue, Markt, „Warum jetzt" | Denys |
| 2 · Lösung & Brand | Algorithm of Soul, Dark Luxury, Hybrid Production, Cases | Olha |
| 3 · System & Tech | Frontier Firm, **Live-Website-Demo**, Compliance | Yahya |
| 4 · Business & Ausblick | Pricing, Geschäftsmodell, Förderung, nächste Schritte | Ralph |

**Gemeinsam (erst sobald Yahya zurück ist):**
- [ ] Folien bauen — ⏸️ **noch nicht starten**, wir machen das zusammen
- [ ] 1 voller Durchlauf mit Timing (Ziel ~15 Min)
- [ ] Q&A-Probe (jede:r verteidigt seinen Bereich)

---

## 6. Logistik
- **Präsentation / Abgabe:** 19.06.2026 · **Dozentin:** Steffany Fischer
- **Projektsprache der Doku:** Deutsch
- **Repo:** github.com/yoyo967/mirrou-creative-studio · **Live:** mirrou.studio
- **Koordination / Fragen:** Yahya (Projektlead)

> **Mindset:** Wir treten als Studio auf, nicht als Kursteilnehmer:innen. Vier Rollen, eine Engine, ein live laufendes Produkt. Das ist Mirrou Creative Studio.
