import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";
import PressQuoteStrip from "../components/PressQuoteStrip";
import AILabel from "../components/AILabel";
import OptimizedImage from "../components/OptimizedImage";
import { CASES, SITE, type CaseProject } from "../content/site-data";

export default function CasesPage() {
  const { t } = useTranslation("cases");

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url + "/" },
      { "@type": "ListItem", position: 2, name: "Cases", item: SITE.url + "/cases" },
    ],
  };

  return (
    <main className="min-h-screen bg-transparent pt-40 pb-24 relative z-10">
      <SEO
        title={t("seo.title")}
        description={t("seo.description")}
        pathname="/cases"
        jsonLd={[breadcrumbLd]}
      />

      <header className="max-w-5xl mx-auto px-6 md:px-10 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <p className="eyebrow mb-6">{t("eyebrow")}</p>
          <h1 className="font-serif italic text-5xl md:text-7xl lg:text-[90px] leading-[0.95] tracking-tight">
            {t("pageHeadline")}
          </h1>
          <p className="text-body text-lg md:text-xl mt-8 max-w-2xl font-light leading-relaxed">
            {t("pageBody")}
          </p>
        </motion.div>
      </header>

      <PressQuoteStrip surface="cases" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-20">
        <div className="space-y-px">
          {CASES.map((c, i) => (
            <CaseRow key={c.id} project={c} index={i} />
          ))}
        </div>
      </div>

      <section className="max-w-5xl mx-auto px-6 md:px-10 mt-20">
        <div className="border-t border-white/6 pt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="eyebrow mb-4">{t("ctaEyebrow")}</p>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight tracking-tight">
              {t("ctaHeadline")}
              <br />
              <span className="italic text-accent">{t("ctaHeadlineAccent")}</span>
            </h2>
          </div>
          <Link to="/kontakt" className="btn-primary shrink-0">
            {t("ctaLink")}
          </Link>
        </div>
      </section>
    </main>
  );
}

function CaseRow({ project, index }: { project: CaseProject; index: number }) {
  const { t } = useTranslation("cases");
  const content = t(`content.${project.id}`, { returnObjects: true }) as unknown as {
    category: string;
    tagline: string;
    aesthetics: string[];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      <Link
        to={`/cases/${project.id}`}
        className="group block border border-white/6 overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="relative lg:col-span-6 aspect-video lg:aspect-auto lg:min-h-[360px] overflow-hidden">
            <OptimizedImage
              src={project.coverImage}
              alt={project.title}
              className="absolute inset-0 w-full h-full"
              imgClassName="transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-bg/40 hidden lg:block" />
            <AILabel variant={project.aiVariant} position="top-left" />
          </div>

          <div className="lg:col-span-6 p-8 md:p-10 lg:p-14 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-8 flex-wrap">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="w-6 h-px bg-accent/30" />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
                {project.year}
              </span>
              <span className="w-px h-4 bg-white/10 mx-1" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                {content.category}
              </span>
            </div>

            <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-ink group-hover:text-accent transition-colors duration-500 mb-6">
              {project.title}
            </h2>

            <p className="text-body text-[15px] leading-relaxed mb-8 max-w-lg">
              {content.tagline}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {content.aesthetics.map((tag: string) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] uppercase tracking-[0.35em] border border-white/10 px-2 py-1.5 text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-auto">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
                {t("viewCase")}
              </span>
              <div className="w-9 h-9 border border-white/15 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                <ArrowUpRight className="w-3.5 h-3.5 text-ink group-hover:text-bg transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
