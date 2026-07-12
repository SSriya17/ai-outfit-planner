import { useCallback, useState } from "react";

import {
  type ImagePickerSource,
  type VisionReadyImage,
  prepareImageForVision,
  selectLocalImage,
} from "../services/imagePicker";

interface UseImagePickerResult {
  readonly selectedImage: VisionReadyImage | null;
  readonly isLoading: boolean;
  readonly errorMessage: string | null;
  readonly openImagePicker: () => void;
}

const unexpectedErrorMessage = "We couldn't prepare that image. Please try again.";

export function useImagePicker(): UseImagePickerResult {
  const [selectedImage, setSelectedImage] = useState<VisionReadyImage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectImage = useCallback(async (source: ImagePickerSource) => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const result = await selectLocalImage(source);

      if (result.status === "selected") {
        setSelectedImage(await prepareImageForVision(result.asset));
      }

      if (result.status === "permission-denied") {
        setErrorMessage(result.message);
      }
    } catch {
      setErrorMessage(unexpectedErrorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // TEMPORARY WEB FIX
  // Opens browser photo picker directly
  const openImagePicker = useCallback(() => {
    void selectImage("library");
  }, [selectImage]);

  return {
    selectedImage,
    isLoading,
    errorMessage,
    openImagePicker,
  };
}