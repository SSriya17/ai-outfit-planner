import { useCallback, useState } from "react";
import { ActionSheetIOS, Alert } from "react-native";

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

  const openImagePicker = useCallback(() => {
    const chooseSource = (source: ImagePickerSource) => void selectImage(source);

    if (process.env.EXPO_OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        { options: ["Camera", "Photo Library", "Cancel"], cancelButtonIndex: 2 },
        (selectedIndex) => {
          if (selectedIndex === 0) chooseSource("camera");
          if (selectedIndex === 1) chooseSource("library");
        },
      );
      return;
    }

    Alert.alert("Capture Garment", "Choose an image source.", [
      { text: "Camera", onPress: () => chooseSource("camera") },
      { text: "Photo Library", onPress: () => chooseSource("library") },
      { text: "Cancel", style: "cancel" },
    ]);
  }, [selectImage]);

  return { selectedImage, isLoading, errorMessage, openImagePicker };
}
