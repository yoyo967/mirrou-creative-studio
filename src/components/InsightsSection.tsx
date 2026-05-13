import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PILLARS, clustersByPillar } from "../content/site-data";

export default function InsightsSection() {
  const { t } = useTranslation("blog");
  const featured = PILLARS[0];
  const others = PILLARS.slice(1);
  const featuredClusters = clustersByPillar(featured.slug).length;
  const totalClusters = PILLARS.reduce(
    (sum, p) => sum + clustersByPillar(p.slug).length,
    0,
  );

  return (
    <section
      id="insights"
      className="py-20 md:py-32 px-6 md:px-10 max-w-7xl mx-auto border-t border-white/6"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
        <div>
          <p className="eyebrow mb-5">{t("insights.sectionEyebrow")}</p>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05]">
            {t("insights.sectionHeadline")} <span className="italic opacity-50">{t("insights.sectionHeadlineAccent")}</span>
          </h2>
        </div>
        <p className="text-body max-w-md">
          {t("insights.totalClustersBody", { count: totalClusters })}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7"
        >
          <Link
            to={`/${featured.slug}`}
            className="group block border border-white/6 bg-surface/40 backdrop-blur-sm hover:bg-surface/70 transition-colors"
          >
            {featured.heroImage && (
              <div className="overflow-hidden">
                <img
                  src={featured.heroImage}
                  alt={featured.title}
                  className="w-full aspect-[16/9] object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            )}
            <div className="p-8 md:p-12">
              <p className="eyebrow mb-5">
                Pillar 01 · {featured.tagline}
              </p>
              <h3 className="font-serif italic text-3xl md:text-5xl leading-[1.1] mb-6 tracking-tight text-ink group-hover:text-accent transition-colors">
                {featured.title}
              </h3>
              <p className="text-body max-w-xl mb-8">{featured.description}</p>
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
                <span>{featuredClusters} Cluster · {t("insights.clusterReadMore")}</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </motion.div>

        <div className="lg:col-span-5 flex flex-col">
          <h4 className="eyebrow text-muted mb-6 pb-4 border-b border-white/6">
            {t("insights.otherPillarsLabel")}
          </h4>
          <div className="space-y-px bg-white/6 border border-white/6">
            {others.map((p, i) => {
              const count = clustersByPillar(p.slug).length;
              return (
                <Link
                  key={p.slug}
                  to={`/${p.slug}`}
                  className="block bg-bg p-6 lg:p-8 hover:bg-surface/50 group transition-colors"
                >
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="font-mono text-accent text-[11px] tracking-[0.4em]">
                      0{i + 2}
                    </span>
                    <span className="font-mono text-muted text-[10px] uppercase tracking-[0.3em]">
                      {count} Cluster
                    </span>
                  </div>
                  <h5 className="font-serif italic text-xl md:text-2xl text-ink group-hover:text-accent transition-colors">
                    {p.title}
                  </h5>
                  <p className="text-[14px] text-muted mt-2">{p.tagline}</p>
                </Link>
              );
            })}
          </div>

          <Link to="/blog" className="btn-ghost mt-8 self-start">
            {t("insights.allArticles")}
            <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
