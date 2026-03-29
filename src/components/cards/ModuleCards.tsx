import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MODULES } from "../../../app/dashboard";
import { ProgressBar } from "../progress_bar/Progressbar";

const ND = Platform.OS !== "web";

export function ModuleCard({ item, index }: { item: typeof MODULES[0]; index: number }) {
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

  return (
    <Animated.View style={[styles.cardWrapper, { transform: [{ scale }], opacity }]}>
      <TouchableOpacity
        onPress={() => router.push(item.route as any)}
        onPressIn={pressIn}
        onPressOut={pressOut}
        activeOpacity={1}
      >
        <LinearGradient
          colors={[item.color1 + "22", item.color2 + "44"]}
          style={styles.moduleCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.cardTop}>
            <View style={[styles.iconBadge, { backgroundColor: item.color1 + "30" }]}>
              <Text style={styles.cardIcon}>{item.icon}</Text>
            </View>
            <View style={[styles.tagChip, { borderColor: item.accentColor + "55" }]}>
              <Text style={[styles.tagText, { color: item.accentColor }]}>{item.tag}</Text>
            </View>
          </View>

          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>{item.subtitle}</Text>

          <View style={styles.progressSection}>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressLabel}>Progress</Text>
              <Text style={[styles.progressPct, { color: item.accentColor }]}>
                {Math.round(item.progress * 100)}%
              </Text>
            </View>
            <ProgressBar value={item.progress} color={item.color1} />
          </View>

          <TouchableOpacity
            style={[styles.ctaBtn, { borderColor: item.color1 + "80" }]}
            onPress={() => router.push(item.route as any)}
          >
            <Text style={[styles.ctaText, { color: item.accentColor }]}>Continue →</Text>
          </TouchableOpacity>

          <View style={[styles.cardOrb, { backgroundColor: item.color1 + "18" }]} />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: { borderRadius: 20 },
  moduleCard: { borderRadius: 20, padding: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", overflow: "hidden" },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  iconBadge: { width: 46, height: 46, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  cardIcon: { fontSize: 22 },
  tagChip: { borderWidth: 1, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontSize: 11, fontWeight: "600" },
  cardTitle: { fontSize: 26, fontWeight: "800", color: "#fff", letterSpacing: 0.3 },
  cardSubtitle: { fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 16, marginTop: 2 },
  progressSection: { marginBottom: 14 },
  progressLabelRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  progressLabel: { fontSize: 11, color: "rgba(255,255,255,0.45)", letterSpacing: 0.5 },
  progressPct: { fontSize: 11, fontWeight: "700" },
  progressTrack: { height: 5, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 3 },
  ctaBtn: { alignSelf: "flex-start", borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 7 },
  ctaText: { fontSize: 13, fontWeight: "700" },
  cardOrb: { position: "absolute", width: 140, height: 140, borderRadius: 70, right: -40, bottom: -40 },
})