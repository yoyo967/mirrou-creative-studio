# Mirrou Creative Studio

## Aufbau einer KI-integrierten Performance Creative Agency

### Frontier Firm Architektur, Hybrid Production und EU AI Act-Compliance als Wettbewerbsstrategie

---

**Team:** Olha Yevtushenko · Denys Demyanyshyn · Ralph Kindermann · Yahya Yildirim

**Kurs / Institution:** D03 2026 · DCI Digital Career Institute

**Dozentin:** Steffany Fischer

**Abgabedatum:** 19. Juni 2026

**Website:** mirrou.studio

---

\newpage

## Inhaltsverzeichnis

1. Executive Summary
2. Problemstellung und Marktkontext
3. Konzept und Positionierung
4. Brand Identity
5. Service-Portfolio und Methodik
6. Frontier Firm Architektur
7. Website
8. Compliance-Architektur
9. Team und Rollenverteilung
10. Strategische Entscheidungen und Learnings
11. Ausblick
12. Anhang

---

\newpage

## 1. Executive Summary

Mirrou Creative Studio ist ein Performance Creative Studio aus Hamburg und Berlin, spezialisiert auf D2C-Marken in den Segmenten Beauty, Health und Lifestyle im DACH-Raum. Die zentrale These: Bis zu 70 Prozent des Kampagnenerfolgs im Paid-Social-Bereich hangen am Creative — doch der Markt trennt Asthetik und Performance in zwei getrennte Welten. Mirrou verbindet beides in einem System.

Im Rahmen dieser Abschlussarbeit wurde Mirrou vollstandig konzipiert, dokumentiert und operativ aufgebaut. Die wesentlichen Ergebnisse:

**Was wurde gebaut:**

- Eine vollstandige Markenidentitat mit Design-System, Logo-System und Brandbook
- Ein dreistufiges Service-Portfolio mit transparenter Preisstruktur
- Eine mehrsprachige Website (8 Sprachen) auf Google Cloud Platform, EU-gehostet
- Eine Frontier Firm Architektur mit funf Perplexity Spaces und 39 Wissensdokumenten
- Eine EU AI Act-konforme Compliance-Architektur mit C2PA-Integration
- Zwolf nummerierte PDF-Deliverables von Launch Proposal bis Investor Deck
- Vier Demo-Case-Studies mit Benchmark-basierten Ergebnissen
- Operative SOPs, Templates und Prozesse fur den Regelbetrieb

**Das zentrale Ergebnis:**

Mirrou ist nicht nur ein Konzept auf Papier. Die Website ist live und in Referenzqualitat gemessen (Lighthouse Desktop 100/100/100/100, sechs Security-Header im A-Grade, EU-gehostet), die Infrastruktur steht, die Prozesse sind dokumentiert, die Compliance ist implementiert. Ein Vier-Personen-Team hat durch systematische KI-Orchestrierung ein Projekt realisiert, das in Umfang und Tiefe dem Output eines deutlich grosseren Studios entspricht.

**Die zentrale Erkenntnis:**

Das Frontier Firm Modell — die Verschrankung von menschlicher Expertise mit KI-Systemen als operativer Schicht — ist kein Effizienz-Hack. Es ist ein neues Betriebsmodell fur kreative Dienstleistungen, das Skalierung ohne proportionalen Headcount-Aufbau ermoglicht.

---

\newpage

## 2. Problemstellung und Marktkontext

### 2.1 Creative Fatigue als Kernproblem

Im Performance Marketing hat sich uber die letzten Jahre ein fundamentaler Shift vollzogen: Targeting, einst der primare Hebel fur Kampagnenerfolg, ist zur Commodity geworden. Plattformen wie Meta und TikTok automatisieren die Zielgruppenansprache zunehmend durch algorithmische Optimierung. Was bleibt, ist das Creative — das visuelle und inhaltliche Asset, das im Feed uber Aufmerksamkeit, Klick und Conversion entscheidet.

Branchenanalysen zeigen konsistent, dass bis zu 70 Prozent des Kampagnenerfolgs am Creative hangen. Gleichzeitig erleben D2C-Marken ab einem Ad-Spend von 30.000 Euro pro Monat ein systematisches Problem: Creative Fatigue. Dieselben Anzeigen werden zu oft gezeigt, die Click-Through-Rate sinkt, die Cost-per-Click steigen, der Return on Ad Spend fallt unter die Profitabilitatsschwelle.

Die Benchmarks fur den DACH-Markt in den Segmenten Beauty und Health verdeutlichen das Problem:

| KPI | Benchmark (Beauty/Health D2C DACH) | Nach Fatigue-Onset |
|-----|------------------------------------|--------------------|
| CTR (Meta Feed) | 0,8–1,2 % | −35 bis −55 % |
| CPC (Meta) | 0,90–1,60 EUR | +45 bis +70 % |
| ROAS (Meta Retainer) | 1,8–2,5 | Unter Profitabilitat |
| Fatigue-Onset | 2–4 Wochen | — |

Creative Fatigue ist kein Einzelfall, sondern ein strukturelles Marktproblem. Marken, die skalieren wollen, brauchen keine einzelnen Kampagnen — sie brauchen ein System, das kontinuierlich produziert, testet und iteriert.

### 2.2 Der D2C-Beauty- und Health-Markt in DACH

Der Gesamtmarkt fur Beauty und Personal Care in Deutschland liegt bei circa 15 Milliarden Euro jahrlich. Der relevante Teilmarkt — D2C Beauty und Skincare im DACH-Raum — umfasst etwa 1,8 Milliarden Euro mit einem Wachstum von 12 bis 18 Prozent pro Jahr. D2C Health Supplements erreichen circa 900 Millionen Euro bei 15 bis 22 Prozent Wachstum. Beide Segmente wachsen damit drei- bis viermal schneller als der Gesamtmarkt.

Der Kanal-Shift von stationarem Handel zu Direct-to-Consumer ist der Haupttreiber. Meta (Instagram und Facebook) bleibt der Primarkanal mit der hochsten ROAS-Reife, wahrend TikTok mit uber 35 Prozent jahrlichem Wachstum im Ad-Spend den dynamischsten Zuwachs verzeichnet.

### 2.3 Die Marktlucke

Mirrous Wettbewerbsanalyse identifiziert drei Arenen:

**Arena 1 — Boutique Creative Studios:** Stark in visueller Qualitat, schwach in Performance-Denken. Kein systematisches A/B-Testing, keine Hybrid-Produktion, keine EU AI Act Compliance. Vorlaufzeiten von vier bis acht Wochen.

**Arena 2 — Performance Content Agencies:** Stark in Daten und Performance-Denken, schwach in visueller Qualitat. Generalistisch ausgerichtet, oft mit Junior-Teams. Keine Beauty/Health-Spezialisierung.

**Arena 3 — In-House Teams:** Hohe Fixkosten (Gehalter, Equipment), begrenzte Skalierbarkeit, drei bis sechs Monate Ramp-up-Zeit. Keine native KI-Integration, Compliance muss selbst aufgebaut werden.

