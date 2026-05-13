import { useEffect, useState, lazy, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "motion/react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import GrainOverlay from "../components/GrainOverlay";
import CursorFollower from "../components/CursorFollower";
import Preloader from "../components/Preloader";

const HeroScene = lazy(() => import("../components/HeroScene"));

export default function RootLayout() {
  const location = useLocation();

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
      <CursorFollower />
      <GrainOverlay />
      <motion.div
        className="fixed top-0 left-0 right-0 h-px bg-accent z-60 origin-left"
        style={{ scaleX }}
      />

      <Navigation />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
