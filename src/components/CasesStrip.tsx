import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function CasesStrip() {
  const { t } = useTranslation("home");
  const cs = (key: string) => t(`casesStrip.${key}`);

  const kpis = [
    { value: cs("kpi1value"), label: cs("kpi1label"), note: cs("kpi1note") },
    { value: cs("kpi2value"), label: cs("kpi2label"), note: cs("kpi2note") },
    { value: cs("kpi3value"), label: cs("kpi3label"), note: cs("kpi3note") },
  ];

  return (
    <section
      aria-label={cs("ariaLabel")}
      className="section-cream py-20 md:py-28 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
        <div className="lg:col-span-6">
          <p className="eyebrow mb-5">{cs("eyebrow")}</p>
          <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-balance">
            {cs("headline")}
          </h2>
          <p className="mt-6 max-w-md text-[17px] leading-[1.65] text-body-on-cream">
            {cs("body")}
          </p>
          <Link to="/cases" className="btn-ghost mt-10">
            {cs("ctaLink")}
            <ArrowRight size={14} aria-hidden />
          </Link>
        </div>

        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-px bg-ink-on-cream/10 border border-ink-on-cream/10">
          {kpis.map((k) => (
            <div
              key={k.label}
              className="bg-(--color-cream) p-8 lg:p-10 flex flex-col gap-2"
            >
              <p className="font-serif italic text-4xl md:text-5xl text-ink-on-cream leading-none">
                {k.value}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-muted-on-cream) mt-3">
                {k.label}
              </p>
              <p className="text-[13px] text-body-on-cream leading-snug">
                {k.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="max-w-7xl mx-auto mt-10 text-[12px] uppercase tracking-[0.3em] font-mono text-(--color-muted-on-cream)">
        {cs("disclaimer")}
      </p>
    </section>
  );
}
