import { useState, useRef, useEffect, useCallback, ElementType } from "react";

interface Props {
  text: string;
  className?: string;
  as?: ElementType;
  triggerOnLoad?: boolean;
  loadDelay?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

export default function ScrambleText({
  text,
  className = "",
  as: Tag = "span",
  triggerOnLoad = false,
  loadDelay = 0,
}: Props) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const restore = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setDisplay(text);
  }, [text]);

  const scramble = useCallback(() => {
    if (intervalRef.current) return;
    let iter = 0;
    intervalRef.current = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iter) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iter += 0.5;
      if (iter >= text.length) restore();
    }, 35);
  }, [text, restore]);

  useEffect(() => {
    if (triggerOnLoad) {
      const t = setTimeout(scramble, loadDelay);
      return () => clearTimeout(t);
    }
  }, [triggerOnLoad, loadDelay, scramble]);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  return (
    <Tag
      className={`font-mono ${className}`}
      onMouseEnter={scramble}
      onMouseLeave={restore}
    >
      {display}
    </Tag>
  );
}
