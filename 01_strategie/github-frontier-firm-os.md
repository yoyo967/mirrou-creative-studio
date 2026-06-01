---
name: github-frontier-firm-os
description: Mirrou Creative Studio – GitHub als Orchestration & Audit OS der Frontier Firm
version: 1.0
---

# GitHub als Orchestration & Audit OS – Mirrou Creative Studio
## Die fünfte Schicht der Frontier Firm

> GitHub ist bei Mirrou nicht „nur Versionskontrolle". Es ist die **unsichtbare Betriebs-
> schicht**, die die vier Tool-Layer (Intelligence · Production · Infrastructure · Performance)
> versioniert, orchestriert und auditierbar macht. Das Repository **ist** das Studio: jeder
> Zustand, jede Änderung, jede Freigabe — lückenlos nachvollziehbar.

---

## 1. Die These

Die klassische Frontier-Firm-Architektur von Mirrou hat vier Tool-Layer. Was sie verbindet,
ist nicht ein weiteres Tool, sondern ein **Substrat**: Git/GitHub. Es ist das
„Nervensystem", das Wissen, Code, Assets und Entscheidungen über alle Layer hinweg in
**einem versionierten, auditierbaren Strom** zusammenhält.

```
                ┌──────────────────────────────────────────────┐
   OS-LAYER ·   │  GITHUB · Orchestration & Audit OS           │
   GITHUB       │  Versionierung · Single Source of Truth ·    │
                │  Process-Engine (Actions) · Audit-Trail      │
                └───────────────────┬──────────────────────────┘
                                    │ verbindet & auditiert
   ┌────────────────┬───────────────┼───────────────┬────────────────┐
   │ L1 INTELLIGENCE│ L2 PRODUCTION │ L3 INFRA      │ L4 PERFORMANCE │
   │ Perplexity ·   │ Adobe · MJ ·  │ GCP · Drive · │ Meta · TikTok ·│
   │ Claude · Gemini│ Firefly·Runway│ CLI · MCP     │ Google · GA4   │
   └────────────────┴───────────────┴───────────────┴────────────────┘
```

---

## 2. Warum GitHub und nicht Notion/Asana/Drive

| Eigenschaft | GitHub | Klassische PM-Tools |
|-------------|--------|---------------------|
| Lückenlose Versionierung jeder Änderung | ✅ nativ (Git) | ⚠️ teils, nicht atomar |
| Audit-Trail (wer/wann/was) | ✅ jeder Commit | ⚠️ begrenzt |
| Approval-Gate vor nächstem Schritt | ✅ Pull Request | ⚠️ manuell |
| Automatisierung/Orchestrierung | ✅ Actions | ⚠️ Zapier/Make extern |
| Single Source of Truth | ✅ ein Repo | ❌ verteilt über 4–5 Tools |
| EU-AI-Act-Audit-Tauglichkeit | ✅ kryptografische History | ❌ |

**Frontier-Firm-Vorteil:** Während andere Teams Informationen zwischen Tools kopieren,
fließt bei Mirrou alles durch **ein** versioniertes System — kein Tool-Ping-Pong, kein
verlorener Stand, keine „welche Version ist final?"-Frage.

---

## 3. Die fünf Funktionen von GitHub bei Mirrou

### 3.1 Repository = Single Source of Truth
Das gesamte Studio liegt in einem Repo: die **Live-Website** (`src/`), die **gesamte
Strategie-/Wissensbasis** (39 MD-Dokumente), die **Compliance-Architektur** (`07_compliance/`),
die **Präsentationen** (inkl. `public/deck.html` → `mirrou.studio/deck`) und dieser Plan.
„Das Repo ist das Studio" ist keine Metapher — es ist der Betriebszustand.

### 3.2 Commits = Audit-Trail
Jede Änderung ist ein signierter Zeitstempel. Das deckt **direkt** die EU-AI-Act-Anforderung
eines 3-Jahres-Audit-Logs ab (Schicht 7 der Compliance-Architektur): KI-System-Beschreibung,
Output-Änderungen, Review-Schritte — alles in der Git-History rekonstruierbar.
**Commit-Konvention (Mirrou):**

```
feat(deck): …        Neues Feature / Asset
docs(buch): …        Dokumentation/Inhalt
creative(client): …  Creative-Asset hinzugefügt/überarbeitet
approve(campaign): … Freigabe dokumentiert
chore(audit): …      Governance-/Dossier-Update
fix(logo): …         Korrektur nach Feedback
```
Jeder Commit endet, wo sinnvoll, mit `Refs #<issue>` — lückenloser Briefing-to-Delivery-Trail.

### 3.3 Issues = Ticketsystem
Jeder Kundenbrief, jede Revision, jeder Deliverable wird ein **Issue** mit Labels
(`brief-ready`, `in-progress`, `review`, `approved`), Assignee und Milestone. Ersetzt
Asana/ClickUp ohne Tool-Wechsel.

### 3.4 Pull Requests = Approval-Gate
Ein Creative geht erst live, wenn der PR vom Lead (Olha/Yahya) **approved & gemerged** ist.
Das Merge ist das Signal, das die nächste Pipeline-Stufe auslöst. Freigabe ist damit
strukturell erzwungen, nicht „per Zuruf".

