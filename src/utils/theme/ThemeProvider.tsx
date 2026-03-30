import React, { createContext, useContext, useState, ReactNode } from "react";
import { DARK_THEME, LIGHT_THEME, Theme } from "../../constants/ThemeToken";

// ─── Context ─────────────────────────────────────────────────────────────────

type ThemeCtx = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeCtx>({
  theme: DARK_THEME,
  isDark: true,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? DARK_THEME : LIGHT_THEME;
  const toggleTheme = () => setIsDark((v) => !v);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}