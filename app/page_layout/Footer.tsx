import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function Footer() {
  const NAV = [
    { icon: "🏠", label: "Home", active: true, route: "/dashboard" },
    { icon: "📖", label: "Study", active: false, route: "/dashboard/dsa" },
    { icon: "📊", label: "Stats", active: false, route: "/dashboard/stats" },
    { icon: "👤", label: "Profile", active: false, route: "/dashboard/profile" },
  ];
  return (
    <View style={styles.footer}>
      {NAV.map((n) => (
        <TouchableOpacity key={n.label} style={styles.navItem} onPress={() => router.push(n.route as any)}>
          <Text style={styles.navIcon}>{n.icon}</Text>
          <Text style={[styles.navLabel, n.active && styles.navLabelActive]}>{n.label}</Text>
          {n.active && <View style={styles.navDot} />}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { position: "absolute", bottom: 0, left: 0, right: 0, flexDirection: "row", backgroundColor: "rgba(10,15,30,0.97)", borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.07)", paddingBottom: 20, paddingTop: 10 },
  navItem: { flex: 1, alignItems: "center", gap: 3 },
  navIcon: { fontSize: 20 },
  navLabel: { fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: 0.3 },
  navLabelActive: { color: "#4F8EF7", fontWeight: "700" },
  navDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: "#4F8EF7" },
})