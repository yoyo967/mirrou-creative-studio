import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";

export default function DatenschutzPage() {
  const { t } = useTranslation("legal");
  const d = (key: string) => t(`datenschutz.${key}`);
  const sec3items = t("datenschutz.sec3items", { returnObjects: true }) as unknown as string[];
  const sec7items = t("datenschutz.sec7items", { returnObjects: true }) as unknown as string[];

  return (
    <main className="min-h-screen bg-transparent pt-40 pb-24 px-10 relative z-10">
      <SEO
        title={d("seoTitle")}
        description={d("seoDesc")}
        pathname="/datenschutz"
        noIndex
      />

      <article className="max-w-3xl mx-auto prose prose-invert prose-lg prose-headings:font-serif prose-headings:italic prose-a:text-accent prose-strong:text-ink prose-p:text-muted prose-p:font-light">
        <h1 className="text-5xl font-serif italic">{d("title")}</h1>
        <p className="text-[10px] uppercase tracking-widest text-accent font-mono not-prose">
          {d("notice")}
        </p>

        <h2>{d("sec1")}</h2>
        <p>{d("sec1body")}</p>

        <h2>{d("sec2")}</h2>
        <p>{d("sec2body")}</p>

        <h2>{d("sec3")}</h2>
        <p>{d("sec3intro")}</p>
        <ul>
          {sec3items.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p>{d("sec3body")}</p>

        <h2>{d("sec4")}</h2>
        <p>{d("sec4body")}</p>

        <h2>{d("sec5")}</h2>
        <p>{d("sec5body")}</p>

        <h2>{d("sec6")}</h2>
        <p>{d("sec6body")}</p>

        <h2>{d("sec7")}</h2>
        <p>{d("sec7intro")}</p>
        <ul>
          {sec7items.map((item) => <li key={item}>{item}</li>)}
        </ul>

        <h2>{d("sec8")}</h2>
        <p>{d("sec8body")}</p>
      </article>
    </main>
  );
}
