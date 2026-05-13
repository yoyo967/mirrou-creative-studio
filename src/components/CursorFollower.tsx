import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CursorFollower() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMagnetic, setIsMagnetic] = useState(false);
  const rafRef = useRef<number>(0);

  // Large follower — spring physics
  const springConfig = { stiffness: 150, damping: 22, mass: 0.6 };
  const followerX = useSpring(mouseX, springConfig);
  const followerY = useSpring(mouseY, springConfig);

  // Small dot — tight spring
  const dotConfig = { stiffness: 600, damping: 40 };
  const dotX = useSpring(mouseX, dotConfig);
  const dotY = useSpring(mouseY, dotConfig);

  useEffect(() => {
    // Hide system cursor
    document.documentElement.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        // Magnetic: check nearest [data-magnetic] within 80px
        const magnetics = document.querySelectorAll<HTMLElement>("[data-magnetic]");
        let pulled = false;
        magnetics.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
          if (dist < 80) {
            const strength = (80 - dist) / 80;
            mouseX.set(cx + (e.clientX - cx) * (1 - strength * 0.6));
            mouseY.set(cy + (e.clientY - cy) * (1 - strength * 0.6));
            pulled = true;
          }
        });
        if (!pulled) {
          mouseX.set(e.clientX);
          mouseY.set(e.clientY);
        }
        setIsMagnetic(pulled);
      });
    };

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor-highlight]")) setIsHovering(true);
    };
    const onLeave = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor-highlight]")) setIsHovering(false);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onEnter, { passive: true });
    document.addEventListener("mouseout", onLeave, { passive: true });
    document.addEventListener("mouseenter", () => setIsVisible(true));
    document.addEventListener("mouseleave", () => setIsVisible(false));

    return () => {
      document.documentElement.style.cursor = "";
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return null;

  return (
    <>
      {/* Large follower — blend-mode difference */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: followerX,
          y: followerY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 72 : isMagnetic ? 56 : 40,
            height: isHovering ? 72 : isMagnetic ? 56 : 40,
            backgroundColor: isHovering ? "var(--color-accent)" : "transparent",
            borderColor: isHovering ? "var(--color-accent)" : "rgba(200,162,90,0.5)",
          }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            borderRadius: "50%",
            border: "1px solid",
            mixBlendMode: "difference",
          }}
        />
      </motion.div>

      {/* Small dot — precise */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{ width: isHovering ? 4 : 5, height: isHovering ? 4 : 5 }}
          transition={{ duration: 0.15 }}
          style={{
            borderRadius: "50%",
            backgroundColor: "var(--color-accent)",
          }}
        />
      </motion.div>
    </>
  );
}
