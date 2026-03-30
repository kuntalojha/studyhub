
export const DARK_THEME = {
  mode: "dark" as const,
  // backgrounds
  bg: "#0A0F1E",
  bgGradient: ["#0A0F1E", "#0D1B3E", "#0A0F1E"] as string[],
  bgOrb1: "rgba(79,142,247,0.10)",
  bgOrb2: "rgba(52,211,153,0.07)",
  safe: "transparent",
  // cards
  cardBorder: "rgba(255,255,255,0.08)",
  // text
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255,255,255,0.45)",
  textMuted: "rgba(255,255,255,0.35)",
  // header
  headerGreeting: "rgba(255,255,255,0.45)",
  headerName: "#FFFFFF",
  avatarRingBg: "rgba(79,142,247,0.20)",
  logoutBg: "rgba(255,255,255,0.06)",
  logoutBorder: "rgba(255,255,255,0.10)",
  logoutIcon: "rgba(255,255,255,0.60)",
  // toggle
  toggleBg: "rgba(255,255,255,0.08)",
  toggleBorder: "rgba(255,255,255,0.12)",
  toggleIcon: "rgba(255,255,255,0.75)",
  // footer
  footerBg: "rgba(10,15,30,0.97)",
  footerBorder: "rgba(255,255,255,0.07)",
  navLabel: "rgba(255,255,255,0.35)",
  navLabelActive: "#4F8EF7",
  navDot: "#4F8EF7",
  // progress
  progressTrack: "rgba(255,255,255,0.10)",
  // section
  sectionTitle: "#FFFFFF",
  sectionSub: "rgba(255,255,255,0.40)",
};

export const LIGHT_THEME = {
  mode: "light" as const,
  // backgrounds
  bg: "#F0F4FF",
  bgGradient: ["#EEF2FF", "#F5F7FF", "#EDF1FF"] as string[],
  bgOrb1: "rgba(79,142,247,0.12)",
  bgOrb2: "rgba(52,211,153,0.09)",
  safe: "transparent",
  // cards
  cardBorder: "rgba(79,142,247,0.12)",
  // text
  textPrimary: "#0F172A",
  textSecondary: "rgba(15,23,42,0.55)",
  textMuted: "rgba(15,23,42,0.40)",
  // header
  headerGreeting: "rgba(15,23,42,0.50)",
  headerName: "#0F172A",
  avatarRingBg: "rgba(79,142,247,0.15)",
  logoutBg: "rgba(79,142,247,0.08)",
  logoutBorder: "rgba(79,142,247,0.18)",
  logoutIcon: "rgba(15,23,42,0.55)",
  // toggle
  toggleBg: "rgba(79,142,247,0.10)",
  toggleBorder: "rgba(79,142,247,0.20)",
  toggleIcon: "#1E40AF",
  // footer
  footerBg: "rgba(240,244,255,0.98)",
  footerBorder: "rgba(79,142,247,0.12)",
  navLabel: "rgba(15,23,42,0.38)",
  navLabelActive: "#4F8EF7",
  navDot: "#4F8EF7",
  // progress
  progressTrack: "rgba(15,23,42,0.10)",
  // section
  sectionTitle: "#0F172A",
  sectionSub: "rgba(15,23,42,0.45)",
};

export type Theme = typeof DARK_THEME | typeof LIGHT_THEME;