# CLAUDE.md — Mirrou Creative Studio

> Auto-geladen von Claude Code. **Verbindlich.** Versionierte Kurzfassung des
> OPUS-PRIME-Masterprompts. Vollkontext steht in den zwei Schwesterdokumenten —
> **immer zuerst lesen:**
>
> 1. [`memory.md`](memory.md) — *wer/warum/wie* (Strategie, Masterprompt, Personas)
> 2. [`AUDIT.md`](AUDIT.md) — *wie gesund ist das System gerade* (echte Messwerte, Findings, Aktionsplan)

## Was das ist
Mirrou Creative Studio — AI-natives Performance-Creative-Studio aus **Hamburg** (HQ ·
Produktion & Creative Direction) mit zweitem Studio in **Berlin** (Performance, AI &
Growth). Dieses Repo ist zugleich die **Produktiv-Website** und das DCI-Abschlussprojekt.

## Tech-Stack (verifiziert)
- **React 19 + Vite 6 + TypeScript 5.8 + Tailwind CSS v4 + Motion** — *kein Three.js*.
- **Rendering:** `vite-react-ssg` — statisches Pre-Rendering aller Routen (Apex/Pillar/Cluster).
- **Routen-Splitting:** Leaf-Pages via react-router `lazy` (`src/routes/index.tsx`) — jede Seite lädt nur ihr eigenes JS.
- **i18n:** 8 Sprachen (DE/EN tiefen-vollständig; ES/IT/FR/TR/RU/UK UI+SEO, Long-Form gekürzt), dynamischer Locale-Import.
- **Hosting:** Google Cloud Run (`europe-west3`) · Docker → `nginx:alpine` (gzip-9, Security-Header live).

## Commands
```bash
npm run dev          # Dev-Server (Port 3000)
npm run build        # SSG-Build → dist/ (+ SEO-Assets)
npm run preview      # gebautes dist/ servieren (Port 4173)
npm run typecheck    # tsc --noEmit (muss 0 Fehler sein)
npm run lint         # ESLint (flat config; 0 Fehler, Warnungen = Tech-Debt)
npm run check        # typecheck + lint
```
Deploy: `deploy_gcp.ps1` (gcloud builds + run deploy). **Vor Live-Deploy validieren.**

## Konventionen
- **Content = Single Source of Truth:** `src/content/site-data.ts` + `src/locales/*.ts`. Texte dort ändern, nicht in Komponenten hardcoden.
- **EU-first / DSGVO:** keine US-only Tools ohne EU-Alternative; **kein Analytics ohne Consent-Gate** (aktuell nur technisch notwendige Cookies).
- **Brand:** Premium-Positioning „Dark Luxury" (Onyx `#080808`, Gold `#C8A25A`, Ivory `#F2EFE9`). Markenfarben nie ohne Begründung ändern.
- **A11y/Perf:** Cream-/Dark-Sektionen brauchen expliziten BG (sonst `content-visibility:auto`-Kontrast-False-Positives in Lighthouse). Perf-Regressionen mit Lighthouse gegenprüfen (Methode in `AUDIT.md` §8).

## OPUS-PRIME-Regeln (Kurzform)
1. **Memory-First:** `memory.md` → `AUDIT.md` zuerst lesen; nie aus Annahmen über den Projektzustand urteilen.
2. **Keine Halbheiten:** vollständige, implementierbare Lösung oder explizit „brauche mehr Kontext zu X".
3. **Selbst-Update:** nach jedem Audit/Deploy/relevanter Änderung `memory.md` (§3 Audit-Log, §4 Status) **und** `AUDIT.md` (§1/§2/§5/§7) fortschreiben.
4. **Transparenz über Unsicherheit** statt raten. Findings im Format `🟢/🟡/🔴/🔵` + Aktionsplan-Tabelle.

## Werkzeuge
- **Chrome DevTools MCP** (`chrome-devtools`, EU-safe Flags in `.mcp.json`) — Performance-Traces/CWV/`lighthouse_audit` für den Perf-Fix-Loop. Tools erst nach Claude-Code-Reload verfügbar.

## Offen (Stand: siehe AUDIT.md §5)
- **P0:** Kontaktformular → HubSpot (DSGVO-Consent) — `src/components/ContactForm.tsx`.
- **P1:** Mobile-Perf letzte Meile auf ≥90 (Rest-Unused-JS, LCP-Bild) · Cluster-Long-Form 6 Sprachen.
