---
name: ki-literacy-nachweis
description: Mirrou Creative Studio – KI-Kompetenznachweis (AI Literacy) gemäß EU AI Act Art. 4
version: 1.0
---

# KI-Literacy-Nachweis — Mirrou Creative Studio

> Nachweis ausreichender KI-Kompetenz im Team gemäß **Art. 4 EU AI Act (VO 2024/1689)**,
> in Kraft seit 2. Februar 2025. Lebendes Dokument — wird bei Tool- oder Team-Änderungen
> fortgeschrieben. Stand: Juni 2026. Teil der 7-Schichten-Compliance-Architektur (Buch Kap. 12).

---

## 1. Zweck & Rechtsgrundlage

Art. 4 EU AI Act verpflichtet Anbieter **und** Betreiber von KI-Systemen, „nach besten Kräften
sicherzustellen, dass ihr Personal … über ein ausreichendes Maß an KI-Kompetenz verfügt".
Maßstab ist die Kompetenz, die für den **konkreten Einsatzkontext** erforderlich ist — keine
formale Zertifizierung. Dieses Dokument belegt diese Kompetenz für Mirrou Creative Studio.

## 2. Einordnung von Mirrou

- **Rolle:** Betreiber (Deployer) von KI-Systemen Dritter (Bildgenerierung, Recherche, Analyse) —
  Mirrou entwickelt **keine** eigenen KI-Modelle.
- **Risikoklasse:** ausschließlich **Limited Risk** (Art. 50) — visuelle Marketing-Inhalte;
  keine Hochrisiko-Anwendungen (kein Recruiting, kein Scoring, keine biometrische/medizinische KI).
- **Konsequenz:** Pflichten = Transparenz/Kennzeichnung (Art. 50) + KI-Kompetenz (Art. 4).
  Keine Konformitätsbewertung/Zertifizierung wie bei Hochrisiko-KI nötig.

## 3. Eingesetzte KI-Systeme

| System | Anbieter | Einsatzzweck bei Mirrou | Daten-/Rechtslage |
|--------|----------|--------------------------|-------------------|
| Claude (inkl. Claude Code) | Anthropic | Reasoning, Strategie, Web-Entwicklung, Doku | DPA/AVV verfügbar |
| Perplexity Spaces | Perplexity | Recherche & Wissens-OS (5 Spaces) | DPA/AVV verfügbar |
| Midjourney | Midjourney | KI-Hintergründe / Visual-Varianten | C2PA-Kennzeichnung |
| Adobe Firefly | Adobe | KI-Visuals (C2PA automatisch, kommerziell freigegeben) | Adobe-AVV |
| Runway ML | Runway | Video/Motion (bei Bedarf) | C2PA-Kennzeichnung |
| Meta / TikTok / Google Ads + GA4 | Plattformen | Performance-Analyse, A/B-Auswertung | Plattform-DPA |

Tool-Workflows sind dokumentiert in `05_sops_templates/sop-tooling-workflows.md`; jede Tool-Auswahl
folgt der 5-Kriterien-Entscheidungsmatrix (EU AI Act · DSGVO · Export-Pfad · MCP · GCP).

## 4. KI-Kompetenz im Team

| Person | Rolle | KI-Kompetenzschwerpunkt | Kompetenzgrundlage |
|--------|-------|--------------------------|--------------------|
| Denys Demyanyshyn | Performance & Analytics · **KI-Lead** | Modell-Grenzen, Prompting, KI-gestützte Creative-Analyse, Plattform-Algorithmen | DCI-Ausbildung + tägliche Produktionspraxis |
| Yahya Yildirim | Systems Architect | KI-Orchestrierung (Perplexity-Spaces, MCP, Claude Code), Tool-Governance, Compliance-Architektur | Aufbau des gesamten KI-Stacks |
| Olha Yevtushenko | Creative Director | Generative Bild-KI (Midjourney/Firefly), Hybrid-Workflow, Provenienz/C2PA | Produktion aller Visuals |
| Ralph Kindermann | CRM & Client Success | KI-gestütztes CRM/Reporting, Kunden-Transparenzkommunikation | Ops-/Playbook-Praxis |

## 5. Wie Kompetenz sichergestellt wird

1. **Formale Basis:** abgeschlossene DCI-Ausbildung im Online-Marketing (Grundlage digitaler Tool- und Datenkompetenz).
2. **Praxis:** dokumentierte, wiederholte Produktionsnutzung aller o. g. Systeme über das 6-Wochen-Projekt.
3. **Dokumentierte Workflows:** `sop-tooling-workflows.md`, KI-Labeling-Matrix (4 Stufen), C2PA-Konvention.
4. **Designierter KI-Lead:** Denys verantwortet Modell-Wissen, Grenzen und compliant-Einsatz im Team.
5. **Governance:** kein neues Tool ohne Prüfung gegen die 5-Kriterien-Tool-Matrix.

## 6. Verantwortlichkeiten

- **KI-Lead / Literacy:** Denys Demyanyshyn
- **KI-Architektur & Tool-Governance:** Yahya Yildirim
- **Kennzeichnung & Provenienz (C2PA, Labeling-Matrix):** Olha Yevtushenko
- **Kundenkommunikation zur KI-Transparenz:** Ralph Kindermann

## 7. Nachweis & Fortschreibung

- Dieses Dokument + `sop-tooling-workflows.md` + die KI-Labeling-Matrix bilden zusammen den Literacy-Nachweis.
- **Review:** halbjährlich sowie bei jeder Tool- oder Team-Änderung; spätestens vor dem **2. August 2026**
  (volle EU AI Act-Anwendbarkeit, Art. 50).
- Eingebettet in die 7-Schichten-Compliance-Architektur (Buch Kap. 12 · `AUDIT.md`).

---

*Lebendes Compliance-Dokument · Mirrou Creative Studio · Hamburg & Berlin*
