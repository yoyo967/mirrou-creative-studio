# Mirrou Growth Playbook



1
MIRROU
MIRROU
Autonomous Growth
System
AI-Gestuetztes Growth Playbook -- Ergaenzungsmodule
Phase 2 / System Architecture
Mai 2026 / Version 1.0



2
MIRROU
01
AI-Rollen & Agenten-Spezifikation
Definition der autonomen Agenten, ihrer Datenfluesse und Interaktionslogik im Growth-System.
Agenten-Uebersicht
Rolle
Zweck / Scope
Inputfelder
Outputfelder
Frequenz
Hook-Generator
Erstellung von 5-10
Ad-Hooks pro Kampagne
auf Basis von
Audience-Insights,
Wettbewerbsanalyse und
Plattform-Trends.
Zielgruppen-Segmente,
Pain Points,
Wettbewerber-Hooks,
Plattform,
Kampagnenziel,
Tonality
Hook-Varianten (A-E),
Bewertung Relevance/I
ntrigue/Clarity (1-5),
Empfohlene Top-2 fuer
A/B-Test
Pro neue
Kampagne oder
alle 7 Tage bei
laufenden
Kampagnen
Creative Variant
Generator
Produktion von
Creative-Briefings und
Varianten-Vorschlaege
(Static, Video, Carousel)
inkl.
Format-Spezifikationen.
Hook-Set, Brand-Assets,
Plattform-Constraints,
Performance-Daten der
letzten 30 Tage
Creative-Briefings (3-5
Varianten),
Asset-Checkliste,
Test-Matrix, Forecast
CTR/CVR
Pro Kampagne
oder woechentlich
bei
Creative-Fatigue
Audience &
Targeting Advisor
Empfehlung von
Lookalike-Audiences,
Interessen-Clustering, Cust
om-Audience-Strategien
und Exclusion-Logik.
CRM-Daten,
Pixel-Daten, bestehende
Campaign-Audiences,
Conversion-Daten nach
Segment
Empfohlene Audiences
(Top 3 pro Funnelstufe),
Interessen-Bundles,
Exclusion-Listen,
Budget-Split
Monatlich
(Strategie) +
taeglich
(Optimierung)
Budget & Bid
Advisor
Dynamische
Budget-Allokation und Bid-
Strategie-Empfehlungen
basierend auf
Echtzeit-Performance.
Tagesbudget, aktuelle
CPA/ROAS,
Conversion-Volume,
Seasonality, LTV-Daten
Budget-Shifts (+/-X%),
Bid-Strategie,
Pacing-Warnungen,
Forecast 7/14/30 Tage
Taeglich (6 Uhr) +
Ad-hoc bei
CPA-Deviation >
20%
Reporting-Agent
Automatisierte
Performance-Berichte,
Anomalie-Erkennung,
Narrative-Generierung fuer
Stakeholder.
Rohdaten aus
Ad-Manager, Analytics,
CRM; definierte
KPI-Schwellen;
historische Benchmarks
Taeglicher Flash-Report,
Woech. Deep-Dive,
Anomalie-Alerts,
Exekutiv-Summary
Taeglich (Flash),
Woech.
(Deep-Dive),
Echtzeit (Alerts)
Experimentation
Orchestrator
Planung, Dokumentation
und Auswertung von
A/B-Tests; Priorisierung
nach ICE-Score.
Experiment-Ideen-Backl
og, historische
Test-Ergebnisse,
Traffic-Volumen,
statistische Power
Priorisierte
Test-Roadmap (ICE),
Test-Design,
Post-Test-Analyse
(Winner, Lift %,
Confidence)
Woech. (Roadmap)
+ Pro Test (Design +
Auswertung)
Copy &
Messaging
Refiner
Iterative Optimierung von
Ad-Copy,
Landing-Page-Texten und
E-Mail-Sequenzen.
Aktuelle
Copy-Varianten,
CTR/CVR,
Heatmap-Daten,
qualitative Feedback
Optimierte
Copy-Versionen,
Messaging-Scorecard,
Empfohlene
Test-Prioritaet
Woech. oder bei
Creative-Fatigue



3
MIRROU
Tabelle 1.1 -- Agenten-Spezifikation mit Scope, Datenfluessen und Ausfuehrungsrhythmus



