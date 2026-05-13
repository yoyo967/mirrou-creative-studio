import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AILabel from "./AILabel";
import OptimizedImage from "./OptimizedImage";
import { CASES, type CaseProject } from "../content/site-data";

export default function WorkGrid() {
  const { t } = useTranslation("home");
  const [featured, ...rest] = CASES;

  return (
    <section
      id="work"
      className="py-20 md:py-32 px-6 md:px-10 max-w-7xl mx-auto relative"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
        <div>
          <p className="eyebrow mb-5">{t("work.eyebrow")}</p>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05]">
            {t("work.headline")} <span className="italic opacity-50">{t("work.headlineItalic")}</span>
          </h2>
        </div>
        <p className="text-body max-w-md">{t("work.body")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/6 border border-white/6">
        <CaseCard
          project={featured}
          className="lg:col-span-7 lg:row-span-2 aspect-5/4 lg:aspect-auto lg:min-h-[560px]"
        />
        {rest.map((p) => (
          <div key={p.id} className="contents">
            <CaseCard project={p} className="lg:col-span-5 aspect-video lg:aspect-12/5" />
          </div>
        ))}
      </div>
    </section>
  );
}

function CaseCard({ project, className = "" }: { project: CaseProject; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className={`group relative bg-bg overflow-hidden ${className}`}
    >
      <Link
        to={`/cases/${project.id}`}
        className="absolute inset-0 z-20"
        aria-label={project.title}
      >
        <span className="sr-only">{project.title}</span>
      </Link>

      <OptimizedImage
        src={project.coverImage}
        alt={project.title}
        className="absolute inset-0 w-full h-full"
        imgClassName="transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
        width={1600}
        height={1000}
      />
      <div className="absolute inset-0 bg-linear-to-t from-bg/95 via-bg/40 to-bg/10" />
      <AILabel variant={project.aiVariant} position="top-left" />

      <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 z-10 pointer-events-none">
        <div className="flex items-center gap-4 mb-5 flex-wrap">
          <span className="font-mono text-accent text-[10px] uppercase tracking-[0.32em]">
            {project.year}
          </span>
          <span className="w-6 h-px bg-accent/30" />
          <span className="font-mono text-muted text-[10px] uppercase tracking-[0.32em]">
            {project.category}
          </span>
        </div>

        <h3 className="font-serif italic text-3xl md:text-4xl lg:text-5xl text-ink leading-[1.1] tracking-tight mb-4 transition-colors group-hover:text-accent max-w-2xl">
          {project.title}
        </h3>

        <p className="text-body max-w-xl text-pretty text-[15px] leading-relaxed">
          {project.tagline}
        </p>
      </div>

      <div className="absolute top-0 right-0 p-6 md:p-8 z-10 pointer-events-none">
        <div className="w-11 h-11 border border-white/15 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
          <ArrowUpRight className="w-4 h-4 text-ink group-hover:text-bg transition-colors" />
        </div>
      </div>
    </motion.div>
  );
}
