"use client";

import AppContext from "@/lib/AppContext";
import ThemeRegistry from "./ThemeRegistry";
import NavbarClientWrapper from "./Navbar/NavbarClientWrapper";
import { ReactNode, useState, useMemo, useCallback } from "react";
import { ui as LANG_PACKS } from "@/lib/i18n";

export default function AppProviderWrapper({
  children,
  initialMode,
  initialLang,
}: {
  children: ReactNode;
  initialMode: "light" | "dark";
  initialLang: "he" | "en";
}) {
  const [mode, setMode] = useState(initialMode);
  const [lang, setLang] = useState(initialLang);

  // 🔥 MAKE CALLBACKS STABLE
  const toggleMode = useCallback(() => {
    setMode(prev => {
      const next = prev === "dark" ? "light" : "dark";
      document.cookie = `mode=${next}; path=/; max-age=31536000`;
      return next;
    });
  }, []);

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const next = prev === "he" ? "en" : "he";
      document.cookie = `lang=${next}; path=/; max-age=31536000`;

      // also update <html>
      const html = document.documentElement;
      html.setAttribute("dir", next === "he" ? "rtl" : "ltr");
      html.lang = next;

      return next;
    });
  }, []);

  // 🔥 ui is stable based on lang only
  const ui = useMemo(() => LANG_PACKS[lang], [lang]);

  // 🔥 CONTEXT VALUE: stable because callbacks are stable
  const value = useMemo(
    () => ({
      mode,
      lang,
      ui,
      toggleMode,
      toggleLang,
    }),
    [mode, lang, ui, toggleMode, toggleLang]
  );

  return (
    <AppContext.Provider value={value}>
      <ThemeRegistry mode={mode} lang={lang}>
        <NavbarClientWrapper />
        {children}
      </ThemeRegistry>
    </AppContext.Provider>
  );
}
