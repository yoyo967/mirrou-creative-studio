import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { useTranslation } from "react-i18next";

function CountUp({ to, suffix, running }: { to: number; suffix: string; running: boolean }) {
  const [val, setVal] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!running) return;
    const duration = 2200;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [running, to]);

  return <span>{val}{suffix}</span>;
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation("home");

  const stats = [
    { value: 3,  key: "roas",      ...t("stats.roas",      { returnObjects: true }) as { label: string; suffix: string; desc: string } },
    { value: 68, key: "ctr",       ...t("stats.ctr",       { returnObjects: true }) as { label: string; suffix: string; desc: string } },
    { value: 40, key: "visuals",   ...t("stats.visuals",   { returnObjects: true }) as { label: string; suffix: string; desc: string } },
    { value: 4,  key: "turnaround",...t("stats.turnaround",{ returnObjects: true }) as { label: string; suffix: string; desc: string } },
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-10 border-t border-white/6">
      <div className="max-w-7xl mx-auto">
        <p className="eyebrow mb-10">{t("stats.eyebrow")}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {stats.map((s) => (
            <div key={s.key} className="flex flex-col gap-3">
              <p className="font-serif text-5xl md:text-6xl lg:text-7xl text-accent leading-none">
                <CountUp to={s.value} suffix={s.suffix} running={isInView} />
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-ink/70">{s.label}</p>
              <p className="text-[13px] text-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
