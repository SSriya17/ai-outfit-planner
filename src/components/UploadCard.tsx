import { Camera, ChevronRight } from "lucide-react-native";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors, layout, radii, shadows, spacing, typography } from "../theme/tokens";

interface UploadCardProps {
  readonly title: string;
  readonly supportingCopy: string;
  readonly onPress: () => void;
  readonly imageUri?: string;
  readonly isLoading?: boolean;
  readonly errorMessage?: string | null;
}

export function UploadCard({ errorMessage, imageUri, isLoading = false, onPress, supportingCopy, title }: UploadCardProps) {
  return (
    <Pressable accessibilityLabel={title} accessibilityState={{ busy: isLoading, disabled: isLoading }} disabled={isLoading} onPress={onPress} style={styles.card}>
      {imageUri ? <Image accessibilityLabel="Selected garment preview" source={{ uri: imageUri }} style={styles.preview} /> : <View style={styles.icon}><Camera color={colors.brandForeground} size={layout.icon} /></View>}
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.detail}>{isLoading ? "Preparing your garment for styling." : supportingCopy}</Text>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      </View>
      {isLoading ? <ActivityIndicator color={colors.brand} /> : <ChevronRight color={colors.textTertiary} size={layout.icon} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center", backgroundColor: colors.surface, borderCurve: "continuous", borderRadius: radii.large,
    flexDirection: "row", gap: spacing.lg, minHeight: 120, padding: spacing.xl, ...shadows.card,
  },
  icon: { alignItems: "center", backgroundColor: colors.brand, borderRadius: radii.pill, height: layout.avatar, justifyContent: "center", width: layout.avatar },
  preview: { backgroundColor: colors.imagePlaceholder, borderCurve: "continuous", borderRadius: radii.small, height: 56, width: 44 },
  copy: { flex: 1, gap: spacing.xs },
  title: { ...typography.bodyBold, color: colors.textPrimary },
  detail: { ...typography.caption, color: colors.textSecondary },
  error: { ...typography.caption, color: colors.textSecondary },
});
