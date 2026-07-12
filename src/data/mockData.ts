export type WardrobeCategory =
  | "Outerwear"
  | "Knitwear"
  | "Tops"
  | "Bottoms"
  | "Footwear"
  | "Accessories";

export type Season = "Spring" | "Summer" | "Autumn" | "Winter" | "All season";

export type Style =
  | "Minimal"
  | "Tailored"
  | "Casual"
  | "Contemporary"
  | "Smart casual";

export type Occasion =
  | "Work"
  | "Weekend"
  | "Dinner"
  | "Travel"
  | "Everyday";

export type StorageAccess = "private" | "public";
export type ImageContentType = "image/jpeg" | "image/png" | "image/webp";
export type TemperatureUnit = "celsius" | "fahrenheit";
export type WeatherCondition = "Clear" | "Cloudy" | "Rain" | "Snow" | "Wind";

/** A persistent object reference; resolved URLs are deliberately owned by the data source. */
export interface ImageAsset {
  readonly id: string;
  readonly provider: "supabase-storage";
  readonly bucket: "wardrobe-assets";
  readonly objectPath: string;
  readonly access: StorageAccess;
  readonly contentType: ImageContentType;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

/** The temperature interval in which an item or outfit is expected to be comfortable. */
export interface TemperatureRange {
  readonly minimum: number;
  readonly maximum: number;
  readonly unit: TemperatureUnit;
}

/** Immutable output stored from an OpenAI Vision classification run. */
export interface VisionMetadata {
  readonly model: string;
  readonly analyzedAt: string;
  readonly dominantColor: string;
  readonly material: string;
  readonly fit: string;
  readonly pattern: string;
  readonly confidence: number;
  readonly tags: readonly string[];
  readonly detectedCategory: WardrobeCategory;
}

/** Component scores allow recommendation explanations without coupling to a scoring engine. */
export interface RecommendationScore {
  readonly overall: number;
  readonly styleMatch: number;
  readonly weatherMatch: number;
  readonly occasionMatch: number;
  readonly wardrobeNovelty: number;
}

/** A normalized weather snapshot captured when a recommendation was created. */
export interface WeatherContext {
  readonly provider: "weather-api";
  readonly observedAt: string;
  readonly locationName: string;
  readonly condition: WeatherCondition;
  readonly temperature: number;
  readonly temperatureUnit: TemperatureUnit;
  readonly feelsLike: number;
}

export interface OutfitReference {
  readonly itemId: WardrobeItem["id"];
  readonly position: number;
}

export interface WardrobeItem {
  readonly id: string;
  readonly userId: string;
  readonly name: string;
  readonly category: WardrobeCategory;
  readonly color: string;
  readonly season: Season;
  readonly style: Style;
  readonly occasion: Occasion;
  readonly temperatureRange: TemperatureRange;
  readonly isFavorite: boolean;
  readonly image: ImageAsset;
  readonly vision: VisionMetadata;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface Outfit {
  readonly id: string;
  readonly userId: string;
  readonly title: string;
  readonly occasion: Occasion;
  readonly style: Style;
  readonly season: Season;
  readonly temperatureRange: TemperatureRange;
  readonly isFavorite: boolean;
  readonly wornOn: string;
  readonly itemReferences: readonly OutfitReference[];
  readonly coverImage: ImageAsset;
  readonly createdAt: string;
}

export interface RecommendationMetadata {
  readonly generatedAt: string;
  readonly engineVersion: string;
  readonly weather: WeatherContext;
  readonly score: RecommendationScore;
  readonly rationale: readonly string[];
}

export interface TodayRecommendation {
  readonly id: string;
  readonly userId: string;
  readonly title: string;
  readonly occasion: Occasion;
  readonly style: Style;
  readonly itemReferences: readonly OutfitReference[];
  readonly coverImage: ImageAsset;
  readonly metadata: RecommendationMetadata;
}

/** The stable UI-facing contract a Supabase repository will eventually return. */
export interface WardrobeHomeData {
  readonly wardrobeItems: readonly WardrobeItem[];
  readonly todayRecommendation: TodayRecommendation;
  readonly recentOutfits: readonly Outfit[];
}

const userId = "usr_01J9V2PEB1H6K3T8M4Q7R5W9CN";
const createdAt = "2026-07-01T14:30:00.000Z";
const analyzedAt = "2026-07-01T14:31:12.000Z";

const wardrobeItems = [
  {
    id: "wrd_01J9V3T59R7SWQH1Y2P7A8M6K4",
    userId,
    name: "Charcoal Wool Blazer",
    category: "Outerwear",
    color: "Charcoal",
    season: "All season",
    style: "Tailored",
    occasion: "Work",
    temperatureRange: { minimum: 10, maximum: 22, unit: "celsius" },
    isFavorite: true,
    image: {
      id: "ast_01J9V3TXRB7M4H2N8K6Q1W5YCD",
      provider: "supabase-storage",
      bucket: "wardrobe-assets",
      objectPath: `${userId}/items/wrd_01J9V3T59R7SWQH1Y2P7A8M6K4/front.webp`,
      access: "private",
      contentType: "image/webp",
      width: 1200,
      height: 1600,
      alt: "Charcoal wool blazer",
    },
    vision: {
      model: "gpt-4.1-mini",
      analyzedAt,
      dominantColor: "Charcoal",
      material: "Wool",
      fit: "Relaxed",
      pattern: "Solid",
      confidence: 0.97,
      tags: ["blazer", "wool", "tailored", "layering"],
      detectedCategory: "Outerwear",
    },
    createdAt,
    updatedAt: "2026-07-04T09:15:00.000Z",
  },
  {
    id: "wrd_01J9V3XNH8B2DF6K4S7M1Q9R5T",
    userId,
    name: "Stone Pleated Trousers",
    category: "Bottoms",
    color: "Stone",
    season: "All season",
    style: "Contemporary",
    occasion: "Work",
    temperatureRange: { minimum: 12, maximum: 27, unit: "celsius" },
    isFavorite: true,
    image: {
      id: "ast_01J9V3YV9K5T2C7M1R8H4Q6WNB",
      provider: "supabase-storage",
      bucket: "wardrobe-assets",
      objectPath: `${userId}/items/wrd_01J9V3XNH8B2DF6K4S7M1Q9R5T/front.webp`,
      access: "private",
      contentType: "image/webp",
      width: 1200,
      height: 1600,
      alt: "Stone pleated trousers",
    },
    vision: {
      model: "gpt-4.1-mini",
      analyzedAt,
      dominantColor: "Stone",
      material: "Cotton twill",
      fit: "Wide leg",
      pattern: "Solid",
      confidence: 0.95,
      tags: ["trousers", "pleated", "tailored", "wide-leg"],
      detectedCategory: "Bottoms",
    },
    createdAt,
    updatedAt: "2026-07-05T11:42:00.000Z",
  },
] as const satisfies readonly WardrobeItem[];

const recommendationImage: ImageAsset = {
  id: "ast_01J9V463X4K8N2H6R5M1Q7T9WC",
  provider: "supabase-storage",
  bucket: "wardrobe-assets",
  objectPath: `${userId}/recommendations/rec_01J9V46MW2K5N8R1H4C7T9Y3PQ/cover.webp`,
  access: "private",
  contentType: "image/webp",
  width: 1200,
  height: 1600,
  alt: "Charcoal blazer and stone trousers outfit",
};

const todayRecommendation = {
  id: "rec_01J9V46MW2K5N8R1H4C7T9Y3PQ",
  userId,
  title: "Quiet confidence for today",
  occasion: "Work",
  style: "Tailored",
  itemReferences: [
    { itemId: wardrobeItems[0].id, position: 1 },
    { itemId: wardrobeItems[1].id, position: 2 },
  ],
  coverImage: recommendationImage,
  metadata: {
    generatedAt: "2026-07-11T14:00:00.000Z",
    engineVersion: "wardrobe-ranking-v1",
    weather: {
      provider: "weather-api",
      observedAt: "2026-07-11T13:55:00.000Z",
      locationName: "San Francisco, CA",
      condition: "Cloudy",
      temperature: 17,
      temperatureUnit: "celsius",
      feelsLike: 16,
    },
    score: {
      overall: 0.94,
      styleMatch: 0.96,
      weatherMatch: 0.93,
      occasionMatch: 0.98,
      wardrobeNovelty: 0.79,
    },
    rationale: [
      "The temperature sits within the outfit's comfort range.",
      "The tailored silhouette matches your work preference.",
    ],
  },
} as const satisfies TodayRecommendation;

const recentOutfits = [
  {
    id: "out_01J9V49B7D2S6K8M4Q1R5T9YHC",
    userId,
    title: "Studio meeting",
    occasion: "Work",
    style: "Contemporary",
    season: "Autumn",
    temperatureRange: { minimum: 12, maximum: 22, unit: "celsius" },
    isFavorite: true,
    wornOn: "2026-07-10",
    itemReferences: [
      { itemId: wardrobeItems[0].id, position: 1 },
      { itemId: wardrobeItems[1].id, position: 2 },
    ],
    coverImage: recommendationImage,
    createdAt: "2026-07-10T08:10:00.000Z",
  },
] as const satisfies readonly Outfit[];

export const homeMockData: WardrobeHomeData = {
  wardrobeItems,
  todayRecommendation,
  recentOutfits,
};

export { wardrobeItems, todayRecommendation, recentOutfits };
