# AUDIT.md — Mirrou Creative Studio
## Lebendes Qualitäts- & Performance-Dossier · OPUS PRIME

> **Status:** 🟢 PRODUKTIV · LIVE · AUDITIERT
> **Zuletzt aktualisiert:** 2026-06-08 (5 Enterprise Showcase Features implementiert, Playwright-getestet und im Document Hub / Slide Decks synchronisiert)
> **Live-Revision:** Firebase-Hosting-Front `studio-4188712377-b3681.web.app` (2026-06-08, 5 Enterprise-Features live synchronisiert) · Cloud-Run-Front `mirrou-creative-studio-00049-4cf` (europe-west3)
> **Auditor:** OPUS PRIME (Claude Code · Antigravity AI)
> **Methodik:** Google Lighthouse (lokal, lab data) · echte Live-Header · verifizierter Code/Build · DNS & GCP Audit

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
| **Performance** | 85 (Median; sauberer Lauf 90) | 99 | ≥ 90 = grün | 🟡 / 🟢 |
| **Accessibility** | 100 | 100 | ≥ 90 = grün | 🟢 |
| **Best Practices** | 100 | 100 | ≥ 90 = grün | 🟢 |
| **SEO** | 100 | 100 | ≥ 90 = grün | 🟢 |
| **Security-Header** | 6 / 6 live | 6 / 6 live | A-Grade | 🟢 |
| **HTTPS / HSTS** | aktiv (preload) | aktiv (preload) | erforderlich | 🟢 |

**Gesamturteil (Firebase-Front, gemessen 2026-06-06):** Desktop = **Referenzqualität 99/100/100/100** (LCP 0,7 s). Mobile = **85/100/100/100** (Median 3 Läufe; bester Lauf **90/100/100/100**, SI 3,7 s) — exzellent in A11y/SEO/BP, einzige Baustelle bleibt Mobile-Performance. **Root-Cause heute gefunden:** Das 20-Bild-Hero-Karussell (`HeroImageSequence`, Wechsel alle 3 s) hielt das größte Element während des gesamten Ladefensters in Bewegung → blähte Speed Index auf ~5,9 s. Karussell läuft jetzt nur ab `lg` (mobil bleibt das statische LCP-Bild). Zusätzlich: CSS-Reveal statt JS-gated Motion im Hero, Mobile-`backdrop-blur`/Grain-Repaint aus. **Residuum zu stabilen ≥90:** Lab-Varianz + Font-Swap-Timing (mono-Eyebrows laden deferred → Repaint im Messfenster).

---

## 2. LIGHTHOUSE-DIAGNOSE (echte Lab-Daten)

**Gemessen:** 2026-06-06 · `npx lighthouse` (Headless Chrome) gegen die **Firebase-Hosting-Front** `studio-4188712377-b3681.web.app/de` · Mobile = Median aus 3 Läufen (schwankt ±3–5; Läufe 90/83/85), Desktop = 1 Lauf · Methodik in §8.

### 2.1 Kategorie-Scores

| Kategorie | 📱 Mobile | 🖥️ Desktop |
|-----------|:--------:|:----------:|
| Performance | **85** (bester Lauf 90) | **99** |
| Accessibility | **100** | **100** |
| Best Practices | **100** | **100** |
| SEO | **100** | **100** |

### 2.2 Core Web Vitals (Google-Ampel)

| Metrik | 📱 Mobile (bester Lauf) | 🖥️ Desktop | Good ≤ | Bewertung Mobile |
|--------|:--------:|:----------:|:------:|:----------------:|
| **LCP** (Largest Contentful Paint) | 3.1 s | 0.7 s | 2.5 s | 🟡 Needs Improvement |
| **CLS** (Cumulative Layout Shift) | 0–0.001 | 0.011 | 0.1 | 🟢 Good |
| **TBT** (Total Blocking Time · INP-Proxy) | 0 ms | 0 ms | 200 ms | 🟢 Good |
| **FCP** (First Contentful Paint) | 2.4 s | 0.5 s | 1.8 s | 🟡 Needs Improvement |
| **Speed Index** | 3.7 s (Median-Lauf bis 5.8 s) | 0.9 s | 3.4 s | 🟡 lab-abhängig |
| **TTI** (Time to Interactive) | ~3.5 s | 0.7 s | 3.8 s | 🟢 |

**Lesart:** Layout-Stabilität (CLS) und Interaktivität (TBT) sind mobil perfekt. Die Mobile-Lücke ist rein **Lade-/Render-Geschwindigkeit** (LCP/FCP/SI) auf gedrosselter Mobilverbindung. Speed Index schwankt jetzt stark zwischen Läufen (3,7–5,8 s) — der deterministische SI-Treiber (Hero-Karussell) ist behoben; das Residuum ist Font-Swap-Timing + Lab-Jitter.

### 2.3 Top-Optimierungshebel (Lighthouse Opportunities)

| Hebel | Einsparung | Wirkung |
|-------|-----------|---------|
| ~~Reduce unused JavaScript~~ | ~~68 KiB~~ → **~22 KiB** | **2026-05-31 behoben:** Route-Level-Lazy-Splitting (`src/routes/index.tsx`), `app`-Chunk 349→107 KiB (−69%). |
| ~~Hero-Bilderkarussell im Ladefenster~~ | **~1,3 MB + SI** | **2026-06-06 behoben (Root-Cause des SI):** `HeroImageSequence` (20 Bilder, Wechsel alle 3 s mit 1,5-s-Crossfade) hielt das größte Element während der gesamten Messung in Bewegung → SI ~5,9 s. Läuft jetzt nur ab `lg` (`window.matchMedia`), mobil bleibt das statische LCP-Bild. Median 82→85, bester Lauf 90, SI bestenfalls 3,7 s. `028dece`. |
| Above-the-fold JS-gated Reveal | Paint-Timing | **2026-06-06:** Hero-Text war via Motion `initial:{opacity:0}` im SSG-HTML unsichtbar bis Hydration → CSS-Keyframe `.reveal-up` (Paint statt Hydration) + Mobile-`backdrop-blur`/Grain-Repaint aus. `20b8b4c`. |
| **Font-Swap-Timing (offen)** | SI-Stabilität | mono-Eyebrows/Labels laden via `fonts-deferred.css` → Swap-Repaint im Messfenster = Rest-SI-Varianz. Hebel für stabile ≥90: kritische Fonts vorladen oder `font-display: optional`. Risiko: FOUT — vor Abgabe abwägen. |

