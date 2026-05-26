---
name: partners-tools
description: Mirrou Creative Studio – Vollständiger Tech-Stack, Partner-Ökosystem & Frontier Firm Architektur
version: 2.0
---

# Partners & Tools – Mirrou Creative Studio
## Vollständige Infrastruktur · Frontier Firm Edition

> Mirrou ist kein Studio, das Tools benutzt. Mirrou ist ein System, das aus Tools besteht — orchestriert durch Intelligenz, verbunden durch Architektur, kontrolliert durch Prinzipien.

---

## Architektur-Übersicht: Die vier Schichten

```
┌─────────────────────────────────────────────────────────┐
│  LAYER 1 · INTELLIGENCE         Perplexity · Claude · Gemini
│  Research · Wissen · Strategie · Reasoning
├─────────────────────────────────────────────────────────┤
│  LAYER 2 · PRODUCTION           Adobe CC · Midjourney · Runway
│  Foto · KI-Visuals · Video · Web · Slides
├─────────────────────────────────────────────────────────┤
│  LAYER 3 · INFRASTRUCTURE       GCP · Google Drive · CLI · MCP
│  Hosting · Daten · Konnektoren · Automatisierung
├─────────────────────────────────────────────────────────┤
│  LAYER 4 · PERFORMANCE          Meta · TikTok · Google Ads
│  Analytics · Distribution · Reporting
└─────────────────────────────────────────────────────────┘
```

---

## LAYER 1 · INTELLIGENCE

### Perplexity — Das Zentrale Intelligence-System

Perplexity ist nicht eine Suchmaschine bei Mirrou. Es ist das **organisierte Wissensbetriebssystem** der gesamten Agentur — das Rückgrat des Frontier Firm Modells.

#### Space-Architektur (Mirrou Spaces)

| Space | Funktion | Wer nutzt ihn |
|-------|----------|---------------|
| **Mirrou HQ (Team)** | Brand, Vision, Positionierung — Single Source of Truth | Gesamtes Team |
| **Strategy & Intelligence** | Marktrecherche, Wettbewerb, Trends, Benchmarks | Yahya, Denys |
| **Ops & Playbooks** | SOPs, Prozesse, Templates, Checklisten | Gesamtes Team |
| **PROJECT – Abschlussarbeit** | Aktives Projekt-Management, Deadline-Tracking | Yahya, Ralph |
| **PRIVATE – Command Center** | Persönliches R&D, Opus Magnum, LYGOX, Columna | Yahya (privat) |

#### Perplexity als Frontier Firm Infrastruktur

- **RAG über eigene Dokumente**: Jeder Space hat hochgeladene MD-Dateien als Wissensbasis — der AI antwortet auf Basis echter Studio-Dokumente, nicht generisch
- **MCP-Server-Anbindung**: Perplexity kann über MCP (Model Context Protocol) mit externen Tools verbunden werden — Google Drive, Notion, GitHub, custom APIs
- **Web-Search + Docs-RAG kombiniert**: Externe Recherche + interne Wissensbasis in einer Antwort
- **Team-Spaces mit Zugriffskontrolle**: Getrennte Wissensbereiche je Funktion — kein Informations-Leakage zwischen privaten und Team-Spaces
- **Prompt-Bibliotheken**: Jeder Space hat definierte Beispiel-Prompts — das Team arbeitet konsistent, nicht zufällig

#### MCP-Konnektoren (aktiv nutzbar)

| Konnektor | Was möglich wird |
|-----------|-----------------|
| **Google Drive MCP** | Perplexity liest/schreibt direkt in Drive-Dokumente |
| **GitHub MCP** | Code-Repositories direkt im Space referenzierbar |
| **Notion MCP** | Projektdaten aus Notion in Perplexity-Antworten |
| **Custom API MCP** | Eigene Endpoints anbindbar — z.B. Mirrou-interne Daten |
| **Canva MCP** | Slide-Generierung direkt aus Perplexity-Kontext auslösen |

