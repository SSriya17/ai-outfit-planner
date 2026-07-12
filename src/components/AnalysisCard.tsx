import { BadgeCheck, Palette, Ruler, Shirt, SunMedium } from "lucide-react-native";
import { type ReactNode } from "react";
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
  readonly onRetry: () => void;
}

export function AnalysisCard({ analysis, errorMessage, imageUri, isLoading, isSaved, isSaving, onRetry, onSave }: AnalysisCardProps) {
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
        {errorMessage ? <><Text style={styles.error}>{errorMessage}</Text><Pressable onPress={onRetry} style={styles.retry}><Text style={styles.retryText}>Retry Analysis</Text></Pressable></> : null}
        {analysis ? (
          <>
            <Text style={styles.category}>{analysis.category}</Text>
            <View style={styles.metadataGrid}>
              <AnalysisDetail icon={<Shirt color={colors.textSecondary} size={16} />} label="Material" value={analysis.material} />
              <AnalysisDetail icon={<Palette color={colors.textSecondary} size={16} />} label="Color" value={analysis.dominantColor} />
              <AnalysisDetail icon={<SunMedium color={colors.textSecondary} size={16} />} label="Season" value={analysis.season} />
              <AnalysisDetail icon={<Ruler color={colors.textSecondary} size={16} />} label="Fit" value={analysis.fit} />
              <AnalysisDetail icon={<BadgeCheck color={colors.textSecondary} size={16} />} label="Style" value={analysis.style} />
              <AnalysisDetail icon={<BadgeCheck color={colors.textSecondary} size={16} />} label="Confidence" value={`${Math.round(analysis.confidence * 100)}%`} />
            </View>
            <View style={styles.tags}>
              {analysis.tags.map((tag) => <Text key={tag} style={styles.tag}>{tag}</Text>)}
            </View>
            <Pressable accessibilityLabel="Save garment to wardrobe" accessibilityState={{ disabled: isSaved || isSaving }} disabled={isSaved || isSaving} onPress={onSave} style={[styles.saveButton, isSaved ? styles.saveButtonSaved : null]}>
              <Text style={[styles.saveButtonText, isSaved ? styles.saveButtonTextSaved : null]}>{isSaved ? "Saved to Wardrobe" : isSaving ? "Saving…" : "Save to Wardrobe"}</Text>
            </Pressable>
          </>
        ) : null}
      </View>
    </View>
  );
}

function AnalysisDetail({ icon, label, value }: { readonly icon: ReactNode; readonly label: string; readonly value: string }) {
  return <View style={styles.metadataItem}><View style={styles.metadataLabel}><View>{icon}</View><Text style={styles.metadataLabelText}>{label}</Text></View><Text numberOfLines={1} style={styles.metadataValue}>{value}</Text></View>;
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderCurve: "continuous", borderRadius: radii.large, overflow: "hidden" },
  image: { backgroundColor: colors.imagePlaceholder, height: 280, width: "100%" },
  content: { gap: spacing.md, padding: spacing.xl },
  eyebrow: { ...typography.eyebrow, color: colors.textSecondary },
  category: { ...typography.heading, color: colors.textPrimary },
  metadataGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  metadataItem: { backgroundColor: colors.surfaceMuted, borderRadius: radii.small, flexGrow: 1, gap: spacing.xs, minWidth: "46%", padding: spacing.md },
  metadataLabel: { alignItems: "center", flexDirection: "row", gap: spacing.xs },
  metadataLabelText: { ...typography.caption, color: colors.textSecondary },
  metadataValue: { ...typography.bodyBold, color: colors.textPrimary },
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
  retry: { alignItems: "center", borderColor: colors.border, borderRadius: radii.medium, borderWidth: 1, minHeight: 44, justifyContent: "center" },
  retryText: { ...typography.bodyBold, color: colors.textPrimary },
});
