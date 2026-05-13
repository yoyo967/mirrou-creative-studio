import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface Props {
  src: string;
  alt: string;
  className?: string;
  strength?: number;
}

export default function ParallaxImage({ src, alt, className = "", strength = 60 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  return (
    <div ref={ref} className={`parallax-container ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="w-full h-[115%] object-cover"
        loading="lazy"
      />
    </div>
  );
}