> **Frontier Firm Vorteil**: Während andere Teams Informationen zwischen Tools kopieren, fließen sie bei Mirrou durch verbundene Systeme — Perplexity als Orchestrierungs-Hub.

---

### Claude (Anthropic) — Reasoning & Langtext-Intelligenz

#### Zugangswege

| Modus | Tool | Stärke |
|-------|------|--------|
| **Web-Version** | claude.ai | Schnell, konversationell, Projekte mit Datei-Upload |
| **Claude Code (Terminal)** | `claude` CLI | Vollzugriff auf lokales Filesystem, Codebase-Analyse, Batch-Operationen |
| **Claude Code (App)** | Desktop App | GUI für Claude Code, visuell, integrierter File-Browser |
| **API** | api.anthropic.com | Programmatische Einbindung in Mirrou-Workflows |

#### Claude Code — Mirrous Web-Produktions-Engine

Claude Code ist der Grund, warum Mirrou als Agentur **ganze Websites selbst bauen kann** — ohne externe Entwickler:

- **Codebase-Analyse**: Liest komplette Projekte (alle Dateien gleichzeitig), versteht Architektur
- **Atomare Diagnose**: Semi-atomares Diagnose-System vor jeder Änderung — was existiert, was fehlt, was bricht
- **Full-Stack-Builds**: React 19, Vite 6, TypeScript, Tailwind CSS v4 — komplette Websites in einem Prompt-Workflow
- **Internationalisierung**: Vollständige i18n-Implementierung (DE, EN, ES, IT, FR, TR, RU, UK — wie auf mirrou.studio)
- **Deployment-Pipeline**: Von Code bis Google Cloud Run in einem Workflow
- **Mirrou-Website**: Die aktuelle mirrou.studio wurde mit Claude Code gebaut und deployed

#### Anthropic / Claude Compliance
- Anthropic Business: EU-Datenschutz-Zusätze verfügbar
- Keine Kundendaten in Prompts ohne AVV-Grundlage
- Claude Code arbeitet lokal — kein Cloud-Upload von Kundendaten

---

### Gemini (Google) — Multimodalität & Google-Ökosystem

#### Zugangswege

| Modus | Tool | Stärke |
|-------|------|--------|
| **Gemini in Antigravity** | antigravity.ai | Gemini + Websuche + Code + Bild in einer Oberfläche |
| **Google AI Studio** | aistudio.google.com | Direkte API-Nutzung, Prompt-Engineering, Multimodalität |
| **Gemini Advanced** | gemini.google.com | Konversationell, Google Workspace-Integration |
| **Gemini in Google Docs/Slides** | Workspace | Direkt in Dokumente, Zusammenfassungen, Drafts |
| **Vertex AI** | GCP Console | Enterprise-Grade Gemini, skalierbar, EU-Region wählbar |

#### Antigravity — Mirrous Website-Builder-Workflow

Gemini in Antigravity ist der primäre Kanal für **visuelle Website-Builds und Brandbook-Erstellung**:

- Gemini versteht gleichzeitig: bestehenden Code + Bild-Referenzen + Text-Briefings
- Ideal für: Brandbook-Pages, neue Sections, visuelle Systeme in bestehende Sites integrieren
- Workflow: Briefing in Antigravity → Code-Output → Claude Code für Deployment-Feinschliff → GCP

---

## LAYER 2 · PRODUCTION

### Google-Ökosystem · Workspace & Drive

| Tool | Einsatz bei Mirrou |
|------|--------------------|
| **Google Drive** | Zentrale Asset-Bibliothek, Kunden-Übergaben, Creative-Learning-Logs |
| **Google Docs** | Briefings, Strategie-Dokumente, Textentwürfe |
| **Google Slides** | Pitch-Decks, Kunden-Präsentationen, Onboarding-Decks |
| **Google Sheets** | Reporting-Dashboards, KPI-Tracking, Budgetplanung |
| **Google Meet** | Kunden-Calls, Team-Syncs |
| **Google Forms** | Kunden-Onboarding-Fragebogen, Creative-Brief-Intake |
| **Looker Studio** | Automatisierte Performance-Dashboards für Kunden |

