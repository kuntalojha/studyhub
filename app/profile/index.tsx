import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Footer } from "../page_layout/Footer";
import { Header } from "../page_layout/Header";
import { useTheme } from "../../src/utils/theme/ThemeProvider";

export default function ProfileScreen() {
  const { theme, isDark } = useTheme();

  return (
    <View style={[styles.root, { backgroundColor: theme.bg }]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <LinearGradient colors={theme.bgGradient as any} style={StyleSheet.absoluteFill} />
      <View style={[styles.bgOrb, { top: -60, right: -80, backgroundColor: theme.bgOrb1 }]} />
      <View style={[styles.bgOrb, { bottom: 120, left: -60, width: 180, height: 180, backgroundColor: theme.bgOrb2 }]} />

      <SafeAreaView style={styles.container}>
        <Header onLogout={() => router.replace("/auth_screen/login")} />

        <View style={styles.profile}>
          <Text style={[styles.name, { color: theme.textPrimary }]}>Admin</Text>
          <Text style={[styles.info, { color: theme.textSecondary }]}>Admin</Text>
        </View>

        <Footer />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  bgOrb: { position: "absolute", width: 220, height: 220, borderRadius: 110 },
  container: { flex: 1 },
  profile: { flex: 1, justifyContent: "center", alignItems: "center" },
  name: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  info: { fontSize: 14, marginBottom: 5 },
});