# AUDIT.md — Mirrou Creative Studio
## Lebendes Qualitäts- & Performance-Dossier · OPUS PRIME

> **Status:** 🟢 PRODUKTIV · LIVE · AUDITIERT
> **Zuletzt aktualisiert:** 2026-05-31
> **Live-Revision:** `mirrou-creative-studio-00039-dqf` (Cloud Run · europe-west3) — *lokale Fixes 2026-05-31 noch nicht deployed*
> **Auditor:** OPUS PRIME (Claude Opus 4 · Claude Code)
> **Methodik:** Google Lighthouse (lokal, lab data) · echte Live-Header · verifizierter Code/Build

---

## 0. LESE-PROTOKOLL & GOVERNANCE

> **Diese Datei ist ein verbindliches, lebendes Dokument — wie `memory.md`.**
> Sie wird **immer mitgelesen** und **nach jedem Audit aktualisiert.**

- **Für KI-Modelle (Frontier-Firm-Betrieb):** Lies **`memory.md` zuerst**, danach **`AUDIT.md`** — bevor du urteilst oder änderst. `memory.md` = *wer/warum/wie* (Strategie, Masterprompt, Personas). `AUDIT.md` = *wie gesund ist das System gerade* (Messwerte, Findings, Aktionsplan). Beide zusammen sind die einzige Quelle der Wahrheit (Single Source of Truth) für den Projektzustand.
- **Für DEV:** Dies ist das Gesundheits-Dashboard. Vor jedem Release prüfen; nach jedem Deploy Lighthouse neu laufen lassen (siehe §8) und die Werte hier eintragen.
- **Für Team-Mitglieder:** Hier steht in Klartext, was exzellent läuft, was offen ist und was als Nächstes passiert — ohne Code lesen zu müssen.
- **Für das DCI-Abschlussprojekt:** Belegt mit echten, reproduzierbaren Messdaten den Qualitäts-, Performance- und Compliance-Stand der Website.

**Aktualisierungs-Pflicht (Selbst-Update):** Nach jedem Audit, Deploy oder relevanter Änderung → §1 Scorecard + §2 Lighthouse + §5 Aktionsplan + §7 Audit-Log fortschreiben und mit `chore(audit): update [DATUM]` committen. Spiegelt die `memory.md`-Selbst-Update-Regel.

---

## 1. EXECUTIVE HEALTH SCORECARD

| Dimension | Mobile | Desktop | Google-Schwelle | Status |
|-----------|:------:|:-------:|-----------------|:------:|
| **Performance** | 77 | 100 | ≥ 90 = grün | 🟡 / 🟢 |
| **Accessibility** | 93 | 97 | ≥ 90 = grün | 🟢 |
| **Best Practices** | 96 | 100 | ≥ 90 = grün | 🟢 |
| **SEO** | 100 | 100 | ≥ 90 = grün | 🟢 |
| **Security-Header** | 6 / 6 live | 6 / 6 live | A-Grade | 🟢 |
| **HTTPS / HSTS** | aktiv (preload) | aktiv (preload) | erforderlich | 🟢 |

**Gesamturteil:** Desktop = Referenzqualität (4 × ≥97). Mobile = exzellent in SEO/BP/A11y, **einzige reale Baustelle ist Mobile-Performance (77)** — getrieben von LCP/FCP über Schwelle. Security & SEO sind auf Top-Niveau.

---

## 2. LIGHTHOUSE-DIAGNOSE (echte Lab-Daten)

**Gemessen:** 2026-05-30 · `npx lighthouse` (Headless Chrome) gegen Live-URL `/de` · Methodik in §8.

### 2.1 Kategorie-Scores

| Kategorie | 📱 Mobile | 🖥️ Desktop |
|-----------|:--------:|:----------:|
| Performance | **77** | **100** |
| Accessibility | **93** | **97** |
| Best Practices | **96** | **100** |
| SEO | **100** | **100** |

### 2.2 Core Web Vitals (Google-Ampel)

