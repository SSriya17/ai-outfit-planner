import { settingsStorage } from "../storage/settingsStorage"; import type { Settings } from "../types/settings";
export interface SettingsRepository { get(): Promise<Settings>; save(value: Settings): Promise<void>; }
export const localSettingsRepository: SettingsRepository = { async get() { return settingsStorage.get(); }, async save(value) { settingsStorage.set(value); } };
