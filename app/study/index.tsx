import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";
import { ModuleCard } from "../../src/components/cards/ModuleCards";
import { useTheme } from "../../src/utils/theme/ThemeProvider";
import PageLayout from "../page_layout/PageLayout";

export const SUBJECTS = [
  {
    id: "ds",
    title: "DS",
    subtitle: "Data Structures",
    icon: "📘",
    tag: "Theory",
    progress: 0.40,
    color1: "#4F8EF7",
    color2: "#1E40AF",
    accentColor: "#93C5FD",
    route: "/subjects/ds",
  },
  {
    id: "dslab",
    title: "DS Lab",
    subtitle: "Data Structures Lab",
    icon: "🧪",
    tag: "Practical",
    progress: 0.55,
    color1: "#34D399",
    color2: "#065F46",
    accentColor: "#6EE7B7",
    route: "/subjects/dslab",
  },
  {
    id: "ppds",
    title: "PPDS",
    subtitle: "Python Programming & Data Structures",
    icon: "💻",
    tag: "Theory",
    progress: 0.30,
    color1: "#F59E0B",
    color2: "#92400E",
    accentColor: "#FCD34D",
    route: "/subjects/ppds",
  },
  {
    id: "ppdslab",
    title: "PPDS Lab",
    subtitle: "Python Programming & Data Structures Lab",
    icon: "🔬",
    tag: "Practical",
    progress: 0.65,
    color1: "#A78BFA",
    color2: "#5B21B6",
    accentColor: "#C4B5FD",
    route: "/subjects/ppdslab",
  },
];

export default function DashboardScreen() {
  const { theme } = useTheme();

  return (
    <PageLayout onLogout={() => router.replace("/auth_screen/login")}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>My Modules</Text>
            <Text style={[styles.sectionSub, { color: theme.textSecondary }]}>Pick up where you left off</Text>
          </View>

          <View style={styles.cardsColumn}>
            {SUBJECTS.map((m, i) => <ModuleCard key={m.id} item={m} index={i} />)}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  sectionHeader: { paddingHorizontal: 20, marginBottom: 14 },
  sectionTitle: { fontSize: 17, fontWeight: "700", marginBottom: 2 },
  sectionSub: { fontSize: 12 },
  scroll: { flex: 1 },
  scrollContent: { paddingTop: 8 },
  cardsColumn: { paddingHorizontal: 20, gap: 14 },
});