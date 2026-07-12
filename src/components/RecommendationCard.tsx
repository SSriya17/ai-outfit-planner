import { Image, Pressable, StyleSheet, Text, View, type ImageSourcePropType } from "react-native";

import { type ImageAsset } from "../data/mockData";
import { colors, radii, shadows, spacing, typography } from "../theme/tokens";

interface RecommendationCardProps {
  readonly image: ImageAsset;
  readonly title: string;
  readonly rationale: readonly string[];
  readonly confidence: number;
  readonly onPress?: () => void;
}

function imageSource(asset: ImageAsset): ImageSourcePropType {
  return { uri: asset.objectPath };
}

export function RecommendationCard({ confidence, image, onPress, rationale, title }: RecommendationCardProps) {
  return (
    <Pressable accessibilityLabel={`View recommendation: ${title}`} onPress={onPress} style={styles.card}>
      <Image accessibilityLabel={image.alt} source={imageSource(image)} style={styles.image} />
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.reason}>{rationale[0]}</Text>
        <Text style={styles.confidence}>{Math.round(confidence * 100)}% considered match</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderCurve: "continuous", borderRadius: radii.large, overflow: "hidden", ...shadows.card },
  image: { backgroundColor: colors.surfaceMuted, height: 224, width: "100%" },
  copy: { gap: spacing.md, padding: spacing.xl },
  title: { ...typography.heading, color: colors.textPrimary },
  reason: { ...typography.body, color: colors.textSecondary },
  confidence: { ...typography.caption, color: colors.textTertiary },
});
