import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Visual {
  src: string;
  alt: string;
}

interface CaseLightboxProps {
  visuals: Visual[];
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
  labelClose: string;
  labelPrev: string;
  labelNext: string;
}

export default function CaseLightbox({
  visuals,
  index,
  onClose,
  onNavigate,
  labelClose,
  labelPrev,
  labelNext,
}: CaseLightboxProps) {
  const onCloseRef = useRef(onClose);
  const onNavigateRef = useRef(onNavigate);
  const indexRef = useRef(index);

  useEffect(() => { onCloseRef.current = onClose; });
  useEffect(() => { onNavigateRef.current = onNavigate; });
  useEffect(() => { indexRef.current = index; });

  useEffect(() => {
    if (index === null) return;
    const count = visuals.length;
    const handler = (e: KeyboardEvent) => {
      const cur = indexRef.current;
      if (cur === null) return;
      if (e.key === "Escape") onCloseRef.current();
      if (e.key === "ArrowLeft") onNavigateRef.current((cur - 1 + count) % count);
      if (e.key === "ArrowRight") onNavigateRef.current((cur + 1) % count);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index, visuals.length]);

  useEffect(() => {
    if (index !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [index]);

  const count = visuals.length;
  const goPrev = () => index !== null && onNavigate((index - 1 + count) % count);
  const goNext = () => index !== null && onNavigate((index + 1) % count);

  const navBtn =
    "w-12 h-12 border border-white/20 bg-bg/60 backdrop-blur-sm flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent";

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          role="dialog"
          aria-modal="true"
          aria-label={visuals[index]?.alt}
        >
          {/* Backdrop — click to close */}
          <div
            className="absolute inset-0 bg-bg/96 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              className="relative z-10 flex flex-col items-center px-16 md:px-24 max-w-[92vw]"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <img
                src={visuals[index].src}
                alt={visuals[index].alt}
                className="max-h-[76vh] max-w-full object-contain select-none"
                draggable={false}
              />
              <figcaption className="mt-5 font-mono text-[10px] uppercase tracking-[0.4em] text-muted text-center max-w-lg px-4">
                {visuals[index].alt}
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          {/* Counter — bottom center */}
          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 font-mono text-[10px] tracking-[0.5em] text-muted">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </div>

          {/* Close button — prominent, with label + ESC hint */}
          <button
            type="button"
            onClick={onClose}
            aria-label={labelClose}
            className="absolute top-6 right-6 z-20 flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            <span className="hidden md:block font-mono text-[9px] uppercase tracking-[0.4em] text-muted group-hover:text-accent transition-colors">
              ESC
            </span>
            <span className="w-12 h-12 border border-white/25 bg-bg/70 backdrop-blur-md flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
              <X className="w-4 h-4" />
            </span>
          </button>

          {/* Keyboard hint — bottom left */}
          <div className="absolute bottom-7 left-6 z-20 hidden md:flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-muted/50">
              ← → navigate
            </span>
          </div>

          {/* Prev / Next */}
          {count > 1 && (
            <>
              <button type="button" onClick={goPrev} aria-label={labelPrev} className={`absolute left-4 md:left-7 top-1/2 -translate-y-1/2 z-20 ${navBtn}`}>
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button type="button" onClick={goNext} aria-label={labelNext} className={`absolute right-4 md:right-7 top-1/2 -translate-y-1/2 z-20 ${navBtn}`}>
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