### 2.4 Einzige nicht bestandene A11y-Prüfung

| Prüfung | Score | WCAG-Bezug | Aktion |
|---------|:-----:|------------|--------|
| ~~`color-contrast`~~ | **1 (behoben)** | WCAG 2.1 AA · 1.4.3 | **2026-05-31:** War **False Positive** durch `content-visibility:auto` (axe sampelte Cream-BG hinter transparenter `#contact`/`#main-footer`). Verifiziert per Computed-Styles (Ivory `#F2EFE9` auf `#080808` = ~15:1). Fix: expliziter `bg-bg` auf beiden Containern (optisch null) → 0 Fehlerknoten, lokal A11y 93→97. Rest-Punkt: `target-size` (dichte Footer-Links, grenzwertig). |

---

## 3. GOOGLE QUALITY STANDARDS — CHECKLISTE

### 3.1 Core Web Vitals
- 🟢 CLS ≤ 0.1 (Mobile 0 · Desktop 0.011)
- 🟢 TBT/INP-Proxy < 200 ms (Mobile 160 · Desktop 0)
- 🟡 LCP ≤ 2.5 s — Desktop ✓ (0.7 s) · Mobile ✗ (3.6 s)
- 🟡 FCP ≤ 1.8 s — Desktop ✓ (0.6 s) · Mobile ✗ (2.5 s)

### 3.2 SEO (Score 100 / 100)
- 🟢 SSG-Pre-Rendering aller Routen (vite-react-ssg) — crawlbares HTML ohne JS-Ausführung
- 🟢 Apex/Pillar/Cluster-Modell · `sitemap.xml` (280 URLs) · `rss.xml` · `robots.txt`
- 🟢 `llms.txt` für LLM-Discovery — Frontier-Firm-tauglich
- 🟢 hreflang-Alternates über 8 Sprachen · Person/Organization JSON-LD
- 🟢 Meta-Title/Description, Canonical, OpenGraph vorhanden

### 3.3 Accessibility (WCAG)
- 🟢 100 (Mobile) / 100 (Desktop)
- 🟢 `color-contrast` behoben (war False-Positive, siehe §2.4) · Footer-Tap-Targets vergrößert (Deploy `00049-4cf`)

### 3.4 Best Practices
- 🟢 100 (Mobile) / 100 (Desktop)
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
- **Mobile-Performance 85 (bester Lauf 90)** → Ziel stabil ≥ 90. **Korrektur der früheren These:** Es war *nicht* Hydration (TBT mobil = 0 ms) — der SI-Treiber war das Hero-Bilderkarussell (2026-06-06 behoben, nur noch ab `lg`). Letzte Meile = Font-Swap-Timing der mono-Eyebrows + Lab-Varianz.
- **i18n-Tiefe:** `clusters`-Long-Form in ES/IT/FR/TR/RU/UK ~−74 % vs DE/EN.
- **npm-Vulns: 0** (zuletzt `npm audit fix` 2026-05-31; `ws`-Vuln gepatcht).

### 🔴 KRITISCHE FINDINGS
- **Keine offenen kritischen Findings.** Der frühere P0-Blocker (Kontaktformular ohne Backend → Leads gingen verloren) ist behoben (Antigravity-Phase, 2026-06-02): Form postet jetzt per `fetch` an `${SITE.api}/api/lead` — FastAPI-Backend des Opus-Magnum-Repos (`…923137317598…europe-west3`). Live `00049-4cf`, CORS-Preflight verifiziert (HTTP 200, 2026-06-04). Honeypot + DSGVO-Consent-Checkbox vorhanden. → `src/components/ContactForm.tsx:43`.

