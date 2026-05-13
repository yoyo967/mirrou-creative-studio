import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";

export default function Preloader() {
  const { t } = useTranslation("common");
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("mirrou_visited");
  });

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("mirrou_visited", "1");
    }, 2800);
    return () => clearTimeout(timer);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-99999 bg-bg flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <motion.div
            className="absolute h-px bg-accent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "30vw", opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />

          <div className="relative flex flex-col items-center gap-3">
            <motion.p
              className="font-serif italic text-5xl md:text-7xl text-ink tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            >
              Mirrou
            </motion.p>
            <motion.p
              className="font-mono text-[10px] uppercase tracking-[0.6em] text-accent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              {t("algorithmOfSoul")}
            </motion.p>
          </div>

          <motion.div
            className="absolute bottom-8 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted">
              {t("hamburg")} · {t("berlin")}
            </span>
            <span className="w-px h-3 bg-muted/40" />
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted">
              MMXXVI
            </span>
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-0 h-px bg-accent/40"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.6, ease: "linear", delay: 0.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
