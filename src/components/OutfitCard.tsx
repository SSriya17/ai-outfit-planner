import { Image, StyleSheet, Text, View, type ImageSourcePropType } from "react-native";

import { type ImageAsset } from "../data/mockData";
import { colors, radii, spacing, typography } from "../theme/tokens";

interface OutfitCardProps {
  readonly image: ImageAsset;
  readonly title: string;
  readonly occasion: string;
  readonly date: string;
}

function imageSource(asset: ImageAsset): ImageSourcePropType {
  return { uri: asset.objectPath };
}

export function OutfitCard({ date, image, occasion, title }: OutfitCardProps) {
  return (
    <View accessibilityLabel={`${title}, ${occasion}, worn ${date}`} style={styles.card}>
      <Image accessibilityLabel={image.alt} source={imageSource(image)} style={styles.image} />
      <View style={styles.copy}>
        <Text numberOfLines={1} style={styles.title}>{title}</Text>
        <Text style={styles.detail}>{occasion} · {date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderCurve: "continuous", borderRadius: radii.medium, overflow: "hidden", width: 216 },
  image: { backgroundColor: colors.surfaceMuted, height: 168, width: "100%" },
  copy: { gap: spacing.xs, padding: spacing.md },
  title: { ...typography.bodyBold, color: colors.textPrimary },
  detail: { ...typography.caption, color: colors.textSecondary },
});
