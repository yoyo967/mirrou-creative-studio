import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface Props {
  text: string;
  className?: string;
  /** Tailwind class for each word — e.g. "text-ink" */
  wordClassName?: string;
}

export default function ScrollWordReveal({ text, className = "", wordClassName = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 40%"],
  });

  const words = text.split(" ");

  return (
    <div ref={ref} className={`flex flex-wrap gap-x-[0.28em] gap-y-1 ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <WordSpan
            key={i}
            word={word}
            scrollYProgress={scrollYProgress}
            start={start}
            end={end}
            className={wordClassName}
          />
        );
      })}
    </div>
  );
}

function WordSpan({
  word,
  scrollYProgress,
  start,
  end,
  className,
}: {
  word: string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  className: string;
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1]);
  const y = useTransform(scrollYProgress, [start, end], [10, 0]);

  return (
    <motion.span style={{ opacity, y }} className={`inline-block ${className}`}>
      {word}
    </motion.span>
  );
}
