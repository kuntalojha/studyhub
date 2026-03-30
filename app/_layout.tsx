import { Stack } from "expo-router";
import { ThemeProvider } from "../src/utils/theme/ThemeProvider";
 
export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
 