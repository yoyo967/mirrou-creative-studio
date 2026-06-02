---
name: gcp-frontier-stack
description: Mirrou Creative Studio – GCP-Service-Landkarte des Frontier-Firm-Stacks (Infrastructure- & Intelligence-Layer), EU-first, mit verifiziertem Live-Stand und priorisierter Roadmap
version: 1.0
---

# GCP als Compute- & Intelligence-Substrat – Mirrou Creative Studio
## Die Service-Landkarte des Frontier-Firm-Stacks

> Wenn **GitHub das Orchestration- & Audit-OS** ist (siehe
> [`github-frontier-firm-os.md`](github-frontier-firm-os.md)), dann ist **GCP das
> Compute- & Intelligence-Substrat** darunter: wo Website, KI-Inferenz, Daten und
> Agenten *tatsächlich laufen* — EU-gehostet, auditierbar, ohne US-only Lock-in.
> Dieses Dokument ist die kanonische Landkarte: was heute läuft, was wir brauchen,
> in welcher Reihenfolge — und welche DSGVO-Fallen lauern.

**Leitprinzip (OPUS-PRIME):** Ein Dienst kommt nur dazu, wenn er einem konkreten
Business-Hebel dient — den zwei echten: **Performance-Creative** und **Lead-Gen /
„4 Leute = Output von 15–20"-Orchestrierung**. Keine „shiny agent tech" auf Vorrat.

---

## 1. Einordnung in die Frontier-Firm-Architektur

GCP bedient primär **L3 Infrastructure** und speist **L1 Intelligence**:

```
   OS-LAYER · GITHUB   (Orchestration & Audit — github-frontier-firm-os.md)
        │ deployt/auditiert via OIDC (keylos)
   ┌────┴───────────────────────────────────────────────────────┐
   │  GCP · Compute- & Intelligence-Substrat (europe-west*)       │
   │  Cloud Run · Vertex AI (Claude) · BigQuery · Firestore ·     │
   │  GCS · Pub/Sub · Secret Manager · Vertex AI Search           │
   └─────────────────────────────────────────────────────────────┘
        speist L1 Intelligence · trägt L3 Infra · liefert L4-Daten
```

Projekt: **`studio-4188712377-b3681`** · Haupt-Region **`europe-west3`** (Frankfurt) ·
Vertex-EU-Region **`europe-west1`**.

---

## 2. Was heute live ist (verifiziert 2026-06-02 via `gcloud`)

| Dienst | Zustand | Anmerkung |
|--------|--------|-----------|
| **Cloud Run** | ✅ live | `mirrou-creative-studio` (europe-west3) — die Website |
| **Cloud Build** | ✅ live | Image-Build für Deploys |
| **Vertex AI** (`aiplatform`) | ✅ aktiv | API an; **@claude-WIF/SA 2026-06-02 eingerichtet** (Sonnet 4.5 `europe-west1`) — siehe [`../docs/CLAUDE_VERTEX_SETUP.md`](../docs/CLAUDE_VERTEX_SETUP.md) |
| **BigQuery** | ✅ API aktiv | volle Suite aktiviert — **noch nicht** für Creative-/Ad-Daten genutzt |
| **Firestore** | ⚠️ aktiv, **US** | Default-DB liegt in **`us-central1`** → **für EU-PII ungeeignet** (s. §6) |
| **Pub/Sub** | ✅ API aktiv | für Event-/Orchestrierung verfügbar |
| **Cloud Storage** | ✅ (System) | nur Build/Run-System-Buckets — **kein `mirrou-assets-prod`** (Asset-OS noch Roadmap) |
| **Secret Manager** | ❌ aus | API noch nicht aktiviert |
| **Vertex AI Search** (`discoveryengine`) | ❌ aus | API noch nicht aktiviert |
| **Cloud Scheduler** | ❌ aus | API noch nicht aktiviert |

---

## 3. Die Service-Landkarte (priorisiert nach Business-Hebel)

### Tier 1 — jetzt, hängt an laufender Arbeit
| Dienst | Use-Case | EU-Hinweis | Status |
|--------|----------|-----------|--------|
| **Secret Manager** | Brevo-API-Key + Cloud-Run-Secrets (Kontaktformular) | global, Werte EU-unkritisch | API aktivieren |
| **Firestore (neue EU-DB)** | **EU-CRM-Store** für Kontaktformular Phase 2 ([`../docs/CONTACT_FORM_BACKEND.md`](../docs/CONTACT_FORM_BACKEND.md)) | **neue DB in `eur3`/`europe-west3`** — *nicht* die us-central1-Default | DB anlegen |
| **Cloud Run** | Lead-Endpoint + künftige Agent-Backends | europe-west3 | ✅ vorhanden |

### Tier 2 — größter unterschätzter Hebel
| Dienst | Use-Case | EU-Hinweis | Status |
|--------|----------|-----------|--------|
| **Vertex AI Search** | RAG über die **39 Wissensdokumente + Brand Book + SOPs** → „frag das Brand-Brain"; speist @claude & Team mit eigenem Wissen | `eu`-Multi-Region wählbar | API aktivieren |

