"use client";

import AppContext from "@/lib/AppContext";
import ThemeRegistry from "./ThemeRegistry";
import NavbarClientWrapper from "./Navbar/NavbarClientWrapper";
import { ReactNode, useState, useMemo } from "react";
import { ui as uiPacks } from "@/lib/i18n";

export default function AppProviderWrapper({
  children,
  initialMode,
  initialLang,
}: {
  children: ReactNode;
  initialMode: "light" | "dark";
  initialLang: "en" | "he";
}) {
  const [mode, setMode] = useState(initialMode);
  const [lang, setLang] = useState(initialLang);

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.cookie = `mode=${next}; path=/; max-age=31536000`;
      return next;
    });
  };

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === "en" ? "he" : "en";
      document.cookie = `lang=${next}; path=/; max-age=31536000`;
      return next;
    });
  };

  // 🔥 Get the correct language pack without require()
  const ui = useMemo(() => uiPacks[lang], [lang]);

  const value = useMemo(
    () => ({
      mode,
      lang,
      ui,
      toggleMode,
      toggleLang,
    }),
    [mode, lang, ui]
  );

  return (
    <AppContext.Provider value={value}>
      <ThemeRegistry mode={mode}>
        <NavbarClientWrapper />
        {children}
      </ThemeRegistry>
    </AppContext.Provider>
  );
}
