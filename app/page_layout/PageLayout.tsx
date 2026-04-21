import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useTheme } from "@/src/utils/theme/ThemeProvider";
import { Footer } from "./Footer";
import { Header } from "./Header";

type PageLayoutProps = {
  children: React.ReactNode;
  onLogout: () => void;
};

export default function PageLayout({ children, onLogout }: PageLayoutProps) {
  const { theme, isDark } = useTheme();

  return (
    <View style={[styles.root, { backgroundColor: theme.bg }]}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Background gradient */}
      <LinearGradient
        colors={theme.bgGradient as any}
        style={StyleSheet.absoluteFill}
      />

      {/* Decorative orbs */}
      <View style={[styles.bgOrb, { top: -60, right: -80, backgroundColor: theme.bgOrb1 }]} />
      <View style={[styles.bgOrb, { bottom: 120, left: -60, width: 180, height: 180, backgroundColor: theme.bgOrb2 }]} />

      <SafeAreaView style={styles.safe}>
        <Header onLogout={onLogout} />

        <View style={styles.content}>
          {children}
        </View>

        <Footer />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  content: { flex: 1 },
  bgOrb: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
  },
});