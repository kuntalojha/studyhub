import { router } from "expo-router";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { BlurView } from "expo-blur";
import { useTheme } from "@/src/utils/theme/ThemeProvider";
import quotes from "@/src/quotes_data/quotes.json";
// import PageLayout from "../page_layout/PageLayout";

export default function DashboardScreen() {
  const { theme, isDark } = useTheme();

  const getQuoteIndex = () => Math.floor(Date.now() / 1800000) % quotes.length;

  const [quoteIndex, setQuoteIndex] = useState(getQuoteIndex());
  const fadeAnim  = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = getQuoteIndex();
      if (newIndex !== quoteIndex) {
        Animated.parallel([
          Animated.timing(fadeAnim,  { toValue: 0,    duration: 500, useNativeDriver: true }),
          Animated.timing(scaleAnim, { toValue: 0.97, duration: 500, useNativeDriver: true }),
        ]).start(() => {
          setQuoteIndex(newIndex);
          Animated.parallel([
            Animated.timing(fadeAnim,  { toValue: 1, duration: 600, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
          ]).start();
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [quoteIndex, fadeAnim, scaleAnim]);

  const currentQuote = quotes[quoteIndex];
  const textColor = theme.textPrimary || (isDark ? '#F2EEE8' : '#111');

  return (
    // <PageLayout onLogout={() => router.replace("/auth_screen/login")}>
      <View style={styles.container}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }], width: '100%' }}>

          {/* Glow shadow layer — sits behind card, gives it a rounded luminous halo */}
          <View style={[styles.glowShadow, isDark ? styles.glowShadowDark : styles.glowShadowLight]} />

          {/* Card */}
          <View style={[styles.cardWrapper, {
            borderColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.80)',
          }]}>
            <BlurView
              intensity={isDark ? 35 : 70}
              tint={isDark ? "dark" : "light"}
              style={styles.blurCard}
            >
              {/* Top accent bar */}
              {/* <View style={styles.topAccentBar}>
                <View style={styles.accentDot} />
                <View style={styles.accentDot} />
                <View style={styles.accentDot} />
              </View> */}

              {/* Quote mark */}
              <Text style={styles.quoteMark}>"</Text>

              {/* Quote body */}
              <Text style={[styles.quoteText, { color: textColor }]}>
                {currentQuote.body}
              </Text>

              {/* Divider */}
              <View style={styles.dividerRow}>
                <View style={[styles.dividerLine, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }]} />
              </View>

              {/* Author */}
              <View style={styles.authorRow}>
                <View style={styles.authorAccentLine} />
                <Text style={styles.quoteAuthor}>{currentQuote.by}</Text>
              </View>

            </BlurView>
          </View>

        </Animated.View>
      </View>
    // </PageLayout>
  );
}

const CARD_RADIUS = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Rounded glow halo behind the card */
  glowShadow: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    borderRadius: CARD_RADIUS+2,
  },
  glowShadowDark: {
    backgroundColor: '#4F8EF7',
    opacity: 0.18,
    shadowColor: '#4F8EF7',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.55,
    shadowRadius: 28,
    elevation: 20,
  },
  glowShadowLight: {
    backgroundColor: '#4F8EF7',
    opacity: 0.12,
    shadowColor: '#4F8EF7',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 16,
  },

  /* Card shell */
  cardWrapper: {
    width: '100%',
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    borderWidth: 1,
  },

  /* Blur interior */
  blurCard: {
    padding: 40,
    // paddingTop: 20,
    // paddingBottom: 30,
  },

  /* Top 3-dot accent */
  topAccentBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 18,
  },
  accentDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4F8EF7',
    opacity: 0.5,
  },

  /* Opening quote */
  quoteMark: {
    fontSize: 64,
    color: 'rgba(79,142,247,0.45)',
    fontWeight: '900',
    lineHeight: 52,
    marginBottom: -8,
    textAlign: 'left',
    letterSpacing: -2,
  },

  /* Body text */
  quoteText: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 31,
    textAlign: 'center',
    marginBottom: 26,
    letterSpacing: 0.15,
  },

  /* Thin full-width divider */
  dividerRow: {
    marginBottom: 18,
  },
  dividerLine: {
    height: 1,
    width: '100%',
    borderRadius: 1,
  },

  /* Author */
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  authorAccentLine: {
    width: 20,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#4F8EF7',
    marginRight: 9,
  },
  quoteAuthor: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4F8EF7',
    fontStyle: 'italic',
    letterSpacing: 0.3,
  },
});