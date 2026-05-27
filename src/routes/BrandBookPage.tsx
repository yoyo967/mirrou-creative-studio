import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@/src/components/LocalizedLink";
import SEO from "../components/SEO";
import {
  Palette,
  Type,
  MessageSquare,
  Layout,
  Layers,
  ArrowRight,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Download,
} from "lucide-react";

/* ─── SVG Downloader Helper ───────────────────────────────────── */
function downloadSvgElement(id: string, filename: string) {
  const svgEl = document.getElementById(id);
  if (!svgEl) return;
  const clone = svgEl.cloneNode(true) as SVGElement;
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  const svgContent = clone.outerHTML;
  const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/* ─── Asset Download Button Component ─────────────────────────── */
function AssetDownloadButton({ svgId, filename }: { svgId: string; filename: string }) {
  return (
    <button
      onClick={() => downloadSvgElement(svgId, filename)}
      className="mt-3 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-accent hover:text-ink transition-colors border border-accent/20 hover:border-accent px-3 py-1.5"
    >
      <Download size={10} /> Download SVG
    </button>
  );
}

/* ─── Small utility: copy-to-clipboard swatch ─────────────────── */
function ColorSwatch({
  hex,
  name,
  role,
  rgb,
  cmyk,
  usage,
}: {
  hex: string;
  name: string;
  role: string;
  rgb: string;
  cmyk: string;
  usage: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="border border-white/8 bg-surface/40 overflow-hidden group">
      <div
        className="h-28 w-full transition-all duration-500 group-hover:scale-105 origin-center"
        style={{ backgroundColor: hex }}
      />
      <div className="p-6">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-accent mb-0.5">
              {role}
            </p>
            <p className="font-serif text-xl text-ink">{name}</p>
          </div>
          <button
            onClick={copy}
            className="mt-1 p-1.5 border border-white/10 hover:border-accent/50 transition-colors"
            title={`Copy ${hex}`}
          >
            {copied ? (
              <Check size={12} className="text-accent" />
            ) : (
              <Copy size={12} className="text-muted" />
            )}
          </button>
        </div>
        <div className="space-y-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/70">
            {hex}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            {rgb}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            {cmyk}
          </p>
        </div>
        <p className="text-[13px] text-muted leading-snug mt-4 border-t border-white/6 pt-4">
          {usage}
        </p>
      </div>
    </div>
  );
}

/* ─── Section anchor nav item ──────────────────────────────────── */
function NavItem({
  id,
  label,
  active,
}: {
  id: string;
  label: string;
  active: boolean;
}) {
  return (
    <a
      href={`#${id}`}
      className={`block font-mono text-[9px] uppercase tracking-[0.4em] py-2 border-l-2 pl-4 transition-all duration-300 ${
        active
          ? "border-accent text-accent"
          : "border-white/10 text-muted hover:text-ink hover:border-white/30"
      }`}
    >
      {label}
    </a>
  );
}

/* ─── Collapsible Do / Don't block ─────────────────────────────── */
function DosDonts({
  dos,
  donts,
  doLabel = "✓ Do",
  dontLabel = "✗ Don't",
}: {
  dos: string[];
  donts: string[];
  doLabel?: string;
  dontLabel?: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/6 border border-white/6">
      <div className="bg-bg p-8 lg:p-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-6">
          {doLabel}
        </p>
        <ul className="space-y-3">
          {dos.map((d) => (
            <li key={d} className="flex gap-3 text-body text-[14px] items-start">
              <span className="text-accent mt-0.5 shrink-0">→</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-surface/30 p-8 lg:p-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted mb-6">
          {dontLabel}
        </p>
        <ul className="space-y-3">
          {donts.map((d) => (
            <li key={d} className="flex gap-3 text-body text-[14px] items-start">
              <span className="text-muted/60 mt-0.5 shrink-0">×</span>
              <span className="line-through decoration-muted/40">{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── Before / After example ────────────────────────────────────── */
function BeforeAfter({
  label,
  before,
  after,
  beforeLabel = "✗ Vorher",
  afterLabel = "✓ Nachher",
}: {
  label: string;
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  return (
    <div className="border border-white/6 bg-surface/20">
      <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-accent px-6 pt-5 pb-0">
        {label}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/6">
        <div className="p-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-muted mb-3">
            {beforeLabel}
          </p>
          <p className="text-body text-[14px] leading-relaxed line-through decoration-white/20">
            {before}
          </p>
        </div>
        <div className="p-6 bg-accent/4">
          <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-accent mb-3">
            {afterLabel}
          </p>
          <p className="text-body text-[14px] leading-relaxed">
            {after}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main page ─────────────────────────────────────────────────── */
export default function BrandBookPage() {
  const { t: tSeo } = useTranslation("seo");
  const { t } = useTranslation("brandBook");
  const [activeSection, setActiveSection] = useState("foundation");
  const [tocOpen, setTocOpen] = useState(false);
  const [logoTheme, setLogoTheme] = useState<"dark" | "light">("dark");
  const [activePlatformTab, setActivePlatformTab] = useState("linkedin");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const sections = [
    { id: "foundation", label: t("sections.foundation") },
    { id: "personality", label: t("sections.personality") },
    { id: "visual", label: t("sections.visual") },
    { id: "messaging", label: t("sections.messaging") },
    { id: "application", label: t("sections.application") },
    { id: "assets", label: t("sections.assets") },
  ];

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    els.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-bg relative">
      <SEO
        title={tSeo("brandBook.title")}
        description={tSeo("brandBook.description")}
        pathname="/brand-book"
        noIndex={true}
      />

      {/* ── Sticky side-nav (desktop) ─────────────────────────────── */}
      <aside className="hidden xl:block fixed left-8 top-1/2 -translate-y-1/2 z-40 w-48">
        <div className="space-y-0.5">
          {sections.map((s) => (
            <NavItem key={s.id} {...s} active={activeSection === s.id} />
          ))}
        </div>
        <div className="mt-8 pl-4">
          <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-muted/50">
            {t("sideNav.confidential")}
          </p>
        </div>
      </aside>

      {/* ── Mobile TOC ────────────────────────────────────────────── */}
      <div className="xl:hidden sticky top-[68px] z-40 bg-bg/95 backdrop-blur-xl border-b border-white/6">
        <button
          onClick={() => setTocOpen(!tocOpen)}
          className="w-full flex items-center justify-between px-6 py-3"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
            {t("mobileToc.label")}
          </span>
          {tocOpen ? (
            <ChevronUp size={14} className="text-muted" />
          ) : (
            <ChevronDown size={14} className="text-muted" />
          )}
        </button>
        {tocOpen && (
          <div className="px-6 pb-4 space-y-1 border-t border-white/6 pt-3">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setTocOpen(false)}
                className={`block font-mono text-[10px] uppercase tracking-[0.35em] py-1.5 transition-colors ${
                  activeSection === s.id ? "text-accent" : "text-muted"
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 xl:pl-16">
        {/* ═══════════════════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════════════════ */}
        <section className="pt-36 pb-24 border-b border-white/6">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-px bg-accent/60" />
            <p className="eyebrow">{t("hero.eyebrow")}</p>
            <span className="w-12 h-px bg-accent/60" />
          </div>
          <h1 className="display-xl font-serif italic leading-[0.9] tracking-[-0.03em] text-ink mb-8">
            {t("hero.h1line1")}
            <br />
            <span className="text-accent">{t("hero.h1accent")}</span>
          </h1>
          <p className="text-body-lg max-w-2xl mb-6">
            {t("hero.body")}
          </p>
          <p className="text-body max-w-2xl">
            <strong className="text-ink">{t("hero.audienceLabel")}</strong>{" "}
            {t("hero.audience")}
          </p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/6 pt-10">
            {[
              { n: t("hero.metaVersion"), v: t("hero.metaVersionValue") },
              { n: t("hero.metaStatus"), v: t("hero.metaStatusValue") },
              { n: t("hero.metaScope"), v: t("hero.metaScopeValue") },
              { n: t("hero.metaOwner"), v: t("hero.metaOwnerValue") },
            ].map((item) => (
              <div key={item.n}>
                <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted mb-1">
                  {item.n}
                </p>
                <p className="font-serif italic text-lg text-ink">{item.v}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 1 · BRAND FOUNDATION
        ═══════════════════════════════════════════════════════════ */}
        <section id="foundation" className="py-20 md:py-28 border-b border-white/6">
          {/* Section header */}
          <div className="flex items-baseline gap-5 mb-16">
            <span className="font-mono text-accent text-[11px] tracking-[0.4em]">01</span>
            <div>
              <Layers size={18} className="text-accent mb-3" strokeWidth={1.2} />
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.05]">
                {t("foundation.title")}
              </h2>
            </div>
          </div>

          {/* Name & Bedeutung */}
          <div className="mb-20">
            <p className="eyebrow mb-6">{t("foundation.nameMeaning.eyebrow")}</p>
            <div className="border border-white/8 bg-surface/30 p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <p className="font-serif italic text-5xl text-ink mb-6">Mirrou</p>
                  <p className="text-body leading-relaxed" dangerouslySetInnerHTML={{ __html: t("foundation.nameMeaning.nameExplain") }} />
                  <p className="text-body mt-4 leading-relaxed">
                    {t("foundation.nameMeaning.metaphor")}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="border-l-2 border-accent/40 pl-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-1">
                      {t("foundation.nameMeaning.phoneticLabel")}
                    </p>
                    <p className="text-body">
                      {t("foundation.nameMeaning.phonetic")}
                    </p>
                  </div>
                  <div className="border-l-2 border-accent/40 pl-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-1">
                      {t("foundation.nameMeaning.spellingLabel")}
                    </p>
                    <p className="text-body" dangerouslySetInnerHTML={{ __html: t("foundation.nameMeaning.spelling") }} />
                  </div>
                  <div className="border-l-2 border-accent/40 pl-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-1">
                      {t("foundation.nameMeaning.studioLabel")}
                    </p>
                    <p className="text-body" dangerouslySetInnerHTML={{ __html: t("foundation.nameMeaning.studio") }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission, Vision, Promise, Positioning */}
          <div className="mb-20">
            <p className="eyebrow mb-6">{t("foundation.mvpp.eyebrow")}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/6 border border-white/6">
              {[
                { label: t("foundation.mvpp.mission.label"), n: "01", headline: t("foundation.mvpp.mission.headline"), body: t("foundation.mvpp.mission.body") },
                { label: t("foundation.mvpp.vision.label"), n: "02", headline: t("foundation.mvpp.vision.headline"), body: t("foundation.mvpp.vision.body") },
                { label: t("foundation.mvpp.promise.label"), n: "03", headline: t("foundation.mvpp.promise.headline"), body: t("foundation.mvpp.promise.body") },
                { label: t("foundation.mvpp.positioning.label"), n: "04", headline: t("foundation.mvpp.positioning.headline"), body: t("foundation.mvpp.positioning.body") },
              ].map((item) => (
                <div
                  key={item.n}
                  className="bg-bg p-8 lg:p-10 group hover:bg-surface/40 transition-colors"
                >
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="font-mono text-accent text-[11px] tracking-[0.4em]">
                      {item.n}
                    </span>
                    <span className="font-mono text-muted text-[10px] uppercase tracking-[0.32em]">
                      {item.label}
                    </span>
                  </div>
                  <h3 className="font-serif italic text-xl md:text-2xl leading-tight tracking-tight mb-4 group-hover:text-accent transition-colors">
                    {item.headline}
                  </h3>
                  <p className="text-body text-[14px]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Values */}
          <div>
            <p className="eyebrow mb-6">{t("foundation.values.eyebrow")}</p>
            <div className="space-y-px bg-white/6 border border-white/6">
              {[
                { n: "01", label: t("foundation.values.precision.label"), headline: t("foundation.values.precision.headline"), body: t("foundation.values.precision.body") },
                { n: "02", label: t("foundation.values.performance.label"), headline: t("foundation.values.performance.headline"), body: t("foundation.values.performance.body") },
                { n: "03", label: t("foundation.values.integrity.label"), headline: t("foundation.values.integrity.headline"), body: t("foundation.values.integrity.body") },
                { n: "04", label: t("foundation.values.independence.label"), headline: t("foundation.values.independence.headline"), body: t("foundation.values.independence.body") },
              ].map((v) => (
                <div
                  key={v.n}
                  className="bg-bg p-8 lg:p-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 hover:bg-surface/30 transition-colors"
                >
                  <div className="md:col-span-1">
                    <span className="font-mono text-accent text-[11px] tracking-[0.4em]">
                      {v.n}
                    </span>
                  </div>
                  <div className="md:col-span-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted mb-2">
                      {v.label}
                    </p>
                    <p className="font-serif italic text-xl text-ink">{v.headline}</p>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-body">{v.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 2 · BRAND PERSONALITY & VOICE
        ═══════════════════════════════════════════════════════════ */}
        <section id="personality" className="py-20 md:py-28 border-b border-white/6">
          <div className="flex items-baseline gap-5 mb-16">
            <span className="font-mono text-accent text-[11px] tracking-[0.4em]">02</span>
            <div>
              <MessageSquare size={18} className="text-accent mb-3" strokeWidth={1.2} />
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.05]">
                {t("personality.title")}
              </h2>
            </div>
          </div>

          {/* Brand Personality */}
          <div className="mb-20">
            <p className="eyebrow mb-6">{t("personality.traits.eyebrow")}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/6 border border-white/6">
              {[
                { adj: t("personality.traits.precise.adj"), body: t("personality.traits.precise.body") },
                { adj: t("personality.traits.direct.adj"), body: t("personality.traits.direct.body") },
                { adj: t("personality.traits.editorial.adj"), body: t("personality.traits.editorial.body") },
                { adj: t("personality.traits.techCreative.adj"), body: t("personality.traits.techCreative.body") },
                { adj: t("personality.traits.confident.adj"), body: t("personality.traits.confident.body") },
              ].map((p, i) => (
                <div key={p.adj} className={`bg-bg p-8 ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}>
                  <p className="font-serif italic text-3xl text-accent mb-4">{p.adj}</p>
                  <p className="text-body text-[14px]">{p.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tone of Voice Principles */}
          <div className="mb-20">
            <p className="eyebrow mb-6">{t("personality.toneOfVoice.eyebrow")}</p>
            <div className="space-y-px bg-white/6 border border-white/6">
              {[
                { n: "01", principle: t("personality.toneOfVoice.p01.principle"), body: t("personality.toneOfVoice.p01.body") },
                { n: "02", principle: t("personality.toneOfVoice.p02.principle"), body: t("personality.toneOfVoice.p02.body") },
                { n: "03", principle: t("personality.toneOfVoice.p03.principle"), body: t("personality.toneOfVoice.p03.body") },
                { n: "04", principle: t("personality.toneOfVoice.p04.principle"), body: t("personality.toneOfVoice.p04.body") },
                { n: "05", principle: t("personality.toneOfVoice.p05.principle"), body: t("personality.toneOfVoice.p05.body") },
              ].map((p) => (
                <div key={p.n} className="bg-bg p-7 md:p-10 grid grid-cols-12 gap-6 hover:bg-surface/30 transition-colors">
                  <span className="col-span-1 font-mono text-accent text-[11px] tracking-[0.4em] mt-0.5">
                    {p.n}
                  </span>
                  <div className="col-span-11 md:col-span-11">
                    <p className="font-serif italic text-xl text-ink mb-2">{p.principle}</p>
                    <p className="text-body text-[14px]">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wie Mirrou klingt / klingt nicht */}
          <div className="mb-20">
            <p className="eyebrow mb-6">{t("personality.dosDonts.eyebrow")}</p>
            <DosDonts
              dos={t("personality.dosDonts.dos", { returnObjects: true }) as string[]}
              donts={t("personality.dosDonts.donts", { returnObjects: true }) as string[]}
              doLabel={t("personality.dosDonts.doLabel")}
              dontLabel={t("personality.dosDonts.dontLabel")}
            />
          </div>

          {/* Vorher / Nachher */}
          <div className="mb-20">
            <p className="eyebrow mb-6">{t("personality.beforeAfter.eyebrow")}</p>
            <div className="space-y-3">
              <BeforeAfter
                label={t("personality.beforeAfter.example1.label")}
                before={t("personality.beforeAfter.example1.before")}
                after={t("personality.beforeAfter.example1.after")}
                beforeLabel={t("personality.beforeAfter.beforeLabel")}
                afterLabel={t("personality.beforeAfter.afterLabel")}
              />
              <BeforeAfter
                label={t("personality.beforeAfter.example2.label")}
                before={t("personality.beforeAfter.example2.before")}
                after={t("personality.beforeAfter.example2.after")}
                beforeLabel={t("personality.beforeAfter.beforeLabel")}
                afterLabel={t("personality.beforeAfter.afterLabel")}
              />
              <BeforeAfter
                label={t("personality.beforeAfter.example3.label")}
                before={t("personality.beforeAfter.example3.before")}
                after={t("personality.beforeAfter.example3.after")}
                beforeLabel={t("personality.beforeAfter.beforeLabel")}
                afterLabel={t("personality.beforeAfter.afterLabel")}
              />
            </div>
          </div>

          {/* Verbotene Wörter */}
          <div>
            <p className="eyebrow mb-6">{t("personality.forbiddenWords.eyebrow")}</p>
            <div className="border border-white/6 bg-surface/20 p-8 md:p-10">
              <p className="text-body mb-6">
                {t("personality.forbiddenWords.intro")}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {(t("personality.forbiddenWords.words", { returnObjects: true }) as string[]).map((w) => (
                  <div
                    key={w}
                    className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted/60 py-2 px-3 border border-white/6 line-through decoration-muted/30"
                  >
                    {w}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 3 · VISUAL IDENTITY SYSTEM
        ═══════════════════════════════════════════════════════════ */}
        <section id="visual" className="py-20 md:py-28 border-b border-white/6">
          <div className="flex items-baseline gap-5 mb-16">
            <span className="font-mono text-accent text-[11px] tracking-[0.4em]">03</span>
            <div>
              <Palette size={18} className="text-accent mb-3" strokeWidth={1.2} />
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.05]">
                {t("visual.title")}
              </h2>
            </div>
          </div>

          {/* Farbsystem */}
          <div className="mb-20">
            <p className="eyebrow mb-6">{t("visual.colors.eyebrow")}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <ColorSwatch
                hex="#080808"
                name={t("visual.colors.voidBlack.name")}
                role={t("visual.colors.voidBlack.role")}
                rgb="RGB 8 / 8 / 8"
                cmyk="C0 M0 Y0 K97"
                usage={t("visual.colors.voidBlack.usage")}
              />
              <ColorSwatch
                hex="#C8A25A"
                name={t("visual.colors.studioGold.name")}
                role={t("visual.colors.studioGold.role")}
                rgb="RGB 200 / 162 / 90"
                cmyk="C0 M19 Y55 K22"
                usage={t("visual.colors.studioGold.usage")}
              />
              <ColorSwatch
                hex="#F2EFE9"
                name={t("visual.colors.creamWhite.name")}
                role={t("visual.colors.creamWhite.role")}
                rgb="RGB 242 / 239 / 233"
                cmyk="C0 M1 Y4 K5"
                usage={t("visual.colors.creamWhite.usage")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <ColorSwatch
                hex="#111113"
                name={t("visual.colors.surface.name")}
                role={t("visual.colors.surface.role")}
                rgb="RGB 17 / 17 / 19"
                cmyk="C11 M11 Y0 K93"
                usage={t("visual.colors.surface.usage")}
              />
              <ColorSwatch
                hex="#E4C07A"
                name={t("visual.colors.goldLight.name")}
                role={t("visual.colors.goldLight.role")}
                rgb="RGB 228 / 192 / 122"
                cmyk="C0 M16 Y46 K11"
                usage={t("visual.colors.goldLight.usage")}
              />
              <ColorSwatch
                hex="#6E6B66"
                name={t("visual.colors.muted.name")}
                role={t("visual.colors.muted.role")}
                rgb="RGB 110 / 107 / 102"
                cmyk="C0 M3 Y7 K57"
                usage={t("visual.colors.muted.usage")}
              />
            </div>

            <div className="border border-white/6 bg-surface/20 p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-5">
                {t("visual.colors.rulesLabel")}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-2">
                  {(t("visual.colors.rulesDo", { returnObjects: true }) as string[]).map((r) => (
                    <li key={r} className="flex gap-3 text-body text-[13px] items-start">
                      <span className="text-accent mt-0.5 shrink-0">→</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2">
                  {(t("visual.colors.rulesDont", { returnObjects: true }) as string[]).map((r) => (
                    <li key={r} className="flex gap-3 text-body text-[13px] items-start">
                      <span className="text-muted/60 mt-0.5 shrink-0">×</span>
                      <span className="text-muted/80">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Typografie */}
          <div className="mb-20">
            <p className="eyebrow mb-6">{t("visual.typography.eyebrow")}</p>
            <div className="space-y-px bg-white/6 border border-white/6">
              {[
                {
                  n: "01",
                  role: t("visual.typography.primary.role"),
                  name: "Cormorant Garamond",
                  style: "Italic, Weight 300",
                  usage: t("visual.typography.primary.usage"),
                  example: "Algorithm of Soul.",
                  exClass: "font-serif italic text-5xl",
                  spec: "Size: 72–220px clamp · Leading: 0.88 · Tracking: –0.03em",
                },
                {
                  n: "02",
                  role: t("visual.typography.secondary.role"),
                  name: "JetBrains Mono",
                  style: "Weight 400–600, UPPERCASE",
                  usage: t("visual.typography.secondary.usage"),
                  example: "PERFORMANCE CREATIVE · DACH",
                  exClass: "font-mono text-sm uppercase tracking-[0.4em]",
                  spec: "Size: 9–12px · Tracking: 0.35–0.55em · immer UPPERCASE",
                },
                {
                  n: "03",
                  role: t("visual.typography.tertiary.role"),
                  name: "Inter",
                  style: "Weight 300, Regular",
                  usage: t("visual.typography.tertiary.usage"),
                  example: "Editorial-grade Visuals. Systematisches A/B-Testing.",
                  exClass: "font-sans text-body",
                  spec: "Size: 17–21px · Leading: 1.7 · Tracking: normal",
                },
              ].map((typo) => (
                <div key={typo.n} className="bg-bg p-8 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                    <div className="lg:col-span-4">
                      <div className="flex items-baseline gap-4 mb-4">
                        <span className="font-mono text-accent text-[11px] tracking-[0.4em]">
                          {typo.n}
                        </span>
                        <span className="font-mono text-muted text-[10px] uppercase tracking-[0.32em]">
                          {typo.role}
                        </span>
                      </div>
                      <p className="font-serif text-xl text-ink mb-1">{typo.name}</p>
                      <p className="font-mono text-[10px] text-muted uppercase tracking-[0.3em] mb-3">
                        {typo.style}
                      </p>
                      <p className="text-body text-[13px]">{typo.usage}</p>
                    </div>
                    <div className="lg:col-span-8">
                      <p className={`${typo.exClass} text-ink mb-6 leading-tight`}>
                        {typo.example}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted border-t border-white/6 pt-4">
                        {typo.spec}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Type Scale */}
            <div className="mt-4 border border-white/6 bg-surface/20 p-8 md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-6">
                {t("visual.typography.scaleLabel")}
              </p>
              <div className="space-y-4">
                {[
                  { label: "Display Hero", size: "72–220px", example: "Ästhetik", cls: "font-serif italic text-5xl md:text-7xl" },
                  { label: "Display XL", size: "52–140px", example: "Algorithm", cls: "font-serif italic text-4xl md:text-6xl" },
                  { label: "H2 · Section", size: "32–64px", example: "Brand Foundation", cls: "font-serif text-3xl md:text-5xl" },
                  { label: "H3 · Card", size: "22–32px", example: "Drei Disziplinen. Ein System.", cls: "font-serif text-2xl" },
                  { label: "Body LG", size: "18–21px", example: "Performance Creatives für D2C Brands.", cls: "text-body-lg" },
                  { label: "Body", size: "17–18px", example: "Editorial-grade Visuals. Systematisches A/B-Testing.", cls: "text-body" },
                  { label: "Eyebrow", size: "10px", example: "PERFORMANCE CREATIVE · DACH", cls: "eyebrow" },
                ].map((scale) => (
                  <div key={scale.label} className="grid grid-cols-12 gap-4 items-baseline border-b border-white/4 pb-4">
                    <div className="col-span-3">
                      <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-muted">{scale.label}</p>
                      <p className="font-mono text-[9px] text-muted/50">{scale.size}</p>
                    </div>
                    <div className="col-span-9">
                      <p className={scale.cls}>{scale.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Logo & Wortmarke */}
          <div className="mb-20">
            <p className="eyebrow mb-6">{t("visual.logo.eyebrow")}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-white/8 bg-surface/30 p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-6">
                  {t("visual.logo.primaryLabel")}
                </p>
                <div className="flex flex-col mb-8">
                  <span className="font-mono text-3xl uppercase tracking-[0.5em] font-bold text-ink">
                    MIRROU
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted mt-1">
                    Creative Studio
                  </span>
                </div>
                <ul className="space-y-2">
                  {(t("visual.logo.logoRules", { returnObjects: true }) as string[]).map((r) => (
                    <li key={r} className="flex gap-3 text-[13px] text-body items-start">
                      <span className="text-accent shrink-0 mt-0.5">→</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-white/8 bg-surface/30 p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted mb-6">
                  {t("visual.logo.forbiddenLabel")}
                </p>
                <ul className="space-y-2">
                  {(t("visual.logo.forbiddenRules", { returnObjects: true }) as string[]).map((r) => (
                    <li key={r} className="flex gap-3 text-[13px] text-muted items-start">
                      <span className="text-muted/60 shrink-0 mt-0.5">×</span>
                      <span className="line-through decoration-muted/30">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bildsprache */}
          <div className="mb-20">
            <p className="eyebrow mb-6">{t("visual.imagery.eyebrow")}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/6 border border-white/6">
              {[
                {
                  n: "01",
                  label: t("visual.imagery.editorialLabel"),
                  items: t("visual.imagery.editorialItems", { returnObjects: true }) as string[],
                },
                {
                  n: "02",
                  label: t("visual.imagery.aiLabel"),
                  items: t("visual.imagery.aiItems", { returnObjects: true }) as string[],
                },
                {
                  n: "03",
                  label: t("visual.imagery.forbiddenLabel"),
                  items: t("visual.imagery.forbiddenItems", { returnObjects: true }) as string[],
                },
              ].map((cat) => (
                <div key={cat.n} className="bg-bg p-8 lg:p-10">
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="font-mono text-accent text-[11px] tracking-[0.4em]">
                      {cat.n}
                    </span>
                    <span className="font-mono text-muted text-[10px] uppercase tracking-[0.28em]">
                      {cat.label}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li key={item} className="flex gap-3 text-body text-[13px] items-start">
                        <span
                          className={
                            cat.n === "03" ? "text-muted/50 mt-0.5 shrink-0" : "text-accent mt-0.5 shrink-0"
                          }
                        >
                          {cat.n === "03" ? "×" : "→"}
                        </span>
                        <span
                          className={cat.n === "03" ? "line-through decoration-muted/30 text-muted" : ""}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Motion */}
          <div>
            <p className="eyebrow mb-6">{t("visual.motion.eyebrow")}</p>
            <div className="border border-white/6 bg-surface/20 p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-4">
                    {t("visual.motion.doLabel")}
                  </p>
                  <ul className="space-y-3">
                    {(t("visual.motion.doItems", { returnObjects: true }) as string[]).map((r) => (
                      <li key={r} className="flex gap-3 text-body text-[13px] items-start">
                        <span className="text-accent mt-0.5 shrink-0">→</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted mb-4">
                    {t("visual.motion.dontLabel")}
                  </p>
                  <ul className="space-y-3">
                    {(t("visual.motion.dontItems", { returnObjects: true }) as string[]).map((r) => (
                      <li key={r} className="flex gap-3 text-body text-[13px] items-start">
                        <span className="text-muted/50 mt-0.5 shrink-0">×</span>
                        <span className="text-muted">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 4 · MESSAGING FRAMEWORK
        ═══════════════════════════════════════════════════════════ */}
        <section id="messaging" className="py-20 md:py-28 border-b border-white/6">
          <div className="flex items-baseline gap-5 mb-16">
            <span className="font-mono text-accent text-[11px] tracking-[0.4em]">04</span>
            <div>
              <Layout size={18} className="text-accent mb-3" strokeWidth={1.2} />
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.05]">
                {t("messaging.title")}
              </h2>
            </div>
          </div>

          {/* Claims & Taglines */}
          <div className="mb-20">
            <p className="eyebrow mb-6">{t("messaging.claims.eyebrow")}</p>
            <div className="space-y-px bg-white/6 border border-white/6">
              {[
                {
                  claim: t("messaging.claims.algorithmOfSoul.claim"),
                  context: t("messaging.claims.algorithmOfSoul.context"),
                  body: t("messaging.claims.algorithmOfSoul.body"),
                  use: t("messaging.claims.algorithmOfSoul.use"),
                },
                {
                  claim: t("messaging.claims.mainTagline.claim"),
                  context: t("messaging.claims.mainTagline.context"),
                  body: t("messaging.claims.mainTagline.body"),
                  use: t("messaging.claims.mainTagline.use"),
                },
                {
                  claim: t("messaging.claims.performanceTagline.claim"),
                  context: t("messaging.claims.performanceTagline.context"),
                  body: t("messaging.claims.performanceTagline.body"),
                  use: t("messaging.claims.performanceTagline.use"),
                },
                {
                  claim: t("messaging.claims.enTagline.claim"),
                  context: t("messaging.claims.enTagline.context"),
                  body: t("messaging.claims.enTagline.body"),
                  use: t("messaging.claims.enTagline.use"),
                },
              ].map((cl) => (
                <div key={cl.claim} className="bg-bg p-8 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
                    <div className="lg:col-span-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted mb-2">
                        {cl.context}
                      </p>
                      <p className="font-serif italic text-2xl text-accent leading-tight">
                        {cl.claim}
                      </p>
                    </div>
                    <div className="lg:col-span-5">
                      <p className="text-body text-[14px]">{cl.body}</p>
                    </div>
                    <div className="lg:col-span-3">
                      <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-muted mb-2">
                        {t("messaging.claims.usageLabel")}
                      </p>
                      <p className="text-body text-[13px]">{cl.use}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Elevator Pitches */}
          <div className="mb-20">
            <p className="eyebrow mb-6">{t("messaging.pitches.eyebrow")}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/6 border border-white/6">
              {[
                { n: t("messaging.pitches.p30sec.duration"), label: t("messaging.pitches.p30sec.label"), body: t("messaging.pitches.p30sec.body") },
                { n: t("messaging.pitches.p60sec.duration"), label: t("messaging.pitches.p60sec.label"), body: t("messaging.pitches.p60sec.body") },
                { n: t("messaging.pitches.p3min.duration"), label: t("messaging.pitches.p3min.label"), body: t("messaging.pitches.p3min.body") },
              ].map((p) => (
                <div key={p.n} className="bg-bg p-8 lg:p-10">
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="font-mono text-accent text-[11px] tracking-[0.4em]">
                      {p.n}
                    </span>
                    <span className="font-mono text-muted text-[10px] uppercase tracking-[0.32em]">
                      {p.label}
                    </span>
                  </div>
                  <p className="text-body text-[14px] leading-relaxed whitespace-pre-line">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Messages per Audience */}
          <div className="mb-20">
            <p className="eyebrow mb-6">{t("messaging.keyMessages.eyebrow")}</p>
            <div className="space-y-px bg-white/6 border border-white/6">
              {[
                {
                  audience: t("messaging.keyMessages.founderCmo.audience"),
                  label: t("messaging.keyMessages.founderCmo.label"),
                  messages: t("messaging.keyMessages.founderCmo.messages", { returnObjects: true }) as string[],
                },
                {
                  audience: t("messaging.keyMessages.performanceManager.audience"),
                  label: t("messaging.keyMessages.performanceManager.label"),
                  messages: t("messaging.keyMessages.performanceManager.messages", { returnObjects: true }) as string[],
                },
                {
                  audience: t("messaging.keyMessages.investor.audience"),
                  label: t("messaging.keyMessages.investor.label"),
                  messages: t("messaging.keyMessages.investor.messages", { returnObjects: true }) as string[],
                },
                {
                  audience: t("messaging.keyMessages.talent.audience"),
                  label: t("messaging.keyMessages.talent.label"),
                  messages: t("messaging.keyMessages.talent.messages", { returnObjects: true }) as string[],
                },
              ].map((aud) => (
                <div key={aud.audience} className="bg-bg p-8 lg:p-10 grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-3">
                    <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted mb-2">
                      {aud.label}
                    </p>
                    <p className="font-serif italic text-xl text-ink">{aud.audience}</p>
                  </div>
                  <ul className="md:col-span-9 space-y-2">
                    {aud.messages.map((m) => (
                      <li key={m} className="flex gap-3 text-body text-[14px] items-start">
                        <span className="text-accent mt-0.5 shrink-0">→</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* SEO & Keywords */}
          <div>
            <p className="eyebrow mb-6">{t("messaging.seoKeywords.eyebrow")}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-white/6 bg-surface/20 p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-5">
                  {t("messaging.seoKeywords.topKeywordsLabel")}
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    "Mirrou Creative Studio",
                    "Performance Creative DACH",
                    "Performance Creative Beauty",
                    "Ad Creative Studio Hamburg",
                    "Creative Studio Beauty Health",
                    "KI Visuals D2C Brand",
                    "Algorithm of Soul",
                    "Olha Yevtushenko",
                    "Hybrid Photography AI",
                    "EU AI Act Creative Compliance",
                    "Creative Retainer D2C",
                    "Beauty Marketing Agentur DACH",
                    "Social Media Visuals Lifestyle",
                    "A/B Testing Creative Studio",
                    "Editorial Photography Performance",
                  ].map((kw, i) => (
                    <div key={kw} className="flex items-center gap-3">
                      <span className="font-mono text-[9px] text-muted/50 w-5 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/80">
                        {kw}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-white/6 bg-surface/20 p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-5">
                  {t("messaging.seoKeywords.metaTemplateLabel")}
                </p>
                <div className="space-y-5">
                  {[
                    {
                      type: t("messaging.seoKeywords.homepage.type"),
                      title: t("messaging.seoKeywords.homepage.title"),
                      desc: t("messaging.seoKeywords.homepage.desc"),
                    },
                    {
                      type: t("messaging.seoKeywords.servicePage.type"),
                      title: t("messaging.seoKeywords.servicePage.title"),
                      desc: t("messaging.seoKeywords.servicePage.desc"),
                    },
                    {
                      type: t("messaging.seoKeywords.casePage.type"),
                      title: t("messaging.seoKeywords.casePage.title"),
                      desc: t("messaging.seoKeywords.casePage.desc"),
                    },
                  ].map((tmpl) => (
                    <div key={tmpl.type} className="border-b border-white/6 pb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted mb-2">
                        {tmpl.type}
                      </p>
                      <p className="font-mono text-[10px] text-accent mb-1">{tmpl.title}</p>
                      <p className="text-body text-[12px] leading-relaxed">{tmpl.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 5 · APPLICATION GUIDELINES
        ═══════════════════════════════════════════════════════════ */}
        <section id="application" className="py-20 md:py-28">
          <div className="flex items-baseline gap-5 mb-16">
            <span className="font-mono text-accent text-[11px] tracking-[0.4em]">05</span>
            <div>
              <Type size={18} className="text-accent mb-3" strokeWidth={1.2} />
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.05]">
                {t("application.title")}
              </h2>
            </div>
          </div>

          {/* Website */}
          <div className="mb-20">
            <p className="eyebrow mb-6">{t("application.website.eyebrow")}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/6 border border-white/6">
              <div className="bg-bg p-8 lg:p-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-5">
                  {t("application.website.ctaLabel")}
                </p>
                <ul className="space-y-3">
                  {(t("application.website.ctaRules", { returnObjects: true }) as string[]).map((r) => (
                    <li key={r} className="flex gap-3 text-body text-[13px] items-start">
                      <span className="text-accent mt-0.5 shrink-0">→</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-bg p-8 lg:p-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-5">
                  {t("application.website.layoutLabel")}
                </p>
                <ul className="space-y-3">
                  {(t("application.website.layoutRules", { returnObjects: true }) as string[]).map((r) => (
                    <li key={r} className="flex gap-3 text-body text-[13px] items-start">
                      <span className="text-accent mt-0.5 shrink-0">→</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="mb-20">
            <p className="eyebrow mb-6">{t("application.social.eyebrow")}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/6 border border-white/6">
              {[
                {
                  platform: t("application.social.linkedin.platform"),
                  items: t("application.social.linkedin.items", { returnObjects: true }) as string[],
                },
                {
                  platform: t("application.social.instagram.platform"),
                  items: t("application.social.instagram.items", { returnObjects: true }) as string[],
                },
                {
                  platform: t("application.social.behance.platform"),
                  items: t("application.social.behance.items", { returnObjects: true }) as string[],
                },
              ].map((p) => (
                <div key={p.platform} className="bg-bg p-8">
                  <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-accent mb-5">
                    {p.platform}
                  </p>
                  <ul className="space-y-2">
                    {p.items.map((item) => (
                      <li key={item} className="flex gap-3 text-body text-[13px] items-start">
                        <span className="text-accent mt-0.5 shrink-0">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Präsentationen */}
          <div className="mb-20">
            <p className="eyebrow mb-6">{t("application.presentations.eyebrow")}</p>
            <div className="border border-white/6 bg-surface/20 p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-4">
                    {t("application.presentations.titleSlideLabel")}
                  </p>
                  <ul className="space-y-2">
                    {(t("application.presentations.titleSlideRules", { returnObjects: true }) as string[]).map((r) => (
                      <li key={r} className="text-body text-[13px] leading-snug">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-4">
                    {t("application.presentations.contentSlideLabel")}
                  </p>
                  <ul className="space-y-2">
                    {(t("application.presentations.contentSlideRules", { returnObjects: true }) as string[]).map((r) => (
                      <li key={r} className="text-body text-[13px] leading-snug">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-4">
                    {t("application.presentations.closingSlideLabel")}
                  </p>
                  <ul className="space-y-2">
                    {(t("application.presentations.closingSlideRules", { returnObjects: true }) as string[]).map((r) => (
                      <li key={r} className="text-body text-[13px] leading-snug">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* E-Mail Signatur */}
          <div>
            <p className="eyebrow mb-6">{t("application.emailSignature.eyebrow")}</p>
            <div className="border border-white/8 bg-surface/30 p-8 md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted mb-6">
                {t("application.emailSignature.templateLabel")}
              </p>
              <div className="bg-bg border border-white/6 p-8 font-mono text-[13px] leading-7 text-ink/80">
                <p className="text-ink font-semibold">{t("application.emailSignature.namePlaceholder")}</p>
                <p className="text-muted text-[11px] tracking-[0.2em] uppercase">
                  {t("application.emailSignature.rolePlaceholder")}
                </p>
                <br />
                <p>
                  <span className="text-accent">mirrou.studio</span>
                </p>
                <p>hallo@mirrou.studio</p>
                <br />
                <p className="text-muted text-[11px]">
                  {t("application.emailSignature.locationLine")}
                </p>
                <br />
                <p className="text-muted/60 text-[10px] uppercase tracking-[0.3em]">
                  {t("application.emailSignature.complianceLine")}
                </p>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-3">
                    {t("application.emailSignature.rulesLabel")}
                  </p>
                  <ul className="space-y-1">
                    {(t("application.emailSignature.rules", { returnObjects: true }) as string[]).map((r) => (
                      <li key={r} className="flex gap-2 text-body text-[13px] items-start">
                        <span className="text-accent mt-0.5 shrink-0">→</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted mb-3">
                    {t("application.emailSignature.optionalLabel")}
                  </p>
                  <ul className="space-y-1">
                    {(t("application.emailSignature.optionalItems", { returnObjects: true }) as string[]).map((r) => (
                      <li key={r} className="flex gap-2 text-body text-[13px] items-start">
                        <span className="text-muted/50 mt-0.5 shrink-0">+</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 6 · LOGO SYSTEM & SOCIAL MEDIA ASSETS
        ═══════════════════════════════════════════════════════════ */}
        <section id="assets" className="py-20 md:py-28 border-b border-white/6">
          <div className="flex items-baseline gap-5 mb-16">
            <span className="font-mono text-accent text-[11px] tracking-[0.4em]">06</span>
            <div>
              <Layout size={18} className="text-accent mb-3" strokeWidth={1.2} />
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.05]">
                {t("assets.title")}
              </h2>
            </div>
          </div>

          <div className="mb-16">
            <p className="eyebrow mb-6">{t("assets.overview.eyebrow")}</p>
            <div className="border border-white/8 bg-surface/30 p-8 md:p-12">
              <h3 className="font-serif italic text-2xl text-accent mb-4">
                {t("assets.overview.headline")}
              </h3>
              <p className="text-body max-w-3xl leading-relaxed mb-4">
                {t("assets.overview.body1")}
              </p>
              <p className="text-body max-w-3xl leading-relaxed">
                {t("assets.overview.body2")}
              </p>
            </div>
          </div>

          {/* SUBSECTION: LOGO SYSTEM */}
          <div className="mb-24">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-8">
              <p className="eyebrow">{t("assets.logoSystem.eyebrow")}</p>
              <div className="flex bg-white/6 p-1 border border-white/8 rounded-sm self-start">
                <button
                  onClick={() => setLogoTheme("dark")}
                  className={`px-3 py-1 font-mono text-[9px] uppercase tracking-wider transition-colors ${
                    logoTheme === "dark" ? "bg-accent text-bg font-semibold" : "text-muted hover:text-ink"
                  }`}
                >
                  {t("assets.logoSystem.darkBg")}
                </button>
                <button
                  onClick={() => setLogoTheme("light")}
                  className={`px-3 py-1 font-mono text-[9px] uppercase tracking-wider transition-colors ${
                    logoTheme === "light" ? "bg-accent text-bg font-semibold" : "text-muted hover:text-ink"
                  }`}
                >
                  {t("assets.logoSystem.lightBg")}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Logo 1: Primary Logo - Full */}
              <div className="border border-white/8 bg-surface/20 p-6 flex flex-col justify-between">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted mb-4">
                    {t("assets.logoSystem.primary.label")}
                  </p>
                  <div
                    className={`h-40 flex items-center justify-center border border-white/6 overflow-hidden transition-colors duration-500 ${
                      logoTheme === "dark" ? "bg-bg" : "bg-[#F5F5F0]"
                    }`}
                  >
                    <svg
                      id="svg-logo-primary"
                      viewBox="0 0 400 120"
                      className="w-full max-w-[280px]"
                    >
                      <rect width="100%" height="100%" fill="none" />
                      <g textAnchor="middle">
                        <text
                          x="200"
                          y="65"
                          fontFamily="system-ui, -apple-system, sans-serif"
                          fontWeight="900"
                          fontSize="30"
                          letterSpacing="0.45em"
                          fill={logoTheme === "dark" ? "#C8A25A" : "#080808"}
                        >
                          MIRROU
                        </text>
                        <text
                          x="200"
                          y="92"
                          fontFamily="system-ui, -apple-system, sans-serif"
                          fontWeight="400"
                          fontSize="9"
                          letterSpacing="0.32em"
                          fill={logoTheme === "dark" ? "#F2EFE9" : "#6E6B66"}
                        >
                          CREATIVE STUDIO
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="mt-4 border-t border-white/6 pt-4">
                  <p className="text-[13px] text-body mb-3">
                    {t("assets.logoSystem.primary.desc")}
                  </p>
                  <button
                    onClick={() => downloadSvgElement("svg-logo-primary", `mirrou-logo-primary-${logoTheme}.svg`)}
                    className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-accent hover:text-ink transition-colors border border-accent/20 hover:border-accent px-3 py-1.5"
                  >
                    <Download size={10} /> Download SVG
                  </button>
                </div>
              </div>

              {/* Logo 2: Primary Logo - Stacked */}
              <div className="border border-white/8 bg-surface/20 p-6 flex flex-col justify-between">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted mb-4">
                    {t("assets.logoSystem.stacked.label")}
                  </p>
                  <div
                    className={`h-40 flex items-center justify-center border border-white/6 overflow-hidden transition-colors duration-500 ${
                      logoTheme === "dark" ? "bg-bg" : "bg-[#F5F5F0]"
                    }`}
                  >
                    <svg
                      id="svg-logo-stacked"
                      viewBox="0 0 300 300"
                      className="h-full max-h-[140px]"
                    >
                      <rect width="100%" height="100%" fill="none" />
                      <g textAnchor="middle">
                        <text
                          x="150"
                          y="130"
                          fontFamily="system-ui, -apple-system, sans-serif"
                          fontWeight="900"
                          fontSize="36"
                          letterSpacing="0.45em"
                          fill={logoTheme === "dark" ? "#C8A25A" : "#080808"}
                        >
                          MIRROU
                        </text>
                        <text
                          x="150"
                          y="170"
                          fontFamily="system-ui, -apple-system, sans-serif"
                          fontWeight="400"
                          fontSize="10"
                          letterSpacing="0.32em"
                          fill={logoTheme === "dark" ? "#F2EFE9" : "#6E6B66"}
                        >
                          CREATIVE STUDIO
                        </text>
                        <line
                          x1="100"
                          y1="195"
                          x2="200"
                          y2="195"
                          stroke={logoTheme === "dark" ? "rgba(200, 162, 90, 0.3)" : "rgba(8, 8, 8, 0.2)"}
                          strokeWidth="1"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="mt-4 border-t border-white/6 pt-4">
                  <p className="text-[13px] text-body mb-3">
                    {t("assets.logoSystem.stacked.desc")}
                  </p>
                  <button
                    onClick={() => downloadSvgElement("svg-logo-stacked", `mirrou-logo-stacked-${logoTheme}.svg`)}
                    className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-accent hover:text-ink transition-colors border border-accent/20 hover:border-accent px-3 py-1.5"
                  >
                    <Download size={10} /> Download SVG
                  </button>
                </div>
              </div>

              {/* Logo 3: Icon / Monogram */}
              <div className="border border-white/8 bg-surface/20 p-6 flex flex-col justify-between">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted mb-4">
                    {t("assets.logoSystem.monogram.label")}
                  </p>
                  <div
                    className={`h-40 flex items-center justify-center border border-white/6 overflow-hidden transition-colors duration-500 ${
                      logoTheme === "dark" ? "bg-bg" : "bg-[#F5F5F0]"
                    }`}
                  >
                    <svg
                      id="svg-logo-icon"
                      viewBox="0 0 200 200"
                      className="h-full max-h-[120px]"
                    >
                      <rect width="100%" height="100%" fill="none" />
                      <circle
                        cx="100"
                        cy="100"
                        r="60"
                        fill="none"
                        stroke={logoTheme === "dark" ? "#C8A25A" : "#080808"}
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                      <text
                        x="100"
                        y="118"
                        fontFamily="Georgia, serif"
                        fontWeight="bold"
                        fontStyle="italic"
                        fontSize="62"
                        textAnchor="middle"
                        fill={logoTheme === "dark" ? "#C8A25A" : "#080808"}
                      >
                        M
                      </text>
                    </svg>
                  </div>
                </div>
                <div className="mt-4 border-t border-white/6 pt-4">
                  <p className="text-[13px] text-body mb-3">
                    {t("assets.logoSystem.monogram.desc")}
                  </p>
                  <button
                    onClick={() => downloadSvgElement("svg-logo-icon", `mirrou-monogram-${logoTheme}.svg`)}
                    className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-accent hover:text-ink transition-colors border border-accent/20 hover:border-accent px-3 py-1.5"
                  >
                    <Download size={10} /> Download SVG
                  </button>
                </div>
              </div>

              {/* Logo 4: Inverse Version (White transparent) */}
              <div className="border border-white/8 bg-surface/20 p-6 flex flex-col justify-between">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted mb-4">
                    {t("assets.logoSystem.inverse.label")}
                  </p>
                  <div className="h-40 flex items-center justify-center border border-white/6 bg-gradient-to-tr from-stone-900 to-stone-950 overflow-hidden">
                    <svg
                      id="svg-logo-inverse"
                      viewBox="0 0 400 120"
                      className="w-full max-w-[280px]"
                    >
                      <rect width="100%" height="100%" fill="none" />
                      <g textAnchor="middle">
                        <text
                          x="200"
                          y="65"
                          fontFamily="system-ui, -apple-system, sans-serif"
                          fontWeight="900"
                          fontSize="30"
                          letterSpacing="0.45em"
                          fill="#FFFFFF"
                        >
                          MIRROU
                        </text>
                        <text
                          x="200"
                          y="92"
                          fontFamily="system-ui, -apple-system, sans-serif"
                          fontWeight="400"
                          fontSize="9"
                          letterSpacing="0.32em"
                          fill="rgba(255, 255, 255, 0.6)"
                        >
                          CREATIVE STUDIO
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="mt-4 border-t border-white/6 pt-4">
                  <p className="text-[13px] text-body mb-3">
                    {t("assets.logoSystem.inverse.desc")}
                  </p>
                  <button
                    onClick={() => downloadSvgElement("svg-logo-inverse", "mirrou-logo-inverse.svg")}
                    className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-accent hover:text-ink transition-colors border border-accent/20 hover:border-accent px-3 py-1.5"
                  >
                    <Download size={10} /> Download SVG
                  </button>
                </div>
              </div>

              {/* Logo 5: Favicon (32x32) */}
              <div className="border border-white/8 bg-surface/20 p-6 flex flex-col justify-between">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted mb-4">
                    {t("assets.logoSystem.favicon.label")}
                  </p>
                  <div className="h-40 flex items-center justify-center border border-white/6 bg-bg overflow-hidden">
                    <svg
                      id="svg-logo-favicon"
                      viewBox="0 0 32 32"
                      className="w-12 h-12"
                    >
                      <rect width="100%" height="100%" fill="#080808" />
                      <circle
                        cx="16"
                        cy="16"
                        r="12"
                        fill="none"
                        stroke="#C8A25A"
                        strokeWidth="0.8"
                      />
                      <text
                        x="16.5"
                        y="22"
                        fontFamily="Georgia, serif"
                        fontWeight="bold"
                        fontStyle="italic"
                        fontSize="18"
                        textAnchor="middle"
                        fill="#C8A25A"
                      >
                        M
                      </text>
                    </svg>
                  </div>
                </div>
                <div className="mt-4 border-t border-white/6 pt-4">
                  <p className="text-[13px] text-body mb-3">
                    {t("assets.logoSystem.favicon.desc")}
                  </p>
                  <button
                    onClick={() => downloadSvgElement("svg-logo-favicon", "favicon-32x32.svg")}
                    className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-accent hover:text-ink transition-colors border border-accent/20 hover:border-accent px-3 py-1.5"
                  >
                    <Download size={10} /> Download SVG
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SUBSECTION: SOCIAL MEDIA ASSETS */}
          <div className="mb-24">
            <div className="border-b border-white/6 mb-8 flex flex-wrap gap-2">
              {[
                { id: "linkedin", label: t("assets.platformTabs.linkedin") },
                { id: "instagram", label: t("assets.platformTabs.instagram") },
                { id: "facebook", label: t("assets.platformTabs.facebook") },
                { id: "website", label: t("assets.platformTabs.website") },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePlatformTab(tab.id)}
                  className={`pb-4 px-4 font-mono text-[10px] uppercase tracking-[0.35em] border-b-2 transition-all ${
                    activePlatformTab === tab.id
                      ? "border-accent text-accent font-semibold"
                      : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* PLATFORM CONTENT: LINKEDIN */}
            {activePlatformTab === "linkedin" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* LinkedIn A: Profile Picture */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        {t("assets.linkedin.profileLabel")}
                      </p>
                      <p className="font-mono text-[9px] text-muted">400×400px</p>
                    </div>
                    <div className="aspect-square w-full max-w-[280px] mx-auto border border-white/6 overflow-hidden bg-bg flex items-center justify-center">
                      <svg
                        id="svg-li-profile"
                        viewBox="0 0 400 400"
                        className="w-full h-full"
                      >
                        <rect width="100%" height="100%" fill="#080808" />
                        <circle
                          cx="200"
                          cy="200"
                          r="150"
                          fill="none"
                          stroke="#C8A25A"
                          strokeWidth="2.5"
                          strokeDasharray="8 4"
                        />
                        <text
                          x="200"
                          y="245"
                          fontFamily="Georgia, serif"
                          fontWeight="bold"
                          fontStyle="italic"
                          fontSize="130"
                          textAnchor="middle"
                          fill="#C8A25A"
                        >
                          M
                        </text>
                      </svg>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-white/6 pt-4">
                    <p className="text-[13px] text-body mb-4">
                      {t("assets.linkedin.profileDesc")}
                    </p>
                    <AssetDownloadButton svgId="svg-li-profile" filename="linkedin-profile-picture.svg" />
                  </div>
                </div>

                {/* LinkedIn B: Banner / Cover */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        {t("assets.linkedin.bannerLabel")}
                      </p>
                      <p className="font-mono text-[9px] text-muted">1584×396px</p>
                    </div>
                    <div className="w-full border border-white/6 overflow-hidden bg-bg flex items-center justify-center">
                      <svg
                        id="svg-li-cover"
                        viewBox="0 0 1584 396"
                        className="w-full h-auto"
                      >
                        <rect width="100%" height="100%" fill="#080808" />
                        <path d="M 0 0 L 1584 396 M 0 396 L 1584 0" stroke="rgba(200, 162, 90, 0.03)" strokeWidth="1" />
                        <line x1="792" y1="80" x2="792" y2="316" stroke="#C8A25A" strokeWidth="1.5" opacity="0.3" />
                        <g transform="translate(140, 210)">
                          <text
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="900"
                            fontSize="44"
                            letterSpacing="0.45em"
                            fill="#C8A25A"
                          >
                            MIRROU
                          </text>
                          <text
                            y="40"
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="400"
                            fontSize="13"
                            letterSpacing="0.3em"
                            fill="#F2EFE9"
                          >
                            CREATIVE STUDIO
                          </text>
                        </g>
                        <g transform="translate(860, 210)">
                          <text
                            fontFamily="Georgia, serif"
                            fontStyle="italic"
                            fontSize="48"
                            fill="#F2EFE9"
                          >
                            Algorithm of Soul.
                          </text>
                          <text
                            y="40"
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="300"
                            fontSize="12"
                            letterSpacing="0.35em"
                            fill="#6E6B66"
                          >
                            PERFORMANCE CREATIVE STUDIO · DACH
                          </text>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-white/6 pt-4">
                    <p className="text-[13px] text-body mb-4">
                      {t("assets.linkedin.bannerDesc")}
                    </p>
                    <AssetDownloadButton svgId="svg-li-cover" filename="linkedin-banner-cover.svg" />
                  </div>
                </div>

                {/* LinkedIn C: Post Template (Square) */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        {t("assets.linkedin.postSquareLabel")}
                      </p>
                      <p className="font-mono text-[9px] text-muted">1080×1080px</p>
                    </div>
                    <div className="aspect-square w-full max-w-[280px] mx-auto border border-white/6 overflow-hidden bg-bg flex items-center justify-center">
                      <svg
                        id="svg-li-post-sq"
                        viewBox="0 0 1080 1080"
                        className="w-full h-full"
                      >
                        <rect width="100%" height="100%" fill="#080808" />
                        <line x1="80" y1="80" x2="1000" y2="80" stroke="#C8A25A" strokeWidth="2" />
                        <text
                          x="80"
                          y="130"
                          fontFamily="system-ui, -apple-system, sans-serif"
                          fontWeight="600"
                          fontSize="22"
                          letterSpacing="0.35em"
                          fill="#C8A25A"
                        >
                          ALGORITHM OF SOUL
                        </text>
                        {/* Mock Performance Chart */}
                        <g transform="translate(80, 220)">
                          <rect width="920" height="600" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                          {/* Grid Lines */}
                          <line x1="0" y1="150" x2="920" y2="150" stroke="rgba(255,255,255,0.04)" />
                          <line x1="0" y1="300" x2="920" y2="300" stroke="rgba(255,255,255,0.04)" />
                          <line x1="0" y1="450" x2="920" y2="450" stroke="rgba(255,255,255,0.04)" />
                          <line x1="230" y1="0" x2="230" y2="600" stroke="rgba(255,255,255,0.04)" />
                          <line x1="460" y1="0" x2="460" y2="600" stroke="rgba(255,255,255,0.04)" />
                          <line x1="690" y1="0" x2="690" y2="600" stroke="rgba(255,255,255,0.04)" />
                          {/* Data Curves */}
                          <path
                            d="M 50,500 Q 230,450 460,250 T 870,80"
                            fill="none"
                            stroke="#C8A25A"
                            strokeWidth="4"
                          />
                          <path
                            d="M 50,520 Q 230,500 460,400 T 870,300"
                            fill="none"
                            stroke="#6E6B66"
                            strokeWidth="2.5"
                            strokeDasharray="6 4"
                          />
                          <circle cx="870" cy="80" r="10" fill="#C8A25A" />
                          <text
                            x="850"
                            y="50"
                            fontFamily="Georgia, serif"
                            fontStyle="italic"
                            fontSize="28"
                            fill="#C8A25A"
                            textAnchor="end"
                          >
                            +82% CTR Increase
                          </text>
                        </g>
                        <g transform="translate(80, 950)">
                          <text
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="900"
                            fontSize="26"
                            letterSpacing="0.4em"
                            fill="#F2EFE9"
                          >
                            MIRROU
                          </text>
                        </g>
                        <text
                          x="1000"
                          y="950"
                          fontFamily="system-ui, -apple-system, sans-serif"
                          fontSize="16"
                          letterSpacing="0.25em"
                          fill="#6E6B66"
                          textAnchor="end"
                        >
                          CASE STUDY: LUMISKIN BERLIN
                        </text>
                      </svg>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-white/6 pt-4">
                    <p className="text-[13px] text-body mb-4">
                      {t("assets.linkedin.postSquareDesc")}
                    </p>
                    <AssetDownloadButton svgId="svg-li-post-sq" filename="linkedin-post-square.svg" />
                  </div>
                </div>

                {/* LinkedIn D: Post Template (Landscape) */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        {t("assets.linkedin.postLandscapeLabel")}
                      </p>
                      <p className="font-mono text-[9px] text-muted">1200×627px</p>
                    </div>
                    <div className="w-full border border-white/6 overflow-hidden bg-bg flex items-center justify-center">
                      <svg
                        id="svg-li-post-ls"
                        viewBox="0 0 1200 627"
                        className="w-full h-auto"
                      >
                        <rect width="100%" height="100%" fill="#080808" />
                        <line x1="60" y1="60" x2="60" y2="567" stroke="#C8A25A" strokeWidth="2.5" />
                        <g transform="translate(100, 150)">
                          <text
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="300"
                            fontSize="16"
                            letterSpacing="0.45em"
                            fill="#C8A25A"
                          >
                            PERFORMANCE CREATIVE ENGINE
                          </text>
                          <text
                            y="80"
                            fontFamily="Georgia, serif"
                            fontStyle="italic"
                            fontSize="56"
                            fill="#F2EFE9"
                          >
                            Where Aesthetics
                          </text>
                          <text
                            y="150"
                            fontFamily="Georgia, serif"
                            fontStyle="italic"
                            fontSize="56"
                            fill="#C8A25A"
                          >
                            becomes Algorithm.
                          </text>
                          <text
                            y="270"
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="300"
                            fontSize="18"
                            fill="#6E6B66"
                          >
                            Boutique-Ansatz für D2C Brands (Beauty, Health & Lifestyle).
                          </text>
                        </g>
                        <g transform="translate(100, 540)">
                          <text
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="900"
                            fontSize="24"
                            letterSpacing="0.4em"
                            fill="#F2EFE9"
                          >
                            MIRROU
                          </text>
                        </g>
                        <text
                          x="1140"
                          y="540"
                          fontFamily="system-ui, -apple-system, sans-serif"
                          fontSize="14"
                          letterSpacing="0.3em"
                          fill="#C8A25A"
                          textAnchor="end"
                        >
                          WWW.MIRROU.STUDIO
                        </text>
                      </svg>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-white/6 pt-4">
                    <p className="text-[13px] text-body mb-4">
                      {t("assets.linkedin.postLandscapeDesc")}
                    </p>
                    <AssetDownloadButton svgId="svg-li-post-ls" filename="linkedin-post-landscape.svg" />
                  </div>
                </div>
              </div>
            )}

            {/* PLATFORM CONTENT: INSTAGRAM */}
            {activePlatformTab === "instagram" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Instagram A: Profile Picture */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        {t("assets.instagram.profileLabel")}
                      </p>
                      <p className="font-mono text-[9px] text-muted">320×320px</p>
                    </div>
                    <div className="aspect-square w-full max-w-[240px] mx-auto border border-white/6 overflow-hidden bg-bg flex items-center justify-center">
                      <svg
                        id="svg-ig-profile"
                        viewBox="0 0 320 320"
                        className="w-full h-full"
                      >
                        <rect width="100%" height="100%" fill="#080808" />
                        <circle
                          cx="160"
                          cy="160"
                          r="120"
                          fill="none"
                          stroke="#C8A25A"
                          strokeWidth="2"
                          strokeDasharray="4 2"
                        />
                        <text
                          x="160"
                          y="195"
                          fontFamily="Georgia, serif"
                          fontWeight="bold"
                          fontStyle="italic"
                          fontSize="100"
                          textAnchor="middle"
                          fill="#C8A25A"
                        >
                          M
                        </text>
                      </svg>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-white/6 pt-4">
                    <p className="text-[13px] text-body mb-4">
                      {t("assets.instagram.profileDesc")}
                    </p>
                    <AssetDownloadButton svgId="svg-ig-profile" filename="instagram-profile-avatar.svg" />
                  </div>
                </div>

                {/* Instagram B: Feed Post (Square) */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        {t("assets.instagram.feedSquareLabel")}
                      </p>
                      <p className="font-mono text-[9px] text-muted">1080×1080px</p>
                    </div>
                    <div className="aspect-square w-full max-w-[240px] mx-auto border border-white/6 overflow-hidden bg-bg flex items-center justify-center">
                      <svg
                        id="svg-ig-post-sq"
                        viewBox="0 0 1080 1080"
                        className="w-full h-full"
                      >
                        <rect width="100%" height="100%" fill="#080808" />
                        <rect
                          x="40"
                          y="40"
                          width="1000"
                          height="1000"
                          fill="none"
                          stroke="#C8A25A"
                          strokeWidth="2"
                          opacity="0.6"
                        />
                        {/* Circular abstract vector graphic */}
                        <g transform="translate(540, 540)">
                          <circle cx="0" cy="0" r="260" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                          <circle cx="0" cy="0" r="200" fill="none" stroke="#C8A25A" strokeWidth="1.5" opacity="0.3" />
                          <circle cx="0" cy="0" r="140" fill="none" stroke="#C8A25A" strokeWidth="3" />
                          <line x1="-300" y1="0" x2="300" y2="0" stroke="rgba(200, 162, 90, 0.2)" strokeWidth="1" />
                          <line x1="0" y1="-300" x2="0" y2="300" stroke="rgba(200, 162, 90, 0.2)" strokeWidth="1" />
                        </g>
                        <text
                          x="540"
                          y="880"
                          fontFamily="system-ui, -apple-system, sans-serif"
                          fontWeight="300"
                          fontSize="22"
                          letterSpacing="0.45em"
                          fill="#F2EFE9"
                          textAnchor="middle"
                        >
                          HYBRID CREATIVE ENGINE
                        </text>
                        <text
                          x="1000"
                          y="1000"
                          fontFamily="system-ui, -apple-system, sans-serif"
                          fontWeight="900"
                          fontSize="18"
                          letterSpacing="0.35em"
                          fill="#C8A25A"
                          textAnchor="end"
                        >
                          MIRROU
                        </text>
                      </svg>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-white/6 pt-4">
                    <p className="text-[13px] text-body mb-4">
                      {t("assets.instagram.feedSquareDesc")}
                    </p>
                    <AssetDownloadButton svgId="svg-ig-post-sq" filename="instagram-post-square.svg" />
                  </div>
                </div>

                {/* Instagram C: Feed Post (Portrait) */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        {t("assets.instagram.feedPortraitLabel")}
                      </p>
                      <p className="font-mono text-[9px] text-muted">1080×1350px</p>
                    </div>
                    <div className="aspect-[1080/1350] w-full max-w-[240px] mx-auto border border-white/6 overflow-hidden bg-bg flex items-center justify-center">
                      <svg
                        id="svg-ig-post-port"
                        viewBox="0 0 1080 1350"
                        className="w-full h-full"
                      >
                        <rect width="100%" height="100%" fill="#080808" />
                        <line x1="80" y1="80" x2="80" y2="1270" stroke="#C8A25A" strokeWidth="2.5" />
                        <g transform="translate(130, 160)">
                          <text
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="300"
                            fontSize="20"
                            letterSpacing="0.45em"
                            fill="#C8A25A"
                          >
                            PERFORMANCE CASE
                          </text>
                          <text
                            y="70"
                            fontFamily="Georgia, serif"
                            fontStyle="italic"
                            fontSize="54"
                            fill="#F2EFE9"
                          >
                            Luminous Aura
                          </text>
                          <text
                            y="130"
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="300"
                            fontSize="18"
                            letterSpacing="0.25em"
                            fill="#6E6B66"
                          >
                            Skincare D2C Brand · Growth Loop
                          </text>
                        </g>
                        {/* Mock Metric Box */}
                        <g transform="translate(130, 420)">
                          <rect width="810" height="560" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                          <circle cx="405" cy="240" r="160" fill="none" stroke="rgba(200,162,90,0.15)" strokeWidth="2" />
                          <text
                            x="405"
                            y="250"
                            fontFamily="Georgia, serif"
                            fontStyle="italic"
                            fontSize="76"
                            fill="#C8A25A"
                            textAnchor="middle"
                          >
                            +82%
                          </text>
                          <text
                            x="405"
                            y="300"
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="400"
                            fontSize="13"
                            letterSpacing="0.32em"
                            fill="#F2EFE9"
                            textAnchor="middle"
                          >
                            CTR ENHANCEMENT
                          </text>
                        </g>
                        <g transform="translate(130, 1140)">
                          <text
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="400"
                            fontSize="18"
                            letterSpacing="0.32em"
                            fill="#6E6B66"
                          >
                            0.85% → 1.55% Meta static ads
                          </text>
                          <text
                            y="35"
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="400"
                            fontSize="18"
                            letterSpacing="0.32em"
                            fill="#6E6B66"
                          >
                            A/B isolated testing (4 weeks)
                          </text>
                        </g>
                        <g transform="translate(130, 1260)">
                          <text
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="900"
                            fontSize="24"
                            letterSpacing="0.4em"
                            fill="#F2EFE9"
                          >
                            MIRROU
                          </text>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-white/6 pt-4">
                    <p className="text-[13px] text-body mb-4">
                      {t("assets.instagram.feedPortraitDesc")}
                    </p>
                    <AssetDownloadButton svgId="svg-ig-post-port" filename="instagram-post-portrait.svg" />
                  </div>
                </div>

                {/* Instagram D: Story / Reels Cover */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        {t("assets.instagram.storyCoverLabel")}
                      </p>
                      <p className="font-mono text-[9px] text-muted">1080×1920px</p>
                    </div>
                    <div className="aspect-[1080/1920] w-full max-w-[180px] mx-auto border border-white/6 overflow-hidden bg-bg flex items-center justify-center">
                      <svg
                        id="svg-ig-story"
                        viewBox="0 0 1080 1920"
                        className="w-full h-full"
                      >
                        <rect width="100%" height="100%" fill="#080808" />
                        <line x1="540" y1="120" x2="540" y2="400" stroke="#C8A25A" strokeWidth="1.5" opacity="0.3" />
                        <circle
                          cx="540"
                          cy="960"
                          r="320"
                          fill="none"
                          stroke="#C8A25A"
                          strokeWidth="2.5"
                          strokeDasharray="12 6"
                        />
                        <text
                          x="540"
                          y="1070"
                          fontFamily="Georgia, serif"
                          fontWeight="bold"
                          fontStyle="italic"
                          fontSize="260"
                          textAnchor="middle"
                          fill="#C8A25A"
                        >
                          M
                        </text>
                        <g transform="translate(540, 1500)">
                          <text
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="900"
                            fontSize="36"
                            letterSpacing="0.45em"
                            fill="#F2EFE9"
                            textAnchor="middle"
                          >
                            MIRROU
                          </text>
                          <text
                            y="55"
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="400"
                            fontSize="14"
                            letterSpacing="0.35em"
                            fill="#6E6B66"
                            textAnchor="middle"
                          >
                            CREATIVE ENGINE
                          </text>
                        </g>
                        <text
                          x="540"
                          y="1800"
                          fontFamily="Georgia, serif"
                          fontStyle="italic"
                          fontSize="30"
                          fill="#C8A25A"
                          textAnchor="middle"
                        >
                          Algorithm of Soul.
                        </text>
                      </svg>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-white/6 pt-4">
                    <p className="text-[13px] text-body mb-4">
                      {t("assets.instagram.storyCoverDesc")}
                    </p>
                    <AssetDownloadButton svgId="svg-ig-story" filename="instagram-story-cover.svg" />
                  </div>
                </div>

                {/* Instagram E: Highlight Covers (Combined) */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between lg:col-span-2">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        {t("assets.instagram.highlightsLabel")}
                      </p>
                      <p className="font-mono text-[9px] text-muted">{t("assets.instagram.highlightsSize")}</p>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {[
                        { id: "services", label: t("assets.instagram.highlightLabels.services"), p: "M200,120 L300,170 L200,220 L100,170 Z M200,170 L300,220 L200,270 L100,220 Z M200,220 L300,270 L200,320 L100,270 Z" },
                        { id: "cases", label: t("assets.instagram.highlightLabels.cases"), p: "M200,100 L280,170 L200,300 L120,170 Z M200,100 L200,300 M120,170 L280,170 M150,135 L250,135 L200,170 Z" },
                        { id: "process", label: t("assets.instagram.highlightLabels.process"), p: "M200,160 C240,160 260,200 240,240 C220,280 180,280 160,240 C140,200 160,160 200,160 Z M200,160 L200,110 M160,240 L110,270 M240,240 L290,270" },
                        { id: "frontier", label: t("assets.instagram.highlightLabels.frontier"), p: "M200,100 C230,100 270,115 270,150 C270,220 200,290 200,310 C200,290 130,220 130,150 C130,115 170,100 200,100 Z M170,190 L195,215 L235,165" },
                        { id: "resources", label: t("assets.instagram.highlightLabels.resources"), p: "M130,100 L240,100 L270,130 L270,300 L130,300 Z M240,100 L240,130 L270,130 M160,160 L240,160 M160,200 L240,200 M160,240 L210,240" },
                        { id: "about", label: t("assets.instagram.highlightLabels.about"), p: "M200,170 C225,170 245,150 245,125 C245,100 225,80 200,80 C175,80 155,100 155,125 C155,150 175,170 200,170 Z M120,290 C120,230 155,215 200,215 C245,215 280,230 280,290" }
                      ].map((item) => (
                        <div key={item.id} className="border border-white/6 bg-bg flex flex-col items-center p-2">
                          <svg
                            id={`svg-ig-hl-${item.id}`}
                            viewBox="0 0 400 400"
                            className="w-full h-auto max-w-[80px]"
                          >
                            <rect width="100%" height="100%" fill="#080808" />
                            <circle cx="200" cy="200" r="170" fill="none" stroke="rgba(200,162,90,0.1)" strokeWidth="2" />
                            <circle cx="200" cy="200" r="160" fill="none" stroke="#C8A25A" strokeWidth="1" strokeDasharray="3 3" />
                            <path d={item.p} fill="none" stroke="#C8A25A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="font-mono text-[8px] uppercase tracking-wider text-muted mt-2 text-center block">
                            {item.label}
                          </span>
                          <button
                            onClick={() => downloadSvgElement(`svg-ig-hl-${item.id}`, `instagram-highlight-${item.id}.svg`)}
                            className="mt-2 text-[8px] font-mono text-accent hover:text-ink border border-accent/20 px-1 py-0.5"
                          >
                            Down
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 border-t border-white/6 pt-4">
                    <p className="text-[13px] text-body">
                      {t("assets.instagram.highlightsDesc")}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* PLATFORM CONTENT: FACEBOOK */}
            {activePlatformTab === "facebook" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Facebook A: Profile Picture */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        {t("assets.facebook.profileLabel")}
                      </p>
                      <p className="font-mono text-[9px] text-muted">170×170px</p>
                    </div>
                    <div className="aspect-square w-full max-w-[240px] mx-auto border border-white/6 overflow-hidden bg-bg flex items-center justify-center">
                      <svg
                        id="svg-fb-profile"
                        viewBox="0 0 170 170"
                        className="w-full h-full"
                      >
                        <rect width="100%" height="100%" fill="#080808" />
                        <circle cx="85" cy="85" r="70" fill="none" stroke="#C8A25A" strokeWidth="1" strokeDasharray="3 2" />
                        <text
                          x="85"
                          y="105"
                          fontFamily="Georgia, serif"
                          fontWeight="bold"
                          fontStyle="italic"
                          fontSize="54"
                          textAnchor="middle"
                          fill="#C8A25A"
                        >
                          M
                        </text>
                      </svg>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-white/6 pt-4">
                    <p className="text-[13px] text-body mb-4">
                      {t("assets.facebook.profileDesc")}
                    </p>
                    <AssetDownloadButton svgId="svg-fb-profile" filename="facebook-profile-picture.svg" />
                  </div>
                </div>

                {/* Facebook B: Page Cover */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        {t("assets.facebook.coverLabel")}
                      </p>
                      <p className="font-mono text-[9px] text-muted">820×312px</p>
                    </div>
                    <div className="w-full border border-white/6 overflow-hidden bg-bg flex items-center justify-center">
                      <svg
                        id="svg-fb-cover"
                        viewBox="0 0 820 312"
                        className="w-full h-auto"
                      >
                        <rect width="100%" height="100%" fill="#080808" />
                        <line x1="50" y1="20" x2="770" y2="292" stroke="rgba(200,162,90,0.02)" strokeWidth="1" />
                        <g transform="translate(80, 150)">
                          <text
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="900"
                            fontSize="32"
                            letterSpacing="0.45em"
                            fill="#C8A25A"
                          >
                            MIRROU
                          </text>
                          <text
                            y="35"
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="400"
                            fontSize="10"
                            letterSpacing="0.32em"
                            fill="#F2EFE9"
                          >
                            CREATIVE STUDIO
                          </text>
                        </g>
                        <g transform="translate(480, 150)">
                          <text
                            fontFamily="Georgia, serif"
                            fontStyle="italic"
                            fontSize="28"
                            fill="#F2EFE9"
                          >
                            Wo Ästhetik Algorithmus wird.
                          </text>
                          <text
                            y="35"
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="400"
                            fontSize="10"
                            letterSpacing="0.3em"
                            fill="#C8A25A"
                          >
                            WWW.MIRROU.STUDIO
                          </text>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-white/6 pt-4">
                    <p className="text-[13px] text-body mb-4">
                      {t("assets.facebook.coverDesc")}
                    </p>
                    <AssetDownloadButton svgId="svg-fb-cover" filename="facebook-page-cover.svg" />
                  </div>
                </div>

                {/* Facebook C: Ad Creative - Square */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        {t("assets.facebook.adSquareLabel")}
                      </p>
                      <p className="font-mono text-[9px] text-muted">1080×1080px</p>
                    </div>
                    <div className="aspect-square w-full max-w-[240px] mx-auto border border-white/6 overflow-hidden bg-bg flex items-center justify-center">
                      <svg
                        id="svg-fb-ad-sq"
                        viewBox="0 0 1080 1080"
                        className="w-full h-full"
                      >
                        <rect width="100%" height="100%" fill="#080808" />
                        
                        {/* Hook Zone (top 30%) */}
                        <g transform="translate(40, 40)">
                          <rect width="1000" height="300" fill="none" stroke="rgba(200, 162, 90, 0.4)" strokeWidth="2" strokeDasharray="8 6" />
                          <text x="50" y="70" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="bold" fontSize="20" letterSpacing="0.4em" fill="#C8A25A">HOOK ZONE (30%)</text>
                          <text x="50" y="140" fontFamily="Georgia, serif" fontStyle="italic" fontSize="36" fill="#F2EFE9">Brennst du deine Budgets durch Creative Fatigue nieder?</text>
                          <text x="50" y="210" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="300" fontSize="18" fill="#6E6B66">Unsere Hybrid-Creatives reduzieren den CPC nachweislich um 38%.</text>
                        </g>

                        {/* Visual Zone (middle 50%) */}
                        <g transform="translate(40, 360)">
                          <rect width="1000" height="500" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2" strokeDasharray="8 6" />
                          <rect x="50" y="50" width="900" height="400" fill="rgba(255,255,255,0.02)" />
                          <path d="M 100,400 L 500,100 L 900,400" fill="none" stroke="#C8A25A" strokeWidth="2.5" opacity="0.3" />
                          <text x="500" y="240" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="bold" fontSize="22" letterSpacing="0.35em" fill="#6E6B66" textAnchor="middle">VISUAL ZONE (50%) - PRODUCT / HYBRID SHOT</text>
                        </g>

                        {/* CTA Zone (bottom 20%) */}
                        <g transform="translate(40, 880)">
                          <rect width="1000" height="160" fill="none" stroke="rgba(200, 162, 90, 0.4)" strokeWidth="2" strokeDasharray="8 6" />
                          <text x="50" y="90" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="26" letterSpacing="0.45em" fill="#F2EFE9">MIRROU</text>
                          <rect x="650" y="30" width="300" height="90" fill="#C8A25A" />
                          <text x="800" y="80" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="bold" fontSize="16" letterSpacing="0.1em" fill="#080808" textAnchor="middle">JETZT BUCHEN →</text>
                          <text x="50" y="130" fontFamily="system-ui, -apple-system, sans-serif" fontSize="12" letterSpacing="0.25em" fill="#C8A25A">CTA ZONE (20%)</text>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-white/6 pt-4">
                    <p className="text-[13px] text-body mb-4">
                      {t("assets.facebook.adSquareDesc")}
                    </p>
                    <AssetDownloadButton svgId="svg-fb-ad-sq" filename="facebook-ad-square-template.svg" />
                  </div>
                </div>

                {/* Facebook D: Ad Creative - Story / Reels Format */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        {t("assets.facebook.adStoryLabel")}
                      </p>
                      <p className="font-mono text-[9px] text-muted">1080×1920px</p>
                    </div>
                    <div className="aspect-[1080/1920] w-full max-w-[180px] mx-auto border border-white/6 overflow-hidden bg-bg flex items-center justify-center">
                      <svg
                        id="svg-fb-ad-story"
                        viewBox="0 0 1080 1920"
                        className="w-full h-full"
                      >
                        <rect width="100%" height="100%" fill="#080808" />
                        
                        {/* Safe Zone Top */}
                        <line x1="0" y1="250" x2="1080" y2="250" stroke="#EF4444" strokeWidth="2" strokeDasharray="10 5" />
                        <rect width="1080" height="250" fill="rgba(239,68,68,0.04)" />
                        <text x="540" y="140" fontFamily="system-ui, -apple-system, sans-serif" fontSize="22" letterSpacing="0.2em" fill="#EF4444" textAnchor="middle">UNSAFE ZONE (PROFILE / LOGO OVERLAY)</text>

                        {/* Safe Zone Bottom */}
                        <line x1="0" y1="1670" x2="1080" y2="1670" stroke="#EF4444" strokeWidth="2" strokeDasharray="10 5" />
                        <rect y="1670" width="1080" height="250" fill="rgba(239,68,68,0.04)" />
                        <text x="540" y="1800" fontFamily="system-ui, -apple-system, sans-serif" fontSize="22" letterSpacing="0.2em" fill="#EF4444" textAnchor="middle">UNSAFE ZONE (SYSTEM NAVIGATION OVERLAY)</text>

                        {/* Safe Content Area */}
                        <g transform="translate(100, 350)">
                          <rect width="880" height="1220" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                          <text x="440" y="100" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="300" fontSize="26" letterSpacing="0.4em" fill="#C8A25A" textAnchor="middle">SAFE ZONE (1080×1420px)</text>
                          <text x="440" y="240" fontFamily="Georgia, serif" fontStyle="italic" fontSize="56" fill="#F2EFE9" textAnchor="middle">Editorial-Grade</text>
                          <text x="440" y="320" fontFamily="Georgia, serif" fontStyle="italic" fontSize="56" fill="#F2EFE9" textAnchor="middle">Performance Ad</text>
                          <text x="440" y="400" fontFamily="Georgia, serif" fontStyle="italic" fontSize="56" fill="#C8A25A" textAnchor="middle">Systems.</text>
                          <circle cx="440" cy="720" r="140" fill="none" stroke="#C8A25A" strokeWidth="1.5" />
                          <text x="440" y="735" fontFamily="Georgia, serif" fontStyle="italic" fontSize="48" fill="#F2EFE9" textAnchor="middle">CD</text>
                          <text x="440" y="1020" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="30" letterSpacing="0.4em" fill="#F2EFE9" textAnchor="middle">MIRROU</text>
                          <text x="440" y="1070" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="300" fontSize="12" letterSpacing="0.32em" fill="#6E6B66" textAnchor="middle">WWW.MIRROU.STUDIO</text>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-white/6 pt-4">
                    <p className="text-[13px] text-body mb-4">
                      {t("assets.facebook.adStoryDesc")}
                    </p>
                    <AssetDownloadButton svgId="svg-fb-ad-story" filename="facebook-ad-story-template.svg" />
                  </div>
                </div>
              </div>
            )}

            {/* PLATFORM CONTENT: WEBSITE */}
            {activePlatformTab === "website" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Website A: Navbar Logo */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        {t("assets.websiteAssets.navbarLabel")}
                      </p>
                      <p className="font-mono text-[9px] text-muted">200×40px</p>
                    </div>
                    <div className="w-full py-10 border border-white/6 overflow-hidden bg-bg flex items-center justify-center">
                      <svg
                        id="svg-web-nav"
                        viewBox="0 0 200 40"
                        className="w-full max-w-[200px]"
                      >
                        <rect width="100%" height="100%" fill="none" />
                        <g textAnchor="middle">
                          <text
                            x="100"
                            y="22"
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="900"
                            fontSize="13"
                            letterSpacing="0.45em"
                            fill="#F2EFE9"
                          >
                            MIRROU
                          </text>
                          <text
                            x="100"
                            y="33"
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="400"
                            fontSize="5.2"
                            letterSpacing="0.32em"
                            fill="#C8A25A"
                          >
                            CREATIVE STUDIO
                          </text>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-white/6 pt-4">
                    <p className="text-[13px] text-body mb-4">
                      {t("assets.websiteAssets.navbarDesc")}
                    </p>
                    <AssetDownloadButton svgId="svg-web-nav" filename="website-navbar-logo.svg" />
                  </div>
                </div>

                {/* Website B: Footer Logo */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        {t("assets.websiteAssets.footerLabel")}
                      </p>
                      <p className="font-mono text-[9px] text-muted">160×32px</p>
                    </div>
                    <div className="w-full py-10 border border-white/6 overflow-hidden bg-[#0A0A0C] flex items-center justify-center">
                      <svg
                        id="svg-web-foot"
                        viewBox="0 0 160 32"
                        className="w-full max-w-[160px]"
                      >
                        <rect width="100%" height="100%" fill="none" />
                        <g textAnchor="middle">
                          <text
                            x="80"
                            y="18"
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="900"
                            fontSize="11"
                            letterSpacing="0.45em"
                            fill="#C8A25A"
                          >
                            MIRROU
                          </text>
                          <text
                            x="80"
                            y="27"
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="400"
                            fontSize="4.2"
                            letterSpacing="0.32em"
                            fill="#6E6B66"
                          >
                            CREATIVE STUDIO
                          </text>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-white/6 pt-4">
                    <p className="text-[13px] text-body mb-4">
                      {t("assets.websiteAssets.footerDesc")}
                    </p>
                    <AssetDownloadButton svgId="svg-web-foot" filename="website-footer-logo.svg" />
                  </div>
                </div>

                {/* Website C: Open Graph (OG Image) */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between md:col-span-2">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        {t("assets.websiteAssets.ogLabel")}
                      </p>
                      <p className="font-mono text-[9px] text-muted">1200×630px</p>
                    </div>
                    <div className="w-full border border-white/6 overflow-hidden bg-bg flex items-center justify-center">
                      <svg
                        id="svg-web-og"
                        viewBox="0 0 1200 630"
                        className="w-full h-auto"
                      >
                        <rect width="100%" height="100%" fill="#080808" />
                        {/* Grid pattern background */}
                        <path d="M 0 0 L 1200 630 M 0 630 L 1200 0" stroke="rgba(200, 162, 90, 0.015)" strokeWidth="1.5" />
                        <circle cx="600" cy="315" r="280" fill="none" stroke="rgba(200, 162, 90, 0.05)" strokeWidth="1" />
                        <g textAnchor="middle">
                          <text
                            x="600"
                            y="280"
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="900"
                            fontSize="58"
                            letterSpacing="0.45em"
                            fill="#C8A25A"
                          >
                            MIRROU
                          </text>
                          <text
                            x="600"
                            y="330"
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="400"
                            fontSize="16"
                            letterSpacing="0.35em"
                            fill="#F2EFE9"
                          >
                            CREATIVE STUDIO
                          </text>
                          <line x1="450" y1="370" x2="750" y2="370" stroke="#C8A25A" strokeWidth="1.5" opacity="0.3" />
                          <text
                            x="600"
                            y="440"
                            fontFamily="Georgia, serif"
                            fontStyle="italic"
                            fontSize="32"
                            fill="#6E6B66"
                          >
                            Where Aesthetics becomes Algorithm.
                          </text>
                          <text
                            x="600"
                            y="490"
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="300"
                            fontSize="13"
                            letterSpacing="0.4em"
                            fill="#C8A25A"
                          >
                            HAMBURG · BERLIN · WWW.MIRROU.STUDIO
                          </text>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-white/6 pt-4">
                    <p className="text-[13px] text-body mb-4">
                      {t("assets.websiteAssets.ogDesc")}
                    </p>
                    <AssetDownloadButton svgId="svg-web-og" filename="website-og-image.svg" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SUBSECTION: CREATIVE PERFORMANCE IN ACTION */}
          <div className="border border-white/6 bg-surface/20 p-8 md:p-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-4">
              {t("assets.performanceSection.label")}
            </p>
            <h3 className="font-serif italic text-2xl text-ink mb-6">
              {t("assets.performanceSection.headline")}
            </h3>
            <p className="text-body max-w-3xl leading-relaxed mb-6">
              {t("assets.performanceSection.body")}
            </p>
            <p className="text-[13px] text-muted">
              {t("assets.performanceSection.reference")}
            </p>
          </div>
        </section>

        {/* ── CTA Footer ──────────────────────────────────────────── */}
        <section className="py-16 border-t border-accent/20 mb-16">
          <div className="border border-accent/20 bg-accent/4 p-10 md:p-14">
            <p className="eyebrow mb-5">{t("cta.eyebrow")}</p>
            <h2 className="font-serif italic text-3xl md:text-4xl leading-tight tracking-tight mb-4">
              {t("cta.headline")}
              <br />
              <span className="text-accent">{t("cta.headlineAccent")}</span>
            </h2>
            <p className="text-body max-w-2xl mb-8">
              {t("cta.body")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/kontakt" className="btn-primary">
                {t("cta.primaryCta")} <ArrowRight size={14} />
              </Link>
              <a href="mailto:hallo@mirrou.studio" className="btn-ghost">
                {t("cta.secondaryCta")} <ArrowRight size={14} />
              </a>
            </div>
          </div>
          <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted/40 mt-8 text-center">
            {t("cta.copyright")}
          </p>
        </section>
      </div>
    </main>
  );
}
