import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  findCluster,
  findPillar,
  clustersByPillar,
  SITE,
} from "../content/site-data";
import SEO from "../components/SEO";
import { CLUSTER_BODIES } from "./clusters/index";

export default function ClusterPage() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation("blog");
  const c = (key: string) => t(`cluster.${key}`);

  const cluster = slug ? findCluster(slug) : undefined;
  if (!cluster) return <Navigate to="/blog" replace />;

  const pillar = findPillar(cluster.pillar);
  if (!pillar) return <Navigate to="/blog" replace />;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(i18n.language === "en" ? "en-GB" : "de-DE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const Body = CLUSTER_BODIES[cluster.slug];
  const otherClusters = clustersByPillar(cluster.pillar)
    .filter((cl) => cl.slug !== cluster.slug)
    .slice(0, 4);

  const pathname = `/blog/${cluster.slug}`;
  const canonical = new URL(pathname, SITE.url).toString();
  const tldr = cluster.tldr ?? cluster.description;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url + "/" },
      {
        "@type": "ListItem",
        position: 2,
        name: pillar.shortLabel,
        item: new URL(`/${pillar.slug}`, SITE.url).toString(),
      },
      { "@type": "ListItem", position: 3, name: cluster.title, item: canonical },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cluster.title,
    description: cluster.description,
    abstract: tldr,
    datePublished: cluster.publishedAt,
    dateModified: cluster.updatedAt ?? cluster.publishedAt,
    inLanguage: "de-DE",
    keywords: pillar.keywords.join(", "),
    author: [
      { "@type": "Organization", name: "Mirrou Editorial", url: SITE.url },
      {
        "@type": "Person",
        name: SITE.creativeDirection.name,
        jobTitle: SITE.creativeDirection.role,
        url: SITE.creativeDirection.portfolio,
        sameAs: [SITE.creativeDirection.instagram, SITE.creativeDirection.portfolio],
      },
    ],
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: canonical,
    isPartOf: {
      "@type": "WebPage",
      name: pillar.shortLabel,
      url: new URL(`/${pillar.slug}`, SITE.url).toString(),
    },
    image: pillar.heroImage ? new URL(pillar.heroImage, SITE.url).toString() : undefined,
  };

  const faqLd =
    cluster.faq && cluster.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: cluster.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  const jsonLd = faqLd ? [breadcrumbLd, articleLd, faqLd] : [breadcrumbLd, articleLd];

  return (
    <article className="min-h-screen bg-transparent pt-40 pb-24 px-6 md:px-10 relative z-10">
      <SEO
        title={cluster.title}
        description={cluster.description}
        pathname={pathname}
        jsonLd={jsonLd}
      />

      <div className="max-w-4xl mx-auto">
        <Link
          to={`/${pillar.slug}`}
          className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted hover:text-accent mb-12 transition-colors group w-fit font-mono"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          {c("backToPillar")} {pillar.shortLabel}
        </Link>

        <nav
          className="text-[10px] uppercase tracking-[0.3em] text-muted font-mono mb-8 flex items-center gap-2"
          aria-label={c("breadcrumbAriaLabel")}
        >
          <Link to="/" className="hover:text-accent">Home</Link>
          <span className="text-subtle">/</span>
          <Link to={`/${pillar.slug}`} className="hover:text-accent">
            {pillar.shortLabel}
          </Link>
          <span className="text-subtle">/</span>
          <span aria-current="page">{c("breadcrumbArticle")}</span>
        </nav>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6 text-[10px] uppercase tracking-[0.3em] font-mono flex-wrap">
            <Link to={`/${pillar.slug}`} className="text-accent hover:underline">
              {c("pillarPrefix")} {pillar.shortLabel}
            </Link>
            <span className="text-subtle">/</span>
            <span className="text-muted">{formatDate(cluster.publishedAt)}</span>
            {cluster.updatedAt && cluster.updatedAt !== cluster.publishedAt && (
              <>
                <span className="text-subtle">/</span>
                <span className="text-muted">{c("updated")} {formatDate(cluster.updatedAt)}</span>
              </>
            )}
            {cluster.readingTimeMinutes && (
              <>
                <span className="text-subtle">/</span>
                <span className="flex items-center gap-1.5 text-muted">
                  <Clock size={12} aria-hidden /> {cluster.readingTimeMinutes} {c("minuteRead")}
                </span>
              </>
            )}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-6xl font-serif italic leading-[1.05] tracking-tight mb-8 text-balance"
          >
            {cluster.title}
          </motion.h1>

          <p className="text-body-lg text-ink/90 max-w-3xl">{cluster.description}</p>

          {cluster.status === "stub" && (
            <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-accent font-mono border border-accent/20 inline-block px-3 py-2">
              {c("stubNotice")}
            </p>
          )}
        </header>

        {cluster.tldr && (
          <aside
            aria-labelledby="tldr-heading"
            className="mb-12 border-l-2 border-accent pl-6 py-2"
          >
            <p id="tldr-heading" className="eyebrow mb-3">
              {c("tldrEyebrow")}
            </p>
            <p className="text-body-lg text-ink/85 max-w-3xl">{cluster.tldr}</p>
          </aside>
        )}

        <div className="mb-12 flex items-center gap-4 border-y border-white/6 py-5">
          <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-[10px] font-mono text-accent">
            MR
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] text-ink">
              <span className="font-semibold">{c("bylineStudio")}</span>
              <span className="text-muted"> {c("bylineRole")} </span>
              <a
                href={SITE.creativeDirection.instagram}
                rel="noopener author"
                className="text-accent hover:underline"
              >
                {SITE.creativeDirection.name}
              </a>
            </p>
            <p className="text-[11px] text-muted font-mono uppercase tracking-[0.2em] mt-1">
              {c("bylineLocation")}
            </p>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:italic prose-headings:tracking-tight prose-a:text-accent prose-strong:text-ink prose-p:text-body prose-p:leading-relaxed prose-p:font-light prose-li:text-body prose-li:font-light">
          {Body ? <Body /> : <DefaultStub cluster={cluster} pillar={pillar} />}
        </div>

        {cluster.faq && cluster.faq.length > 0 && (
          <section
            aria-labelledby="faq-heading"
            className="mt-20 pt-16 border-t border-white/6"
          >
            <p className="eyebrow mb-5">{c("faqEyebrow")}</p>
            <h2
              id="faq-heading"
              className="font-serif text-3xl md:text-4xl italic leading-tight tracking-tight mb-10"
            >
              {c("faqHeadline")}
            </h2>
            <dl className="space-y-px bg-white/6 border border-white/6">
              {cluster.faq.map((f) => (
                <div key={f.q} className="bg-bg p-6 md:p-8">
                  <dt className="font-serif italic text-lg md:text-xl leading-snug mb-3 text-ink">
                    {f.q}
                  </dt>
                  <dd className="text-body">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <aside className="mt-16 border border-white/10 p-6 bg-surface/50">
          <p className="eyebrow mb-2">{c("backToPillarLabel")}</p>
          <Link
            to={`/${pillar.slug}`}
            className="mt-2 inline-flex items-center gap-2 text-2xl font-serif italic hover:text-accent transition"
          >
            ← {pillar.shortLabel}
          </Link>
          <p className="mt-3 text-body text-[15px] max-w-2xl">
            {c("backToPillarBody")}
          </p>
        </aside>

        {otherClusters.length > 0 && (
          <section className="mt-16 pt-16 border-t border-white/6">
            <p className="eyebrow mb-6">{c("moreArticles")}</p>
            <ul className="space-y-px bg-white/6 border border-white/6">
              {otherClusters.map((cl) => (
                <li key={cl.slug} className="bg-bg">
                  <Link
                    to={`/blog/${cl.slug}`}
                    className="group block py-5 px-6 hover:bg-surface/50 transition"
                  >
                    <p className="text-lg font-serif italic group-hover:text-accent transition">
                      {cl.title}
                    </p>
                    <p className="text-body text-[14px] mt-1">{cl.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}

function DefaultStub({
  cluster,
  pillar,
}: {
  cluster: { title: string; description: string };
  pillar: { slug: string; shortLabel: string };
}) {
  const { t } = useTranslation("blog");
  const c = (key: string) => t(`cluster.${key}`);

  return (
    <>
      <p>{cluster.description}</p>
      <p>
        {c("stubBody1")}{" "}
        <Link to={`/${pillar.slug}`}>{pillar.shortLabel}</Link>.{" "}
        {c("stubBody2")}
      </p>
      <p>
        {c("stubBody3")}{" "}
        <Link to="/kontakt">{c("stubLink")}</Link>.{" "}
        {c("stubBody4")}
      </p>
    </>
  );
}
