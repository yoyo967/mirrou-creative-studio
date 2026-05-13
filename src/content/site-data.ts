/**
 * Single source of truth für die Apex / Pillar / Cluster - Architektur.
 * Jeder Cluster trägt einen Pillar-Slug — Routing, Auflistungen, Sitemap und
 * SEO-Schema werden daraus deterministisch erzeugt.
 */

export const PILLAR_SLUGS = [
  "performance-creative",
  "creative-engine",
  "beauty-ecommerce-marketing",
  "foto-ki-hybrid",
] as const;

export type PillarSlug = (typeof PILLAR_SLUGS)[number];

export interface Pillar {
  slug: PillarSlug;
  title: string;
  shortLabel: string;
  tagline: string;
  description: string;
  order: number;
  heroImage?: string;
  keywords: string[];
}

export interface ClusterFAQ {
  q: string;
  a: string;
}

export interface Cluster {
  slug: string;
  title: string;
  description: string;
  pillar: PillarSlug;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes?: number;
  status: "published" | "stub";
  /** Optionaler TL;DR-Block für AEO/GEO (1–2 Sätze, klare Antwort). Fallback: description */
  tldr?: string;
  /** Optionale FAQ pro Cluster, wird als FAQPage-Schema und sichtbarer <dl>-Block gerendert */
  faq?: ClusterFAQ[];
}

export const PILLARS: Pillar[] = [
  {
    slug: "performance-creative",
    title: "Performance Creative für D2C-Brands",
    shortLabel: "Performance Creative",
    tagline: "Der größte Hebel im Paid Social",
    description:
      "Performance Creative ist die Disziplin, Bildwelten so zu produzieren, dass sie messbar Aufmerksamkeit gewinnen, Klicks auslösen und ROAS steigern. Hier erfährst du, wie der Hebel funktioniert — und wie du ihn für deine Beauty-, Health- oder Lifestyle-Brand nutzt.",
    order: 1,
    heroImage: "/images/apex-header-performance-creative-marketing.png",
    keywords: ["performance creative", "paid social creatives", "creative fatigue", "d2c marketing", "meta ads creative"],
  },
  {
    slug: "creative-engine",
    title: "Die Creative Engine",
    shortLabel: "Creative Engine",
    tagline: "Unser Operating System für Performance Creatives",
    description:
      "Die Creative Engine ist unser Operating System: ein Loop aus Analyse, Hypothesen, Produktion, Testing und Learning, der Creative-Output systematisch macht. Hier erklären wir jeden der fünf Schritte — und wie sie zusammen messbare Wirkung erzeugen.",
    order: 2,
    heroImage: "/images/pillar-3-header-creative-testing-analytics.png",
    keywords: ["creative operating system", "creative engine", "ab testing creatives", "creative hypothesen", "learning log"],
  },
  {
    slug: "beauty-ecommerce-marketing",
    title: "Beauty, Health & Lifestyle E-Commerce",
    shortLabel: "Beauty E-Commerce",
    tagline: "Die Nische, in der wir tief sitzen",
    description:
      "D2C-Marken in Beauty, Health und Lifestyle spielen ein anderes Spiel als generische E-Commerce-Brands. Wir haben uns auf diese Nische spezialisiert, weil sie eigene Sprache, eigene Compliance-Anforderungen und eigene Visualkultur hat.",
    order: 3,
    heroImage: "/images/pillar-2-header-paid-social-advertising.png",
    keywords: ["d2c beauty marketing", "beauty performance marketing", "skincare paid social", "health brand werbung", "lifestyle ecommerce"],
  },
  {
    slug: "foto-ki-hybrid",
    title: "Foto + KI: Hybrid Production",
    shortLabel: "Foto + KI Hybrid",
    tagline: "Warum die Mischung schlägt — nicht die Reinheit",
    description:
      "Pure KI-Visuals wirken austauschbar. Pure Fotografie ist langsam. Wir arbeiten hybrid: echte Produkte und Menschen vor der Linse, KI für Hintergründe, Stimmungen und Variationen. Hier erklären wir, warum dieser Mix in Performance-Kampagnen funktioniert — EU-AI-Act-konform produziert.",
    order: 4,
    heroImage: "/images/pillar-1-header-ad-creative-production.png",
    keywords: ["ki hintergründe ads", "midjourney werbung", "eu ai act marketing", "hybrid photography", "performance creative production"],
  },
];