| Metrik | 📱 Mobile | 🖥️ Desktop | Good ≤ | Bewertung Mobile |
|--------|:--------:|:----------:|:------:|:----------------:|
| **LCP** (Largest Contentful Paint) | 3.9 s | 0.7 s | 2.5 s | 🟡 Needs Improvement |
| **CLS** (Cumulative Layout Shift) | 0 | 0.011 | 0.1 | 🟢 Good |
| **TBT** (Total Blocking Time · INP-Proxy) | 160 ms | 0 ms | 200 ms | 🟢 Good |
| **FCP** (First Contentful Paint) | 2.7 s | 0.5 s | 1.8 s | 🟡 Needs Improvement |
| **Speed Index** | 6.0 s | 0.9 s | 3.4 s | 🟡 Needs Improvement |
| **TTI** (Time to Interactive) | 3.9 s | 0.7 s | 3.8 s | 🟡 grenzwertig |

**Lesart:** Layout-Stabilität (CLS) und Interaktivität (TBT) sind mobil bereits perfekt. Die Mobile-Lücke ist rein **Lade-/Render-Geschwindigkeit** (LCP/FCP/SI) auf gedrosselter Mobilverbindung — kein struktureller Defekt.

### 2.3 Top-Optimierungshebel (Lighthouse Opportunities)

| Hebel | Einsparung | Wirkung |
|-------|-----------|---------|
| ~~Reduce unused JavaScript~~ | ~~68 KiB~~ → **~22 KiB** | **2026-05-31 weitgehend behoben:** Route-Level-Lazy-Splitting (`src/routes/index.tsx`), `app`-Chunk 349→107 KiB (−69%); lokaler Lighthouse-Perf 78→85, LCP 3.9→3.5 s. Rest (~22 KiB in motion/router/locale) = letzte Meile, ideal via nativem MCP-Trace. Live-Wert post-Deploy bestätigen. |

### 2.4 Einzige nicht bestandene A11y-Prüfung

| Prüfung | Score | WCAG-Bezug | Aktion |
|---------|:-----:|------------|--------|
| ~~`color-contrast`~~ | **1 (behoben)** | WCAG 2.1 AA · 1.4.3 | **2026-05-31:** War **False Positive** durch `content-visibility:auto` (axe sampelte Cream-BG hinter transparenter `#contact`/`#main-footer`). Verifiziert per Computed-Styles (Ivory `#F2EFE9` auf `#080808` = ~15:1). Fix: expliziter `bg-bg` auf beiden Containern (optisch null) → 0 Fehlerknoten, lokal A11y 93→97. Rest-Punkt: `target-size` (dichte Footer-Links, grenzwertig). |

---

## 3. GOOGLE QUALITY STANDARDS — CHECKLISTE

### 3.1 Core Web Vitals
- 🟢 CLS ≤ 0.1 (Mobile 0 · Desktop 0.011)
- 🟢 TBT/INP-Proxy < 200 ms (Mobile 160 · Desktop 0)
- 🟡 LCP ≤ 2.5 s — Desktop ✓ (0.7 s) · Mobile ✗ (3.9 s)
- 🟡 FCP ≤ 1.8 s — Desktop ✓ (0.5 s) · Mobile ✗ (2.7 s)

### 3.2 SEO (Score 100 / 100)
- 🟢 SSG-Pre-Rendering aller Routen (vite-react-ssg) — crawlbares HTML ohne JS-Ausführung
- 🟢 Apex/Pillar/Cluster-Modell · `sitemap.xml` (280 URLs) · `rss.xml` · `robots.txt`
- 🟢 `llms.txt` für LLM-Discovery — Frontier-Firm-tauglich
- 🟢 hreflang-Alternates über 8 Sprachen · Person/Organization JSON-LD
- 🟢 Meta-Title/Description, Canonical, OpenGraph vorhanden

### 3.3 Accessibility (WCAG)
- 🟢 93 (Mobile) / 97 (Desktop)
- 🔴 Einziger Blocker: `color-contrast` (siehe §2.4)

### 3.4 Best Practices
- 🟢 96 (Mobile) / 100 (Desktop)
- 🟢 HTTPS erzwungen · keine Console-Errors im Lab · keine veralteten APIs

