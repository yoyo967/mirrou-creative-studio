import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "motion/react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import GrainOverlay from "../components/GrainOverlay";
import CursorFollower from "../components/CursorFollower";
import Preloader from "../components/Preloader";

/**
 * Mounts purely decorative client-only widgets AFTER first paint / idle, so they
 * stay out of the critical hydration path (reduces LCP render-delay on mobile).
 * Returns false during SSG and the initial client render (no hydration mismatch),
 * then flips true once the main thread is idle.
 */
function useIdleMount(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 1500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setReady(true), 400);
    return () => clearTimeout(t);
  }, []);
  return ready;
}

export default function RootLayout() {
  const location = useLocation();
  const idle = useIdleMount();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [location.pathname, location.hash]);

  return (
    <div id="app-root" className="relative min-h-screen flex flex-col">
      <Preloader />
      <GrainOverlay />
      {/* Decorative, non-content widgets — deferred out of the hydration critical path */}
      {idle && <CursorFollower />}
      {idle && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-px bg-accent z-60 origin-left"
          style={{ scaleX }}
        />
      )}

      <Navigation />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
