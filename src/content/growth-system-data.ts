export type FatigueLevel = "low" | "medium" | "high";
export type DecisionStatus = "Scale" | "Iterate" | "Refresh";
export type HookStatus = "winner" | "testing" | "paused";
export type VariantFormat = "Static" | "Carousel" | "Video" | "Motion";

export interface HookEntry {
  text: string;
  relevance: number; // 1–5
  intrigue: number;
  clarity: number;
  status: HookStatus;
}

export interface CreativeVariant {
  id: string;
  format: VariantFormat;
  angle: string;
  hook: string;
  funnelRole: string;
  messageFocus: string;
}

export interface ExperimentSpec {
  hypothesis: string;
  successMetric: string;
  duration: string;
  winnerRule: string;
  confidence: number; // percent
}

export interface PerformanceMetric {
  label: string;
  value: string;
  benchmark: string;
  direction: "above" | "below" | "at";
  isPositive: boolean;
}

export interface StrategicInputs {
  audience: string;
  painPoints: string[];
  platforms: string[];
  objective: string;
  tone: string;
  promise: string;
}

export interface GrowthSystemData {
  caseId: string;
  layer: "hero" | "hooks" | "variants" | "performance";
  strategicInputs: StrategicInputs;
  hooks: HookEntry[];
  variants: CreativeVariant[];
  experiment: ExperimentSpec;
  performance: {
    metrics: PerformanceMetric[];
    fatigue: FatigueLevel;
    insight: string;
  };
  decision: {
    status: DecisionStatus;
    rationale: string;
    nextAction: string;
  };
}

