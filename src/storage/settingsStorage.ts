import type { Settings } from "../types/settings"; import { readStorage, writeStorage } from "./storageClient";
const key = "wardrobe-ai.settings"; const fallback: Settings = { temperatureUnit: "celsius", notificationsEnabled: true, theme: "system" }; export const settingsStorage = { get: (): Settings => readStorage(key, fallback), set: (value: Settings) => writeStorage(key, value) };