4
MIRROU
Agenten-Interaktions-Modell
Die Agenten kommunizieren ueber definierte Output-Input-Schnittstellen. Der Reporting-Agent
aggregiert alle Datenstroeme und triggert Rueckkopplungsschleifen.
Datenfluss
Beschreibung
Trigger
Hook-Generator --> Creative Variant
Generator
Hooks werden als Briefing-Input fuer die
Creative-Produktion uebergeben. Der Generator
erstellt passende Visuals.
Neue Kampagne oder
Fatigue-Erkennung
Creative Variant Generator -->
Experimentation Orchestrator
Creative-Briefings werden in Test-Designs
ueberfuehrt. Der Orchestrator berechnet Sample
Size und Dauer.
Creative-Briefing abgeschlossen
Budget & Bid Advisor <-> Audience &
Targeting Advisor
Bid-Strategien werden an Audience-Effizienz
gekoppelt. Unterperformende Audiences erhalten
Budget-Kuerzungen.
Taeglich 6 Uhr + Ad-hoc
Reporting-Agent --> Alle Agenten
Anomalie-Erkennung triggert spezifische Agenten:
CPA-Spike --> Budget-Advisor + Hook-Generator.
Echtzeit bei Anomalie
Experimentation Orchestrator -->
Copy & Messaging Refiner
Gewinnende Messaging-Elemente aus Tests fliessen
in die Copy-Optimierung ein.
Post-Test-Analyse abgeschlossen
Tabelle 1.2 -- Agenten-Interaktions-Modell und Trigger-Logik



5
MIRROU
02
KPI-Framework & Dashboard-Blueprint
Core-KPIs pro Funnelstufe und Kanal sowie das technische Briefing fuer das Analytics-/BI-Team.
Core-KPIs pro Funnelstufe
Awareness (Top of Funnel)
KPI
Definition
Zielwert (Q2)
Datenquelle
CPM
Medienkosten pro 1.000
Sichtkontakte
< 8 Euro (Meta), < 5 Euro
(TikTok)
Ad-Manager
Video ThruPlay Rate
% Nutzer, die Video zu 100%
gesehen haben
> 25%
Ad-Manager
Brand Search Lift
% Steigerung organischer
Brand-Suchanfragen
+15% MoM
Google Search
Console
Share of Voice
Erwaehnungen vs. Wettbewerber
Top 3 in der Kategorie
Brandwatch /
Mention
Consideration (Middle of Funnel)
KPI
Definition
Zielwert (Q2)
Datenquelle
CTR (Link)
Klickrate auf die Landing Page
> 1,5% (Meta), > 1,0%
(TikTok)
Ad-Manager
CPC (Link)
Kosten pro Landing-Page-Klick
< 1,20 Euro
Ad-Manager
LP Conversion Rate
% LP-Besucher mit Micro-Conversion
> 8%
Google Analytics 4
Cost per Lead (CPL)
Kosten pro qualifiziertem Lead
< 15 Euro
CRM +
Ad-Manager
Engagement Rate
Interaktionen pro Impression
> 2%
Ad-Manager



6
MIRROU
Conversion (Bottom of Funnel)
KPI
Definition
Zielwert (Q2)
Datenquelle
CPA
Kosten pro erstem Kauf /
Subscription
< 45 Euro
Ad-Manager +
CRM
ROAS
Umsatz / Medienkosten
> 3,0x
Ad-Manager +
Shopify/Stripe
Conversion Rate
(Purchase)
% LP-Besucher, die kaufen
> 3%
Google Analytics 4
AOV
Durchschnittlicher Bestellwert
> 85 Euro
Shopify/Stripe
Checkout-Abbruch-Ra
te
% Nutzer, die Checkout beginnen,
aber nicht abschliessen
< 60%
Google Analytics 4
Retention & LTV
KPI
Definition
Zielwert (Q2)
Datenquelle
LTV:CAC Ratio
Lifetime Value / Customer
Acquisition Cost
> 3:1
CRM + Finance
Monthly Churn Rate
% Kunden, die im Monat kuendigen
< 8%
CRM/Subscription
-Tool
NPS
Net Promoter Score
> 40
Typeform
Repeat Purchase Rate
% Kunden mit zweitem Kauf
innerhalb 90 Tage
> 30%
CRM/Shopify
Tabelle 2.1 -- Core-KPIs nach Funnelstufe mit Zielwerten und Datenquellen



