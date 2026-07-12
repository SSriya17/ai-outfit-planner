import type { Settings } from "../types/settings";
import { readStorage, writeStorage } from "./storageClient";

const key = "wardrobe-ai.settings";
const fallback: Settings = { temperatureUnit: "celsius", notificationsEnabled: true, theme: "system", climate: "Temperate" };

export const settingsStorage = {
  get: (): Settings => ({ ...fallback, ...readStorage<Partial<Settings>>(key, {}) }),
  set: (value: Settings): void => writeStorage(key, value),
};
