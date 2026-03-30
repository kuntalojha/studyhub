import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { useTheme } from "../../utils/theme/ThemeProvider";

export function ProgressBar({ value, color }: { value: number; color: string }) {
  const { theme } = useTheme();
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value,
      duration: 900,
      delay: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  const barWidth = anim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] });

  return (
    <View style={[styles.progressTrack, { backgroundColor: theme.progressTrack }]}>
      <Animated.View style={[styles.progressFill, { width: barWidth, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  progressTrack: { height: 5, borderRadius: 3, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 3 },
});