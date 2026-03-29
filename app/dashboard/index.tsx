import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Header } from "../page_layout/Header";
import { Footer } from "../page_layout/Footer";
import { ModuleCard } from "../../src/components/cards/ModuleCards";

export const MODULES = [
  {
    id: "dsa",
    title: "DSA",
    subtitle: "Data Structures & Algorithms",
    icon: "⚡",
    tag: "120 Problems",
    progress: 0.42,
    color1: "#4F8EF7",
    color2: "#1E40AF",
    accentColor: "#93C5FD",
    route: "/dashboard/dsa",
  },
  {
    id: "lab",
    title: "Lab",
    subtitle: "Practical Programming",
    icon: "🔬",
    tag: "36 Exercises",
    progress: 0.65,
    color1: "#34D399",
    color2: "#065F46",
    accentColor: "#6EE7B7",
    route: "/dashboard/lab",
  },
];

export default function DashboardScreen() {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <LinearGradient colors={["#0A0F1E", "#0D1B3E", "#0A0F1E"]} style={StyleSheet.absoluteFill} />
      <View style={[styles.bgOrb, { top: -60, right: -80 }]} />
      <View style={[styles.bgOrb, { bottom: 120, left: -60, width: 180, height: 180, backgroundColor: "rgba(52,211,153,0.07)" }]} />

      <SafeAreaView style={styles.safe}>
        <Header onLogout={() => router.replace("/auth_screen/login")} />

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Modules</Text>
            <Text style={styles.sectionSub}>Pick up where you left off</Text>
          </View>

          <View style={styles.cardsColumn}>
            {MODULES.map((m, i) => <ModuleCard key={m.id} item={m} index={i} />)}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        <Footer />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0A0F1E" },
  safe: { flex: 1 },
  bgOrb: { position: "absolute", width: 220, height: 220, borderRadius: 110, backgroundColor: "rgba(79,142,247,0.1)" },
  sectionHeader: { paddingHorizontal: 20, marginBottom: 14 },
  sectionTitle: { fontSize: 17, fontWeight: "700", color: "#fff", marginBottom: 2 },
  sectionSub: { fontSize: 12, color: "rgba(255,255,255,0.4)" },
  scroll: { flex: 1 },
  scrollContent: { paddingTop: 8 },
  cardsColumn: { paddingHorizontal: 20, gap: 14 },
});