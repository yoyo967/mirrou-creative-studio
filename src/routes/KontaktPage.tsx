import ContactForm from "../components/ContactForm";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SITE } from "../content/site-data";

export default function KontaktPage() {
  const { t } = useTranslation("contact");
  const p = (key: string) => t(`page.${key}`);

  return (
    <main className="min-h-screen bg-transparent pt-40 pb-24 px-10 relative z-10">
      <SEO
        title={t("seo.title")}
        description={t("seo.description")}
        pathname="/kontakt"
      />

      <header className="max-w-5xl mx-auto mb-8">
        <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-mono mb-6">
          {p("eyebrow")}
        </p>
        <h1 className="text-5xl lg:text-7xl font-serif italic leading-[1.05] tracking-tight">
          {p("headline")}
        </h1>
        <p className="mt-8 text-lg text-ink/85 font-light max-w-2xl leading-relaxed">
          {p("body")}
        </p>
      </header>

      <ContactForm />

      <div className="max-w-5xl mx-auto mt-12 border-t border-white/6 pt-10">
        <p className="eyebrow mb-3">{p("pressEyebrow")}</p>
        <a
          href={`mailto:${SITE.press.contact}`}
          className="font-serif italic text-xl text-ink hover:text-accent transition-colors block"
        >
          {SITE.press.contact}
        </a>
        <p className="text-body mt-2 text-[14px]">
          {p("pressNote")}{" "}
          <Link to="/press" className="text-accent hover:underline">
            {p("pressLink")}
          </Link>
        </p>
      </div>
    </main>
  );
}