### 🟢 CONTACT-FORM E2E VERIFIZIERT (2026-06-04)
- **Lead-Pfad funktioniert end-to-end:** Test-Lead via `POST /api/lead` → HTTP 200 → in Firestore `tenants/mirrou/leads` persistiert (per Firestore-REST-API gegengelesen, danach Test-Daten wieder gelöscht). **Cross-Project-IAM** (Backend `923137317598` → Firestore-Projekt `180023265254`) funktioniert. **DSGVO:** DB `opus-eu` = **`europe-west3`** (EU) bestätigt.
- **CSP-Root-Cause behoben:** alte CSP `connect-src 'self'` hätte den Cross-Origin-`fetch` im Browser geblockt → `connect-src` um die API-Origin erweitert in `firebase.json` (live auf `…web.app`) + `nginx.conf` (run.app-Pfad, noch nicht redeployed). Browser-Pfad auf Firebase Hosting damit offen.
- **Lead-Inbox-UI vorhanden + live (verifiziert 2026-06-06):** im Opus-Magnum-Cockpit (`pages/LeadInbox.tsx`, Header → „Lead Inbox"), 2026-06-06 um CSV-Export + Neu-Lead-Badge erweitert (Rev `opus-magnum-media-v3-00023-fcs`). Siehe [[contact-form-backend]].
- **Rest (nur Komfort, kein P0):** keine Lead-Benachrichtigung per E-Mail (Brevo-Plan in `docs/CONTACT_FORM_BACKEND.md` unimplementiert) → Leads liegen still in Firestore, bis jemand die Inbox öffnet.

### 🟢 DNS- & PROJEKT-AUDIT ERFOLGREICH (2026-06-07)
- **IONOS DNS-Einträge für `mirrou.studio`**:
  - **A-Eintrag**: `@` zeigt auf Firebase-Hosting-IP `199.36.158.100` (Kanonischer Frontend-Target).
  - **TXT-Eintrag (Eigentumsnachweis)**: `@` mit Wert `hosting-site=studio-4188712377-b3681` verifiziert das Eigentum für das Firebase-Hosting.
  - **TXT-Eintrag (Zertifikat)**: `_acme-challenge` mit Wert `RE6TfgcOnYSMrJ25SOwZK9ugTljXduW6zZAPm9RyBiU` stellt das SSL-Zertifikat aus (temporäres ACME-Token).
  - **CNAME-Eintrag**: `www` zeigt auf `studio-4188712377-b3681.web.app` (www-Subdomain-Routing auf Staging).
- **IONOS-Betriebshinweise**:
  - Standard-A-Eintrag auf `@` (IONOS-Parkseite) wird gelöscht, um das neue Routing zu aktivieren.
  - Vorhandene MX-Einträge werden nicht modifiziert, damit E-Mails ungestört weiterlaufen.
- **GCP-Projekt-Föderation**:
  - Die GCP-Projekte `opus-magnum-ai` (ID: `923137317598`) und `studio-4188712377-b3681` (ID: `180023265254` / Firebase-Backbone) sind erfolgreich föderiert. Cross-Project-IAM-Berechtigungen erlauben dem FastAPI-Backend (`923137317598`) den sicheren Zugriff auf die Firestore-Instanz `opus-eu` (`europe-west3` in `180023265254`).
  - Unbeteiligte `sovereign-*` Legacy-Dienste (experimentelle Überbleibsel) sind identifiziert und als inaktiv markiert (kein Einfluss auf die aktive Infrastruktur).
- **Single Source of Truth**:
  - Alle URLs und DNS-Einträge sind in [docs/URLS.md](file:///c:/Users/HP/Desktop/abschlussprojekt/docs/URLS.md) konsolidiert und im interaktiven Document Hub registriert.

### 🔵 STRATEGISCHE EMPFEHLUNGEN
- ~~**GA4-Inkonsistenz**~~ **(erledigt/verifiziert 2026-06-06):** README (Zeile 60) ist ehrlich — „None at launch … any future analytics is consent-gated (DSGVO)"; kein gtag/Analytics-Code im `src/`. Keine Inkonsistenz mehr.
- **Standort Berlin ↔ Hamburg** zwischen `memory.md`/Schema.org/Boilerplate vereinheitlichen.
- **Toolchain härten:** `tsconfig` `strict` + ESLint (aktuell 7 bekannte `key`-Prop-TS-Fehler als P2-Tech-Debt).
- **AI-Agent-Anbindung** (Opus-Magnum-Ökosystem) — teilweise umgesetzt: Antigravity-Phasen 1–3 im separaten Repo `Opus-Magnum-Media-Porject-OS` (Firebase/Firestore-EU `opus-eu`, Multi-Tenant `tenants/{tenantId}`, GCP Secret Manager). Website konsumiert dessen Backend bereits via `/api/lead`. Stand des SaaS-Backends im eigenen Repo auditieren.

---

## 5. AKTIONSPLAN (synchron mit `memory.md` §4)

| Priorität | Maßnahme | Aufwand | Owner | Status |
|-----------|----------|---------|-------|--------|
| ✅ P0 | Security-Header live | — | DEV | **erledigt 2026-05-30** |
| ✅ P0 | Root-Duplikat / AI-Studio-Leftover entfernt | — | DEV | **erledigt 2026-05-30** |
| ✅ P0 | Kontaktformular → EU-Backend (DSGVO-Consent) | M | DEV | **erledigt 2026-06-04:** E2E verifiziert — Test-Lead `POST /api/lead`→200→Firestore `tenants/mirrou/leads` (gegengelesen + gelöscht), Cross-Project-IAM ok, DB `opus-eu`=`europe-west3` (EU). CSP-Fix in `firebase.json`+`nginx.conf`. Offen nur Komfort: E-Mail-Benachrichtigung (Brevo) + Lead-UI. |
| 🟡 P1 | Mobile-Perf ≥ 90 (Unused JS, LCP/FCP) | M | DEV | 🟢 **2026-05-31:** Route-Lazy-Splitting, Unused-JS 59→22 KiB. **2026-06-06: Root-Cause SI gefunden+behoben** — Hero-Karussell nur noch ab `lg` (`028dece`) + CSS-Reveal/Mobile-Paint (`20b8b4c`); Median **82→85**, bester Lauf **90**, beide auf Firebase-Front deployed. Rest zu stabilem ≥90 = Font-Swap-Timing (Risiko-Abwägung vor Abgabe) |
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
| 2026-05-31 | **Deploy `00040-cdb` + Live-Verifikation** | Live-Lighthouse: Mobile **78/97**/96/100 · Desktop **100/100/100/100**. `color-contrast` **live behoben** (Desktop-A11y 97→100, Mobile 93→97); Unused-JS live ~59→**20 KiB**; LCP 3.9→3.7, FCP 2.7→2.5. Lazy-Chunks im Prod-Build bestätigt; `npm ci` → 0 vulns. Rest offen: Mobile-Perf 78 (LCP/FCP) + Mobile-`target-size` (dichte Footer-Links). | OPUS PRIME (Claude Opus 4.8) |
| 2026-05-31 | **Deploy `00041-pfg` + Hydration-Defer-Verifikation** | Maßnahme 1 (CursorFollower + Scroll-Progress via `useIdleMount` deferred) live. Warm-Re-Trace: **Render-Delay 552→553 ms = unverändert** (LCP-Delay ist strukturell die Gesamt-Hydration, nicht die Widgets) — ehrlich dokumentiert. **Aber** Lighthouse live verbessert: **Mobile-Perf 78→81, Best-Practices 96→100** (weniger Main-Thread + Touch-Bugfix); Desktop bleibt 100/100/100/100; CLS 0, keine Regression. Nächster echter LCP-Hebel = Island-/Partial-Hydration der 15 Homepage-Sektionen. | OPUS PRIME |
| 2026-05-31 | **Nativer Perf-Trace (Chrome DevTools MCP, mobil 4×CPU/Slow-4G)** | LCP-Element = Hero-`.webp`; Auslieferung optimal (h3, Preload greift, immutable, ~0,4 ms Download). Einzige render-blockierende Ressource = CSS-Bundle (13 ms, vernachlässigbar). **Engpass: LCP-Render-Delay 552 ms (85,6 %) = Main-Thread-Hydration** (React/i18n/Motion), nicht Netzwerk. Maßnahme 1 umgesetzt: dekorative Client-Effekte (CursorFollower, Scroll-Progress) via `useIdleMount` aus dem Hydration-Kritikpfad deferren (client-only, behebt nebenbei Touch-SSG-Mismatch). Offen: Below-the-fold-Section-Hydration (Islands), Hero-`backdrop-blur`/`mix-blend` entschärfen. `ParticleCanvas` = toter Code (nirgends importiert). | OPUS PRIME |
| 2026-05-31 | **Chrome DevTools MCP + 8-Punkte-Härtung** (Code-Stand vor Deploy) | MCP integriert (Projekt+User, EU-safe Flags). Fixes: `color-contrast` (False-Positive via `content-visibility:auto` → `bg-bg`, verifiziert per Computed-Styles); Route-Lazy-Splitting (Unused-JS 59→22 KiB, `app` 349→107 KiB, Perf lokal 78→85); `@types/react`+ESLint (7 Lint-Fehler inkl. `rules-of-hooks`-Bug behoben, `tsc`/`eslint` grün); `ws`-Vuln gepatcht; GEMINI/AI-Studio-Scaffolding entfernt; README-GA4/Three.js korrigiert; Standort in memory.md vereinheitlicht; `CLAUDE.md` angelegt. Build + Hydration + SPA-Nav verifiziert (0 Console-Errors). **HubSpot/Kontaktformular bewusst ausgenommen.** | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-01 | **Doku-Konsistenz: Strategie-Deliverables eingepflegt** | Neue Dokumente registriert: `Deep_Audit_Report.md`+`.pdf` (Founders/Investors) + 5 Strategie-Follow-ups (`follow_ups/`, je `.md`+`.pdf`) + PDF-Build-Skripte (Playwright). **Faktenkonflikt korrigiert:** Deep Audit Report §VIII zitierte veraltete Live-Werte (Rev. `00040-cdb`, Mobile-Perf **78** / Best-Practices **96**) — angeglichen an den hier verifizierten Live-Stand Rev. `00041-pfg` (Mobile **81/97/100/100**) und PDF neu generiert. Scorecard §1/§2 unverändert (keine neue Messung, keine Code-/Deploy-Änderung). Follow-up-Playbooks konsistent mit Aktionsplan §5 (HubSpot-P0, Mobile-Perf-P1, EU AI Act Aug 2026). | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-01 | **GitHub-OS Folge-Schritte (Deploy-Action · Agentic PoC · Doku)** | (1) Deploy-as-Action `deploy.yml` (OIDC -> Cloud Run, ersetzt `deploy_gcp.ps1`) + `docs/DEPLOY_OIDC_SETUP.md` -- dormant bis WIF-Setup, kein statischer Key. (2) Agentic PoC `brief-to-copy.yml` (Issue-Label `brief-ready` -> Claude-Copy-Draft) + Issue-Template `creative-brief.md` -- dormant bis `ANTHROPIC_API_KEY`, laeuft nie bei Push. (3) GitHub-OS in Abschlussbericht §6 + Buch Kap. 8 integriert (KOMPLETT + Bericht-HTML/PDF neu). Kein Deploy (repo-only), Live-Rev. bleibt `00046-bk4`. | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-01 | **GitHub als Orchestration & Audit OS integriert** | GitHub von Versionsspeicher zur 5. Frontier-Firm-Schicht erhoben: kanonisches Doku `01_strategie/github-frontier-firm-os.md` + echter CI-Quality-Gate `.github/workflows/ci.yml` (typecheck/lint/build) + OS-Layer in `partners-tools.md`, Deep Audit §VII, memory.md, Deck-Slide. Repo=SSoT, Commit-History=EU-AI-Act-Audit-Trail. Deploy `00045-qf5`→`00046-bk4`. | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-01 | **Why/How/What-Präsentation als `/deck`-Route** | Hyperprofessionelle Golden-Circle-Präsentation (24 Slides, Dark Luxury) für Dritte erstellt → `public/deck.html`, live unter `mirrou.studio/deck` (nginx `try_files $uri.html`). CSP-konform (selbst-gehostete Fonts via `@font-face`, relative Pfade — live & lokal). Echte Case-Visuals (`public/images/cases/`, 4 Hero + 6 Filmstrip), neue Slides (ICP-Personas, Wettbewerbs-Quadrant, Roadmap). Aus `01_strategie/` gegroundet. **Erweitert (`00045-qf5`):** Case-Bilder inline base64 (bulletproof), 4 on-brand Daten-Visualisierungen (ICP-Radar/Revenue-Bars/6-Wo-Gantt/Team-Bars), Socials. SSG-Build grün, `/deck` live verifiziert. Scorecard §1/§2 unverändert. | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-01 | **Buch-Alignment + Team-Material + Social/Rollen-Deploy** | Gesamtes AbschlussprojektBuch (12 Kap. + KOMPLETT) + Abschlussbericht auf Frontier-Firm-Narrativ angeglichen; Team-Briefing + KI-Literacy-Nachweis (`07_compliance/ki-literacy-nachweis.md`) + Olha-Doppelrollen-Guide erstellt; alle 4 Deliverable-Sets gegen Repo verifiziert (real vs. Konzept/Template/extern). **Deploy `00041-pfg`→`00043-ppt`:** LinkedIn-Company-Link korrigiert (Platzhalter `mirrou-studio`→ID `123233907`, inkl. statischem JSON-LD in `index.html`); Olha-Rolle „Performance Marketing" ergänzt (8 Locales + site-data + Strukturdaten). `typecheck` + SSG-Build grün, live verifiziert. Scorecard §1/§2 unverändert (reine Content-/SEO-Änderung). | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-02 | **Abgabe-Check: frische Lighthouse-Messung + Doku-Konsistenz** | Frische Live-Messung (`npx lighthouse` v13.3.0 gegen `00046-bk4`, Median 3 Mobile-Läufe 79/82/82): **Mobile 82/97/100/100 · Desktop 100/100/100/100** (LCP mobil 3,6 s / FCP 2,5 s, CLS 0). Veraltete Werte in Abgabe-Deliverables korrigiert: Roadmap-Follow-up nannte Mobile-Perf **78** (→82); Abschlussbericht/Deep-Audit/TEAM_BRIEFING zitierten Rev. `00041-pfg` als „live" (→`00046-bk4`, 2026-06-02). HTML + 3 PDFs neu gerendert (Quelle=`.md`). AUDIT.md war selbst inkonsistent (Gesamturteil nannte noch `00040-cdb`/78) → §1/§2/§3/§5 vereinheitlicht. **+ `claude.yml`-Halbheit behoben** (@claude via Vertex/WIF; fehlendes `docs/CLAUDE_VERTEX_SETUP.md` ergänzt + committed). Kein Deploy, Live-Rev bleibt `00046-bk4`. | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-02 | **Code-Kennzahlen gegen `src/` verifiziert + vereinheitlicht** | Echte Werte aus `src/`: **34 Komponenten** (`src/components/*.tsx`, davon 2 Totcode: `ParticleCanvas`, `ParallaxImage`), **16 Routen** (`src/routes/index.tsx`), **280 Sitemap-URLs** (`dist/sitemap.xml`), **346 statische HTML-Seiten** (`dist/**/*.html` = 43 Routen-Instanzen × 8 Sprachen + Root-Redirect + `/deck`). Korrigiert: Abschlussbericht/Deep-Audit nannten „37+" Komponenten + listeten Totcode `ParticleCanvas` und ein **nicht existentes `BrandLogos`** als Vorzeige-Komponenten (→ echte aktive: `Frontier`, `ProblemDiagnostic`); TEAM_BRIEFING nannte „30 Routen" (→16); „345 Seiten" überall →346 (7 Stellen). HTML + 2 PDFs (Abschlussbericht, Deep-Audit) + 1 Follow-up-PDF neu gerendert. §4-Findings (waren stale: Mobile 77/color-contrast/ws) auf aktuellen Stand gezogen. | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-02 | **Totcode entfernt — 34→32 Komponenten** | `src/components/ParticleCanvas.tsx` + `ParallaxImage.tsx` gelöscht (nirgends importiert, vom Build bereits tree-shaked → kein Bundle-/Live-Impact, kein Deploy nötig). `npm run check` grün (**0 Fehler**, 9 vorbestehende Tech-Debt-Warnungen). Komponentenzahl in Abschlussbericht/Deep-Audit/TEAM_BRIEFING 34→32, §4-Totcode-Befund entfernt (erledigt), Render-Artefakte neu erzeugt. | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-02 | **GCP: keylose WIF + Vertex für @claude eingerichtet** | WIF-Voraussetzung war *nicht* vorhanden (kein SA, 0 Pools) → komplett neu via `gcloud` aufgebaut: SA `github-deployer` + `roles/aiplatform.user`, Pool `github-pool` + OIDC-Provider `github-provider` (repo-restricted auf `yoyo967/mirrou-creative-studio`), `workloadIdentityUser`-Bindung. `aiplatform.googleapis.com` war bereits aktiv. **EU-Residenz:** Sonnet 4.5 in `europe-west1` bestätigt. **Offen (nicht-GCP):** GitHub-Secrets `WIF_PROVIDER`/`GCP_SA_EMAIL` + Variables `VERTEX_REGION=europe-west1`/`CLAUDE_VERTEX_MODEL` setzen (gh nicht installiert), Model Garden Claude freischalten (Console). SA hat nur `aiplatform.user`, **nicht** die Deploy-Rollen (deploy.yml separat). `docs/CLAUDE_VERTEX_SETUP.md` mit Status + Werten aktualisiert. | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-02 | **GCP-Service-Landkarte kanonisiert** | Neues Strategie-Doc `01_strategie/gcp-frontier-stack.md` (GCP = Compute-/Intelligence-Substrat unter dem GitHub-OS), quer-verlinkt aus `github-frontier-firm-os.md`. **Live-Bestand verifiziert (`gcloud`):** aktiv = Cloud Run, Cloud Build, Vertex AI, **BigQuery (volle Suite)**, Firebase/Firestore, Pub/Sub, Storage; **nicht aktiv** = Secret Manager, Vertex AI Search (`discoveryengine`), Cloud Scheduler. 🔴 **DSGVO-Flag:** Firestore-Default-DB liegt in **`us-central1` (US)** → für EU-PII (CRM) ungeeignet, neue `eur3`-DB nötig. Kein `mirrou-assets-prod`-Bucket. Grounding = Gemini-only (Claude braucht eigenes Web-Tool oder Vertex AI Search über eigene Daten). Priorisierung: Secret Manager+EU-Firestore → Vertex AI Search → BigQuery → Agent Engine. | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-02 | **Marktsignal QFC ins System integriert** | „Qualified Future Conversions" (GML 2026) **verifiziert** (Google + Recaps) — entgegen Wissensstand real, aber **restricted Pilot** (nicht GA) und **Gemini-Prognose** (kein realisierter Umsatz). Kanonischer Brief `01_strategie/qfc-qualified-future-conversions.md` + Einträge in `trend-radar.md` (⚡ 6 Monate), `benchmark-library.md` (QFC-Dimension to-build), `messaging-matrix.md` (Proof-Hook, vorsichtig als *Signal*), `research-log.md`. **Korrektur ggü. durchgereichter Analyse:** „sofort aktivieren" → Pilot-Zugang beantragen; QFC als 1 Signal triangulieren (Plattform misst eigenen Spend). | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-02 | **Blueprint: Opus Magnum als Mirrous Project OS** | Repo `yoyo967/Opus-Magnum-Media-Porject-OS` inspiziert (verifiziert: Gemini-SPA + live Python-Backend auf eigenem GCP-Projekt `923137317598`, ~40 Agenten, kein Secret-Leak). Neues Strategie-Doc `01_strategie/opus-magnum-project-os.md`: kohärentes **3-Schichten-OS** (GitHub Governance · GCP Compute · Opus Magnum Application-Cockpit), **EU-Reconciliation** (Gemini→Vertex-EU, US-Tools→Brevo/EU-CRM, Firestore-`eur3`, EU-AI-Act-Labeling), Mirrou↔Opus-Magnum-Integration (GCP-Projekte föderieren, Lead-Daten-Brücke), 5-Phasen-Roadmap. Quer-verlinkt in der OS-Familie. Offene Entscheidungen: Projekte föderieren/fusionieren, Rebrand vs. Schwester-Marke, Repo-Tippfehler. Kein Code/Deploy. | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-02 | **Opus-Magnum-Mission gestartet + Zwei-Seiten-Tenant-Modell** | Mission-Brief verifiziert (Repo geklont): mehrere Brief-Claims **stale** (1.1 define-Leak schon weg, ClusterRegistry/AppContext-Zeilen falsch, 1.7-Löschziele existieren nicht) — echtes 1.1 = 53× `process.env.API_KEY` in 40 Tools auf BYOK umstellen. 13-Task-Plan angelegt. **P1.2 ausgeführt+gepusht** (gemini-3-pro-preview→gemini-2.5-pro, 37 Dateien, Opus-Repo `d540488`). **Architektur-Entscheidung kanonisiert** (`opus-magnum-project-os.md` §4a): Multi-Tenant — Mirrou = Tenant #1 (`shared`-Key), Mandanten = SaaS-Tenants (`byok`/`metered`); Key-Auflösung pro Tenant; harte Sequenzierung (Dogfood → dann SaaS öffnen). Phase 3 (Deploy) bleibt decision-gated. | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-02 | **Opus-Magnum Phase 1 abgeschlossen (Tag `v3.1-phase1-complete`)** | Im Opus-Magnum-Repo umgesetzt + je `vite build`-grün: P1.1 BYOK-Helper (per-Tenant, 40 Tools, `7f7ba83`), P1.2 Modell-Rename (`d540488`), P1.3 React.lazy (1,45 MB→82 Chunks, `8f5fedb`), P1.5 403/404-Guard (Persona/Animator), P1.7 `firestore.rules` + ADR-1 + README (`85b2c7c`). **Reality-Check:** mehrere Brief-Claims stale; **P1.4/P1.6 blockiert** — Firebase ist im Client nicht verdrahtet (localStorage+Mock-Auth) → eigener Firebase-Integration-Workstream (gated am GCP/Firebase-Projekt-Entscheid), nicht gefaket. Phase 2 (Mirrou-Tenant) erst nach Firebase; Phase 3 (Deploy) gated. | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-02 | **GCP-Entscheid „föderieren" + Opus-Magnum Phase 2.1–2.3 (Tag `v3.2-mirrou-tenant`)** | Entscheidung: GCP-Projekte **föderieren** (`923137317598` + `180023265254` unter einer Org, geteilte WIF/Secret-Manager, konsolidiertes Billing) — Blueprint §6 aktualisiert. Opus-Magnum Phase 2.1–2.3 umgesetzt + build-grün (`b9288ae`): P2.1 Mirrou-Tenant-Config (BRAND/TEAM/ICP, keyStrategy shared), P2.2 Prompt-SoT + 3 Tools verdrahtet (Markenwächter/Späher/Prometheus), P2.3 Benchmark-Dashboard (echte Meta-Werte + QFC-Spalte). Reality-Check: Baumeister/Auditor passen nicht zum Brief-Mapping → eigene Aufgabe. Offen: P2.4 (Multi-User) + P1.4/P1.6 nach Firebase-Integration; Phase 3 (Deploy) gated. | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-02 | **Firebase-Foundation (EU) + UI-Branding** | Opus-Magnum (`c5729aa`): Firebase auf `studio-4188712377-b3681` (war aktiv), **EU-Firestore-DB `opus-eu`/europe-west3** angelegt (DSGVO, nicht us-central1-Default), `services/firebase.ts` + `firebase.json`/`.firebaserc`, `firestore.rules` **live deployed**. Davor (`8c56bfa`) Tenant-UI-Branding (Tailwind-CDN-Config: Purple→Gold global, Cormorant/Inter/Mono, Onyx-BG). **Reality-Check P1.6:** App nutzt **Backend-Token-Auth (FastAPI)**, kein Firebase-Auth/Popup → korrekt = Backend prägt Firebase **Custom Token** → Client `signInWithCustomToken` (gekoppelt FE+BE+Redeploy). Dual-Write (P1.4) + Multi-Tenant (P2.4) hängen daran. Foundation build-grün; Auth-Brücke = nächster Workstream → v3.3. | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-02 | **Firebase Auth Custom Token Bridge + GCP-Föderation** | Client-seitige Custom-Token-Auth (signInWithCustomToken/signOut) in AppContext.tsx integriert und FastAPI-Token-Minster (backend/main.py) gepatcht. GCP-Föderation durch IAM-Berechtigungen (cross-project Auth) gehärtet. Backend & Frontend erfolgreich auf GCP Cloud Run neu deployed. | OPUS PRIME (Antigravity AI) |
| 2026-06-02 | **Opus-Magnum Phase 1.4 (Firestore Sync & Migration)** | Real-time reactive sync (`onSnapshot` hooks) in AppContext.tsx for tasks, documents, personas, and system logs implemented. Local-first dual-write pattern prevents blocking UI (0ms latency). Added one-time migration assistant copying existing localStorage data on first login. Created docs/adr-3.md. Frontend redeployed to Cloud Run: https://opus-magnum-media-v3-923137317598.europe-west3.run.app | OPUS PRIME (Antigravity AI) |
| 2026-06-02 | **Opus-Magnum Phase 2.4 (Multi-User Workspace & Tenant Migration)** | Restructured Firestore sync in AppContext.tsx to move shared collections (tasks, documents, personas, logs) from users/{uid} to tenants/{tenantId}. Private data (API key, profile, credits) remains under users/{uid}. Implemented dynamic Strategy & Campaign Brief reactive sync. Updated FastAPI backend to auto-generate tenant membership documents on registration/login for security rules. Created docs/adr-4.md. Deployed backend (https://opus-magnum-ai-backend-923137317598.europe-west3.run.app) and frontend (https://opus-magnum-media-v3-923137317598.europe-west3.run.app) successfully. | OPUS PRIME (Antigravity AI) |
| 2026-06-02 | **Opus-Magnum Phase 3 (Secure Deployment & GCP Secret Manager)** | Created GCP Secret Manager secret 'mirrou-gemini-key' and set permissions for default compute SA. Configured backend Cloud Run to map secret dynamically as environment variable GEMINI_API_KEY. Added JWT Bearer authenticated '/api/tenant/shared-key' endpoint to backend and integrated key retrieval in client login/register flow. Shared key is kept in client memory-only, never persisted to disk/DB. Re-deployed backend with Secret Manager mapping: https://opus-magnum-ai-backend-923137317598.europe-west3.run.app | OPUS PRIME (Antigravity AI) |
| 2026-06-02 | **A11y-Härtung (Footer-Links) + Deploy `00049-4cf`** | Footer-Links vertikales Padding von `py-1` auf `py-2.5` erhöht, um Lighthouse Touch-Target-Size-Warnungen mobil vollständig zu beheben. Statisches SSG-Rendering aller 346 Seiten verifiziert. Live deployed: https://mirrou-creative-studio-180023265254.europe-west3.run.app | OPUS PRIME (Antigravity AI) |
| 2026-06-04 | **Domain `mirrou.studio`: Firebase-Hosting-Vorbereitung + CSP-Bug-Fix (Code-Stand vor Deploy)** | Domain bei **IONOS** gekauft (nur Domain, kein Hosting); Entscheidung: phasiert — Phase 1 Firebase Hosting (statisch, `dist/`) für `mirrou.studio`+`www`, DNS über **IONOS** (kostenlos inkl., kein Cloudflare nötig), E-Mail-Weiterleitung via IONOS (oder Fallback Cloudflare Email Routing), Phase 2 Global Load Balancer + Cloud Armor für `app.`/`api.` (schließt CORS+Rate-Limit). **🔴 CSP-Bug gefunden:** `connect-src 'self'` blockte den Cross-Origin-`fetch` des Kontaktformulars an `…run.app` (Browser-only, daher von curl nicht sichtbar) → erklärt die nie bestätigte E2E-Zustellung. **Fix:** `connect-src` um API-Origin erweitert in `nginx.conf` (4×) + neue `firebase.json` (6 Security-Header 1:1 portiert, `cleanUrls`/Cache-Control wie nginx) + `.firebaserc` (`studio-4188712377-b3681`). Kein Deploy (firebase deploy + DNS + Konsole stehen aus). Offen rechtlich: Impressum-Anschrift (§5 DDG) vor Go-Live. | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-04 | **Doku-Reconciliation nach Antigravity-Phase (kein Deploy)** | Re-Sync nach Rückwechsel zu Claude Code (Nutzungslimit-Pause). **Verifiziert:** Repo lokal=Remote (`7c5317c`, sauber), Website live HTTP 200 (0,21 s), Opus-Magnum-Backend `/api/lead` CORS-Preflight HTTP 200 (Root `/` 404 = normaler FastAPI-Cold-Start). **Schlüssel-Erkenntnis:** Die Architektur-Arbeit (Firebase-EU, Custom-Token-Bridge, Multi-Tenant, Secret Manager, FastAPI) liegt im **separaten Repo `yoyo967/Opus-Magnum-Media-Porject-OS`** (GCP `923137317598`), *nicht* hier — dieses Repo bekam nur Contact-Form-Verkabelung (`7edaf77`), Homepage-Lazy-Load (`d74cc1c`) + Footer-A11y/`00049-4cf`. **Stale-Korrekturen (Selbst-Update-Lücke geschlossen):** §3.3 A11y `93/97`→`100/100` (+ color-contrast-Blocker entfernt, war längst behoben), §3.4 BP `96/100`→`100/100` (beides widersprach Scorecard §1); §4 Kontaktformular von 🔴 „nicht funktional" → behoben (verbunden; E2E-Verifikation als 🟡 offen); §5 P0 🔴→🟡. `.env.example` entstaubt (HubSpot raus, `/api/lead`-Endpoint dokumentiert). Live-Rev unverändert `00049-4cf`. | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-04 | **Kontaktformular E2E verifiziert — P0 geschlossen** | Test-Lead via `POST /api/lead` → HTTP 200 → in Firestore `tenants/mirrou/leads` persistiert (per Firestore-REST-API gegengelesen, danach mein Test-Lead **und** der Antigravity-Integrationstest-Lead vom 02.06. gelöscht → Sammlung sauber). Bestätigt: **Cross-Project-IAM** (Backend `923137317598` → Firestore-Projekt `180023265254`) funktioniert; **DB `opus-eu` = `europe-west3`** (EU, DSGVO). Der ursprüngliche P0 („Leads gehen verloren") ist damit endgültig erledigt. Offen nur Komfort (kein P0): E-Mail-Benachrichtigung (Brevo-Plan) + Lead-Inbox-UI. Kein Deploy. | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-05 | **Frische Lighthouse-Messung (Firebase-Hosting-Front)** | `npx lighthouse` gegen `studio-4188712377-b3681.web.app/de` (je 1 Lauf): **Mobile 87/100/100/100 · Desktop 99/100/100/100** (LCP mobil 3,3 s, FCP 2,6 s, SI 3,5 s, CLS 0, TBT 0). Mobile **82→87** durch Umzug Cloud Run → Firebase Hosting (globales CDN). §1 + §2.1 angeglichen; §2.2-Detailtabelle spiegelt noch die 06-02-Cloud-Run-Werte. Kein Code-Deploy. | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-06 | **Mobile-Perf: Root-Cause gefunden + 2× deployed (Firebase-Front)** | Empirische Diagnose statt Annahme: HTML hatte 46 inline `opacity:0` (Motion SSR); TBT = 20 ms. Root-Cause des Speed Index (~5,9 s) = `HeroImageSequence` (20 Bilder). Fixes: CSS-`.reveal-up` statt JS-gated Motion; Karussell nur ab `lg` (`028dece`). Live-Median: Mobile **82→85**, bester Lauf **90/100/100/100**; Desktop **99/100/100/100** (LCP 0,7 s). | OPUS PRIME (Claude Opus 4.8) |
| 2026-06-07 | **Semi-atomarer URL- & DNS-Audit** | DNS-Konfiguration (4 IONOS-Einträge) verifiziert und GCP-Föderation für das kanonische Setup dokumentiert. `docs/URLS.md` als Single Source of Truth erstellt und im Document Hub integriert. | OPUS PRIME (Antigravity AI) |
| 2026-06-08 | **5 Enterprise-Showcase-Features & Verifikation** | Implementation von 5 Enterprise-Showcase-Features: Live Presentation Sync (BroadcastChannel), B2B ROI Calculator (Slide 5), Live AI Image Generator (Slide 14 via Pollinations.ai), Mandanten-Hub Cloner und PDF Report Compiler (HQ Analytics Dashboard). Playwright-Testsuite (4 Test-Dateien) erfolgreich mit 0 Fehlern bestanden, `npm run build` erfolgreich. | OPUS PRIME (Claude Code · Antigravity AI) |
| 2026-06-08 | **UX-Fix & Build-Verifikation** | Behebung des Sprach-Banners auf englischen Cluster-Seiten (war fälschlicherweise sichtbar trotz Übersetzung) in [ClusterPage.tsx](file:///c:/Users/HP/Desktop/abschlussprojekt/src/routes/ClusterPage.tsx); statischer Rebuild und Verifikationstests erfolgreich abgeschlossen (0 Fehler). | OPUS PRIME (Claude Code) |
| 2026-06-09 | **Hub/Deck-Standalone-Artefakte: FAQ-Fix · CSP-Self-Hosting · Präsentations-Features (live)** | Antigravity-Stand an `document_hub.html`+`deck.html` reviewed & gehärtet. **(1)** FAQ-Template-Leak im Hub-Generator behoben (inneres Template-Literal backslash-escaped → roher Code `${questions.map…}` im Dokument). **(2)** 🔴 **CSP-Befund (live-only — file:// verdeckte ihn):** strikte Firebase-CSP (`script/style-src 'self'`) blockt **alle CDNs** → Hub-Markdown roh („[OFFLINE-MODUS]"), Deck **ungestylt**. **Fix:** alle Libs self-hosted nach `public/lib/` (marked, lucide, html2canvas, jsPDF, **vorgebautes Tailwind v3** aus den Deck-Klassen via `scripts/tw-deck.config.js`, **12 woff2-Fonts**) — **CSP bleibt strikt** (kein Lockern), Artefakte CSP-konform + offline-/tenant-portabel. Totes `public/tailwind.min.css` (2,9 MB) entfernt; **~2,4 GB unreferenzierte Asset-Dumps** gitignored, nur referenzierter Subset versioniert (`git add -f`). **(3)** Neue Features: Deck-**Timer** (T) + **Spotlight** (L), Hub-**⌘K-Command-Palette**. **Deploy Firebase + cache-gebustet live-verifiziert: 0 Konsolen-Fehler** (Hub `/document_hub`, Deck `/deck`). 7 Commits `76b6f63`→`fcd0eb4`. **Scorecard §1/§2 unverändert** (Haupt-Site-CWV nicht betroffen; Hub/Deck = separate statische Artefakte). **AI-Q&A (gleiche Session nachgezogen, LIVE):** OMM-Backend `POST /api/hub-qa` (server-seitiger Gemini `gemini-2.5-flash`, Key serverseitig, stdlib-only, rate-limited 15/min; Rev. `00035-54m`) + Hub-Co-Pilot zu **RAG** erweitert (lokale Passagensuche = Kontext+Quellen, Gemini = Antwort, graceful Fallback). Live verifiziert (grounded Antwort + Zitate, 0 Konsolen-Fehler). Frontend `a1dcb1f`, Backend `285b83d`. | OPUS PRIME (Claude Opus 4.8) |

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
