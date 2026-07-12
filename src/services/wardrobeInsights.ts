import type { Garment } from "../types/wardrobe";

export interface InsightDistribution {
  readonly label: string;
  readonly count: number;
  readonly percentage: number;
}

export interface WardrobeInsights {
  readonly totalItems: number;
  readonly categoryCounts: Readonly<Record<string, number>>;
  readonly colors: readonly InsightDistribution[];
  readonly styles: readonly InsightDistribution[];
  readonly seasonalCoverage: Readonly<Record<string, number>>;
  readonly healthScore: number;
  readonly recommendation: string;
  readonly observation: string;
}

const trackedCategories = ["Tops", "Bottoms", "Outerwear", "Footwear", "Accessories"] as const;
const trackedSeasons = ["Spring", "Summer", "Autumn", "Winter"] as const;

function distribution(values: readonly string[], total: number): readonly InsightDistribution[] {
  const counts = values.reduce<Record<string, number>>((result, value) => ({ ...result, [value]: (result[value] ?? 0) + 1 }), {});
  return Object.entries(counts)
    .map(([label, count]) => ({ label, count, percentage: Math.round((count / total) * 100) }))
    .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label));
}

function categoryBucket(category: string): string | null {
  const value = category.toLowerCase();
  if (value.includes("top") || value.includes("shirt") || value.includes("blouse") || value.includes("tee")) return "Tops";
  if (value.includes("bottom") || value.includes("trouser") || value.includes("pant") || value.includes("jean") || value.includes("skirt")) return "Bottoms";
  if (value.includes("outer") || value.includes("jacket") || value.includes("coat") || value.includes("blazer")) return "Outerwear";
  if (value.includes("foot") || value.includes("shoe") || value.includes("boot") || value.includes("sneaker")) return "Footwear";
  if (value.includes("access") || value.includes("bag") || value.includes("belt") || value.includes("hat")) return "Accessories";
  return null;
}

function supportsSeason(garmentSeason: string, season: string): boolean {
  const value = garmentSeason.toLowerCase();
  return value === "all season" || value === "all seasons" || value === season.toLowerCase() || (season === "Autumn" && value === "fall");
}

export function createWardrobeInsights(garments: readonly Garment[]): WardrobeInsights {
  const totalItems = garments.length;
  const categoryCounts = Object.fromEntries(trackedCategories.map((category) => [category, garments.filter((garment) => categoryBucket(garment.category) === category).length]));
  const colors = totalItems > 0 ? distribution(garments.map((garment) => garment.color), totalItems).slice(0, 5) : [];
  const styles = totalItems > 0 ? distribution(garments.map((garment) => garment.style), totalItems).slice(0, 4) : [];
  const seasonalCoverage = Object.fromEntries(trackedSeasons.map((season) => [season, garments.filter((garment) => supportsSeason(garment.season, season)).length]));
  const categoryVariety = trackedCategories.filter((category) => categoryCounts[category] > 0).length;
  const seasonVariety = trackedSeasons.filter((season) => seasonalCoverage[season] > 0).length;
  const healthScore = totalItems === 0 ? 0 : Math.min(100, Math.round(35 + Math.min(totalItems * 7, 30) + categoryVariety * 6 + seasonVariety * 3));
  const strongestColor = colors[0]?.label;
  const strongestStyle = styles[0]?.label;
  const recommendation = categoryCounts.Outerwear === 0
    ? "Consider one lightweight outer layer to make more of your existing pieces wearable."
    : categoryCounts.Bottoms === 0
      ? "Adding one versatile pair of trousers would create more complete combinations."
      : seasonVariety < 3
        ? "A piece for another season would make your wardrobe more versatile."
        : "Your wardrobe has a balanced foundation. Prioritize pieces that work across more than one season.";
  const observation = strongestColor
    ? `Your wardrobe leans toward ${strongestColor.toLowerCase()} tones${strongestStyle ? ` with a ${strongestStyle.toLowerCase()} point of view` : ""}.`
    : "Save your first analyzed garment to reveal your wardrobe profile.";

  return { totalItems, categoryCounts, colors, styles, seasonalCoverage, healthScore, recommendation, observation };
}
