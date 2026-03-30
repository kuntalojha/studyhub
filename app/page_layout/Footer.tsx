import { useTheme } from "@/src/utils/theme/ThemeProvider";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NAV = [
  { icon: "🏠", label: "Home",    active: true,  route: "/dashboard" },
  { icon: "📖", label: "Study",   active: false, route: "/study" },
  { icon: "📊", label: "Stats",   active: false, route: "/stats" },
  { icon: "👤", label: "Profile", active: false, route: "/profile" },
];

export function Footer() {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.footer,
        { backgroundColor: theme.footerBg, borderTopColor: theme.footerBorder },
      ]}
    >
      {NAV.map((n) => (
        <TouchableOpacity
          key={n.label}
          style={styles.navItem}
          onPress={() => router.push(n.route as any)}
        >
          <Text style={styles.navIcon}>{n.icon}</Text>
          <Text
            style={[
              styles.navLabel,
              { color: n.active ? theme.navLabelActive : theme.navLabel },
              n.active && styles.navLabelActive,
            ]}
          >
            {n.label}
          </Text>
          {n.active && (
            <View style={[styles.navDot, { backgroundColor: theme.navDot }]} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    borderTopWidth: 1,
    paddingBottom: 20,
    paddingTop: 10,
  },
  navItem: { flex: 1, alignItems: "center", gap: 3 },
  navIcon: { fontSize: 20 },
  navLabel: { fontSize: 10, letterSpacing: 0.3 },
  navLabelActive: { fontWeight: "700" },
  navDot: { width: 4, height: 4, borderRadius: 2 },
});