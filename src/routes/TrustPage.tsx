import { Link } from "react-router-dom";
import { ShieldCheck, FileCheck2, Sparkles, Database, FileText, KeyRound, Workflow } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";
import { SITE } from "../content/site-data";

const principleIcons = [Sparkles, ShieldCheck, FileCheck2];
const routineIcons = [FileText, Workflow, Database, KeyRound];

type Principle = { label: string; title: string; items: string[]; timing: string };
type Routine = { title: string; body: string };
type FaqItem = { q: string; a: string };

export default function TrustPage() {
  const { t } = useTranslation("legal");
  const tr = (key: string) => t(`trust.${key}`);

  const principles = t("trust.principles", { returnObjects: true }) as unknown as Principle[];
  const routines = t("trust.routines", { returnObjects: true }) as unknown as Routine[];
  const faqItems = t("trust.faq", { returnObjects: true }) as unknown as FaqItem[];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url + "/" },
      { "@type": "ListItem", position: 2, name: "Trust Center", item: SITE.url + "/trust" },
    ],
  };

  return (
    <main className="min-h-screen pt-40 pb-24 relative z-10">
      <SEO
        title={tr("seoTitle")}
        description={tr("seoDesc")}
        pathname="/trust"
        jsonLd={[faqLd, breadcrumbLd]}
      />

      {/* Hero */}
      <section className="px-6 md:px-10 max-w-6xl mx-auto">
        <p className="eyebrow mb-6">{tr("hero.eyebrow")}</p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-balance">
          {tr("hero.headline")}
          <br />
          <span className="italic">{tr("hero.headlineItalic")}</span>
          <span className="text-accent">{tr("hero.headlineDot")}</span>
        </h1>
        <p className="text-body-lg mt-8 max-w-3xl">{tr("hero.body1")}</p>
        <p className="text-body mt-6 max-w-3xl">
          {tr("hero.body2")}{" "}
          <a href={`mailto:${SITE.email}`} className="text-accent hover:underline">
            {SITE.email}
          </a>.
        </p>
      </section>

      {/* Frontier argument */}
      <section className="mt-20 md:mt-28 px-6 md:px-10 max-w-6xl mx-auto">
        <div className="border border-accent/20 bg-accent/4 p-8 md:p-12">
          <p className="eyebrow mb-4">{tr("frontierSection.eyebrow")}</p>
          <p className="font-serif italic text-2xl md:text-3xl leading-[1.3] text-balance">
            {tr("frontierSection.quote")}
          </p>
        </div>
      </section>

      {/* Three principles */}
      <section className="mt-20 md:mt-32 px-6 md:px-10 max-w-6xl mx-auto space-y-px">
        {principles.map((p, i) => {
          const Icon = principleIcons[i];
          return (
            <article key={p.label} className="border border-white/6 bg-surface/30 p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-4">
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="font-mono text-accent text-[11px] tracking-[0.4em]">
                      0{i + 1}
                    </span>
                    <span className="font-mono text-muted text-[10px] uppercase tracking-[0.32em]">
                      {p.label}
                    </span>
                  </div>
                  <Icon size={32} strokeWidth={1.2} className="text-accent mb-6" aria-hidden />
                  <h2 className="font-serif text-2xl md:text-3xl leading-tight tracking-tight">
                    {p.title}
                  </h2>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mt-6">
                    {p.timing}
                  </p>
                </div>

                <ul className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {p.items.map((item) => (
                    <li key={item} className="flex gap-3 text-body items-start">
                      <span className="text-accent mt-1 shrink-0" aria-hidden>→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </section>

      {/* Operational routines */}
      <section className="mt-20 md:mt-32 px-6 md:px-10 max-w-6xl mx-auto">
        <p className="eyebrow mb-5">{tr("operationalSection.eyebrow")}</p>
        <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-[1.05] mb-12 text-balance">
          {tr("operationalSection.headline")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/6 border border-white/6">
          {routines.map((item, i) => {
            const Icon = routineIcons[i];
            return (
              <div key={item.title} className="bg-bg p-8 lg:p-10">
                <Icon size={24} strokeWidth={1.2} className="text-accent mb-5" aria-hidden />
                <h3 className="font-serif text-xl md:text-2xl leading-[1.2] mb-4">
                  {item.title}
                </h3>
                <p className="text-body">{item.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-20 md:mt-32 px-6 md:px-10 max-w-4xl mx-auto">
        <p className="eyebrow mb-5">{tr("faqSection.eyebrow")}</p>
        <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-[1.05] mb-12 text-balance">
          {tr("faqSection.headline")}
        </h2>

        <dl className="space-y-px bg-white/6 border border-white/6">
          {faqItems.map((f) => (
            <div key={f.q} className="bg-bg p-8 lg:p-10">
              <dt className="font-serif italic text-xl md:text-2xl leading-tight mb-4">
                {f.q}
              </dt>
              <dd className="text-body">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* CTA */}
      <section className="mt-20 md:mt-32 px-6 md:px-10 max-w-6xl mx-auto">
        <div className="border border-accent/30 bg-accent/4 p-10 md:p-16">
          <p className="eyebrow mb-5">{tr("ctaSection.eyebrow")}</p>
          <h2 className="font-serif text-3xl md:text-5xl italic leading-[1.1] tracking-tight mb-6 text-balance">
            {tr("ctaSection.headline")}
            <br />
            {tr("ctaSection.headlineSub")}
          </h2>
          <p className="text-body max-w-2xl mb-8">{tr("ctaSection.body")}</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/kontakt" className="btn-primary">
              {tr("ctaSection.btn1")}
            </Link>
            <a href={`mailto:${SITE.email}`} className="btn-ghost">
              {tr("ctaSection.btn2")}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