### Tier 3 — Performance-Creative-Kern (Denys' Domäne)
| Dienst | Use-Case | EU-Hinweis | Status |
|--------|----------|-----------|--------|
| **BigQuery** | Warehouse für Ad-/Creative-Performance (Meta/Google/TikTok), Modellierung | `EU`-Multi-Region für Datasets | ✅ API aktiv |
| **Looker Studio** | Client-Dashboards auf BigQuery | — | startklar mit BQ |

### Tier 4 — echte Agenten & Orchestrierung
| Dienst | Use-Case | EU-Hinweis | Status |
|--------|----------|-----------|--------|
| **Vertex AI Agent Engine + ADK** | gemanagter Agent-Runtime — *nur mit Use-Case* (s. §5) | EU-Region prüfen | später |
| **Cloud Scheduler + Pub/Sub** | getaktete Workflows (nächtl. Research, Auto-Reports, Daten-Sync) | europe-west* | Scheduler aktivieren |
| **Cloud Storage** (`mirrou-assets-prod`) | Binär-Assets/Exports (siehe Asset-OS in github-frontier-firm-os.md §4) | europe-west3 | Bucket anlegen |

---

## 4. Grounding-Architektur — wichtige Korrektur

**Google-Search-Grounding auf Vertex ist Gemini-only.** Claude-Modelle bekommen es
**nicht**. Für „grounded" Antworten von eurem @claude gibt es drei Wege:

| Variante | Wie | Wann |
|----------|-----|------|
| **A · Claudes eigenes Web-Tool** | Anthropic-API-Pfad (wie `brief-to-copy.yml`) mit Web-Search-Tool | Live-Web nötig, schnell |
| **B · Hybrid** | Gemini-Schritt holt Grounding → Claude verarbeitet | wenn Google-Search-Qualität gebraucht wird |
| **C · Vertex AI Search (eigene Daten)** | RAG über eure Doku als Grounding-Quelle für Claude | **empfohlen** — eigenes Wissen, EU, kein US-Suchpfad |

**Empfehlung:** **C** als Default (eigenes Brand-/Wissens-Grounding, EU-konform), **A**
für Fälle mit echtem Live-Web-Bedarf. **B** nur, wenn Google-Search-Breite zwingend ist.

---

## 5. Konkrete Agenten-Use-Cases (bevor Agent Engine kommt)

Agent Engine/ADK lohnt **erst mit fixem Use-Case**. Top-Kandidaten für Mirrou:
1. **Lead-Qualifizierungs-Agent** — eingehender Brief/Lead → ICP-Score (gegen `icp-personas.md`) → Handlungsvorschlag. Direkter Anschluss an das Kontaktformular.
2. **Reporting-Agent** — Kampagnendaten (BigQuery) → Wochenreport in Mirrou-Tonalität.
3. **Brief→Konzept-Agent** — Ausbaustufe des `brief-to-copy.yml`-PoC: Brief → Copy **+ Bild-Prompts + Konzeptskizze**.

Jeder Agent bekommt seinen Audit-Trail über GitHub (Issue/PR/Commit) — Perfect-Twin-Prinzip.

---

## 6. EU / DSGVO / EU-AI-Act-Caveats

- 🔴 **Firestore-Default-DB liegt in `us-central1` (USA)** — für Prospect-PII (CRM)
  **nicht** verwenden. Neue Firestore-DB in `eur3`/`europe-west3` anlegen oder Cloud SQL EU.
- ⚖️ **Vertex-Claude EU:** `europe-west1` bestätigt (Sonnet 4.5); regionale/EU-Multi-Region-
  Endpoints halten Daten in der EU (ca. +10 % ggü. global).
- ⚖️ **Kundenseitige Agenten** brauchen KI-Transparenz-Kennzeichnung (KI-Labeling-Matrix,
  Compliance-Schicht — EU AI Act, volle Anwendung **2. Aug 2026**).
- 💸 **Kostendisziplin:** BigQuery, Agent Engine, Vertex AI Search können Kosten treiben →
  Cloud-Billing-Budgets + Alerts setzen.
- 🔑 **Keylos bleiben:** alle GitHub→GCP-Zugriffe via OIDC/WIF (kein statischer Key) — wie
  bei `deploy.yml`/`claude.yml` etabliert.

---

## 7. Priorisierte Roadmap (Empfehlung)

| # | Schritt | Warum zuerst |
|---|---------|--------------|
| 1 | **Secret Manager + EU-Firestore-DB** | eh für Kontaktformular-CRM (Phase 2) nötig; behebt den us-central1-PII-Fallstrick |
| 2 | **Vertex AI Search** über die Doku | sofort spürbarer Intelligenz-Gewinn für @claude + Team |
| 3 | **BigQuery** für Performance-Daten | API bereits aktiv; Geschäftskern (Performance-Creative) |
| 4 | **Agent Engine** | erst wenn Use-Case (Lead-Qual oder Reporting) fix ist |
| 5 | **Grounding** = Claude + Vertex AI Search | EU-konform statt Google-Search-Grounding |

---

*Lebendes Architektur-Dokument · Schwester zu [`github-frontier-firm-os.md`](github-frontier-firm-os.md).*
*Live-Stand verifiziert 2026-06-02 (OPUS PRIME). Mirrou Creative Studio · Hamburg & Berlin.*
