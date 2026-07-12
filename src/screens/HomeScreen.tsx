import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "../components/Header";
import { AnalysisCard } from "../components/AnalysisCard";
import { OutfitCard } from "../components/OutfitCard";
import { RecommendationCard } from "../components/RecommendationCard";
import { UploadCard } from "../components/UploadCard";
import { WardrobeCard } from "../components/WardrobeCard";
import { homeMockData } from "../data/mockData";
import { useImagePicker } from "../hooks/useImagePicker";
import { useRecommendation } from "../hooks/useRecommendation";
import { useVisionAnalysis } from "../hooks/useVisionAnalysis";
import { useWardrobe } from "../hooks/useWardrobe";
import { colors, spacing, typography } from "../theme/tokens";

const { recentOutfits, todayRecommendation, wardrobeItems } = homeMockData;

export function HomeScreen() {
  const { errorMessage, isLoading, openImagePicker, selectedImage } = useImagePicker();
  const { analysis, errorMessage: analysisErrorMessage, isAnalyzing, retry } = useVisionAnalysis(selectedImage);
  const { errorMessage: saveErrorMessage, isCurrentGarmentSaved, isSaving, saveCurrentGarment, savedGarments } = useWardrobe(selectedImage, analysis);
  const generatedRecommendation = useRecommendation(savedGarments, wardrobeItems);

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Header subtitle="A considered wardrobe, styled around the life you lead." title="Style with intention." />

        <UploadCard
          errorMessage={errorMessage}
          imageUri={selectedImage?.uri}
          isLoading={isLoading || isAnalyzing}
          onPress={openImagePicker}
          supportingCopy="Add a considered piece to your digital wardrobe."
          title="Capture Garment"
        />

        {selectedImage ? <AnalysisCard analysis={analysis} errorMessage={analysisErrorMessage ?? saveErrorMessage} imageUri={selectedImage.uri} isLoading={isAnalyzing} isSaved={isCurrentGarmentSaved} isSaving={isSaving} onRetry={retry} onSave={saveCurrentGarment} /> : null}

        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>TODAY'S RECOMMENDATION</Text>
          <RecommendationCard
            confidence={generatedRecommendation?.confidence ?? todayRecommendation.metadata.score.overall}
            image={todayRecommendation.coverImage}
            rationale={generatedRecommendation?.rationale ?? todayRecommendation.metadata.rationale}
            title={generatedRecommendation?.title ?? todayRecommendation.title}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>YOUR CLOSET</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {savedGarments.map((garment) => (
              <WardrobeCard color={garment.dominantColor} image={{ uri: garment.imageUri }} key={garment.id} material={garment.material} name={`${garment.dominantColor} ${garment.category}`} />
            ))}
            {wardrobeItems.map((item) => (
              <WardrobeCard color={item.color} image={item.image} key={item.id} material={item.vision.material} name={item.name} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>RECENT LOOKS</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {recentOutfits.map((outfit) => (
              <OutfitCard date={outfit.wornOn} image={outfit.coverImage} key={outfit.id} occasion={outfit.occasion} title={outfit.title} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.canvas },
  content: { gap: spacing.xxxl, paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl },
  section: { gap: spacing.lg },
  sectionEyebrow: { ...typography.eyebrow, color: colors.textSecondary },
  horizontalList: { gap: spacing.md, paddingRight: spacing.xl },
});
