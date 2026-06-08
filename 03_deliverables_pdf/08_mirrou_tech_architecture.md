# 08 mirrou tech architecture



MIRROU — Tech-Architektur & Systemlandschaft
Performance Creative Studio | Hamburg & Berlin
Dokument-Typ: Technische Architektur Version: 1.0 | Mai 2026 Anwendung: Infrastructure, Tool-
Stack, Datenflüsse, Security
1. System-Übersicht
1.1 High-Level-Architektur
┌─────────────────────────────────────────────────────────────┐
│ CLIENT LAYER │
│ [Website: Webflow] [Social: LinkedIn, Meta, TikTok] │
│ [E-Mail: HubSpot] [Booking: Calendly] │
└────────────────────┬────────────────────────────────────────┘
│
┌────────────────────▼────────────────────────────────────────┐
│ ORCHESTRATION LAYER │
│ [HubSpot CRM] [Notion PM] [Slack Comms] [Zapier] │
└────────────────────┬────────────────────────────────────────┘
│
┌────────────────────▼────────────────────────────────────────┐
│ CREATIVE LAYER │
│ [Figma Design] [Adobe CC] [Midjourney] [ComfyUI] │
│ [DaVinci Resolve] [Custom GPT] [Asset Manager] │
└────────────────────┬────────────────────────────────────────┘
│
┌────────────────────▼────────────────────────────────────────┐
│ DATA LAYER │
│ [Google Analytics 4] [Meta Pixel] [Looker Studio] │
│ [Ahrefs SEO] [HubSpot Reporting] │
└────────────────────┬────────────────────────────────────────┘
│
┌────────────────────▼────────────────────────────────────────┐
│ COMPLIANCE LAYER │
│ [Audit Trail DB] [AI Labeling Tool] [DVA Manager] │
│ [Document Vault] [Access Control] │
└─────────────────────────────────────────────────────────────┘
2. Tool-Stack Detail
2.1 W ebsite & CMS
Tool Zweck Kosten/Monat Alternative
W ebflow Website, CMS, Hosting 18 € Framer, WordPress
Figma Design-System,
Prototyping
0 € (Free) Sketch, Adobe XD

W ebflow-Konfiguration:
• CMS-Kollektionen: Blog, Case Studies, Team, Services
• E-Commerce: Nicht aktiv (keine direkten Verkäufe)
• Formulare: HubSpot-Integration für Lead-Capture
• SEO: Automatische Sitemap, Custom Meta-Tags, Schema-Markup
2.2 CRM & Marketing Automation
Tool Zweck Kosten/Monat Alternative
HubSpot (F ree) CRM, E-Mail-Marketing,
Forms, Sequenzen
0 € Salesforce, Pipedrive
Calendly (F ree) Terminbuchung,
Pre-Call-Briefing
0 € HubSpot Meetings,
SavvyCal
HubSpot-Setup:
• Kontakt-Eigenschaften: ICP-Tier, Lead-Quelle, Ad-Spend-Schätzung, EU AI Act-Status
• Pipeline-Stages: New Lead → Qualified → Call Booked → Proposal Sent → Negotiation → Closed
Won/Lost
• Sequenzen: Inbound (5 E-Mails, 14 Tage), Outbound (5 Touches, 12 Tage)
• Workflows: Lead-Scoring, automatische E-Mail-Zuordnung, Task-Erstellung
2.3 Projektmanagement & Kommunikation
Tool Zweck Kosten/Monat Alternative
Notion (F ree) PM, Wiki,
Dokumentation,
Reporting
0 € Asana, Monday
Slack (F ree) Team-Kommunikation,
Kunden-Channels
0 € Microsoft Teams, Discord
Notion-W orkspace-Struktur:
MIRROU Workspace
├──
 Operations
│ ├── Launch Dashboard
│ ├── Weekly Reviews
│ └── OKRs
├──
 Projects
│ ├── [Kunde A] — Projekt-Name
│ ├── [Kunde B] — Projekt-Name
│ └── Templates
├──
 Content
│ ├── Blog — Drafts & Published
│ ├── LinkedIn — Content-Kalender

│ └── Ad Copy — Variationen
├──
 Data
│ ├── Performance Dashboards
│ ├── A/B-Test-Results
│ └── Compliance Reports
└──
 Sales
