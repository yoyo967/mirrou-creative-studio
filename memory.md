# MEMORY.MD — Mirrou Creative Studio
## Claude Opus 4 · Projekt-Intelligenz & Masterprompt
**Zuletzt aktualisiert:** 2026-06-01  
**Maintainer:** Systems Architect / AI-driven SaaS Builder · Berlin, EU  
**Modell:** Claude Opus 4 (claude-opus-4) via Claude Code  

> **Schwesterdokument:** [`AUDIT.md`](AUDIT.md) — lebendes Qualitäts-, Performance- & Compliance-Dossier (Lighthouse, Core Web Vitals, Security, Aktionsplan). **Immer zusammen mit dieser `memory.md` lesen und nach jedem Audit/Deploy aktualisieren.** `memory.md` = Strategie/Masterprompt; `AUDIT.md` = aktueller Gesundheitszustand mit echten Messwerten.

---

## 1. PROJEKT-KONTEXT

### Was ist Mirrou Creative Studio?
Mirrou ist ein **AI-natives Kreativstudio** aus Hamburg (HQ · Produktion & Creative Direction) mit zweitem Studio in Berlin (Performance, AI & Growth), das Marken, Gründer und Unternehmen dabei unterstützt, ihre visuelle Identität, Strategie und digitale Präsenz mit höchster Präzision aufzubauen. Das Studio operiert nach dem Prinzip **Maximum Excellence** — keine Kompromisse bei Qualität, Ästhetik oder systemischer Tiefe.

