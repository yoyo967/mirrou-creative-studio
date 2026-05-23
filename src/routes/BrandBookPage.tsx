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
} from "lucide-react";

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
  const observerRef = useRef<IntersectionObserver | null>(null);

  const sections = [
    { id: "foundation", label: "01 · Foundation" },
    { id: "personality", label: "02 · Voice" },
    { id: "visual", label: "03 · Visual Identity" },
    { id: "messaging", label: "04 · Messaging" },
    { id: "application", label: "05 · Application" },
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
