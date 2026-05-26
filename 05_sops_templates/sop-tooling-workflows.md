---
name: sop-tooling-workflows
description: Mirrou Creative Studio – SOP: Tägliche Tool-Workflows für GCP, Claude Code, Perplexity, Drive
version: 1.0
---

# SOP · Tooling & Workflows – Mirrou Creative Studio

> Konkrete Schritt-für-Schritt-Anleitungen für die häufigsten operativen Aufgaben im Mirrou Frontier Firm Stack. Kein Theorie-Overhead — direkt anwendbar.

---

## WORKFLOW 1 · Website deployen (GCP Cloud Run)

**Wann**: Nach jeder Änderung an der Mirrou-Website (neuer Content, neue Section, Bugfix)
**Verantwortlich**: Yahya (koordiniert) · Claude Code (Umsetzung)
**Dauer**: 10–20 Minuten

### Schritte

```bash
# 1. In Projektverzeichnis navigieren
cd ~/mirrou-website

# 2. Änderungen mit Claude Code implementieren
# Terminal: claude
# App: Claude Code Desktop öffnen, Projektordner laden

# 3. Lokalen Build testen
npm run build
npm run start   # → http://localhost:3000 prüfen

# 4. Docker-Image bauen und deployen
gcloud builds submit --tag gcr.io/[PROJECT_ID]/mirrou-website

# 5. Auf Cloud Run deployen
gcloud run deploy mirrou-website   --image gcr.io/[PROJECT_ID]/mirrou-website   --region europe-west3   --platform managed   --allow-unauthenticated

# 6. Live-URL prüfen
# https://mirrou-creative-studio-180023265254.europe-west3.run.app
```

**Checkliste nach Deployment:**
- [ ] Live-URL aufgerufen und Änderung sichtbar
- [ ] Mobile-Ansicht geprüft (Chrome DevTools)
- [ ] Alle Sprachversionen (DE/EN) geprüft
- [ ] Keine 404-Fehler in Console
- [ ] Google Analytics feuert korrekt

---

## WORKFLOW 2 · Claude Code · Neue Website-Section erstellen

**Wann**: Neue Page, neue Section, Internationalisierung, Refactoring
**Verantwortlich**: Yahya + Claude Code
**Dauer**: 30–90 Minuten je nach Komplexität

### Prompt-Struktur für Claude Code (Terminal)

```
Öffne Claude Code Terminal:
$ claude

Prompt-Template:
---
Du arbeitest an der Mirrou Creative Studio Website.
Stack: React 19, Vite 6, TypeScript 5.8, Tailwind CSS v4, i18n (react-i18next).
Hosting: Google Cloud Run, europe-west3.

Aufgabe: [GENAU BESCHREIBEN WAS GEBAUT WERDEN SOLL]

Rahmenbedingungen:
- Design-System aus bestehendem Code übernehmen
- Neue Komponenten in /components/[name].tsx anlegen
- Texte in /messages/de.json und /messages/en.json eintragen
- Keine externen Libraries ohne Rückfrage
- EU AI Act Kennzeichnung bei KI-Inhalten einbauen

Bitte erst eine semi-atomare Diagnose machen:
Was existiert bereits? Was muss neu erstellt werden?
Was könnte brechen?
---
```

**Nach der Implementierung:**
- [ ] `npm run build` erfolgreich (keine TypeScript-Fehler)
- [ ] Lokal getestet
- [ ] i18n für alle aktiven Sprachen ergänzt
- [ ] Deployment-Workflow (Workflow 1) ausgeführt

---

## WORKFLOW 3 · Perplexity Space updaten

**Wann**: Neue MD-Datei hochladen, Instruktionen ändern, Skill.md aktualisieren
**Verantwortlich**: Yahya (HQ + Strategy) · Ralph (Ops) · Denys (Strategy-Daten)
**Dauer**: 5–10 Minuten

### Schritte

