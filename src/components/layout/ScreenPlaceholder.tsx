import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../../theme/tokens";
export function ScreenPlaceholder({ title }: { readonly title: string }) { return <View style={styles.root}><Text style={styles.title}>{title}</Text><Text style={styles.copy}>This space is ready for the next WardrobeAI experience.</Text></View>; }
const styles = StyleSheet.create({ root: { flex: 1, backgroundColor: colors.canvas, gap: spacing.md, justifyContent: "center", padding: spacing.xl }, title: { ...typography.display, color: colors.textPrimary }, copy: { ...typography.body, color: colors.textSecondary } });
