import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export default function ProblemDiagnostic() {
  const { t } = useTranslation("home");
  const p = (key: string) => t(`problem.${key}`);

  const arguments_ = [
    { num: "01", labelKey: "arg01label", headlineKey: "arg01headline", bodyKey: "arg01body" },
    { num: "02", labelKey: "arg02label", headlineKey: "arg02headline", bodyKey: "arg02body" },
    { num: "03", labelKey: "arg03label", headlineKey: "arg03headline", bodyKey: "arg03body" },
  ];

  const pillars = [
    { num: "01", titleKey: "pillar01", descKey: "pillar01desc" },
    { num: "02", titleKey: "pillar02", descKey: "pillar02desc" },
    { num: "03", titleKey: "pillar03", descKey: "pillar03desc" },
  ];

  return (
    <section id="diagnostic" className="py-20 md:py-32 px-6 md:px-10 max-w-7xl mx-auto relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16 md:mb-24">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-6">{p("eyebrow")}</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-balance">
            {p("headline")}
            <br />
            <span className="italic text-accent">{p("headlineAccent")}</span>
          </h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p
            className="text-body-lg max-w-xl"
            dangerouslySetInnerHTML={{ __html: p("body") }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/6 border border-white/6 mb-24 md:mb-32">
        {arguments_.map((arg, i) => (
          <motion.div
            key={arg.num}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.1, duration: 0.7 }}
            className="bg-bg p-10 lg:p-12 group hover:bg-surface/40 transition-colors"
          >
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-mono text-accent text-[11px] tracking-[0.4em]">{arg.num}</span>
              <span className="font-mono text-muted text-[11px] uppercase tracking-[0.32em]">
                {p(arg.labelKey)}
              </span>
            </div>
            <h3 className="font-serif text-2xl md:text-[26px] leading-[1.2] tracking-tight mb-5 text-ink group-hover:text-accent transition-colors">
              {p(arg.headlineKey)}
            </h3>
            <p className="text-body">{p(arg.bodyKey)}</p>
          </motion.div>
        ))}
      </div>

      <div>
        <div className="text-center mb-14 md:mb-20">
          <p className="eyebrow mb-5">{p("solutionEyebrow")}</p>
          <h2 className="font-serif italic text-3xl md:text-5xl leading-tight tracking-tight">
            {p("solutionHeadline")}
          </h2>
          <p className="text-body mt-6 max-w-xl mx-auto">{p("solutionBody")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/6 border border-white/6">
          {pillars.map((pl) => (
            <div
              key={pl.num}
              className="bg-bg p-10 lg:p-14 flex flex-col items-start gap-5 group hover:bg-surface/40 transition-colors"
            >
              <span className="font-mono text-accent text-[11px] tracking-[0.4em]">{pl.num}</span>
              <h3 className="font-serif text-2xl text-ink">{p(pl.titleKey)}</h3>
              <span className="block w-12 h-px bg-accent/30" />
              <p className="text-body text-[15px]">{p(pl.descKey)}</p>
            </div>
          ))}
        </div>

        <p className="eyebrow text-center mt-12 text-accent">{p("cta")}</p>
      </div>
    </section>
  );
}