```
1. perplexity.ai → Spaces → [Space auswählen]

2. Neue Datei hochladen:
   → „Manage Space" → „Files" → „Upload"
   → Datei als .md hochladen
   → Max. Dateigröße beachten

3. Instruktionen updaten:
   → „Manage Space" → „Instructions"
   → Text direkt editieren → Speichern

4. Skill.md aktualisieren:
   → „Manage Space" → „Skills" → alte Skill löschen
   → Neue skill.md hochladen
   → name: muss lowercase-alphanumeric sein (z.B. "mirrou-hq")

5. Testen:
   → Frage stellen, die die neue Datei braucht
   → Prüfen ob Antwort die neuen Inhalte enthält
```

**Wichtige Regeln:**
- Skill.md: `name:` nur lowercase + Bindestriche (keine Umlaute, keine Spaces)
- Dateien ersetzen: alte Version löschen, dann neue hochladen
- Nach Update immer testen bevor das Team informiert wird

---

## WORKFLOW 4 · Google Drive · Kunden-Ordner anlegen

**Wann**: Bei jedem neuen Kunden-Projekt oder Retainer-Start
**Verantwortlich**: Yahya oder Ralph
**Dauer**: 5 Minuten

### Ordner-Struktur (Standard)

```
📁 Mirrou Clients/
└── 📁 [Kundenname] – [Projektname] – [Jahr]/
    ├── 📁 01_Briefs/
    │   └── template-creative-brief.md (ausgefüllt)
    ├── 📁 02_Moodboards/
    ├── 📁 03_Assets_Raws/
    ├── 📁 04_Assets_Final/
    │   ├── 📁 Feed_1x1/
    │   ├── 📁 Feed_4x5/
    │   ├── 📁 Stories_9x16/
    │   └── 📁 TikTok_9x16/
    ├── 📁 05_Learning_Logs/
    │   └── template-learning-log.md (ausgefüllt nach Kampagne)
    └── 📁 06_Reports/
```

**Schritte:**
- [ ] Hauptordner angelegt nach Schema oben
- [ ] Kundenname und Projekt klar im Ordnernamen
- [ ] Zugriff-Einladung an relevante Teammitglieder
- [ ] Kunden-Freigabe-Link erstellt (nur für 04_Assets_Final)
- [ ] Ordner-Link in Outreach-Pipeline (Sheets) eingetragen

---

## WORKFLOW 5 · Gemini in Antigravity · Website-Section oder Brandbook

**Wann**: Neue visuelle Section, Brandbook-Page, komplexe UI-Komponente
**Verantwortlich**: Yahya
**Dauer**: 20–60 Minuten

### Prompt-Struktur für Antigravity

```
Kontext:
- Website: https://mirrou-creative-studio-180023265254.europe-west3.run.app/de
- Stack: React 19, Vite 6, TypeScript 5.8, Tailwind CSS v4
- Design: Dark Luxury (schwarz, gold, editorial)
- Claim: "Algorithm of Soul"

Aufgabe: [GENAU BESCHREIBEN]

Bitte:
1. Bestehenden Website-Stil analysieren (Screenshot oder URL)
2. Neue Section konsistent mit bestehendem Design erstellen
3. Code in React / Vite / Tailwind ausgeben
4. Texte auf Deutsch und Englisch vorbereiten
5. Benchmarking: Zeige 2-3 Referenzen aus award-winning Studios als Inspiration

Output: Vollständiger Komponenten-Code, direkt in Projekt einsetzbar.
```

**Nach Antigravity:**
- Output in Claude Code Terminal einfügen für Feinschliff
- Deployment-Workflow (Workflow 1) ausführen

---

## WORKFLOW 6 · MCP-Konnektor · Perplexity mit Google Drive verbinden

**Wann**: Einmalig einrichten, dann dauerhaft aktiv
**Verantwortlich**: Yahya
**Dauer**: 15–30 Minuten (Ersteinrichtung)

