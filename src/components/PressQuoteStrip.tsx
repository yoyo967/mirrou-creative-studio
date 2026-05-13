import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { PRESS_QUOTES, type PressQuote } from "../content/site-data";

interface Props {
  surface: PressQuote["surfaces"][number];
  className?: string;
}

export default function PressQuoteStrip({ surface, className = "" }: Props) {
  const { t } = useTranslation("press");
  const quotes = PRESS_QUOTES.filter((q) => q.surfaces.includes(surface));
  if (quotes.length === 0) return null;

  const colClass = quotes.length === 1 ? "md:grid-cols-1" : "md:grid-cols-2";

  return (
    <section
      aria-label={t("quotesAriaLabel")}
      className={`border-t border-accent/20 py-16 md:py-20 px-6 md:px-10 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <p className="eyebrow mb-10 text-muted">{t("quotesEyebrow")}</p>
        <div
          className={`grid grid-cols-1 ${colClass} gap-10 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/6`}
        >
          {quotes.map((quote, i) => (
            <motion.blockquote
              key={quote.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="md:px-10 first:pl-0 last:pr-0 py-6 md:py-0"
            >
              <p className="font-serif italic text-2xl md:text-3xl lg:text-[34px] text-ink leading-[1.2] text-balance">
                &ldquo;{quote.text}&rdquo;
              </p>
              <footer className="mt-6 flex flex-col gap-1">
                <cite className="not-italic font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
                  — {quote.attribution}
                </cite>
                {quote.role && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                    {quote.role}
                  </span>
                )}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
