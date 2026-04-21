import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../src/utils/theme/ThemeProvider";
import PageLayout from "../page_layout/PageLayout";

export default function ProfileScreen() {
  const { theme } = useTheme();

  return (
    <PageLayout onLogout={() => router.replace("/auth_screen/login")}>
        <View style={styles.profile}>
          <Text style={[styles.name, { color: theme.textPrimary }]}>Admin</Text>
          <Text style={[styles.info, { color: theme.textSecondary }]}>Admin</Text>
        </View>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  profile: { flex: 1, justifyContent: "center", alignItems: "center" },
  name: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  info: { fontSize: 14, marginBottom: 5 },
});