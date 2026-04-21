import { router } from "expo-router";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { BlurView } from "expo-blur";
import { useTheme } from "@/src/utils/theme/ThemeProvider";
import PageLayout from "../page_layout/PageLayout";
import quotes from "../subjects/dslab/quotes.json";

export default function DashboardScreen() {
  const { theme, isDark } = useTheme();

  // Get current quote index based on 30-minute block increments
  // 30 minutes = 30 * 60 * 1000 = 1800000 ms
  const getQuoteIndex = () => Math.floor(Date.now() / 1800000) % quotes.length;

  const [quoteIndex, setQuoteIndex] = useState(getQuoteIndex());
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Check every 10 seconds if we have entered a new half-hour block
    const interval = setInterval(() => {
      const newIndex = getQuoteIndex();
      if (newIndex !== quoteIndex) {
        // Fade out
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }).start(() => {
          // Switch quote while invisible
          setQuoteIndex(newIndex);
          // Fade back in
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }).start();
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [quoteIndex, fadeAnim]);

  const currentQuote = quotes[quoteIndex];

  return (
    <PageLayout onLogout={() => router.replace("/auth_screen/login")}>
      <View style={styles.container}>
        <Animated.View style={{ opacity: fadeAnim, width: '100%' }}>
          <View style={styles.cardWrapper}>
            <BlurView
              intensity={isDark ? 30 : 60}
              tint={isDark ? "dark" : "light"}
              style={styles.blurCard}
            >
              <Text style={styles.quoteMark}>"</Text>
              <Text style={[styles.quoteText, { color: theme.textPrimary || (isDark ? '#fff' : '#111') }]}>
                {currentQuote.text}
              </Text>
              <View style={styles.authorRow}>
                <View style={styles.authorLine} />
                <Text style={styles.quoteAuthor}>
                  {currentQuote.author}
                </Text>
              </View>
            </BlurView>
          </View>
        </Animated.View>
      </View>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingHorizontal: 24, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  cardWrapper: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    shadowColor: '#4F8EF7',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  blurCard: {
    padding: 32,
    paddingTop: 24,
  },
  quoteMark: {
    fontSize: 76,
    color: 'rgba(79,142,247,0.35)', 
    fontWeight: '900',
    marginBottom: -40,
    textAlign: 'left',
  },
  quoteText: {
    fontSize: 21,
    fontWeight: '600',
    lineHeight: 32,
    textAlign: 'center',
    marginBottom: 28,
    zIndex: 1,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  authorLine: {
    width: 24,
    height: 2,
    backgroundColor: '#4F8EF7',
    marginRight: 10,
  },
  quoteAuthor: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4F8EF7',
    fontStyle: 'italic',
  },
});