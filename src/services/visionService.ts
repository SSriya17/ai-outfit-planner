import axios from "axios";

import type { VisionReadyImage } from "./imagePicker";

export interface VisionAnalysis {
  readonly category: string;
  readonly material: string;
  readonly dominantColor: string;
  readonly pattern: string;
  readonly fit: string;
  readonly season: string;
  readonly style: string;
  readonly confidence: number;
  readonly tags: readonly string[];
}

class VisionServiceError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "VisionServiceError";
  }
}

type NativeImageFile = Blob & {
  readonly uri: string;
  readonly name: string;
  readonly type: string;
};

export const wardrobeApiUrl = process.env.EXPO_PUBLIC_WARDROBE_API_URL ?? "http://localhost:3001";
const requestTimeout = 30_000;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parseVisionAnalysis(value: unknown): VisionAnalysis | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const record = value as Record<string, unknown>;
  const tags = record.tags;

  if (
    !isNonEmptyString(record.category)
    || !isNonEmptyString(record.material)
    || !isNonEmptyString(record.dominantColor)
    || !isNonEmptyString(record.pattern)
    || !isNonEmptyString(record.fit)
    || !isNonEmptyString(record.season)
    || !isNonEmptyString(record.style)
    || typeof record.confidence !== "number"
    || !Number.isFinite(record.confidence)
    || record.confidence < 0
    || record.confidence > 1
    || !Array.isArray(tags)
    || !tags.every(isNonEmptyString)
  ) {
    return null;
  }

  return {
    category: record.category,
    material: record.material,
    dominantColor: record.dominantColor,
    pattern: record.pattern,
    fit: record.fit,
    season: record.season,
    style: record.style,
    confidence: record.confidence,
    tags,
  };
}

async function createUploadData(image: VisionReadyImage): Promise<FormData> {
  const formData = new FormData();

  const response = await fetch(image.uri);
  const blob = await response.blob();

  formData.append(
    "image",
    blob,
    image.fileName ?? "garment.jpg",
  );

  return formData;
}
function toServiceError(error: unknown): VisionServiceError {
  if (!axios.isAxiosError(error)) return new VisionServiceError("We couldn't analyze that garment. Please try again.");
  if (error.code === "ECONNABORTED") return new VisionServiceError("The analysis timed out. Please try again.");
  if (!error.response) return new VisionServiceError("The analysis service is unavailable. Please check your connection.");

  const data = error.response.data;
  const message = data && typeof data === "object" && "error" in data ? data.error : null;

  return new VisionServiceError(isNonEmptyString(message) ? message : "We couldn't analyze that garment. Please try again.");
}

export async function analyzeGarmentImage(image: VisionReadyImage): Promise<VisionAnalysis> {
  try {
    const response = await axios.post<unknown>(`${wardrobeApiUrl}/analyze`, await createUploadData(image), {
      headers: { Accept: "application/json" },
      timeout: requestTimeout,
    });
    const analysis = parseVisionAnalysis(response.data);

    if (!analysis) throw new VisionServiceError("The analysis service returned an invalid result.");

    return analysis;
  } catch (error) {
    if (error instanceof VisionServiceError) throw error;
    throw toServiceError(error);
  }
}
