import { useState, useRef, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";
import AILabel from "../components/AILabel";
import CaseLightbox from "../components/CaseLightbox";
import { CASES, SITE, findCase } from "../content/site-data";
import GrowthSystemLayer from "../components/GrowthSystemLayer";
import { getGrowthData } from "../content/growth-system-data";

interface CaseContent {
  category: string;
  tagline: string;
  description: string;
  aesthetics: string[];
  story: { context: string; strategy: string; execution: string };
  metrics: { value: string; label: string; note?: string }[];
  quotes: { text: string; attribution: string }[];
  learnings: string[];
}

// Clip-path slide-up reveal — the Parsons / Baillat Studio pattern
const clipReveal = (delay = 0) => ({
  initial: { clipPath: "inset(100% 0 0 0)" },
  whileInView: { clipPath: "inset(0% 0 0 0)" },
  viewport: { once: true, margin: "-60px" },
  transition: {
    duration: 1.1,
    delay,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
});

// Standard whileInView fade+rise
const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: {
    duration: 0.85,
    delay,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
});

export default function CaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation("cases");
  const d = (key: string) => t(`detail.${key}`);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragWidth, setDragWidth] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const galleryOuterRef = useRef<HTMLDivElement>(null);
  const galleryInnerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  // Global page progress → left-edge reading line
  const { scrollYProgress } = useScroll();

  // Hero parallax
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(heroProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);

  // Metrics entrance
  const metricsVisible = useInView(metricsRef, { once: true, margin: "-100px" });

  // Drag gallery measurement
  useEffect(() => {
    const measure = () => {
      if (galleryOuterRef.current && galleryInnerRef.current) {
        setDragWidth(
          Math.max(0, galleryInnerRef.current.scrollWidth - galleryOuterRef.current.offsetWidth)
        );
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const project = findCase(id ?? "");
  if (!project) return <Navigate to="/cases" replace />;
  const growthData = getGrowthData(project.id);

  const content = t(`content.${project.id}`, { returnObjects: true }) as unknown as CaseContent;
  const currentIndex = CASES.findIndex((c) => c.id === project.id);
  const nextCase = CASES[(currentIndex + 1) % CASES.length];
  const nextContent = t(`content.${nextCase.id}`, { returnObjects: true }) as unknown as { category: string };
  const titleWords = project.title.split(" ");

  const caseLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: content.description,
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
    <main className="min-h-screen bg-transparent relative z-10 overflow-x-hidden">
      <SEO
        title={`${project.title} — ${content.category}`}
        description={content.description}
        pathname={`/cases/${project.id}`}
        jsonLd={[caseLd, breadcrumbLd]}
      />

      {/* ── Reading progress line (left edge) ────────────────────────── */}
      <motion.div
        className="fixed left-0 top-0 bottom-0 w-[2px] bg-accent z-9998 pointer-events-none origin-top"
        style={{ scaleY: scrollYProgress }}
      />

      {/* ═══════════════════════════════════════════════════════════════
          01 — PARALLAX HERO
      ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden flex items-end"
      >
        {/* Parallax background */}
        <motion.div
          className="absolute inset-0 scale-[1.18]"
          style={{ y: parallaxY }}
        >
          <img
            src={project.coverImage}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/60 to-bg/10" />
        <div className="absolute inset-0 bg-linear-to-r from-bg/25 to-transparent" />

        <AILabel variant={project.aiVariant} position="top-left" />

        {/* Funnel badge */}
        <div className="absolute top-28 right-6 md:right-10 z-10">
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] border border-accent/30 text-accent px-3 py-2 block">
            {d("funnelRoleLabel")} · {project.funnelRole}
          </span>
        </div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-28 left-6 md:left-10 lg:left-16 z-10"
        >
          <Link
            to="/cases"
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.35em] text-ink/45 hover:text-accent transition-colors"
          >
            <ArrowLeft size={12} />
            {d("backLabel")}
          </Link>
        </motion.div>

        {/* Hero content */}
        <motion.div
          className="relative z-10 w-full px-6 md:px-10 lg:px-16 pb-24 md:pb-32"
          style={{ opacity: heroOpacity }}
        >
          {/* Meta line */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.8 }}
            className="flex items-center gap-4 mb-8 flex-wrap"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="w-8 h-px bg-accent/40" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted">
              {project.year}
            </span>
            <span className="w-px h-4 bg-white/10" />
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
              {content.category}
            </span>
          </motion.div>

          {/* Word-split title — Baillat / Parsons pattern */}
          <h1 className="font-serif italic text-6xl md:text-8xl lg:text-[110px] xl:text-[130px] leading-[0.88] tracking-tight text-ink mb-10 max-w-5xl">
            {titleWords.map((word, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-bottom"
                style={{ marginRight: "0.22em" }}
              >
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%", rotate: 1.5 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{
                    delay: 0.32 + i * 0.09,
                    duration: 0.95,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52 + titleWords.length * 0.09, duration: 0.85 }}
            className="text-body-lg max-w-xl text-pretty font-light leading-relaxed"
          >
            {content.tagline}
          </motion.p>
        </motion.div>

        {/* Scroll chevron */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-ink/20" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          02 — OVERVIEW STRIP
      ═══════════════════════════════════════════════════════════════ */}
      <motion.section {...rise(0)} className="border-y border-white/6">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/6">
            <div className="py-10 md:pr-14">
              <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-muted mb-5">
                {d("aestheticLanguage")}
              </p>
              <div className="flex flex-wrap gap-2">
                {content.aesthetics.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] uppercase tracking-[0.3em] border border-white/10 px-2.5 py-1.5 text-ink/60 hover:border-accent/50 hover:text-accent transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="py-10 md:px-14">
              <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-muted mb-5">
                {d("productionMethod")}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-accent">
                {project.aiVariant === "assisted" ? d("aiAssisted") : d("aiGenerated")}
              </p>
            </div>

            <div className="py-10 md:pl-14">
              <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-muted mb-5">
                {d("studioLabel")}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/70">
                {SITE.name}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mt-2">
                {t("common:creativeDirection")} · {SITE.creativeDirection.name}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════════
          03 — DESCRIPTION  (large-serif editorial statement)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-40">
        <motion.div {...rise(0)}>
          <div className="gold-rule-left mb-12 w-16" />
        </motion.div>
        <div className="overflow-hidden">
          <motion.p
            {...clipReveal(0.1)}
            className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-[42px] leading-normal text-ink font-light text-pretty"
          >
            {content.description}
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          04 — STORY: CONTEXT
      ═══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-white/6 pt-24 md:pt-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <motion.p {...rise(0)} className="eyebrow mb-16">
            {d("storyLabel")}
          </motion.p>

          {/* Chapter header + text */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-20">
            <motion.div {...rise(0.05)} className="lg:col-span-2 pt-1">
              <span className="font-mono text-[10px] tracking-[0.55em] text-accent block">01</span>
              <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted mt-2 leading-loose">
                {d("contextLabel")}
              </p>
            </motion.div>
            <motion.div {...rise(0.1)} className="lg:col-span-9">
              <p className="text-xl md:text-2xl leading-[1.75] text-ink/80 font-light text-pretty">
                {content.story.context}
              </p>
            </motion.div>
          </div>

          {/* Full-width clip-reveal image */}
          {project.visuals[1] && (
            <div className="overflow-hidden">
              <motion.div {...clipReveal(0.05)} className="relative w-full aspect-video img-zoom">
                <img
                  src={project.visuals[1].src}
                  alt={project.visuals[1].alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          GHOST BREAK  (Max Shkret / DreamHaus pattern)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative h-[65vh] overflow-hidden mt-px border-t border-white/6">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1.03 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={project.coverImage}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-[0.18]"
            loading="lazy"
          />
        </motion.div>
        <div className="absolute inset-0 bg-bg/70" />

        {/* Ghost title */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <motion.p
            initial={{ opacity: 0, scale: 1.08 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4 }}
            className="font-serif italic leading-none text-ink select-none pointer-events-none text-center px-8"
            style={{ fontSize: "clamp(64px, 14vw, 200px)", opacity: 0.04 }}
          >
            {project.title}
          </motion.p>
        </div>

        {/* Chapter 02 label */}
        <div className="absolute bottom-10 left-6 md:left-10 lg:left-16 z-10">
          <motion.div {...rise(0.1)} className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.55em] text-accent">02</span>
            <span className="w-8 h-px bg-accent/30" />
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted">
              {d("strategyLabel")}
            </span>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          05 — STORY: STRATEGY  (image left, text right)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            {project.visuals[2] && (
              <div className="lg:col-span-7 overflow-hidden">
                <motion.div
                  {...clipReveal(0)}
                  className="relative aspect-4/3 img-zoom"
                >
                  <img
                    src={project.visuals[2].src}
                    alt={project.visuals[2].alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              </div>
            )}
            <motion.div
              {...rise(0.12)}
              className="lg:col-span-5 lg:pl-10"
            >
              <p className="text-xl md:text-2xl leading-[1.75] text-ink/80 font-light text-pretty">
                {content.story.strategy}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          06 — STORY: EXECUTION  (text left, image right + 2-up)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          {/* Chapter label */}
          <motion.div {...rise(0)} className="flex items-center gap-4 mb-16">
            <span className="font-mono text-[10px] tracking-[0.55em] text-accent">03</span>
            <span className="w-8 h-px bg-accent/30" />
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted">
              {d("executionLabel")}
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center mb-px">
            <motion.div
              {...rise(0.05)}
              className="lg:col-span-5 lg:pr-10"
            >
              <p className="text-xl md:text-2xl leading-[1.75] text-ink/80 font-light text-pretty">
                {content.story.execution}
              </p>
            </motion.div>

            {project.visuals[3] && (
              <div className="lg:col-span-7 overflow-hidden">
                <motion.div
                  {...clipReveal(0.1)}
                  className="relative aspect-4/3 img-zoom"
                >
                  <img
                    src={project.visuals[3].src}
                    alt={project.visuals[3].alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              </div>
            )}
          </div>

          {/* 2-up final images */}
          {project.visuals.length >= 6 && (
            <div className="grid grid-cols-2 gap-px mt-px overflow-hidden">
              {project.visuals.slice(4, 6).map((v, i) => (
                <div key={v.src} className="overflow-hidden">
                  <motion.div
                    {...clipReveal(i * 0.12)}
                    className="relative aspect-square img-zoom"
                  >
                    <img
                      src={v.src}
                      alt={v.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          07 — GALLERY  (drag carousel — Juicebrothers pattern)
      ═══════════════════════════════════════════════════════════════ */}
      {project.visuals.length > 0 && (
        <section className="border-t border-white/6 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 mb-10 flex items-baseline justify-between gap-4 flex-wrap">
            <motion.p {...rise(0)} className="eyebrow">
              {d("galleryLabel")}
            </motion.p>
            <span className="font-mono text-[10px] tracking-[0.4em] text-muted">
              {String(project.visuals.length).padStart(2, "0")} {d("galleryLabel").toLowerCase().split(" ")[0]}
            </span>
          </div>

          {/* Drag track */}
          <motion.div {...rise(0.05)}>
            <div
              ref={galleryOuterRef}
              className="overflow-hidden px-6 md:px-10 lg:px-16"
            >
              <motion.div
                ref={galleryInnerRef}
                drag="x"
                dragConstraints={{ right: 0, left: -dragWidth }}
                dragElastic={0.06}
                dragMomentum={true}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
                className={`flex gap-3 w-max select-none pb-4 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
              >
                {project.visuals.map((v, i) => (
                  <motion.button
                    key={v.src}
                    type="button"
                    onClick={() => !isDragging && setLightboxIndex(i)}
                    whileHover={{ scale: 1.015 }}
                    transition={{ duration: 0.3 }}
                    className="relative shrink-0 w-56 md:w-72 lg:w-80 aspect-square overflow-hidden border border-white/6 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent group"
                    aria-label={v.alt}
                  >
                    <img
                      src={v.src}
                      alt={v.alt}
                      className="w-full h-full object-cover transition-transform duration-1200 ease-out group-hover:scale-[1.05]"
                      loading="lazy"
                      draggable={false}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-bg/0 group-hover:bg-bg/15 transition-colors duration-500" />
                    {/* Index badge */}
                    <div className="absolute bottom-3 right-3 font-mono text-[9px] tracking-[0.35em] text-ink/60 bg-bg/80 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {String(i + 1).padStart(2, "0")} / {String(project.visuals.length).padStart(2, "0")}
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Drag hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="px-6 md:px-10 lg:px-16 mt-4"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted/50">
              {d("dragHint")}
            </p>
          </motion.div>

          <AnimatePresence>
            {lightboxIndex !== null && (
              <CaseLightbox
                visuals={project.visuals}
                index={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
                onNavigate={setLightboxIndex}
                labelClose={d("lightboxClose")}
                labelPrev={d("lightboxPrev")}
                labelNext={d("lightboxNext")}
              />
            )}
          </AnimatePresence>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          08 — METRICS  (blur-to-sharp entrance)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-white/6 py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <motion.div {...rise(0)} className="flex items-baseline justify-between mb-16 flex-wrap gap-4">
            <p className="eyebrow">{d("metricsLabel")}</p>
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted">
              {d("funnelRoleLabel")} · {project.funnelRole}
            </span>
          </motion.div>

          <div
            ref={metricsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/6"
          >
            {content.metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 36, filter: "blur(14px)" }}
                animate={
                  metricsVisible
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 36, filter: "blur(14px)" }
                }
                transition={{
                  duration: 1,
                  delay: i * 0.14,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-bg p-8 lg:p-14"
              >
                {/* Giant number */}
                <p className="font-serif italic text-6xl md:text-7xl lg:text-8xl text-ink mb-4 leading-none tracking-tight">
                  {m.value}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-accent mb-3">
                  {m.label}
                </p>
                {m.note && (
                  <p className="text-[12px] text-muted font-light leading-relaxed max-w-[18ch]">
                    {m.note}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          09 — QUOTES  (cinematic — full-height, giant type)
      ═══════════════════════════════════════════════════════════════ */}
      {content.quotes.length > 0 && (
        <section className="relative overflow-hidden border-t border-white/6">
          {/* Ghost background */}
          <div className="absolute inset-0">
            <img
              src={project.coverImage}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover opacity-[0.06]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-bg/90" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 py-36 md:py-52">
            {/* Top rule */}
            <motion.div {...rise(0)} className="flex items-center justify-center mb-16">
              <div className="gold-rule w-12" />
            </motion.div>

            <motion.p {...rise(0.05)} className="eyebrow text-center mb-20">
              {d("quotesLabel")}
            </motion.p>

            <div className="space-y-28 md:space-y-40">
              {content.quotes.map((q, i) => (
                <motion.figure
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 1.1,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-center"
                >
                  <blockquote className="font-serif italic text-[clamp(26px,4.5vw,64px)] leading-tight text-ink text-balance mb-10">
                    &ldquo;{q.text}&rdquo;
                  </blockquote>
                  <figcaption className="font-mono text-[10px] uppercase tracking-[0.5em] text-muted">
                    — {q.attribution}
                  </figcaption>
                </motion.figure>
              ))}
            </div>

            {/* Bottom rule */}
            <motion.div {...rise(0.1)} className="flex items-center justify-center mt-20">
              <div className="gold-rule w-12" />
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          10 — LEARNINGS  (Obys Agency numbered list pattern)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-white/6 py-24 md:py-36">
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
          <motion.p {...rise(0)} className="eyebrow mb-14">
            {d("learningsLabel")}
          </motion.p>

          <ul className="divide-y divide-white/6 border-y border-white/6">
            {content.learnings.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.85,
                  delay: i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="grid grid-cols-[auto_1fr] gap-8 md:gap-16 items-start py-9 md:py-11"
              >
                <span className="font-mono text-[10px] tracking-[0.55em] text-accent pt-1.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-xl md:text-2xl leading-[1.65] text-ink/80 font-light text-pretty">
                  {item}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          11 — GROWTH SYSTEM LAYER
      ═══════════════════════════════════════════════════════════════ */}
      {growthData && (
        <GrowthSystemLayer data={growthData} t={d} />
      )}

      {/* ═══════════════════════════════════════════════════════════════
          12 — CONVERSION CTA  (inline — after growth layer, before next case)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-white/6 py-24 md:py-36">
        <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-16 text-center">
          <motion.div {...rise(0)}>
            <div className="gold-rule mx-auto mb-12 max-w-[40px]" />
            <p className="eyebrow mb-6">{d("caseCtaEyebrow")}</p>
          </motion.div>

          <motion.h2
            {...rise(0.08)}
            className="font-serif italic text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-ink mb-8 text-balance"
          >
            {d("caseCtaHeadline")}
          </motion.h2>

          <motion.p
            {...rise(0.14)}
            className="text-body max-w-xl mx-auto text-pretty leading-relaxed mb-12"
          >
            {d("caseCtaBody")}
          </motion.p>

          <motion.div
            {...rise(0.2)}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link to="/kontakt" className="btn-primary">
              {d("caseCtaLink")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/pakete"
              className="btn-ghost"
            >
              {d("caseCtaPackages")}
            </Link>
          </motion.div>

          <motion.div {...rise(0.25)} className="mt-14">
            <div className="gold-rule mx-auto max-w-[40px]" />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          12 — NEXT CASE  (cinematic hover reveal)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-white/6">
        <Link
          to={`/cases/${nextCase.id}`}
          className="group block relative overflow-hidden"
        >
          {/* Hover background reveal */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={nextCase.coverImage}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover opacity-0 group-hover:opacity-[0.1] scale-[1.04] group-hover:scale-100 transition-all duration-1000 ease-out"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-r from-bg/90 to-bg/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-28 md:py-40 flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
            <div>
              <p className="eyebrow mb-5">{d("nextCase")}</p>
              <h2 className="font-serif italic leading-[0.88] tracking-tight text-ink group-hover:text-accent transition-colors duration-700 mb-5"
                  style={{ fontSize: "clamp(48px, 8vw, 120px)" }}>
                {nextCase.title}
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-muted">
                {nextContent.category}
              </p>
            </div>

            <div className="flex items-center gap-5 shrink-0">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
                {d("viewLabel")}
              </span>
              <div className="w-16 h-16 border border-white/15 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                <ArrowRight className="w-5 h-5 text-ink group-hover:text-bg transition-colors" />
              </div>
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
