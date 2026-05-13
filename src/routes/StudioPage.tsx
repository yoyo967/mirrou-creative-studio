import StudioContent from "../components/StudioContent";
import PressQuoteStrip from "../components/PressQuoteStrip";
import SEO from "../components/SEO";
import { useTranslation } from "react-i18next";
import { SITE } from "../content/site-data";

export default function StudioPage() {
  const { t } = useTranslation("studio");

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.creativeDirection.name,
    jobTitle: SITE.creativeDirection.role,
    worksFor: { "@type": "Organization", name: SITE.name, url: SITE.url },
    knowsAbout: ["Performance Creative", "Beauty Photography", "Skincare Visual Marketing", "AI-assisted Production", "Creative Direction", "D2C Brand Strategy"],
    sameAs: [SITE.creativeDirection.instagram, SITE.creativeDirection.portfolio],
    nationality: { "@type": "Country", name: "Ukraine" },
    workLocation: { "@type": "City", name: "Hamburg" },
  };

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE.url,
    description: SITE.description,
    email: SITE.email,
    founder: { "@type": "Person", name: SITE.creativeDirection.name, jobTitle: SITE.creativeDirection.role },
    foundingDate: "2026",
    foundingLocation: { "@type": "City", name: "Hamburg" },
    areaServed: [
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Austria" },
      { "@type": "Country", name: "Switzerland" },
      { "@type": "Place", name: "European Union" },
    ],
    sameAs: [SITE.social.instagram, SITE.social.linkedin, SITE.social.facebook],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url + "/" },
      { "@type": "ListItem", position: 2, name: "Studio", item: SITE.url + "/studio" },
    ],
  };

  return (
    <main className="min-h-screen bg-transparent pt-40 pb-24 relative z-10">
      <SEO
        title={t("seo.title")}
        description={t("seo.description")}
        pathname="/studio"
        jsonLd={[breadcrumbLd, personLd, orgLd]}
      />

      <header className="max-w-5xl mx-auto px-6 md:px-10 mb-16">
        <p className="eyebrow mb-4">{t("page.eyebrow")}</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.5em] text-accent/60 mb-8">
          {t("page.subEyebrow")}
        </p>
        <h1 className="font-serif text-5xl md:text-7xl italic leading-[1.05] tracking-tight">
          {t("page.headline1")}
          <br />
          {t("page.headline2")}
        </h1>
        <p className="text-body-lg mt-8 max-w-2xl">{SITE.press.boilerplate}</p>
        <p className="eyebrow mt-6 text-muted">
          {t("page.credit", { name: SITE.creativeDirection.name })}
        </p>
      </header>

      <StudioContent />
      <PressQuoteStrip surface="studio" />
    </main>
  );
}
