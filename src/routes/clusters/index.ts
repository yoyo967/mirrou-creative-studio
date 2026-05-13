import type { ComponentType } from "react";
import HooksDieFunktionieren from "./HooksDieFunktionieren";
import CreativeFatigueErkennen from "./CreativeFatigueErkennen";
import CreativeHypothesenFormulieren from "./CreativeHypothesenFormulieren";
import LearningLogAufbauen from "./LearningLogAufbauen";
import D2cBeautyDach2026 from "./D2cBeautyDach2026";
import EuAiActFuerMarketers from "./EuAiActFuerMarketers";

/**
 * Cluster-Slug → Komponente. Cluster ohne Eintrag rendern den Default-Stub
 * aus ClusterPage.tsx (mit Skizze-Hinweis und Backlink zur Pillar).
 */
export const CLUSTER_BODIES: Record<string, ComponentType> = {
  "hooks-die-funktionieren": HooksDieFunktionieren,
  "creative-fatigue-erkennen": CreativeFatigueErkennen,
  "creative-hypothesen-formulieren": CreativeHypothesenFormulieren,
  "learning-log-aufbauen": LearningLogAufbauen,
  "d2c-beauty-dach-2026": D2cBeautyDach2026,
  "eu-ai-act-fuer-marketers": EuAiActFuerMarketers,
};
