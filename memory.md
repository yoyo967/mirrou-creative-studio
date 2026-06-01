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
- **CI/CD:** GCP Deploy via `deploy_gcp.ps1`
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

---

## 4. PROJEKTSTATUS

### Aktueller Stand (2026-05-30, nach Full-Audit)
- ✅ Repository-Struktur vollständig und logisch organisiert (00–10 + src/docs/public)
- ✅ Docker + GCP Cloud Run Deploy konfiguriert
- ✅ i18n implementiert — 8 Sprachen (DE/EN tiefen-vollständig; 6 weitere UI/SEO, Long-Form gekürzt)
- ✅ React 19 + Vite 6 + Tailwind v4 + SSG Build-System
- ✅ Erster vollständiger OPUS-PRIME-Audit durchgeführt (Claude Code)
- ✅ Security-Header **live aktiv** (6/6) — verifiziert
- ✅ **Live-Rev. `00045-qf5`** (2026-06-01; + Präsentations-Route `/deck` = `public/deck.html`, Golden-Circle-Deck mit echten Case-Bildern). Perf zuletzt gemessen auf `00041-pfg`: Desktop **100/100/100/100**, Mobile **81/97/100/100**; Unused-JS ~20 KiB (Route-Lazy-Splitting), color-contrast behoben, Hydration-Defer (CursorFollower/Progress via `useIdleMount`)
- 🟡 Mobile-Performance 81 (Desktop 100) — LCP-Render-Delay strukturell (Hydration des ganzen Baums); echter Hebel = Island-/Partial-Hydration der 15 Homepage-Sektionen
- 🟡 Mobile-A11y 97 — Rest `target-size` (Footer-Link-Abstände)
- 🔴 Kontaktformular nicht funktional auf Cloud Run — Fix über **HubSpot** geplant (~2026-06-06)
- 🔵 AI-Agent-Integration (Opus Magnum Anbindung) — geplant
- 📘 **Strategie-/Go-to-Market-Ebene dokumentiert** (2026-06-01): [`Deep_Audit_Report.md`](00_abschlussbericht/Deep_Audit_Report.md) (Founders/Investors) + 5 operative Follow-up-Playbooks unter [`00_abschlussbericht/follow_ups/`](00_abschlussbericht/follow_ups/) (6-Wochen-Roadmap, ICP-Akquise, 30-Tage-Checkliste, Vertriebs-Roadmap, Preismodellierung) — überführen die offenen P0/P1-Punkte in einen konkreten Umsetzungsplan ab Juni 2026.

### Nächste geplante Meilensteine
- [x] **P0** Security-Header live verifizieren nach Redeploy — ✅ erledigt
- [ ] **P0** Kontaktformular auf HubSpot-Backend umstellen (DSGVO-Consent) — ETA ~2026-06-06 *(bewusst offen)*
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
