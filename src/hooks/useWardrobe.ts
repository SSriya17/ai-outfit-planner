import { useCallback, useEffect, useMemo, useState } from "react";

import type { VisionReadyImage } from "../services/imagePicker";
import type { VisionAnalysis } from "../services/visionService";
import { getSavedGarments, saveGarment, type SavedGarment } from "../services/wardrobeStorage";

interface UseWardrobeResult {
  readonly savedGarments: readonly SavedGarment[];
  readonly isSaving: boolean;
  readonly errorMessage: string | null;
  readonly isCurrentGarmentSaved: boolean;
  readonly saveCurrentGarment: () => void;
}

export function useWardrobe(
  image: VisionReadyImage | null,
  analysis: VisionAnalysis | null,
): UseWardrobeResult {
  const [savedGarments, setSavedGarments] = useState<readonly SavedGarment[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setSavedGarments(getSavedGarments());
  }, []);

  const isCurrentGarmentSaved = useMemo(
    () => Boolean(image && savedGarments.some((garment) => garment.imageUri === image.uri)),
    [image, savedGarments],
  );

  const saveCurrentGarment = useCallback(() => {
    if (!image || !analysis || isCurrentGarmentSaved) return;

    setErrorMessage(null);
    setIsSaving(true);

    try {
      const garment = saveGarment(image, analysis);
      setSavedGarments((currentGarments) => [garment, ...currentGarments]);
    } catch {
      setErrorMessage("We couldn't save this garment. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }, [analysis, image, isCurrentGarmentSaved]);

  return { savedGarments, isSaving, errorMessage, isCurrentGarmentSaved, saveCurrentGarment };
}