### Schritte (wenn Perplexity MCP-Support aktiv)

```
1. Perplexity Space → "Manage Space" → "Integrations" / "MCP Servers"

2. Google Drive MCP:
   → Server URL: [Perplexity-eigener MCP-Endpoint oder custom]
   → OAuth mit Google-Account autorisieren
   → Ziel-Ordner definieren (z.B. "Mirrou Clients")

3. Testen:
   → Prompt: "Zeige mir die Dateien im Mirrou Clients Ordner"
   → Prüfen ob Drive-Inhalte im Space-Kontext erscheinen

4. Canva MCP (wenn verfügbar):
   → Canva Developer: mcp.canva.com
   → API-Key generieren
   → In Perplexity Space als MCP-Server eintragen
   → Testen: "Erstelle eine Slide-Outline für [Thema] und öffne sie in Canva"
```

**Alternativer Workflow ohne MCP:**
- Relevante Drive-Dokumente als MD-Datei exportieren → in Space hochladen
- Regelmäßiges manuelles Update (monatlich)

---

## WORKFLOW 7 · Wöchentlicher Strategy-Intelligence-Update

**Wann**: Jeden Montag, 15 Minuten
**Verantwortlich**: Denys (Daten) + Yahya (Strategie)
**Dauer**: 15 Minuten

### Schritte

```
1. Strategy & Intelligence Space öffnen

2. Folgenden Prompt ausführen:
   "Was sind die neuesten Entwicklungen in der D2C-Beauty-Branche 
   in Deutschland — speziell zu Creative Performance, TikTok Shop 
   und EU AI Act? Letzte 7 Tage."

3. Relevante Erkenntnisse in research-log.md eintragen
   (Format: Datum · Thema · Quelle · Erkenntnis · Implikation · Aktion)

4. Bei relevanten Wettbewerber-Veränderungen:
   competitive-analysis.md updaten

5. Bei neuen Benchmark-Daten:
   benchmark-library.md updaten
```

---

## WORKFLOW 8 · Neues Teammitglied onboarden

**Wann**: Bei jeder Neueinstellung oder bei Freelancer-Onboarding
**Verantwortlich**: Yahya + Ralph
**Dauer**: 1–2 Stunden (Erstsetup)

### Schritte

- [ ] Google-Account (Firmen-Domain) eingerichtet
- [ ] Google Drive Zugriff erteilt (Mirrou Clients + relevante Ordner)
- [ ] Perplexity Space-Einladungen gesendet (relevante Spaces)
- [ ] onboarding.md aus Mirrou HQ Space zum Lesen geschickt
- [ ] Einführungsgespräch: Yahya erklärt Space-Architektur (30 Min.)
- [ ] Zugriff Adobe CC eingerichtet (wenn Produktion)
- [ ] Erstes Projekt-Briefing gemeinsam durchgegangen
- [ ] Fragen-Protokoll: neues Mitglied stellt Fragen → answers in FAQ-internal.md eintragen

---

## Quick-Reference: Wer macht was mit welchem Tool

| Aufgabe | Tool | Wer |
|---------|------|-----|
| Website-Änderung implementieren | Claude Code Terminal | Yahya |
| Website deployen | GCP CLI | Yahya |
| Visuelle Section / Brandbook | Gemini Antigravity | Yahya |
| Space-Dokumente updaten | Perplexity Spaces | Yahya / Ralph |
| Research-Abfragen | Perplexity Strategy Space | Denys / Yahya |
| Asset-Produktion | Adobe CC + Midjourney | Olha |
| Performance-Analyse | Meta/TikTok Ads Manager | Denys |
| Kunden-Reporting | Looker Studio + Drive | Denys + Ralph |
| Slides / Pitch-Decks | Canva / Google Slides | Yahya / Ralph |
| CRM / Pipeline | Google Sheets (Drive) | Yahya / Ralph |
