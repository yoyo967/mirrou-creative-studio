import { useEffect, useRef, useState } from "react";
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
}: {
  dos: string[];
  donts: string[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/6 border border-white/6">
      <div className="bg-bg p-8 lg:p-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-6">
          ✓ Do
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
          ✗ Don't
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
}: {
  label: string;
  before: string;
  after: string;
}) {
  return (
    <div className="border border-white/6 bg-surface/20">
      <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-accent px-6 pt-5 pb-0">
        {label}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/6">
        <div className="p-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-muted mb-3">
            ✗ Vorher
          </p>
          <p className="text-body text-[14px] leading-relaxed line-through decoration-white/20">
            {before}
          </p>
        </div>
        <div className="p-6 bg-accent/4">
          <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-accent mb-3">
            ✓ Nachher
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
  const [activeSection, setActiveSection] = useState("foundation");
  const [tocOpen, setTocOpen] = useState(false);
  const [logoTheme, setLogoTheme] = useState<"dark" | "light">("dark");
  const [activePlatformTab, setActivePlatformTab] = useState("linkedin");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const sections = [
    { id: "foundation", label: "01 · Foundation" },
    { id: "personality", label: "02 · Voice" },
    { id: "visual", label: "03 · Visual Identity" },
    { id: "messaging", label: "04 · Messaging" },
    { id: "application", label: "05 · Application" },
    { id: "assets", label: "06 · Logo & Assets" },
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
        title="Brand Book · Mirrou Creative Studio"
        description="Das interne Brand Book von Mirrou Creative Studio — Visual Identity System, Tone of Voice, Messaging Framework und Application Guidelines. Algorithm of Soul."
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
            Internal · Confidential
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
            Brand Book · Navigation
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
            <p className="eyebrow">Mirrou Creative Studio · Brand Book</p>
            <span className="w-12 h-px bg-accent/60" />
          </div>
          <h1 className="display-xl font-serif italic leading-[0.9] tracking-[-0.03em] text-ink mb-8">
            The Algorithm
            <br />
            <span className="text-accent">of Soul.</span>
          </h1>
          <p className="text-body-lg max-w-2xl mb-6">
            Dieses Brand Book definiert, wie Mirrou denkt, spricht, aussieht und agiert.
            Es ist kein Style Guide — es ist das Betriebssystem unserer Marke.
          </p>
          <p className="text-body max-w-2xl">
            <strong className="text-ink">Für wen:</strong> Das Mirrou-Team, Freelancer-Kollaborationen, Agenturpartner. Intern.
            Vertraulich. Nicht für die Öffentlichkeit bestimmt.
          </p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/6 pt-10">
            {[
              { n: "Version", v: "1.0 · 2026" },
              { n: "Status", v: "Live · Binding" },
              { n: "Scope", v: "DACH · EN" },
              { n: "Owner", v: "Olha Yevtushenko" },
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
                Brand Foundation
              </h2>
            </div>
          </div>

          {/* Name & Bedeutung */}
          <div className="mb-20">
            <p className="eyebrow mb-6">Name & Bedeutung</p>
            <div className="border border-white/8 bg-surface/30 p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <p className="font-serif italic text-5xl text-ink mb-6">Mirrou</p>
                  <p className="text-body leading-relaxed">
                    <strong className="text-ink">Mirrou</strong> ist eine Komposition aus{" "}
                    <em>Mirror</em> (Spiegel) und einer bewussten orthografischen Verschiebung —
                    das doppelte „r" verleiht der Wortmarke visuelle Spannung und Eigenständigkeit.
                  </p>
                  <p className="text-body mt-4 leading-relaxed">
                    Der Spiegel ist die zentrale Metapher: Mirrou reflektiert, was in einer Marke
                    bereits da ist — und macht es schärfer, präziser, wirksamer. Kein Aufsetzen
                    einer fremden Identität. Destillation des Eigenen.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="border-l-2 border-accent/40 pl-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-1">
                      Phonetik
                    </p>
                    <p className="text-body">
                      /mɪˈruː/ — weich, klar, ein klangliches Spiegel-Bild.
                    </p>
                  </div>
                  <div className="border-l-2 border-accent/40 pl-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-1">
                      Schreibweise
                    </p>
                    <p className="text-body">
                      Immer <strong className="text-ink">Mirrou</strong> — nie MIRROU (außer
                      Wordmark), nie Mirrou. Kein Bindestrich, kein Punkt.
                    </p>
                  </div>
                  <div className="border-l-2 border-accent/40 pl-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-1">
                      Studio
                    </p>
                    <p className="text-body">
                      Immer <strong className="text-ink">Mirrou Creative Studio</strong> im vollen
                      Kontext. In wiederholter Nennung: Mirrou.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission, Vision, Promise, Positioning */}
          <div className="mb-20">
            <p className="eyebrow mb-6">Mission · Vision · Promise · Positioning</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/6 border border-white/6">
              {[
                {
                  label: "Mission Statement",
                  n: "01",
                  headline: "Wir bauen Creative-Engines.",
                  body: "Mirrou entwickelt visuelle Systeme, die nicht nur schön sind — sondern konvertieren. Wir sind die Schnittstelle aus High-End-Fotografie, KI-Produktion und Performance-Daten. Für D2C-Brands in Beauty, Health & Lifestyle, die nicht wählen wollen zwischen Ästhetik und ROI.",
                },
                {
                  label: "Vision Statement",
                  n: "02",
                  headline: "Das führende Performance Creative Studio im DACH-Raum.",
                  body: "In fünf Jahren ist Mirrou der Standard für Creative Excellence in der D2C-Beauty-Kategorie. Die Marke, die beweist, dass systematische Ästhetik und messbare Performance kein Widerspruch sind — sondern dasselbe Ziel.",
                },
                {
                  label: "Brand Promise",
                  n: "03",
                  headline: "Creatives, die systematisch funktionieren.",
                  body: "Jeder Mirrou-Kunde bekommt: Editorial-Grade Qualität in jedem Frame. Eine Creative-Engine, die lernfähig ist. Volle EU-Compliance ohne Mehraufwand. Und ein Partner, der Ästhetik und Performance gleichzeitig denkt — ohne einen dieser Punkte zu opfern.",
                },
                {
                  label: "Positioning Statement",
                  n: "04",
                  headline: "Für D2C-Brands die skalieren wollen.",
                  body: "Mirrou Creative Studio ist das erste Boutique-Studio für Performance-Creatives, das High-End-Fotografie, KI-Hybrid-Produktion und Paid-Ads-Analytics als ein System denkt — spezialisiert auf Beauty, Health & Lifestyle im DACH-Raum, Compliance-by-Design seit Tag 1.",
                },
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
            <p className="eyebrow mb-6">Core Values</p>
            <div className="space-y-px bg-white/6 border border-white/6">
              {[
                {
                  n: "01",
                  label: "Präzision",
                  headline: "Kein Frame ohne Grund.",
                  body: "Jede Entscheidung — Licht, Oberfläche, Farbe, Timing — ist begründet. Mirrou produziert keine Bilder, wir konstruieren visuelle Argumente. Präzision ist nicht Perfektionismus. Es ist die Disziplin, jede Variable bewusst zu wählen und ihr Ergebnis messen zu können.",
                },
                {
                  n: "02",
                  label: "Performance",
                  headline: "Ästhetik, die Zahlen liefert.",
                  body: "Schönheit ohne Wirkung ist Dekoration. Wirkung ohne Schönheit ist Commodity. Mirrou baut an der Schnittstelle: Visuals, die im Feed stoppen und im Funnel konvertieren. Jedes Creative wird mit einer Hypothese geschaffen und mit Daten bewertet.",
                },
                {
                  n: "03",
                  label: "Integrität",
                  headline: "Compliance ist kein Constraint — es ist Design.",
                  body: "EU AI Act, DSGVO, C2PA: Mirrou hat die gesamte regulatorische Infrastruktur von Anfang an in das Studio-Modell eingebaut. Transparenz über KI-Nutzung. Klare Datenprozesse. Audit-ready Deliverables. Nicht weil es Pflicht ist — sondern weil es die richtige Art ist, zu arbeiten.",
                },
                {
                  n: "04",
                  label: "Eigenständigkeit",
                  headline: "Das Studio gehört dem Kunden — nicht umgekehrt.",
                  body: "Lock-in ist nicht Geschäftsmodell. Creative-Learning-Log, Test-Daten und Asset-Libraries werden vollständig übergeben. Kunden sollen Mirrou wählen, weil wir der beste Partner sind — nicht weil sie keine Wahl haben. Das ist die Grundlage für jede langfristige Zusammenarbeit.",
                },
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
                Brand Personality & Voice
              </h2>
            </div>
          </div>

          {/* Brand Personality */}
          <div className="mb-20">
            <p className="eyebrow mb-6">Brand Personality · 5 Adjektive</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/6 border border-white/6">
              {[
                {
                  adj: "Präzise",
                  body: "Mirrou gibt keine groben Versprechen. Jede Aussage ist belegt, jede Empfehlung begründet. Präzision bedeutet: weniger sagen, aber präziser — und immer mit Nachweis.",
                },
                {
                  adj: "Direkt",
                  body: "Kein Warm-up, kein Verkaufs-Jargon, kein Bullshit. Mirrou sagt, was gemeint ist. Direktheit ist Respekt — gegenüber der Zeit und der Intelligenz des Gegenübers.",
                },
                {
                  adj: "Editorial",
                  body: "Mirrou denkt und kommuniziert wie ein Kurator, nicht wie ein Verkäufer. Jede Entscheidung — ob visuell oder sprachlich — trifft einen ästhetischen Standard. Niemals generisch.",
                },
                {
                  adj: "Technisch-kreativ",
                  body: "Mirrou lebt an der Schnittstelle aus Daten und Ästhetik. Die Sprache reflektiert das: präzise Terminologie, ohne die kreative Substanz zu verlieren. Kein False Dilemma zwischen Schönheit und Performance.",
                },
                {
                  adj: "Souverän",
                  body: "Mirrou muss sich nicht rechtfertigen. Die Tonalität ist ruhig, nicht laut. Confidence ohne Arroganz — wir wissen, was wir können, und müssen das nicht beweisen, indem wir andere kleinmachen.",
                },
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
            <p className="eyebrow mb-6">Tone of Voice · 5 Prinzipien</p>
            <div className="space-y-px bg-white/6 border border-white/6">
              {[
                {
                  n: "01",
                  principle: "Hypothese vor Bauchgefühl",
                  body: "Mirrou leitet Empfehlungen immer aus Daten ab. Nicht: 'Wir empfehlen dunkle Hintergründe.' Sondern: 'Schwarze Surfaces erzielen in unserer Beauty-Kategorie 2,3× mehr Scroll-Stop als helle — hier ist der Test.'",
                },
                {
                  n: "02",
                  principle: "Kürze ist keine Arroganz",
                  body: "Ein Satz, der alles sagt, ist besser als drei, die dasselbe wiederholen. Mirrou-Texte sind verdichtet — jedes Wort verdient seinen Platz. Das gilt für Captions, Pitch-Decks, E-Mails und Webseiten-Copy gleichermaßen.",
                },
                {
                  n: "03",
                  principle: "System vor Einzelbild",
                  body: "Mirrou spricht nie über einzelne Assets, immer über Systeme. Nicht: 'Ein schönes Produktfoto.' Sondern: 'Ein Visual-System, das Awareness, Consideration und Conversion gleichzeitig adressiert.'",
                },
                {
                  n: "04",
                  principle: "Komplexität verdichten, nicht vereinfachen",
                  body: "Mirrou erklärt komplexe Konzepte nicht, indem es sie vereinfacht — sondern indem es die richtige Analogie findet. Kein Herunterschreiben auf ein vermeintlich niedriges Verständnisniveau. Kunden werden als Profis angesprochen.",
                },
                {
                  n: "05",
                  principle: "Emotion durch Präzision, nicht durch Ausrufezeichen",
                  body: "Mirrou erzeugt keine künstliche Begeisterung. Emotion entsteht durch präzise Sprache: 'Creatives, die in 48 Stunden ausgeliefert werden' hat mehr Kraft als 'Wir sind super schnell!'",
                },
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
            <p className="eyebrow mb-6">Wie Mirrou klingt — und wie nicht</p>
            <DosDonts
              dos={[
                "Klare Zahlen statt vager Versprechen",
                "Kurze, dichte Sätze — aktiv, nicht passiv",
                "Technische Begriffe, wenn sie präziser sind",
                "Wir-Form für Studio-Aussagen",
                "Fragen, die den Kunden weiterbringen",
                "Kein Punkt nach einer Überschrift",
                "Deutsche Texte auf Deutsch, keine falschen Anglizismen",
                "EU-Konformität als Stärke kommunizieren",
              ]}
              donts={[
                "Superlative ohne Beweis ('das beste Studio')",
                "Füllwörter ('eigentlich', 'irgendwie', 'sozusagen')",
                "Englische Buzzwords ohne Substanz ('synergy', 'holistic')",
                "Dreifach-Ausrufezeichen oder Emoji in professionellen Kontexten",
                "Passive Konstruktionen ('es wird empfohlen')",
                "Vage Versprechen ohne Metrik oder Beispiel",
                "Selbstlob ohne Kontext ('wir sind kreativ')",
                "Floskeln aus der Agenturwelt ('out of the box')",
              ]}
            />
          </div>

          {/* Vorher / Nachher */}
          <div className="mb-20">
            <p className="eyebrow mb-6">Vorher / Nachher · 3 Beispiele</p>
            <div className="space-y-3">
              <BeforeAfter
                label="Über unsere Arbeit"
                before="Wir erstellen kreative und ansprechende Inhalte für Social Media, die Ihre Zielgruppe begeistern."
                after="Wir produzieren Ad-Creatives mit einer dokumentierten Hypothese pro Variante — so wird jeder Launch ein messbarer Test, kein Bauchgefühl."
              />
              <BeforeAfter
                label="Bei der Angebotsvorstellung"
                before="Wir würden uns sehr freuen, mit Ihnen zusammenzuarbeiten und können Ihnen ein individuelles Angebot erstellen."
                after="Welches Paket passt, hängt von eurem Ad-Spend ab. 30 Minuten Gespräch reichen, um das zu klären. Kostenfrei, ohne Pitch."
              />
              <BeforeAfter
                label="Über KI-Nutzung"
                before="Wir nutzen modernste KI-Tools, um Ihre Visuals auf das nächste Level zu heben!"
                after="Jedes KI-generierte Element ist im Deliverable-Set dokumentiert und EU-AI-Act-konform gekennzeichnet. Das Produkt bleibt immer real."
              />
            </div>
          </div>

          {/* Verbotene Wörter */}
          <div>
            <p className="eyebrow mb-6">Verbotene Wörter & Phrasen</p>
            <div className="border border-white/6 bg-surface/20 p-8 md:p-10">
              <p className="text-body mb-6">
                Diese Begriffe werden im Mirrou-Kontext nie verwendet — sie widersprechen dem Tonalitätsprinzip der Präzision:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {[
                  "disruptiv",
                  "innovativ",
                  "holistisch",
                  "synergistisch",
                  "Mehrwert schaffen",
                  "out of the box",
                  "360°-Lösung",
                  "next level",
                  "skalierbar (ohne Kontext)",
                  "agil (ohne Kontext)",
                  "Storytelling (als Floskeln)",
                  "begeistern (übertrieben)",
                  "Game Changer",
                  "Win-Win",
                  "auf Augenhöhe",
                  "zielgruppengerecht",
                ].map((w) => (
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
                Visual Identity System
              </h2>
            </div>
          </div>

          {/* Farbsystem */}
          <div className="mb-20">
            <p className="eyebrow mb-6">Farbsystem · Palette</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <ColorSwatch
                hex="#080808"
                name="Void Black"
                role="Primärfarbe"
                rgb="RGB 8 / 8 / 8"
                cmyk="C0 M0 Y0 K97"
                usage="Hintergrund aller primären Flächen. Nie durch ein anderes Schwarz ersetzt."
              />
              <ColorSwatch
                hex="#C8A25A"
                name="Studio Gold"
                role="Akzentfarbe"
                rgb="RGB 200 / 162 / 90"
                cmyk="C0 M19 Y55 K22"
                usage="CTAs, Eyebrows, Metrik-Highlights, Hover-States. Sparsam einsetzen."
              />
              <ColorSwatch
                hex="#F2EFE9"
                name="Cream White"
                role="Kontrastfarbe"
                rgb="RGB 242 / 239 / 233"
                cmyk="C0 M1 Y4 K5"
                usage="Primäre Textfarbe (ink) auf dunklem Ground. Alternativ: Cream-Section-Hintergrund."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <ColorSwatch
                hex="#111113"
                name="Surface"
                role="Sekundärfläche"
                rgb="RGB 17 / 17 / 19"
                cmyk="C11 M11 Y0 K93"
                usage="Cards, Hover-Flächen, zweite Ebene über Void Black."
              />
              <ColorSwatch
                hex="#E4C07A"
                name="Gold Light"
                role="Akzent Hell"
                rgb="RGB 228 / 192 / 122"
                cmyk="C0 M16 Y46 K11"
                usage="Hover-State auf Gold. Nie als Primärfarbe verwenden."
              />
              <ColorSwatch
                hex="#6E6B66"
                name="Muted"
                role="Tertiärtext"
                rgb="RGB 110 / 107 / 102"
                cmyk="C0 M3 Y7 K57"
                usage="Labels, Timestamps, sekundäre Metadaten. Nie für Fließtext."
              />
            </div>

            <div className="border border-white/6 bg-surface/20 p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-5">
                Verwendungsregeln
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-2">
                  {[
                    "Primär: Schwarz (080808) als dominante Fläche",
                    "Akzent (Gold) nicht auf Gold — immer auf Schwarz oder Weiß",
                    "Cream als Text auf Schwarz: immer ≥ AA Kontrast-Ratio",
                    "Gold sparsam: maximal 15% einer Fläche",
                  ].map((r) => (
                    <li key={r} className="flex gap-3 text-body text-[13px] items-start">
                      <span className="text-accent mt-0.5 shrink-0">→</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2">
                  {[
                    "Nie: Gold auf Cream (zu geringer Kontrast)",
                    "Nie: Farbige Hintergründe (nur Schwarz / Off-White)",
                    "Nie: Buntes Farbband zur Sektions-Trennung",
                    "Nie: Transparenzen unter 10% Opacity für Text",
                  ].map((r) => (
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
            <p className="eyebrow mb-6">Typografie · System</p>
            <div className="space-y-px bg-white/6 border border-white/6">
              {[
                {
                  n: "01",
                  role: "Primärschrift · Headlines",
                  name: "Cormorant Garamond",
                  style: "Italic, Weight 300",
                  usage: "H1, Hero-Headlines, Zitate, emotionale Statements",
                  example: "Algorithm of Soul.",
                  exClass: "font-serif italic text-5xl",
                  spec: "Size: 72–220px clamp · Leading: 0.88 · Tracking: –0.03em",
                },
                {
                  n: "02",
                  role: "Sekundärschrift · Labels & Tags",
                  name: "JetBrains Mono",
                  style: "Weight 400–600, UPPERCASE",
                  usage: "Eyebrows, Metadaten, CTAs, Navigation, Timestamps",
                  example: "PERFORMANCE CREATIVE · DACH",
                  exClass: "font-mono text-sm uppercase tracking-[0.4em]",
                  spec: "Size: 9–12px · Tracking: 0.35–0.55em · immer UPPERCASE",
                },
                {
                  n: "03",
                  role: "Tertiärschrift · Fließtext",
                  name: "Inter",
                  style: "Weight 300, Regular",
                  usage: "Body-Copy, Beschreibungen, Formularfelder",
                  example: "Editorial-grade Visuals. Systematisches A/B-Testing.",
                  exClass: "font-sans text-body",
                  spec: "Size: 17–21px · Leading: 1.7 · Tracking: normal",
                },
              ].map((t) => (
                <div key={t.n} className="bg-bg p-8 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                    <div className="lg:col-span-4">
                      <div className="flex items-baseline gap-4 mb-4">
                        <span className="font-mono text-accent text-[11px] tracking-[0.4em]">
                          {t.n}
                        </span>
                        <span className="font-mono text-muted text-[10px] uppercase tracking-[0.32em]">
                          {t.role}
                        </span>
                      </div>
                      <p className="font-serif text-xl text-ink mb-1">{t.name}</p>
                      <p className="font-mono text-[10px] text-muted uppercase tracking-[0.3em] mb-3">
                        {t.style}
                      </p>
                      <p className="text-body text-[13px]">{t.usage}</p>
                    </div>
                    <div className="lg:col-span-8">
                      <p className={`${t.exClass} text-ink mb-6 leading-tight`}>
                        {t.example}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted border-t border-white/6 pt-4">
                        {t.spec}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Type Scale */}
            <div className="mt-4 border border-white/6 bg-surface/20 p-8 md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-6">
                Größenhierarchie
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
                ].map((t) => (
                  <div key={t.label} className="grid grid-cols-12 gap-4 items-baseline border-b border-white/4 pb-4">
                    <div className="col-span-3">
                      <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-muted">{t.label}</p>
                      <p className="font-mono text-[9px] text-muted/50">{t.size}</p>
                    </div>
                    <div className="col-span-9">
                      <p className={t.cls}>{t.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Logo & Wortmarke */}
          <div className="mb-20">
            <p className="eyebrow mb-6">Logo & Wortmarke · Verwendungsregeln</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-white/8 bg-surface/30 p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-6">
                  Primäre Wortmarke
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
                  {[
                    "Schutzzone: x-Höhe des M rundum",
                    "Mindestgröße: 80px Breite digital, 20mm Print",
                    "Erlaubte Hintergründe: Schwarz, Weiß, Off-White",
                    "Gold auf Schwarz: akzeptiert für Sub-Brand",
                  ].map((r) => (
                    <li key={r} className="flex gap-3 text-[13px] text-body items-start">
                      <span className="text-accent shrink-0 mt-0.5">→</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-white/8 bg-surface/30 p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted mb-6">
                  Verbotene Verwendungen
                </p>
                <ul className="space-y-2">
                  {[
                    "Nie auf farbigen oder gemusterten Hintergründen",
                    "Nie skaliert unter Mindestgröße",
                    "Nie gedehnt, gestaucht oder rotiert",
                    "Nie mit Schatten oder Gloweffekten",
                    "Nie in Farbverläufen verwenden",
                    "Nie 'Mirrou' ohne 'Creative Studio' im formalen Kontext",
                    "Nie Lowercase: 'mirrou' ist falsch",
                    "Nie in konkurrierenden Plattform-Logos integrieren",
                  ].map((r) => (
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
            <p className="eyebrow mb-6">Bildsprache & Fotografie-Stil</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/6 border border-white/6">
              {[
                {
                  n: "01",
                  label: "Editorial-Grade Photography",
                  items: [
                    "Präzision in jedem Frame — Makro-Details, Hauttöne, Texturen",
                    "Dunkle Hintergründe als Default (Schwarz, tiefes Grau, Marmor)",
                    "Einzelne Lichtquelle — dramatisch, kontrolliert",
                    "Produkt nie KI-generiert — immer echte Fotografie",
                    "Keine Stockfotos. Kein Lifestyle-Klischee",
                    "Quasi-Monochrom als Standard — ein einziger Farbakzent erlaubt",
                  ],
                },
                {
                  n: "02",
                  label: "AI-Hybrid Visual Guidelines",
                  items: [
                    "KI nur für Hintergründe, Atmosphären, Partikel, Compositing",
                    "Jedes KI-Element EU-AI-Act-konform gekennzeichnet",
                    "Qualitätsprotokoll: Generierung → Kuration → Korn → Lichtphysik",
                    "Kein Blind-Output: jedes Frame besteht redaktionellen Kurations-Check",
                    "Keine gesichtslosen AI-Personen in Mirrou-Creatives",
                    "C2PA-Metadaten in jedem Export",
                  ],
                },
                {
                  n: "03",
                  label: "Verbotene Bildstile",
                  items: [
                    "Helle, weiße Lifestyle-Fotografie",
                    "Unbearbeitete Rohbilder ohne Mirrou-Tonung",
                    "Stock-Diversity-Imagery",
                    "Neon-Vollsättigung ohne Disziplin",
                    "Flat-Lay ohne ästhetische Grammatik",
                    "Generische Beauty-Formulierungen im Bild",
                  ],
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
            <p className="eyebrow mb-6">Motion & Animation · Prinzipien</p>
            <div className="border border-white/6 bg-surface/20 p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-4">
                    Wie sich Mirrou bewegt
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Easing: cubic-bezier(0.16, 1, 0.3, 1) — expo-out, nie bounce",
                      "Dauer: 300–900ms für UI-Elemente, 0.9–1.4s für Reveals",
                      "Scroll-triggered: fade + translateY(18px) → 0",
                      "Grain-Overlay: immer animated, 0.5s steps(1) infinite",
                      "Hover: subtil — scale 1.06, translateY -2px, nie dramatisch",
                      "Keine Rotation außer für dekorative Elemente",
                    ].map((r) => (
                      <li key={r} className="flex gap-3 text-body text-[13px] items-start">
                        <span className="text-accent mt-0.5 shrink-0">→</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted mb-4">
                    Was nie animiert wird
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Partikeleffekte als primäres Design-Element",
                      "Autoplay-Videos ohne User-Intent",
                      "Bounce-Easing oder Spring-Animationen",
                      "Komplexe Page-Transitions (behindert SEO)",
                      "Vollbild-Ladeanimationen über 1.5 Sekunden",
                      "Blinkende oder pulsierende UI-Elemente",
                    ].map((r) => (
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
                Messaging Framework
              </h2>
            </div>
          </div>

          {/* Claims & Taglines */}
          <div className="mb-20">
            <p className="eyebrow mb-6">Claims & Taglines</p>
            <div className="space-y-px bg-white/6 border border-white/6">
              {[
                {
                  claim: "Algorithm of Soul",
                  context: "Primär-Claim · Hero-Ebene",
                  body: "Steht für die Philosophie: Kreativität (Soul) + systematische Logik (Algorithm). Verwendet im Hero, als Sub-Label in der Wortmarke, als Watermark in Visuals. Nie durch andere Formulierungen ersetzt — es ist der Meta-Claim der Marke.",
                  use: "Hero, Wordmark-Sub, Watermark, Social Bio",
                },
                {
                  claim: "Wo Ästhetik Algorithmus wird.",
                  context: "Haupt-Tagline · Sub-Claim",
                  body: "Die DE-Entsprechung des Meta-Claims. Verwendet als Hero-H1 auf der Website und in deutschsprachigen Kampagnenmaterialien. Präzise Formulierung — keine Variation oder Paraphrase.",
                  use: "Website Hero, DE-Kampagnen, Pitch-Deckcover",
                },
                {
                  claim: "Creatives, die systematisch funktionieren.",
                  context: "Leistungs-Tagline · Mid-Funnel",
                  body: "Positioniert das Mirrou-Angebot präzise: nicht schöne Bilder, sondern ein System. Verwendet in Performance-Kontexten, Angeboten, Service-Beschreibungen.",
                  use: "Service-Seiten, Angebote, LinkedIn-Copy, Mid-Funnel Ads",
                },
                {
                  claim: "Three Disciplines. One Engine.",
                  context: "EN-Tagline · Pitch & International",
                  body: "Englische Variante für Pitches, internationale Partner und EN-Content. Beschreibt das Drei-Säulen-System (Fotografie · KI · Analytics) auf einer Zeile.",
                  use: "EN-Pitches, Investoren-Decks, internationale Partner",
                },
              ].map((t) => (
                <div key={t.claim} className="bg-bg p-8 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
                    <div className="lg:col-span-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted mb-2">
                        {t.context}
                      </p>
                      <p className="font-serif italic text-2xl text-accent leading-tight">
                        {t.claim}
                      </p>
                    </div>
                    <div className="lg:col-span-5">
                      <p className="text-body text-[14px]">{t.body}</p>
                    </div>
                    <div className="lg:col-span-3">
                      <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-muted mb-2">
                        Verwendung
                      </p>
                      <p className="text-body text-[13px]">{t.use}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Elevator Pitches */}
          <div className="mb-20">
            <p className="eyebrow mb-6">Elevator Pitches</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/6 border border-white/6">
              {[
                {
                  n: "30 Sek",
                  label: "Kurz-Pitch",
                  body: "Mirrou ist ein Performance Creative Studio aus Hamburg. Wir produzieren Ad-Creatives für D2C-Brands in Beauty, Health und Lifestyle — als Hybrid aus High-End-Fotografie und KI-Produktion, mit A/B-Testing und Analytics in jeder Phase. Kein Trade-off zwischen Ästhetik und ROI.",
                },
                {
                  n: "60 Sek",
                  label: "Standard-Pitch",
                  body: "Mirrou baut Creative-Engines für D2C-Brands. Das Problem: In Paid Social hängen bis zu 70% des Kampagnenerfolgs am Creative — aber die meisten Brands arbeiten mit Generalisten, die weder die Kategorie noch die Plattformen tief genug kennen. Wir lösen das mit einem System: echte High-End-Fotografie als Basis, KI-generierte Hintergründe für skalierbare Varianten, und systematisches A/B-Testing, das jedes Creative in eine Hypothese verwandelt. EU-AI-Act-konform von Tag 1. Boutique-Studio, Senior-Direktion in jedem Projekt.",
                },
                {
                  n: "3 Min",
                  label: "Pitch-Meeting",
                  body: "Im Paid Social hat sich der Hebel verschoben. Targeting ist Commodity — Plattformen automatisieren es. Was bleibt als echter Wettbewerbsvorteil: das Creative. Aber Creatives ermüden schnell. Ab 30k€/Monat Ad-Spend brennen sie in 2–4 Wochen aus. Wer skalieren will, braucht keine einzelne Kampagne — er braucht eine Engine, die kontinuierlich produziert, testet und lernt.\n\nMirrou baut genau diese Engine. Wir arbeiten an der Schnittstelle aus drei Disziplinen: High-End-Fotografie für produktechte Basis-Visuals, KI-generierte Hintergründe für skalierbare Stilvarianten ohne Re-Shooting, und Paid-Ads Analytics, die jede Variante mit einer dokumentierten Hypothese verbindet.\n\nWas das bedeutet: Jeder Launch ist ein messbarer Test. Jeder Zyklus macht das nächste Creative besser. Und alles ist EU-AI-Act-konform dokumentiert — was 2026 Pflicht wird, ist bei uns Standard.\n\nZielgruppe: D2C Beauty-, Health- und Lifestyle-Brands im DACH-Raum, die zwischen 10k und 150k€/Monat in Paid Social investieren.",
                },
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
            <p className="eyebrow mb-6">Key Messages · Zielgruppen</p>
            <div className="space-y-px bg-white/6 border border-white/6">
              {[
                {
                  audience: "D2C Brand Founder / CMO",
                  label: "Hauptzielgruppe",
                  messages: [
                    "70% des Kampagnenerfolgs hängen am Creative — nicht am Budget.",
                    "Ab 30k€ Spend braucht deine Marke eine Engine, keine Kampagne.",
                    "Du bekommst Editorial-Grade Qualität und messbare Performance — kein Trade-off.",
                    "Compliance ist bei uns kein Extra. Alles EU-AI-Act-konform von Tag 1.",
                  ],
                },
                {
                  audience: "Performance Marketing Manager",
                  label: "Technisch-operativ",
                  messages: [
                    "Jedes Creative kommt mit einer dokumentierten Hypothese — direkt in die Teststruktur integrierbar.",
                    "A/B-Logik in der Produktion: Variablen-Isolation als Standard.",
                    "Deliverables sind performance-ready: Specs, Hook-Varianten, alle Formate.",
                    "Learning-Log wird mitgepflegt und übergeben — kein Wissensverlust beim Wechsel.",
                  ],
                },
                {
                  audience: "Investor / Partner",
                  label: "Strategisch",
                  messages: [
                    "Mirrou ist im Markt positioniert, bevor Compliance-Pflichten greifen — Zeitvorsprung als struktureller Vorteil.",
                    "Beauty, Health & Lifestyle DACH: ein stark wachsendes Segment mit geringer Spezialisierung.",
                    "Boutique-Modell: Senior-Direktion in jedem Projekt — kein Volumen-Tradeoff.",
                    "Skalierbar durch KI-Hybridmodell ohne proportionale Kostensteigerung.",
                  ],
                },
                {
                  audience: "Creative Talent · Recruiting",
                  label: "Interne Kommunikation",
                  messages: [
                    "Mirrou arbeitet an der Schnittstelle, die die meisten Studios nicht besetzen: Daten und Ästhetik gleichzeitig.",
                    "Kein Volumen-Studio. Jedes Projekt mit Senior-Direktion und klarem Brief.",
                    "KI ist kein Replacement — es ist das Werkzeug, das Kreativität skalierbar macht.",
                    "Compliance-by-Design: wir bauen, wie die Industrie in 2026 arbeiten wird.",
                  ],
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
            <p className="eyebrow mb-6">SEO & Brand Keywords</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-white/6 bg-surface/20 p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-5">
                  Top 15 Brand Keywords
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
                  Meta-Template · Struktur
                </p>
                <div className="space-y-5">
                  {[
                    {
                      type: "Homepage",
                      title: "Mirrou Creative Studio | Performance Creatives für Beauty & Lifestyle",
                      desc: "Mirrou Creative Studio — Performance Creatives für Beauty-, Health- & Lifestyle-Brands. High-End-Fotografie, KI-Visuals und systematisches Creative-Testing. Creative Direction: Olha Yevtushenko.",
                    },
                    {
                      type: "Service Page",
                      title: "[Service] · Mirrou Creative Studio | [Benefit]",
                      desc: "[Konkrete Leistung] für D2C-Brands in [Kategorie]. [1 Metrik oder Beweis]. Mirrou Creative Studio — Hamburg · Berlin · DACH.",
                    },
                    {
                      type: "Case Page",
                      title: "[Case Name] · Visual System · Mirrou Creative Studio",
                      desc: "[Case Tagline]. [Kategorie] · [1 Performance-Metrik]. Editorial-grade Hybrid-Produktion von Mirrou Creative Studio.",
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
                Application Guidelines
              </h2>
            </div>
          </div>

          {/* Website */}
          <div className="mb-20">
            <p className="eyebrow mb-6">Website · UI-Standards</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/6 border border-white/6">
              <div className="bg-bg p-8 lg:p-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-5">
                  CTA-Stil & Formulierung
                </p>
                <ul className="space-y-3">
                  {[
                    "Primär-CTA: 'Strategiegespräch buchen →' (Gold, immer rechts-Pfeil)",
                    "Sekundär-CTA: 'Wie wir arbeiten ↓' (Ghost, transparent)",
                    "Kein 'Jetzt anfragen' oder 'Kontaktieren' — zu generisch",
                    "CTAs immer UPPERCASE, JetBrains Mono, 10–11px",
                    "Hover: translateY(-2px) + overlay-shimmer",
                  ].map((r) => (
                    <li key={r} className="flex gap-3 text-body text-[13px] items-start">
                      <span className="text-accent mt-0.5 shrink-0">→</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-bg p-8 lg:p-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-5">
                  Layout-Prinzipien
                </p>
                <ul className="space-y-3">
                  {[
                    "Sektionen trennen durch Whitespace oder thin Border — nie Farbbänder",
                    "max-w-7xl mx-auto als primärer Container",
                    "Grid: immer 12-Spalten-Basis, 1px-Gap bg-white/6",
                    "Gold-Rule (.gold-rule) als dezenter Trennungs-Marker",
                    "Grain-Overlay immer aktiv (z-9998, pointer-events-none)",
                    "Sections: eyebrow → h2 → body → CTA — immer in dieser Hierarchie",
                  ].map((r) => (
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
            <p className="eyebrow mb-6">Social Media · Platform-Standards</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/6 border border-white/6">
              {[
                {
                  platform: "LinkedIn",
                  items: [
                    "Posting-Format: Erkenntnis + Daten + CTA",
                    "Kein Emoji, keine Hashtag-Stacks am Ende",
                    "Bilder: Dark-Mode Markenfarben, niemals helle Lifestyle-Fotos",
                    "Ton: technisch-präzise, nicht motivational",
                    "Frequenz: 2–3× pro Woche max.",
                    "Immer → 'Mirrou Creative Studio' als Absender, nie anonym",
                  ],
                },
                {
                  platform: "Instagram",
                  items: [
                    "Grid: monochrom-editorial, Gold-Akzente sparsam",
                    "Kein Lifestyle-Mix: ausschließlich Produkt-/Visual-Content",
                    "Caption: kurz, direkt, kein Emoji-Stack",
                    "Stories: Behind-the-Scenes der Produktion — präzise Einblicke",
                    "Reels: maximal 15–30s, keine Trending-Sounds",
                    "Hashtags: 5–8, spezifisch (nie #inspo oder #design)",
                  ],
                },
                {
                  platform: "Behance",
                  items: [
                    "Portfolioseite: System-Darstellung — nie Einzelbilder",
                    "Jedes Projekt mit: Kontext, Hypothese, Visual-System, Metriken",
                    "Projektcover: 4:3, Schwarz mit Gold-Akzent",
                    "Bildunterschriften: präzise, keine Superlative",
                    "Tags: Kategorie-spezifisch (Beauty, D2C, Performance Creative)",
                    "Sprache: EN für internationale Reichweite",
                  ],
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
            <p className="eyebrow mb-6">Präsentationen & Decks</p>
            <div className="border border-white/6 bg-surface/20 p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-4">
                    Titelfolie
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Hintergrund: Void Black (#080808)",
                      "Logo oben links: MIRROU + Creative Studio",
                      "Haupttitel: Cormorant Garamond Italic, 48–60pt",
                      "Untertitel / Datum: JetBrains Mono Uppercase, 10pt",
                      "Gold-Rule als horizontaler Trenner",
                    ].map((r) => (
                      <li key={r} className="text-body text-[13px] leading-snug">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-4">
                    Content-Folien
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Eyebrow (Mono) + H2 (Serif) + Body (Inter)",
                      "Max. 4 Bullet Points pro Folie",
                      "Daten immer in Serif-Italic (groß) + Mono-Label (klein)",
                      "Keine bunten Hintergründe oder Gradients",
                      "Konsistenter linker Margin: 10% der Folienbreite",
                    ].map((r) => (
                      <li key={r} className="text-body text-[13px] leading-snug">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-4">
                    Abschlussfolie
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Algorithm of Soul · Centered",
                      "Website: mirrou.studio",
                      "E-Mail: hallo@mirrou.studio",
                      "QR-Code optional (Schwarz auf Gold oder umgekehrt)",
                      "Kein 'Danke!'-Schriftzug",
                    ].map((r) => (
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
            <p className="eyebrow mb-6">E-Mail Signatur · Template</p>
            <div className="border border-white/8 bg-surface/30 p-8 md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted mb-6">
                Standard-Vorlage (Plaintext + HTML)
              </p>
              <div className="bg-bg border border-white/6 p-8 font-mono text-[13px] leading-7 text-ink/80">
                <p className="text-ink font-semibold">[Vorname Nachname]</p>
                <p className="text-muted text-[11px] tracking-[0.2em] uppercase">
                  [Funktion] · Mirrou Creative Studio
                </p>
                <br />
                <p>
                  <span className="text-accent">mirrou.studio</span>
                </p>
                <p>hallo@mirrou.studio</p>
                <br />
                <p className="text-muted text-[11px]">
                  Hamburg (Produktion) · Berlin (Performance, AI & Growth)
                </p>
                <br />
                <p className="text-muted/60 text-[10px] uppercase tracking-[0.3em]">
                  Algorithm of Soul · EU AI Act Compliant · DSGVO-konform
                </p>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-3">
                    Regeln
                  </p>
                  <ul className="space-y-1">
                    {[
                      "Keine Bilder oder Banner in der Signatur",
                      "Kein Social-Media-Icon-Cluster",
                      "Kein Disclaimer-Block außer wenn rechtlich notwendig",
                      "Konsistente Schriftgröße: System-Standard (12–13pt)",
                    ].map((r) => (
                      <li key={r} className="flex gap-2 text-body text-[13px] items-start">
                        <span className="text-accent mt-0.5 shrink-0">→</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted mb-3">
                    Optional (Kontext-abhängig)
                  </p>
                  <ul className="space-y-1">
                    {[
                      "LinkedIn-URL für externe Kommunikation",
                      "Calendly-Link für direkte Terminbuchung",
                      "Aktueller Case-Link für Sales-Kontext",
                    ].map((r) => (
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
                Logo System & Assets
              </h2>
            </div>
          </div>

          <div className="mb-16">
            <p className="eyebrow mb-6">Logo System & Assets · Overview</p>
            <div className="border border-white/8 bg-surface/30 p-8 md:p-12">
              <h3 className="font-serif italic text-2xl text-accent mb-4">
                Jedes Asset. Jeder Kanal. Kein Kompromiss.
              </h3>
              <p className="text-body max-w-3xl leading-relaxed mb-4">
                Als Performance Creative Studio leben wir die eigenen Prinzipien bei jeder Facette unserer Markenidentität. 
                Jedes Logo und Social-Media-Asset wurde im exakten Seitenverhältnis und Format-Standard direkt als Vektorgrafik (SVG) gecodet.
              </p>
              <p className="text-body max-w-3xl leading-relaxed">
                Klicke auf den Download-Button unter einem Asset, um die skalierbare Vektorgrafik direkt herunterzuladen. 
                Keine Platzhalter, keine Verpixelung — produktionsreife Assets für maximale Markenkonsistenz.
              </p>
            </div>
          </div>

          {/* SUBSECTION: LOGO SYSTEM */}
          <div className="mb-24">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-8">
              <p className="eyebrow">Wortmarke & Monogramm · Varianten</p>
              <div className="flex bg-white/6 p-1 border border-white/8 rounded-sm self-start">
                <button
                  onClick={() => setLogoTheme("dark")}
                  className={`px-3 py-1 font-mono text-[9px] uppercase tracking-wider transition-colors ${
                    logoTheme === "dark" ? "bg-accent text-bg font-semibold" : "text-muted hover:text-ink"
                  }`}
                >
                  Dunkler Hintergrund
                </button>
                <button
                  onClick={() => setLogoTheme("light")}
                  className={`px-3 py-1 font-mono text-[9px] uppercase tracking-wider transition-colors ${
                    logoTheme === "light" ? "bg-accent text-bg font-semibold" : "text-muted hover:text-ink"
                  }`}
                >
                  Heller Hintergrund
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Logo 1: Primary Logo - Full */}
              <div className="border border-white/8 bg-surface/20 p-6 flex flex-col justify-between">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted mb-4">
                    01 · Primary Logo (Full)
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
                    Querformat für Desktop-Navbar, Kopfzeilen und primäres Branding.
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
                    02 · Stacked Logo
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
                    Quadratische Anordnung für zentrierte Layouts, Beutel und Verpackungen.
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
                    03 · Monogram Icon
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
                    Prägnantes Avatar-Icon für App Icons, Favicons und Siegel.
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
                    04 · Inverse Logo (Transparent)
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
                    Weiße Ausführung auf transparentem Grund für Overlays und Fotos.
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
                    05 · Favicon (32×32px)
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
                    Kompakte 32×32px Ausführung, optimiert auf Pixelgenauigkeit im Browser.
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
                { id: "linkedin", label: "LinkedIn" },
                { id: "instagram", label: "Instagram" },
                { id: "facebook", label: "Facebook" },
                { id: "website", label: "Website Assets" },
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
                        LinkedIn Profile Picture
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
                      Profilbild mit markantem Monogramm. Die gestrichelte Außenlinie zeigt das Kreis-Schnittfenster.
                    </p>
                    <AssetDownloadButton svgId="svg-li-profile" filename="linkedin-profile-picture.svg" />
                  </div>
                </div>

                {/* LinkedIn B: Banner / Cover */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        LinkedIn Banner
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
                      Offizieller Header-Banner für Firmen- und persönliche Accounts mit Markenwerten.
                    </p>
                    <AssetDownloadButton svgId="svg-li-cover" filename="linkedin-banner-cover.svg" />
                  </div>
                </div>

                {/* LinkedIn C: Post Template (Square) */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        Post Template · Square
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
                      Quadratisches Template zur Präsentation von Datenberichten und Performance-Meldungen.
                    </p>
                    <AssetDownloadButton svgId="svg-li-post-sq" filename="linkedin-post-square.svg" />
                  </div>
                </div>

                {/* LinkedIn D: Post Template (Landscape) */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        Post Template · Landscape
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
                      Querformat-Template für Teaser, Blog-Beiträge und Veröffentlichungs-Vorschauen.
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
                        Profile Picture
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
                      Monochromer Profil-Avatar für Instagram mit champagne-farbenem M.
                    </p>
                    <AssetDownloadButton svgId="svg-ig-profile" filename="instagram-profile-avatar.svg" />
                  </div>
                </div>

                {/* Instagram B: Feed Post (Square) */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        Feed Post · Square
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
                      Visual-Template für den quadratischen Feed mit filigranen Gridlines.
                    </p>
                    <AssetDownloadButton svgId="svg-ig-post-sq" filename="instagram-post-square.svg" />
                  </div>
                </div>

                {/* Instagram C: Feed Post (Portrait) */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        Feed Post · Portrait
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
                      Portrait-Template (4:5) für Cases mit viel Platz für Textur-Details und Metriken.
                    </p>
                    <AssetDownloadButton svgId="svg-ig-post-port" filename="instagram-post-portrait.svg" />
                  </div>
                </div>

                {/* Instagram D: Story / Reels Cover */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        Story / Reels Cover
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
                      Vollbild-Template (9:16) für Story-Hintergründe, Reels-Cover und Short-Videos.
                    </p>
                    <AssetDownloadButton svgId="svg-ig-story" filename="instagram-story-cover.svg" />
                  </div>
                </div>

                {/* Instagram E: Highlight Covers (Combined) */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between lg:col-span-2">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        Highlight Cover Icons (6er Set)
                      </p>
                      <p className="font-mono text-[9px] text-muted">Je 400×400px</p>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {[
                        { id: "services", label: "Services", p: "M200,120 L300,170 L200,220 L100,170 Z M200,170 L300,220 L200,270 L100,220 Z M200,220 L300,270 L200,320 L100,270 Z" },
                        { id: "cases", label: "Cases", p: "M200,100 L280,170 L200,300 L120,170 Z M200,100 L200,300 M120,170 L280,170 M150,135 L250,135 L200,170 Z" },
                        { id: "process", label: "Process", p: "M200,160 C240,160 260,200 240,240 C220,280 180,280 160,240 C140,200 160,160 200,160 Z M200,160 L200,110 M160,240 L110,270 M240,240 L290,270" },
                        { id: "frontier", label: "Frontier", p: "M200,100 C230,100 270,115 270,150 C270,220 200,290 200,310 C200,290 130,220 130,150 C130,115 170,100 200,100 Z M170,190 L195,215 L235,165" },
                        { id: "resources", label: "Resources", p: "M130,100 L240,100 L270,130 L270,300 L130,300 Z M240,100 L240,130 L270,130 M160,160 L240,160 M160,200 L240,200 M160,240 L210,240" },
                        { id: "about", label: "About", p: "M200,170 C225,170 245,150 245,125 C245,100 225,80 200,80 C175,80 155,100 155,125 C155,150 175,170 200,170 Z M120,290 C120,230 155,215 200,215 C245,215 280,230 280,290" }
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
                      Einheitliche Cover-Icons für Story-Highlights auf der Profilseite mit präziser Vektorbeschreibung.
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
                        Facebook Page Profile Picture
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
                      Profilbild für Facebook-Seiten und Social-Meta-Profile.
                    </p>
                    <AssetDownloadButton svgId="svg-fb-profile" filename="facebook-profile-picture.svg" />
                  </div>
                </div>

                {/* Facebook B: Page Cover */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        Facebook Page Cover
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
                      Cover-Header für die offizielle Facebook-Seite des Studios.
                    </p>
                    <AssetDownloadButton svgId="svg-fb-cover" filename="facebook-page-cover.svg" />
                  </div>
                </div>

                {/* Facebook C: Ad Creative - Square */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        Facebook Ad Creative · Square Template
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
                      Performance-optimiertes Ad-Grid zur strukturierten Kampagnenerstellung.
                    </p>
                    <AssetDownloadButton svgId="svg-fb-ad-sq" filename="facebook-ad-square-template.svg" />
                  </div>
                </div>

                {/* Facebook D: Ad Creative - Story / Reels Format */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        Facebook Ad Creative · Story Template
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
                      Vollbild-Anzeigenschablone mit visualisierten Sicherheitszonen (Safe Zones) für Meta Stories und Reels.
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
                        Navbar Logo (Retina Optimized)
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
                      Header-Logo der Navbar. Optimierte Vektorpunkte garantieren gestochen scharfe Schrift auf Retina-Monitoren.
                    </p>
                    <AssetDownloadButton svgId="svg-web-nav" filename="website-navbar-logo.svg" />
                  </div>
                </div>

                {/* Website B: Footer Logo */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        Footer Logo
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
                      Dezent skalierte Wortmarke für den Footer-Abschluss mit Akzentuierung in Champagne.
                    </p>
                    <AssetDownloadButton svgId="svg-web-foot" filename="website-footer-logo.svg" />
                  </div>
                </div>

                {/* Website C: Open Graph (OG Image) */}
                <div className="border border-white/6 bg-surface/10 p-6 flex flex-col justify-between md:col-span-2">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                        Open Graph Image (Social Link Preview)
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
                      Vorschau-Grafik (OG Image) für Shared Links auf Plattformen wie LinkedIn, Slack und iMessage.
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
              Creative Performance in Action
            </p>
            <h3 className="font-serif italic text-2xl text-ink mb-6">
              Markenführung als präzise Wissenschaft.
            </h3>
            <p className="text-body max-w-3xl leading-relaxed mb-6">
              Die Asset-Erstellung folgt demselben disziplinierten Ablauf wie unsere Kunden-Produktionen: 
              Wir isolieren Variablen, optimieren Kontraste für verschiedene Displays und halten uns strikt an vordefinierte Raster und Schutzzonen. 
              Unsere Marke kommuniziert durch ein konsistentes visuelles System — von der favicon-Skalierung bis zum Open-Graph-Banner.
            </p>
            <p className="text-[13px] text-muted">
              Referenz: Jedes Vektor-Asset ist im Originalcode implementiert und kann direkt über den Client extrahiert werden. 
              Für den korrekten Ablauf der Content-Pipeline siehe unseren Prozess-Leitfaden (Audit → Brief → Execution → Loop).
            </p>
          </div>
        </section>

        {/* ── CTA Footer ──────────────────────────────────────────── */}
        <section className="py-16 border-t border-accent/20 mb-16">
          <div className="border border-accent/20 bg-accent/4 p-10 md:p-14">
            <p className="eyebrow mb-5">Brand Book · Ende</p>
            <h2 className="font-serif italic text-3xl md:text-4xl leading-tight tracking-tight mb-4">
              Das Betriebssystem ist dokumentiert.
              <br />
              <span className="text-accent">Jetzt wird gebaut.</span>
            </h2>
            <p className="text-body max-w-2xl mb-8">
              Fragen zum Brand Book, Ausnahmen oder Erweiterungen: direkt mit dem Team klären —
              nicht eigenständig vom Standard abweichen. Markenintegrität ist Präzisionsarbeit.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/kontakt" className="btn-primary">
                Strategiegespräch buchen <ArrowRight size={14} />
              </Link>
              <a href="mailto:hallo@mirrou.studio" className="btn-ghost">
                Team kontaktieren <ArrowRight size={14} />
              </a>
            </div>
          </div>
          <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted/40 mt-8 text-center">
            © 2026 Mirrou Creative Studio · Algorithm of Soul · Intern · Vertraulich
          </p>
        </section>
      </div>
    </main>
  );
}