### 3.5 Security-Header (live verifiziert 2026-05-30)
| Header | Wert | Status |
|--------|------|:------:|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | 🟢 |
| `Content-Security-Policy` | restriktiv (`default-src 'self'`, kein `unsafe-eval`) | 🟢 |
| `X-Content-Type-Options` | `nosniff` | 🟢 |
| `X-Frame-Options` | `DENY` | 🟢 |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | 🟢 |
| `Permissions-Policy` | `geolocation=(), camera=(), microphone=(), payment=(), usb=()` | 🟢 |

> Header werden in Server- **und** Location-Blöcken gesetzt (nginx replace-not-merge umgangen) — auch `/assets/*` liefert die CSP. Verifiziert auf Dokument **und** Asset.

---

## 4. OPUS PRIME FINDINGS

### 🟢 STÄRKEN (Referenzqualität)
- **Desktop-Performance perfekt (100)** + CWV grün — die Lighthouse-Optimierung (self-hosted Fonts, Hero-LCP-Preload, `content-visibility`, Code-Splitting) wirkt.
- **SEO 100 / 100** auf beiden Geräten; SSG + strukturierte Daten + `llms.txt`.
- **Security A-Grade** — 6/6 Header live, HSTS-preload, restriktive CSP ohne `unsafe-eval`.
- **Saubere Build-Architektur** — Locale-Code-Splitting (de/en/ru/uk… als eigene Chunks), immutable Asset-Caching, gzip-9.
- **Secrets-Hygiene** — keine exponierten Keys im Code/Build.

### 🟡 OPTIMIERUNGSPOTENZIAL
- **Mobile-Performance 77** → Ziel ≥ 90: ~68 KiB ungenutztes JS entfernen, LCP/FCP-Pfad mobil weiter straffen.
- **Color-Contrast** (WCAG AA) — einzelne Paare anheben → A11y → 100.
- **i18n-Tiefe:** `clusters`-Long-Form in ES/IT/FR/TR/RU/UK ~−74 % vs DE/EN.
- **1 moderate npm-Vuln** (transitiv, `ws`) — beobachten/patchen.

### 🔴 KRITISCHE FINDINGS
- **Kontaktformular nicht funktional** auf Cloud Run (`data-netlify` wirkungslos + `preventDefault` ohne Fetch) → Leads gehen verloren. **Fix geplant über HubSpot (~KW 2026-06).** Bis dahin bewusste, akzeptierte Lücke. → `src/components/ContactForm.tsx`.

### 🔵 STRATEGISCHE EMPFEHLUNGEN
- **GA4-Inkonsistenz:** README nennt GA4, kein Code/Consent vorhanden → entweder DSGVO-konform (Consent-Gate) implementieren oder Claim entfernen.
- **Standort Berlin ↔ Hamburg** zwischen `memory.md`/Schema.org/Boilerplate vereinheitlichen.
- **Toolchain härten:** `tsconfig` `strict` + ESLint (aktuell 7 bekannte `key`-Prop-TS-Fehler als P2-Tech-Debt).
- **AI-Agent-Anbindung** (Opus-Magnum-Ökosystem) als nächste Ebene vorbereiten.

---

## 5. AKTIONSPLAN (synchron mit `memory.md` §4)

