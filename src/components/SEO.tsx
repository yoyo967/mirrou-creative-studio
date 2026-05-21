import { useTranslation } from "react-i18next";
import { SITE } from "../content/site-data";
import { LOCALES } from "../routes/LocaleWrapper";

interface SEOProps {
  title: string;
  description?: string;
  pathname: string;
  ogImage?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * React 19 hoists <title> and <meta> elements automatically to the <head>.
 * vite-react-ssg processes this during Pre-Rendering.
 */
export default function SEO({
  title,
  description = SITE.description,
  pathname,
  ogImage = "/og-default.png",
  noIndex = false,
  jsonLd,
}: SEOProps) {
  const { i18n } = useTranslation();
  const locale = i18n.language || "de";

  const fullTitle = title === SITE.name ? title : `${title} · ${SITE.name}`;
  
  let cleanPath = pathname;
  if (!cleanPath.startsWith("/")) {
    cleanPath = "/" + cleanPath;
  }
  
  // Prepend current locale to build canonical url
  const canonical = new URL(`/${locale}${cleanPath === "/" ? "" : cleanPath}`, SITE.url).toString();
  const ogUrl = canonical;
  const ogUrlImage = new URL(ogImage, SITE.url).toString();
  const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  const ogLocaleMap: Record<string, string> = {
    de: "de_DE",
    en: "en_US",
    es: "es_ES",
    it: "it_IT",
    fr: "fr_FR",
    tr: "tr_TR",
    ru: "ru_RU",
    uk: "uk_UA",
  };
  const ogLocale = ogLocaleMap[locale] || "de_DE";

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* hreflang alternate links */}
      {LOCALES.map((l) => {
        const altUrl = new URL(`/${l}${cleanPath === "/" ? "" : cleanPath}`, SITE.url).toString();
        return <link key={l} rel="alternate" hrefLang={l} href={altUrl} />;
      })}
      <link rel="alternate" hrefLang="x-default" href={SITE.url + "/"} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={ogUrlImage} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:site_name" content={SITE.name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogUrlImage} />

      {jsonLdArray.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

