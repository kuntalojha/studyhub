import React, { useState, useRef } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, Animated,
  Dimensions, ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { COLORS } from "../../src/constants/colors";

const { width, height } = Dimensions.get("window");

const USE_NATIVE_DRIVER = Platform.OS !== "web";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<"username" | "password" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const shakeAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: USE_NATIVE_DRIVER }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: USE_NATIVE_DRIVER }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 60, useNativeDriver: USE_NATIVE_DRIVER }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: USE_NATIVE_DRIVER }),
    ]).start();
  };

  const pressIn = () =>
    Animated.spring(buttonScale, { toValue: 0.97, useNativeDriver: USE_NATIVE_DRIVER }).start();

  const pressOut = () =>
    Animated.spring(buttonScale, { toValue: 1, friction: 3, useNativeDriver: USE_NATIVE_DRIVER }).start();

  const handleLogin = () => {
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      shake();
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const isValid = username === "admin" && password === "1234";
      if (isValid) {
        router.replace("/dashboard" as any);
      } else {
        setError("Invalid username or password.");
        shake();
      }
    }, 1000);
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <LinearGradient
        colors={[COLORS.bg1, COLORS.bg2, "#0C1530"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
      />

      <View style={styles.orb1} />
      <View style={styles.orb2} />
      <View style={styles.orb3} />

      <View style={styles.gridOverlay} pointerEvents="none">
        {Array.from({ length: 8 }).map((_, i) => (
          <View key={i} style={[styles.gridLine, { left: (width / 8) * i }]} />
        ))}
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Brand */}
          <View style={styles.brandSection}>
            <View style={styles.logoRing}>
              <LinearGradient
                colors={[COLORS.accent, COLORS.gold]}
                style={styles.logoGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.logoIcon}>✦</Text>
              </LinearGradient>
            </View>
            <Text style={styles.brandName}>StudyHub</Text>
          </View>

          {/* Card */}
          <Animated.View style={[styles.card, { transform: [{ translateX: shakeAnim }] }]}>
            <BlurView intensity={18} tint="dark" style={styles.blurCard}>
              <View style={styles.cardInner}>
                <Text style={styles.cardTitle}>Welcome back</Text>
                <Text style={styles.cardSubtitle}>Sign in to continue your journey</Text>

                {error ? (
                  <View style={styles.errorBanner}>
                    <Text style={styles.errorText}>⚠ {error}</Text>
                  </View>
                ) : null}

                {/* Username */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>USERNAME</Text>
                  <View style={[styles.inputWrapper, focusedField === "username" && styles.inputWrapperFocused]}>
                    <Text style={styles.inputIcon}>✉</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter username"
                      placeholderTextColor={COLORS.muted}
                      value={username}
                      onChangeText={setUsername}
                      onFocus={() => setFocusedField("username")}
                      onBlur={() => setFocusedField(null)}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                </View>

                {/* Password */}
                <View style={styles.fieldGroup}>
                  <View style={styles.fieldLabelRow}>
                    <Text style={styles.fieldLabel}>PASSWORD</Text>
                    <TouchableOpacity>
                      <Text style={styles.forgotText}>Forgot password?</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.inputWrapper, focusedField === "password" && styles.inputWrapperFocused]}>
                    <Text style={styles.inputIcon}>🔒</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="••••••••"
                      placeholderTextColor={COLORS.muted}
                      value={password}
                      onChangeText={setPassword}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                      <Text style={styles.eyeIcon}>{showPassword ? "👁" : "🙈"}</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Button */}
                <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                  <TouchableOpacity
                    onPress={handleLogin}
                    onPressIn={pressIn}
                    onPressOut={pressOut}
                    activeOpacity={1}
                    disabled={loading}
                  >
                    <LinearGradient
                      colors={["#4F8EF7", "#2563EB"]}
                      style={styles.loginBtn}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      {loading
                        ? <ActivityIndicator color={COLORS.white} />
                        : <Text style={styles.loginBtnText}>Sign In →</Text>
                      }
                    </LinearGradient>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </BlurView>
          </Animated.View>

          {/* Feature chips */}
          <View style={styles.featureStrip}>
            {["📚 Smart Notes", "🧠 AI Tutor", "📊 Progress"].map((f) => (
              <View key={f} style={styles.featureChip}>
                <Text style={styles.featureText}>{f}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg1 },
  flex: { flex: 1 },
  orb1: { position: "absolute", top: -80, right: -60, width: 260, height: 260, borderRadius: 130, backgroundColor: "rgba(79,142,247,0.12)" },
  orb2: { position: "absolute", top: height * 0.35, left: -100, width: 220, height: 220, borderRadius: 110, backgroundColor: "rgba(255,209,102,0.07)" },
  orb3: { position: "absolute", bottom: 60, right: -40, width: 160, height: 160, borderRadius: 80, backgroundColor: "rgba(79,142,247,0.08)" },
  gridOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  gridLine: { position: "absolute", top: 0, bottom: 0, width: 1, backgroundColor: "rgba(255,255,255,0.025)" },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 70, paddingBottom: 40, alignItems: "center" },
  brandSection: { alignItems: "center", marginBottom: 36 },
  logoRing: { width: 68, height: 68, borderRadius: 20, padding: 3, backgroundColor: "rgba(79,142,247,0.15)", marginBottom: 14, shadowColor: COLORS.accent, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 20, elevation: 10 },
  logoGradient: { flex: 1, borderRadius: 17, alignItems: "center", justifyContent: "center" },
  logoIcon: { fontSize: 28, color: COLORS.white },
  brandName: { fontSize: 30, fontWeight: "800", color: COLORS.white, letterSpacing: 0.5 },
  card: { width: "100%", borderRadius: 24, overflow: "hidden", marginBottom: 20 },
  blurCard: { borderRadius: 24 },
  cardInner: { padding: 28, borderWidth: 1, borderColor: "rgba(255,255,255,0.09)", borderRadius: 24, backgroundColor: COLORS.cardBg },
  cardTitle: { fontSize: 22, fontWeight: "700", color: COLORS.white, marginBottom: 4 },
  cardSubtitle: { fontSize: 13, color: COLORS.muted, marginBottom: 22 },
  errorBanner: { backgroundColor: "rgba(255,107,107,0.12)", borderWidth: 1, borderColor: "rgba(255,107,107,0.3)", borderRadius: 10, padding: 10, marginBottom: 16 },
  errorText: { color: COLORS.error, fontSize: 13 },
  fieldGroup: { marginBottom: 16 },
  fieldLabel: { color: "rgba(255,255,255,0.65)", fontSize: 11, fontWeight: "600", marginBottom: 8, letterSpacing: 1 },
  fieldLabelRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  forgotText: { color: COLORS.accentLight, fontSize: 12 },
  inputWrapper: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.inputBg, borderWidth: 1, borderColor: COLORS.inputBorder, borderRadius: 12, paddingHorizontal: 14, height: 52 },
  inputWrapperFocused: { borderColor: COLORS.inputBorderFocus, backgroundColor: "rgba(79,142,247,0.08)" },
  inputIcon: { fontSize: 16, marginRight: 10, color: COLORS.muted },
  input: { flex: 1, color: COLORS.white, fontSize: 15 },
  eyeBtn: { padding: 4 },
  eyeIcon: { fontSize: 16 },
  loginBtn: { height: 52, borderRadius: 14, alignItems: "center", justifyContent: "center", marginTop: 8, shadowColor: COLORS.accent, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 14, elevation: 8 },
  loginBtnText: { color: COLORS.white, fontSize: 16, fontWeight: "700", letterSpacing: 0.3 },
  featureStrip: { flexDirection: "row", gap: 8, flexWrap: "wrap", justifyContent: "center" },
  featureChip: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  featureText: { color: COLORS.muted, fontSize: 12 },
});