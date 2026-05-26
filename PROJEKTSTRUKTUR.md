# Mirrou Creative Studio — Projektstruktur

## Ordner-Ubersicht

```
abschlussprojekt/
|
|-- 00_abschlussbericht/       Abschlussbericht + Projektsteuerung + AOS-Buch
|   |-- Abschlussbericht_Mirrou_Creative_Studio.md  (HAUPTDOKUMENT ~50 Seiten)
|   |-- Abschlussbericht_Mirrou_Creative_Studio.pdf  (PDF-Export)
|   |-- abschlussbericht-struktur.md
|   |-- project-task-tracker.md
|   |-- project-briefing.md
|   |-- team-contributions.md
|   |-- mirrou_aufgabenverteilung_master.csv
|   |-- partners-tools.md
|   +-- AOS_Buch_Kapitel_*.md  (12 Kapitel + Komplett-Version)
|
|-- 01_strategie/              Positionierung, Markt, ICPs, Pricing, Businessplan
|   |-- vision-mission.md
|   |-- positioning.md
|   |-- services.md / pricing.md
|   |-- icp-personas.md
|   |-- competitive-analysis.md
|   |-- market-overview.md
|   |-- Businessplan.md
|   |-- AgenturKonzept.md
|   |-- Handout_Jobcenter.md
|   |-- VISUAL_PRODUCTION_PLAN.md
|   +-- ... (31 Dateien)
|
|-- 02_brand/                  Logo-System, Branding Kit, Case Studies
|   |-- mirrou_branding_kit.md
|   |-- mirrou_01_primary_dark.svg (+ Varianten)
|   +-- ... (12 Dateien)
|
|-- 03_deliverables_pdf/       Nummerierte Deliverables 01-12
|   |-- 01_mirrou_launch_proposal.pdf
|   |-- 02_mirrou_icp_research.pdf
|   |-- ... bis 12_mirrou_investor_deck.pdf
|   +-- Creative Layer PDFs
|
|-- 04_praesentationen/        Pitch Decks, HTML-Decks, PPTX, Notizen
|   |-- mirrou_final_presentation.html  (FINALE VERSION)
|   |-- Algorithm of Soul Pitch Deck.pdf
|   |-- Algorithm of Soul Pitch Deck (1).pptx
|   +-- ... (14 Dateien)
|
|-- 05_sops_templates/         SOPs, Templates, Onboarding
|   |-- sop-project-workflow.md
|   |-- sop-retainer-management.md
|   |-- template-creative-brief.md
|   +-- ... (21 Dateien)
|
|-- 06_perplexity_skills/      Perplexity Space Skills + Briefings
|   |-- skill.md (Mirrou HQ)
|   |-- strategy-intelligence-skill.md
|   |-- ops-playbooks-skill.md
|   +-- ... (17 Dateien)
|
|-- 07_compliance/             EU AI Act, DSGVO, Positionspapier
|   |-- Positionspapier_Compliance-Architektur.md
|   +-- legal-compliance.md
|
|-- 08_kursmaterial/           DCI-Kursdokumente, Aufgabenstellungen
|   +-- D03 2026 Abschliessendes Projekt...
|
|-- 09_medien/                 Videos, Audio, Portraits
|   +-- videoplayback.mp4, MP3s, HTM-Portraits
|
|-- src/                       Website-Quellcode (React 19 + Vite 6 + TS)
|   |-- components/            37+ React-Komponenten
|   |-- routes/                16+ Seiten
|   |-- locales/               8 Sprachen (DE/EN/ES/IT/FR/TR/RU/UK)
|   +-- content/               site-data.ts (Single Source of Truth)
|
|-- public/                    Statische Assets
|-- docs/                      Technische Dokumentation
|-- images/                    Bild-Assets
|-- visuals/                   Visual-Production-Assets
|-- scripts/                   Build- und Deployment-Skripte
|
|-- Dockerfile + nginx.conf    GCP Cloud Run Deployment
|-- package.json               Node.js Dependencies
+-- README.md                  Projekt-README (EN)
```

## Kritische Dateien

| Datei | Beschreibung |
|-------|-------------|
| `00_abschlussbericht/Abschlussbericht_Mirrou_Creative_Studio.md` | Hauptdokument (~50 Seiten) |
| `00_abschlussbericht/Abschlussbericht_Mirrou_Creative_Studio.pdf` | PDF-Export |
| `04_praesentationen/mirrou_final_presentation.html` | Finale Abschlussprasentation |
| `src/` | Live-Website mirrou.studio |
| `README.md` | Projekt-Uebersicht (EN) |
| `PROJEKTSTRUKTUR.md` | Dieses Dokument — Navigationsguide (DE) |

## Team

| Person | Rolle |
|--------|-------|
| Olha Yevtushenko | Founder & Creative Director |
| Denys Demyanyshyn | Performance & Analytics |
| Ralph Kindermann | CRM & Client Success |
| Yahya Yildirim | Growth, Inbound & Project Lead |