export const CLUSTERS: Cluster[] = [
  // PILLAR 1 — Performance Creative
  {
    slug: "hooks-die-funktionieren",
    title: "Hooks, die in Beauty-Ads funktionieren",
    description:
      "Die ersten 1,5 Sekunden entscheiden. Sieben Hook-Muster, die in unseren Tests in Beauty/Health/Lifestyle wiederholt überdurchschnittlich performen — und drei, die du vermeiden solltest.",
    pillar: "performance-creative",
    publishedAt: "2026-04-29",
    readingTimeMinutes: 7,
    status: "published",
    tldr:
      "Die besten Hooks in Beauty-Ads 2026 öffnen mit Pain Points, Texturshots oder kontraintuitiven Aussagen. Vermeide generische Lifestyle-Cold-Opens, 'Hi, ich bin'-Opener und Logo-First-Animationen — sie erzeugen sofort 'Werbung'-Erkennung und werden weggescrollt.",
    faq: [
      {
        q: "Was ist ein Hook in einem Performance-Creative?",
        a: "Ein Hook sind die ersten 1,5 bis 3 Sekunden eines Ad-Creatives. In dieser Zeit entscheidet die Plattform-Audience, ob sie stoppt oder weiterscrollt. Die Hook-Rate (3-Second-View-Rate) ist die ehrlichste Bewertung deines Creatives, unabhängig von Landing-Page-Qualität.",
      },
      {
        q: "Welche Hook-Patterns funktionieren in Beauty-Ads am besten?",
        a: "Pain-Point-Opener (z. B. „Klebrige Sonnencreme?“), Texture-Stops (Makro-Aufnahmen von Cremes oder Serum-Tropfen), kontraintuitive Aussagen, Routine-Voice-Over-Mid-Sentence, ehrliche Vorher-Nachher-Frames, konkrete Zahlen-Aussagen und Insider-Tipp-Hooks performen in unseren Tests wiederholt überdurchschnittlich.",
      },
      {
        q: "Welche Hooks sollte ich vermeiden?",
        a: "Generische Lifestyle-Cold-Opens (Sonnenaufgang am Strand), klassische „Hi, ich bin“-Vorstellungen und animierte Logo-First-Intros. Sie signalisieren in Sekunde 1, dass es sich um Werbung handelt, und die Drop-off-Rate ist brutal.",
      },
      {
        q: "Wie testet man Hooks systematisch?",
        a: "Halte den Body des Creatives konstant und variiere nur den Hook. Pro Hook-Variante 2.000–5.000 € Test-Spend ansetzen, mindestens 1.000 Klicks oder 50.000 Impressions sammeln, dann auswerten. Variablen-Isolation ist Pflicht — sonst weißt du nicht, ob der Hook oder der Body den Unterschied gemacht hat.",
      },
    ],
  },
  {
    slug: "creative-fatigue-erkennen",
    title: "Creative Fatigue erkennen — bevor sie dein Budget frisst",
    description:
      "Wann ein Creative ermüdet, sieht man nicht im Kopf, sondern in den Daten. Vier Frühindikatoren — und wann du den Stecker ziehen solltest.",
    pillar: "performance-creative",
    publishedAt: "2026-04-22",
    readingTimeMinutes: 6,
    status: "published",
    tldr:
      "Creative Fatigue erkennt man an vier Datenpunkten: sinkende Hook-Rate, steigender CPM, Frequency über 3,5 und sinkendes Klickvolumen bei stabiler Conversion-Rate. Stop-Regel: Wenn zwei der vier Indikatoren über 7 Tage außerhalb der Toleranz liegen — nicht warten, bis ROAS einbricht.",
    faq: [
      {
        q: "Was ist Creative Fatigue?",
        a: "Creative Fatigue beschreibt den Effekt, dass ein Ad-Creative mit zunehmender Ausspielung an Wirkung verliert. Ursache ist nicht das Creative selbst — es ist das Verhältnis zwischen Erstsehern und Wiedersehern. Skalierung beschleunigt diesen Prozess.",
      },
      {
        q: "Welche KPIs zeigen Creative Fatigue als erstes?",
        a: "Die Hook-Rate (3-Second-View-Rate) reagiert am schnellsten. Wenn sie über 7 Tage um mehr als 15 % fällt, ohne dass sich Audience oder Placement geändert hat, ist das Creative ermüdet. CPM und CTR folgen typischerweise 4–10 Tage später.",
      },
      {
        q: "Ab welcher Frequency wird Creative Fatigue kritisch?",
        a: "Bei Frequency > 3,5 (in 7 Tagen) sieht dieselbe Person dein Creative mehr als drei Mal. In Beauty und Health ist das die typische Schmerzgrenze, ab der Engagement und CTR rapide sinken.",
      },
      {
        q: "Wie häufig sollte man Creatives erneuern?",
        a: "Bei 5–15 k €/Monat Ad-Spend ca. alle 4–8 Wochen. Bei 15–50 k €/Monat 2–4 Wochen. Bei 50–150 k €/Monat 1–3 Wochen. Bei 150 k €+ wenige Tage bis 2 Wochen. Frequency-Caps verzögern, lösen aber nicht.",
      },
    ],
  },
  {
    slug: "scroll-stop-rate-verbessern",
    title: "Scroll-Stop-Rate verbessern: Der Kampf um 1,5 Sekunden",
    description:
      "Die Scroll-Stop-Rate ist die ehrlichste Bewertung deines Creatives. Was sie wirklich misst, welche Benchmarks gelten, und wie du sie systematisch hebst.",
    pillar: "performance-creative",
    publishedAt: "2026-05-04",
    readingTimeMinutes: 5,
    status: "stub",
  },
  {
    slug: "creative-burnout-vermeiden",
    title: "Creative Burnout: Wenn das ganze Team an die Wand fährt",
    description:
      "Nicht das Creative ermüdet, sondern das Team. Warum strukturierte Engine-Loops Burnout verhindern und wie du eine nachhaltige Production Cadence baust.",
    pillar: "performance-creative",
    publishedAt: "2026-05-04",
    readingTimeMinutes: 5,
    status: "stub",
  },
  {
    slug: "ctr-benchmarks-beauty-ads",
    title: "CTR-Benchmarks für Beauty-Ads in DACH 2026",
    description:
      "Was eine ehrlich benchmarkbare CTR in Skincare, Health und Lifestyle-Beauty heute aussieht — und welche Faktoren die größten Schwankungen erklären.",
    pillar: "performance-creative",
    publishedAt: "2026-05-04",
    readingTimeMinutes: 5,
    status: "stub",
  },

  // PILLAR 2 — Creative Engine
  {
    slug: "creative-hypothesen-formulieren",
    title: "Creative-Hypothesen formulieren — das vergessene Handwerk",
    description:
      "Eine gute Hypothese unterscheidet einen kontrollierten Test von einem zufälligen Versuch. Drei Bausteine, die jede Hypothese braucht — plus Template.",
    pillar: "creative-engine",
    publishedAt: "2026-05-01",
    readingTimeMinutes: 5,
    status: "published",
    tldr:
      "Eine valide Creative-Hypothese hat drei Bausteine: die Variable (was du änderst), die Erwartung (welcher KPI sich wie ändert) und die Begründung (warum du das vermutest). Template: 'Wir vermuten, dass [konkrete Variante] für [Zielgruppe] zu [KPI-Delta] führt — weil [evidenzbasierte Begründung].'",
    faq: [
      {
        q: "Was ist eine Creative-Hypothese?",
        a: "Eine Creative-Hypothese ist eine prüfbare Annahme darüber, wie eine konkrete Creative-Variante die Performance gegenüber einer Kontrolle verändert. Sie unterscheidet kontrollierte A/B-Tests von zufälligem Probieren.",
      },
      {
        q: "Wie viele Hypothesen sollte man pro Test-Zyklus formulieren?",
        a: "In unseren Retainern formulieren wir typischerweise 3–5 Hypothesen pro Produktionszyklus. Weniger lässt Lernchancen liegen. Mehr ist operativ schwer zu testen, weil Test-Cells statistische Signifikanz brauchen.",
      },
      {
        q: "Was macht eine Hypothese schlecht?",
        a: "Zu vage Formulierungen („Lass uns moderner aussehen“), zu viele gleichzeitig geänderte Variablen, fehlende Begründung („Ich glaube halt“) oder nicht-widerlegbare Aussagen („Es wird besser performen“). Alle vier scheitern an Lernfähigkeit.",
      },
    ],
  },
  {
    slug: "learning-log-aufbauen",
    title: "Ein Learning-Log aufbauen, das nach 12 Monaten unbezahlbar ist",
    description:
      "Die meisten Brands wissen, welche Creatives diesen Monat gewonnen haben — nicht, welche Hook-Logik in ihrer Nische über zwei Jahre stabil dominiert. Ein Learning-Log schließt diese Lücke.",
    pillar: "creative-engine",
    publishedAt: "2026-05-03",
    readingTimeMinutes: 6,
    status: "published",
    tldr:
      "Ein Learning-Log ist eine strukturierte Datenbank aller Creative-Tests mit sieben Pflichtfeldern: Datum/Test-ID, Hypothese, Setup, Ergebnis, Verifikation, generalisierbare Erkenntnis, nächster Test. Nach 6–12 Monaten kompoundieren die Einträge zu echter Marketing-Intelligenz.",
    faq: [
      {
        q: "Was gehört in ein Creative-Learning-Log?",
        a: "Sieben Pflichtfelder pro Eintrag: Datum + Test-ID, Hypothese (vor dem Test formuliert), Test-Setup (Audience, Placement, Budget), Ergebnis (KPI-Delta), statistische Verifikation, generalisierbare Erkenntnis und Plan für nächsten Test.",
      },
      {
        q: "Welche Tools eignen sich für ein Learning-Log?",
        a: "Notion-Datenbanken, Airtable, Google Sheets mit klarer Struktur oder Linear-Issues mit Test-Tag. Wichtiger als das Tool ist die Disziplin: jeder Test wird innerhalb von 48 Stunden nach Ende dokumentiert.",
      },
      {
        q: "Ab wann wird ein Learning-Log unbezahlbar?",
        a: "Nach etwa 30–60 Einträgen (typisch 6–12 Monate) zeigen sich Muster: welche Hook-Typen in der Nische dominieren, welche Formate stabil sind, welche Postproduktion-Stile altern. Diese Erkenntnis ist langlebiger als jedes einzelne Creative.",
      },
    ],
  },
  {
    slug: "creative-brief-template",
    title: "Creative-Brief-Template für Performance Ads",
    description:
      "Ein Briefing ist keine Wunschliste, sondern eine Bauanleitung für Aufmerksamkeit. Die sieben Felder, ohne die kein Brief das Studio verlassen sollte.",
    pillar: "creative-engine",
    publishedAt: "2026-05-04",
    readingTimeMinutes: 6,
    status: "stub",
  },
  {
    slug: "ab-testing-mechanik-im-detail",
    title: "A/B-Testing-Mechanik im Detail: Variablen-Isolation",
    description:
      "Wenn du drei Dinge gleichzeitig änderst und der Test gewinnt, weißt du nicht, warum. Wie strikte Variablen-Isolation echtes Lernen erzeugt.",
    pillar: "creative-engine",
    publishedAt: "2026-05-04",
    readingTimeMinutes: 7,
    status: "stub",
  },
  {
    slug: "creative-velocity-production-sprints",
    title: "Creative Velocity: Production Sprints, die skalieren",
    description:
      "Eine Brand mit 100k+ Monats-Spend braucht 5–10 neue Tests pro Woche. Wie unsere Production Sprints diesen Rhythmus liefern, ohne Qualität zu opfern.",
    pillar: "creative-engine",
    publishedAt: "2026-05-04",
    readingTimeMinutes: 6,
    status: "stub",
  },

  // PILLAR 3 — Beauty E-Commerce
  {
    slug: "d2c-beauty-dach-2026",
    title: "D2C-Beauty in DACH 2026 — fünf Verschiebungen, die jetzt zählen",
    description:
      "TikTok Shop, Compliance-Druck, KI-Sichtbarkeit, Retention vor Akquise und das Ende der reinen Aspirational-Ästhetik. Eine kompakte Marktbestandsaufnahme.",
    pillar: "beauty-ecommerce-marketing",
    publishedAt: "2026-04-30",
    readingTimeMinutes: 7,
    status: "published",
    tldr:
      "Fünf Verschiebungen prägen D2C-Beauty in DACH 2026: TikTok Shop als eigenständiger Sales-Channel, schärfere Compliance (HWG, Cosmetics Regulation, EU AI Act), KI-gestützte Käufer-Recherche (ChatGPT, Perplexity), Retention vor Akquise und das Ende reiner Aspirational-Ästhetik zugunsten von Identifikation.",
    faq: [
      {
        q: "Wie groß ist der D2C-Beauty-Markt in DACH 2026?",
        a: "Deutschland ist Europas größter Beauty- und Personal-Care-Markt mit rund 35,6 Milliarden Euro Volumen (2025) und über 21 % Online-Anteil. E-Commerce wächst sechsmal schneller als der stationäre Handel. TikTok Shop steht weltweit bereits für rund 22 % der Social-Commerce-Käufe.",
      },
      {
        q: "Welche Compliance-Regelwerke treffen Beauty-Brands 2026?",
        a: "Drei zentrale Regelwerke laufen gleichzeitig schärfer: Heilmittelwerbegesetz (HWG) bei Wirkversprechen, EU-Cosmetics-Regulation 1223/2009 für Inhaltsstoff-Claims, EU AI Act ab August 2026 für KI-generierte Werbeinhalte.",
      },
      {
        q: "Was bedeutet AEO für Beauty-Brands?",
        a: "AEO (Answer Engine Optimization) optimiert Inhalte dafür, in KI-gestützten Antwort-Systemen wie ChatGPT, Perplexity, Gemini oder Google AI Overviews zitiert zu werden. Strukturierte Daten, klare Q&A-Inhalte und referenzierte Inhaltsstoff-Erklärungen sind die Bausteine.",
      },
      {
        q: "Warum funktioniert reine Aspirational-Werbung in Beauty nicht mehr?",
        a: "TikTok hat das Beauty-Marketing umgekrempelt. Käufer:innen identifizieren sich heute mit Menschen, die ihnen ähneln — gleiche Hauttöne, gleiche Probleme, gleiche Routinen. Aspirational Visuals funktionieren noch, aber nicht mehr als Default-Setting. Casting wird wichtiger als Produktionsbudget.",
      },
    ],
  },
  {
    slug: "meta-ads-fuer-beauty-brands",
    title: "Meta Ads für Beauty-Brands: Was 2026 anders ist",
    description:
      "Audience-Automatisierung, Advantage+, Compliance bei Wirkversprechen — wie du Meta heute für Beauty-D2C richtig aufsetzt, ohne in alte Patterns zu fallen.",
    pillar: "beauty-ecommerce-marketing",
    publishedAt: "2026-05-04",
    readingTimeMinutes: 7,
    status: "stub",
  },
  {
    slug: "tiktok-beauty-trends",
    title: "TikTok Beauty Trends 2026: Vom Trend zum Buy",
    description:
      "TikTok Shop, GRWM-Formate, Pain-Point-Hooks — was bei Beauty auf TikTok aktuell konvertiert und was nur viral aussieht.",
    pillar: "beauty-ecommerce-marketing",
    publishedAt: "2026-05-04",
    readingTimeMinutes: 6,
    status: "stub",
  },
  {
    slug: "roas-vs-mer-fuer-beauty-d2c",
    title: "ROAS vs. MER für Beauty-D2C: Welche Metrik wirklich zählt",
    description:
      "Plattform-ROAS lügt. MER (Media Efficiency Ratio) zwingt zur Wahrheit. Wie du beide richtig liest und welche Entscheidungen daran hängen.",
    pillar: "beauty-ecommerce-marketing",
    publishedAt: "2026-05-04",
    readingTimeMinutes: 6,
    status: "stub",
  },
  {
    slug: "skincare-visuals-paid-social",
    title: "Skincare-Visuals in Paid Social: Texturen, die verkaufen",
    description:
      "Foundation-Tropfen, Cremeskonsistenz, Serum-Schimmer — welche Mikro-Signale in Skincare-Ads den Unterschied machen und wie sie produziert werden.",
    pillar: "beauty-ecommerce-marketing",
    publishedAt: "2026-05-04",
    readingTimeMinutes: 6,
    status: "stub",
  },

  // PILLAR 4 — Foto + KI Hybrid
  {
    slug: "eu-ai-act-fuer-marketers",
    title: "EU AI Act für Marketers — was im August 2026 wirklich gilt",
    description:
      "Ab August 2026 müssen KI-generierte Werbeinhalte in der EU gekennzeichnet werden. Was das konkret heißt, was nicht — und wie du dich jetzt aufstellst.",
    pillar: "foto-ki-hybrid",
    publishedAt: "2026-05-02",
    readingTimeMinutes: 8,
    status: "published",
    tldr:
      "Ab August 2026 müssen KI-generierte Werbeinhalte in der EU gekennzeichnet werden. Sichtbarer Hinweis am Visual + C2PA-Metadaten + Plattform-Labels (Meta, TikTok) sind die drei empfohlenen Kennzeichnungs-Wege. Strafen: bis 15 Mio. € oder 3 % des Weltumsatzes. Mirrou kennzeichnet bereits seit Tag 1.",
    faq: [
      {
        q: "Ab wann müssen KI-generierte Werbeinhalte in der EU gekennzeichnet werden?",
        a: "Die Kennzeichnungspflicht gilt ab August 2026. Die KI-Literacy-Pflicht ist bereits seit Februar 2025 in Kraft — Unternehmen, die KI-Tools einsetzen, müssen sicherstellen, dass Mitarbeitende ausreichend KI-kompetent sind.",
      },
      {
        q: "Was gilt als „KI-generiert“ im Sinne des EU AI Act?",
        a: "Voll KI-generierte Inhalte (z. B. ein Midjourney-Hintergrund von Grund auf) sind klar kennzeichnungspflichtig. Substanziell KI-bearbeitete Inhalte (Personentausch, Hintergrund-Tausch, Stiltransfer) ebenfalls. KI-unterstützte Mikro-Korrekturen (Generative Fill, KI-Upscaling) sind vermutlich nicht pflichtig — Detail-Regelung steht noch aus.",
      },
      {
        q: "Welche Strafen drohen bei Nicht-Compliance?",
        a: "Bußgelder bis zu 15 Millionen Euro oder 3 % des weltweiten Jahresumsatzes, je nachdem was höher ist. In der Praxis sind Wettbewerber- und Verbraucherschützer-Klagen sowie Plattform-Demonetization (Meta, TikTok) die häufigeren Risiken.",
      },
      {
        q: "Wie kennzeichne ich KI-generierte Werbung korrekt?",
        a: "Drei Wege empfohlen, idealerweise kombiniert: 1) sichtbarer Hinweis im Visual („AI-assisted“, „AI-generated“), 2) maschinenlesbare C2PA-Content-Credentials in den Metadaten, 3) Plattform-eigene KI-Labels nutzen (Meta, TikTok bieten sie aktiv an).",
      },
      {
        q: "In welche Risiko-Klasse fallen KI-Visuals für Werbung?",
        a: "„Begrenztes Risiko“ — keine aufwendige Zertifizierung wie bei Hochrisiko-KI (medizinische Diagnostik, Bewerbungsentscheidungen), aber Transparenz- und Kennzeichnungspflicht.",
      },
    ],
  },
  {
    slug: "ki-hintergruende-richtig-einsetzen",
    title: "KI-Hintergründe richtig einsetzen — ohne den Trust zu verlieren",
    description:
      "Midjourney und Firefly können dein Studio skalieren — oder dein Branding ruinieren. Welche Kategorien für KI taugen, welche nicht, und wie sauber maskiert wird.",
    pillar: "foto-ki-hybrid",
    publishedAt: "2026-05-04",
    readingTimeMinutes: 6,
    status: "stub",
  },
  {
    slug: "ugc-vs-studio",
    title: "UGC vs. Studio: Wann was funktioniert (und wann nicht)",
    description:
      "Authentisch wirkender UGC schlägt Studio-Hochglanz oft — aber nicht immer. Die Trennlinie zwischen Identifikation und Trust-Untergrabung.",
    pillar: "foto-ki-hybrid",
    publishedAt: "2026-05-04",
    readingTimeMinutes: 6,
    status: "stub",
  },
  {
    slug: "tech-specs-fuer-ad-creatives",
    title: "Tech Specs für Ad Creatives 2026 — alle Plattformen, ein Cheatsheet",
    description:
      "Maße, Längen, Bitrates, Safe Areas. Eine kompakte Referenz für Meta, TikTok, Google und YouTube — Stand 2026.",
    pillar: "foto-ki-hybrid",
    publishedAt: "2026-05-04",
    readingTimeMinutes: 5,
    status: "stub",
  },
  {
    slug: "texturshots-beauty-performance",
    title: "Texturshots für Beauty-Performance: 1,8x höhere Hook-Rate",
    description:
      "Pure Texturshots schlagen Personenshots in Skincare regelmäßig deutlich. Warum sie funktionieren und wie wir sie produzieren.",
    pillar: "foto-ki-hybrid",
    publishedAt: "2026-05-04",
    readingTimeMinutes: 5,
    status: "stub",
  },
];