### Canva — Schnelle Slide & Visual-Produktion

| Einsatz | Details |
|---------|---------|
| **Slide-Generierung** | Pitch-Decks und Präsentationen schnell aus Vorlagen oder Prompts |
| **Social Templates** | Wiederverwendbare Post-Templates für das Team |
| **Kunden-Übergaben** | Brand Kits für Kunden exportierbar |
| **Canva MCP** | Mit Perplexity verbunden: Slide-Generierung direkt aus Space auslösbar → Perplexity-Prompt → Canva-Output |
| **Canva → Google Slides** | Export direkt in Drive, keine manuelle Übertragung |

> **Praxis-Beispiel**: Prompt in Mirrou HQ Space → „Erstelle 5 Slide-Outline für Pitch an D2C-Skincare-Brand" → Canva MCP generiert Slides → direkt präsentierbar.

### Adobe Creative Cloud

| Tool | Einsatz |
|------|---------|
| Photoshop + Firefly | Produktretusche, Compositing, KI-Hintergründe (EU AI Act-sicher) |
| Lightroom | Farbsystem, Batch-Export, Preset-Bibliothek |
| Illustrator | Ad-Layouts, Text-Overlays, Brand-Assets |
| Premiere Pro | Video-Editing, Short-Form |
| DaVinci Resolve | High-End Farbkorrektur Video |
| CapCut Pro | TikTok-native Short-Form |

### KI-Visuals & Generative Production

| Tool | Einsatz | Compliance |
|------|---------|-----------|
| Midjourney v6+ | KI-Hintergründe, Stilvarianten | ✅ Kennzeichnen |
| Adobe Firefly | Generative Fill, Background Gen | ✅ Rechtssicher |
| Runway ML | Video-Generierung, Motion | ✅ Kennzeichnen |
| Stable Diffusion (lokal) | Experimentell, kontrolliert | ✅ Kein Cloud-Datenpfad |

---

## LAYER 3 · INFRASTRUCTURE

### Google Cloud Platform (GCP)

Mirrou betreibt seine gesamte Web-Infrastruktur auf GCP — EU-Region, DSGVO-konform.

| Service | Einsatz |
|---------|---------|
| **Cloud Run** | Mirrou-Website Hosting (europe-west3 · Frankfurt) |
| **Artifact Registry** | Docker-Images für Website-Deployments |
| **Cloud Build** | CI/CD-Pipeline für automatisierte Deployments |
| **Secret Manager** | API-Keys, Credentials sicher verwaltet |
| **Cloud Storage** | Asset-Storage, Backup |
| **Cloud Logging** | Monitoring, Error-Tracking |

#### GCP CLI — Mirrous Deployment-Workflow

```bash
# Typischer Mirrou-Deployment-Flow
gcloud builds submit --tag gcr.io/[project]/mirrou-website
gcloud run deploy mirrou-website   --image gcr.io/[project]/mirrou-website   --region europe-west3   --allow-unauthenticated
```

Mirrou kann damit **neue Website-Versionen in Minuten deployen** — ohne externe Entwickler, ohne Agentur-Abhängigkeit.

#### Website-Produktions-Stack (vollständig intern)

```
Briefing (Perplexity / Gemini Antigravity)
    ↓
Code-Generierung (Claude Code Terminal / App)
    ↓
Framework: React 19 · Vite 6 · TypeScript · Tailwind CSS v4
    ↓
Containerisierung: Docker
    ↓
Deployment: GCP Cloud Run (europe-west3)
    ↓
Live in < 10 Minuten
```