Der Quadrant, den Mirrou besetzt — hohe Asthetik kombiniert mit starkem Performance-Denken, spezialisiert auf Beauty/Health im DACH-Raum — ist im Markt nicht besetzt. Kein identifizierter Wettbewerber kombiniert Editorial-grade Visuals, systematisches Creative-Testing, Hybrid-Produktion und proaktive EU AI Act-Compliance.

### 2.4 Zielmarkt-Segmentierung

Mirrous Total Addressable Market umfasst circa 2.800 Marken im DACH-Raum mit einem monatlichen Ad-Spend zwischen 10.000 und 150.000 Euro in den Segmenten Beauty, Health und Lifestyle. Die Kernzielgruppe — Growth D2C und Scale D2C — macht dabei circa 2.800 Marken aus, die den Sweet Spot zwischen ausreichendem Budget und akutem Creative-Fatigue-Problem bilden.

---

\newpage

## 3. Konzept und Positionierung

### 3.1 Core Positioning

Mirrou Creative Studio positioniert sich als Performance Creative Studio fur D2C-Brands in Beauty, Health und Lifestyle. Die Positionierung lasst sich in einem Satz zusammenfassen:

> Fur D2C-Brands mit 10.000 bis 150.000 Euro monatlichem Ad-Spend, die Creative Fatigue kennen und nicht mit ihr leben wollen, ist Mirrou das Studio, das eine kontinuierliche Creative-Engine liefert — durch Hybrid-Produktion, A/B-Testing und Data Feedback Loop.

Der zentrale Claim — **Algorithm of Soul** — artikuliert die operative Spannung, die das gesamte Projekt durchzieht: die Verbindung von algorithmischer Prazision mit kreativer Intuition. Dies ist kein Marketing-Slogan, sondern die Beschreibung der Methodik.

### 3.2 Ideal Customer Profiles

Die Zielgruppendefinition folgt dem ICP-Modell (Ideal Customer Profile) mit drei Segmenten:

**ICP 1 — D2C Skincare/Beauty Founder (hochste Prioritat):**
Alter 28 bis 45, DACH-Standort, 5 bis 25 Mitarbeiter, physisches Produkt, 20.000 bis 80.000 Euro monatlicher Ad-Spend. Die Kernfrustration: Creatives brennen nach drei Wochen aus, es gibt keinen Prozess fur Creative-Produktion, die bisherige Agentur lieferte schone Bilder ohne Performance.

**ICP 2 — D2C Health/Supplement Brand (hohe Prioritat):**
Alter 30 bis 50, 10 bis 50 Mitarbeiter, 15.000 bis 60.000 Euro monatlicher Ad-Spend. Zusatzliche Compliance-Sensibilitat durch Health Claims Verordnung (HCVO). EU AI Act-Konformitat ist hier ein noch starkeres Verkaufsargument.

**ICP 3 — Performance-Agentur als White-Label-Partner (sekundar):**
Performance- oder Digital-Agenturen in DACH, die kein eigenes Creative-Team auf Mirrou-Niveau haben. Ansprache uber LinkedIn Direct Outreach, nicht uber Standard-Kontaktformular.

Ein Qualifizierungs-Score-System mit neun Kriterien steuert die Pipeline-Priorisierung: Acht oder mehr Punkte bedeuten sofortige Qualifizierung, funf bis sieben Punkte normale Pipeline-Bearbeitung, unter funf Punkten Grenzfall mit Ruckfragen.

### 3.3 Pricing-Strategie

Mirrous Preisstruktur basiert auf Value-Based Pricing — die Preise orientieren sich am Kundenwert (ROAS-Steigerung, Zeitersparnis), nicht an Stundensatzen:

| Paket | Preisspanne | Zielgruppe |
|-------|-------------|------------|
| E-Commerce und Catalog | 1.500–3.000 EUR pro Shooting | Brands fur Shop- und Marktplatz-Professionalisierung |
| Social Media und Advertising | 2.000–5.000 EUR pro Kampagnenset | Brands fur Skalierung mit Creative-Fatigue-Vermeidung |
| Creative Retainer S/M/L | 2.000–15.000 EUR pro Monat | D2C-Brands ab 10.000 EUR Ad-Spend fur laufende Engine |

Die Zielmargen liegen bei 40 bis 60 Prozent fur Einzelprojekte und 50 bis 60 Prozent fur Retainer. Alle Preise werden transparent auf der Website kommuniziert — ein bewusster Differenzierungspunkt gegenuber Wettbewerbern, die nur auf Anfrage arbeiten.

### 3.4 Messaging-Matrix

Die Kommunikation folgt einer verbindlichen Messaging-Matrix mit kontextabhangigen Formulierungen. Der Kern-Claim bleibt immer konsistent, wahrend Tonalitat und Tiefe sich je nach Kanal anpassen:

- **Website Hero:** Wo Asthetik Algorithmus wird.
- **Pitch-Deck:** Wir liefern keine Bilder. Wir bauen eine Creative-Engine.
- **Social Bio:** Algorithm of Soul · Performance Creative · Hamburg/Berlin
- **B2B-Agentur:** Creative-Komponente fur Performance-Agenturen — editorial-grade, compliance-ready.

Eine verbindliche Verbotsliste schliesst Begriffe wie „innovativ", „ganzheitlich", „Full-Service" und Superlative ohne Daten-Backing aus.

---

\newpage

## 4. Brand Identity

### 4.1 Design-System: Dark Luxury

Mirrous visuelle Identitat folgt dem Design-System „Dark Luxury" — eine bewusste Gegenposition zum dominanten Erscheinungsbild im DACH-Beauty-Studio-Markt, der von weissen, beigen und hell-minimalistischen Designs gepragt ist.

**Farbsystem:**

| Farbe | Hex-Code | Verwendung |
|-------|----------|------------|
| Deep Onyx | #080808 | Primarfarbe, Hintegrunde, Typo |
| Gold | #C8A25A | Akzente, Highlights, Logo |
| Ivory | #F2EFE9 | Fliesstexte auf dunklem Grund |

**Typografie:**

| Schrift | Verwendung |
|---------|------------|
| Cormorant Garamond | Display-Headlines, Claim |
| Inter | Body-Text, UI-Elemente |
| JetBrains Mono | Technische Inhalte, Code |

Die Design-Entscheidung fur Dark Luxury ist strategisch begrundet: Schwarz mit Gold kommuniziert Premium ohne Aggressivitat, fallt im Feed auf und differenziert Mirrou visuell von jedem identifizierten Wettbewerber im DACH-Raum.

### 4.2 Logo-System

Das Logo-System umfasst zwolf Varianten in SVG und PNG fur alle Anwendungskontexte:

- Primary Dark (Gold auf Schwarz) — Standardverwendung
- Primary Light (Schwarz auf Weiss) — Dokumente, helle Hintergrunde
- Stacked Dark — Quadratische Anwendungen, Social-Profile
- Gold Background — Sonderanwendungen, Printed Materials

Verwendungsregeln definieren Mindestabstande, Schutzraum und verbotene Modifikationen.

### 4.3 Brandbook als Performance-Tool

