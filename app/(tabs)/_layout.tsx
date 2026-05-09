import { Tabs } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useTheme } from "@/src/utils/theme/ThemeProvider";
// import { Header } from "../../src/components/layout/Header";
// import { TabFooter } from "../../src/components/layout/Footer";
import { Header } from "@/src/components/layout/Header";
import { TabFooter } from "@/src/components/layout/Footer";

export default function TabsLayout() {
  const { theme, isDark } = useTheme();

  return (
    <View style={[styles.root, { backgroundColor: theme.bg }]}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* ONE gradient — never remounts */}
      <LinearGradient
        colors={theme.bgGradient as any}
        // style={StyleSheet.absoluteFill}
        style={StyleSheet.absoluteFillObject}
      />

      {/* ONE set of orbs — never remounts */}
      <View style={[styles.bgOrb, { top: -60, right: -80, backgroundColor: theme.bgOrb1 }]} />
      <View style={[styles.bgOrb, { bottom: 120, left: -60, width: 180, height: 180, backgroundColor: theme.bgOrb2 }]} />

      <SafeAreaView style={styles.safe}>
        {/* ONE header — never remounts */}
        <Header onLogout={() => router.replace("/auth_screen/login")} />

        {/* Only this part swaps when you tap footer tabs */}
        <Tabs
          screenOptions={{
            headerShown: false,
            animation: "none",   // ← this also prevents slide flicker
            sceneStyle: { backgroundColor: "transparent" },
          }}
          tabBar={(props) => <TabFooter {...props} />}
        >
          <Tabs.Screen name="index"   options={{ title: "Home" }} />
          <Tabs.Screen name="study"   options={{ title: "Study" }} />
          <Tabs.Screen name="stats"   options={{ title: "Stats" }} />
          <Tabs.Screen name="profile" options={{ title: "Profile" }} />
        </Tabs>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  bgOrb: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
  },
});