7
MIRROU
Dashboard-Blueprint
Briefing fuer das Analytics-/BI-Team zur Entwicklung des Mirrou Growth Command Center.
Parameter
Spezifikation
Plattform
Looker Studio (empfohlen fuer Ad-Manager-Integration) oder Tableau / Power BI
Refresh-Rate
Echtzeit fuer Ad-Manager-Daten; Taeglich 6:00 Uhr fuer CRM/Finance-Daten
Zugriffsebenen
Growth Team (Vollzugriff), C-Level (Exekutiv-View), AI-Agents (API-Zugriff auf
Rohdaten)
Datenquellen
Meta Ads Manager, TikTok Ads Manager, Google Ads, Google Analytics 4,
Shopify/Stripe, CRM, Typeform
Sheet-Architektur
Sheet
Zielgruppe
Key Elements
Update
Executive Summary
C-Level
ROAS-Wasserfall, CAC-Trend,
LTV:CAC-Scorecard, Experiment-Status
Taeglich /
Woech.
Funnel Performance
Growth Team
Funnel-Conversion-Rates, CPA-Heatmap,
Budget-Pacing, Creative Fatigue Index
Taeglich
AI-Agent Feed
AI-Agents (API)
Anomalie-Stream, Creative-Ranking,
Audience-Efficiency, Experiment-Queue
Echtzeit
Channel Deep-Dive
Channel Manager
Meta/TikTok/Google/Organic Breakdown
mit Kampagnen-, Ad-Set- und Ad-Ebene
Taeglich
Tabelle 2.2 -- Dashboard-Sheet-Architektur mit Zielgruppen und Update-Rhythmus



8
MIRROU
AI-Agenten: Daten-Lese- & Interpretations-Logik
Agent
Lesezugriff
Interpretations-Logik
Trigger-Aktion
Hook-Generator
CTR-Ranking,
Engagement-Rate,
Creative-Fatigue-Index
Wenn CTR < 1% und
Fatigue-Index > 0,7 --> Neue
Hooks generieren
Automatischer Prompt an
Agent
Creative Variant
Generator
Creative-Performance-R
anking, Funnel-Conversi
on-Rates
Wenn Bottom-10-Creative > 3
Tage --> Neue Varianten briefen
Automatischer Prompt an
Agent
Budget & Bid
Advisor
Budget-Pacing,
CPA-Heatmap,
ROAS-Wasserfall
Wenn CPA > Ziel + 20% oder
ROAS < 2,5x --> Budget-Shift oder
Bid-Anpassung
Automatische
Empfehlung +
Approval-Request
Reporting-Agent
Alle Sheets
Wenn Anomalie-Stream > 0
Eintraege --> Flash-Report
generieren
Automatischer Report an
Growth-Lead
Experimentation
Orchestrator
Experiment-Queue,
Funnel-Performance
Wenn Traffic-Volumen >
Threshold --> Naechsten Test in
Queue aktivieren
Automatische
Test-Freigabe
Tabelle 2.3 -- AI-Agenten Daten-Lese-Logik und automatische Trigger-Aktionen



9
MIRROU
03
Standard-Workflows (AI-gestützt)
Detaillierte Prozessdefinitionen mit Trigger, Inputs, Schritten, Output und If-this-then-that-Logik.
Workflow 1: Ad Hook Generation Pipeline
Trigger: Neue Kampagne startet ODER Creative-Fatigue-Index > 0,7 bei laufender Kampagne
Sch
ritt
Agent
Aktion
Dauer
1
Hook-Generator
Analyse der Inputs, Generierung von 8–10 Hook-Varianten
10 Min.
2
Hook-Generator
Selbst-Bewertung nach Relevance / Intrigue / Clarity (1–5)
2 Min.
3
Experimentation
Orchestrator
Auswahl der Top-3-Hooks für A/B/n-Test, Berechnung der
Sample Size
5 Min.
4
Creative Variant
Generator
Briefing der Top-3-Hooks für Creative-Produktion
15 Min.
5
Growth-Lead
Approval der Test-Matrix und Creative-Briefings
30 Min.
Output:
3 Hook-Varianten (A/B/C) mit Creative-Briefings; Test-Design (Hypothese, Dauer, Sample Size,
Success Metric); Forecast: Erwartete CTR-Steigerung basierend auf historischen Daten
If-this-then-that-Logik:
  WENN Hook-Variante A CTR > 2% und CPA < Ziel   DANN Scale auf 70% des Budgets, Varianten B+C
auf 15% each
  WENN alle Varianten CTR < 1% nach 3 Tagen   DANN Trigger: Hook-Generator neu starten mit
veränderten Inputs (z. B. andere Pain Points)



