import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  findPillar,
  clustersByPillar,
  PILLARS,
  SITE,
  type Pillar,
} from "../content/site-data";
import SEO from "../components/SEO";
import PillarPerformanceCreative from "./pillars/PillarPerformanceCreative";
import PillarCreativeEngine from "./pillars/PillarCreativeEngine";
import PillarBeautyEcommerce from "./pillars/PillarBeautyEcommerce";
import PillarFotoKiHybrid from "./pillars/PillarFotoKiHybrid";

import type { ComponentType } from "react";

const PILLAR_CONTENT: Record<string, ComponentType> = {
  "performance-creative": PillarPerformanceCreative,
  "creative-engine": PillarCreativeEngine,
  "beauty-ecommerce-marketing": PillarBeautyEcommerce,
  "foto-ki-hybrid": PillarFotoKiHybrid,
};

export default function PillarPage() {
  const { slug } = useParams();
  const { t } = useTranslation("blog");
  const p = (key: string, opts?: Record<string, unknown>) => t(`pillar.${key}`, opts);
  const pillar = slug ? findPillar(slug) : undefined;

  if (!pillar) return <Navigate to="/" replace />;

  const ContentComponent = PILLAR_CONTENT[pillar.slug];
  const clusters = clustersByPillar(pillar.slug);

  const pathname = `/${pillar.slug}`;
  const canonical = new URL(pathname, SITE.url).toString();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url + "/" },
      { "@type": "ListItem", position: 2, name: pillar.title, item: canonical },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pillar.title,
    description: pillar.description,
    inLanguage: "de-DE",
    keywords: pillar.keywords.join(", "),
    author: [
      { "@type": "Organization", name: "Mirrou Editorial", url: SITE.url },
      {
        "@type": "Person",
        name: SITE.creativeDirection.name,
        jobTitle: SITE.creativeDirection.role,
        sameAs: [SITE.creativeDirection.instagram, SITE.creativeDirection.portfolio],
      },
    ],
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: canonical,
    image: pillar.heroImage ? new URL(pillar.heroImage, SITE.url).toString() : undefined,
  };

  const itemListLd =
    clusters.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `Cluster: ${pillar.title}`,
          itemListElement: clusters.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: new URL(`/blog/${c.slug}`, SITE.url).toString(),
            name: c.title,
            description: c.description,
          })),
        }
      : null;

  const jsonLd = itemListLd
    ? [breadcrumbLd, articleLd, itemListLd]
    : [breadcrumbLd, articleLd];

  return (
    <article className="min-h-screen bg-transparent pt-40 pb-24 px-10 relative z-10">
      <SEO
        title={pillar.title}
        description={pillar.description}
        pathname={pathname}
        ogImage={pillar.heroImage}
        jsonLd={jsonLd}
      />

      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted hover:text-accent mb-12 transition-colors group w-fit"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          {p("backToHome")}
        </Link>

        <header className="mb-20">
          <div className="flex items-center gap-4 mb-8 text-[10px] uppercase tracking-[0.3em] font-mono">
            <span className="text-accent">{p("pillarLabel", { order: pillar.order })}</span>
            <span className="text-[#333]">/</span>
            <span className="text-muted">{pillar.tagline}</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl lg:text-7xl font-serif italic leading-[1.05] mb-12 tracking-tight"
          >
            {pillar.title}
          </motion.h1>

          <p className="text-xl text-ink/85 leading-relaxed font-light max-w-3xl">
            {pillar.description}
          </p>
        </header>

        {pillar.heroImage && (
          <div className="mb-16 rounded-sm overflow-hidden border border-white/5">
            <img
              src={pillar.heroImage}
              alt={pillar.title}
              className="w-full h-auto object-cover"
              loading="eager"
            />
          </div>
        )}

        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:italic prose-a:text-accent prose-strong:text-ink prose-p:text-muted prose-p:leading-relaxed prose-p:font-light">
          {ContentComponent && <ContentComponent />}
        </div>

        <ClusterListSection pillar={pillar} clusters={clusters} />
        <PillarCTA />
      </div>
    </article>
  );
}

function ClusterListSection({
  pillar,
  clusters,
}: {
  pillar: Pillar;
  clusters: ReturnType<typeof clustersByPillar>;
}) {
  const { t } = useTranslation("blog");
  const p = (key: string, opts?: Record<string, unknown>) => t(`pillar.${key}`, opts);

  if (clusters.length === 0) return null;

  return (
    <section className="mt-24 pt-24 border-t border-white/5">
      <div className="flex items-baseline justify-between mb-10">
        <h2 className="text-3xl font-serif italic">
          {p("clusterHeading")} „{pillar.shortLabel}"
        </h2>
        <span className="text-[10px] uppercase tracking-widest text-muted font-mono">
          {p("articleCount", { count: clusters.length })}
        </span>
      </div>

      <ul className="divide-y divide-white/5">
        {clusters.map((cluster) => (
          <li key={cluster.slug}>
            <Link
              to={`/blog/${cluster.slug}`}
              className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 py-6 hover:text-accent transition-colors"
            >
              <div>
                <h3 className="text-xl font-serif italic leading-snug">{cluster.title}</h3>
                <p className="text-sm text-muted group-hover:text-ink mt-1 font-light">
                  {cluster.description}
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#444] font-mono shrink-0 flex items-center gap-2">
                {cluster.status === "stub" && (
                  <span className="text-accent/60">{p("statusStub")}</span>
                )}
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PillarCTA() {
  const { t } = useTranslation("blog");
  const p = (key: string) => t(`pillar.${key}`);

  return (
    <section className="my-24 rounded-sm border border-accent/20 bg-accent/5 p-10 md:p-14">
      <div className="max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-serif italic leading-tight">
          {p("ctaHeadline")}
        </h2>
        <p className="mt-5 text-ink/85 text-lg font-light leading-relaxed">
          {p("ctaBody")}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/kontakt"
            className="bg-accent text-bg font-semibold px-6 py-3 rounded-full hover:opacity-90 transition uppercase text-xs tracking-widest font-mono"
          >
            {p("ctaBtn1")}
          </Link>
          <Link
            to="/pakete"
            className="border border-white/15 px-6 py-3 rounded-full hover:border-accent transition uppercase text-xs tracking-widest font-mono text-ink"
          >
            {p("ctaBtn2")}
          </Link>
        </div>
      </div>
    </section>
  );
}

export { PILLARS };
