import { useEffect, useState } from "react"; import { localSettingsRepository } from "../repositories/SettingsRepository"; import type { Settings } from "../types/settings";
export function useSettings(): Settings | null { const [settings, setSettings] = useState<Settings | null>(null); useEffect(() => { void localSettingsRepository.get().then(setSettings); }, []); return settings; }
