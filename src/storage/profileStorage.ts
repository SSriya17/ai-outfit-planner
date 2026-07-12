import type { Profile } from "../types/profile"; import { readStorage, writeStorage } from "./storageClient";
const key = "wardrobe-ai.profile"; const fallback: Profile = { displayName: "WardrobeAI", analysesCompleted: 0, recommendationsGenerated: 0 }; export const profileStorage = { get: (): Profile => readStorage(key, fallback), set: (value: Profile) => writeStorage(key, value) };