├── Pipeline
├── Proposals
└── ICP-Research
2.4 Creative T ools
Tool Zweck Kosten/Monat Alternative
Adobe Creative Cloud Photoshop, Illustrator,
Premiere, After Effects
60 € Affinity Suite, DaVinci
Midjourney KI-Bildgenerierung,
Moodboards
30 € DALL-E 3, Stable
Diffusion
ComfyUI Lokale KI-Workflows,
Custom Pipelines
0 € (Self-Hosted) Automatic1111, InvokeAI
Custom GPT Copy-Generierung,
Hypothesen-Framework
20 € (API) Claude, Gemini
DaVinci Resolve Video-Editing, Color
Grading
0 € (Free) Premiere Pro, Final Cut
KI-W orkflow-Architektur:
Input: Briefing + Brand-Guidelines + Produkt-Fotos
↓
[Custom GPT] → Hook-Varianten, Copy-Optionen, Hypothesen
↓
[Midjourney] → Moodboard-Visuals, Konzept-Exploration
↓
[ComfyUI] → Hintergrund-Generierung, Style-Transfer, Enhancement
↓
[Adobe Photoshop] → Compositing, Retusche, Final Polish
↓
[Adobe Premiere / DaVinci] → Video-Schnitt, Motion Graphics
↓
[Figma] → Asset-Organisation, Format-Export, Design-System
↓
Output: Finale Assets (alle Formate) + AI-Usage-Report + Test-Matrix
2.5 Analytics & SEO
Tool Zweck Kosten/Monat Alternative
Google Analytics 4 Website-Tracking, Events,
Conversions
0 € Mixpanel, Amplitude

Table 5 – continued
Tool Zweck Kosten/Monat Alternative
Meta Pixel + CAPI Ads-Tracking,
Conversions API
0 € —
Looker Studio Dashboards, Reporting,
Visualisierung
0 € Tableau, Power BI
Ahrefs (Lite) SEO, Keyword-Recherche,
Backlink-Analyse
99 € SEMrush, Moz
LinkedIn Insight T ag LinkedIn-Ads-Tracking 0 € —
T racking-Setup:
Event Trigger Ziel Tool
page_view Jeder Seitenaufruf Traffic-Analyse GA4
mission_deck_download Klick auf
Download-Button
Lead-Generierung GA4 + HubSpot
calendly_booking Buchung bestätigt Conversion GA4 + Calendly
contact_form_submit Formular abgesendet Lead-Generierung GA4 + HubSpot
scroll_50% 50% Seite gescrollt Engagement GA4
video_play Video gestartet Engagement GA4
time_on_page_60s 60 Sekunden auf Seite Engagement GA4
2.6 Compliance & Security
Tool Zweck Kosten/Monat Alternative
Internes
Audit-T rail-System
Dokumentation,
Versionierung,
Audit-Readiness
0 € (Notion/DB) Custom Build
1Password (F ree) Passwort-Management,
Team-Sharing
0 € Bitwarden, LastPass
Cloudflare (F ree) CDN, DDoS-Schutz, SSL 0 € Fastly, A WS CloudFront
3. Datenflüsse & Integrationen
3.1 Lead-to-Customer-Flow
[Website-Besucher]
↓ GA4 Event: page_view
[HubSpot Tracking]
↓ Formular-Submit oder Mission Deck Download
[HubSpot Contact Created]
↓ Workflow: Lead-Scoring + E-Mail-Sequenz
[HubSpot Sequence: Inbound]
↓ E-Mail 1 –5 (14 Tage)

[Calendly Booking]
↓ HubSpot Deal Created
[Strategy Call]
↓ HubSpot Deal Stage: Call Booked → Proposal Sent
[Proposal Accepted]
↓ HubSpot Deal Stage: Closed Won
[Notion Project Created]
↓ Slack Channel Created
[Creative Production Starts]
3.2 Creative Production Flow
[Notion: Project Briefing]
↓
[Custom GPT: Hook-Generierung]
↓
[Midjourney: Moodboard]
↓
[Client Approval: Moodboard]
↓
[Shooting: RAW-Material]
↓
[ComfyUI: KI-Enhancement]
↓
[Adobe CC: Post-Produktion]
↓
[Figma: Asset-Finalisierung]
↓
[AI-Labeling & Compliance-Check]
↓
[Client Delivery: ZIP + Report]
↓
[HubSpot: Project Closed]
↓
[Notion: Case Study Template]
3.3 Reporting Flow
[GA4 + Meta Ads + LinkedIn Ads]
↓
[Looker Studio: Data Sources]
↓
[Looker Studio: Dashboards]
├── Marketing Dashboard (Traffic, Leads, Conversions)
├── Sales Dashboard (Pipeline, Calls, Proposals, Closes)
├── Creative Dashboard (Assets Produced, A/B-Tests, Performance)
└── Compliance Dashboard (AI-Usage, Labeling, Audits)
↓
[Notion: Weekly Review]
↓

