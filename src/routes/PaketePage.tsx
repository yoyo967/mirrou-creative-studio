import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";

const pillarSlugs = ["foto-ki-hybrid", "performance-creative", "creative-engine"];

export default function PaketePage() {
  const { t } = useTranslation("packages");
  const p = (key: string) => t(key);

  const pkgKeys = ["pkg01", "pkg02", "pkg03"] as const;

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Performance Creative Production & Retainer",
    provider: { "@type": "Organization", name: "Mirrou Creative Studio" },
    serviceType: "Creative & Performance Marketing",
    offers: pkgKeys.map((k, i) => ({
      "@type": "Offer",
      name: t(`${k}.title`),
      description: t(`${k}.headline`),
      priceSpecification: { "@type": "PriceSpecification", priceCurrency: "EUR" },
    })),
  };

  return (
    <main className="min-h-screen bg-transparent pt-40 pb-24 px-10 relative z-10">
      <SEO
        title={t("seo.title")}
        description={t("seo.description")}
        pathname="/pakete"
        jsonLd={serviceLd}
      />

      <header className="max-w-5xl mx-auto mb-20">
        <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-mono mb-6">
          {p("eyebrow")}
        </p>
        <h1 className="text-5xl lg:text-7xl font-serif italic leading-[1.05] tracking-tight">
          {p("headline")}
        </h1>
        <p className="mt-8 text-lg text-ink/85 font-light max-w-3xl leading-relaxed">
          {p("body")}
        </p>
      </header>

      <div className="max-w-5xl mx-auto space-y-12">
        {pkgKeys.map((k, i) => {
          const deliverables = t(`${k}.deliverables`, { returnObjects: true }) as unknown as string[];
          return (
            <article
              key={k}
              className="border border-white/5 bg-surface/30 backdrop-blur-sm p-10 lg:p-14"
            >
              <div className="flex items-start justify-between gap-6 mb-10">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-accent font-mono">
                    {p("paketLabel")} 0{i + 1}
                  </span>
                  <h2 className="text-3xl lg:text-5xl font-serif italic mt-2 leading-tight">
                    {t(`${k}.title`)}
                  </h2>
                  <p className="mt-3 text-lg text-ink/85 font-light">{t(`${k}.headline`)}</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-10">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-muted font-mono block mb-3">
                    {p("forWhomLabel")}
                  </span>
                  <p className="text-sm text-ink/85 font-light leading-relaxed mb-8">
                    {t(`${k}.target`)}
                  </p>

                  <span className="text-[9px] uppercase tracking-widest text-muted font-mono block mb-3">
                    {p("deliverablesLabel")}
                  </span>
                  <ul className="space-y-2 text-sm text-muted font-light">
                    {deliverables.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span className="text-accent">→</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-[9px] uppercase tracking-widest text-muted font-mono block mb-3">
                    {p("investmentLabel")}
                  </span>
                  <p className="text-2xl font-serif italic text-accent">{t(`${k}.price`)}</p>
                  <p className="text-xs text-muted mt-2">{t(`${k}.note`)}</p>

                  <span className="text-[9px] uppercase tracking-widest text-muted font-mono block mt-10 mb-3">
                    {p("methodLabel")}
                  </span>
                  <Link
                    to={`/${pillarSlugs[i]}`}
                    className="text-sm font-serif italic hover:text-accent transition"
                  >
                    {p("pillarPrefix")} {t(`${k}.pillarLabel`)}
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="max-w-5xl mx-auto mt-16 p-10 border border-accent/20 bg-accent/5">
        <h2 className="text-2xl font-serif italic mb-3">{p("ctaHeadline")}</h2>
        <p className="text-muted font-light text-sm leading-relaxed mb-6 max-w-2xl">
          {p("ctaBody")}
        </p>
        <Link
          to="/kontakt"
          className="inline-block bg-accent text-bg font-semibold px-6 py-3 rounded-full hover:opacity-90 transition uppercase text-xs tracking-widest font-mono"
        >
          {p("ctaLink")}
        </Link>
      </div>
    </main>
  );
}
