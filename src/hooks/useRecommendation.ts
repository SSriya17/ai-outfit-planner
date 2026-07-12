import { useMemo } from "react";

import type { WardrobeItem } from "../data/mockData";
import { generateRecommendation, type GeneratedRecommendation } from "../services/recommendationService";
import type { SavedGarment } from "../services/wardrobeStorage";

export function useRecommendation(
  garments: readonly SavedGarment[],
  wardrobe: readonly WardrobeItem[],
): GeneratedRecommendation | null {
  return useMemo(() => generateRecommendation(garments, wardrobe), [garments, wardrobe]);
}
