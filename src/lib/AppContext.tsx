"use client";
import { createContext, useState } from "react";
import { ui } from "./i18n";
import { Locale, LanguagePack} from "./i18n";

// 1️⃣ Define the type for your context value
export interface AppContextType {
  lang: Locale;
  mode: "light" | "dark";
  ui: LanguagePack;
  toggleLang: () => void;
  toggleMode: () => void;
}

// 2️⃣ Create typed context (not unknown anymore)
export const AppContext = createContext<AppContextType | null>(null);

// 3️⃣ Provider component
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Locale>("he");
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleLang = () => setLang(lang === "he" ? "en" : "he");
  const toggleMode = () => setMode(mode === "light" ? "dark" : "light");

  return (
    <AppContext.Provider
      value={{
        lang,
        mode,
        ui: ui[lang], // Auto-language
        toggleLang,
        toggleMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
