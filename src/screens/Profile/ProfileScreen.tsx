import { type ReactNode } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useCloset } from "../../hooks/useCloset";
import { useProfile } from "../../hooks/useProfile";
import { useSettings } from "../../hooks/useSettings";
import { colors, radii, shadows, spacing, typography } from "../../theme/tokens";
import type { ClimatePreference } from "../../types/settings";

const climates: readonly ClimatePreference[] = ["Cool", "Temperate", "Warm"];

export function ProfileScreen() {
  const profile = useProfile();
  const { garments } = useCloset();
  const { settings, save } = useSettings();
  const styles = garments.reduce<Record<string, number>>((result, garment) => ({ ...result, [garment.style]: (result[garment.style] ?? 0) + 1 }), {});
  const preferredStyle = Object.entries(styles).sort((left, right) => right[1] - left[1])[0]?.[0] ?? "Not established yet";
  const favoriteColors = [...new Set(garments.filter((garment) => garment.isFavorite).map((garment) => garment.color))];

  return <ScrollView contentContainerStyle={screenStyles.content} style={screenStyles.root} showsVerticalScrollIndicator={false}>
    <Text style={screenStyles.eyebrow}>PROFILE</Text>
    <Text style={screenStyles.title}>{profile?.displayName ?? "WardrobeAI"}</Text>
    <Text style={screenStyles.copy}>Your preferences stay on this device.</Text>
    <Section title="Preferences">
      <PreferenceRow label="Preferred style" value={preferredStyle} />
      <PreferenceRow label="Favorite colors" value={favoriteColors.length > 0 ? favoriteColors.join(", ") : "No favorites yet"} />
      <View style={screenStyles.preferenceRow}><Text style={screenStyles.label}>Climate</Text><View style={screenStyles.climateOptions}>{climates.map((climate) => <Pressable accessibilityRole="button" accessibilityState={{ selected: settings?.climate === climate }} key={climate} onPress={() => settings ? void save({ ...settings, climate }) : undefined} style={[screenStyles.climateOption, settings?.climate === climate ? screenStyles.climateOptionSelected : undefined]}><Text style={[screenStyles.climateText, settings?.climate === climate ? screenStyles.climateTextSelected : undefined]}>{climate}</Text></Pressable>)}</View></View>
      <PreferenceRow label="Theme" value="System" />
    </Section>
    <Section title="About"><PreferenceRow label="App version" value="1.0.0" /><PreferenceRow label="Privacy" value="On-device wardrobe data" /></Section>
  </ScrollView>;
}

function Section({ children, title }: { readonly children: ReactNode; readonly title: string }) { return <View style={screenStyles.section}><Text style={screenStyles.sectionTitle}>{title}</Text><View style={screenStyles.card}>{children}</View></View>; }
function PreferenceRow({ label, value }: { readonly label: string; readonly value: string }) { return <View style={screenStyles.preferenceRow}><Text style={screenStyles.label}>{label}</Text><Text numberOfLines={1} style={screenStyles.value}>{value}</Text></View>; }

const screenStyles = StyleSheet.create({ root: { backgroundColor: colors.canvas, flex: 1 }, content: { gap: spacing.xl, padding: spacing.xl, paddingBottom: spacing.xxxl }, eyebrow: { ...typography.eyebrow, color: colors.textTertiary }, title: { ...typography.display, color: colors.textPrimary, marginTop: -spacing.lg }, copy: { ...typography.body, color: colors.textSecondary, marginTop: -spacing.lg }, section: { gap: spacing.sm }, sectionTitle: { ...typography.subheading, color: colors.textPrimary }, card: { ...shadows.card, backgroundColor: colors.surface, borderRadius: radii.large, overflow: "hidden" }, preferenceRow: { alignItems: "center", borderBottomColor: colors.border, borderBottomWidth: 1, flexDirection: "row", gap: spacing.md, justifyContent: "space-between", minHeight: 58, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm }, label: { ...typography.body, color: colors.textPrimary }, value: { ...typography.body, color: colors.textSecondary, flexShrink: 1, textAlign: "right" }, climateOptions: { flexDirection: "row", gap: spacing.xs }, climateOption: { borderColor: colors.border, borderRadius: radii.pill, borderWidth: 1, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs }, climateOptionSelected: { backgroundColor: colors.brand, borderColor: colors.brand }, climateText: { ...typography.caption, color: colors.textSecondary }, climateTextSelected: { color: colors.brandForeground } });
