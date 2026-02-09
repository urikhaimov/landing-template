"use client";

import { createContext, useMemo, useState, useCallback } from "react";
import { ui, type Locale } from "./i18n";

export interface AppContextType {
  lang: Locale;
  mode: "light" | "dark";
  ui: typeof ui["he"];
  toggleLang: () => void;
  toggleMode: () => void;
}

const AppContext = createContext<AppContextType | null>(null);
export default AppContext;

export function AppProvider({
  children,
  initialLang,
  initialMode,
}: {
  children: React.ReactNode;
  initialLang: Locale;
  initialMode: "light" | "dark";
}) {
  const [lang, setLang] = useState<Locale>(initialLang);
  const [mode, setMode] = useState<"light" | "dark">(initialMode);

  // 🔥 FIX 1 — stable callbacks so React Compiler won't complain
  const toggleLang = useCallback(() => {
    setLang(prev => {
      const next = prev === "he" ? "en" : "he";
      document.cookie = `lang=${next}; path=/`;

      // Update <html> attributes instantly
      document.documentElement.setAttribute("dir", next === "he" ? "rtl" : "ltr");
      document.documentElement.lang = next;

      return next;
    });
  }, []);

  const toggleMode = useCallback(() => {
    setMode(prev => {
      const next = prev === "dark" ? "light" : "dark";
      document.cookie = `mode=${next}; path=/`;
      return next;
    });
  }, []);

  // 🔥 FIX 2 — dependency array now correct because callbacks are stable
  const value = useMemo(
    () => ({
      lang,
      mode,
      ui: ui[lang],
      toggleLang,
      toggleMode,
    }),
    [lang, mode, toggleLang, toggleMode]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
