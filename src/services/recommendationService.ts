import type { WardrobeItem } from "../data/mockData";
import type { SavedGarment } from "./wardrobeStorage";

export interface GeneratedRecommendation {
  readonly title: string;
  readonly rationale: readonly string[];
  readonly confidence: number;
}

export function generateRecommendation(
  garments: readonly SavedGarment[],
  wardrobe: readonly WardrobeItem[],
): GeneratedRecommendation | null {
  const garment = garments[0];
  const companions = wardrobe.slice(0, 2).map((item) => item.name);

  if (!garment || companions.length < 2) return null;

  return {
    title: "A considered neutral pairing",
    rationale: [
      `Pair your ${garment.dominantColor.toLowerCase()} ${garment.material.toLowerCase()} ${garment.category.toLowerCase()} with your ${companions[0]} and ${companions[1]}.`,
      `${garment.season} versatility and complementary neutral tones make this ideal for a considered workday.`,
    ],
    confidence: Math.min(0.98, garment.confidence + 0.02),
  };
}
