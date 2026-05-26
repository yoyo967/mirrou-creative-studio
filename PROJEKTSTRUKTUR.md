# Mirrou Creative Studio — Projektstruktur

## Ordner-Ubersicht

```
abschlussprojekt/
|
|-- 00_abschlussbericht/       Abschlussbericht + Projektsteuerung
|   |-- Abschlussbericht_Mirrou_Creative_Studio.md  (HAUPTDOKUMENT)
|   |-- abschlussbericht-struktur.md
|   |-- project-task-tracker.md
|   |-- project-briefing.md
|   |-- team-contributions.md
|   |-- mirrou_aufgabenverteilung_master.csv
|   +-- partners-tools.md
|
|-- 01_strategie/              Positionierung, Markt, ICPs, Pricing
|   |-- vision-mission.md
|   |-- positioning.md
|   |-- services.md / pricing.md
|   |-- icp-personas.md
|   |-- competitive-analysis.md
|   |-- market-overview.md
|   +-- ... (27 Dateien)
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
|-- 04_praesentationen/        HTML-Decks, PPTX, Prasentations-Notizen
|   |-- mirrou_final_presentation.html  (FINALE VERSION)
|   |-- Algorithm_of_Soul.pptx
|   +-- ... (11 Dateien)
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
+-- project x/                 React-Website (Vite + React 19 + TS)
    |-- src/components/        37+ React-Komponenten
    |-- src/routes/            16+ Seiten
    |-- src/locales/           8 Sprachen
    |-- dist/                  Gebaute statische Seite
    +-- Dockerfile + nginx     GCP Cloud Run Deployment
```

## Kritische Dateien

| Datei | Beschreibung |
|-------|-------------|
| `00_abschlussbericht/Abschlussbericht_Mirrou_Creative_Studio.md` | Hauptdokument (40-60 Seiten) |
| `04_praesentationen/mirrou_final_presentation.html` | Finale Abschlussprasentation |
| `project x/` | Live-Website mirrou.studio |

## Team

| Person | Rolle |
|--------|-------|
| Olha Yevtushenko | Founder & Creative Director |
| Denys Demyanyshyn | Performance & Analytics |
| Ralph Kindermann | CRM & Client Success |
| Yahya Yildirim | Growth, Inbound & Project Lead |
