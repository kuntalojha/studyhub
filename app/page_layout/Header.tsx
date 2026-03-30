import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../src/utils/theme/ThemeProvider";

export function Header({ onLogout }: { onLogout: () => void }) {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <View style={styles.header}>
      {/* ── Left: avatar + greeting ── */}
      <View style={styles.headerLeft}>
        <View style={[styles.avatarRing, { backgroundColor: theme.avatarRingBg }]}>
          <LinearGradient
            colors={["#4F8EF7", "#FFD166"]}
            style={styles.avatar}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.avatarText}>A</Text>
          </LinearGradient>
        </View>
        <View>
          <Text style={[styles.headerGreeting, { color: theme.headerGreeting }]}>
            Have a nice day 👋
          </Text>
          <Text style={[styles.headerName, { color: theme.headerName }]}>Admin</Text>
        </View>
      </View>

      {/* ── Right: theme toggle + logout ── */}
      <View style={styles.actions}>
        {/* Dark / Light toggle */}
        <TouchableOpacity
          onPress={toggleTheme}
          style={[
            styles.iconBtn,
            { backgroundColor: theme.toggleBg, borderColor: theme.toggleBorder },
          ]}
          accessibilityLabel={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <Text style={[styles.iconBtnText, { color: theme.toggleIcon }]}>
            {isDark ? "☀️" : "🌙"}
          </Text>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          onPress={onLogout}
          style={[
            styles.iconBtn,
            { backgroundColor: theme.logoutBg, borderColor: theme.logoutBorder },
          ]}
        >
          <Text style={[styles.iconBtnText, { color: theme.logoutIcon }]}>⎋</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 12,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatarRing: { width: 46, height: 46, borderRadius: 14, padding: 2 },
  avatar: { flex: 1, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 18, fontWeight: "800", color: "#fff" },
  headerGreeting: { fontSize: 12, marginBottom: 1 },
  headerName: { fontSize: 17, fontWeight: "700" },
  actions: { flexDirection: "row", gap: 8, alignItems: "center" },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  iconBtnText: { fontSize: 17 },
});