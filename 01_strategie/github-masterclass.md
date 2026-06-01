---
name: github-masterclass
description: Mirrou Creative Studio – GitHub-Masterclass · Möglichkeiten, KI-Integrationen, OS-Vision (recherchiert, Stand Juni 2026)
version: 1.0
---

# GitHub-Masterclass für Mirrou
## Vom Repository zum Frontier-Firm-Betriebssystem

> Ziel: Dich zum **Meister** zu machen. Nach diesem Dokument verstehst du, was GitHub
> wirklich kann, welche KI-Integrationen 2026 existieren, wie GitHub für **Mirrou**
> zum Orchestrierungs- und Audit-OS wird — und du hast konkrete **Visionen** für die
> nächsten 12 Monate. Alle Fakten sind live recherchiert; Quellen am Ende.
> Ehrlich gekennzeichnet: ✅ heute nutzbar · 🔬 Technical Preview · 🔵 Mirrou-Roadmap.

---

## 0 · Die eine Kernidee

GitHub ist **kein** Betriebssystem im klassischen Sinn — aber für eine AI-native Agentur
wird es zum **Steuer-, Automatisierungs- und Audit-Layer**, der alles verbindet:

> **Das Repository ist das Studio.** Code, Wissen, Assets, Entscheidungen und Freigaben
> leben in *einem* versionierten, auditierbaren System. Darauf laufen Automatisierungen
> (Actions) und KI-Agenten (Claude, Copilot), die Kontext verstehen und handeln.

Drei Hebel, in dieser Reihenfolge zu meistern:
1. **Versionierung & Audit** (das Fundament — heute live)
2. **Automatisierung** (Actions als Process-Engine — CI heute live)
3. **KI-Agenten im Repo** (Claude Code Action, Agentic Workflows — der Frontier-Firm-Sprung)

---

## 1 · Die Plattform-Landkarte (was GitHub *wirklich* ist)

| Baustein | Was es ist | Mirrou-Nutzen |
|----------|------------|---------------|
| **Repositories + Git** | Versionierter Speicher mit lückenloser History | Single Source of Truth (Website, Doku, Deck, Compliance) |
| **Issues** | Tickets mit Labels, Assignees, Milestones | Kunden-Briefs, Revisionen, Deliverables |
| **Pull Requests** | Änderungs-Vorschläge + Review + Merge | **Approval-Gate**: Creative geht erst live nach Freigabe |
| **Projects** | Spreadsheet-artige Planungs-Canvas über Issues/PRs | Kanban/Pipeline pro Kunde, ersetzt Asana |
| **Actions** | CI/CD + beliebige Automatisierung (Trigger → Jobs) | Process-Engine: Build, Deploy, KI-Pipelines |
| **GitHub Advanced Security** | CodeQL, Secret Scanning, Dependabot | Audit-Readiness, keine Leaks |
| **Packages / Container Registry (ghcr.io)** | Docker-Images & Artefakte | Website-Images statt nur GCR |
| **Codespaces** | Cloud-Dev-Umgebung im Browser (Docker-VM) | Onboarding ohne lokales Setup, überall arbeiten |
| **Pages** | Statisches Hosting direkt aus dem Repo | Schnelle Microsites / Landingpages |
| **Releases** | Versionierte Auslieferungen + Changelogs | Deliverable-Pakete an Kunden |

> **Merksatz:** Issues = *was*, PRs = *Freigabe*, Actions = *Ausführung*, History = *Audit*.

---

## 2 · Die KI-native Schicht — das, was Mirrou zur Frontier Firm macht

### 2.1 ✅ Claude Code GitHub Action — euer wichtigster Hebel
Das offizielle `anthropics/claude-code-action@v1` lässt **Claude Code direkt im Repo
arbeiten** — auf GitHub-Runnern, ohne lokale Installation.

- **`@claude`-Mention** in einem Issue/PR-Kommentar → Claude analysiert Code, **erstellt
  Pull Requests, implementiert Features, fixt Bugs** — und folgt eurer `CLAUDE.md`.
- **Setup:** im Terminal `claude` öffnen → `/install-github-app` (führt durch App + Secrets).
- **Modelle:** Default Sonnet; **Claude Opus 4.8** via `--model claude-opus-4-8`.
- **Code-Review-Skill:** als Plugin einbindbar → automatische PR-Reviews auf jeden PR.
- **Auth — drei Wege:**
  1. Anthropic API-Key (`ANTHROPIC_API_KEY`-Secret) — einfachster Start.
  2. **Google Vertex AI** via Workload Identity Federation (`use_vertex: true`) — **keyless,
     läuft in eurem GCP, EU-Region wählbar.** ← *Der ideale Mirrou-Weg.*
  3. Amazon Bedrock (`use_bedrock: true`).

