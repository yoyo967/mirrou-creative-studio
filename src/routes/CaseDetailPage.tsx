import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";
import AILabel from "../components/AILabel";
import OptimizedImage from "../components/OptimizedImage";
import { CASES, SITE, findCase } from "../content/site-data";

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: {
    delay,
    duration: 0.9,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
});

export default function CaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation("cases");
  const d = (key: string) => t(`detail.${key}`);
  const project = findCase(id ?? "");

  if (!project) {
    return <Navigate to="/cases" replace />;
  }

  const currentIndex = CASES.findIndex((c) => c.id === project.id);
  const nextCase = CASES[(currentIndex + 1) % CASES.length];

  const caseLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    creator: { "@type": "Organization", name: SITE.name, url: SITE.url },
    dateCreated: project.year,
    image: `${SITE.url}${project.coverImage}`,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url + "/" },
      { "@type": "ListItem", position: 2, name: "Cases", item: SITE.url + "/cases" },
      { "@type": "ListItem", position: 3, name: project.title, item: `${SITE.url}/cases/${project.id}` },
    ],
  };

  return (
    <main className="min-h-screen bg-transparent relative z-10">
      <SEO
        title={`${project.title} — ${project.category}`}
        description={project.description}
        pathname={`/cases/${project.id}`}
        jsonLd={[caseLd, breadcrumbLd]}
      />

      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <OptimizedImage
          src={project.coverImage}
          alt={project.visuals[0]?.alt ?? project.title}
          className="absolute inset-0 w-full h-full"
          priority
        />
        <div className="img-overlay-dark" />
        <AILabel variant={project.aiVariant} position="top-left" />

        <motion.div
          {...reveal(0.1)}
          className="absolute top-28 left-6 md:left-10 lg:left-16 z-10"
        >
          <Link
            to="/cases"
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.35em] text-ink/60 hover:text-accent transition-colors"
          >
            <ArrowLeft size={12} />
            {d("backLabel")}
          </Link>
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 z-10 px-6 md:px-10 lg:px-16 pb-16 md:pb-20">
          <motion.div
            {...reveal(0.2)}
            className="flex items-center gap-4 mb-6 flex-wrap"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="w-8 h-px bg-accent/40" />
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
              {project.year}
            </span>
            <span className="w-px h-4 bg-white/10" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              {project.category}
            </span>
          </motion.div>

          <motion.h1
            {...reveal(0.35)}
            className="font-serif italic text-5xl md:text-7xl lg:text-[110px] leading-[0.9] tracking-tight text-ink mb-8"
          >
            {project.title}
          </motion.h1>

          <motion.p {...reveal(0.5)} className="text-body-lg max-w-2xl text-pretty">
            {project.tagline}
          </motion.p>
        </div>
      </section>

      <div className="mx-6 md:mx-10 lg:mx-16">
        <div className="gold-rule" />
      </div>

      <section className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
            >
              <p className="eyebrow mb-6">{d("theSystem")}</p>
              <p className="text-xl md:text-2xl leading-[1.6] text-ink font-light text-pretty">
                {project.description}
              </p>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-4 lg:col-start-9"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="space-y-8 border-l border-white/8 pl-8">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted mb-3">
                  {d("aestheticLanguage")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.aesthetics.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] uppercase tracking-[0.35em] border border-white/10 px-3 py-2 text-ink/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted mb-3">
                  {d("productionMethod")}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
                  {project.aiVariant === "assisted" ? d("aiAssisted") : d("aiGenerated")}
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted mb-3">
                  {d("studioLabel")}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/70">
                  Mirrou Creative Studio
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mt-1">
                  Creative Direction · {SITE.creativeDirection.name}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-16 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto">
          {project.visuals.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mb-px"
            >
              <div className="relative aspect-video overflow-hidden border border-white/6">
                <OptimizedImage
                  src={project.visuals[0].src}
                  alt={project.visuals[0].alt}
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </motion.div>
          )}

          {project.visuals.length > 1 && (
            <div className="grid grid-cols-2 gap-px">
              {project.visuals.slice(1).map((visual, idx) => (
                <motion.div
                  key={visual.src}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: idx * 0.08 }}
                  className="relative overflow-hidden border border-white/6 img-zoom"
                >
                  <OptimizedImage
                    src={visual.src}
                    alt={visual.alt}
                    className="aspect-square w-full h-full"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-white/6">
        <Link
          to={`/cases/${nextCase.id}`}
          className="group block relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700">
            <img
              src={nextCase.coverImage}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-28 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
            <div>
              <p className="eyebrow mb-4">{d("nextCase")}</p>
              <h2 className="font-serif italic text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-ink group-hover:text-accent transition-colors duration-500">
                {nextCase.title}
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted mt-4">
                {nextCase.category}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
                {d("viewLabel")}
              </span>
              <div className="w-12 h-12 border border-white/15 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                <ArrowRight className="w-4 h-4 text-ink group-hover:text-bg transition-colors" />
              </div>
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