10
MIRROU
Workflow 2: Creative Variant Test & Auswertung
Trigger: Neue Creative-Varianten sind live ODER wöchentlicher Review (Freitag, 10 Uhr)
Sch
ritt
Agent
Aktion
Dauer
1
Reporting-Agent
Daten-Abgleich: Aktuelle Performance vs. Benchmark
5 Min.
2
Reporting-Agent
Anomalie-Erkennung: Abweichung > 20% vom
Erwartungswert
2 Min.
3
Experimentation
Orchestrator
Statistische Signifikanz-Prüfung (Confidence Level > 95%)
10 Min.
4
Experimentation
Orchestrator
Winner-Ermittlung: Beste Variante nach ROAS +
Conversion-Volume
5 Min.
5
Budget & Bid Advisor
Budget-Reallokation: Scale Winner, Pause Loser
5 Min.
6
Creative Variant
Generator
Briefing für nächste Iteration (Winner-Elemente
extrahieren)
10 Min.
Output:
Test-Auswertung (Winner, Lift %, Confidence Level, Insights); Budget-Neuzuweisung;
Creative-Briefing für nächste Iteration
If-this-then-that-Logik:
  WENN Variante A ROAS > 4x und Conversion-Volume > 50/Woche   DANN Scale Budget um +50%,
produziere 3 neue Varianten basierend auf Winner-Elementen
  WENN keine statistische Signifikanz nach 7 Tagen   DANN Verlängere Test um 3 Tage ODER erhöhe
Budget um +30%
  WENN alle Varianten ROAS < 2x   DANN Trigger: Hook-Generator + Audience & Targeting Advisor
(neue Hypothesen)



11
MIRROU
Workflow 3: Daily Budget & Bid Suggestions
Trigger: Täglich, 6:00 Uhr (vor Arbeitsbeginn) + Ad-hoc bei CPA-Deviation > 20%
Sch
ritt
Agent
Aktion
Dauer
1
Reporting-Agent
Daten-Aggregation: Performance der letzten 24 h
5 Min.
2
Budget & Bid Advisor
Forecasting: Erwartete CPA/ROAS für heute basierend auf
historischen Mustern
5 Min.
3
Budget & Bid Advisor
Anomalie-Check: CPA-Deviation > 20% oder ROAS < 2,5x
2 Min.
4
Budget & Bid Advisor
Budget-Shift-Vorschlag: Von Underperformer zu
Overperformer
5 Min.
5
Budget & Bid Advisor
Bid-Strategie-Empfehlung: CPC/CPM/CPA/ROAS-Bidding
3 Min.
6
Growth-Lead
Approval der Vorschläge (One-Click im Dashboard)
2 Min.
Output:
Täglicher Budget-Plan (pro Kampagne/Ad Set); Bid-Strategie-Empfehlung; Pacing-Warnung;
Forecast für 7/14/30 Tage
If-this-then-that-Logik:
  WENN CPA > Ziel + 20% für 2 aufeinanderfolgende Tage   DANN Reduziere Budget um –25%, weise
Budget dem besten Performer zu, trigger Hook-Generator
  WENN ROAS > 4x und Pacing < 70% um 14 Uhr   DANN Erhöhe Budget um +30%, wechsle
Bid-Strategie auf „Highest Value“
  WENN Wochenende ansteht und historische Daten zeigen CPA +15% am Samstag   DANN Reduziere
Samstags-Budget um –15%, erhöhe Montag um +20%



12
MIRROU
Workflow 4: Weekly Performance Review
Trigger: Jeden Freitag, 9:00 Uhr (automatisch) + manueller Trigger bei kritischen Anomalien
Sch
ritt
Agent
Aktion
Dauer
1
Reporting-Agent
Wochenbericht-Generierung: Alle Core-KPIs, Trends,
Abweichungen
10 Min.
2
Reporting-Agent
Narrative-Generierung: „Was ist passiert, warum, was
bedeutet das?“
5 Min.
3
Experimentation
Orchestrator
Test-Review: Abgeschlossene Tests, Winner, Insights,
Next-Up
10 Min.
4
Budget & Bid Advisor
Wochen-Forecast: Budget-Bedarf für kommende Woche
basierend auf ROAS-Ziel
5 Min.
5
Hook-Generator +
Creative Variant
Generator
Content-Pipeline-Review: Welche Hooks/Creatives werden
nächste Woche getestet?
10 Min.
6
Growth-Lead
Review-Meeting: 30 Min. Diskussion der Ergebnisse,
Approval der nächsten Woche
30 Min.
Output:
Wöchentlicher Deep-Dive-Report (PDF/Notion); Experiment-Roadmap-Update; Budget-Plan für
Woche n+1; Content-Kalender für kommende Woche
If-this-then-that-Logik:
  WENN Wochen-ROAS < 2,5x für 2 Wochen in Folge   DANN Eskalation an C-Level, Trigger:
