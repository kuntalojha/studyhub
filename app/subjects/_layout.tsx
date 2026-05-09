import { Stack, router } from "expo-router";
import PageLayout from "@/src/components/layout/PageLayout";
import { useTheme } from "@/src/utils/theme/ThemeProvider";

export default function SubjectsLayout() {
  const { theme } = useTheme();

  return (
    <PageLayout onLogout={() => router.replace("/auth_screen/login")}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none",
          contentStyle: { backgroundColor: theme.bg }, // ← theme color, not transparent
        }}
      />
    </PageLayout>
  );
}