interface Props {
  /** „AI-assisted" für Hybrid (Foto + KI-Hintergrund) · „AI-generated" für reine KI-Visuals */
  variant?: "assisted" | "generated";
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  className?: string;
}

const COPY = {
  assisted: "AI-Assisted",
  generated: "AI-Generated",
};

const POSITIONS = {
  "bottom-right": "bottom-3 right-3",
  "bottom-left": "bottom-3 left-3",
  "top-right": "top-3 right-3",
  "top-left": "top-3 left-3",
};

/**
 * EU-AI-Act-konformes Sichtbarkeits-Label für KI-generierte oder
 * KI-unterstützte Visuals. Mirrou kennzeichnet Visuals freiwillig schon
 * heute, lange vor der Pflicht ab August 2026.
 */
export default function AILabel({
  variant = "assisted",
  position = "bottom-right",
  className = "",
}: Props) {
  return (
    <span
      className={`absolute z-10 ${POSITIONS[position]} font-mono text-[9px] uppercase tracking-[0.25em] text-ink/85 bg-bg/70 backdrop-blur-sm px-2 py-1 border border-white/10 ${className}`}
      role="note"
      aria-label={`Hinweis: ${COPY[variant]} — gekennzeichnet gemäß EU AI Act`}
    >
      <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-1.5 align-middle" />
      {COPY[variant]}
    </span>
  );
}
