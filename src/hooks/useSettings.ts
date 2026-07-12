import { useCallback, useEffect, useState } from "react";
import { localSettingsRepository } from "../repositories/SettingsRepository";
import type { Settings } from "../types/settings";

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    void localSettingsRepository.get().then(setSettings);
  }, []);

  const save = useCallback(async (value: Settings): Promise<void> => {
    await localSettingsRepository.save(value);
    setSettings(value);
  }, []);

  return { settings, save };
}
