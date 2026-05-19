import { useRef } from "react";
import { motion, useInView } from "motion/react";
import type { GrowthSystemData, HookEntry, CreativeVariant, FatigueLevel, DecisionStatus } from "../content/growth-system-data";

interface Props {
  data: GrowthSystemData;
  t: (key: string) => string;
}

// Animated score bar (2px, accent fill)
function ScoreBar({ score, delay = 0 }: { score: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, margin: "-40px" });
  const pct = `${(score / 5) * 100}%`;
  return (
    <div ref={ref} className="w-full h-[2px] bg-white/8 relative overflow-hidden">
      <motion.div
        className="absolute inset-y-0 left-0 bg-accent/70"
        initial={{ width: 0 }}
        animate={visible ? { width: pct } : { width: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

// 3-square fatigue indicator
function FatigueIndicator({ level }: { level: FatigueLevel }) {
  const colors: Record<FatigueLevel, string[]> = {
    low: ["bg-accent", "bg-white/10", "bg-white/10"],
    medium: ["bg-accent", "bg-amber-400/70", "bg-white/10"],
    high: ["bg-accent", "bg-amber-400/70", "bg-red-400/70"],
  };
  const squares = colors[level];
  return (
    <div className="flex gap-1.5 items-center">
      {squares.map((cls, i) => (
        <div key={i} className={`w-3 h-3 ${cls}`} />
      ))}
    </div>
  );
}

// Decision status color
function statusColor(status: DecisionStatus): string {
  if (status === "Scale") return "text-accent";
  if (status === "Refresh") return "text-amber-400";
  return "text-ink";
}

// Direction indicator
function DirectionBadge({ direction, isPositive }: { direction: string; isPositive: boolean }) {
  const symbol = direction === "above" ? "↑" : direction === "below" ? "↓" : "→";
  return (
    <span className={`font-mono text-[11px] ${isPositive ? "text-accent" : "text-red-400/80"}`}>
      {symbol}
    </span>
  );
}

// Section heading
function SectionHeading({ label }: { label: string }) {
  return (
    <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-muted mb-6">
      {label}
    </p>
  );
}

// Hook row
function HookRow({ hook, index }: { hook: HookEntry; index: number }) {
  const statusBadge: Record<string, string> = {
    winner: "border-accent/40 text-accent",
    testing: "border-white/15 text-muted",
    paused: "border-white/8 text-muted/40",
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="py-5 border-b border-white/6 last:border-0"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <p className={`font-serif italic text-base leading-snug ${hook.status === "paused" ? "text-ink/35" : "text-ink/85"}`}>
          "{hook.text}"
        </p>
        <span className={`shrink-0 font-mono text-[8px] uppercase tracking-[0.4em] border px-2 py-1 ${statusBadge[hook.status]}`}>
          {hook.status}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-3">
        {[
          { label: "Rel.", score: hook.relevance },
          { label: "Intr.", score: hook.intrigue },
          { label: "Clr.", score: hook.clarity },
        ].map(({ label, score }, i) => (
          <div key={label}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-muted/60">{label}</span>
              <span className="font-mono text-[9px] text-muted">{score}/5</span>
            </div>
            <ScoreBar score={score} delay={index * 0.06 + i * 0.05} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Variant card
function VariantCard({ variant, index }: { variant: CreativeVariant; index: number }) {
  const formatColors: Record<string, string> = {
    Static: "border-white/15 text-muted",
    Carousel: "border-accent/30 text-accent",
    Video: "border-amber-400/30 text-amber-400/80",
    Motion: "border-amber-400/30 text-amber-400/80",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="border border-white/6 bg-white/[0.02] p-6"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <span className="font-mono text-[11px] tracking-[0.55em] text-accent">
          {variant.id}
        </span>
        <span className={`font-mono text-[8px] uppercase tracking-[0.4em] border px-2 py-1 ${formatColors[variant.format] ?? "border-white/15 text-muted"}`}>
          {variant.format}
        </span>
      </div>
      <p className="font-serif italic text-sm text-ink/80 mb-3 leading-snug">
        "{variant.hook}"
      </p>
      <p className="text-[11px] text-muted font-light leading-relaxed mb-4">
        {variant.angle}
      </p>
      <div className="border-t border-white/6 pt-4">
        <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-muted/50 mb-1.5">
          {variant.funnelRole}
        </p>
        <p className="text-[11px] text-ink/50 font-light">
          {variant.messageFocus}
        </p>
      </div>
    </motion.div>
  );
}

export default function GrowthSystemLayer({ data, t }: Props) {
  const decisionRef = useRef<HTMLDivElement>(null);
  const decisionVisible = useInView(decisionRef, { once: true, margin: "-80px" });

  return (
    <section className="border-t border-white/6 py-24 md:py-36 relative">
      {/* Left accent line */}
      <div className="absolute left-0 top-24 bottom-24 w-[2px] bg-linear-to-b from-transparent via-accent/20 to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

        {/* ── Section header ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-accent mb-3">
            {t("gsOperatingSystem")}
          </p>
          <div className="gold-rule-left mb-0 w-8" />
        </motion.div>

        <div className="space-y-20">

          {/* ── 1. Strategic Inputs ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionHeading label={t("gsStrategicInputs")} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5 border border-white/6">
              <div className="bg-bg p-8">
                <p className="font-mono text-[8px] uppercase tracking-[0.45em] text-muted/60 mb-3">Audience</p>
                <p className="text-sm text-ink/75 font-light leading-relaxed">{data.strategicInputs.audience}</p>
              </div>
              <div className="bg-bg p-8">
                <p className="font-mono text-[8px] uppercase tracking-[0.45em] text-muted/60 mb-3">Tone & Promise</p>
                <p className="text-sm text-ink/75 font-light leading-relaxed mb-3">{data.strategicInputs.tone}</p>
                <p className="font-serif italic text-sm text-accent/80">{data.strategicInputs.promise}</p>
              </div>
              <div className="bg-bg p-8 lg:col-span-2">
                <p className="font-mono text-[8px] uppercase tracking-[0.45em] text-muted/60 mb-4">Pain Points</p>
                <ul className="space-y-2">
                  {data.strategicInputs.painPoints.map((pt, i) => (
                    <li key={i} className="flex gap-3 text-sm text-ink/65 font-light">
                      <span className="text-accent shrink-0 mt-0.5">→</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* ── 2. Hook Intelligence ─────────────────────────────────────── */}
          <div>
            <SectionHeading label={t("gsHookIntelligence")} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5 border border-white/6 mb-0">
              <div className="bg-bg p-8 lg:col-span-2 border-b border-white/6">
                <div className="grid grid-cols-3 gap-6 text-center">
                  {[
                    { label: "Winners", count: data.hooks.filter((h) => h.status === "winner").length },
                    { label: "Testing", count: data.hooks.filter((h) => h.status === "testing").length },
                    { label: "Paused", count: data.hooks.filter((h) => h.status === "paused").length },
                  ].map(({ label, count }) => (
                    <div key={label}>
                      <p className="font-serif italic text-3xl text-ink mb-1">{count}</p>
                      <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-muted/60">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-bg p-8 lg:col-span-2">
                {data.hooks.map((hook, i) => (
                  <HookRow key={i} hook={hook} index={i} />
                ))}
              </div>
            </div>
          </div>

          {/* ── 3. Creative Variant Architecture ────────────────────────── */}
          <div>
            <SectionHeading label={t("gsVariantArchitecture")} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {data.variants.map((v, i) => (
                <VariantCard key={v.id} variant={v} index={i} />
              ))}
            </div>
          </div>

          {/* ── 4. Experiment Design ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionHeading label={t("gsExperimentDesign")} />
            <div className="border border-white/6 bg-white/[0.015] p-8 md:p-12 relative overflow-hidden">
              {/* Confidence arc — visual accent */}
              <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-accent/8 rounded-bl-full" />

              <div className="overflow-hidden mb-8">
                <motion.p
                  initial={{ clipPath: "inset(100% 0 0 0)" }}
                  whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif italic text-xl md:text-2xl lg:text-3xl text-ink leading-[1.4] text-pretty max-w-3xl"
                >
                  "{data.experiment.hypothesis}"
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/6 pt-8">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.45em] text-muted/60 mb-2">Success Metric</p>
                  <p className="text-sm text-ink/70 font-light leading-relaxed">{data.experiment.successMetric}</p>
                </div>
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.45em] text-muted/60 mb-2">Winner Rule</p>
                  <p className="text-sm text-ink/70 font-light leading-relaxed">{data.experiment.winnerRule}</p>
                </div>
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.45em] text-muted/60 mb-2">Confidence</p>
                  <div className="flex items-baseline gap-2">
                    <p className="font-serif italic text-4xl text-accent">{data.experiment.confidence}%</p>
                  </div>
                  <p className="text-[11px] text-muted/50 font-mono mt-1">{data.experiment.duration}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── 5. Performance Signals ───────────────────────────────────── */}
          <div>
            <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
              <SectionHeading label={t("gsPerformanceSignals")} />
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[8px] uppercase tracking-[0.45em] text-muted/60">
                  {t("gsCreativeFatigue")}
                </span>
                <FatigueIndicator level={data.performance.fatigue} />
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted/60 capitalize">
                  {data.performance.fatigue}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5 border border-white/6 mb-8">
              {data.performance.metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-bg p-6"
                >
                  <div className="flex items-center gap-1.5 mb-3">
                    <DirectionBadge direction={m.direction} isPositive={m.isPositive} />
                  </div>
                  <p className="font-serif italic text-2xl md:text-3xl text-ink leading-none mb-2">
                    {m.value}
                  </p>
                  <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-accent/80 mb-1">
                    {m.label}
                  </p>
                  <p className="text-[10px] text-muted/50 font-light leading-snug">{m.benchmark}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="border-l-2 border-accent/30 pl-6 py-1"
            >
              <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-muted/60 mb-2">
                {t("gsSystemInsight")}
              </p>
              <p className="text-sm text-ink/65 font-light leading-relaxed max-w-3xl">
                {data.performance.insight}
              </p>
            </motion.div>
          </div>

          {/* ── 6. Decision Block ────────────────────────────────────────── */}
          <div ref={decisionRef}>
            <SectionHeading label={t("gsDecision")} />
            <div className="border border-white/6 relative overflow-hidden">
              {/* Status word — large background ghost */}
              <div className="absolute inset-0 flex items-center justify-end pr-8 md:pr-16 pointer-events-none overflow-hidden">
                <p
                  className="font-serif italic leading-none select-none"
                  style={{
                    fontSize: "clamp(80px, 14vw, 180px)",
                    opacity: 0.04,
                    color: "var(--color-ink)",
                  }}
                >
                  {data.decision.status}
                </p>
              </div>

              <div className="relative z-10 p-8 md:p-14">
                <div className="flex items-start gap-8 md:gap-16 mb-10 flex-wrap">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.5em] text-muted/60 mb-2">
                      {t("gsDecision")}
                    </p>
                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      animate={decisionVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className={`font-serif italic text-5xl md:text-6xl lg:text-7xl leading-none ${statusColor(data.decision.status)}`}
                    >
                      {data.decision.status}
                    </motion.p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/6 pt-8">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.45em] text-muted/60 mb-3">Rationale</p>
                    <p className="text-sm text-ink/65 font-light leading-relaxed">{data.decision.rationale}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.45em] text-muted/60 mb-3">
                      {t("gsNextAction")}
                    </p>
                    <p className="text-sm text-ink/65 font-light leading-relaxed">{data.decision.nextAction}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
