import { SITE } from "../content/site-data";

interface SEOProps {
  title: string;
  description?: string;
  pathname: string;
  ogImage?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * React 19 hoists <title> und <meta> Elemente automatisch in den <head>.
 * vite-react-ssg übernimmt das beim Pre-Rendering.
 */
export default function SEO({
  title,
  description = SITE.description,
  pathname,
  ogImage = "/og-default.png",
  noIndex = false,
  jsonLd,
}: SEOProps) {
  const fullTitle = title === SITE.name ? title : `${title} · ${SITE.name}`;
  const canonical = new URL(pathname, SITE.url).toString();
  const ogUrl = new URL(ogImage, SITE.url).toString();
  const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogUrl} />
      <meta property="og:locale" content="de_DE" />
      <meta property="og:site_name" content={SITE.name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogUrl} />

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
