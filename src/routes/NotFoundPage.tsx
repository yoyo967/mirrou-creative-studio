import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";

export default function NotFoundPage() {
  const { t } = useTranslation("legal");
  const n = (key: string) => t(`notFound.${key}`);

  return (
    <main className="min-h-screen flex items-center justify-center px-10 relative z-10">
      <SEO
        title={n("seoTitle")}
        description={n("seoDesc")}
        pathname="/404"
        noIndex
      />
      <div className="max-w-xl text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-mono mb-6">
          {n("label")}
        </p>
        <h1 className="text-5xl lg:text-7xl font-serif italic leading-tight tracking-tight">
          {n("headline")}
        </h1>
        <p className="mt-6 text-muted font-light">
          {n("body")}
        </p>
        <Link
          to="/"
          className="inline-block mt-10 bg-accent text-bg font-semibold px-6 py-3 rounded-full hover:opacity-90 transition uppercase text-xs tracking-widest font-mono"
        >
          {n("cta")}
        </Link>
      </div>
    </main>
  );
}
