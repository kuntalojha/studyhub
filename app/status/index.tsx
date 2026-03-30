import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Footer } from "../page_layout/Footer";
import { Header } from "../page_layout/Header";

export const STATUS = [
  {
    id: "ds",
    title: "Data Structures",
    progress: 40,
    color1: "#4F8EF7",
    color2: "#1E40AF",
    accentColor: "#93C5FD",
    route: "/subjects/ds",
  },
  {
    id: "dslab",
    title: "DS Lab",
    progress: 55,
    color1: "#34D399",
    color2: "#065F46",
    accentColor: "#6EE7B7",
    route: "/subjects/dslab",
  },
  {
    id: "ppds",
    title: "PPDS",
    progress: 30,
    color1: "#F59E0B",
    color2: "#92400E",
    accentColor: "#FCD34D",
    route: "/subjects/ppds",
  },
  {
    id: "ppdslab",
    title: "PPDS Lab",
    progress: 65,
    color1: "#A78BFA",
    color2: "#5B21B6",
    accentColor: "#C4B5FD",
    route: "/subjects/ppdslab",
  },
];

export default function StatusScreen() {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      {/* Background Gradient */}
     <LinearGradient colors={["#0A0F1E", "#0D1B3E", "#0A0F1E"]} style={StyleSheet.absoluteFill} />
       <View style={[styles.bgOrb, { top: -60, right: -80 }]} />
       <View style={[styles.bgOrb, { bottom: 120, left: -60, width: 180, height: 180, backgroundColor: "rgba(52,211,153,0.07)" }]} />

      <SafeAreaView style={styles.safe}>
        <Header onLogout={() => router.replace("/auth_screen/login")} />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Subject Progress</Text>

          {STATUS.map((item) => (
            <LinearGradient
              key={item.id}
              colors={[item.color1, item.color2]}
              style={styles.card}
            >
              <View style={styles.row}>
                <Text style={styles.cardTitle}>{item.title}</Text>

                <Text style={[styles.cardValue, { color: item.accentColor }]}>
                  {item.progress}%
                </Text>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressBg}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${item.progress}%`,
                      backgroundColor: item.accentColor,
                    },
                  ]}
                />
              </View>
            </LinearGradient>
          ))}
        </ScrollView>
        <Footer />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0A0F1E",
  },

  safe: {
    flex: 1,
  },

  scroll: {
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginTop: 10,
    marginBottom: 20,
  },

  card: {
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  cardValue: {
    fontSize: 16,
    fontWeight: "700",
  },

  progressBg: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 6,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 6,
  },
    bgOrb: { position: "absolute", width: 220, height: 220, borderRadius: 110, backgroundColor: "rgba(79,142,247,0.1)" },

});