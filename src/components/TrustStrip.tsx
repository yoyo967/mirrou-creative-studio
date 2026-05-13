import { useTranslation } from "react-i18next";

type TrustItem = { kpi: string; unit: string; label: string };

export default function TrustStrip() {
  const { t } = useTranslation("home");
  const items = t("trust.items", { returnObjects: true }) as unknown as TrustItem[];

  return (
    <section
      aria-label={t("trust.ariaLabel")}
      className="border-y border-white/6 bg-surface/30"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
        {items.map((it) => (
          <div key={it.label} className="flex flex-col gap-1.5">
            <p className="font-serif italic text-2xl md:text-3xl text-ink leading-none">
              {it.kpi}
              <span className="ml-2 text-[12px] font-mono uppercase tracking-[0.25em] text-accent not-italic">
                {it.unit}
              </span>
            </p>
            <p className="text-[13px] text-muted leading-snug max-w-[18ch]">
              {it.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
