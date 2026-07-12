import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import type { VisionAnalysis } from "../services/visionService";
import { colors, radii, shadows, spacing, typography } from "../theme/tokens";

interface AnalysisCardProps {
  readonly imageUri: string;
  readonly analysis: VisionAnalysis | null;
  readonly isLoading: boolean;
  readonly errorMessage: string | null;
  readonly isSaving: boolean;
  readonly isSaved: boolean;
  readonly onSave: () => void;
}

export function AnalysisCard({ analysis, errorMessage, imageUri, isLoading, isSaved, isSaving, onSave }: AnalysisCardProps) {
  return (
    <View style={[styles.card, shadows.card]}>
      <Image accessibilityLabel="Selected garment" source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.eyebrow}>AI ANALYSIS</Text>
        {isLoading ? (
          <View accessibilityLabel="Analyzing garment" style={styles.skeletons}>
            <View style={styles.skeletonTitle} />
            <View style={styles.skeletonLine} />
            <View style={styles.skeletonLineShort} />
          </View>
        ) : null}
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        {analysis ? (
          <>
            <Text style={styles.category}>{analysis.category}</Text>
            <Text style={styles.detail}>{analysis.material} · {analysis.dominantColor} · {analysis.pattern}</Text>
            <Text style={styles.detail}>{analysis.fit} fit · {analysis.season} · {analysis.style}</Text>
            <Text style={styles.explanation}>A considered piece with an easy-to-style silhouette and a refined neutral palette.</Text>
            <View style={styles.tags}>
              {analysis.tags.map((tag) => <Text key={tag} style={styles.tag}>{tag}</Text>)}
            </View>
            <Text style={styles.confidence}>{Math.round(analysis.confidence * 100)}% confidence</Text>
            <Pressable accessibilityLabel="Save garment to wardrobe" accessibilityState={{ disabled: isSaved || isSaving }} disabled={isSaved || isSaving} onPress={onSave} style={[styles.saveButton, isSaved ? styles.saveButtonSaved : null]}>
              <Text style={[styles.saveButtonText, isSaved ? styles.saveButtonTextSaved : null]}>{isSaved ? "Saved to Wardrobe" : isSaving ? "Saving…" : "Save to Wardrobe"}</Text>
            </Pressable>
          </>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderCurve: "continuous", borderRadius: radii.large, overflow: "hidden" },
  image: { backgroundColor: colors.imagePlaceholder, height: 280, width: "100%" },
  content: { gap: spacing.md, padding: spacing.xl },
  eyebrow: { ...typography.eyebrow, color: colors.textSecondary },
  category: { ...typography.heading, color: colors.textPrimary },
  detail: { ...typography.body, color: colors.textSecondary },
  explanation: { ...typography.body, color: colors.textPrimary },
  confidence: { ...typography.caption, color: colors.textTertiary },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  tag: { ...typography.caption, backgroundColor: colors.surfaceMuted, borderCurve: "continuous", borderRadius: radii.pill, color: colors.textSecondary, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  saveButton: { alignItems: "center", backgroundColor: colors.brand, borderCurve: "continuous", borderRadius: radii.medium, minHeight: 52, justifyContent: "center", paddingHorizontal: spacing.lg },
  saveButtonSaved: { backgroundColor: colors.surfaceMuted },
  saveButtonText: { ...typography.bodyBold, color: colors.brandForeground },
  saveButtonTextSaved: { color: colors.textPrimary },
  skeletons: { gap: spacing.sm },
  skeletonTitle: { backgroundColor: colors.surfaceMuted, borderCurve: "continuous", borderRadius: radii.small, height: 28, width: "52%" },
  skeletonLine: { backgroundColor: colors.surfaceMuted, borderCurve: "continuous", borderRadius: radii.small, height: 16, width: "100%" },
  skeletonLineShort: { backgroundColor: colors.surfaceMuted, borderCurve: "continuous", borderRadius: radii.small, height: 16, width: "72%" },
  error: { ...typography.body, color: colors.textSecondary },
});
