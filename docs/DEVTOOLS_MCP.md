# Developer Tooling & Chrome DevTools MCP

Quellen: [Blog](https://developer.chrome.com/blog/chrome-devtools-mcp) ·
[GitHub](https://github.com/ChromeDevTools/chrome-devtools-mcp) ·
[Tool-Reference](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/tool-reference.md)

## Was es ist
Offizieller, quelloffener **MCP-Server von Google/Chrome**, der einem Coding-Agent
(Claude Code) die volle Chrome-DevTools-Maschine gibt: **Performance-Traces +
Insights + Core Web Vitals (LCP/INP/CLS)**, `lighthouse_audit`, Netzwerk-/Console-
Inspektion, DOM/CSS, Emulation (CPU/Netz/Viewport) und Input-Automation.

Im Mirrou-Kontext ist der **Performance-Trace** der Kern-Use-Case: er treibt den
gezielten Fix-Loop für die Mobile-Performance (LCP/Unused-JS) — siehe `AUDIT.md` §2.

## Integration in diesem Repo
Projekt-scoped in [`.mcp.json`](../.mcp.json) (versioniert, team-/agent-weit
reproduzierbar). Zusätzlich auf User-Ebene registriert (`claude mcp list` →
`chrome-devtools ✓ Connected`).

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest",
               "--headless", "--isolated",
               "--no-performance-crux", "--no-usage-statistics"]
    }
  }
}
```

### EU-/DSGVO-Härtung (verbindlich)
- `--no-performance-crux` → **keine** Trace-URLs an die Google-CrUX-API.
- `--no-usage-statistics` → **keine** Nutzungs-Telemetrie an Google.
- `--isolated` + `--headless` → Wegwerf-Profil, kein PII-Leak; nur auf eigene
  Live-/localhost-Seiten zeigen, nie auf eingeloggte Sessions mit personenbezogenen Daten.

## Voraussetzungen
- **Node 22+** (Repo läuft auf 24) · aktuelles stable Chrome · läuft via `npx` (keine feste Installation).
- Die MCP-Tools (`mcp__chrome-devtools__*`) erscheinen **erst nach einem Claude-Code-Reload**.

## Typischer Perf-Loop
1. `performance_start_trace` gegen die Live-URL `…/de` (mobil).
2. `performance_analyze_insight` → welcher Chunk/Request blockiert LCP.
3. Fix im Code (z. B. weiteres Code-Splitting, Preload, Defer).
4. Re-Trace → Delta verifizieren → `AUDIT.md` §1/§2/§5/§7 fortschreiben.

## Weitere Toolchain (Stand 2026-05-31)
- **ESLint** (flat config, `eslint.config.js`) + **`@types/react` / `@types/react-dom`** (v19) ergänzt.
- Scripts: `npm run typecheck` · `npm run lint` · `npm run check`.
- `tsconfig` `strict`: **bewusst noch nicht aktiviert** (~3.900 Folgefehler = eigener Refactor).
