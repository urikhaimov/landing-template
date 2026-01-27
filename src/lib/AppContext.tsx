"use client";

import { createContext, useState, useEffect, useMemo } from "react";
import { ui, type Locale, type LanguagePack } from "./i18n";

export interface AppContextType {
  lang: Locale;
  mode: "light" | "dark";
  ui: LanguagePack;
  toggleLang: () => void;
  toggleMode: () => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // -------------------------------------
  // Load initial state WITHOUT an effect
  // Lazy initialization (SSR safe)
  // -------------------------------------
  const [lang, setLang] = useState<Locale>(() => {
    if (typeof window === "undefined") return "he";
    return (localStorage.getItem("lang") as Locale) || "he";
  });

  const [mode, setMode] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("mode") as "light" | "dark") || "light";
  });

  // -------------------------------------
  // Persist to localStorage when changed
  // -------------------------------------
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  // -------------------------------------
  // Memoized context value
  // -------------------------------------
  const value = useMemo(
    () => ({
      lang,
      mode,
      ui: ui[lang],
      toggleLang: () => setLang((prev) => (prev === "he" ? "en" : "he")),
      toggleMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [lang, mode]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
