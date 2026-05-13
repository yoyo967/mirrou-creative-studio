#!/usr/bin/env node
/**
 * Generiert Sitemap, RSS-Feed und llms.txt aus site-data.ts.
 * Wird nach dem Build aufgerufen, schreibt direkt in dist/.
 *
 * Run: node scripts/generate-seo-assets.mjs
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const distDir = resolve(root, "dist");

mkdirSync(distDir, { recursive: true });

// Inline-Daten (statt site-data.ts zu importieren — kein TS-Loader nötig).
// Wenn ein Cluster oder Pillar hinzukommt, hier ergänzen.
const SITE_URL = "https://mirrou.studio";

const PILLAR_SLUGS = [
  "performance-creative",
  "creative-engine",
  "beauty-ecommerce-marketing",
  "foto-ki-hybrid",
];

const PILLARS = [
  {
    slug: "performance-creative",
    title: "Performance Creative für D2C-Brands",
    description:
      "Performance Creative als wichtigster Hebel im Paid Social. Definition, Mechanik, KPIs für Beauty/Health/Lifestyle.",
  },
  {
    slug: "creative-engine",
    title: "Die Creative Engine",
    description:
      "Operating System für Performance Creatives: Analyse → Hypothesen → Produktion → Testing → Learning.",
  },
  {
    slug: "beauty-ecommerce-marketing",
    title: "Beauty, Health & Lifestyle E-Commerce",
    description:
      "Die Nische, in der Mirrou tief sitzt. DACH-Markt, Compliance, Identifikations-Wende, TikTok Shop.",
  },
  {
    slug: "foto-ki-hybrid",
    title: "Foto + KI: Hybrid Production",
    description:
      "Hybrid Production: echte Fotografie kombiniert mit KI-Hintergründen. EU-AI-Act-konform.",
  },
];

const CLUSTERS = [
  // Pillar 1
  { slug: "hooks-die-funktionieren", title: "Hooks, die in Beauty-Ads funktionieren", publishedAt: "2026-04-29", pillar: "performance-creative" },
  { slug: "creative-fatigue-erkennen", title: "Creative Fatigue erkennen — bevor sie dein Budget frisst", publishedAt: "2026-04-22", pillar: "performance-creative" },
  { slug: "scroll-stop-rate-verbessern", title: "Scroll-Stop-Rate verbessern: Der Kampf um 1,5 Sekunden", publishedAt: "2026-05-04", pillar: "performance-creative" },
  { slug: "creative-burnout-vermeiden", title: "Creative Burnout: Wenn das ganze Team an die Wand fährt", publishedAt: "2026-05-04", pillar: "performance-creative" },
  { slug: "ctr-benchmarks-beauty-ads", title: "CTR-Benchmarks für Beauty-Ads in DACH 2026", publishedAt: "2026-05-04", pillar: "performance-creative" },
  // Pillar 2
  { slug: "creative-hypothesen-formulieren", title: "Creative-Hypothesen formulieren — das vergessene Handwerk", publishedAt: "2026-05-01", pillar: "creative-engine" },
  { slug: "learning-log-aufbauen", title: "Ein Learning-Log aufbauen, das nach 12 Monaten unbezahlbar ist", publishedAt: "2026-05-03", pillar: "creative-engine" },
  { slug: "creative-brief-template", title: "Creative-Brief-Template für Performance Ads", publishedAt: "2026-05-04", pillar: "creative-engine" },
  { slug: "ab-testing-mechanik-im-detail", title: "A/B-Testing-Mechanik im Detail: Variablen-Isolation", publishedAt: "2026-05-04", pillar: "creative-engine" },
  { slug: "creative-velocity-production-sprints", title: "Creative Velocity: Production Sprints, die skalieren", publishedAt: "2026-05-04", pillar: "creative-engine" },
  // Pillar 3
  { slug: "d2c-beauty-dach-2026", title: "D2C-Beauty in DACH 2026 — fünf Verschiebungen, die jetzt zählen", publishedAt: "2026-04-30", pillar: "beauty-ecommerce-marketing" },
  { slug: "meta-ads-fuer-beauty-brands", title: "Meta Ads für Beauty-Brands: Was 2026 anders ist", publishedAt: "2026-05-04", pillar: "beauty-ecommerce-marketing" },
  { slug: "tiktok-beauty-trends", title: "TikTok Beauty Trends 2026: Vom Trend zum Buy", publishedAt: "2026-05-04", pillar: "beauty-ecommerce-marketing" },
  { slug: "roas-vs-mer-fuer-beauty-d2c", title: "ROAS vs. MER für Beauty-D2C: Welche Metrik wirklich zählt", publishedAt: "2026-05-04", pillar: "beauty-ecommerce-marketing" },
  { slug: "skincare-visuals-paid-social", title: "Skincare-Visuals in Paid Social: Texturen, die verkaufen", publishedAt: "2026-05-04", pillar: "beauty-ecommerce-marketing" },
  // Pillar 4
  { slug: "eu-ai-act-fuer-marketers", title: "EU AI Act für Marketers — was im August 2026 wirklich gilt", publishedAt: "2026-05-02", pillar: "foto-ki-hybrid" },
  { slug: "ki-hintergruende-richtig-einsetzen", title: "KI-Hintergründe richtig einsetzen — ohne den Trust zu verlieren", publishedAt: "2026-05-04", pillar: "foto-ki-hybrid" },
  { slug: "ugc-vs-studio", title: "UGC vs. Studio: Wann was funktioniert (und wann nicht)", publishedAt: "2026-05-04", pillar: "foto-ki-hybrid" },
  { slug: "tech-specs-fuer-ad-creatives", title: "Tech Specs für Ad Creatives 2026 — alle Plattformen, ein Cheatsheet", publishedAt: "2026-05-04", pillar: "foto-ki-hybrid" },
  { slug: "texturshots-beauty-performance", title: "Texturshots für Beauty-Performance: 1,8x höhere Hook-Rate", publishedAt: "2026-05-04", pillar: "foto-ki-hybrid" },
];

const STATIC_ROUTES = [
  { url: "/", lastmod: "2026-05-06", priority: "1.0", changefreq: "weekly" },
  { url: "/studio", lastmod: "2026-05-06", priority: "0.8", changefreq: "monthly" },
  { url: "/pakete", lastmod: "2026-05-06", priority: "0.9", changefreq: "monthly" },
  { url: "/cases", lastmod: "2026-05-06", priority: "0.8", changefreq: "monthly" },
  { url: "/blog", lastmod: "2026-05-06", priority: "0.7", changefreq: "weekly" },
  { url: "/trust", lastmod: "2026-05-06", priority: "0.8", changefreq: "monthly" },
  { url: "/kontakt", lastmod: "2026-05-06", priority: "0.7", changefreq: "monthly" },
];

// ===== Sitemap =====
const today = new Date().toISOString().slice(0, 10);

const sitemapEntries = [
  ...STATIC_ROUTES.map((r) => ({
    loc: SITE_URL + r.url,
    lastmod: r.lastmod,
    priority: r.priority,
    changefreq: r.changefreq,
  })),
  ...PILLAR_SLUGS.map((slug) => ({
    loc: `${SITE_URL}/${slug}`,
    lastmod: today,
    priority: "0.9",
    changefreq: "monthly",
  })),
  ...CLUSTERS.map((c) => ({
    loc: `${SITE_URL}/blog/${c.slug}`,
    lastmod: c.publishedAt,
    priority: "0.7",
    changefreq: "monthly",
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    (e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync(resolve(distDir, "sitemap.xml"), sitemap, "utf8");
console.log(`✓ sitemap.xml mit ${sitemapEntries.length} URLs geschrieben`);

// ===== RSS Feed =====
const escapeXml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const rssItems = [...CLUSTERS]
  .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
  .map((c) => {
    const pillar = PILLARS.find((p) => p.slug === c.pillar);
    return `    <item>
      <title>${escapeXml(c.title)}</title>
      <link>${SITE_URL}/blog/${c.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${c.slug}</guid>
      <pubDate>${new Date(c.publishedAt).toUTCString()}</pubDate>
      <category>${escapeXml(pillar?.title ?? "")}</category>
      <description>${escapeXml(pillar?.description ?? "")}</description>
    </item>`;
  })
  .join("\n");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mirrou Resources</title>
    <link>${SITE_URL}/blog</link>
    <description>Performance Creative, Beauty E-Commerce, KI-Hybrid-Production und Compliance — von Mirrou Creative Studio.</description>
    <language>de-DE</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <generator>Mirrou Build Script</generator>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${rssItems}
  </channel>
</rss>
`;

writeFileSync(resolve(distDir, "rss.xml"), rss, "utf8");
console.log(`✓ rss.xml mit ${CLUSTERS.length} Cluster-Einträgen geschrieben`);

// ===== llms.txt =====
// https://llmstxt.org — emerging standard für AI-Agents/LLMs

const llmsTxt = `# Mirrou Creative Studio

> Performance Creative Studio für D2C-Brands in Beauty, Health und Lifestyle (DACH/EU). Hybrid aus High-End-Fotografie, KI-Visuals und systematischem A/B-Testing. Creative Direction: Olha Yevtushenko. EU-AI-Act-, DSGVO- und Data-Act-konform von Tag 1.

Mirrou ist ein Studio neuer Gründung (2026) mit Sitz in Hamburg (Produktion & Creative Direction) und Berlin (Performance, AI & Growth). Wir verbinden visuelle Präzision mit datengetriebener Logik, um D2C-Brands in einem regulierten Marketing-Umfeld (HWG, EU AI Act, Cosmetics Regulation) wachsen zu helfen. Unsere Apex/Pillar/Cluster-Architektur dokumentiert vier Wissensgebiete: Performance Creative, Creative Engine, Beauty E-Commerce und Foto-+-KI-Hybrid.

## Apex

- [Home](${SITE_URL}/): Mirrou Creative Studio — Performance Creatives, die in Paid Social messbar konvertieren.

## Pillars

${PILLARS.map(
  (p) => `- [${p.title}](${SITE_URL}/${p.slug}): ${p.description}`,
).join("\n")}

## Resources (Cluster)

${CLUSTERS.map((c) => {
  const pillar = PILLARS.find((p) => p.slug === c.pillar);
  return `- [${c.title}](${SITE_URL}/blog/${c.slug}) · Pillar: ${pillar?.title ?? ""}`;
}).join("\n")}

## Studio & Trust

- [Studio](${SITE_URL}/studio): Team aus Hamburg und Berlin. Olha Yevtushenko (Founder & Creative Director), Denys Demyanyshyn (Campaign & AI), Ralph Kindermann (CRM & Documentation), Yahya Yildirim (Growth & Inbound).
- [Pakete](${SITE_URL}/pakete): Drei Angebote — E-Commerce & Catalog (1.500–3.000 €/Shooting), Social Media & Advertising (2.000–5.000 €/Set), Creative Retainer (2.000–15.000 €/Monat in drei Tiers).
- [Cases](${SITE_URL}/cases): Dokumentierter Demo-Case (LumiSkin Berlin) mit +82 % CTR-Verbesserung, −38 % CPC, ROAS +42 %.
- [Trust Center](${SITE_URL}/trust): EU AI Act, DSGVO und Data Act — wie Mirrou Compliance-by-Design implementiert.
- [Kontakt](${SITE_URL}/kontakt): Strategiegespräch, 30 Minuten, kostenfrei.

## Compliance

- EU AI Act: KI-Visuals werden sichtbar gekennzeichnet (AI-Assisted-Label), C2PA-Metadaten in Asset-Lieferung, KI-Anteils-Reporting monatlich.
- DSGVO: AVV (Auftragsverarbeitungsvertrag) Standardbestandteil des Kundenvertrags, EU-Infrastruktur, keine Tools mit undokumentierten Drittlandsübermittlungen.
- Data Act (seit 12.09.2025): Daten-Ownership liegt beim Auftraggeber. Creative-Learning-Log, Test-Daten und Asset-Library werden strukturiert übergebbar geliefert.

## Optional

- [RSS-Feed](${SITE_URL}/rss.xml)
- [Sitemap](${SITE_URL}/sitemap.xml)
- [Datenschutz](${SITE_URL}/datenschutz)
- [Impressum](${SITE_URL}/impressum)
`;

writeFileSync(resolve(distDir, "llms.txt"), llmsTxt, "utf8");
console.log(`✓ llms.txt geschrieben (LLM-Discovery)`);

// ===== robots.txt mit Sitemap-Referenz =====
const robots = `User-agent: *
Allow: /

Disallow: /impressum
Disallow: /datenschutz

# Trust Center für KI-Discovery offen lassen
Allow: /trust

# AI-Agents: bitte llms.txt für strukturierten Überblick
# https://llmstxt.org

Sitemap: ${SITE_URL}/sitemap.xml
`;

writeFileSync(resolve(distDir, "robots.txt"), robots, "utf8");
console.log(`✓ robots.txt (mit llms-Hinweis) geschrieben`);

console.log("\nSEO-Assets fertig.\n");