> Das bedeutet: Mirrou baut ganze Websites für Kunden — von Landingpage bis vollständigem Markenauftritt — vollständig intern, schnell, günstig, compliant.

### MCP-Server-Architektur (Model Context Protocol)

MCP ist das Protokoll, das KI-Modelle mit externen Tools verbindet. Mirrou nutzt MCP, um Perplexity und Claude direkt an die Arbeitsumgebung anzubinden.

| MCP-Server | Verbindung | Was möglich wird |
|------------|-----------|-----------------|
| **Google Drive MCP** | Perplexity ↔ Drive | AI liest/schreibt Dokumente direkt |
| **GitHub MCP** | Claude Code ↔ GitHub | Versionierung, Pull Requests, Code-Review |
| **Filesystem MCP** | Claude Code ↔ Lokal | Vollzugriff auf lokale Projektordner |
| **Fetch MCP** | Claude/Perplexity ↔ Web | Websites direkt im Context laden |
| **Canva MCP** | Perplexity ↔ Canva | Slides aus AI-Kontext generieren |
| **Custom REST MCP** | Claude ↔ Mirrou-APIs | Eigene Datenquellen anbinden |

---

## Das Perfect Twin Konzept

Mirrou arbeitet nach dem **Perfect Twin Prinzip**: Für jeden Workflow gibt es ein menschliches und ein KI-Pendant — kein Ersatz, sondern Verdopplung.

```
MENSCH (Yahya / Olha / Denys / Ralph)
    ↕ synchronisiert mit ↕
KI-SYSTEM (Perplexity Space / Claude / Gemini)

Ergebnis: Jede Entscheidung ist informiert.
          Jeder Output ist konsistent.
          Jede Iteration ist schneller als die vorherige.
```

| Domäne | Mensch | KI-Pendant |
|--------|--------|-----------|
| Brand & Strategie | Yahya | Perplexity HQ Space |
| Creative Direction | Olha | Midjourney + Firefly System |
| Performance & Kampagnen | Denys | Claude + Meta Analytics |
| CRM & Prozesse | Ralph | Ops & Playbooks Space |
| Web-Entwicklung | Team | Claude Code + GCP Pipeline |
| Research & Intelligence | Team | Strategy & Intelligence Space |

---

## LAYER 4 · PERFORMANCE

### Paid Media & Analytics

| Tool | Kanal | Einsatz |
|------|-------|---------|
| Meta Ads Manager | Instagram, Facebook | Creative-Performance, A/B-Tests, ROAS |
| TikTok Ads Manager | TikTok | Hook-Testing, Short-Form Performance |
| Google Ads | YouTube, Display | Formatversionen, Retargeting |
| Google Analytics 4 | Website | Traffic, Conversion, EU-konform |
| Looker Studio | Reporting | Kunden-Dashboards, automatisiert |

---

## Compliance-Architektur (integriert in jeden Layer)

| Regulation | Wo umgesetzt |
|-----------|-------------|
| **EU AI Act** | KI-Kennzeichnung in Assets (C2PA), AVV in jedem Vertrag |
| **DSGVO** | GCP europe-west3, IP-Anonymisierung GA4, AVV Standard |
| **Data Act** | Creative-Learning-Log übergebbar, kein Lock-in |
| **Urheberrecht** | Adobe Firefly für rechtssichere Generierung, Midjourney nur für Hintergründe |

---

## Tool-Entscheidungsmatrix

Bevor ein neues Tool eingeführt wird:

| Frage | Mindestanforderung |
|-------|-------------------|
| EU AI Act / DSGVO konform? | AVV vorhanden oder nicht nötig |
| Export-Pfad vorhanden? | Daten strukturiert übergebbar (Data Act) |
| MCP-Konnektor verfügbar? | Wenn nein: manuelle Bridge oder ablehnen |
| Ersetzt oder informiert es? | Tool informiert Entscheidungen — ersetzt sie nie |
| GCP-kompatibel? | Hosting/Deployment in EU-Region möglich |
