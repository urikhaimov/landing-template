"use client";

import { createContext, useMemo, useState, useEffect } from "react";
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

  const toggleLang = () => {
    const nextLang = lang === "he" ? "en" : "he";
    setLang(nextLang);
    document.cookie = `lang=${nextLang}; path=/`;
  };

  const toggleMode = () => {
    const nextMode = mode === "dark" ? "light" : "dark";
    setMode(nextMode);
    document.cookie = `mode=${nextMode}; path=/`;
  };

  const value = useMemo(
    () => ({
      lang,
      mode,
      ui: ui[lang],
      toggleLang,
      toggleMode,
    }),
    [lang, mode] // only primitive state
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
