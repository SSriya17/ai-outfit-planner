import type { WardrobeItem } from "../data/mockData";
import type { SavedGarment } from "./wardrobeStorage";
import { garmentToWardrobeItem } from "./mappers/garmentToWardrobeItem";
import type { Garment } from "../types/wardrobe";

export interface GeneratedRecommendation {
  readonly title: string;
  readonly rationale: readonly string[];
  readonly confidence: number;
}

export function generateOutfitRecommendation(garments: readonly Garment[]): GeneratedRecommendation | null {
  if (garments.length === 0) return null;

  const outfit = garments.slice(0, 3).map(garmentToWardrobeItem);
  const lead = outfit[0];
  const companions = outfit.slice(1).map((item) => item.name);
  const pairing = companions.length > 0 ? ` with ${companions.join(" and ")}` : "";

  return {
    title: "Today’s considered outfit",
    rationale: [
      `Start with your ${lead.color.toLowerCase()} ${lead.vision.material.toLowerCase()} ${lead.category.toLowerCase()}${pairing}.`,
      `${lead.style} styling and ${lead.season.toLowerCase()} versatility create a composed, easy-to-wear look.`,
    ],
    confidence: Math.min(0.98, lead.vision.confidence + 0.02),
  };
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