Strategie-Workshop
  WENN 3 Tests in Folge ohne statistischen Winner   DANN Review der Test-Hypothesen, Empfehlung:
Größere Variationen testen
  WENN Budget-Auslastung < 80% bei ROAS > 3,5x   DANN Empfehlung: Budget für kommende Woche
um +20% erhöhen



13
MIRROU
Workflow 5: Audience & Targeting Optimization
Trigger: Monatlich (Strategie-Review) + Ad-hoc bei CPA-Deviation > 30% bei bestimmter Audience
Sch
ritt
Agent
Aktion
Dauer
1
Audience & Targeting
Advisor
Daten-Analyse: Top-Performing Audiences (nach ROAS +
LTV)
10 Min.
2
Audience & Targeting
Advisor
Lookalike-Empfehlung: Seed-Audiences für 1%, 3%, 5%
Lookalikes
5 Min.
3
Audience & Targeting
Advisor
Interessen-Clustering: Neue Interessen-Bundles basierend
auf Convertern
5 Min.
4
Experimentation
Orchestrator
Test-Design: A/B-Test für neue Audiences vs. bestehende
Top-Performer
5 Min.
5
Budget & Bid Advisor
Budget-Allokation: Wie viel Budget für neue Audiences vs.
bestehende?
5 Min.
Output:
Audience-Strategie für kommenden Monat; Lookalike- und Interessen-Empfehlungen; Test-Plan für
neue Audiences; Budget-Split-Vorschlag
If-this-then-that-Logik:
  WENN Lookalike-Audience (1%) CPA < Ziel – 20%   DANN Erhöhe Budget um +40%, teste Lookalike 3%
als Scale-Option
  WENN Interessen-Audience CPA > Ziel + 30% für 5 Tage   DANN Pausiere Audience, analysiere
Interessen-Overlap
  WENN Custom-Audience (Website-Besucher 30 Tage) Conversion-Rate < 2%   DANN Review
Landing-Page, trigger Copy & Messaging Refiner



14
MIRROU
04
Growth-Playbook-Gliederung
Inhaltsverzeichnis für das vollständige „Mirrou Growth Playbook“ als Notion-Datenbank oder
Präsentations-Deck.
1. Strategic Foundation
  1.1 Growth Vision & North Star Metric — Definition des übergeordneten Wachstumsziels und der
primären Erfolgskennzahl
  1.2 Target Audience Architecture — Segmente, Personas, Pain Points und Jobs-to-be-Done
  1.3 Competitive Positioning — Wettbewerbsanalyse, Differenzierung und Messaging-Pillars
2. Marketing-Mix & Channel Strategy
  2.1 Channel Portfolio — Meta Ads, TikTok Ads, Google Ads, Organic/Content, E-Mail mit Zielsetzung
und Budget-Split
  2.2 Channel-Specific Playbooks — Taktiken, Best Practices und Plattform-Constraints pro Kanal
3. Funnel Architecture
  3.1 Funnel Stages & Definitions — Awareness, Consideration, Conversion, Retention mit
Entry/Exit-Kriterien
  3.2 Funnel Metrics & Benchmarks — Core-KPIs pro Stufe, Zielwerte und Tracking-Setup
  3.3 Funnel Optimization Tactics — CRO-Prinzipien, Landing-Page-Frameworks, Checkout-Optimierung
4. AI-Agent System
  4.1 Agent Roles & Specifications — 7 AI-Rollen: Scope, Inputs, Outputs, Frequenz
  4.2 Agent Interaction Model — Datenflüsse, Trigger-Logik und Eskalationspfade
  4.3 Agent Governance — Approval-Workflows, menschliche Override-Regeln und Qualitätskontrolle
5. KPI Framework & Analytics



15
MIRROU
  5.1 Core KPIs by Funnel Stage — Vollständige KPI-Matrix
  5.2 Dashboard Blueprint — Command Center-Spezifikation, Chart-Definitionen, Refresh-Logik
  5.3 AI-Readable Data Layer — API-Spezifikationen, Datenformate und Agent-Zugriffsrechte
