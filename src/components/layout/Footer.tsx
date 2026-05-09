import { useTheme } from "@/src/utils/theme/ThemeProvider";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NAV = [
  { icon: "🏠", label: "Home" },
  { icon: "📖", label: "Study" },
  { icon: "📊", label: "Stats" },
  { icon: "👤", label: "Profile" },
];

export function TabFooter({ state, navigation }: BottomTabBarProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.footer, { backgroundColor: theme.footerBg, borderTopColor: theme.footerBorder }]}>
      {NAV.map((n, index) => {
        const isActive = state.index === index;
        const route = state.routes[index];

        return (
          <TouchableOpacity
            key={n.label}
            style={styles.navItem}
            onPress={() => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!isActive && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
          >
            <Text style={styles.navIcon}>{n.icon}</Text>
            <Text style={[
              styles.navLabel,
              { color: isActive ? theme.navLabelActive : theme.navLabel },
              isActive && styles.navLabelActive,
            ]}>
              {n.label}
            </Text>
            {isActive && <View style={[styles.navDot, { backgroundColor: theme.navDot }]} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
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