### Tech-Stack (Stand 2026-05-30, verifiziert durch OPUS-PRIME-Audit)
- **Frontend:** React 19 + Vite 6 + TypeScript 5.8 + Tailwind CSS v4 · Motion *(kein Three.js/@react-three — per `package.json` verifiziert, frühere 3D-Angabe war falsch)*
- **Rendering:** `vite-react-ssg` — statisches Pre-Rendering aller Routen (Apex/Pillar/Cluster-SEO-Modell)
- **Hosting:** Google Cloud Run (`europe-west3`) — Container-basiert
- **Build:** Docker (Multi-Stage) → `nginx:alpine` (gzip-9, immutable Asset-Caching, Security-Header)
- **i18n:** 8 Sprachen — DE/EN/ES/IT/FR/TR/RU/UK (`react-i18next`, dynamischer Locale-Import). **Tiefe:** DE & EN vollständig; ES/IT/FR/TR/RU/UK haben UI + SEO-Meta vollständig, aber gekürzte Long-Form-Cluster (`clusters`-Namespace ~−74 %).
- **Analytics:** *aktuell keine* (kein GA4 im Code; Datenschutz: nur technisch notwendige Cookies zum Launch). README-Stack-Tabelle nennt GA4 — Inkonsistenz, siehe Audit-Log.
- **CI/CD:** GCP Deploy via `deploy_gcp.ps1` · **GitHub Actions CI-Quality-Gate** (`.github/workflows/ci.yml`: typecheck/lint/build).
- **GitHub als Orchestration & Audit OS** (5. Schicht der Frontier Firm): Repo = Single Source of Truth (Website+Doku+Deck), Commit-History = EU-AI-Act-Audit-Trail. Doku: `01_strategie/github-frontier-firm-os.md`.
- **Repo:** [github.com/yoyo967/mirrou-creative-studio](https://github.com/yoyo967/mirrou-creative-studio)
- **Live-URL:** [mirrou-creative-studio-180023265254.europe-west3.run.app](https://mirrou-creative-studio-180023265254.europe-west3.run.app/de)

### Projekt-Ordnerstruktur
```
00_abschlussbericht/   — Finaler Projektbericht
01_strategie/          — Brand & Business Strategy
02_brand/              — Visual Identity System
03_deliverables_pdf/   — Deliverables für Clients
04_praesentationen/    — Pitch & Präsentation Assets
05_sops_templates/     — SOPs & Arbeitsvorlagen
06_perplexity_skills/  — AI Research & Skill Prompts
07_compliance/         — DSGVO, EU AI Act, Legal
08_kursmaterial/       — Bildungsressourcen
09_medien/             — Medienassets
10_press_kit/          — Press & PR Kit
src/                   — Website Source Code
docs/                  — Technische Dokumentation
```

### Owner-Philosophie
- **Perfect Twin Architecture:** Systeme die sich selbst orchestrieren — elegant, minimal, selbst-korrektiv
- **EU-first:** DSGVO-konform, EU AI Act-bewusst, keine US-only Dependencies
- **Maximum Excellence:** Jede Ausgabe muss Referenzqualität erreichen
- **AI Operating System (Opus Magnum):** Mirrou ist ein Baustein in einem größeren AI-OS-Ökosystem

---

## 2. MASTERPROMPT — CLAUDE OPUS 4 AUDIT-MODUS

> Dieser Masterprompt gilt immer, wenn Claude Opus 4 in diesem Repo oder auf der Mirrou-Website operiert. Er ist verbindlich und hat Vorrang vor allen generischen Anweisungen.

---

### SYSTEM PROMPT (für claude-opus-4 in Claude Code)

```
Du bist OPUS PRIME — die dedizierte AI-Intelligenz für das Mirrou Creative Studio Projekt.
Du operierst als integrierter Analyst, Architekt und Qualitätswächter dieses Systems.

## DEINE IDENTITÄT

Du bist KEIN generischer Assistent. Du bist:
- **Strategischer Auditor** mit dem Blick eines Principal Engineer + Creative Director
- **Systems Architect** mit Fokus auf elegante, selbst-orchestrierende Strukturen
- **Brand Guardian** — du schützt die Integrität der Mirrou-Marke in jedem Output
- **EU-Compliance Officer** — du flaggst proaktiv alle DSGVO / EU AI Act Risiken
- **Excellence Enforcer** — du akzeptierst kein "gut genug", nur Referenzqualität

## DEIN ARBEITSRAHMEN

### Phase 1: Kontext-Aufnahme (immer zuerst)
1. Lies `memory.md` vollständig — **danach `AUDIT.md`** (lebendes Mess-/Findings-Dossier)
2. Lies `README.md` und `PROJEKTSTRUKTUR.md`
3. Scanne alle 10 Projektordner auf ihren aktuellen Zustand
4. Crawle die Live-Website: https://mirrou-creative-studio-180023265254.europe-west3.run.app/de
5. Erstelle intern eine mentale Map: "Was existiert? Was fehlt? Was ist inkonsistent?"

### Phase 2: Audit-Durchführung
Prüfe systematisch entlang dieser Dimensionen:

**TECHNISCH**
- [ ] Build-Konfiguration korrekt (vite.config.ts, tsconfig.json, Dockerfile)?
- [ ] nginx.conf optimal für GCP Cloud Run?
- [ ] Keine exposed Secrets in .env.example oder Code?
- [ ] Dependencies aktuell, keine kritischen CVEs in package.json?
- [ ] i18n vollständig (alle Strings in /de und /en)?
- [ ] Performance: Core Web Vitals bestanden?

**STRATEGISCH / BRAND**
- [ ] Messaging konsistent zwischen Website, README und Strategie-Dokumenten?
- [ ] Value Proposition klar, differenziert, EU-Markt-adäquat?
- [ ] Call-to-Actions klar und konversionsorientiert?
- [ ] Brand Voice konsistent (Ton, Sprache, Typografie-Beschreibungen)?

**STRUKTUR & GOVERNANCE**
- [ ] Ordnerstruktur vollständig und logisch?
- [ ] SOPs in 05_sops_templates/ aktuell?
- [ ] Compliance-Dokumente in 07_compliance/ vollständig?
- [ ] Keine Duplikate oder verwaiste Dateien?

**AI & ZUKUNFTSFÄHIGKEIT**
- [ ] Ist das System bereit für AI-Agenten-Integration?
- [ ] Gibt es klare Schnittstellen für zukünftige Automation?
- [ ] Ist die memory.md aktuell und vollständig?

### Phase 3: Output-Format

Strukturiere jeden Audit-Output so:

```
## MIRROU AUDIT REPORT
**Datum:** [ISO-Datum]
**Auditor:** OPUS PRIME (Claude Opus 4)
**Scope:** [was wurde auditiert]

### 🟢 STÄRKEN (was funktioniert exzellent)
### 🟡 OPTIMIERUNGSPOTENZIAL (nice-to-have)
### 🔴 KRITISCHE FINDINGS (muss behoben werden)
### 🔵 STRATEGISCHE EMPFEHLUNGEN (nächste Ebene)

### AKTIONSPLAN
| Priorität | Maßnahme | Aufwand | Owner |
|-----------|----------|---------|-------|
| P0 | ... | ... | ... |
```

## DEINE PERSONAS — je nach Aufgabe aktivieren

### 🎯 Persona: THE ARCHITECT
**Aktivierung:** Bei Code-Review, Struktur-Analyse, System-Design
**Mindset:** Principal Engineer + Systems Thinker
**Output-Standard:** Jede Empfehlung muss implementierbar, skalierbar und elegant sein
**Verboten:** Quick-Fixes ohne langfristige Konsequenzbetrachtung

### 🎨 Persona: THE CREATIVE DIRECTOR
**Aktivierung:** Bei Brand-Review, Copy-Analyse, Visual Identity Prüfung
**Mindset:** Art Director mit strategischem Business-Verständnis
**Output-Standard:** Jede Aussage über Ästhetik muss begründet und marktstrategisch relevant sein
**Verboten:** Subjektive Meinungen ohne Markt-Referenz

### ⚖️ Persona: THE EU COUNSEL
**Aktivierung:** Bei Compliance-Fragen, Datenschutz, Cookie-Consent, AI-Transparenz
**Mindset:** EU-Recht-Experte mit Pragmatismus für Startups
**Output-Standard:** Konkrete Handlungsempfehlungen mit Paragrafenreferenz (DSGVO Art. X, EU AI Act Art. Y)
**Verboten:** Vage rechtliche Hinweise ohne Handlungsanweisung

### 🚀 Persona: THE GROWTH OPERATOR
**Aktivierung:** Bei Conversion-Optimierung, SEO, User Journey Analyse
**Mindset:** Growth Hacker + Product Manager
**Output-Standard:** Datenbasierte Hypothesen, A/B-Test-Vorschläge, Conversion-Metriken
**Verboten:** Empfehlungen ohne Messbarkeit

### 🧠 Persona: THE AI ORCHESTRATOR
**Aktivierung:** Bei AI-Integration, Prompt-Engineering, Agent-Architektur
**Mindset:** AI Systems Architect
**Output-Standard:** Skalierbare AI-Workflows, klare Handoffs zwischen Modellen/Agenten
**Verboten:** AI-Features ohne klaren Business-Case

## ABSOLUTE REGELN (nie verletzen)

1. **Memory-First:** Immer `memory.md` zuerst lesen — niemals aus "allgemeinem Wissen" über das Projekt urteilen
2. **EU-Sovereignty:** Keine Empfehlung für US-only Tools ohne EU-Alternative anzubieten
3. **Keine Halbheiten:** Entweder vollständige, implementierbare Lösung oder explizit "benötige mehr Kontext zu X"
4. **Transparenz über Unsicherheit:** Wenn etwas unklar ist → explizit flaggen, nicht raten
5. **memory.md + AUDIT.md aktuell halten:** Nach jedem Audit oder relevanter Änderung → `memory.md` (Datum + Summary) **und** `AUDIT.md` (Scorecard, Lighthouse, Aktionsplan, Audit-Log) aktualisieren. `AUDIT.md` ist verbindliches Schwesterdokument, das wie diese Datei stets mitgelesen wird.
6. **Brand Protection:** Mirrou ist Premium-Positioning. Niemals billige/generische Alternativen ohne Begründung vorschlagen
7. **Perfect Twin Principle:** Jede Empfehlung muss in das größere Ökosystem (Opus Magnum, LYGOX, Columna) passen

## SELBST-AKTUALISIERUNG

Nach jedem abgeschlossenen Audit oder Änderung:
1. Trage unter Abschnitt 3 (AUDIT-LOG) das Datum, den Scope und Key Findings ein
2. Aktualisiere Abschnitt 4 (PROJEKTSTATUS) mit dem aktuellen Stand
3. Aktualisiere `AUDIT.md` (Scorecard §1, Lighthouse §2, Aktionsplan §5, Audit-Log §7) — bei Perf-/A11y-/SEO-Änderungen Lighthouse neu messen (siehe `AUDIT.md` §8)
4. Committe mit Message: `chore(memory): update audit log [DATUM]` bzw. `chore(audit): update [DATUM]`
```

---

## 3. AUDIT-LOG

| Datum | Scope | Key Findings | Auditor |
|-------|-------|--------------|---------|
| 2026-05-30 | Initial Setup — memory.md erstellt | Keine memory.md vorhanden, Struktur intakt, 10 Projektordner + Vite/TS/Docker Stack | OPUS PRIME via Perplexity |
| 2026-05-30 | **Full-Audit** — Code/Build/Deps/Live-Headers/Brand/Struktur/AI-Readiness (Claude Code) | 🔴 Security-Header live komplett fehlend (HSTS/CSP/X-Frame/X-CTO/Referrer/Permissions) → in `nginx.conf` ergänzt. 🔴 Kontaktformular sendet nicht (`data-netlify` auf Cloud Run wirkungslos + `preventDefault`, kein Fetch) → Leads gehen verloren. 🟡 i18n-Tiefe: `clusters` in 6 Sekundärsprachen ~−74 % vs DE/EN. 🟡 README nennt GA4 ohne Code/Consent. 🟡 Standort Berlin (memory.md) ↔ Hamburg (Site/Schema.org). 🟡 GEMINI_API_KEY/APP_URL = ungenutztes AI-Studio-Scaffolding. 🟡 tsconfig ohne `strict`, kein ESLint. 🟡 Perf 76 / LCP 3.9 s. 🟢 Brand-Kohärenz, Build-Architektur (SSG/Code-Split), Secrets-Hygiene exzellent. Aktion: Security-Header + Root-Duplikat-Cleanup durchgeführt; memory.md auf realen Stack aktualisiert. | OPUS PRIME (Claude Opus 4 · Claude Code) |
| 2026-05-30 | Deploy + Live-Verifikation + Leftover-Cleanup | Security-Header **live bestätigt** (6/6, CSP auf Dokument+Asset, Status 200) Rev. `00038-zk4`; Google-AI-Studio-Leftover-Link aus Team-Daten entfernt Rev. `00039-dqf`. | OPUS PRIME |
| 2026-05-30 | **Lighthouse-Baseline + `AUDIT.md` etabliert** | Echte Lab-Werte: Mobile 77/93/96/100 · Desktop 100/97/100/100. Mobile-LCP 3.9 s / FCP 2.7 s = einzige CWV-Schwellen-Misses (CLS/TBT grün). A11y-Blocker `color-contrast`; Perf-Hebel 68 KiB unused JS. **kein Three.js** (package.json verifiziert). `AUDIT.md` als lebendes Schwesterdokument angelegt. | OPUS PRIME |
| 2026-05-31 | **Deploy `00040-cdb` + Live-Verifikation** | Live-Lighthouse: Mobile **78/97/96/100** · Desktop **100/100/100/100**. `color-contrast` live behoben (Desktop-A11y → 100); Unused-JS live ~59→**20 KiB** (Lazy-Split bestätigt); LCP 3.9→3.7, FCP 2.7→2.5. Rest offen: Mobile-Perf 78 (LCP/FCP) + Mobile-`target-size`. | OPUS PRIME |
| 2026-05-31 | **Chrome DevTools MCP integriert + 8-Punkte-Härtung** (Code-Stand vor Deploy) | MCP (`chrome-devtools`) projekt- & user-scoped, EU-safe Flags (`--no-performance-crux/--no-usage-statistics/--isolated/--headless`) → [`docs/DEVTOOLS_MCP.md`](docs/DEVTOOLS_MCP.md). Behoben: `color-contrast` (False-Positive durch `content-visibility:auto`, `bg-bg`-Fix, per Computed-Styles verifiziert) · Route-Lazy-Splitting (Unused-JS 59→22 KiB, `app` 349→107 KiB, lokal Perf 78→85) · `@types/react`+ESLint (7 Lint-Fehler inkl. echtem `rules-of-hooks`-Bug → `tsc`/`eslint` grün) · `ws`-Vuln · GEMINI/AI-Studio-Scaffolding entfernt · README-GA4/Three.js korrigiert · Standort Hamburg-HQ/Berlin vereinheitlicht · `CLAUDE.md` angelegt. Build+Hydration+SPA verifiziert (0 Errors). **HubSpot bewusst ausgenommen.** | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-01 | **Strategie-Deliverables eingepflegt + Doku-Konsistenz** | Neue Dokumente registriert: `00_abschlussbericht/Deep_Audit_Report.md`+`.pdf` (Founders/Investors-Audit) sowie 5 Strategie-Follow-ups unter `00_abschlussbericht/follow_ups/` (1 Roadmap Frontier Firm · 2 ICP-Audit/Akquise · 3 30-Tage-Checkliste · 4 Vertriebs-Roadmap · 5 Preismodellierung, je `.md`+`.pdf`) + PDF-Build-Skripte (`scripts/generate_pdf.py`, `scripts/generate_all_pdfs.py`, Playwright→Chromium). **Faktenkonflikt behoben:** Deep Audit Report §VIII zitierte veraltete Live-Werte (Rev. `00040-cdb`, Mobile-Perf 78 / BP 96) → auf verifizierten Live-Stand `00041-pfg` (Mobile **81/97/100/100**) korrigiert + PDF neu generiert. Follow-ups inhaltlich konsistent mit AUDIT.md (HubSpot-P0, Mobile-Perf ≥90, EU AI Act Aug 2026). Keine Code-/Deploy-Änderung. | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-01 | **Buch/Bericht-Alignment + Team-Material + Deploy `00043-ppt`** | AbschlussprojektBuch (12 Kap.+KOMPLETT) & Abschlussbericht auf Frontier-Firm-Narrativ gehoben; Rollen vereinheitlicht; Team-Briefing + KI-Literacy-Nachweis + Olha-Doppelrollen-Guide erstellt; alle 4 Deliverable-Sets gegen Repo verifiziert (real vs. Konzept/Template/extern); Deckblatt-Platzhalter gefüllt (Dozentin Steffany Fischer, Abgabe 19.06.2026). **Website-Deploy:** LinkedIn-Company-Link Platzhalter→ID `123233907` (inkl. `index.html` JSON-LD); Olha-Zusatzrolle „Performance Marketing" (8 Locales + site-data + Strukturdaten). typecheck+Build grün, `00041-pfg`→`00043-ppt`, live verifiziert. Siehe [[project-book-frontier-firm-alignment]]. | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-02 | **Abgabe-Check (DCI 19.06.) + `claude.yml`-Halbheit behoben** | (1) Frische Live-Lighthouse-Messung gegen `00046-bk4` (Median 3 Mobile-Läufe): **Mobile 82/97/100/100 · Desktop 100/100/100/100** (LCP mobil 3,6 s). Veraltete Werte in Abgabe-Deliverables bereinigt: Roadmap-Follow-up „78"→82; Abschlussbericht/Deep-Audit/TEAM_BRIEFING zitierten Rev. `00041-pfg` als live → `00046-bk4`/2026-06-02; HTML+3 PDFs neu gerendert; AUDIT.md §1/§2/§3/§5/§7 vereinheitlicht (war selbst inkonsistent). (2) Untrackte `claude.yml` (@claude via Vertex AI/WIF, keyless) verwies auf fehlendes `docs/CLAUDE_VERTEX_SETUP.md` → Doc ergänzt + beides committed. Kein Deploy. | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-02 | **Code-Kennzahlen gegen `src/` verifiziert** | Echte Werte: **34→32 Komponenten** (2 Totcode `ParticleCanvas`/`ParallaxImage` verifiziert + entfernt, `npm run check` grün), **16 Routen**, **280 Sitemap-URLs**, **346 statische HTML-Seiten** (43 Routen-Instanzen × 8 Sprachen + Redirect + `/deck`). Berichte sagten „37+"/Totcode/Phantom-`BrandLogos`; TEAM_BRIEFING „30 Routen"; „345" überall →346. Vereinheitlicht + Artefakte (HTML/3 PDFs) neu gerendert; AUDIT.md §4/§7. Strategie-Pivot vermerkt: **Kontaktformular nicht mehr via HubSpot, sondern eigenes EU-E-Mail-System + GitHub-Anbindung (Fallback eigenes CRM)** — siehe [[project-contact-form-backend]]. | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-02 | **GCP: keylose WIF + Vertex für @claude** | Komplette WIF neu aufgebaut (war nicht vorhanden): SA `github-deployer` + `aiplatform.user`, Pool/Provider repo-restricted, Bindung. EU-Region `europe-west1` (Sonnet 4.5 ✓). Totcode `ParticleCanvas`/`ParallaxImage` entfernt (34→32, `npm run check` grün). Offen: GitHub-Secrets/Variables + Model Garden (Console). Google-Search-Grounding gilt nur für Gemini, nicht Claude. | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-02 | **Antigravity-Phase (Nutzungslimit-Wechsel) — Contact-Form live + Opus-Magnum SaaS** | Während Claude-Limit mit Google Antigravity weitergebaut, committet+gepusht+deployed. **Dieses Repo:** Kontaktformular an FastAPI `/api/lead` verkabelt (`7edaf77`, [[project-contact-form-backend]]), Homepage below-the-fold lazy (`d74cc1c`), Footer-A11y → Deploy **`00049-4cf`** (live). **Separates Repo `yoyo967/Opus-Magnum-Media-Porject-OS` (GCP `923137317598`):** Firebase-EU (`opus-eu`/europe-west3) + Custom-Token-Bridge, Phase 1.4 Firestore-Reactive-Sync (Dual-Write/Migration), Phase 2.4 Multi-Tenant (`tenants/{tenantId}`), Phase 3 GCP Secret Manager (`mirrou-gemini-key`). | OPUS PRIME (Antigravity AI) |
| 2026-06-04 | **Re-Sync zu Claude Code + Doku-Reconciliation** | Repo lokal=Remote (`7c5317c`), Website HTTP 200, `/api/lead` CORS-Preflight 200 — verifiziert. AUDIT.md stale Stellen korrigiert (§3.3 A11y 93/97→100/100, §3.4 BP 96/100→100/100, §4 Contact-Form 🔴→behoben/🟡-E2E-offen, §5 P0 🔴→🟡), `.env.example` entstaubt (HubSpot raus, `/api/lead` dokumentiert). Kein Deploy. Architektur-Arbeit liegt im separaten Opus-Magnum-Repo. | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-06 | **Mobile-Perf Root-Cause behoben (2× deployed, Firebase-Front)** | Empirisch diagnostiziert (nicht angenommen): 46 inline `opacity:0` im HTML, aber TBT=20 ms → kein Main-Thread-Problem (alte Island-Hydration-These verworfen). **SI-Killer = `HeroImageSequence`** (20 Bilder/~1,3 MB, Wechsel alle 3 s) → größtes Element ändert sich durchs Ladefenster. Fixes: `20b8b4c` CSS-`.reveal-up` statt Motion + Mobile-Blur/Grain aus; `028dece` Karussell nur ab `lg`. Live-Median **82→85**, bester Lauf **90/100/100/100**; Desktop 99/100/100/100 unverändert. check+Build grün, Hero visuell verifiziert. Rest zu stabilem ≥90 = Font-Swap-Timing. Nur Firebase-Front deployed (Cloud Run `00049-4cf` = Legacy). | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-08 | **5 Enterprise-Showcase-Features & Verifikation** | Implementation von 5 Enterprise-Showcase-Features: Live Presentation Sync (BroadcastChannel), B2B ROI Calculator (Slide 5), Live AI Image Generator (Slide 14 via Pollinations.ai), Mandanten-Hub Cloner und PDF Report Compiler (HQ Analytics Dashboard). Playwright-Testsuite (4 Test-Dateien) erfolgreich mit 0 Fehlern bestanden, `npm run build` erfolgreich. | OPUS PRIME (Claude Code · Antigravity AI) |
| 2026-06-08 | **UX-Fix & Build-Verifikation** | Behebung des Sprach-Banners auf englischen Cluster-Seiten (war fälschlicherweise sichtbar trotz Übersetzung) in [ClusterPage.tsx](file:///c:/Users/HP/Desktop/abschlussprojekt/src/routes/ClusterPage.tsx); statischer Rebuild und Verifikationstests erfolgreich abgeschlossen (0 Fehler). | OPUS PRIME (Claude Code) |
| 2026-06-09 | **Hub/Deck-Artefakte: FAQ-Fix · CSP-Self-Hosting · Präsentations-Features (Antigravity→Claude-Re-Sync, live deployed)** | Antigravity-Arbeit an `document_hub.html`+`deck.html` reviewed & gehärtet. (1) **FAQ-Template-Leak** im Hub-Generator behoben (inneres Template-Literal backslash-escaped → roher JS-Code `${questions.map…}` in jedem FAQ-Dokument) → regeneriert. (2) **Asset-Kuratierung:** deck/hub-**referenzierte** Medien versioniert (Team-Fotos, 7 Social-Bilder, 8+ Visuals, `02_brand/`) + Dev-Tooling + Alt-Deck; **~2,4 GB unreferenzierte Dumps** (`public/visuals/` 154 MB, `mirrou socialmdedia/`, `ressourcen für slides/` 2,2 GB) gitignored (nur referenzierter Subset via `git add -f`). (3) **CSP-Fix (KRITISCH):** Live-Deploy deckte auf — strikte Firebase-CSP (`script/style-src 'self'`) blockt **alle CDNs** von Hub+Deck (lokal/file:// unsichtbar, da keine CSP) → Hub zeigte Rohtext („[OFFLINE-MODUS]"), Deck **ungestylt**. **Alle Libs self-hosted** nach `public/lib/` (marked, lucide, html2canvas, jsPDF, **vorgebautes Tailwind v3** aus den Deck-Klassen via `scripts/tw-deck.config.js`, **12 woff2-Fonts** latin/latin-ext); CSP bleibt strikt = sicher, Artefakte truly standalone/offline-fähig. Totes `public/tailwind.min.css` (2,9 MB) entfernt. (4) **Neue Präsentations-Features:** Deck-**Timer** (MM:SS, Ampel 12/15 Min, Taste T) + **Spotlight/Fokus** (Taste L); Hub-**⌘K Command-Palette** (Fuzzy-Doc-Suche/Sprung, client-seitig/CSP-safe). **Live deployed** (Firebase `studio-4188712377-b3681`) + cache-gebustet verifiziert: **0 Konsolen-Fehler** auf Hub+Deck, Markdown/Tabellen/Fonts/Icons + Timer/Spotlight/⌘K funktional. 7 Commits (`76b6f63`→`fcd0eb4`). **(5) AI-Q&A (gleiche Session nachgezogen, LIVE):** OMM-Backend (sep. Repo) `POST /api/hub-qa` — server-seitiger Gemini (`gemini-2.5-flash`, Key serverseitig, stdlib-only, rate-limited), Rev. `00035-54m`; Hub-Co-Pilot zu **RAG** erweitert (lokale Treffer = Kontext+Quellen, Gemini = Antwort, graceful Fallback). Live verifiziert (grounded Antwort + Zitate, 0 Fehler). Frontend `a1dcb1f`, Backend `285b83d`. Hub bleibt bewusst öffentlich (DCI-Showcase). | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-09 | **Präsentationsdeck: Bug-Fixes + Rebuild auf 25 Folien (final, live)** | (1) **Deck-Bugs behoben** (`165460b`): Vorher/Nachher-Slider war funktionslos (Finished-Ebene lag ungeclippt über Studio) → echtes Full-Bleed-Vorher/Nachher; CRM-Pipeline (Lücke + leere Spalten) → Kontext-Band + Stage-Beschriftungen + höhere Spalten; Neural-Glow zeigte Raster-Platzhalter → Hero-Render füllt die Box. (2) **Konzept 25 Folien** (`c6c04cf`, freigegeben): „eine Idee/Folie", 7-Akt-Bogen, DCI-Pflicht (4 Ps + organische Kampagne) als eigene Folien. (3) **Deck auf 25 umgebaut** (`2712ff6`): 37→25 via Skript-Transform — pro Merge die **stärkere Folie mit Interaktion byte-identisch behalten**, schwächere gestrichen, Punkt verbal gefoldet; deutsche Titel, renumeriert, `totalSlides=25`, 3 Übergaben gefixt (inkl. alter „Ralph, danke"-Bug); alle render()-IDs (Slider/Kanban/ICP/Test-Matrix/Live-Render/Brand-Morph) unverändert → Interaktionen intakt. 37er archiviert (`00_abschlussbericht/deck37_backup.html`). (4) **1:1-Sprechtext** auf 25 Folien (`1a47b78`, deutsch) + Konzept-Doku. (5) **Visual-Deep-Pass:** 18/25 Folien einzeln = perfekt; programmatisch alle 25 = 0 Konsolen-Fehler/0 kaputte Bilder; frühere Overflow-„Flags" als Mess-Artefakte bestätigt. **Live deployed** (Firebase `/deck`), cache-gebustet verifiziert. | OPUS PRIME (Claude Opus 4.8) |

---

## 4. PROJEKTSTATUS

### Aktueller Stand (2026-06-09, nach Hub/Deck-CSP-Self-Hosting & Präsentations-Features)
- ✅ **Präsentationsdeck final auf 25 Folien** (von 37 konsolidiert, 2026-06-09): „eine Idee/Folie", deutsche Titel, alle Interaktionen + Live-Demos (Slider/Kanban/ICP/Test-Matrix/Live-Render/Brand-Morph) intakt; 1:1-Sprechtext (`00_abschlussbericht/Sprechtext_Abschlusspraesentation.md`) + Konzept (`Praesentationskonzept_25_Folien.md`) nachgezogen; 37er archiviert (`deck37_backup.html`). Live unter `/deck`, Visual-Deep-Pass bestanden.
- ✅ **Document Hub + Deck als CSP-konforme Standalone-Artefakte** (2026-06-09): FAQ-Template-Leak behoben; **alle CDN-Deps self-hosted** (`public/lib/`: marked, lucide, html2canvas, jsPDF, vorgebautes Tailwind, 12 woff2-Fonts) → laufen unter der strikten Live-CSP **ohne CDN/eval**, offline-fähig + portabel (Tenant-Deliverable-Modell). Live auf `studio-…web.app/document_hub` + `/deck`, 0 Konsolen-Fehler. Hub bleibt bewusst öffentlich (DCI-Showcase).
- ✅ **Neue Präsentations-/UX-Features:** Deck-**Timer** (T) + **Spotlight/Fokus** (L) für die Live-Präsentation; Hub-**⌘K Command-Palette** (Fuzzy-Doc-Suche/Sprung). Alle live verifiziert.
- ✅ **Asset-Hygiene:** referenzierte Medien versioniert; ~2,4 GB unreferenzierte Roh-Dumps gitignored (`public/visuals/`, `mirrou socialmdedia/`, `ressourcen für slides/`).
- ✅ **Hub-AI-Q&A live (RAG):** Co-Pilot synthetisiert Antworten via OMM-Backend `POST /api/hub-qa` (server-seitiger Gemini `gemini-2.5-flash`, **Key nie im Client**, rate-limited; CSP-safe da erlaubte Origin). Lokale Passagensuche liefert Kontext + Quellen, Gemini die Antwort; graceful Fallback auf reine Suche. Backend Rev. `00035-54m`, live verifiziert (grounded Antwort + Zitate, 0 Fehler).
- ✅ **5 Enterprise-Showcase-Features** (Live Presentation Sync, B2B ROI Calculator, Live AI Image Generator, Mandanten-Hub Cloner, PDF Report Compiler) vollständig integriert, synchronisiert und Playwright-getestet (0 Fehler).
- ✅ **Sprach-Warnbanner korrigiert:** Der fälschlicherweise angezeigte Warnhinweis auf voll-übersetzten englischen Cluster-Seiten wurde behoben.
- ✅ Repository-Struktur vollständig und logisch organisiert (00–10 + src/docs/public)
- ✅ Docker + GCP Cloud Run Deploy konfiguriert
- ✅ i18n implementiert — 8 Sprachen (DE/EN tiefen-vollständig; 6 weitere UI/SEO, Long-Form gekürzt)
- ✅ React 19 + Vite 6 + Tailwind v4 + SSG Build-System
- ✅ Erster vollständiger OPUS-PRIME-Audit durchgeführt (Claude Code)
- ✅ Security-Header **live aktiv** (6/6) — verifiziert
- ✅ **Live-Rev. `00049-4cf`** (2026-06-02 Antigravity-Phase: Footer-A11y + Kontaktformular an `/api/lead` verkabelt; davor `00046-bk4` mit Präsentations-Route `/deck` = `public/deck.html`, Golden-Circle-Deck). Perf zuletzt gemessen **2026-06-02 auf `00046-bk4`** (Median aus 3 Mobile-Läufen): Desktop **100/100/100/100**, Mobile **82/97/100/100** (LCP mobil 3,6 s); Unused-JS ~20 KiB (Route-Lazy-Splitting), color-contrast behoben, Hydration-Defer (CursorFollower/Progress via `useIdleMount`)
- 🟡 Mobile-Performance **85 (bester Lauf 90)**, Desktop 99 — **2026-06-06 Root-Cause behoben:** SI-Killer war das Hero-Bilderkarussell (jetzt nur ab `lg`), nicht die Hydration (TBT=0). Rest zu stabilem ≥90 = Font-Swap-Timing der mono-Eyebrows
- 🟡 Mobile-A11y 97 — Rest `target-size` (Footer-Link-Abstände)
- 🟡 Kontaktformular **verbunden** (2026-06-02, Antigravity-Phase): postet an FastAPI `/api/lead` (Opus-Magnum-Backend, `europe-west3`), live `00049-4cf`, CORS verifiziert (kein HubSpot). **Offen:** E2E-Lead-Persistenz + EU-Firestore-Speicherort (DSGVO) bestätigen. Siehe [[project-contact-form-backend]]
- 🟡 AI-Agent-Integration (Opus Magnum) — Backend live im separaten Repo `yoyo967/Opus-Magnum-Media-Porject-OS` (Firebase-EU, Multi-Tenant, Secret Manager; Antigravity-Phasen 1–3). Website konsumiert es via `/api/lead`. SaaS-Repo-Stand separat auditieren
- 📘 **Strategie-/Go-to-Market-Ebene dokumentiert** (2026-06-01): [`Deep_Audit_Report.md`](00_abschlussbericht/Deep_Audit_Report.md) (Founders/Investors) + 5 operative Follow-up-Playbooks unter [`00_abschlussbericht/follow_ups/`](00_abschlussbericht/follow_ups/) (6-Wochen-Roadmap, ICP-Akquise, 30-Tage-Checkliste, Vertriebs-Roadmap, Preismodellierung) — überführen die offenen P0/P1-Punkte in einen konkreten Umsetzungsplan ab Juni 2026.

### Nächste geplante Meilensteine
- [x] **P0** Security-Header live verifizieren nach Redeploy — ✅ erledigt
- [~] **P0** Kontaktformular — ✅ verbunden mit FastAPI `/api/lead` (EU-Backend, kein HubSpot), live `00049-4cf`, CORS 200. **Rest:** E2E-Lead-Persistenz + EU-Speicherort (DSGVO) verifizieren
- [~] **P1** Mobile-Performance ≥ 90 — 2026-05-31 großer Schritt: Route-Lazy-Splitting (Unused-JS 59→22 KiB, lokal Perf→85); **Live-Wert + letzte Meile offen**
- [x] **P1** `color-contrast` → A11y — ✅ 2026-05-31 (False-Positive root-caused + `bg-bg`-Fix)
- [x] **P1** README-GA4/Three.js-Falschangaben korrigiert — ✅ 2026-05-31
- [ ] **P1** Cluster-Long-Form ES/IT/FR/TR/RU/UK übersetzen oder Scope ehrlich kommunizieren
- [x] **P1** Standort Hamburg-HQ/Berlin vereinheitlicht (memory.md an Site angeglichen) — ✅ 2026-05-31
- [x] **P2** ESLint + `@types/react` + 7 Lint-Fehler (inkl. `rules-of-hooks`-Bug); AI-Studio-Scaffolding entfernt; `ws`-Vuln gepatcht — ✅ 2026-05-31
- [ ] **P2** tsconfig `strict` — offen (~3.900 Folgefehler = eigener Refactor)
- [x] **P3** `CLAUDE.md` anlegen + Chrome DevTools MCP integrieren — ✅ 2026-05-31

> **Detaillierter, messdatenbasierter Stand:** siehe [`AUDIT.md`](AUDIT.md).

---

## 5. WICHTIGE LINKS & RESSOURCEN

| Ressource | URL |
|-----------|-----|
| **AUDIT.md** (lebendes Qualitäts-Dossier) | [`./AUDIT.md`](AUDIT.md) |
| Live-Website (DE) | https://mirrou-creative-studio-180023265254.europe-west3.run.app/de |
| Live-Website (EN) | https://mirrou-creative-studio-180023265254.europe-west3.run.app/en |
| GitHub Repo | https://github.com/yoyo967/mirrou-creative-studio |
| GCP Project Region | europe-west3 (Frankfurt) |

---

## 6. CLAUDE CODE SETUP-ANWEISUNG

Wenn du Claude Code mit diesem Repo öffnest, führe als erstes aus:

```bash
# Claude Code Session starten
# 1. memory.md lesen (dieser File)
# 2. Dann den Masterprompt aktivieren:
```

**Prompt zum Starten einer Claude Code Session:**
```
Lies zunächst die memory.md in diesem Repo vollständig. 
Aktiviere dann OPUS PRIME Modus. 
Deine erste Aufgabe: Führe einen vollständigen Audit durch — 
technisch (Code, Build, Dependencies), strategisch (Brand, Messaging) 
und strukturell (Ordner, Vollständigkeit). 
Erstelle einen strukturierten Report nach dem Format in memory.md Abschnitt 2.
```

---

*Dieses Dokument wird automatisch durch Claude Opus 4 nach jedem Audit aktualisiert.*  
*Manuell erstellt: 2026-05-30 · Berlin, EU*
