import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCloset } from "../../hooks/useCloset";
import type { RootStackParams } from "../../navigation/AppNavigator";
import { colors, radii, shadows, spacing, typography } from "../../theme/tokens";

export function GarmentDetailsScreen() {
  const route = useRoute<RouteProp<RootStackParams, "GarmentDetails">>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { garments, remove, toggleFavorite } = useCloset();
  const garment = garments.find((item) => item.id === route.params.garmentId);
  if (!garment) return <View style={styles.root}><Text style={styles.empty}>Garment not found.</Text></View>;
  const confirm = (): void => Alert.alert("Delete garment", "This cannot be undone.", [{ text: "Cancel", style: "cancel" }, { text: "Delete", style: "destructive", onPress: () => void remove(garment.id).then(() => navigation.goBack()) }]);
  const metadata = [["Category", garment.category], ["Material", garment.material], ["Color", garment.color], ["Season", garment.season], ["Style", garment.style], ["Occasion", garment.occasion]] as const;

  return <ScrollView contentContainerStyle={styles.content} style={styles.root}>
    <Image accessibilityLabel={garment.name} source={{ uri: garment.imageUri }} style={styles.image} />
    <View style={styles.titleRow}><View style={styles.titleCopy}><Text style={styles.title}>{garment.name}</Text><Text style={styles.confidence}>{Math.round(garment.confidence * 100)}% AI confidence</Text></View><Pressable accessibilityRole="button" accessibilityLabel={garment.isFavorite ? "Remove from favorites" : "Favorite garment"} onPress={() => void toggleFavorite(garment.id)} style={styles.favoriteButton}><Text style={styles.favorite}>{garment.isFavorite ? "★" : "☆"}</Text></Pressable></View>
    <View style={styles.summary}><Text style={styles.summaryTitle}>AI Summary</Text><Text style={styles.summaryText}>A {garment.color.toLowerCase()} {garment.material.toLowerCase()} {garment.category.toLowerCase()} with a {garment.fit.toLowerCase()} fit and {garment.pattern.toLowerCase()} finish, suited to {garment.style.toLowerCase()} styling.</Text></View>
    <View style={styles.metadata}>{metadata.map(([label, value]) => <View key={label} style={styles.metadataRow}><Text style={styles.metadataLabel}>{label}</Text><Text style={styles.metadataValue}>{value}</Text></View>)}</View>
    <View style={styles.tags}>{garment.tags.map((tag) => <Text key={tag} style={styles.tag}>{tag}</Text>)}</View>
    <Pressable accessibilityRole="button" onPress={() => navigation.navigate("EditGarment", { garmentId: garment.id })} style={styles.primaryButton}><Text style={styles.primaryButtonText}>Edit Garment</Text></Pressable>
    <Pressable accessibilityRole="button" onPress={confirm} style={styles.deleteButton}><Text style={styles.delete}>Delete Garment</Text></Pressable>
  </ScrollView>;
}

const styles = StyleSheet.create({ root: { backgroundColor: colors.canvas, flex: 1 }, content: { gap: spacing.lg, padding: spacing.lg }, image: { backgroundColor: colors.imagePlaceholder, borderRadius: radii.large, height: 400, width: "100%" }, titleRow: { alignItems: "flex-start", flexDirection: "row", justifyContent: "space-between" }, titleCopy: { flex: 1, gap: spacing.xs }, title: { ...typography.heading, color: colors.textPrimary }, confidence: { ...typography.caption, color: colors.textSecondary }, favoriteButton: { alignItems: "center", backgroundColor: colors.surface, borderRadius: radii.pill, height: 44, justifyContent: "center", width: 44 }, favorite: { color: colors.brand, fontSize: 24 }, summary: { ...shadows.card, backgroundColor: colors.surface, borderRadius: radii.large, gap: spacing.sm, padding: spacing.xl }, summaryTitle: { ...typography.subheading, color: colors.textPrimary }, summaryText: { ...typography.body, color: colors.textSecondary }, metadata: { backgroundColor: colors.surface, borderRadius: radii.large, overflow: "hidden" }, metadataRow: { borderBottomColor: colors.border, borderBottomWidth: 1, flexDirection: "row", justifyContent: "space-between", padding: spacing.lg }, metadataLabel: { ...typography.body, color: colors.textSecondary }, metadataValue: { ...typography.bodyBold, color: colors.textPrimary }, tags: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }, tag: { ...typography.caption, backgroundColor: colors.surfaceMuted, borderRadius: radii.pill, color: colors.textSecondary, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }, primaryButton: { alignItems: "center", backgroundColor: colors.brand, borderRadius: radii.medium, minHeight: 52, justifyContent: "center" }, primaryButtonText: { ...typography.bodyBold, color: colors.brandForeground }, deleteButton: { alignItems: "center", minHeight: 44, justifyContent: "center" }, delete: { ...typography.bodyBold, color: colors.textSecondary }, empty: { ...typography.body, color: colors.textSecondary, padding: spacing.xl } });