[Slack: Automated Reports]
4. Security & Datenschutz
4.1 Datenschutz-Grundsätze
Prinzip Umsetzung
Datenminimierung Nur notwendige Daten erheben und verarbeiten
Zweckbindung Daten nur für definierte Zwecke nutzen
Transparenz Klare Information über Datenverarbeitung
Sicherheit Verschlüsselung, Zugriffskontrolle, Backups
Löschung Automatische Löschung nach Vertragsende
4.2 T echnische Maßnahmen
Maßnahme Implementierung
SSL/TLS Cloudflare SSL (TLS 1.3) für alle Domains
Zugriffskontrolle Rollenbasierte Zugriffsrechte (RBAC) in allen Tools
Passwort-Politik 1Password, 2F A für alle kritischen Accounts
Backups Tägliche Backups (Webflow, Notion, HubSpot)
Verschlüsselung AES-256 für ruhende Daten, TLS für
Datenübertragung
4.3 Incident Response
Level Vorfall Reaktion Verantwortlich
1 Verdacht auf Datenleck Sofortige Untersuchung,
Isolierung
Tech Lead
2 Bestätigter Datenleck Benachrichtigung
Betroffener, DSB,
Kunden
Compliance Officer
3 Grober Datenleck Externe Forensik,
PR-Management,
Rechtsberatung
CEO
5. Skalierungs-Roadmap
5.1 Phase 1: Launch (Monat 1–3)
• T ools: Free-Tiers wo möglich, manuelle Prozesse
• Kosten: ~216 €/Monat
• F okus: Stabilität, Lernen, Prozess-Optimierung

5.2 Phase 2: W achstum (Monat 4–12)
• Upgrades: HubSpot Starter (45 €/Monat), Notion Team (8 €/User/Monat)
• Neue T ools: Zapier (20 €/ Monat) für Automatisierung, Loom (8 €/ Monat) für Video-
Kommunikation
• Kosten: ~400 €/Monat
• F okus: Automatisierung, Effizienz, Team-Wachstum
5.3 Phase 3: Skalierung (Jahr 2+)
• Upgrades: HubSpot Professional (800 €/Monat), Ahrefs Standard (199 €/Monat)
• Neue T ools: Custom CRM-Integration, AI-Pipeline-Optimierung, SaaS-Plattform (MVP)
• Kosten: ~2.000 €/Monat
• F okus: Produktisierung, Enterprise-Features, Internationalisierung
6. Disaster Recovery
6.1 Backup-Strategie
System Frequenz Methode Wiederherstellungszeit
Webflow Täglich Automatisch
(Webflow-Backup)
1 Stunde
Notion Wöchentlich Manuelles Export
(HTML/Markdown)
4 Stunden
HubSpot Täglich Automatisch
(HubSpot-Backup)
2 Stunden
Creative Assets Nach jedem Projekt Cloud-Speicher (Google
Drive) + Lokal
1 Stunde
6.2 Business Continuity
Szenario Maßnahme Verantwortlich
Tool-Ausfall (z. B. HubSpot) Manuelle E-Mail-Kommunikation,
Excel-Tracking
Operations
KI-Tool-Ausfall (z. B.
Midjourney)
Fallback zu lokalem ComfyUI/
Stable Diffusion
KI-Operator
Internet-Ausfall Mobile Hotspot, lokale Arbeit,
spätere Synchronisation
Alle
Team-Mitglied krank Dokumentierte Prozesse,
Cross-Training
Team Lead
Dokumenten-Status:
 Final Nächste Review: Monatlich oder bei Tool-Änderungen V erant-
wortlich: Tech Lead & Operations Manager
