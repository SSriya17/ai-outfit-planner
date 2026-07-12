import type { Outfit } from "../types/outfit"; import { readStorage, writeStorage } from "./storageClient";
const key = "wardrobe-ai.outfits"; export const outfitStorage = { get: (): readonly Outfit[] => readStorage(key, []), set: (items: readonly Outfit[]) => writeStorage(key, items) };
