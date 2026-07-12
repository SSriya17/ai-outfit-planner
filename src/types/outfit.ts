import type { ImageAsset } from "../data/mockData";
export interface OutfitGarment {
  readonly itemId: string;
  readonly image: ImageAsset | null;
  readonly position: number;
  readonly reasonForInclusion: string;
  readonly confidence: number;
  readonly canReplace: boolean;
  readonly replacementHistory: readonly ReplacementRecord[];
}
export interface ReplacementRecord { readonly replacedAt: string; readonly previousItemId: string; readonly replacementItemId: string; readonly reason: string; }
export interface SavedOutfit { readonly id: string; readonly title: string; readonly coverImage: ImageAsset | null; readonly thumbnailImage: ImageAsset | null; readonly garments: readonly OutfitGarment[]; readonly occasion: string; readonly style: string; readonly createdAt: string; readonly lastViewedAt: string | null; readonly isFavorite: boolean; readonly deletedAt: string | null; readonly generatedFrom: string; readonly generatorVersion: string; }
export type Outfit = SavedOutfit;