### 3.5 GitHub Actions = Process-Engine
Trigger (Push/PR/Issue/Cron) → Jobs → Artefakte/Deploys. Die orchestrierende Schicht.

---

## 4. Asset-Architektur (Code-Pointer + GCS)

Binär-Assets (PSD, AI, MP4, Highres) blähen Git auf. Mirrou-Prinzip: **Export-First** —
versioniert werden **Outputs**, nicht Arbeitsdateien; große Binaries leben in **GCS**
(das Mirrou ohnehin betreibt), das Repo hält Pointer + Registry.

```
GitHub Repo (Struktur · Pointer · asset-registry.json)
      ↕  (kleine Finals optional via Git LFS, sparsam)
GCS Bucket  mirrou-assets-prod   (Videos, Highres-Exports)
      ↕  GitHub Action (OIDC, kein statischer Key)
CDN / Cloud Run → Kunden-Delivery
```

- **Naming-Convention als Versionsachse:** `mirrou_<client>-<asset>_v2.0_approved.webp`
- **GCS-Sync:** GitHub Action synchronisiert nur geänderte `**/exports/**` zu GCS (OIDC/Workload Identity Federation statt Secret-Key)
- **asset-registry.json:** maschinenlesbarer Index (Client, Kampagne, Format, Status, GCS-URL, Issue-Ref) — von einer Action automatisch fortgeschrieben

---

## 5. Roadmap: Agentic Workflows (Perfect-Twin-Ausbaustufe)

GitHub führte 2026 **Agentic Workflows** ein (Markdown statt YAML, `gh aw`). Zielbild für
Mirrou — der KI-Agent als „Perfect Twin" im Repo:

```
Briefing-Formular → GitHub Issue (auto)
        ↓
Action/Agent: Claude-API → Copy + Bild-Prompts → als Issue-Kommentar
        ↓
Team-Review → PR approve
        ↓
Action: Assets → GCS, Delivery-Webhook an Kunde
```

Der Agent taggt Briefs, prüft PRs auf **Brand-Konsistenz**, eskaliert liegengebliebene
Issues. Das ist die operative Einlösung des Perfect-Twin-Prinzips auf Prozessebene.

**Erster PoC bereits im Repo:** [`.github/workflows/brief-to-copy.yml`](../.github/workflows/brief-to-copy.yml)
(Trigger: Issue-Label `brief-ready`) + Issue-Template `creative-brief.md`. Aus dem Brief
generiert Claude **3 Hook-Varianten + Primary Text + CTA** in Mirrou-Tonalität und postet
sie als Issue-Kommentar. Läuft nur bei bewusstem Label-Setzen; dormant bis `ANTHROPIC_API_KEY`
gesetzt ist — kein Auto-Lauf.

---

## 6. Status: live vs. Roadmap (ehrlich)

| Baustein | Status |
|----------|--------|
| Repo als Single Source of Truth (Website + Doku + Deck) | ✅ **live** |
| Commit-Audit-Trail (Git-History) | ✅ **live** |
| Commit-Konvention (`feat/docs/chore/fix…`) | ✅ **live** (in Nutzung) |
| **CI-Quality-Gate** (`.github/workflows/ci.yml` — typecheck/lint/build) | ✅ **live** (erster Actions-Schritt) |
| **Deploy-as-Action** (`deploy.yml`, OIDC → Cloud Run, ersetzt `deploy_gcp.ps1`) | 🟡 Workflow vorhanden · aktiv nach WIF-Setup (`docs/DEPLOY_OIDC_SETUP.md`) |
| **Agentic PoC** Brief-Issue → Claude-Copy (`brief-to-copy.yml` + Issue-Template) | 🟡 PoC vorhanden · dormant bis `ANTHROPIC_API_KEY` |
| Issues-als-Tickets · PRs-als-Approval-Gate | 🟡 Konvention definiert, Einführung pending |
| GCS-Asset-Sync (OIDC) · asset-registry.json | 🔵 Roadmap |
| LFS→GCS-Migration | 🔵 Roadmap (bei Asset-Volumen) |

> Deployment heute: noch `deploy_gcp.ps1`. Der OS-Schritt steht **bereit im Repo**:
> `deploy.yml` (OIDC → Cloud Run) — aktiv, sobald die einmalige WIF-Einrichtung erfolgt ist
> (`docs/DEPLOY_OIDC_SETUP.md`, ~5 gcloud-Befehle + 2 Repo-Secrets). Kein statischer Key.

---

## 7. Einordnung in die Frontier-Firm-DNA
- **Single Source of Truth:** ein Repo statt fünf verteilte Tools.
- **Perfect Twin:** GitHub ist das geteilte Gedächtnis von Mensch + KI — beide arbeiten am selben versionierten Zustand.
- **Compliance-by-Design:** die Git-History ist der Audit-Trail (EU AI Act Schicht 7).
- **EU-Souveränität:** GitHub-Repo + GCP-EU-Hosting; keine US-only Lock-ins (Export-Pfade offen, Data Act).

---

*Lebendes Architektur-Dokument · Teil der Frontier-Firm-Edition (siehe `partners-tools.md`).*
*Mirrou Creative Studio · Hamburg & Berlin.*
