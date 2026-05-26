---
name: partners-tools
description: Mirrou Creative Studio – Tech-Stack, Tools, Partner & Frontier Firm Architektur
version: 1.0
---

# Partners & Tools – Mirrou Creative Studio

> Mirrou ist ein Frontier Firm: ein Studio, das KI nicht als Werkzeug betrachtet — sondern als integrierte Schicht des operativen Systems.

---

## Architektur-Prinzip

Mirrou trennt seinen Tech-Stack in drei Schichten:

| Schicht | Funktion | Beispiel-Tools |
|---------|----------|----------------|
| **Production Layer** | Visuelle Produktion & Postproduktion | Adobe CC, Midjourney, Firefly |
| **Intelligence Layer** | Research, Wissen, Strategie | Perplexity, Claude, Gemini |
| **Performance Layer** | Analytics, Distribution, Reporting | Meta Ads Manager, TikTok Ads |

---

## Production Layer · Visuelle Produktion

### Fotografie & Postproduktion
| Tool | Einsatz | Compliance |
|------|---------|-----------|
| Adobe Photoshop | Retusche, Compositing, Generative Fill | ✅ Rechtssicher, Adobe Firefly-Basis |
| Adobe Lightroom | Farbkorrektur, Preset-Systeme, Batch-Export | ✅ EU-Infrastruktur |
| Adobe Illustrator | Layoutvarianten, Text-Overlays für Ads | ✅ |
| Adobe Premiere Pro | Video-Editing, Short-Form | ✅ |
| DaVinci Resolve | Farbkorrektur Video, High-End Finishing | ✅ |
| CapCut Pro | Short-Form Video, TikTok-native Formate | ⚠️ Datenpfad prüfen bei Kundendaten |

### KI-Visuals & Generative Tools
| Tool | Einsatz | Compliance-Status |
|------|---------|-------------------|
| **Midjourney v6+** | KI-Hintergründe, Stilvarianten, Moodboards | ✅ Klar kennzeichnen (EU AI Act) |
| **Adobe Firefly** | Generative Fill, Background Generation | ✅ Rechtssicher — keine Urheberrechts-Risiken |
| **Photoshop Generative Fill** | Produkt-Integration in KI-Hintergründe | ✅ Firefly-Basis |
| **Runway ML** | Video-Generierung, Motion, Effekte | ✅ Kennzeichnen |
| **Stable Diffusion (lokal)** | Experimentell, kontrollierte Umgebung | ✅ Lokal = kein Cloud-Datenpfad |

**Was bewusst nicht eingesetzt wird:**
- Tools mit unklarer Trainingsdaten-Herkunft
- KI-Generierung echter Gesichter ohne Einwilligung
- Vollautomatische Ad-Generators ohne menschliche Hypothese

### KI-Kennzeichnung (Dateinamen-Konvention)
```
brand_creative_v3_KI-bg.jpg       → KI-Hintergrund
brand_creative_v3_full-photo.jpg  → vollständig fotografiert
brand_creative_v3_KI-gen.jpg      → vollständig KI-generiert
```
C2PA-Metadaten werden in allen ausgelieferten Assets hinterlegt.

---

## Intelligence Layer · Research & Wissensarchitektur

### Perplexity (Kern-System)
**Mirrou ist ein Frontier Firm mit Perplexity als zentralem Intelligence-System.**

| Space | Funktion |
|-------|----------|
| **Mirrou HQ (Team)** | Brand, Vision, Positionierung — Single Source of Truth |
| **Strategy & Intelligence** | Marktrecherche, Wettbewerb, Trends |
| **Ops & Playbooks** | SOPs, Prozesse, Templates |
| **PROJECT – Abschlussarbeit** | Aktives Projekt-Management |

Perplexity wird nicht als Suchmaschine genutzt — sondern als **organisiertes Wissenssystem**, das mit allen Studio-Dokumenten verknüpft ist. Jeder Space hat eigene Instruktionen, Persona und Upload-Bibliothek.

**Warum Perplexity statt anderer Tools:**
- Web-Search + Dokumenten-RAG in einem System
- Team-Spaces mit kontrollierten Wissensgrenzen
- EU-first verfügbar, DSGVO-kompatibel
- Ideal für Frontier-Firm-Workflows: Research → Strategie → Execution in einer Oberfläche

