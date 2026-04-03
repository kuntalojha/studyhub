import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Footer } from "../page_layout/Footer";
import { Header } from "../page_layout/Header";
import { router } from "expo-router";
import { useTheme } from "@/src/utils/theme/ThemeProvider";

export default function SubjectsLayout() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* <Header onLogout={() => router.replace("/auth_screen/login")} /> */}

      <View style={styles.content}>
        <Slot />
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
});