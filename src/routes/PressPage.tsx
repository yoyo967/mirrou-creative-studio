import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";
import PressDownloadCard from "../components/PressDownloadCard";
import { PRESS_DOWNLOADS, SITE } from "../content/site-data";

export default function PressPage() {
  const { t } = useTranslation("press");
  const pr = (key: string) => t(key);

  const pressLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Press · Mirrou Creative Studio",
    description: SITE.press.boilerplate,
    url: SITE.url + "/press",
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      founder: { "@type": "Person", name: SITE.creativeDirection.name, jobTitle: SITE.creativeDirection.role },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url + "/" },
      { "@type": "ListItem", position: 2, name: "Press", item: SITE.url + "/press" },
    ],
  };

  const permittedItems = t("permittedItems", { returnObjects: true }) as unknown as string[];
  const notPermittedItems = t("notPermittedItems", { returnObjects: true }) as unknown as string[];

  return (
    <main className="min-h-screen bg-transparent pt-40 pb-24 relative z-10">
      <SEO
        title={t("seo.title")}
        description={`${t("seo.description")} ${SITE.press.boilerplate}`}
        pathname="/press"
        jsonLd={[pressLd, breadcrumbLd]}
      />

      {/* HERO */}
      <header className="max-w-6xl mx-auto px-6 md:px-10 mb-20 md:mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
        >
          <p className="eyebrow mb-4">{pr("eyebrow")}</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.5em] text-accent/60 mb-8">
            {SITE.press.tagline}
          </p>
          <h1 className="font-serif italic text-5xl md:text-7xl lg:text-[90px] leading-[0.95] tracking-tight text-balance">
            {pr("headline")}
            <br />
            <span className="text-accent">{pr("headlineAccent")}</span>
          </h1>
          <p className="text-body text-lg md:text-xl leading-relaxed mt-10 max-w-2xl font-light">
            {SITE.press.boilerplate}
          </p>
          <p className="eyebrow mt-6 text-muted">{pr("locations")}</p>
        </motion.div>
      </header>

      {/* DOWNLOAD GRID */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 mb-20 md:mb-32">
        <p className="eyebrow mb-3">{pr("downloadsEyebrow")}</p>
        <p className="mb-10 max-w-xl font-mono text-[11px] uppercase tracking-[0.25em]">
          {pr("downloadsSubtitle")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 border border-white/6 bg-white/2">
          {PRESS_DOWNLOADS.map((asset) => (
            <PressDownloadCard key={asset.id} asset={asset} pressEmail={SITE.press.contact} />
          ))}
        </div>
      </section>

      {/* USAGE RIGHTS */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 mb-20 md:mb-32">
        <div className="border border-accent/20 bg-accent/3 p-8 md:p-12">
          <p className="eyebrow mb-5">{pr("usageEyebrow")}</p>
          <h2 className="font-serif italic text-2xl md:text-3xl leading-tight mb-10 text-balance text-ink">
            {pr("usageHeadline")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent mb-4">
                {pr("permittedLabel")}
              </p>
              <ul className="space-y-3 text-body text-[15px]">
                {permittedItems.map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <span className="text-accent mt-0.5 shrink-0" aria-hidden>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted mb-4">
                {pr("notPermittedLabel")}
              </p>
              <ul className="space-y-3 text-body text-[15px]">
                {notPermittedItems.map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <span className="text-muted mt-0.5 shrink-0" aria-hidden>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mt-10 pt-6 border-t border-white/6">
            {pr("creditLine")}
          </p>
        </div>
      </section>

      {/* PRESS CONTACT */}
      <section className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">{pr("contactEyebrow")}</p>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight tracking-tight mb-8 text-ink">
              {pr("contactHeadline")}
              <br />
              <span className="italic text-accent">{pr("contactHeadlineAccent")}</span>
            </h2>
            <div className="space-y-3">
              <a
                href={`mailto:${SITE.press.contact}`}
                className="font-serif italic text-2xl text-ink hover:text-accent transition-colors block"
              >
                {SITE.press.contact}
              </a>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">{pr("responseTime")}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted mt-2">{pr("usageRights")}</p>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border-l-2 border-accent/30 bg-accent/3 p-8 h-full">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted mb-5">
                {pr("boilerplateLabel")}
              </p>
              <p className="text-body leading-relaxed">{SITE.press.boilerplate}</p>
              <div className="mt-6 pt-6 border-t border-white/6 space-y-1">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
                  {pr("creativeDirectionLine")}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">{pr("hamburg")}</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">mirrou.studio</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-white/6 pt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted">{pr("footerTagline")}</p>
          <Link to="/cases" className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent hover:underline">
            {pr("footerLink")}
          </Link>
        </div>
      </section>
    </main>
  );
}