> **Warum das für Mirrou der Jackpot ist:** Ihr nutzt bereits Claude Code + `CLAUDE.md` +
> GCP. Mit Vertex-AI-Auth läuft Claude **als Teammitglied im Repo**, auf eurer eigenen
> EU-Cloud, ohne API-Key-Hygiene — exakt die „Perfect Twin"-Idee auf Prozessebene.

Minimal-Beispiel (reagiert auf `@claude`):
```yaml
name: Claude
on:
  issue_comment: { types: [created] }
  pull_request_review_comment: { types: [created] }
jobs:
  claude:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

### 2.2 ✅ GitHub Models — KI-Inferenz *ohne* eigenen Key
GitHub Models ist eine **OpenAI-kompatible Inferenz-API**, nutzbar **mit dem GitHub-Token**
(Scope `models:read`) — kein separater Account, kein Key. Modelle von OpenAI, Meta,
DeepSeek u.a. In Actions via `actions/ai-inference`. Prompts werden **wie Code versioniert**
(Diffs, Rollback), mit Playground und Evaluations.

> **Mirrou-Relevanz:** Der Agentic-Copy-PoC (`brief-to-copy.yml`) kann **GitHub Models**
> statt eines Anthropic-Keys nutzen — Null-Setup-Einstieg. Für Marken-Tonalität auf
> höchstem Niveau später auf Claude (Vertex) wechseln.

### 2.3 🔬 GitHub Agentic Workflows (`gh-aw`)
Seit **13. Februar 2026** in Technical Preview. Du schreibst Workflows in **Markdown**
(YAML-Frontmatter für Trigger/Permissions + natürliche Sprache als Instruktion); `gh aw
compile` erzeugt daraus eine `.lock.yml`, die GitHub Actions ausführt — ein **Copilot-
Agent** folgt den Instruktionen autonom. Sicherheits-Leitplanken: **Sandboxing, scoped
permissions, gated outputs** (nur freigegebene Aktionen erreichen GitHub).

> Anwendungsfälle für Mirrou: Issue-Triage, PR-Review auf Brand-Konsistenz, CI-Failure-
> Analyse, Repo-Pflege — in einfachem Markdown statt komplexem YAML.

### 2.4 🔬 Copilot Coding Agent
Ein autonomer Software-Engineering-Agent, der **im Hintergrund** eine zugewiesene Aufgabe
erledigt (wie ein Kollege) — startet sich eine eigene, via GitHub Actions betriebene
Dev-Umgebung. Separat von den Agentic Workflows.

### 2.5 ✅ GitHub MCP Server (Model Context Protocol)
MCP ist der **offene Standard** (von Anthropic initiiert), der KI-Modelle mit Tools/Daten
verbindet. Der **offizielle GitHub-MCP-Server** (von GitHub gepflegt) macht Repo, Issues,
PRs etc. für KI-Clients zugänglich — in IDE, CLI und Agenten. So „sieht" Claude/Copilot
euer Repo strukturiert.

> Ihr nutzt MCP bereits (Chrome DevTools MCP, Filesystem, GitHub) — der GitHub-MCP-Server
> ist der direkte Draht zwischen euren KI-Modellen und dem „Repo-als-Studio".

---

## 3 · Orchestrierung & Automatisierung

### GitHub Actions als Process-Engine ✅
Trigger (`push`, `pull_request`, `issues`, `schedule`/Cron, `workflow_dispatch`) → Jobs auf
Linux/Windows/macOS-Runnern → Artefakte/Deploys. **Live bei Mirrou:** `ci.yml`
(typecheck/lint/build auf jeden Push). **Bereitgestellt:** `deploy.yml` (OIDC→Cloud Run),
`brief-to-copy.yml` (agentic PoC).

### IssueOps & Projects-Automatisierung ✅
Das **IssueOps**-Muster: ein Issue (oder Label) triggert Workflows — CI/CD und mehr aus
Issues steuern. **Projects** haben eingebaute Automatisierungen (Status auf „Todo" beim
Hinzufügen, „Done" beim Schließen, Auto-Archivierung, Auto-Add per Filter). Für Nicht-
Coder anbindbar via Zapier/Make (Slack/Notion ↔ GitHub).

> **Mirrou-Bild:** Brief-Formular → Issue → Label `brief-ready` → KI-Copy-Entwurf →
> Review-PR → Merge → Deploy. Eine durchgehende, versionierte Pipeline.

---

## 4 · Sicherheit & Compliance als Audit-OS (Mirrous Compliance-Vorteil)

### OIDC / Workload Identity Federation ✅ — keyless Deploy
GitHub-Workflows holen ein **kurzlebiges OIDC-Token**, das Repo + Workflow eindeutig
identifiziert; GCP vertraut diesem Token via WIF → **kein statischer Service-Account-Key**.
Voraussetzung: `permissions: id-token: write`, voller Provider-Ressourcenname,
`google-github-actions/auth@v2`. (Genau so gebaut in `deploy.yml`; Setup in
`docs/DEPLOY_OIDC_SETUP.md`.)

### GitHub Advanced Security ✅
- **CodeQL Code Scanning** — findet Schwachstellen/Datenfluss-Probleme im Code.
- **Secret Scanning + Push Protection** — verhindert versehentlich committete API-Keys.
- **Dependabot** — Alerts + automatische Update-PRs bei verwundbaren Dependencies.
- Für **öffentliche** Repos teils gratis; für private = GitHub-Advanced-Security-Produkt.

### Environments, Branch Protection, Audit-Log ✅
- **Branch Protection / Rulesets:** PR-Pflicht, Review-Pflicht, Status-Checks vor Merge.
- **Environments:** geschützte Deploy-Ziele mit Required Reviewers + Environment-Secrets.
- **Audit-Log:** wer hat wann was geändert.

> **Der strategische Punkt für Mirrou:** Die Git-History + der Audit-Log **sind** die
> geforderte EU-AI-Act-3-Jahres-Audit-Dokumentation (Compliance-Schicht 7). Branch
> Protection erzwingt das „PR-als-Approval-Gate" technisch. Compliance fällt als
> **Nebenprodukt der Versionierung** ab — das kommuniziert kein Wettbewerber.

---

## 5 · Asset- & Infra-Bausteine

- **Container Registry (ghcr.io)** ✅ — Docker-Images im Repo-Ökosystem; nahtlos in
  Codespaces/Actions ziehbar. (Alternative/Ergänzung zu GCR.)
- **Codespaces** ✅ — Cloud-Dev-Umgebung im Docker-Container (2–32 Cores), aus Browser/
  VS Code/CLI; **Dev-Container als Config-as-Code** = reproduzierbares Setup für jedes
  Teammitglied/Freelancer. *Onboarding ohne „läuft bei mir nicht".*
- **Pages** ✅ — statisches Hosting direkt aus dem Repo (schnelle Microsites).
- **Git LFS vs. GCS:** Binär-Assets (PSD/AI/MP4) nicht roh ins Git. **Export-First** —
  Outputs versionieren, Quellen/Highres in **GCS** (`mirrou-assets-prod`); Repo hält
  Pointer + `asset-registry.json`. LFS nur sparsam für kleine Finals (Limits beachten:
  Free/Pro 10 GiB Storage + 10 GiB Bandbreite/Monat).

---

## 6 · Kosten & Limits (Pricing-Stand 2026)

| Plan | Actions-Minuten/Monat (privat) | Actions-Storage | Hinweis |
|------|-------------------------------|-----------------|---------|
| **Free** | 2.000 Linux-Min | 500 MB | öffentliche Repos: **Minuten gratis** |
| **Team** (~$4/User/Mo) | 3.000 Linux-Min | 2 GB | |
| **Enterprise** (~$21/User/Mo) | 50.000 Min | 50 GB | |

- **Jan 2026:** Runner-Preise um bis **−39 %** gesenkt (Linux $0,008 → **$0,006**/Min).
- **März 2026:** neue Plattform-Gebühr $0,002/Min für **self-hosted** Runner (zählt gegen Kontingent).
- **Mirrou-Realität:** CI (typecheck/lint/build) kostet pro Lauf wenige Minuten — bei
  eurem Volumen praktisch im Free/Team-Kontingent. Claude-Code-Action-Läufe verbrauchen
  zusätzlich **API-Tokens** (Claude) bzw. nichts extra (GitHub Models gratis-Tier).

---

## 7 · Der Mirrou-Bauplan: die 5-Schichten-OS + Reihenfolge

```
OS-LAYER · GITHUB   Repo=SSoT · Actions · Audit-Trail   ← versioniert & orchestriert alles
─────────────────────────────────────────────────────
L1 Intelligence · L2 Production · L3 Infra · L4 Performance
```

**Was heute live ist:** Repo-als-SSoT · Commit-Audit-Trail · CI-Quality-Gate (`ci.yml`).
**Bereit, aber dormant:** `deploy.yml` (OIDC), `brief-to-copy.yml` (agentic PoC).

**Empfohlene Reihenfolge der Meisterschaft (je 1 Schritt nach dem anderen):**
1. **Deploy als Action aktivieren** (OIDC-Setup, ~5 gcloud-Befehle) → manueller Deploy weg.
2. **Branch Protection** auf `main` (PR + grüner CI-Check Pflicht) → PR-Gate technisch erzwungen.
3. **Claude Code Action via Vertex** installieren (`@claude` im Repo, keyless, EU).
4. **Agentic Copy-PoC** scharf schalten (GitHub Models gratis ODER Claude/Vertex).
5. **Secret Scanning + Dependabot** an → Audit-Readiness.
6. **GCS-Asset-Sync-Action + asset-registry.json** → Asset-OS.
7. **Erste agentic Markdown-Workflows** (`gh aw`) → autonome Repo-Pflege.

---

## 8 · Visionen für Mirrou (12 Monate)

**Vision A · Das selbst-deployende Studio.** Push auf `main` → CI prüft → bei Grün
deployt eine OIDC-Action die Website nach Cloud Run, postet die Live-URL + Lighthouse-
Delta als Commit-Status. Kein Mensch fasst `deploy_gcp.ps1` mehr an.

**Vision B · Der Brand-Guardian im PR.** Jeder Creative-/Copy-PR wird automatisch von
Claude (Vertex) gegen Brandbook + Tone-of-Voice geprüft: „Headline > 8 Wörter",
„Adjektiv ohne Daten-Backing", „Claim ohne C2PA-Kennzeichnung" — als Review-Kommentar,
bevor ein Mensch draufschaut.

**Vision C · Brief-to-Draft-Engine.** Kundenbrief → Issue → Claude erzeugt 3 Hooks +
Primary Text + 3 KI-Hintergrund-Prompts (Midjourney) + A/B-Hypothesen → Olha/Denys
reviewen → Merge triggert Asset-Sync zu GCS + Delivery-Webhook. Der 5-Schritt-Algorithmus
als versionierte Pipeline.

**Vision D · Das auditierbare KI-Gedächtnis.** Jeder KI-Output (Copy, Bild-Prompt,
Analyse) wird als Commit/Issue festgehalten → die komplette EU-AI-Act-Audit-Doku entsteht
automatisch. Bei einer Prüfung exportierst du die History — fertig.

**Vision E · Codespaces-Onboarding.** Neuer Freelancer öffnet ein Codespace → komplettes
Mirrou-Setup (Stack, Fonts, Tokens, Claude Code) in 60 Sekunden, im Browser. Kein
„installier erst mal 12 Tools".

---

## 9 · Glossar (als Meister verstehen)
- **OIDC / WIF:** kurzlebiges Identitäts-Token statt langlebiger Schlüssel — keyless Auth.
- **IssueOps:** Prozesse über Issues/Labels steuern (statt externe PM-Tools).
- **Agentic Workflow:** Markdown-Workflow, in dem ein KI-Agent autonom Schritte entscheidet.
- **MCP:** offener Standard, der KI-Modelle mit Tools/Daten verbindet.
- **Reusable Workflow:** zentral definierter Workflow, den viele Repos referenzieren.
- **Self-hosted Runner:** eigene VM als Ausführungs-Layer (z. B. auf GCP).
- **GHAS:** GitHub Advanced Security (CodeQL, Secret/Dependency Scanning).

---

## 10 · Quellen (recherchiert, Juni 2026)
- Claude Code GitHub Actions — https://code.claude.com/docs/en/github-actions · https://github.com/anthropics/claude-code-action
- GitHub Agentic Workflows (Preview, Feb 2026) — https://github.blog/changelog/2026-02-13-github-agentic-workflows-are-now-in-technical-preview/ · https://github.github.com/gh-aw/
- Copilot Coding Agent — https://docs.github.com/copilot/concepts/agents/coding-agent/about-coding-agent
- GitHub Models — https://github.com/features/models · https://github.com/actions/ai-inference
- GitHub MCP Server / MCP — https://docs.github.com/en/copilot/concepts/context/mcp · https://github.com/modelcontextprotocol/servers
- OIDC → Google Cloud (WIF) — https://docs.github.com/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-google-cloud-platform · https://github.com/google-github-actions/auth
- GitHub Actions Pricing 2026 — https://docs.github.com/en/actions/concepts/billing-and-usage · https://github.blog/changelog/2025-12-16-coming-soon-simpler-pricing-and-a-better-experience-for-github-actions/
- GitHub Advanced Security — https://docs.github.com/en/get-started/learning-about-github/about-github-advanced-security
- Projects & IssueOps — https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project · https://github.blog/engineering/issueops-automate-ci-cd-and-more-with-github-issues-and-actions/
- Codespaces / Container Registry — https://docs.github.com/codespaces/overview · https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry

---

*Lebendes Wissensdokument · ergänzt `github-frontier-firm-os.md` (Architektur) ·
Mirrou Creative Studio · Hamburg & Berlin · Stand Juni 2026.*
