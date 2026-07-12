import * as ImagePicker from "expo-image-picker";

export type ImagePickerSource = "camera" | "library";

export interface LocalImageAsset {
  readonly uri: string;
  readonly fileName: string | null;
  readonly mimeType: string | null;
  readonly fileSize: number | null;
  readonly width: number;
  readonly height: number;
}

export interface VisionReadyImage {
  readonly uri: string;
  readonly fileName: string | null;
  readonly mimeType: string | null;
  readonly width: number;
  readonly height: number;
}

export type ImageSelectionResult =
  | { readonly status: "selected"; readonly asset: LocalImageAsset }
  | { readonly status: "cancelled" }
  | { readonly status: "permission-denied"; readonly message: string };

const pickerOptions: ImagePicker.ImagePickerOptions = {
  allowsEditing: true,
  aspect: [3, 4],
  mediaTypes: ["images"],
  quality: 0.9,
};

function toLocalImageAsset(asset: ImagePicker.ImagePickerAsset): LocalImageAsset {
  return {
    uri: asset.uri,
    fileName: asset.fileName ?? null,
    mimeType: asset.mimeType ?? null,
    fileSize: asset.fileSize ?? null,
    width: asset.width,
    height: asset.height,
  };
}

async function requestPermission(source: ImagePickerSource): Promise<boolean> {
  const result = source === "camera"
    ? await ImagePicker.requestCameraPermissionsAsync()
    : await ImagePicker.requestMediaLibraryPermissionsAsync();

  return result.granted;
}

export async function selectLocalImage(source: ImagePickerSource): Promise<ImageSelectionResult> {
  const permissionGranted = await requestPermission(source);

  if (!permissionGranted) {
    return {
      status: "permission-denied",
      message: source === "camera" ? "Camera access is needed to capture a garment." : "Photo library access is needed to select a garment.",
    };
  }

  const result = source === "camera"
    ? await ImagePicker.launchCameraAsync(pickerOptions)
    : await ImagePicker.launchImageLibraryAsync(pickerOptions);

  if (result.canceled || !result.assets[0]) {
    return { status: "cancelled" };
  }

  return { status: "selected", asset: toLocalImageAsset(result.assets[0]) };
}

/** Normalizes the local selection into the payload shape a future Vision service will consume. */
export async function prepareImageForVision(asset: LocalImageAsset): Promise<VisionReadyImage> {
  return {
    uri: asset.uri,
    fileName: asset.fileName,
    mimeType: asset.mimeType,
    width: asset.width,
    height: asset.height,
  };
}
