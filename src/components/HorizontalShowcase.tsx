import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslation } from "react-i18next";
import OptimizedImage from "./OptimizedImage";

const stepImages = [
  "/images/gallery/g-05.png",
  "/images/gallery/g-15.png",
  "/images/gallery/g-25.png",
  "/images/gallery/g-35.png",
  "/images/gallery/g-45.png",
];

export default function HorizontalShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("home");
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);

  const steps = [
    { n: "01", titleKey: "step01title", subKey: "step01sub", bodyKey: "step01body", tagKey: "step01tag" },
    { n: "02", titleKey: "step02title", subKey: "step02sub", bodyKey: "step02body", tagKey: "step02tag" },
    { n: "03", titleKey: "step03title", subKey: "step03sub", bodyKey: "step03body", tagKey: "step03tag" },
    { n: "04", titleKey: "step04title", subKey: "step04sub", bodyKey: "step04body", tagKey: "step04tag" },
    { n: "05", titleKey: "step05title", subKey: "step05sub", bodyKey: "step05body", tagKey: "step05tag" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${steps.length * 70}vh` }}
      aria-label={t("showcase.ariaLabel")}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="px-6 md:px-10 lg:px-16 mb-8 flex items-end justify-between max-w-none">
          <div>
            <p className="eyebrow mb-3">{t("showcase.eyebrow")}</p>
            <h2 className="font-serif text-3xl md:text-5xl italic leading-tight tracking-tight">
              {t("showcase.headline")}
              <br />
              <span className="opacity-40">{t("showcase.headlineSub")}</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-3 pb-2">
            {steps.map((_, i) => (
              <motion.div
                key={i}
                className="h-px bg-accent/30 w-8 transition-all duration-300"
                style={{ backgroundColor: `rgba(200,162,90, ${0.3 + i * 0.14})` }}
              />
            ))}
          </div>
        </div>

        <div className="overflow-hidden pl-6 md:pl-10 lg:pl-16">
          <motion.div
            style={{ x }}
            className="flex gap-4 md:gap-6"
            transition={{ type: "tween", ease: "linear" }}
          >
            {steps.map((step, idx) => (
              <div
                key={step.n}
                className="shrink-0 w-[85vw] md:w-[42vw] lg:w-[32vw] border border-white/8 bg-surface flex flex-col overflow-hidden"
              >
                <div className="relative aspect-video overflow-hidden">
                  <OptimizedImage
                    src={stepImages[idx]}
                    alt={t(`showcase.${step.titleKey}`)}
                    className="absolute inset-0 w-full h-full"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-surface/80 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.4em] text-accent z-10">
                    {step.n}
                  </span>
                </div>

                <div className="p-7 md:p-8 flex flex-col gap-4 flex-1">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted mb-2">
                      {t(`showcase.${step.subKey}`)}
                    </p>
                    <h3 className="font-serif italic text-3xl md:text-4xl text-ink leading-tight tracking-tight">
                      {t(`showcase.${step.titleKey}`)}
                    </h3>
                  </div>
                  <p className="text-body text-[15px] leading-relaxed flex-1">
                    {t(`showcase.${step.bodyKey}`)}
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent/60 border-t border-white/6 pt-4 mt-auto">
                    {t(`showcase.${step.tagKey}`)}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="absolute right-8 bottom-12 flex flex-col items-center gap-2"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted rotate-90 origin-center">
            {t("common.scroll", { ns: "common", defaultValue: "Scroll" })}
          </span>
          <div className="w-px h-8 bg-linear-to-b from-accent/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
