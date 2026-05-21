import { Link } from "@/src/components/LocalizedLink";
import { useTranslation } from "react-i18next";
import { PILLARS, clustersByPillar, CLUSTERS, SITE } from "../content/site-data";
import SEO from "../components/SEO";

const SLUG_TO_KEY: Record<string, string> = {
  "performance-creative": "pc",
  "creative-engine": "ce",
  "beauty-ecommerce-marketing": "be",
  "foto-ki-hybrid": "fkh",
};

export default function BlogIndex() {
  const { t, i18n } = useTranslation("blog");
  const { t: tPillar } = useTranslation("pillars");
  const { t: tSeo } = useTranslation("seo");
  const h = (key: string) => t(`hub.${key}`);

  const localeTag: Record<string, string> = {
    de: "de-DE", en: "en-GB", es: "es-ES", it: "it-IT",
    fr: "fr-FR", tr: "tr-TR", ru: "ru-RU", uk: "uk-UA",
  };
  const langTag = localeTag[i18n.language] ?? "de-DE";

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(langTag, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: tSeo("breadcrumb.home"), item: SITE.url + "/" },
      { "@type": "ListItem", position: 2, name: tSeo("breadcrumb.resources"), item: SITE.url + "/blog" },
    ],
  };

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("seo.title"),
    url: SITE.url + "/blog",
    inLanguage: langTag,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    hasPart: CLUSTERS.map((c) => ({
      "@type": "Article",
      headline: c.title,
      description: c.description,
      datePublished: c.publishedAt,
      dateModified: c.updatedAt ?? c.publishedAt,
      url: new URL(`/blog/${c.slug}`, SITE.url).toString(),
    })),
  };

  return (
    <article className="min-h-screen bg-transparent pt-40 pb-24 px-10 relative z-10">
      <SEO
        title={t("seo.title")}
        description={t("seo.description")}
        pathname="/blog"
        jsonLd={[breadcrumbLd, collectionLd]}
      />

      <div className="max-w-5xl mx-auto">
        <header className="mb-20">
          <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-mono mb-6">
            {h("eyebrow")}
          </p>
          <h1 className="text-5xl lg:text-7xl font-serif italic leading-[1.05] tracking-tight">
            {h("headline")}
          </h1>
          <p className="mt-8 text-lg text-ink/85 font-light max-w-2xl leading-relaxed">
            {h("body")}
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-widest text-muted font-mono">
            {t("hub.articleCount", { articles: CLUSTERS.length, pillars: PILLARS.length })}
          </p>
        </header>

        <div className="space-y-20">
          {PILLARS.map((pillar) => {
            const clusters = clustersByPillar(pillar.slug);
            const pk = SLUG_TO_KEY[pillar.slug];
            const pTitle = pk ? tPillar(`meta.${pk}.title`, { defaultValue: pillar.title }) : pillar.title;
            const pTagline = pk ? tPillar(`meta.${pk}.tagline`, { defaultValue: pillar.tagline }) : pillar.tagline;
            return (
              <section key={pillar.slug}>
                <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-white/10">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-accent font-mono">
                      {h("pillarPrefix")}{pillar.order}
                    </p>
                    <h2 className="text-3xl font-serif italic mt-2">{pTitle}</h2>
                    <p className="text-sm text-muted font-light mt-2">{pTagline}</p>
                  </div>
                  <Link
                    to={`/${pillar.slug}`}
                    className="text-[10px] uppercase tracking-widest text-muted hover:text-accent transition font-mono shrink-0"
                  >
                    {h("pillarLink")}
                  </Link>
                </div>

                <ul className="divide-y divide-white/5">
                  {clusters.map((c) => (
                    <li key={c.slug}>
                      <Link
                        to={`/blog/${c.slug}`}
                        className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 py-5 hover:text-accent transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="text-xl font-serif italic leading-snug">{c.title}</h3>
                          <p className="text-sm text-muted group-hover:text-ink mt-1 font-light">
                            {c.description}
                          </p>
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-[#444] font-mono shrink-0 flex items-center gap-3">
                          {c.status === "stub" && (
                            <span className="text-accent/60">{h("statusStub")}</span>
                          )}
                          <span>{formatDate(c.publishedAt)}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </article>
  );
}