| Priorität | Maßnahme | Aufwand | Owner | Status |
|-----------|----------|---------|-------|--------|
| ✅ P0 | Security-Header live | — | DEV | **erledigt 2026-05-30** |
| ✅ P0 | Root-Duplikat / AI-Studio-Leftover entfernt | — | DEV | **erledigt 2026-05-30** |
| 🔴 P0 | Kontaktformular → HubSpot-Backend (DSGVO-Consent) | M | Ralph / DEV | offen — ETA ~2026-06-06 |
| 🟡 P1 | Mobile-Perf ≥ 90 (Unused JS, LCP/FCP) | M | DEV | 🟢 **2026-05-31:** Route-Lazy-Splitting, Unused-JS 59→22 KiB, `app` 349→107 KiB, lokal Perf→85. Live-Wert + letzte Meile offen |
| ✅ P1 | `color-contrast` → A11y | S | DEV/Design | **erledigt 2026-05-31** (False-Positive root-caused + `bg-bg`-Fix) |
| ✅ P1 | README-GA4/Three.js-Falschangaben korrigiert | S | DEV | **erledigt 2026-05-31** |
| 🟡 P1 | Cluster-Long-Form 6 Sprachen oder Scope ehrlich kommunizieren | L | Content | offen |
| ✅ P1 | Standort Hamburg-HQ/Berlin vereinheitlicht (`memory.md`) | S | Brand | **erledigt 2026-05-31** (Site war konsistent) |
| 🟡 P2 | `tsconfig strict` | M | DEV | offen — ~3.900 Folgefehler = eigener Refactor |
| ✅ P2 | ESLint + `@types/react` + 7 Lint-Fehler (inkl. `rules-of-hooks`-Bug) | M | DEV | **erledigt 2026-05-31** |
| ✅ P2 | `ws`-Vuln patchen | S | DEV | **erledigt 2026-05-31** (`npm audit fix` → 0 Vulns) |
| ✅ P2 | AI-Studio-Scaffolding (GEMINI/APP_URL) entfernt | S | DEV | **erledigt 2026-05-31** |
| ✅ P3 | `CLAUDE.md` (Masterprompt versioniert) | S | DEV | **erledigt 2026-05-31** |
| ✅ P3 | Chrome DevTools MCP integriert (Projekt+User, EU-safe) | S | DEV | **erledigt 2026-05-31** |

*Aufwand: S = Stunden · M = Tag(e) · L = mehrtägig.*

---

## 6. VERIFIZIERTER TECH-STACK (Stand 2026-05-30)

| Layer | Technologie | Version |
|-------|-------------|---------|
| Frontend | React | ^19.0.1 |
| Build | Vite | ^6.2.3 |
| Sprache | TypeScript | ~5.8.2 |
| Styling | Tailwind CSS | ^4.1.14 |
| Animation | Motion | ^12.23.24 |
| Rendering | vite-react-ssg (statisches Pre-Rendering) | ^0.9.0 |
| i18n | react-i18next (8 Sprachen, dyn. Locale-Import) | ^17.0.7 |
| Hosting | Google Cloud Run · `europe-west3` | — |
| Container | Docker Multi-Stage → `nginx:alpine` | — |
| Deploy | `deploy_gcp.ps1` (gcloud builds + run deploy) | — |

> **Korrektur ggü. älteren Notizen:** **kein Three.js / @react-three** im Projekt (per `package.json` verifiziert). Frühere Stack-Beschreibungen, die 3D nannten, waren falsch.

**Dev-Tooling-Ergänzungen (2026-05-31):**
- **Route-Level-Code-Splitting:** Leaf-Pages via react-router `lazy` (`src/routes/index.tsx`) — `app`-Chunk 349→107 KiB.
- **`@types/react` / `@types/react-dom` (v19)** ergänzt (waren nicht installiert → React/JSX war als `any` getypt).
- **ESLint** (flat config, `eslint.config.js`) + Scripts `typecheck`/`lint`/`check`.
- **Chrome DevTools MCP** (`.mcp.json`, EU-safe Flags) → Perf-Trace-Loop. Doku: [`docs/DEVTOOLS_MCP.md`](docs/DEVTOOLS_MCP.md).
- `tsconfig` `strict`: bewusst **noch nicht** aktiviert (~3.900 Folgefehler).

---

## 7. AUDIT-LOG (append-only)

