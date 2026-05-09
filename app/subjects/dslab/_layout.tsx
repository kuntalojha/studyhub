import { Stack } from "expo-router";
// import { useTheme } from "../../../src/utils/theme/ThemeProvider";
import { useTheme } from "@/src/utils/theme/ThemeProvider";
export default function DashboardLayout() {
  const { theme } = useTheme();
  return (
    <Stack screenOptions={{
        headerShown: false,
        animation: "none",          // ← kills the flash
        // contentStyle: { backgroundColor: "transparent" },
        contentStyle: { backgroundColor: theme.bg },
      }} />
  );
}