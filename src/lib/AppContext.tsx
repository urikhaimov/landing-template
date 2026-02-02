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

// Utility to read cookies
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1] ?? null;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  // SSR-FRIENDLY INITIALIZERS (no window / no localStorage here!)
  const [lang, setLang] = useState<Locale>("he");
  const [mode, setMode] = useState<"light" | "dark">("light");

  // Load from cookies on client
  useEffect(() => {
    const savedLang = getCookie("lang") || localStorage.getItem("lang");
    const savedMode = getCookie("mode") || localStorage.getItem("mode");

    if (savedLang === "he" || savedLang === "en") setLang(savedLang);
    if (savedMode === "dark" || savedMode === "light") setMode(savedMode);
  }, []);

  // Save back into both cookie + localStorage
  useEffect(() => {
    document.cookie = `lang=${lang}; path=/; max-age=31536000`;
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    document.cookie = `mode=${mode}; path=/; max-age=31536000`;
    localStorage.setItem("mode", mode);
  }, [mode]);

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
