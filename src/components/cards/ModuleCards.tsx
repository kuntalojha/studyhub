import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MODULES } from "../../../app/dashboard";
import { ProgressBar } from "../progress_bar/Progressbar";
import { useTheme } from "../../utils/theme/ThemeProvider";

const ND = Platform.OS !== "web";

export function ModuleCard({ item, index }: { item: typeof MODULES[0]; index: number }) {
  const { theme, isDark } = useTheme();
  const scale = useRef(new Animated.Value(0.92)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, delay: index * 150, friction: 6, useNativeDriver: ND }),
      Animated.timing(opacity, { toValue: 1, delay: index * 150, duration: 400, useNativeDriver: ND }),
    ]).start();
  }, []);

  const pressIn = () => Animated.spring(scale, { toValue: 0.97, useNativeDriver: ND }).start();
  const pressOut = () => Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: ND }).start();

  // In light mode: use a rich white card with a subtle tinted gradient
  const lightCardGradient: [string, string] = [
    "#FFFFFF",
    item.color1 + "18",
  ];
  const darkCardGradient: [string, string] = [
    item.color1 + "22",
    item.color2 + "44",
  ];

  return (
    <Animated.View style={[styles.cardWrapper, { transform: [{ scale }], opacity }]}>
      <TouchableOpacity
        onPress={() => router.push(item.route as any)}
        onPressIn={pressIn}
        onPressOut={pressOut}
        activeOpacity={1}
      >
        <LinearGradient
          colors={isDark ? darkCardGradient : lightCardGradient}
          style={[
            styles.moduleCard,
            {
              borderColor: isDark
                ? "rgba(255,255,255,0.08)"
                : item.color1 + "28",
              // light mode: drop shadow for card depth
              ...(isDark
                ? {}
                : {
                    shadowColor: item.color1,
                    shadowOpacity: 0.14,
                    shadowRadius: 16,
                    shadowOffset: { width: 0, height: 6 },
                    elevation: 6,
                  }),
            },
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* ── Top row: icon badge + tag chip ── */}
          <View style={styles.cardTop}>
            <View style={[styles.iconBadge, { backgroundColor: item.color1 + (isDark ? "30" : "18") }]}>
              <Text style={styles.cardIcon}>{item.icon}</Text>
            </View>
            <View style={[styles.tagChip, { borderColor: item.accentColor + (isDark ? "55" : "60"), backgroundColor: item.color1 + (isDark ? "00" : "12") }]}>
              <Text style={[styles.tagText, { color: isDark ? item.accentColor : item.color2 }]}>
                {item.tag}
              </Text>
            </View>
          </View>

          {/* ── Title + subtitle ── */}
          <Text style={[styles.cardTitle, { color: isDark ? "#fff" : "#0F172A" }]}>
            {item.title}
          </Text>
          <Text style={[styles.cardSubtitle, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(15,23,42,0.5)" }]}>
            {item.subtitle}
          </Text>

          {/* ── Progress ── */}
          <View style={styles.progressSection}>
            <View style={styles.progressLabelRow}>
              <Text style={[styles.progressLabel, { color: isDark ? "rgba(255,255,255,0.45)" : "rgba(15,23,42,0.45)" }]}>
                Progress
              </Text>
              <Text style={[styles.progressPct, { color: isDark ? item.accentColor : item.color2 }]}>
                {Math.round(item.progress * 100)}%
              </Text>
            </View>
            <ProgressBar value={item.progress} color={item.color1} />
          </View>

          {/* ── CTA ── */}
          <TouchableOpacity
            style={[
              styles.ctaBtn,
              {
                borderColor: item.color1 + (isDark ? "80" : "60"),
                backgroundColor: isDark ? "transparent" : item.color1 + "14",
              },
            ]}
            onPress={() => router.push(item.route as any)}
          >
            <Text style={[styles.ctaText, { color: isDark ? item.accentColor : item.color2 }]}>
              Continue →
            </Text>
          </TouchableOpacity>

          {/* ── Decorative orb ── */}
          <View style={[styles.cardOrb, { backgroundColor: item.color1 + (isDark ? "18" : "10") }]} />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: { borderRadius: 20 },
  moduleCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  iconBadge: { width: 46, height: 46, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  cardIcon: { fontSize: 22 },
  tagChip: { borderWidth: 1, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontSize: 11, fontWeight: "600" },
  cardTitle: { fontSize: 26, fontWeight: "800", letterSpacing: 0.3 },
  cardSubtitle: { fontSize: 13, marginBottom: 16, marginTop: 2 },
  progressSection: { marginBottom: 14 },
  progressLabelRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  progressLabel: { fontSize: 11, letterSpacing: 0.5 },
  progressPct: { fontSize: 11, fontWeight: "700" },
  ctaBtn: { alignSelf: "flex-start", borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 7 },
  ctaText: { fontSize: 13, fontWeight: "700" },
  cardOrb: { position: "absolute", width: 140, height: 140, borderRadius: 70, right: -40, bottom: -40 },
});