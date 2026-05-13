import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, FileCheck2, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Frontier() {
  const { t } = useTranslation("home");
  const f = (key: string) => t(`frontier.${key}`);

  const pillars = [
    { icon: Sparkles,    labelKey: "p01label", titleKey: "p01title", bodyKey: "p01body", proofKey: "p01proof" },
    { icon: ShieldCheck, labelKey: "p02label", titleKey: "p02title", bodyKey: "p02body", proofKey: "p02proof" },
    { icon: FileCheck2,  labelKey: "p03label", titleKey: "p03title", bodyKey: "p03body", proofKey: "p03proof" },
  ];

  return (
    <section
      id="frontier"
      aria-labelledby="frontier-heading"
      className="py-20 md:py-32 px-6 md:px-10 max-w-7xl mx-auto border-t border-white/6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-14 md:mb-20">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-5">{f("eyebrow")}</p>
          <h2
            id="frontier-heading"
            className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-balance"
          >
            {f("headline1")}
            <br />
            <span className="italic">{f("headline2")}</span>,
            <br />
            <span className="text-accent">{f("headline3")}</span>
          </h2>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p
            className="text-body-lg max-w-xl"
            dangerouslySetInnerHTML={{ __html: f("body1") }}
          />
          <p className="text-body mt-6 max-w-xl">{f("body2")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/6 border border-white/6">
        {pillars.map((p, i) => {
          const Icon = p.icon;
          return (
            <article
              key={p.labelKey}
              className="bg-bg p-10 lg:p-12 group hover:bg-surface/40 transition-colors flex flex-col"
            >
              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-mono text-accent text-[11px] tracking-[0.4em]">0{i + 1}</span>
                <span className="font-mono text-muted text-[10px] uppercase tracking-[0.32em]">
                  {f(p.labelKey)}
                </span>
              </div>
              <Icon size={28} strokeWidth={1.2} className="text-accent mb-6" aria-hidden />
              <h3 className="font-serif text-2xl md:text-[26px] leading-[1.2] tracking-tight mb-5 text-ink group-hover:text-accent transition-colors">
                {f(p.titleKey)}
              </h3>
              <p className="text-body flex-1">{f(p.bodyKey)}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mt-8 pt-6 border-t border-white/6">
                {f(p.proofKey)}
              </p>
            </article>
          );
        })}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-body max-w-xl">{f("ctaBody")}</p>
        <Link to="/trust" className="btn-ghost self-start sm:self-auto">
          {f("ctaLink")}
          <ArrowRight size={14} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
