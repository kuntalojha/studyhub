import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Footer } from "../page_layout/Footer";
import { Header } from "../page_layout/Header";
import { useTheme } from "../../src/utils/theme/ThemeProvider";

export const STATS = [
  {
    id: "ds",
    title: "Data Structures",
    progress: 40,
    color1: "#4F8EF7",
    color2: "#1E40AF",
    accentColor: "#93C5FD",
  },
  {
    id: "dslab",
    title: "DS Lab",
    progress: 55,
    color1: "#34D399",
    color2: "#065F46",
    accentColor: "#6EE7B7",
  },
  {
    id: "ppds",
    title: "PPDS",
    progress: 30,
    color1: "#F59E0B",
    color2: "#92400E",
    accentColor: "#FCD34D",
  },
  {
    id: "ppdslab",
    title: "PPDS Lab",
    progress: 65,
    color1: "#A78BFA",
    color2: "#5B21B6",
    accentColor: "#C4B5FD",
  },
];

// Separate card components so isDark is read at render time
function StatCard({ item, isDark }: { item: typeof STATS[0]; isDark: boolean }) {
  const darkColors: [string, string] = [item.color1, item.color2];
  const lightColors: [string, string] = ["#FFFFFF", "#F0F4FF"];

  return (
    <LinearGradient
      key={item.id}
      colors={isDark ? darkColors : lightColors}
      style={[
        styles.card,
        !isDark && {
          borderWidth: 1.5,
          borderColor: item.color1 + "40",
          shadowColor: item.color1,
          shadowOpacity: 0.15,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 5 },
          elevation: 5,
        },
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Left accent bar in light mode */}
      {!isDark && (
        <View style={[styles.accentBar, { backgroundColor: item.color1 }]} />
      )}

      <View style={[styles.row, !isDark && { paddingLeft: 12 }]}>
        {/* Icon dot */}
        <View style={styles.titleRow}>
          <View style={[styles.dot, { backgroundColor: item.color1 }]} />
          <Text style={[styles.cardTitle, { color: isDark ? "#fff" : "#0F172A" }]}>
            {item.title}
          </Text>
        </View>
        <Text style={[styles.cardValue, { color: isDark ? item.accentColor : item.color1 }]}>
          {item.progress}%
        </Text>
      </View>

      <View style={[!isDark && { paddingLeft: 12 }]}>
        <View
          style={[
            styles.progressBg,
            { backgroundColor: isDark ? "rgba(255,255,255,0.2)" : item.color1 + "20" },
          ]}
        >
          <View
            style={[
              styles.progressFill,
              { width: `${item.progress}%`, backgroundColor: item.color1 },
            ]}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

export default function StatsScreen() {
  const { theme, isDark } = useTheme();

  return (
    <View style={[styles.root, { backgroundColor: theme.bg }]}>
      <StatusBar style={isDark ? "light" : "dark"} />

      <LinearGradient colors={theme.bgGradient as any} style={StyleSheet.absoluteFill} />
      <View style={[styles.bgOrb, { top: -60, right: -80, backgroundColor: theme.bgOrb1 }]} />
      <View style={[styles.bgOrb, { bottom: 120, left: -60, width: 180, height: 180, backgroundColor: theme.bgOrb2 }]} />

      <SafeAreaView style={styles.safe}>
        <Header onLogout={() => router.replace("/auth_screen/login")} />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.title, { color: theme.sectionTitle }]}>
            Subject Progress
          </Text>

          {STATS.map((item) => (
            <StatCard key={item.id} item={item} isDark={isDark} />
          ))}
        </ScrollView>

        <Footer />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  bgOrb: { position: "absolute", width: 220, height: 220, borderRadius: 110 },
  scroll: { paddingHorizontal: 20 },
  title: { fontSize: 20, fontWeight: "700", marginTop: 10, marginBottom: 20 },
  card: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
  },
  accentBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  cardTitle: { fontSize: 16, fontWeight: "600" },
  cardValue: { fontSize: 16, fontWeight: "700" },
  progressBg: { height: 8, borderRadius: 6, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 6 },
});