const growthSystemData: GrowthSystemData[] = [
  {
    caseId: "luminous-aura",
    layer: "hero",
    strategicInputs: {
      audience: "Premium skincare buyers, female 28–45, high affinity for ingredient science and luxury consumption",
      painPoints: [
        "Visual commoditization in the serum category — all brands look the same",
        "CTR collapse when ads look like every other serum on the market",
        "Price-justification gap: visual quality must match AOV expectation",
      ],
      platforms: ["Meta (Instagram Feed + Stories)", "Pinterest"],
      objective: "Build consideration and purchase intent through a distinctive visual system that justifies premium pricing",
      tone: "Restrained luxury — no text claims, no lifestyle noise, material precision only",
      promise: "If the serum looks like it belongs in a museum, the price justifies itself",
    },
    hooks: [
      { text: "The surface earns the price.", relevance: 5, intrigue: 4, clarity: 5, status: "winner" },
      { text: "Marble doesn't apologize for precision.", relevance: 4, intrigue: 5, clarity: 3, status: "testing" },
      { text: "Gold particles. Not decoration — delivery system.", relevance: 5, intrigue: 5, clarity: 4, status: "winner" },
      { text: "Every molecule, placed.", relevance: 4, intrigue: 3, clarity: 5, status: "paused" },
      { text: "Luxury is restraint. We have both.", relevance: 3, intrigue: 4, clarity: 4, status: "paused" },
      { text: "Six frames. One language.", relevance: 4, intrigue: 4, clarity: 5, status: "testing" },
    ],
    variants: [
      {
        id: "A",
        format: "Static",
        angle: "Dark marble surface, product elevated center frame",
        hook: "The surface earns the price.",
        funnelRole: "Awareness — scroll stop",
        messageFocus: "Material quality signal. No text. No claim.",
      },
      {
        id: "B",
        format: "Carousel",
        angle: "5-frame ingredient narrative from macro to full product",
        hook: "Six frames. One luxury language.",
        funnelRole: "Consideration — ingredient story",
        messageFocus: "Sequential brand education. Ingredient → Process → Result.",
      },
      {
        id: "C",
        format: "Video",
        angle: "6-second gold particle atmosphere reveal around product",
        hook: "Gold particles. Not decoration — delivery system.",
        funnelRole: "Consideration → Conversion",
        messageFocus: "Kinetic proof of formula quality. No voiceover.",
      },
    ],
    experiment: {
      hypothesis: "A dark-marble static hero generates 40%+ higher CTR versus neutral lifestyle frames in the premium serum category",
      successMetric: "CTR (primary) · 3-second video view rate (secondary) · CPA as qualifier",
      duration: "7 days minimum, extended by 3 days if significance not reached",
      winnerRule: "CTR > 1.5% with CPA < €45. Scale to 70% of budget.",
      confidence: 92,
    },
    performance: {
      metrics: [
        { label: "CTR", value: "2.3%", benchmark: "1.5% target", direction: "above", isPositive: true },
        { label: "CPA", value: "€38", benchmark: "€45 target", direction: "below", isPositive: true },
        { label: "ROAS", value: "4.1×", benchmark: "3.0× target", direction: "above", isPositive: true },
        { label: "Engagement", value: "3.8%", benchmark: "2.0% target", direction: "above", isPositive: true },
      ],
      fatigue: "low",
      insight:
        "Marble surface frames outperform category-standard lifestyle photography by 3.2× in CTR. Gold-particle detail drives highest engagement rate. No fatigue signal detected at week 4.",
    },
    decision: {
      status: "Scale",
      rationale:
        "CTR 53% above target. CPA 15.5% below benchmark. ROAS at 4.1× confirms strong return. Creative fatigue index: low. All scaling conditions met.",
      nextAction:
        "Scale winning dark-marble frame to 70% of media budget. Commission 3 new marble-variant frames. Test warm-seasonal colorway offset in Q3.",
    },
  },

  {
    caseId: "vitality-pulse",
    layer: "hooks",
    strategicInputs: {
      audience: "High-performance professionals, male and female 25–40, fitness-adjacent, premium supplement buyers",
      painPoints: [
        "Category visual noise: sports maximalism vs. wellness minimalism — no middle ground",
        "Hook fatigue emerging in week 6: thumb-stop rate dropping 18% week-over-week",
        "Audience skews digital-native — conditioned to ignore conventional supplement photography",
      ],
      platforms: ["Meta (Feed + Reels)", "TikTok", "YouTube pre-roll"],
      objective: "Dominate scroll-stop in the premium energy supplement category through kinetic visual identity",
      tone: "Controlled intensity — disciplined, not loud. Movement as precision, not chaos.",
      promise: "If the ad looks like discipline feels, it attracts disciplined buyers",
    },
    hooks: [
      { text: "Energy isn't loud. It's precise.", relevance: 5, intrigue: 5, clarity: 4, status: "winner" },
      { text: "Momentum, frozen at the right moment.", relevance: 4, intrigue: 5, clarity: 3, status: "winner" },
      { text: "Your ritual. Not a supplement.", relevance: 5, intrigue: 4, clarity: 5, status: "testing" },
      { text: "The discipline you can see.", relevance: 4, intrigue: 4, clarity: 5, status: "winner" },
      { text: "Kinetic. Controlled. Yours.", relevance: 3, intrigue: 4, clarity: 4, status: "paused" },
      { text: "Stillness is just energy waiting.", relevance: 4, intrigue: 5, clarity: 3, status: "testing" },
    ],
    variants: [
      {
        id: "A",
        format: "Static",
        angle: "Diagonal composition — liquid crown freeze, dark background, single directional light",
        hook: "Energy isn't loud. It's precise.",
        funnelRole: "Awareness — maximum scroll stop",
        messageFocus: "Kinetic stillness. The product implies the ritual.",
      },
      {
        id: "B",
        format: "Video",
        angle: "3-second macro motion sequence: drop → crown → product reveal",
        hook: "Momentum, frozen at the right moment.",
        funnelRole: "Awareness → Consideration",
        messageFocus: "Motion-freeze sequence. Energy made visible.",
      },
      {
        id: "C",
        format: "Carousel",
        angle: "4-frame energy-to-ritual narrative: macro detail → full product → ritual context",
        hook: "The discipline you can see.",
        funnelRole: "Consideration — ritual framing",
        messageFocus: "Product as ritual object, not performance aid.",
      },
    ],
    experiment: {
      hypothesis: "Frozen-motion static frames outperform equivalent video in Meta Feed at week 6+ when creative fatigue is detected via declining thumb-stop rate",
      successMetric: "Thumb-stop rate (primary) · CTR delta vs. baseline (secondary) · Fatigue index as exit signal",
      duration: "14-day test against fatigued baseline assets",
      winnerRule: "Thumb-stop rate recovery > 80% of original baseline within 7 days. CTR > 2.5%.",
      confidence: 87,
    },
    performance: {
      metrics: [
        { label: "CTR", value: "3.2%", benchmark: "1.1% category avg", direction: "above", isPositive: true },
        { label: "Thumb-Stop", value: "+58%", benchmark: "category baseline", direction: "above", isPositive: true },
        { label: "Conv. Rate", value: "4.8%", benchmark: "2.1% average", direction: "above", isPositive: true },
        { label: "CPA", value: "−38%", benchmark: "pre-refresh baseline", direction: "below", isPositive: true },
      ],
      fatigue: "medium",
      insight:
        "Hook Variant A and D outperform category average by 3× in scroll-stop. Week 6 fatigue signal detected — thumb-stop declining 18% week-over-week. Refresh cycle recommended before week 8.",
    },
    decision: {
      status: "Iterate",
      rationale:
        "Strong benchmarks across CTR and conversion. Fatigue signal detected at week 6 — hook rotation required to maintain performance before decline accelerates. Winning hooks established: rotate to new surface angles using same motion-freeze logic.",
      nextAction:
        "Produce 4 new motion-freeze variants using validated hooks A and D. Introduce warm-surface alternative (amber vs. dark). Maintain diagonal composition language. Deploy by week 8.",
    },
  },

  {
    caseId: "essence-drift",
    layer: "variants",
    strategicInputs: {
      audience: "Fragrance enthusiasts, female 28–50, aspirational lifestyle segment, premium-to-luxury spend threshold",
      painPoints: [
        "Fragrance is invisible — category defaults to product-on-surface photography that communicates nothing about sensation",
        "Brand awareness near zero at launch — visual system must build emotion and memory simultaneously",
        "D2C fragrance competes with department-store brands visually — editorial standard required",
      ],
      platforms: ["Meta (Instagram Feed + Stories)", "Pinterest", "Editorial digital press"],
      objective: "Build brand awareness and emotional brand association through sensation-first imagery",
      tone: "Ethereal restraint — warmth through absence, luxury through atmospheric silence",
      promise: "If the visual makes you feel the scent, the purchase follows",
    },
    hooks: [
      { text: "You won't smell it. You'll feel it.", relevance: 5, intrigue: 5, clarity: 4, status: "winner" },
      { text: "The pause between breaths.", relevance: 4, intrigue: 5, clarity: 3, status: "testing" },
      { text: "Warm. Not loud.", relevance: 5, intrigue: 4, clarity: 5, status: "winner" },
      { text: "Drift. Don't rush.", relevance: 3, intrigue: 4, clarity: 5, status: "paused" },
      { text: "One warm note. Everything else disappears.", relevance: 5, intrigue: 5, clarity: 4, status: "testing" },
      { text: "The atmosphere before the memory.", relevance: 4, intrigue: 5, clarity: 3, status: "testing" },
    ],
    variants: [
      {
        id: "A",
        format: "Static",
        angle: "Diffusion hero — cold atmospheric haze, single warm gold cap detail, quasi-monochrome",
        hook: "You won't smell it. You'll feel it.",
        funnelRole: "Awareness — brand emotion establishment",
        messageFocus: "Sensation over product. The absence communicates the presence.",
      },
      {
        id: "B",
        format: "Static",
        angle: "Refraction close-up — glass prismatic light split, product partially visible",
        hook: "One warm note. Everything else disappears.",
        funnelRole: "Consideration — visual brand vocabulary",
        messageFocus: "Light refraction as scent metaphor. Premium without claim.",
      },
      {
        id: "C",
        format: "Motion",
        angle: "6-second atmospheric reveal — haze diffusion from cool to warm, product appears last",
        hook: "Warm. Not loud.",
        funnelRole: "Consideration → Conversion",
        messageFocus: "Temperature gradient as narrative. Cool foundation, warm reveal.",
      },
    ],
    experiment: {
      hypothesis: "Sensation-first diffusion imagery generates 50%+ higher brand recall versus product-on-surface control in fragrance awareness campaigns",
      successMetric: "Brand recall (prompted, 7-day) · Engagement rate · Social saves (secondary)",
      duration: "8-week brand awareness campaign, DACH panel",
      winnerRule: "Aided brand recall > 35% vs. <15% category baseline. Engagement > 4%.",
      confidence: 84,
    },
    performance: {
      metrics: [
        { label: "Brand Recall", value: "+22 PP", benchmark: "category baseline", direction: "above", isPositive: true },
        { label: "Engagement", value: "6.4%", benchmark: "1.8% category avg", direction: "above", isPositive: true },
        { label: "Avg. Dwell", value: "3:08", benchmark: "1:12 baseline", direction: "above", isPositive: true },
        { label: "Email Conv.", value: "8.2%", benchmark: "3.5% average", direction: "above", isPositive: true },
      ],
      fatigue: "low",
      insight:
        "Variant B (refraction close-up) outperforms Variant A in saves and brand recall. Variant C drives highest conversion intent. No fatigue detected — atmospheric imagery has extended lifespan versus direct-response formats.",
    },
    decision: {
      status: "Iterate",
      rationale:
        "Variant B confirmed winner on recall and saves. Variant C wins on conversion. Variant A is foundational awareness but not top performer. Scale Variants B and C together. Develop 2 new surface angles for Q3 maintaining refraction and atmospheric logic.",
      nextAction:
        "Scale Variants B and C to full budget. Commission new seasonal colorway (autumn warmth palette). Maintain refraction grammar. Test text-overlay version of hook for Stories placement.",
    },
  },

  {
    caseId: "neural-glow",
    layer: "performance",
    strategicInputs: {
      audience: "Beauty-tech early adopters, female and male 25–40, digital native, already converted in the beauty-tech category",
      painPoints: [
        "Target audience is skeptical of conventional cosmetic marketing — demands proof over aspiration",
        "AI-formulated product requires visual system that communicates tech credibility without clinical coldness",
        "Luxury register must be maintained — neon aesthetic risks sliding into gaming/gaming-adjacent visual vocabulary",
      ],
      platforms: ["Meta (Feed + Reels)", "TikTok", "Google Display"],
      objective: "Establish tech-beauty market position through a fully AI-generated visual system at launch",
      tone: "Precision luxury — neon discipline, no maximalism. The luxury is in the control.",
      promise: "If the visual looks like the technology is real, the conversion follows at scale",
    },
    hooks: [
      { text: "Your skin. Our algorithm.", relevance: 5, intrigue: 5, clarity: 4, status: "winner" },
      { text: "Precision you can see.", relevance: 5, intrigue: 4, clarity: 5, status: "winner" },
      { text: "Not skincare. Biotech.", relevance: 4, intrigue: 5, clarity: 5, status: "winner" },
      { text: "Every glow, engineered.", relevance: 4, intrigue: 5, clarity: 4, status: "testing" },
      { text: "The formula sees your skin.", relevance: 4, intrigue: 5, clarity: 3, status: "paused" },
      { text: "Light. Circuit. Skin.", relevance: 3, intrigue: 5, clarity: 3, status: "paused" },
    ],
    variants: [
      {
        id: "A",
        format: "Static",
        angle: "Circuit-grid hero — neon lines across dark void, product centered, gold-blue spectrum",
        hook: "Your skin. Our algorithm.",
        funnelRole: "Awareness — category disruption",
        messageFocus: "Tech-luxury signal. Immediate category differentiation.",
      },
      {
        id: "B",
        format: "Static",
        angle: "Bioluminescent network — light fiber detail wrapping product form",
        hook: "Precision you can see.",
        funnelRole: "Consideration — formula story",
        messageFocus: "Network as product efficacy metaphor. Science made beautiful.",
      },
      {
        id: "C",
        format: "Video",
        angle: "8-second neon reveal — circuit builds to product, particle implosion, freeze on hero",
        hook: "Not skincare. Biotech.",
        funnelRole: "Consideration → Conversion",
        messageFocus: "Technology transformation narrative. Category-defining.",
      },
    ],
    experiment: {
      hypothesis: "Fully AI-generated circuit-aesthetic visuals outperform conventional beauty photography in CTR and conversion rate for a tech-positioned skincare product",
      successMetric: "CTR vs. control (primary) · CPA delta vs. photography baseline · Conversion rate direct from creative",
      duration: "10-day A/B split, equal budget allocation",
      winnerRule: "CTR > 3.0%. CPA improvement > 30% vs. photography baseline. Conversion rate > 4%.",
      confidence: 91,
    },
    performance: {
      metrics: [
        { label: "CTR", value: "4.1%", benchmark: "1.3% beauty-tech avg", direction: "above", isPositive: true },
        { label: "Thumb-Stop", value: "+67%", benchmark: "category frame test", direction: "above", isPositive: true },
        { label: "CPA", value: "−52%", benchmark: "photography baseline", direction: "below", isPositive: true },
        { label: "Conv. Rate", value: "6.2%", benchmark: "2.8% category avg", direction: "above", isPositive: true },
        { label: "Avg. Order", value: "+18%", benchmark: "previous creative set", direction: "above", isPositive: true },
        { label: "CTR Conf.", value: "91%", benchmark: "85% threshold", direction: "above", isPositive: true },
      ],
      fatigue: "medium",
      insight:
        "All KPIs exceed targets significantly. AI-generated frames outperform photography by 3× CTR. Fatigue signal emerging at week 8 — neon-circuit visual language requires variant refresh to maintain performance. Confidence at 91% — scaling justified.",
    },
    decision: {
      status: "Refresh",
      rationale:
        "All KPIs on target. CTR 215% above benchmark. CPA 52% below photography baseline. However, fatigue index rising at week 8 — pattern recognition in neon-circuit aesthetic reducing scroll-stop differential. Refresh creative with new color temperature and composition variation, maintaining circuit grammar.",
      nextAction:
        "Commission 4 new circuit-variant frames — warm gold-dominant palette vs. current blue-dominant. Introduce depth variation (foreground blur). Maintain void-black background and tonale discipline. Deploy week 9.",
    },
  },
];

export default growthSystemData;

export function getGrowthData(caseId: string): GrowthSystemData | undefined {
  return growthSystemData.find((d) => d.caseId === caseId);
}