Das Brandbook ist nicht nur ein Designdokument — es ist ein operatives Tool, das sicherstellt, dass jedes Asset, das Mirrou verlasst, dem visuellen System entspricht. Es enthalt exakte CSS-Tokens, Motion-Spezifikationen (Animationsdauer, Easing-Kurven) und Lokalisierungsregeln fur die acht Sprachversionen der Website.

### 4.4 Case Studies

Vier konzeptionelle Case Studies demonstrieren Mirrous Ansatz in unterschiedlichen Kontexten:

**Luminous Aura (Premium Skincare):** Hybrid-Produktion mit echtem Serum-Shooting und KI-generierten Lichtumgebungen. Demonstration des Kern-Workflows.

**Vitality Pulse (Health/Wellness):** Supplement-Case mit Fokus auf HCVO-konforme Bildsprache und Health-Claim-sensitive Kommunikation.

**Essence Drift (Fragrance):** Konzeptuelle Case Study fur den Duft-Bereich, der zeigt, wie immaterielle Produkteigenschaften visuell ubersetzt werden.

**Neural Glow (Tech Beauty):** Vollstandig KI-generierte Case Study als Proof of Concept fur die Grenzen und Moglichkeiten reiner KI-Produktion — bewusst als Kontrast zum Hybrid-Ansatz positioniert.

---

\newpage

## 5. Service-Portfolio und Methodik

### 5.1 Die drei Kerndisziplinen

Mirrous Leistungsportfolio basiert auf drei Disziplinen, die als ein integriertes System funktionieren:

**High-End Fotografie:** Prazision in jedem Frame — Makro-Details, Hauttone, Texturen, Materialflachen. Das Produkt wird bei Mirrou nie KI-generiert, es bleibt echt. Editorial-grade Produktion am Standort Hamburg, spezialisiert auf Beauty, Skincare, Fragrance und Health-Supplements.

**KI-generierte Hintergrunde:** Skalierbare Stilvarianten ohne Re-Shooting. EU AI Act-konform gekennzeichnet seit Tag 1 der Grundung. Hybrid kombiniert mit echtem Produktmaterial. C2PA-Metadaten werden dokumentiert und im Reporting erfasst.

**Paid-Ads Analytics:** Hypothesen vor Bauchgefuhl. Variablen-Isolation und A/B-Testing-Struktur mit Learning-Log fur jeden Kreativzyklus. Output: CTR, Scroll-Stop, ROAS — wiederholbar messbar.

### 5.2 Der 5-Schritt-Algorithmus

Jedes Mirrou-Projekt durchlauft funf definierte Schritte:

| Schritt | Name | Ergebnis |
|---------|------|----------|
| 01 | Creative Audit | Diagnose des bestehenden Setups in 30 Minuten |
| 02 | Visual Brief | Jede Entscheidung begrundet — Licht, Oberflache, Mood |
| 03 | Hybrid Execution | Fotografie und KI in einer Pipeline |
| 04 | Performance Layer | Technische Specs, Hook-Varianten, Formatversionen |
| 05 | Data Feedback Loop | CTR, Scroll-Stop, ROAS fliessen zuruck in die nachste Generation |

### 5.3 Hybrid Production

Das Hybrid-Production-Modell ist Mirrous operativer Kern. Es basiert auf einem klaren Prinzip: Das Produkt wird immer echt fotografiert — High-End, im Studio in Hamburg, mit professioneller Lichtfuhrung und Materialinszenierung. KI-Tools (Midjourney, Adobe Firefly) skalieren Stilvarianten in Hintegrunden, Lichtumgebungen und Ambiente, ohne das Kernprodukt zu ersetzen.

Die Entscheidung fur Hybrid statt reiner Fotografie oder reiner KI-Generierung basiert auf drei Uberlegungen:

1. **Vertrauen:** Konsumenten wollen das echte Produkt sehen, besonders bei Beauty- und Health-Produkten
2. **Geschwindigkeit:** Hybrid ist schneller als reine Fotografie (keine Re-Shootings fur Varianten)
3. **Compliance:** Ab August 2026 ist die Unterscheidung zwischen fotografiertem und KI-generiertem Inhalt rechtlich relevant

### 5.4 Content Format Matrix

Die Content Format Matrix steuert Produktionsentscheidungen und Kunden-Briefings. Sie definiert fur jedes Format den Kanal, das Ziel, das CTR-Potenzial, den Produktionsaufwand und den zulassigen KI-Einsatz:

| Format | Primare Kanale | KI-Einsatz |
|--------|---------------|------------|
| Product Hero Image | Meta Feed, Shop | Hintergrund |
| Lifestyle Composite | Meta Feed, Instagram | Hintergrund und Ambiente |
| Hook Video (15 Sekunden) | TikTok, Reels | Transitions, VFX |
| Carousel (3–5 Karten) | Meta Feed | Je Karte |
| Before/After | Meta, TikTok | Sparsam, HCVO beachten |

### 5.5 Data Feedback Loop

Der Data Feedback Loop ist das Element, das Mirrou von einer einmaligen Dienstleistung zu einem lernenden System macht. Nach zwei bis drei Wochen Live-Schaltung werden Performance-Daten erhoben, Gewinner-Creatives identifiziert, Hypothesen validiert oder widerlegt und das Learning-Log aktualisiert. Bei Retainer-Kunden startet damit automatisch der nachste Produktionszyklus.

### 5.6 Operativer Projekt-Workflow (SOP)

Der Standard Operating Procedure definiert sechs Phasen fur jedes Kundenprojekt:

| Phase | Dauer | Verantwortlich | Ergebnis |
|-------|-------|----------------|----------|
| 1. Qualifizierung | 1–5 Tage | Yahya | Entscheidung Ja/Nein |
| 2. Creative Audit | 1–2 Tage | Yahya + Denys | Audit Summary |
| 3. Visual Brief | 2–4 Tage | Olha | Freigegebenes Konzept |
| 4. Produktion | 4–7 Tage | Olha + Denys | Fertige Assets |
| 5. Performance Layer | 1–2 Tage | Denys | Delivery-Paket |
| 6. Data Feedback Loop | Laufend | Denys + Yahya | Learning-Log |

Gesamtdauer eines Erstprojekts: 9 bis 20 Tage — gegenuber vier bis acht Wochen bei klassischen Boutique Studios.

---

\newpage

## 6. Frontier Firm Architektur

### 6.1 Was ist eine Frontier Firm?

Das Frontier Firm Modell beschreibt eine Organisationsform, in der KI nicht als Werkzeug fur einzelne Aufgaben, sondern als operative Schicht des gesamten Betriebs eingesetzt wird. Im Gegensatz zu klassischen Agenturen, die KI als Add-on nutzen, ist bei Mirrou jeder Arbeitsbereich durch ein KI-Pendant erweitert.

Die Grundthese: Ein kleines Team kann durch systematische KI-Orchestrierung auf dem Niveau eines deutlich grosseren Studios operieren — nicht durch Abkurzungen, sondern durch informiertere Entscheidungen, konsistentere Outputs und schnellere Iterationszyklen.

### 6.2 Die vier Schichten

Die Frontier Firm Architektur besteht aus vier funktionalen Schichten:

