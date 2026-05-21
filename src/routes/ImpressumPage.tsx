import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";
import { Link } from "@/src/components/LocalizedLink";

export default function ImpressumPage() {
  const { t, i18n } = useTranslation("legal");
  const im = (key: string) => t(`impressum.${key}`);
  const isNonEuLegal = i18n.language !== "de" && i18n.language !== "en";

  return (
    <main className="min-h-screen bg-transparent pt-40 pb-24 px-10 relative z-10">
      <SEO
        title={im("seoTitle")}
        description={im("seoDesc")}
        pathname="/impressum"
        noIndex
      />

      {isNonEuLegal && (
        <div className="max-w-3xl mx-auto mb-8 border border-accent/30 bg-accent/5 px-6 py-4 text-[13px] text-muted font-light">
          {t("deOnlyNote")} <Link to="/de/impressum" className="text-accent hover:underline ml-1">→ DE</Link>
        </div>
      )}
      <article className="max-w-3xl mx-auto prose prose-invert prose-lg prose-headings:font-serif prose-headings:italic prose-a:text-accent prose-strong:text-ink prose-p:text-muted prose-p:font-light">
        <h1 className="text-5xl font-serif italic">{im("title")}</h1>
        <p className="text-[10px] uppercase tracking-widest text-accent font-mono not-prose">
          {im("notice")}
        </p>

        <h2>{im("anbieterHeading")}</h2>
        <p>
          {im("anbieterText")}
          <br />
          {im("anbieterAddress")}
          <br />
          {im("anbieterCity")}
        </p>

        <h2>{im("creativeHeading")}</h2>
        <p>{im("creativeText")}</p>

        <h2>{im("teamHeading")}</h2>
        <p>
          {im("teamText").split("\n").map((line, i) => (
            <span key={i}>{line}{i < 2 && <br />}</span>
          ))}
        </p>

        <h2>{im("contactHeading")}</h2>
        <p>
          {im("contactText").split("\n").map((line, i) => (
            <span key={i}>{line}{i < 1 && <br />}</span>
          ))}
        </p>

        <h2>{im("vatHeading")}</h2>
        <p>{im("vatText")}</p>

        <h2>{im("responsibleHeading")}</h2>
        <p>{im("responsibleText")}</p>

        <h2>{im("disputeHeading")}</h2>
        <p>
          {im("disputeText")}{" "}
          <a href="https://ec.europa.eu/consumers/odr" rel="noopener">
            https://ec.europa.eu/consumers/odr
          </a>
          .
        </p>

        <h2>{im("liabilityHeading")}</h2>
        <p>{im("liabilityText")}</p>

        <h2>{im("linksHeading")}</h2>
        <p>{im("linksText")}</p>

        <h2>{im("copyrightHeading")}</h2>
        <p>{im("copyrightText")}</p>
      </article>
    </main>
  );
}