### Claude (Anthropic)
| Einsatz | Kontext |
|---------|---------|
| Langtext-Erstellung | Strategie-Dokumente, Case Studies, Briefings |
| Code & Struktur | Datenverarbeitung, Automatisierungen |
| Reasoning-Tasks | Komplexe strategische Analysen |

**Compliance**: Anthropic hat EU-Datenschutz-Zusätze. Keine Kundendaten in Prompts ohne AVV-Grundlage.

### Gemini (Google / Antigravity)
| Einsatz | Kontext |
|---------|---------|
| Website-Entwicklung | Gemini in Antigravity für Mirrou-Website-Builds |
| Multimodale Analyse | Bild + Text kombiniert |
| Google Workspace Integration | Docs, Sheets, Slides |

### Weitere Intelligence-Tools
| Tool | Einsatz |
|------|---------|
| Notion | Projektdokumentation (intern) |
| Miro | Workshopping, Konzeptentwicklung |
| Google Analytics 4 | Website-Performance (EU-konform konfiguriert) |

---

## Performance Layer · Analytics & Distribution

### Paid Media
| Tool | Kanal | Einsatz |
|------|-------|---------|
| Meta Ads Manager | Instagram, Facebook | Creative-Performance-Analyse, A/B-Tests |
| TikTok Ads Manager | TikTok | Hook-Testing, Short-Form Performance |
| Google Ads | YouTube, Display | Formatversionen, Retargeting-Creatives |

### Analytics & Reporting
| Tool | Einsatz |
|------|---------|
| Meta Ads Manager Reports | CTR, CPC, ROAS je Creative |
| Google Looker Studio | Kunden-Reporting-Dashboards |
| Custom Learning-Log (CSV/JSON) | Hypothesen-Dokumentation, übergebbar (Data Act-konform) |

---

## Infrastruktur & Hosting

| Bereich | Lösung | Compliance |
|---------|--------|-----------|
| Website-Hosting | Google Cloud Run (europe-west3 · Frankfurt) | ✅ EU-Infrastruktur |
| E-Mail | hallo@mirrou.studio / press@mirrou.studio | ✅ |
| Analytics | EU-konform konfiguriert, IP-Anonymisierung | ✅ DSGVO |
| Storage (Assets) | EU-basiert, keine US-Drittland-Übertragung | ✅ |
| Lead-Daten | DSGVO-Pflicht-Checkbox im Kontaktformular | ✅ |

---

## Co-Creation Matrix

Mirrou arbeitet mit Kunden als **Co-Creator**, nicht als Lieferant. Das System:

```
KUNDE bringt:                    MIRROU bringt:
─────────────────                ────────────────────────
Brand-Identität                  Produktionssystem
Performance-Daten                Testing-Logik
Produktkenntnis                  KI-Integration
Zielgruppen-Insight              Creative-Hypothesen
                  ↓ gemeinsam ↓
             Creative-Loop
    (Produktion → Test → Daten → Iteration)
```

Das Ergebnis ist kein Bilderset — es ist ein **lernendes System**, das mit jeder Iteration besser wird.

---

## Frontier Firm Prinzip

Mirrou definiert sich als **Frontier Firm** — ein Studio, das:

1. **KI nativ integriert** — nicht als Plugin, sondern als Schicht im Produktionsprozess
2. **Wissen systematisch organisiert** — durch Perplexity Spaces als Intelligence-Architektur
3. **Compliance by Design baut** — EU AI Act, DSGVO, Data Act sind Architektur-Entscheidungen, keine Pflichten
4. **Transparent und übergebbar arbeitet** — Lock-in ist kein Modell
5. **Kontinuierlich lernt** — jeder Creative-Zyklus macht das System besser

> „Während andere umstrukturieren, liefern wir." — Das ist kein Claim. Das ist der operative Vorteil einer Firma, die von Tag 1 als Frontier Firm gedacht wurde.

---

## Tool-Entscheidungsprinzipien

Bevor ein neues Tool eingeführt wird, werden drei Fragen gestellt:

1. **EU AI Act / DSGVO-konform?** — Datenpfad dokumentiert, AVV vorhanden?
2. **Export-Pfad vorhanden?** — Können Daten strukturiert übergeben werden? (Data Act)
3. **Ersetzt es Hypothesen oder unterstützt es sie?** — Kein Tool, das menschliche Urteilskraft ersetzt, sondern informiert.