export const clustersByPillar = (slug: PillarSlug): Cluster[] =>
  CLUSTERS.filter((c) => c.pillar === slug).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

export const findPillar = (slug: string): Pillar | undefined =>
  PILLARS.find((p) => p.slug === slug);

export const findCluster = (slug: string): Cluster | undefined =>
  CLUSTERS.find((c) => c.slug === slug);

export const SITE = {
  name: "Mirrou Creative Studio",
  shortName: "Mirrou",
  tagline: "Performance Creative Studio",
  description:
    "Mirrou Creative Studio — Performance Creatives für Beauty-, Health- & Lifestyle-Brands. High-End-Fotografie, KI-Visuals und systematisches Creative-Testing als messbare Creative-Engine. Creative Direction: Olha Yevtushenko.",
  url: "https://mirrou.studio",
  locale: "de-DE",
  email: "hallo@mirrou.studio",
  social: {
    instagram: "https://www.instagram.com/mirrou.studio/",
    facebook: "https://www.facebook.com/profile.php?id=61589455194800",
    linkedin: "https://linkedin.com/company/mirrou-studio",
  },
  locations: [
    { city: "Hamburg", role: "Produktion & Creative Direction" },
    { city: "Berlin", role: "Performance, AI & Growth" },
  ],
  creativeDirection: {
    name: "Olha Yevtushenko",
    role: "Founder & Creative Director",
    instagram: "https://www.instagram.com/olhayevtushenko/",
    portfolio: "https://olhayevtushenko.com",
  },
  press: {
    contact: "press@mirrou.studio",
    boilerplate:
      "Mirrou Creative Studio is a Hamburg-based performance creative studio with a second studio presence in Berlin, building editorial-grade brand systems and assets for beauty, lifestyle and culture-led brands.",
    tagline: "Algorithm of Soul",
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// PRESS QUOTES — verbatim approved copy only
// ─────────────────────────────────────────────────────────────────────────────

export interface PressQuote {
  id: string;
  text: string;
  attribution: string;
  role?: string;
  surfaces: Array<"home" | "studio" | "cases">;
}

export const PRESS_QUOTES: PressQuote[] = [
  {
    id: "soul-intention",
    text: "I don't just photograph products. I capture their soul's intention.",
    attribution: "Olha Yevtushenko",
    role: "Founder & Creative Director",
    surfaces: ["home", "studio"],
  },
  {
    id: "aesthetics-performance",
    text: "Mirrou is where aesthetics solve for performance.",
    attribution: "Mirrou Creative Studio",
    surfaces: ["home", "cases"],
  },
  {
    id: "conversion-emotion",
    text: "Conversion is an emotional response to logical excellence.",
    attribution: "Olha Yevtushenko",
    role: "Founder & Creative Director",
    surfaces: ["studio", "cases"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PRESS DOWNLOADS — editorial assets per web-spec.md
// ─────────────────────────────────────────────────────────────────────────────

export interface PressDownload {
  id: string;
  title: string;
  fileType: "JPG" | "PDF" | "ZIP";
  fileSize: string;
  rightsLabel: string;
  available: boolean;
  description: string;
}

export const PRESS_DOWNLOADS: PressDownload[] = [
  {
    id: "personal-brand-portrait-kit",
    title: "Personal Brand Portrait Kit",
    fileType: "JPG",
    fileSize: "45 MB",
    rightsLabel: "Editorial use with credit",
    available: true,
    description:
      "High-resolution press portraits of Olha Yevtushenko for editorial and media use.",
  },
  {
    id: "studio-mission-deck-2026",
    title: "Mirrou Studio Mission Deck",
    fileType: "PDF",
    fileSize: "12.1 MB",
    rightsLabel: "Editorial reference, with credit",
    available: true,
    description:
      "Studio thesis, dual-city architecture, and 2026 editorial direction. For journalist reference.",
  },
  {
    id: "press-photo-kit-high-res",
    title: "Press Photo Kit — High Res",
    fileType: "ZIP",
    fileSize: "260 MB",
    rightsLabel: "Editorial use with credit",
    available: true,
    description:
      "~60 curated high-resolution images: studio, cases, location. Credits and captions included.",
  },
  {
    id: "case-study-compilation-2026",
    title: "Case Study Compilation 2026",
    fileType: "PDF",
    fileSize: "8.8 MB",
    rightsLabel: "Editorial reference, with credit",
    available: true,
    description:
      "All four Mirrou visual systems documented: Luminous Aura, Vitality Pulse, Essence Drift, Neural Glow.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CASES — four real Mirrou conceptual brand systems
// ─────────────────────────────────────────────────────────────────────────────

export interface CaseVisual {
  src: string;
  alt: string;
}

export interface CaseProject {
  id: string;
  title: string;
  year: string;
  category: string;
  coverImage: string;
  visuals: CaseVisual[];
  tagline: string;
  description: string;
  aesthetics: string[];
  aiVariant: "assisted" | "generated";
  anchor: string;
}

export const CASES: CaseProject[] = [
  {
    id: "luminous-aura",
    title: "Luminous Aura",
    year: "2026",
    category: "Beauty Serum · Visual System",
    coverImage: "/images/cases/luminous-aura-1.png",
    visuals: [
      {
        src: "/images/cases/luminous-aura-1.png",
        alt: "Luminous Aura — dark marble backdrop with gold particle atmosphere",
      },
      {
        src: "/images/cases/luminous-aura-2.png",
        alt: "Luminous Aura — serum bottle detail, gold light refraction on marble",
      },
      {
        src: "/images/cases/luminous-aura-3.png",
        alt: "Luminous Aura — texture close-up, mineral surface and product interaction",
      },
      {
        src: "/images/cases/luminous-aura-4.png",
        alt: "Luminous Aura — product elevated on dark marble plinth, controlled lighting",
      },
      {
        src: "/images/cases/luminous-aura-5.png",
        alt: "Luminous Aura — overhead composition, gold particle dispersion",
      },
      {
        src: "/images/cases/luminous-aura-6.png",
        alt: "Luminous Aura — editorial full-system frame, cinematic dark luxury",
      },
    ],
    tagline:
      "Premium beauty serum visual system. Dark marble, suspended gold particles, cinematic stillness.",
    description:
      "A premium serum required a visual language that communicated molecular precision and luxury simultaneously. The solution: dark Nero Marquina marble as the primary surface, gold particle atmospherics rendered in hybrid photography, a tonal palette that collapses the distance between product and desire.",
    aesthetics: ["Dark marble", "Gold particles", "Cinematic stillness", "Molecular precision"],
    aiVariant: "assisted",
    anchor: "luminous-aura",
  },
  {
    id: "vitality-pulse",
    title: "Vitality Pulse",
    year: "2026",
    category: "Energy Serum · Kinetic Visual System",
    coverImage: "/images/cases/vitality-pulse-1.png",
    visuals: [
      {
        src: "/images/cases/vitality-pulse-1.png",
        alt: "Vitality Pulse — kinetic energy serum, dynamic diagonal composition",
      },
      {
        src: "/images/cases/vitality-pulse-2.png",
        alt: "Vitality Pulse — macro detail, water droplets on glass, tactile energy texture",
      },
      {
        src: "/images/cases/vitality-pulse-3.png",
        alt: "Vitality Pulse — motion-driven product placement, energy tension and liquid dynamics",
      },
      {
        src: "/images/cases/vitality-pulse-4.png",
        alt: "Vitality Pulse — saturated directional highlight against dark controlled ground",
      },
      {
        src: "/images/cases/vitality-pulse-5.png",
        alt: "Vitality Pulse — gold liquid crown splash, kinetic motion frozen in time",
      },
      {
        src: "/images/cases/vitality-pulse-6.png",
        alt: "Vitality Pulse — full editorial frame, kinetic visual system complete",
      },
    ],
    tagline:
      "Energy-serum visual system. Kinetic tension, dynamic composition, controlled intensity.",
    description:
      "An energy serum brand demanded movement as the primary design language — not metaphorical movement, but visual kinetics embedded into every frame. Dynamic diagonals, controlled color tension, and motion-blur technique translated product energy into still-image performance without losing the tonal discipline that defines Mirrou.",
    aesthetics: ["Kinetic diagonals", "Dynamic composition", "Controlled intensity", "Liquid motion"],
    aiVariant: "assisted",
    anchor: "vitality-pulse",
  },
  {
    id: "essence-drift",
    title: "Essence Drift",
    year: "2026",
    category: "Fragrance · Atmospheric Narrative",
    coverImage: "/images/cases/essence-drift-1.png",
    visuals: [
      {
        src: "/images/cases/essence-drift-1.png",
        alt: "Essence Drift — soft haze atmosphere, glass refraction and diffused light",
      },
      {
        src: "/images/cases/essence-drift-2.png",
        alt: "Essence Drift — fragrance bottle in layered diffused light, atmospheric depth",
      },
      {
        src: "/images/cases/essence-drift-3.png",
        alt: "Essence Drift — editorial atmospheric frame, translucence and suspended time",
      },
      {
        src: "/images/cases/essence-drift-4.png",
        alt: "Essence Drift — hero fragrance bottle, teal smoke atmosphere, gold cap detail",
      },
      {
        src: "/images/cases/essence-drift-5.png",
        alt: "Essence Drift — bottle silhouette in dense fog, warm-cool atmospheric gradient",
      },
      {
        src: "/images/cases/essence-drift-6.png",
        alt: "Essence Drift — serum on dark marble, glass refraction and gold liquid warmth",
      },
    ],
    tagline:
      "Atmospheric fragrance narrative. Soft haze, glass refractions, suspended time.",
    description:
      "Fragrance is invisible — the visual system had to make the invisible felt. Soft-focus hazes, glass surfaces splitting light into prismatic refractions, and a near-monochrome palette interrupted by single moments of warmth. The result is a visual system that communicates scent as sensation, not product.",
    aesthetics: ["Soft haze", "Glass refractions", "Atmospheric depth", "Suspended time"],
    aiVariant: "assisted",
    anchor: "essence-drift",
  },
  {
    id: "neural-glow",
    title: "Neural Glow",
    year: "2026",
    category: "Tech-Forward Beauty · Neon Circuitry System",
    coverImage: "/images/cases/neural-glow-cover.png",
    visuals: [
      {
        src: "/images/cases/neural-glow-cover.png",
        alt: "Neural Glow — neon serum bottle with bioluminescent neural network pattern, tech-forward hero",
      },
      {
        src: "/images/cases/neural-glow-2.png",
        alt: "Neural Glow — gold energy glow on dark tech grid, atmospheric abstract texture",
      },
      {
        src: "/images/cases/neural-glow-4.png",
        alt: "Neural Glow — circuitry grid with illuminated gold nodes, tech precision pattern",
      },
      {
        src: "/images/cases/neural-glow-5.png",
        alt: "Neural Glow — neon fiber-optic wave system, blue-gold bioluminescent flow",
      },
      {
        src: "/images/cases/neural-glow-6.png",
        alt: "Neural Glow — neural network visualization, glowing synaptic connections on dark field",
      },
      {
        src: "/images/cases/neural-glow-3.png",
        alt: "Neural Glow — wireframe geometry structure, precision-engineered tech aesthetic",
      },
    ],
    tagline:
      "Tech-forward beauty at the intersection of biotech and luxury skincare. Neon, circuitry, precision.",
    description:
      "A biotech-adjacent skincare brand needed to occupy the intersection of clinical precision and aspirational beauty. Neon grid lines, circuitry patterns as texture elements, and cool bioluminescent color grades created a visual system that reads both scientific and desirable — without collapsing into cold, clinical distance.",
    aesthetics: ["Neon accents", "Circuitry patterns", "Bioluminescence", "Tech precision"],
    aiVariant: "generated",
    anchor: "neural-glow",
  },
];

export const findCase = (id: string): CaseProject | undefined =>
  CASES.find((c) => c.id === id);

export const CASE_IDS = CASES.map((c) => c.id);
