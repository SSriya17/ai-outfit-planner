import { Image, StyleSheet, Text, View } from "react-native";

import { colors, radii, spacing, typography } from "../theme/tokens";

interface WardrobeCardProps {
  readonly imageUri: string;
  readonly name: string;
  readonly material: string;
  readonly color: string;
}

export function WardrobeCard({ color, imageUri, material, name }: WardrobeCardProps) {
  return (
    <View accessibilityLabel={`${name}, ${color}, ${material}`} style={styles.card}>
      <Image accessibilityLabel={name} source={{ uri: imageUri }} style={styles.image} />
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
