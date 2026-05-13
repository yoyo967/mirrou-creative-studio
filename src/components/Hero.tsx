import { useEffect, useState, lazy, Suspense } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MarqueeStrip from "./MarqueeStrip";
import ScrambleText from "./ScrambleText";
import { SITE } from "../content/site-data";

const HeroScene = lazy(() => import("./HeroScene"));

const reveal = (delay: number) => ({
  initial:    { opacity: 0, y: 18 },
  animate:    { opacity: 1, y: 0  },
  transition: { delay, duration: 1, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
});

export default function Hero({ onExplore }: { onExplore: () => void }) {
  const [clipped, setClipped] = useState(false);
  const [sceneMounted, setSceneMounted] = useState(false);
  const { t } = useTranslation("home");

  useEffect(() => {
    const timer = setTimeout(() => setClipped(true), 180);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => { setSceneMounted(true); }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden bg-bg"
    >
      {/* Corner ticks */}
      <span className="absolute top-7 left-7 w-7 h-7 border-t border-l border-accent/40 z-20 pointer-events-none" aria-hidden />
      <span className="absolute top-7 right-7 w-7 h-7 border-t border-r border-accent/40 z-20 pointer-events-none" aria-hidden />
      <span className="absolute bottom-20 left-7 w-5 h-5 border-b border-l border-accent/20 z-20 pointer-events-none" aria-hidden />
      <span className="absolute bottom-20 right-7 w-5 h-5 border-b border-r border-accent/20 z-20 pointer-events-none" aria-hidden />

      <div className="flex-1 flex flex-col lg:flex-row">

        {/* LEFT: Typography */}
        <div className="relative z-10 flex flex-col justify-center
                        px-6 md:px-12 lg:px-16 xl:px-20
                        pt-36 pb-10 lg:pt-0 lg:pb-0
                        lg:w-[54%] xl:w-[52%]">

          <motion.div {...reveal(0.1)} className="flex items-center gap-4 mb-5">
            <span className="w-6 h-px bg-accent/60 flex-shrink-0" />
            <p className="eyebrow tracking-[0.38em]">{t("hero.eyebrow")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28, duration: 0.6 }}
            className="mb-9"
          >
            <ScrambleText
              text={t("hero.scramble", { ns: "common", defaultValue: "ALGORITHM OF SOUL" })}
              triggerOnLoad
              loadDelay={700}
              className="text-[11px] uppercase tracking-[0.55em] text-accent/65 block"
            />
          </motion.div>

          <div className={`clip-reveal mb-10${clipped ? " in-view" : ""}`}>
            <h1 className="display-hero font-serif italic leading-[0.88] tracking-[-0.03em] text-ink">
              {t("hero.h1line1")}&nbsp;
              <br />
              <span
                className="text-accent"
                style={{ textShadow: "0 0 80px rgba(200,162,90,0.25)" }}
              >
                {t("hero.h1accent")}
              </span>
              {t("hero.h1line3") && <><br />{t("hero.h1line3")}</>}
            </h1>
          </div>

          <motion.p
            {...reveal(0.52)}
            className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted mb-10 max-w-sm"
          >
            {t("hero.tagline")}
          </motion.p>

          <motion.p
            {...reveal(0.62)}
            className="text-body-lg text-pretty max-w-md mb-10"
          >
            {t("hero.body")}
          </motion.p>

          <motion.div
            {...reveal(0.76)}
            className="flex flex-wrap items-center gap-3"
          >
            <Link to="/kontakt" className="btn-primary" data-magnetic>
              {t("hero.ctaPrimary")}
              <ArrowRight size={14} aria-hidden />
            </Link>
            <button
              onClick={onExplore}
              className="btn-ghost cursor-pointer"
              data-magnetic
            >
              {t("hero.ctaSecondary")}
              <ArrowDown size={13} aria-hidden />
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="eyebrow text-muted mt-8"
          >
            {t("hero.creditPrefix")}{" "}
            <a
              href={SITE.creativeDirection.instagram}
              rel="noopener"
              className="text-accent hover:underline"
            >
              {SITE.creativeDirection.name}
            </a>
          </motion.p>
        </div>

        {/* RIGHT: WebGL Gold Sphere */}
        <div className="
          absolute inset-0 opacity-30
          lg:relative lg:opacity-100
          lg:w-[46%] xl:w-[48%]
          lg:flex lg:items-center lg:justify-center
        ">
          {sceneMounted && (
            <Suspense fallback={null}>
              <HeroScene className="absolute inset-0 w-full h-full" />
            </Suspense>
          )}
        </div>
      </div>

      <motion.div
        className="relative z-10 mx-6 md:mx-12 lg:mx-16 xl:mx-20"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.35, duration: 1.6, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
        style={{ transformOrigin: "left" }}
      >
        <div className="gold-rule" />
      </motion.div>

      <div className="relative z-10">
        <MarqueeStrip />
      </div>
    </section>
  );
}
