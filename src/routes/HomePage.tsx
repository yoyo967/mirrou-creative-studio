import Hero from "../components/Hero";
import PressQuoteStrip from "../components/PressQuoteStrip";
import TrustStrip from "../components/TrustStrip";
import ProblemDiagnostic from "../components/ProblemDiagnostic";
import Frontier from "../components/Frontier";
import WorkGrid from "../components/WorkGrid";
import CasesStrip from "../components/CasesStrip";
import InsightsSection from "../components/InsightsSection";
import ServicesSection from "../components/ServicesSection";
import StudioContent from "../components/StudioContent";
import ContactForm from "../components/ContactForm";
import VisualGalleryStrip from "../components/VisualGalleryStrip";
import ManifestoSection from "../components/ManifestoSection";
import HorizontalShowcase from "../components/HorizontalShowcase";
import StatsCounter from "../components/StatsCounter";
import SEO from "../components/SEO";
import { SITE } from "../content/site-data";
import { useTranslation } from "react-i18next";

/**
 * HomePage - "Full Editorial Issue"
 *
 * The homepage is intentionally dense and immersive, not a minimal funnel.
 * It reads like a complete brand magazine: hook, proof, method, portfolio,
 * authority, services, people, action - every section earns its place.
 *
 * ---------------------------------------------------------------------------
 * VARIANT A - Fully Dense (active, 15 sections)
 * ---------------------------------------------------------------------------
 *
 *  01. Hero                - First impression + CTA
 *  02. TrustStrip          - Quick brand anchors
 *  03. StatsCounter        - Quantitative proof (numbers that matter)
 *  04. ProblemDiagnostic   - Pain point diagnosis
 *  05. HorizontalShowcase  - The Algorithm process (scroll-driven)
 *  06. Frontier            - Deeper method / philosophy cut
 *  07. WorkGrid            - Visual portfolio grid (4 case systems)
 *  08. VisualGalleryStrip  - Texture break / visual richness
 *  09. PressQuoteStrip     - Authority quotes
 *  10. CasesStrip          - KPI metrics proof (cream section, data-driven)
 *  11. InsightsSection     - Blog / content teasers (thought leadership)
 *  12. ServicesSection     - Service offering overview
 *  13. ManifestoSection    - Brand voice / values statement
 *  14. StudioContent       - Team, founder, studio identity
 *  15. ContactForm         - Conversion CTA
 *
 * Rationale: The homepage functions as a complete editorial issue of the
 * Mirrou brand. Every section serves a distinct narrative beat. WorkGrid
 * shows visual craft (portfolio), CasesStrip shows measurable impact (KPIs).
 * Frontier deepens method, HorizontalShowcase walks the process. The density
 * is the point: it demonstrates the same thoroughness Mirrou brings to work.
 *
 * ---------------------------------------------------------------------------
 * VARIANT B - Slightly Curated (13 sections, still dense)
 * ---------------------------------------------------------------------------
 *
 * Same as Variant A, but with two sections hidden (not deleted):
 *   - Frontier         - hidden (absorbed into HorizontalShowcase narrative)
 *   - InsightsSection  - hidden (accessible via /blog in navigation)
 *
 * To activate Variant B: wrap Frontier and InsightsSection in false-guards.
 *
 * Rationale: Variant B trims only where narrative overlap exists. Frontier
 * and HorizontalShowcase both explain "how we work" - collapsing them keeps
 * the method message sharp. InsightsSection lives natively on /blog. All
 * other sections remain because they serve unique functions: StatsCounter
 * (numbers), CasesStrip (KPIs), ServicesSection (packages), StudioContent
 * (people), VisualGalleryStrip (texture).
 * ---------------------------------------------------------------------------
 */
export default function HomePage() {
  const { i18n } = useTranslation();
  const { t: tSeo } = useTranslation("seo");
  const localeTag: Record<string, string> = {
    de: "de-DE", en: "en-GB", es: "es-ES", it: "it-IT",
    fr: "fr-FR", tr: "tr-TR", ru: "ru-RU", uk: "uk-UA",
  };
  const langTag = localeTag[i18n.language] ?? "de-DE";

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE.url,
    description: tSeo("home.description"),
    email: SITE.email,
    founder: {
      "@type": "Person",
      name: SITE.creativeDirection.name,
      jobTitle: SITE.creativeDirection.role,
      sameAs: [SITE.creativeDirection.instagram],
    },
    sameAs: [SITE.social.instagram, SITE.social.linkedin, SITE.social.facebook],
    address: SITE.locations.map((l) => ({
      "@type": "PostalAddress",
      addressLocality: l.city,
      addressCountry: "DE",
    })),
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: langTag,
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 80;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offset,
      behavior: "smooth",
    });
  };

  return (
    <>
      <SEO
        title={SITE.name}
        description={tSeo("home.description")}
        pathname="/"
        jsonLd={[orgLd, websiteLd]}
      />

      {/* ─── 01. HOOK ───────────────────────────────────────────── */}
      <Hero onExplore={() => scrollTo("diagnostic")} />

      {/* ─── 02. SOCIAL PROOF ───────────────────────────────────── */}
      <TrustStrip />

      {/* ─── 03. NUMBERS ────────────────────────────────────────── */}
      <StatsCounter />

      {/* ─── 04. PAIN ───────────────────────────────────────────── */}
      <div className="cv-auto">
        <ProblemDiagnostic />
      </div>

      {/* ─── 05. SOLUTION — Process ─────────────────────────────── */}
      <div className="cv-auto">
        <HorizontalShowcase />
      </div>

      {/* ─── BREATHING ROOM ─────────────────────────────────────── */}
      <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-20">
        <div className="gold-rule" />
      </div>

      {/* ─── 06. METHOD — Deeper cut ────────────────────────────── */}
      <div className="cv-auto">
        <Frontier />
      </div>

      {/* ─── 07. PORTFOLIO — Visual proof ───────────────────────── */}
      <div className="cv-auto">
        <WorkGrid />
      </div>

      {/* ─── 08. TEXTURE — Visual richness ──────────────────────── */}
      <div className="cv-auto">
        <VisualGalleryStrip />
      </div>

      {/* ─── 09. AUTHORITY ──────────────────────────────────────── */}
      <div className="cv-auto">
        <PressQuoteStrip surface="home" />
      </div>

      {/* ─── 10. METRICS — KPI proof (cream section) ────────────── */}
      <div className="cv-auto">
        <CasesStrip />
      </div>

      {/* ─── BREATHING ROOM ─────────────────────────────────────── */}
      <div className="py-6 md:py-10" aria-hidden />

      {/* ─── 11. THOUGHT LEADERSHIP ─────────────────────────────── */}
      <div className="cv-auto">
        <InsightsSection />
      </div>

      {/* ─── 12. SERVICES ───────────────────────────────────────── */}
      <div className="cv-auto">
        <ServicesSection />
      </div>

      {/* ─── 13. VALUES ─────────────────────────────────────────── */}
      <div className="cv-auto">
        <ManifestoSection />
      </div>

      {/* ─── 14. PEOPLE ─────────────────────────────────────────── */}
      <div className="cv-auto">
        <StudioContent />
      </div>

      {/* ─── BREATHING ROOM ─────────────────────────────────────── */}
      <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-20">
        <div className="gold-rule" />
      </div>

      {/* ─── 15. ACTION ─────────────────────────────────────────── */}
      <div className="cv-auto">
        <ContactForm />
      </div>
    </>
  );
}
