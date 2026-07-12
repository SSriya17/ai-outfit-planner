export const colors = {
  canvas: "#F7F6F2",
  surface: "#FFFFFF",
  surfaceMuted: "#EEEBE4",
  textPrimary: "#24231F",
  textSecondary: "#716E66",
  textTertiary: "#99958B",
  border: "#E4E0D7",
  brand: "#46443E",
  brandForeground: "#FFFFFF",
  imagePlaceholder: "#D8D3C9",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radii = {
  small: 12,
  medium: 20,
  large: 28,
  pill: 999,
} as const;

export const typography = {
  eyebrow: {
    fontSize: 11,
    fontWeight: "600" as const,
    letterSpacing: 1.2,
    lineHeight: 16,
  },
  body: {
    fontSize: 15,
    fontWeight: "400" as const,
    lineHeight: 22,
  },
  bodyBold: {
    fontSize: 15,
    fontWeight: "600" as const,
    lineHeight: 22,
  },
  caption: {
    fontSize: 13,
    fontWeight: "400" as const,
    lineHeight: 18,
  },
  subheading: {
    fontSize: 20,
    fontWeight: "600" as const,
    letterSpacing: -0.2,
    lineHeight: 26,
  },
  heading: {
    fontSize: 28,
    fontWeight: "600" as const,
    letterSpacing: -0.6,
    lineHeight: 34,
  },
  display: {
    fontSize: 34,
    fontWeight: "600" as const,
    letterSpacing: -1.1,
    lineHeight: 40,
  },
} as const;

export const shadows = {
  card: {
    boxShadow: "0px 8px 24px rgba(36, 35, 31, 0.08)",
  },
} as const;

export const motion = {
  fast: 150,
  normal: 250,
  slow: 400,
} as const;

export const layout = {
  maxContentWidth: 640,
  cardHeight: 180,
  icon: 24,
  avatar: 48,
} as const;