```
LAYER 1 · INTELLIGENCE       Perplexity Spaces · Claude · Gemini
                              Research, Wissen, Strategie, Reasoning

LAYER 2 · PRODUCTION          Adobe CC · Midjourney · Runway · Claude Code
                              Foto, KI-Visuals, Video, Web, Slides

LAYER 3 · INFRASTRUCTURE      GCP · Google Drive · CLI · MCP
                              Hosting, Daten, Konnektoren, Automatisierung

LAYER 4 · PERFORMANCE         Meta · TikTok · Google Ads · GA4
                              Analytics, Distribution, Reporting
```

### 6.3 Perplexity Space-Architektur

Perplexity Spaces bilden das Intelligence-Betriebssystem von Mirrou. Im Gegensatz zu klassischen Wissensmanagement-Tools wie Notion oder Confluence kombinieren Spaces kuratiertes Wissen (hochgeladene Dokumente) mit Echtzeit-Web-Recherche in einem System.

Mirrou betreibt funf Spaces mit klar definierten Funktionen:

| Space | Funktion | Dokumente | Nutzer |
|-------|----------|-----------|--------|
| Mirrou HQ (Team) | Brand, Vision, Positionierung — Single Source of Truth | 14 | Gesamtes Team |
| Strategy und Intelligence | Marktrecherche, Wettbewerb, Trends, Benchmarks | 11 | Yahya, Denys |
| Ops und Playbooks | SOPs, Prozesse, Templates, Checklisten | 7 | Gesamtes Team |
| PROJECT – Abschlussarbeit | Aktives Projekt-Management | 6 | Yahya, Ralph |
| PRIVATE – Command Center | Personliches R und D | Variabel | Yahya |

Jeder Space hat eine definierte KI-Persona mit klaren Rollen, Wissensgrenzen und Verhaltensregeln. Das Team arbeitet damit konsistent, nicht zufällig — jede Anfrage an einen Space wird durch den Kontext der hochgeladenen Dokumente informiert.

### 6.4 Das Perfect Twin Prinzip

Fur jede Arbeitsdomane gibt es ein menschliches und ein KI-Pendant — nicht als Ersatz, sondern als Verdopplung:

| Domane | Mensch | KI-Pendant |
|--------|--------|-----------|
| Brand und Strategie | Yahya | Perplexity HQ Space |
| Creative Direction | Olha | Midjourney + Firefly System |
| Performance und Kampagnen | Denys | Claude + Meta Analytics |
| CRM und Prozesse | Ralph | Ops und Playbooks Space |
| Web-Entwicklung | Team | Claude Code + GCP Pipeline |
| Research und Intelligence | Team | Strategy und Intelligence Space |

Das Ergebnis: Jede Entscheidung ist informiert, jeder Output ist konsistent, jede Iteration ist schneller als die vorherige.

### 6.5 Claude Code als Web-Produktions-Engine

Claude Code ist der Grund, warum Mirrou als Agentur vollstandige Websites selbst bauen kann — ohne externe Entwickler. Die Mirrou-Website wurde vollstandig mit Claude Code gebaut und auf Google Cloud Platform deployed.

Der Workflow:

```
Briefing (Perplexity / Gemini)
    |
Code-Generierung (Claude Code)
    |
Framework: React 19 · TypeScript · Tailwind CSS v4
    |
Containerisierung: Docker
    |
Deployment: GCP Cloud Run (europe-west3 Frankfurt)
    |
Live in unter 10 Minuten
```

### 6.6 MCP-Server-Architektur

Das Model Context Protocol (MCP) verbindet KI-Modelle mit externen Tools. Mirrou nutzt MCP-Konnektoren fur Google Drive, GitHub, Filesystem-Zugriff, Web-Fetching, Notion und Canva. Das bedeutet: Perplexity kann direkt auf Drive-Dokumente zugreifen, Claude Code hat Vollzugriff auf lokale Projektordner, und Canva kann Slides aus dem KI-Kontext heraus generieren.

Ein strategisch zentraler Konnektor ist der **Chrome DevTools MCP** — ein offizieller, quelloffener MCP-Server von Google/Chrome, der dem Coding-Agent die volle DevTools-Maschine gibt: Performance-Traces mit Core Web Vitals (LCP, INP, CLS), Lighthouse-Audits, Netzwerk- und Console-Inspektion sowie Geraete-Emulation. Damit wird Performance-Optimierung zu einem geschlossenen Loop direkt in der Entwicklungsumgebung: messen, Engpass identifizieren, im Code beheben, erneut messen. Der Konnektor ist projekt-versioniert (`.mcp.json`) und EU-konform konfiguriert — kein Datenabfluss an Google-Telemetrie- oder CrUX-Endpunkte (Flags `--no-performance-crux`, `--no-usage-statistics`, `--isolated`, `--headless`).

| MCP-Konnektor | Funktion |
|---------------|----------|
| Filesystem | Vollzugriff Claude Code auf Projektordner |
| GitHub | Versionierung, Commits, Repo-Operationen |
| Google Drive | Dokumentenzugriff fur Perplexity und Claude |
| Chrome DevTools | Performance-Traces, Lighthouse, CWV, Netzwerk-Debugging (EU-safe) |
| Canva / Notion | Slide- und Wissens-Generierung aus dem KI-Kontext |

### 6.7 Co-Creation Matrix

Die Tool-Landschaft von Mirrou umfasst vier Schichten mit jeweils spezialisierten Werkzeugen:

| Schicht | Tools |
|---------|-------|
| Intelligence | Perplexity, Claude (Web + Code + API), Gemini (Antigravity, AI Studio, Vertex AI) |
| Production | Adobe Photoshop, Lightroom, Illustrator, Premiere Pro, Midjourney, Runway ML, CapCut Pro |
| Infrastructure | GCP Cloud Run, Artifact Registry, Cloud Build, Secret Manager, Cloud Storage |
| Performance | Meta Ads Manager, TikTok Ads Manager, Google Ads, Google Analytics 4, Looker Studio |

Bevor ein neues Tool eingefuhrt wird, muss es eine Tool-Entscheidungsmatrix bestehen: EU AI Act- und DSGVO-Konformitat, Export-Pfad, MCP-Konnektor-Verfugbarkeit und GCP-Kompatibilitat.

---

\newpage

## 7. Website

### 7.1 Tech-Stack

Die Mirrou-Website wurde als vollstandige React-Applikation mit Static Site Generation implementiert:

| Komponente | Technologie |
|------------|-------------|
| Framework | React 19 + Vite 6 |
| Sprache | TypeScript 5.8 (typsicher via @types/react 19) |
| Styling | Tailwind CSS v4 |
| Rendering | vite-react-ssg — statisches Pre-Rendering aller Routen |
| Code-Splitting | Route-Level-Lazy-Loading (react-router) + Vendor-Chunks (Motion, Router, Icons) |
| Internationalisierung | i18next + react-i18next (8 Sprachen, dynamischer Locale-Import) |
| Visuelle Effekte | Motion (Framer-Motion-Nachfolger) + Canvas-2D-Partikelsystem (kein Three.js) |
| Code-Qualitat | ESLint (Flat Config) + tsc-Typecheck als Build-Gates |
| Containerisierung | Docker (Multi-Stage) + nginx:alpine (gzip-9, Security-Header) |
| Hosting | GCP Cloud Run (europe-west3 Frankfurt) |

