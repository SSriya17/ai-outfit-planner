import { Image, StyleSheet, Text, View, type ImageSourcePropType } from "react-native";

import { type ImageAsset } from "../data/mockData";
import { colors, radii, spacing, typography } from "../theme/tokens";

interface WardrobeCardProps {
  readonly image: ImageAsset | { readonly uri: string };
  readonly name: string;
  readonly material: string;
  readonly color: string;
}

function imageSource(asset: WardrobeCardProps["image"]): ImageSourcePropType {
  return { uri: "objectPath" in asset ? asset.objectPath : asset.uri };
}

export function WardrobeCard({ color, image, material, name }: WardrobeCardProps) {
  return (
    <View accessibilityLabel={`${name}, ${color}, ${material}`} style={styles.card}>
      <Image accessibilityLabel={"alt" in image ? image.alt : name} source={imageSource(image)} style={styles.image} />
      <Text numberOfLines={1} style={styles.title}>{name}</Text>
      <Text style={styles.detail}>{color} · {material}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { gap: spacing.sm, width: 164 },
  image: { backgroundColor: colors.imagePlaceholder, borderCurve: "continuous", borderRadius: radii.medium, height: 212, width: "100%" },
  title: { ...typography.bodyBold, color: colors.textPrimary },
  detail: { ...typography.caption, color: colors.textSecondary },
});
