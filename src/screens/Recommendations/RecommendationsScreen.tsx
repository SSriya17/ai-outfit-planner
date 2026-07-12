import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useCloset } from "../../hooks/useCloset";
import { generateOutfitRecommendation, type GeneratedRecommendation } from "../../services/recommendationService";
import { colors, radii, spacing, typography } from "../../theme/tokens";

export function RecommendationsScreen() {
  const { garments } = useCloset();
  const [recommendation, setRecommendation] = useState<GeneratedRecommendation | null>(null);
  const generate = () => setRecommendation(generateOutfitRecommendation(garments));

  return <View style={styles.root}><Text style={styles.title}>Recommendations</Text><Text style={styles.copy}>A considered look, built from your wardrobe.</Text><Pressable onPress={generate} style={styles.button}><Text style={styles.buttonText}>Generate Outfit</Text></Pressable>{recommendation ? <View style={styles.card}><Text style={styles.cardTitle}>{recommendation.title}</Text><Text style={styles.reason}>{recommendation.rationale[0]}</Text><Text style={styles.reason}>{recommendation.rationale[1]}</Text><Text style={styles.confidence}>{Math.round(recommendation.confidence * 100)}% match</Text></View> : <Text style={styles.empty}>{garments.length === 0 ? "Save a garment to generate your first outfit." : "Generate a look from your saved garments."}</Text>}</View>;
}

const styles = StyleSheet.create({ root: { flex: 1, backgroundColor: colors.canvas, gap: spacing.lg, padding: spacing.xl }, title: { ...typography.display, color: colors.textPrimary }, copy: { ...typography.body, color: colors.textSecondary }, button: { alignItems: "center", backgroundColor: colors.brand, borderRadius: radii.medium, minHeight: 52, justifyContent: "center" }, buttonText: { ...typography.bodyBold, color: colors.brandForeground }, card: { backgroundColor: colors.surface, borderRadius: radii.large, gap: spacing.md, padding: spacing.xl }, cardTitle: { ...typography.subheading, color: colors.textPrimary }, reason: { ...typography.body, color: colors.textSecondary }, confidence: { ...typography.caption, color: colors.textTertiary }, empty: { ...typography.body, color: colors.textSecondary } });
