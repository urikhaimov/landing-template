// lib/AppContext.tsx
"use client";

import { createContext } from "react";
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