### 7.2 Seitenstruktur

Die Website umfasst folgende Bereiche:

- **Homepage:** Hero mit Claim, Problem-Darstellung, Service-Ubersicht, Cases, Kontakt
- **Studio:** Geschichte, Team, Philosophie
- **Pakete:** Drei Service-Pakete mit transparenten Preisen
- **Cases:** Vier Demo-Case-Studies mit visueller Darstellung
- **Team:** Individuelle Teammitglieder-Seiten
- **Blog:** 20 Fachartikel zu Creative Fatigue, Meta Ads, EU AI Act, TikTok Beauty Trends
- **BrandBook:** Integriertes visuelles Styleguide
- **Trust Center:** Compliance-Information, EU AI Act, DSGVO
- **Pillar Pages:** SEO-optimierte Langform-Inhalte
- **Kontakt:** Formular mit Ad-Spend-Segmentierung als Qualifizierungs-System

### 7.3 Mehrsprachigkeit

Die Website ist in acht Sprachen verfugbar: Deutsch, Englisch, Spanisch, Italienisch, Franzosisch, Turkisch, Russisch und Ukrainisch. Die Implementierung erfolgt uber i18next mit separaten Lokalisierungsdateien und automatischer Browser-Spracherkennung.

### 7.4 Hosting und DSGVO

Die Entscheidung fur GCP Cloud Run in der Region europe-west3 (Frankfurt) ist DSGVO-begrundet: Alle Daten bleiben in der EU. Die Website setzt zum Launch ausschliesslich technisch notwendige Cookies und betreibt kein Tracking — kunftiges Analytics wird ausschliesslich uber ein DSGVO-konformes Consent-Gate aktiviert. Die Website lauft als Docker-Container hinter nginx, das sechs Security-Header live ausliefert: HSTS mit Preload, restriktive Content-Security-Policy (ohne `unsafe-eval`), X-Frame-Options DENY, X-Content-Type-Options, Referrer-Policy und Permissions-Policy.

### 7.5 SEO-Architektur

Die Website implementiert Schema.org Structured Data, Open Graph Tags und automatische Sitemap-Generierung. Ein Pillar-Cluster-Modell strukturiert den Blog-Content: Pillar Pages zu Kernthemen (Performance Creative, Foto-KI-Hybrid, Beauty E-Commerce) verlinken auf Cluster-Artikel zu Unterthemen.

### 7.6 Build-Prozess

Der vollstandige Build-und-Deployment-Prozess — von Code-Anderung bis Live-Website — dauert unter zehn Minuten. Claude Code generiert oder modifiziert den Quellcode, Docker containerisiert die Applikation, und GCP Cloud Run deployed den Container automatisch.

### 7.7 Technische Kennzahlen

**Struktur:**

| Metrik | Wert |
|--------|------|
| React-Komponenten | 37+ |
| Route-Dateien | 16 |
| Lokalisierungsdateien | 8 Sprachen |
| Blog-Artikel | 20 |
| Statisch vorgerenderte Seiten | 345 (alle Routen x 8 Sprachen) |
| Sitemap-URLs | 280 |
| npm-Sicherheitslucken | 0 |

**Gemessene Qualitat (Google Lighthouse, Live-Revision `00041-pfg`, Stand 2026-05-31):**

| Kategorie | Desktop | Mobile | Google-Schwelle |
|-----------|:-------:|:------:|:---------------:|
| Performance | 100 | 81 | >= 90 |
| Accessibility | 100 | 97 | >= 90 |
| Best Practices | 100 | 100 | >= 90 |
| SEO | 100 | 100 | >= 90 |

Desktop erreicht auf allen vier Achsen Referenzqualitat (100/100/100/100). Core Web Vitals: Desktop LCP 0,6 s / CLS 0,011; Mobile LCP 3,7 s / FCP 2,5 s / CLS 0. Die verbleibende Mobile-Lucke ist rein Lade-/Render-Geschwindigkeit auf gedrosselter Verbindung — kein struktureller Defekt. Alle Werte sind uber `npx lighthouse` reproduzierbar und werden in einem lebenden Audit-Dossier (`AUDIT.md`) bei jeder Anderung fortgeschrieben.

### 7.8 Performance Engineering

Die Website wird nicht einmalig optimiert, sondern in einem messdatengetriebenen Loop gepflegt. Eine Route-Level-Code-Splitting-Architektur stellt sicher, dass jede Seite nur ihr eigenes JavaScript ladt: Der initiale App-Chunk wurde von 349 KiB auf 107 KiB reduziert (−69 %), das ungenutzte JavaScript der Startseite von rund 59 KiB auf etwa 20 KiB. Die Mehrsprachigkeit ist dynamisch — nur das aktive Sprachpaket wird geladen, nicht alle acht.

Der Optimierungs-Loop nutzt den Chrome DevTools MCP (siehe Abschnitt 6.6): Performance-Trace gegen die Live-URL, Insight-Analyse des LCP-Pfads, gezielter Code-Fix, erneute Messung. Qualitatssicherung erfolgt uber zwei automatisierte Gates — strenger TypeScript-Typecheck (`tsc --noEmit`) und ESLint (Flat Config) — die vor jedem Build laufen mussen.

---

\newpage

## 8. Compliance-Architektur

### 8.1 EU AI Act (Verordnung 2024/1689)

Die EU-Verordnung 2024/1689 uber kunstliche Intelligenz tritt am 2. August 2026 in volle Anwendbarkeit. Mirrou hat sich entschieden, Compliance ab Tag 1 der Grundung zu implementieren — nicht als reaktive Pflichterfüllung, sondern als proaktives Differenzierungsmerkmal.

**Klassifizierung:** Mirrou operiert als Limited-Risk-System nach Art. 50. Die eingesetzten KI-Algorithmen dienen der Erzeugung visueller Marketing-Inhalte. Da keine Entscheidungen uber Grundrechte, kritische Infrastrukturen oder physische Sicherheit getroffen werden, greifen ausschliesslich Transparenzpflichten.

**Praventiver Ausschluss:** Mirrou schliesst technologisch und vertraglich alle High-Risk-Szenarien aus — keine manipulativen Techniken, kein Social Scoring, keine biometrische Identifikation, keine Sensitiv-Sektoren.

### 8.2 Labeling-Matrix

Die Mirrou Labeling-Matrix definiert vier Kennzeichnungsstufen:

| Content-Typ | KI-Anteil | Mirrou-Standard | C2PA-Metadaten |
|-------------|-----------|-----------------|----------------|
| Pure AI Generation | 100 % | „AI-Generated" | Voller Audit-Trail |
| AI-Assisted Hybrid | 60–99 % | „AI-Assisted" (freiwillig) | AI-Usage-Flag |
| Product Integration | 20–59 % | „AI-Assisted" (freiwillig) | AI-Usage-Flag |
| Human-Crafted | 0 % | „100 % Human-Crafted" | Original EXIF |

Der Hybrid-Workflow stellt die primare juristische Verteidigungslinie dar: Gemass Art. 50 Abs. 3 entfallt die Kennzeichnungspflicht bei substantieller menschlicher Nachbearbeitung. Mirrou kennzeichnet dennoch freiwillig, um zusatzliches Vertrauen aufzubauen.

