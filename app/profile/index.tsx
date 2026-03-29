import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView} from "react-native";
import { Footer } from "../page_layout/Footer";
import { Header } from "../page_layout/Header";

export default function ProfileScreen() {
  return (
        <View style={styles.root}>
          <StatusBar style="light" />
          <LinearGradient colors={["#0A0F1E", "#0D1B3E", "#0A0F1E"]} style={StyleSheet.absoluteFill} />
          <View style={[styles.bgOrb, { top: -60, right: -80 }]} />
          <View style={[styles.bgOrb, { bottom: 120, left: -60, width: 180, height: 180, backgroundColor: "rgba(52,211,153,0.07)" }]} />
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <Header onLogout={() => router.replace("/auth_screen/login")} />

      <View style={styles.profile}>
        <Text style={styles.name}>Admin</Text>
        <Text style={styles.info}>Admin</Text>
      </View>

      <Footer />
    </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0A0F1E" },
  safe: { flex: 1 },
  bgOrb: { position: "absolute", width: 220, height: 220, borderRadius: 110, backgroundColor: "rgba(79,142,247,0.1)" },
  container: {
    flex: 1,
    backgroundColor: "#0A0F1E",
  },

  profile: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },

  info: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 5,
  },
});