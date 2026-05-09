import { Stack } from "expo-router";
import { ThemeProvider, useTheme } from "../src/utils/theme/ThemeProvider";
import * as SystemUI from 'expo-system-ui';
import { useEffect } from "react";

function RootStack() {
  const { theme, isDark } = useTheme();

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.bg);
  }, [isDark]);

  return (
    <Stack screenOptions={{
      headerShown: false,
      animation: "none",
      contentStyle: { backgroundColor: theme.bg },
    }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="auth_screen" />
      <Stack.Screen name="subjects" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootStack />
    </ThemeProvider>
  );
}