### 8.3 C2PA-Integration

C2PA (Coalition for Content Provenance and Authenticity) Metadaten werden in alle relevanten Assets eingebettet. Adobe Firefly-Assets tragen automatisch C2PA-Daten, andere KI-generierte Inhalte werden manuell gekennzeichnet. Dateinamens-Konventionen signalisieren den KI-Einsatz bereits auf Dateisystem-Ebene.

### 8.4 Dokumentationspflichten und Audit-Readiness

Mirrou archiviert uber drei Jahre folgende obligatorische Log-Files:

- KI-System-Beschreibung (verwendete Modelle und Versionen)
- Prompt-Logs (anonymisiert)
- Output-Log (alle generierten Roh-Outputs mit technischen Parametern)
- Review-Log (manuelle Freigaben durch den Creative Lead)
- Kunden-Kommunikation (Briefings und Freigabeprozesse)

### 8.5 DSGVO-Umsetzung

| Massnahme | Umsetzung |
|-----------|-----------|
| Hosting | GCP europe-west3 (Frankfurt) |
| Website-Analytics | Kein Tracking zum Launch — nur technisch notwendige Cookies; kunftiges Analytics nur uber Consent-Gate |
| Security-Header | 6/6 live (A-Grade): HSTS-Preload, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-/Permissions-Policy |
| Vertragswerk | AVV als Standardbestandteil jedes Vertrags |
| Unterauftragsverarbeiter | Dokumentiert: GCP, Adobe, Perplexity, Anthropic |
| KI-Transparenzklausel | Bestandteil jedes Kundenvertrags |

### 8.6 Data Act (EU 2023/2854)

Der Data Act verpflichtet zur Datenportabilitat und verhindert Lock-in. Mirrou setzt dies durch offene Formate (Markdown, PDF), vollstandige Asset-Ubergabe bei Retainer-Ende und eine 14-Tage-Frist fur die Archiv-Ubergabe um. Lock-in ist explizit nicht Geschaftsmodell.

### 8.7 HCVO (Health Claims Verordnung)

Fur Health- und Supplement-Kunden integriert Mirrou eine HCVO-Checkliste in den Creative-Brief-Prozess. Before/After-Claims mussen HCVO-konform sein — keine medizinischen Versprechen ohne Beleg.

### 8.8 Compliance als Wettbewerbsvorteil

Kein identifizierter Wettbewerber im DACH-Raum kommuniziert proaktive EU AI Act-Compliance. Der First-Mover-Vorteil ist zeitlich begrenzt — sechs bis zwolf Monate — aber strategisch wertvoll: Wenn ab August 2026 alle Wettbewerber nachrusten mussen, hat Mirrou bereits ein Jahr Erfahrung und kommunizierbares Vertrauen aufgebaut.

---

\newpage

## 9. Team und Rollenverteilung

### 9.1 Teamstruktur

Mirrou operiert als Vier-Personen-Team an zwei Standorten:

| Name | Rolle | Standort | Schwerpunkt |
|------|-------|---------|-------------|
| Olha Yevtushenko | Founder und Creative Director · Performance Marketing | Hamburg | Visuelle Identitat, Produktion, Asthetik |
| Denys Demyanyshyn | Performance und Analytics | Berlin | Daten, Kampagnen, Benchmarks |
| Ralph Kindermann | CRM und Client Success | Berlin | Prozesse, Onboarding, Dokumentation |
| Yahya Yildirim | Growth, Inbound und Project Lead | Berlin | Strategie, Architektur, Inbound, Koordination |

### 9.2 Olha Yevtushenko — Creative Director · Performance Marketing

Olha ist die kreative Seele von Mirrou. Jedes Asset, das das Studio verlasst, geht durch ihre Direktion. Ihre Kernbeitrage im Projekt:

- Dark Luxury Design-System (Deep Onyx + Gold), Typografie-System
- Logo-System mit zwolf SVG-Varianten und PNG-Exporten
- Vollstandiges Brandbook und Visual-Styleguide
- Vier visuelle Demo-Case-Studies
- Hybrid Production Workflow (Konzept und Umsetzung)
- Alle visuellen Assets fur mirrou.studio
- Shot-Konzepte fur Feed, Reels, TikTok, Stories
- Mitentwicklung des Visual Brief-Prozesses

Tools: Adobe Photoshop, Lightroom, Illustrator, Premiere Pro, Midjourney, Adobe Firefly, Figma

### 9.3 Denys Demyanyshyn — Performance und Analytics

Denys verbindet kreativen Output mit messbarem Ergebnis. Seine Kernbeitrage:

- Benchmark Library mit CTR-, CPC- und ROAS-Tabellen fur alle Kanale und Branchen
- Platform Intelligence (Algorithmus-Logik und Format-Specs fur Meta, TikTok, Google)
- Demo-Case LumiSkin Berlin mit Benchmark-basierter Hypothesen-Struktur
- Data Feedback Loop (Konzept und Template)
- A/B-Testing Framework mit Hook-Testing und Auswertungslogik
- Mitentwicklung der Service-Pakete aus Performance-Perspektive

Tools: Meta Ads Manager, TikTok Ads Manager, Google Analytics 4, Looker Studio, Google Sheets

### 9.4 Ralph Kindermann — CRM und Client Success

Ralph ist das operative Ruckgrat des Teams. Seine Kernbeitrage:

- Vollstandiges Kunden-Onboarding-System
- Team-internes FAQ-Dokument
- CRM-Struktur und Pipeline-Management
- SOP fur monatlichen Retainer-Rhythmus
- Kunden-Ubergabe-Standard (Delivery-Prozess)
- Meeting-Protokolle und Aufgaben-Tracking

Tools: Google Sheets, Google Drive, Google Meet, Slack, Perplexity Ops Space

### 9.5 Yahya Yildirim — Growth, Inbound und Project Lead

Yahya ist der Architekt des Systems — nicht nur der Agentur, sondern der Art und Weise, wie sie denkt, kommuniziert und skaliert. Seine Kernbeitrage umfassen vier Bereiche:

**Strategie und Positionierung:** ICP-Definition, Competitive Analysis (3-Arenen-Modell), Messaging Matrix, Marktubersicht DACH, Trend Radar

**Frontier Firm Architektur:** Design und Aufbau aller funf Perplexity Spaces, 39 Markdown-Wissensdokumente, MCP-Architektur, Perfect Twin Prinzip, Co-Creation Matrix

**Website und Tech:** Website-Architektur (React, TypeScript, Tailwind), 8 Sprachen, GCP Deployment, Trust Center, Kontaktformular mit Ad-Spend-Segmentierung

**Compliance:** EU AI Act-Konzept, KI-Kennzeichnungs-System, C2PA-Integration, DSGVO-Umsetzung, Data Act Konzept

**Inbound und Growth:** 4-Kanal-Inbound-System, Website-Architektur als Funnel, LinkedIn-Positionierung, B2B-Outreach-Templates

### 9.6 Zeitaufwand

