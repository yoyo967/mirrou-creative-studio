import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Link } from "@/src/components/LocalizedLink";
import { useTranslation } from "react-i18next";
import MarqueeStrip from "./MarqueeStrip";
import ScrambleText from "./ScrambleText";
import { SITE } from "../content/site-data";

const HERO_FIRST_IMAGE = "/heroimages/228ba3d7-ccd6-4892-9673-232da4aeedc2.webp";
const HeroImageSequence = lazy(() => import("./HeroImageSequence"));

const reveal = (delay: number) => ({
  initial:    { opacity: 0, y: 18 },
  animate:    { opacity: 1, y: 0  },
  transition: { delay, duration: 1, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
});

export default function Hero({ onExplore }: { onExplore: () => void }) {
  const { t } = useTranslation("home");
  const [sequenceReady, setSequenceReady] = useState(false);
  useEffect(() => { setSequenceReady(true); }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden bg-bg justify-center pt-24 pb-20"
    >
      {/* Corner ticks for premium tech aesthetic */}
      <span className="absolute top-7 left-7 w-7 h-7 border-t border-l border-accent/40 z-20 pointer-events-none" aria-hidden />
      <span className="absolute top-7 right-7 w-7 h-7 border-t border-r border-accent/40 z-20 pointer-events-none" aria-hidden />
      
      {/* The Central Dynamic Canvas */}
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8 lg:p-12 xl:p-16 opacity-40 lg:opacity-100">
        <div className="relative w-full h-full max-h-[85vh] max-w-[1400px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/5">
          {/* Static LCP image — visible in SSG HTML, no JS needed */}
          <img
            src={HERO_FIRST_IMAGE}
            alt=""
            width={1200}
            height={670}
            // @ts-expect-error fetchPriority not yet in React types
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Animated sequence replaces static image after hydration */}
          {sequenceReady && (
            <Suspense fallback={null}>
              <HeroImageSequence className="absolute inset-0 w-full h-full" />
            </Suspense>
          )}
          
          {/* Cinematic Vignette / Overlay to ensure perfect text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/40 to-bg/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] md:backdrop-blur-[1px]" />
          
          {/* Subtle noise over the image canvas */}
          <div className="absolute inset-0 grain-overlay opacity-[0.05]" />
        </div>
      </div>

      {/* Typography Overlay (Centered) */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-12 max-w-4xl mx-auto mt-12 lg:mt-0">

        <motion.div {...reveal(0.1)} className="flex items-center justify-center gap-4 mb-6 md:mb-8">
          <span className="w-8 md:w-12 h-px bg-accent/60 flex-shrink-0" />
          <p className="eyebrow tracking-[0.38em]">{t("hero.eyebrow")}</p>
          <span className="w-8 md:w-12 h-px bg-accent/60 flex-shrink-0" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28, duration: 0.6 }}
          className="mb-6 md:mb-8"
        >
          <ScrambleText
            text={t("hero.scramble", { ns: "common", defaultValue: "ALGORITHM OF SOUL" })}
            triggerOnLoad
            loadDelay={700}
            className="text-[10px] md:text-[12px] uppercase tracking-[0.55em] text-accent/80 block font-semibold"
          />
        </motion.div>

        <motion.p
          {...reveal(0.52)}
          className="font-mono text-[9px] md:text-[11px] uppercase tracking-[0.35em] text-ink/75 mb-6 md:mb-8 max-w-xl mx-auto"
        >
          {t("hero.tagline")}
        </motion.p>

        <motion.p
          {...reveal(0.62)}
          className="text-body-lg text-ink/90 text-pretty max-w-2xl mx-auto mb-10 md:mb-12"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.4)" }}
        >
          {t("hero.body")}
        </motion.p>

        <motion.div
          {...reveal(0.76)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link to="/kontakt" className="btn-primary w-full sm:w-auto justify-center" data-magnetic>
            {t("hero.ctaPrimary")}
            <ArrowRight size={14} aria-hidden />
          </Link>
          <button
            onClick={onExplore}
            className="btn-ghost cursor-pointer w-full sm:w-auto justify-center backdrop-blur-md bg-black/20"
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
          className="eyebrow text-ink/50 mt-14 md:mt-16"
        >
          {t("hero.creditPrefix")}{" "}
          <a
            href={SITE.creativeDirection.instagram}
            rel="noopener"
            className="text-accent hover:text-accent-light hover:underline transition"
          >
            {SITE.creativeDirection.name}
          </a>
        </motion.p>
      </div>

      {/* Marquee at the very bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 w-full bg-bg/40 backdrop-blur-sm border-t border-accent/10">
        <MarqueeStrip />
      </div>
    </section>
  );
}
