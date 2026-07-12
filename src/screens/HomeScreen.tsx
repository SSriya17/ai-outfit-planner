import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { EditorialEntrance } from "../components/EditorialEntrance";
import { Header } from "../components/Header";
import { AnalysisCard } from "../components/AnalysisCard";
import { UploadCard } from "../components/UploadCard";
import { WardrobeCard } from "../components/WardrobeCard";
import { useImagePicker } from "../hooks/useImagePicker";
import { useVisionAnalysis } from "../hooks/useVisionAnalysis";
import { useWardrobe } from "../hooks/useWardrobe";
import type { TabParams } from "../navigation/AppNavigator";
import { colors, radii, shadows, spacing, typography } from "../theme/tokens";

export function HomeScreen() {
  const { errorMessage, isLoading, openImagePicker, selectedImage } = useImagePicker();
  const { analysis, errorMessage: analysisErrorMessage, isAnalyzing, retry } = useVisionAnalysis(selectedImage);
  const { errorMessage: saveErrorMessage, isCurrentGarmentSaved, isSaving, saveCurrentGarment, savedGarments } = useWardrobe(selectedImage, analysis);
  const navigation = useNavigation<BottomTabNavigationProp<TabParams>>();

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <EditorialEntrance><Header subtitle="A private wardrobe, styled around the life you lead." title="WardrobeAI" /></EditorialEntrance>
        <EditorialEntrance delay={100}><View style={styles.intro}><Text style={styles.introEyebrow}>YOUR PERSONAL STYLIST</Text><Text style={styles.introCopy}>Capture the pieces you own. Let their details shape what you wear next.</Text></View></EditorialEntrance>
        <EditorialEntrance delay={180}><UploadCard errorMessage={errorMessage} imageUri={selectedImage?.uri} isLoading={isLoading || isAnalyzing} onPress={openImagePicker} supportingCopy="Photograph a garment to add it to your edit." title="Capture Garment" /></EditorialEntrance>
        {selectedImage ? <EditorialEntrance delay={80}><AnalysisCard analysis={analysis} errorMessage={analysisErrorMessage ?? saveErrorMessage} imageUri={selectedImage.uri} isLoading={isAnalyzing} isSaved={isCurrentGarmentSaved} isSaving={isSaving} onRetry={retry} onSave={saveCurrentGarment} /></EditorialEntrance> : null}
        {savedGarments.length > 0 ? <EditorialEntrance delay={240}><View style={styles.section}><View style={styles.sectionHeader}><View><Text style={styles.sectionEyebrow}>YOUR EDIT</Text><Text style={styles.sectionTitle}>{savedGarments.length} pieces, ready to style</Text></View><Pressable accessibilityRole="button" onPress={() => navigation.navigate("Closet")}><Text style={styles.link}>View all</Text></Pressable></View><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>{savedGarments.map((garment) => <WardrobeCard color={garment.dominantColor} imageUri={garment.imageUri} key={garment.id} material={garment.material} name={`${garment.dominantColor} ${garment.category}`} />)}</ScrollView></View></EditorialEntrance> : null}
        <EditorialEntrance delay={300}><Pressable accessibilityRole="button" onPress={() => navigation.navigate("Insights")} style={styles.stylePrompt}><Text style={styles.promptEyebrow}>YOUR WARDROBE</Text><Text style={styles.promptTitle}>See the patterns behind the pieces you save.</Text><Text style={styles.promptAction}>View insights →</Text></Pressable></EditorialEntrance>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.canvas },
  content: { gap: spacing.xxl, paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl },
  intro: { borderLeftColor: colors.brand, borderLeftWidth: 2, gap: spacing.sm, paddingLeft: spacing.lg },
  introEyebrow: { ...typography.eyebrow, color: colors.textTertiary },
  introCopy: { ...typography.subheading, color: colors.textPrimary, maxWidth: 330 },
  section: { gap: spacing.lg },
  sectionHeader: { alignItems: "flex-end", flexDirection: "row", justifyContent: "space-between" },
  sectionEyebrow: { ...typography.eyebrow, color: colors.textSecondary },
  sectionTitle: { ...typography.body, color: colors.textPrimary, marginTop: spacing.xs },
  link: { ...typography.bodyBold, color: colors.brand },
  horizontalList: { gap: spacing.md, paddingRight: spacing.xl },
  stylePrompt: { ...shadows.card, backgroundColor: colors.brand, borderRadius: radii.large, gap: spacing.sm, padding: spacing.xl },
  promptEyebrow: { ...typography.eyebrow, color: colors.surfaceMuted },
  promptTitle: { ...typography.heading, color: colors.brandForeground, maxWidth: 280 },
  promptAction: { ...typography.bodyBold, color: colors.brandForeground, marginTop: spacing.sm },
});
