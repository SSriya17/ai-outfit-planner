import type {
  Occasion,
  Season,
  Style,
  WardrobeCategory,
  WardrobeItem,
} from "../../data/mockData";
import type { Garment } from "../../types/wardrobe";

const categories: readonly WardrobeCategory[] = ["Outerwear", "Knitwear", "Tops", "Bottoms", "Footwear", "Accessories"];
const seasons: readonly Season[] = ["Spring", "Summer", "Autumn", "Winter", "All season"];
const styles: readonly Style[] = ["Minimal", "Tailored", "Casual", "Contemporary", "Smart casual"];

function category(value: string): WardrobeCategory {
  return categories.includes(value as WardrobeCategory) ? value as WardrobeCategory : "Tops";
}

function season(value: string): Season {
  return seasons.includes(value as Season) ? value as Season : "All season";
}

function style(value: string): Style {
  return styles.includes(value as Style) ? value as Style : "Minimal";
}

export function garmentToWardrobeItem(garment: Garment): WardrobeItem {
  const now = new Date().toISOString();

  return {
    id: garment.id,
    userId: "local-user",
    name: garment.name,
    category: category(garment.category),
    color: garment.color,
    season: season(garment.season),
    style: style(garment.style),
    occasion: garment.occasion as Occasion,
    temperatureRange: { minimum: 10, maximum: 25, unit: "celsius" },
    isFavorite: garment.isFavorite,
    image: {
      id: `local_${garment.id}`,
      provider: "supabase-storage",
      bucket: "wardrobe-assets",
      objectPath: garment.imageUri,
      access: "private",
      contentType: "image/jpeg",
      width: 0,
      height: 0,
      alt: garment.name,
    },
    vision: {
      model: "local-compat",
      analyzedAt: now,
      dominantColor: garment.color,
      material: garment.material,
      fit: garment.fit,
      pattern: garment.pattern,
      confidence: garment.confidence,
      tags: garment.tags,
      detectedCategory: category(garment.category),
    },
    createdAt: now,
    updatedAt: now,
  };
}
