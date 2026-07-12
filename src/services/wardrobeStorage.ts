import "expo-sqlite/localStorage/install";

import type { VisionReadyImage } from "./imagePicker";
import type { VisionAnalysis } from "./visionService";

export interface SavedGarment {
  readonly id: string;
  readonly imageUri: string;
  readonly category: string;
  readonly material: string;
  readonly dominantColor: string;
  readonly pattern: string;
  readonly fit: string;
  readonly season: string;
  readonly style: string;
  readonly confidence: number;
  readonly tags: readonly string[];
  readonly savedAt: string;
}

const storageKey = "wardrobe-ai.saved-garments";

function isSavedGarment(value: unknown): value is SavedGarment {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;

  const record = value as Record<string, unknown>;
  return typeof record.id === "string"
    && typeof record.imageUri === "string"
    && typeof record.category === "string"
    && typeof record.material === "string"
    && typeof record.dominantColor === "string"
    && typeof record.pattern === "string"
    && typeof record.fit === "string"
    && typeof record.season === "string"
    && typeof record.style === "string"
    && typeof record.confidence === "number"
    && Array.isArray(record.tags)
    && record.tags.every((tag) => typeof tag === "string")
    && typeof record.savedAt === "string";
}

export function getSavedGarments(): readonly SavedGarment[] {
  const storedValue = localStorage.getItem(storageKey);

  if (!storedValue) return [];

  try {
    const parsedValue: unknown = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? parsedValue.filter(isSavedGarment) : [];
  } catch {
    return [];
  }
}

export function saveGarment(image: VisionReadyImage, analysis: VisionAnalysis): SavedGarment {
  const garment: SavedGarment = {
    id: `garment_${Date.now()}`,
    imageUri: image.uri,
    category: analysis.category,
    material: analysis.material,
    dominantColor: analysis.dominantColor,
    pattern: analysis.pattern,
    fit: analysis.fit,
    season: analysis.season,
    style: analysis.style,
    confidence: analysis.confidence,
    tags: analysis.tags,
    savedAt: new Date().toISOString(),
  };
  const garments = [garment, ...getSavedGarments()];

  localStorage.setItem(storageKey, JSON.stringify(garments));
  return garment;
}