| Name | Geschatzter Gesamtaufwand |
|------|--------------------------|
| Olha Yevtushenko | ca. 120 Stunden |
| Denys Demyanyshyn | ca. 80 Stunden |
| Ralph Kindermann | ca. 60 Stunden |
| Yahya Yildirim | ca. 150 Stunden |
| **Gesamt** | **ca. 410 Stunden** |

### 9.7 Zusammenarbeit

| Bereich | Primare Verantwortung | Support |
|---------|----------------------|---------|
| Brand Identity | Olha | Yahya (Konzept) |
| Performance-System | Denys | Yahya (Strategie) |
| Prozesse | Ralph | Yahya (Architektur) |
| Website Visuals | Olha | Yahya (Tech) |
| Prasentation | Yahya | Alle |
| Abschlussbericht | Yahya (Koordination) | Alle |

---

\newpage

## 10. Strategische Entscheidungen und Learnings

### 10.1 Die acht zentralen Entscheidungen

Im Verlauf des Projekts wurden acht strategische Entscheidungen getroffen, die den Charakter von Mirrou definiert haben. Jede wurde mit Alternativen gepruft und begrundet:

**Entscheidung 1: Nische statt Generalist**
Alternativen: Full-Service Agentur fur alle Branchen, Social Media Agentur.
Entscheidung: Spezialisierung auf D2C Beauty/Health/Lifestyle im DACH-Markt.
Begrundung: Creative Fatigue ist das prazise Problem dieser Nische. Spezialisierung ermoglicht Premium-Pricing, tiefere Kompetenz und klareres Marketing.

**Entscheidung 2: Hybrid Production als Kernangebot**
Alternativen: Nur klassische Fotografie, nur KI-Generierung.
Entscheidung: Hybrid — echtes Produkt-Foto kombiniert mit KI-Hintegrunden.
Begrundung: Reine KI schafft kein Vertrauen bei Produkten. Reine Fotografie ist zu langsam fur Performance-Zyklen. Hybrid ist schneller als Foto allein und vertrauenswurdiger als reines KI-Output.

**Entscheidung 3: Compliance ab Tag 1**
Alternativen: Compliance nachtraglich einbauen, Minimal-Compliance.
Entscheidung: Volle Compliance ab Grundung — Trust Center, C2PA, AVV als Standard.
Begrundung: First-Mover-Vorteil. Kein Wettbewerber kommuniziert proaktive EU AI Act-Compliance.

**Entscheidung 4: Frontier Firm statt klassisches Agentur-Setup**
Alternativen: Klassisches Setup mit Projektmanagement-Tool, E-Mail und Ablage.
Entscheidung: Perplexity Spaces als Intelligence-Betriebssystem, Claude Code fur Web, MCP fur Automatisierung.
Begrundung: Nur durch KI-Orchestrierung kann ein Vier-Personen-Team wie ein grosseres Studio operieren. Gleichzeitig Beweis des eigenen Konzepts.

**Entscheidung 5: Custom Website statt Website-Builder**
Alternativen: Webflow, Squarespace, WordPress.
Entscheidung: React + TypeScript + Tailwind CSS + GCP Cloud Run.
Begrundung: Volle Kontrolle uber Code und Design. Mehrsprachigkeit. EU-Hosting. Skalierbar. Demonstriert Kompetenz.

**Entscheidung 6: Perplexity als primares Intelligence-System**
Alternativen: Notion + ChatGPT, Confluence, Obsidian.
Entscheidung: Perplexity Spaces als Single Source of Truth.
Begrundung: Einziges Tool, das kuratiertes Wissen und Echtzeit-Web-Recherche in einem System kombiniert. MCP-Anbindung macht es erweiterbar.

**Entscheidung 7: Dark Luxury als visuelles System**
Alternativen: Helles, minimalistisches Design (wie viele Beauty-Studios), Corporate Blue/Grey.
Entscheidung: Deep Onyx + Gold, Algorithm of Soul.
Begrundung: Der DACH-Markt ist dominiert von hell-minimalistischen Designs. Dark Luxury fallt auf und kommuniziert Premium.

**Entscheidung 8: 4-Space-Architektur**
Alternativen: Ein gemeinsamer Space, Space pro Person.
Entscheidung: Vier funktionale Team-Spaces plus ein privater Space.
Begrundung: Ein Space wird uberladen. Space pro Person verhindert Team-Wissen. Funktionale Spaces spiegeln echte Arbeitsdomanen.

### 10.2 Was hat funktioniert

**Claude Code als Web-Builder:** Eine vollstandige React-Website mit Mehrsprachigkeit (8 Sprachen), statischem Pre-Rendering, 20 Blog-Artikeln und automatisiertem GCP-Deployment — gebaut ohne externe Entwickler, mit live gemessener Desktop-Referenzqualitat (Lighthouse 100/100/100/100). Das beweist die Frontier Firm These operativ.

**Perplexity Spaces als Wissens-OS:** Effektiver als Notion oder Confluence fur KI-native Teams. Die Kombination aus kuratierten Dokumenten und Echtzeit-Recherche eliminiert den Bruch zwischen Wissensbasis und aktuellem Marktgeschehen.

**EU AI Act Compliance ab Tag 1:** Kein Mehraufwand, wenn das System von Anfang an richtig gebaut ist. Die Compliance-Architektur wurde parallel zur Markenentwicklung aufgebaut, nicht nachtraglich aufgesetzt.

**Frontier Firm Modell:** 410 Stunden Gesamtaufwand fur ein Projekt, das 60 Markdown-Dokumente, 50 PDFs, eine mehrsprachige Website, funf Perplexity Spaces und zwolf nummerierte Deliverables umfasst. Das Modell skaliert.

### 10.3 Was wir anders machen wurden

**Fruhere Ordnerstruktur:** Das Projekt ist organisch gewachsen — mit der Folge von Datei-Duplikaten. Inzwischen steht das Repository unter durchgehender Git-Versionskontrolle, erganzt um ein lebendes Audit-Dossier (`AUDIT.md`) und eine projektgebundene Agent-Instruktion (`CLAUDE.md`) als Single Source of Truth fur den Systemzustand.

**Tech-Stack-Dokumentation im Bericht:** Fruhe Entwurfe referenzierten teilweise einen anderen Stack (u. a. Next.js, Three.js), wahrend die Website tatsachlich mit Vite, React und vite-react-ssg gebaut ist. Die Dokumentation wurde inzwischen gegen den realen Code verifiziert und korrigiert — Konsistenz zwischen Code und Bericht ist seitdem ein gepflegter Prozess.

**Echte Kunden-Daten:** Alle Case Studies sind konzeptionell. Ein echter Kunden-Case mit Live-Daten hatte die Glaubwurdigkeit signifikant erhoht.

**Fruhere Team-Integration:** Die einzelnen Arbeitsbereiche waren stark individuell organisiert. Ein fruherer gemeinsamer Workflow hatte Synergien beschleunigt.

### 10.4 Zentrale Learnings