| Datum | Scope | Key Findings / Aktion | Auditor |
|-------|-------|------------------------|---------|
| 2026-05-30 | Full-Audit (Code/Build/Deps/Brand/Struktur/AI) | Security-Header fehlten live → in `nginx.conf` ergänzt; Kontaktformular-Defekt entdeckt; i18n-Tiefe & GA4/Standort-Inkonsistenzen geflaggt. | OPUS PRIME |
| 2026-05-30 | Deploy + Live-Verifikation | Rev. `00038-zk4`: 6/6 Header live, CSP auf Dokument+Asset, Status 200, keine CSP-Breakage. | OPUS PRIME |
| 2026-05-30 | Leftover-Cleanup | Google-AI-Studio-Link aus Team-Daten entfernt → Rev. `00039-dqf`. | OPUS PRIME |
| 2026-05-30 | **Lighthouse-Baseline + AUDIT.md erstellt** | Mobile 77/93/96/100 · Desktop 100/97/100/100. CWV: Mobile-LCP 3.9 s / FCP 2.7 s = einzige Schwellen-Misses; CLS/TBT grün. A11y-Blocker: `color-contrast`. Perf-Hebel: 68 KiB unused JS. **Dieses Dossier als lebendes Dokument etabliert.** | OPUS PRIME |
| 2026-05-31 | **Chrome DevTools MCP + 8-Punkte-Härtung** (lokal, noch nicht deployed) | MCP integriert (Projekt+User, EU-safe Flags). Fixes: `color-contrast` (False-Positive via `content-visibility:auto` → `bg-bg`, verifiziert per Computed-Styles); Route-Lazy-Splitting (Unused-JS 59→22 KiB, `app` 349→107 KiB, Perf lokal 78→85); `@types/react`+ESLint (7 Lint-Fehler inkl. `rules-of-hooks`-Bug behoben, `tsc`/`eslint` grün); `ws`-Vuln gepatcht; GEMINI/AI-Studio-Scaffolding entfernt; README-GA4/Three.js korrigiert; Standort in memory.md vereinheitlicht; `CLAUDE.md` angelegt. Build + Hydration + SPA-Nav verifiziert (0 Console-Errors). **HubSpot/Kontaktformular bewusst ausgenommen.** | OPUS PRIME (Claude Opus 4.8) |

---

## 8. WARTUNGS- & UPDATE-PROTOKOLL

**Wann aktualisieren:** nach jedem Deploy, jeder Perf-/A11y-/SEO-relevanten Änderung, mindestens vor jedem Release.

**Lighthouse reproduzieren (lokal, lab data):**
```powershell
$url = "https://mirrou-creative-studio-180023265254.europe-west3.run.app/de"
# Desktop
npx --yes lighthouse $url --quiet --chrome-flags="--headless=new" `
  --output=json --output-path=C:\tmp\lh_desktop.json `
  --only-categories=performance,accessibility,best-practices,seo --preset=desktop
# Mobile (Default-Throttling)
npx --yes lighthouse $url --quiet --chrome-flags="--headless=new" `
  --output=json --output-path=C:\tmp\lh_mobile.json `
  --only-categories=performance,accessibility,best-practices,seo
```

**Alternative (Googles gehostetes Lighthouse, Feld- + Labordaten):** PageSpeed Insights API
`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=<URL>&strategy=mobile`
*(keyless rate-limited → für Dauerbetrieb API-Key hinterlegen).*

**Live-Header prüfen:**
```powershell
(Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing).Headers
```

**Nach dem Messen:** §1, §2, §5, §7 fortschreiben → `git commit -m "chore(audit): update [DATUM]"` → push.

---

## 9. FÜR WEN IST DIESES DOKUMENT

- 🤖 **KI-Modelle / Agenten:** verbindlicher Kontext nach `memory.md`. Niemals aus Annahmen über den Projektzustand urteilen — hier stehen die echten Messwerte.
- 👩‍💻 **DEV:** Pre-Release-Gate, Regressions-Referenz, reproduzierbare Mess-Kommandos.
- 👥 **Team:** Klartext-Statusbild ohne Code.
- 🎓 **DCI-Abschlussprojekt:** belastbarer, datengestützter Qualitäts-/Compliance-Nachweis.

---

*Lebendes Dokument · automatisch durch OPUS PRIME (Claude Opus 4) nach jedem Audit fortgeschrieben.*
*Schwesterdokument zu `memory.md`. Erstellt 2026-05-30 · EU.*
