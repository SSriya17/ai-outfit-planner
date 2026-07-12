import { StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "../theme/tokens";

interface HeaderProps {
  readonly title: string;
  readonly subtitle: string;
  readonly greeting?: string;
}

export function Header({ greeting, subtitle, title }: HeaderProps) {
  return (
    <View accessibilityRole="header" style={styles.container}>
      {greeting ? <Text style={styles.greeting}>{greeting}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm },
  greeting: { ...typography.eyebrow, color: colors.textSecondary },
  title: { ...typography.display, color: colors.textPrimary },
  subtitle: { ...typography.body, color: colors.textSecondary, maxWidth: 300 },
});
