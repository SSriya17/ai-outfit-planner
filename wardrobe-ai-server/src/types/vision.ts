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

export interface VisionImageInput {
  readonly buffer: Buffer;
  readonly mimeType: string;
}

export class HttpError extends Error {
  public constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export const visionAnalysisJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "category",
    "material",
    "dominantColor",
    "pattern",
    "fit",
    "season",
    "style",
    "confidence",
    "tags",
  ],
  properties: {
    category: { type: "string" },
    material: { type: "string" },
    dominantColor: { type: "string" },
    pattern: { type: "string" },
    fit: { type: "string" },
    season: { type: "string" },
    style: { type: "string" },
    confidence: { type: "number", minimum: 0, maximum: 1 },
    tags: { type: "array", items: { type: "string" } },
  },
} as const;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function parseVisionAnalysis(value: unknown): VisionAnalysis | null {
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
