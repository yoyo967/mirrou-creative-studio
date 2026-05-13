import { useTranslation } from "react-i18next";
import ScrollWordReveal from "./ScrollWordReveal";

export default function ManifestoSection() {
  const { t } = useTranslation("home");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src="/images/gallery/g-50.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="img-overlay-dark absolute inset-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="gold-rule w-24 mx-auto mb-10" />

        <blockquote>
          <ScrollWordReveal
            text={t("manifesto.quote")}
            className="font-serif italic text-3xl md:text-5xl lg:text-6xl text-balance leading-[1.15] justify-center"
            wordClassName="text-ink"
          />
          <footer>
            <cite className="eyebrow mt-10 text-accent block not-italic">
              {t("manifesto.attribution")}
            </cite>
          </footer>
        </blockquote>

        <div className="gold-rule w-24 mx-auto mt-10" />
      </div>
    </section>
  );
}