6. Experimentation Engine
  6.1 Experimentation Framework — Hypothesen-Struktur, Test-Typen, statistische Standards
  6.2 ICE Prioritization — Ideen-Backlog, Scoring-Modell und Roadmap-Management
  6.3 Post-Test Analysis — Winner-Ermittlung, Lift-Berechnung, Insight-Dokumentation
7. Standard Workflows
  7.1 Ad Hook Generation Pipeline — Trigger, Inputs, Schritte, Output, If-this-then-that-Logik
  7.2 Creative Variant Test & Evaluation — Test-Design, Auswertung, Scale/Pause-Entscheidungen
  7.3 Daily Budget & Bid Optimization — Tägl. Workflow, Forecasting, Anomalie-Handling
  7.4 Weekly Performance Review — Wochenbericht, Experiment-Review, Content-Pipeline-Planung
  7.5 Audience & Targeting Optimization — Monatlicher Strategie-Review, Lookalike-Tests
8. Budget & Financial Planning
  8.1 Test Budget Allocation — 12.500 € Testbudget: Verteilung, Pacing, Contingency
  8.2 Scaling Framework — Regeln für Budget-Erhöhung bei positivem ROAS, Risk-Management
  8.3 Financial Forecasting — 3-Monats-Plan, Szenario-Analyse (Best/Base/Worst Case)
9. Content & Creative Operations
  9.1 Creative Production Workflow — Von Briefing über Produktion bis Approval
  9.2 Asset Library & Governance — Brand-Assets, Templates, Versionierung, Archivierung
  9.3 Creative Fatigue Management — Erkennung, Reaktion, Refresh-Zyklen
10. Retention & LTV Growth
  10.1 Onboarding & Activation — First-Experience-Optimierung, Time-to-Value-Reduktion
  10.2 Engagement & Churn Prevention — E-Mail-Automatisierung, In-App-Engagement, Win-Back
  10.3 Referral & Advocacy — Empfehlungsprogramm, Affiliate-Strategie, Social-Proof-System
11. Governance & Operations



16
MIRROU
  11.1 Growth Team Structure — Rollen, Verantwortlichkeiten, RACI-Matrix
  11.2 Meeting Cadence — Daily Standup, Weekly Review, Monthly Strategy, Quarterly Planning
  11.3 Tool Stack — Ad-Manager, Analytics, CRM, AI-Tools, BI-Dashboard, Project Management
12. Appendices
  12.1 Glossary — Definitionen aller Fachbegriffe, KPIs und Agenten-Terminologie
  12.2 Templates & Checklists — Creative Brief, Test-Design-Dokument, Wochenbericht-Template
  12.3 Troubleshooting Guide — Häufige Probleme und Lösungsschritte



17
MIRROU
APPENDIX
Zusammenfassung & Nächste Schritte
Überblick der vier Module
Dieses Dokument ergänzt das bestehende Mirrou Growth-Dokument um vier kritische Bausteine für
ein vollständiges, AI-gestütztes Growth-Playbook:
Modul
Schlüssel-Ergebnis
Status
01 AI-Rollen & Agenten
7 autonome Agenten mit definierten Scopes, Datenflüssen
und Interaktionsmodell
Spezifiziert
02 KPI-Framework
Core-KPIs pro Funnelstufe und Kanal; Dashboard-Blueprint
mit 4 Sheets; AI-Lese-Logik
Spezifiziert
03 Standard-Workflows
5 AI-gestützte Workflows mit Trigger, Inputs, Schritten,
Output und If-this-then-that-Logik
Spezifiziert
04 Playbook-Gliederung
12 Kapitel mit 32 Unterpunkten als Inhaltsverzeichnis für
Notion oder Deck
Spezifiziert
Empfohlene Implementierungsreihenfolge
01 1. Dashboard-Blueprint (Modul 2) als technisches Fundament implementieren
02 2. AI-Agenten (Modul 1) in iterativen Sprints aufsetzen: Start mit Reporting-Agent + Budget & Bid
Advisor
03 3. Standard-Workflows (Modul 3) parallel zu Agenten-Entwicklung etablieren
04 4. Playbook-Gliederung (Modul 4) in Notion oder als interaktives Deck umsetzen
05 5. Testbudget von 12.500 € für erste Experimente freigeben
Dokument erstellt am 13. Mai 2026. Version 1.0 — Ergänzungsmodul zum bestehenden Mirrou Growth-Dokument.
 MIRROU AUTONOMOUS GROWTH SYSTEM
