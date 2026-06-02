---
name: opus-magnum-project-os
description: Blueprint – Opus Magnum Media als Application-Cockpit ("Project OS") für Mirrou Studio · 3-Schichten-OS-Modell, EU-Reconciliation, Integration & Phasen-Roadmap
version: 1.0
---

# Opus Magnum als Mirrous Project OS – Blueprint

> **Zweck:** Festlegen, *wie* die bestehende Plattform **Opus Magnum Media**
> ([github.com/yoyo967/Opus-Magnum-Media-Porject-OS](https://github.com/yoyo967/Opus-Magnum-Media-Porject-OS))
> zum operativen **Bedien-Cockpit** von Mirrou Studio wird — ohne die drei „OS"-Begriffe
> zu vermischen und ohne Mirrous EU-first-Linie zu brechen.
> **Status:** Phase 0 (Blueprint) · 2026-06-02 · noch kein Umbau. Grundlage vor jeder Adoption.

---

## 1. Ausgangslage (verifiziert 2026-06-02)

**Opus Magnum Media** ist eine eigenständige, Gemini-getriebene Plattform — *nicht* nur eine
Website:

| Aspekt | Befund |
|--------|--------|
| Stack | React 19 + Vite + TS **SPA** (`@google/genai`, react-router v7) + Python-Backend |
| Live-Backend | `opus-magnum-ai-backend-…europe-west3.run.app` — **eigenes GCP-Projekt `923137317598`** (≠ Mirrou `180023265254`) |
| Umfang | ~40 „Operator/Agenten" (Stratege, Dirigent, Visionär, Analytiker, Orakel, Prometheus, Nexus, Markenwächter …) + Portfolio, Admin, Email-Marketing, Campaign-Tools |
| Herkunft | Yahyas Abschlussprojekt → „lebendes Portfolio"; reale Wirkung (Recruiter-Kontakt Campana & Schott, `PROJEKT_WIRKUNG.md`) |
| Vision | „Wo Strategie auf Kunst trifft" — Marketing-OS auf GCP/BigQuery/Vertex (7-Phasen-Plan in `VISION.md`) |
| Security | ✅ kein Secret im Repo (`.env.production` = nur öffentliche Backend-URL) |
| Hinweis | Repo-Name enthält Tippfehler „**Porject**" |

**Strategische Einordnung (memory.md):** Opus Magnum = das größere AI-OS-Ökosystem,
**Mirrou = ein Baustein darin.** Opus Magnum als Mirrous Cockpit ist die logische Einlösung
— die Markenphilosophien decken sich („Strategie trifft Kunst" ≈ „Algorithm of Soul").

---

## 2. Das kohärente 3-Schichten-OS-Modell

Damit nicht drei „OS"-Begriffe konkurrieren, gilt eine klare Rollenteilung:

```
┌─────────────────────────────────────────────────────────────┐
│ APP-LAYER · OPUS MAGNUM  — das Cockpit, in dem das Team klickt │
│   ~40 Agenten · Campaigns · Email · Portfolio · Admin         │
└───────────────────────────┬─────────────────────────────────┘
                            │ läuft auf
┌───────────────────────────┴─────────────────────────────────┐
│ COMPUTE-LAYER · GCP   (gcp-frontier-stack.md)                 │
│   Cloud Run · Vertex (Gemini/Claude) · BigQuery · Firestore   │
└───────────────────────────┬─────────────────────────────────┘
                            │ versioniert & auditiert via OIDC
┌───────────────────────────┴─────────────────────────────────┐
│ OS-LAYER · GITHUB   (github-frontier-firm-os.md)              │
│   Single Source of Truth · Audit-Trail · Actions · Approval   │
└───────────────────────────────────────────────────────────────┘
```

| Schicht | Rolle | „OS" im Sinne von |
|---------|-------|-------------------|
| **GitHub** | Versionierung, Audit-Trail, Orchestrierung (Actions) | *Governance-OS* |
| **GCP** | Compute, KI-Inferenz, Daten | *Infrastruktur-Substrat* |
| **Opus Magnum** | Bedienoberfläche, Agenten, operative Workflows | *Application-Cockpit* |

**Wo bleibt die Mirrou-Website?** Sie ist die **öffentliche Marken-/Akquise-Präsenz**
(SSG, Projekt `180023265254`) — ein eigenes Produkt. Opus Magnum ist das **interne
Cockpit**, in dem das Team operiert. Beide sind Mirrou, aber verschiedene Flächen.

---

## 3. EU-Reconciliation (nicht verhandelbar vor Adoption)

Opus Magnum ist heute tief im US-Google-Stack + die `VISION.md` nennt US-Tools. Bevor es
Mirrous OS wird, muss es auf Mirrous gehärtete EU-Linie gebracht werden:

| Bereich | Heute in Opus Magnum | EU-konforme Soll-Vorgabe (Mirrou) |
|---------|----------------------|-----------------------------------|
| KI-Inferenz | `@google/genai` (AI Studio ⇒ ggf. US) | Über **Vertex AI in EU-Region** (`europe-west*`) routen |
| E-Mail | VISION nennt **SendGrid/Mailchimp** (US) | **Brevo/Mailjet** (EU) — wie [`../docs/CONTACT_FORM_BACKEND.md`](../docs/CONTACT_FORM_BACKEND.md) |
| CRM | VISION nennt **HubSpot/Salesforce** (US) | EU-CRM / eigener EU-Store (Firestore `eur3`) |
| Data Warehouse | BigQuery | BigQuery **EU-Multi-Region**-Datasets |
| Firestore | (Projekt-Default oft `us-central1`) | **EU-DB (`eur3`/`europe-west3`)** — vgl. Mirrou-Flag |
| Analytics | GA4 | Consent-gated / server-side / EU-Alternative |
| KI-Outputs | Agenten generieren Content | **EU-AI-Act-Kennzeichnung** (KI-Labeling-Matrix, Schicht 7) |
| Backend-Region | ✅ bereits `europe-west3` | beibehalten |

---

## 4. Integration Mirrou ↔ Opus Magnum

**Zwei GCP-Projekte** (`923137317598` Opus Magnum · `180023265254` Mirrou). Empfehlung:
**föderieren statt fusionieren** — beide unter **einer GCP-Organisation**, geteilte
**WIF/OIDC**-Muster (keylos, wie `deploy.yml`/`claude.yml`), geteilter Secret-Manager-Standard,
konsolidiertes Billing + Budgets. (Vollständige Konsolidierung später optional.)

**Daten-Brücke (der eigentliche Mehrwert):**
```
Mirrou-Website  ─ Lead (Kontaktformular, EU)  ─►  Opus-Magnum-Cockpit
   (Brand)         docs/CONTACT_FORM_BACKEND.md      ├─ Lead-Qual-Agent (ICP-Score)
                                                     ├─ Analytiker (BigQuery/QFC-Daten)
                                                     └─ Berichterstatter (Reporting)
```
Das schließt direkt an offene Mirrou-Stränge an: den **Kontaktformular-EU-Backend** (Phase 2
CRM) und die **Agenten-Use-Cases** aus [`gcp-frontier-stack.md`](gcp-frontier-stack.md) §5
(Lead-Qual, Reporting).

**Governance:** GitHub-als-OS gilt für **beide** Repos — Commit-Audit-Trail, OIDC-keyless,
Commit-Konventionen. Das `CLAUDE.md` + `AUDIT.md` + `memory`-Muster wird auf das
Opus-Magnum-Repo ausgeweitet (eigene lebende Doku statt generischem AI-Studio-README).

---

## 5. Phasen-Roadmap

| Phase | Inhalt | Ergebnis |
|-------|--------|----------|
| **0 · Blueprint** *(dieses Doc)* | 3-Schichten-Modell, EU-Reconciliation, Integration definiert | Klares Zielbild |
| **1 · Hygiene & Audit** | Opus-Magnum-Repo: `CLAUDE.md`/`AUDIT.md`/`memory` einführen, Secret-/EU-Stack-Audit, README ersetzen, „Porject"-Tippfehler-Entscheidung | Auditierbarer, EU-bewerteter Stand |
| **2 · Rebrand** | Auf Mirrou branden (Onyx/Gold/Ivory, Claim „Algorithm of Soul"), Inhalte/Operatoren auf Mirrou-Use-Cases schärfen | Mirrou-Cockpit (Look & Inhalt) |
| **3 · Daten-Brücke** | Mirrou-Leads → Opus-Magnum (Lead-Qual); BigQuery/QFC-Daten → Analytiker/Berichterstatter | Echter operativer Nutzen |
| **4 · Go-Live als Cockpit** | EU-Deploy, Team-Onboarding (4 Personen), EU-AI-Act-Labeling live | Mirrou operiert auf dem OS |

---

## 6. Offene Entscheidungen (brauchen dich)

1. **GCP-Projekte:** föderieren (empfohlen) oder fusionieren?
2. **Identität:** Opus Magnum *als Mirrou rebranden* — oder als eigenständige Schwester-Marke
   im Ökosystem (Opus Magnum / LYGOX / Columna) führen und Mirrou nur *darin* abbilden?
3. **Repo-Tippfehler** „Porject" → umbenennen (sauberer Audit-Trail) ja/nein?
4. **Umfang Phase 2:** alle ~40 Operatoren übernehmen oder auf einen Mirrou-Kern (Stratege,
   Visionär, Analytiker, Markenwächter, Berichterstatter) reduzieren?

---

*Lebendes Architektur-Dokument · OS-Familie: [`github-frontier-firm-os.md`](github-frontier-firm-os.md) (Governance) · [`gcp-frontier-stack.md`](gcp-frontier-stack.md) (Compute) · dieses Doc (Application).*
*Stand 2026-06-02 (OPUS PRIME, verifiziert gegen das Opus-Magnum-Repo). Mirrou Creative Studio · Hamburg & Berlin.*