1. KI ist keine Abkurzung — sie ist eine operative Schicht, die Qualitat und Konsistenz erhoht, nicht ersetzt
2. Compliance ist kein Overhead — sie ist Differenzierung, wenn sie proaktiv kommuniziert wird
3. Ein kleines Team kann wie ein grosses Studio operieren — wenn das System stimmt
4. Hybrid Production ist der einzige Ansatz, der gleichzeitig Qualitat, Geschwindigkeit und Compliance erfullt
5. Transparente Preise auf der Website sind ein starkes Vertrauenssignal im B2B-Bereich

---

\newpage

## 11. Ausblick

### 11.1 Mirrou nach der Abschlussarbeit

Das Projekt hat ein vollstandig operationsfähiges Studio geschaffen. Die nachsten Schritte:

**Kurzfristig (0–3 Monate):**
- Erste echte Kundenakquise uber LinkedIn und Inbound
- Erster bezahlter Case fur Portfolio mit echten Performance-Daten
- Kontaktformular-Anbindung an HubSpot (DSGVO-Consent) zur Lead-Erfassung
- Mobile-Performance auf >= 90 heben (LCP/FCP-Pfad) — gefuhrt durch den Chrome-DevTools-MCP-Trace-Loop; Desktop-Core-Web-Vitals bereits auf Bestwert

**Mittelfristig (3–12 Monate):**
- Aufbau einer echten Case-Study-Bibliothek mit Live-Daten
- Ausbau des Agency Partner Programs (ICP 3)
- TikTok Shop-Kompetenz als First-Mover im DACH-Raum
- Erweiterung des Teams um Freelancer-Netzwerk

### 11.2 Marktentwicklung

Drei Marktentwicklungen werden Mirrous Positionierung in den nachsten zwolf Monaten beeinflussen:

**EU AI Act (August 2026):** Der Stichtag der vollstandigen Anwendbarkeit wird den Markt segmentieren — in Anbieter, die vorbereitet sind, und solche, die nachrüsten mussen. Mirrou ist vorbereitet.

**TikTok Shop DACH:** Der Launch von TikTok Shop im DACH-Raum schafft neue Creative-Format-Bedarfe (Shop-Ads, LIVE-Formate). Wenig Kompetenz im Markt — First-Mover-Vorteil moglich.

**UGC-Fatigue:** Die Qualitat von User-Generated-Content sinkt, wahrend die Menge steigt. Qualitats-Creatives gewinnen gegenuber Smartphone-UGC — Mirrous Hybrid-Ansatz profitiert direkt.

### 11.3 Langfristige Vision

Mirrou als fuhrendes Beauty/Health Creative Studio im DACH-Raum — mit einem skalierbaren System, das durch KI-Orchestrierung wachst, ohne proportional Headcount aufzubauen. Die Frontier Firm Architektur ist nicht nur das Betriebsmodell von Mirrou — sie ist das Produkt, das Mirrou fur sich selbst und seine Kunden baut.

---

\newpage

## 12. Anhang

### 12.1 Deliverable-Ubersicht

| Nr. | Deliverable | Primare Verantwortung | Format |
|-----|------------|----------------------|--------|
| 01 | Launch Proposal | Denys | PDF |
| 02 | ICP Research | Yahya | PDF |
| 03 | Messaging Guide | — | PDF |
| 04 | Creative Briefing | Olha | PDF |
| 05 | Pricing Strategy | Ralph | PDF |
| 06 | Growth Playbook | Denys | PDF |
| 07 | Compliance Framework | Ralph | PDF |
| 08 | Tech Architecture | Denys | PDF |
| 09 | Case Study Luminous Aura | Olha | PDF |
| 10 | Case Study Vitality Pulse | Olha | PDF |
| 11 | Agency Partner Program | Yahya | PDF |
| 12 | Investor Deck | Yahya | PDF |

### 12.2 Dokumentations-Ubersicht (Markdown Knowledge Base)

Das Mirrou Knowledge System umfasst 39 Markdown-Dokumente, organisiert in vier Perplexity Spaces:

**HQ Space (14 Dateien):** vision-mission, positioning, services, pricing, icp-personas, messaging-matrix, tone-of-voice, brand-assets, content-format-matrix, mirrou-branding-kit, team, studio-story, case-studies, partners-tools

**Strategy und Intelligence (11 Dateien):** market-overview, competitive-analysis, benchmark-library, trend-radar, platform-intelligence, agency-landscape, inbound-strategy, outreach-target-list, research-log, client-profile, decision-log

**Ops und Playbooks (7 Dateien):** sop-project-workflow, sop-retainer-management, sop-compliance-checklist, sop-tooling-workflows, onboarding, faq-internal, team-contributions

**PROJECT Space (6+ Dateien):** project-briefing, project-task-tracker, abschlussbericht-struktur, yahya-part-presentation, mirrou-launch-kampagnen-proposal, mirrou-aufgabenverteilung-master

### 12.3 Website-Architektur

**37 React-Komponenten:** Hero, Navigation, ContactForm, Footer, CaseLightbox, ServicesSection, BrandLogos, AILabel, CursorFollower, GrainOverlay, ParticleCanvas, Preloader, ScrollWordReveal, StatsCounter, und weitere

**16 Route-Dateien:** HomePage, StudioPage, PaketePage, CasesPage, TeamMemberPage, BlogIndex, BrandBookPage, TrustPage, KontaktPage, DatenschutzPage, ImpressumPage, PillarPage, ClusterPage, PressPage, NotFoundPage, CaseDetailPage

**8 Lokalisierungsdateien:** de.ts, en.ts, es.ts, fr.ts, it.ts, tr.ts, ru.ts, uk.ts

**Code-Splitting:** Alle Leaf-Pages werden per react-router `lazy` als eigene Chunks geladen; nur das aktive Sprachpaket wird ausgeliefert. Ergebnis: schlanker initialer Payload, jede Route ladt nur ihr eigenes JavaScript.

### 12.4 Logo-System

Funf primare SVG-Varianten:
- mirrou_01_primary_dark.svg
- mirrou_02_primary_light.svg
- mirrou_03_stacked_dark.svg
- mirrou_05_gold_bg.svg

### 12.5 Quellenverzeichnis

**Marktdaten:**
- Statista: Beauty und Personal Care Markt Deutschland 2025
- German Startup Monitor 2025
- Meta Business Benchmark Report 2025
- TikTok for Business DACH 2025/2026
- Branchenbenchmarks D2C Beauty und Health DACH

**Regulatorisch:**
- Verordnung (EU) 2024/1689 (EU AI Act)
- Datenschutz-Grundverordnung (DSGVO)
- EU Data Act (2023/2854)
- Health Claims Verordnung (HCVO)
- C2PA Standard (Coalition for Content Provenance and Authenticity)

**Technologie:**
- React 19 Dokumentation
- Vite 6 Dokumentation
- Google Cloud Run Dokumentation
- Tailwind CSS v4 Dokumentation
- Model Context Protocol (MCP) Spezifikation
- Perplexity Spaces Dokumentation

**Strategische Frameworks:**
- Simon Sinek: Golden Circle (Why-How-What)
- Value-Based Pricing Methodik
- ICP/Buyer Persona Framework
- 3-Arenen-Wettbewerbsmodell (eigene Entwicklung)

---

*Mirrou Creative Studio — Algorithm of Soul*
*Hamburg und Berlin · MMXXVI*
