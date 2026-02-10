"use client";

import {
  ReactNode,
  useState,
  useMemo,
  useCallback,
  useLayoutEffect,
} from "react";
import AppContext from "@/lib/AppContext";
import ThemeRegistry from "@/components/ThemeRegistry";
import { ui as LANG_PACKS } from "@/lib/i18n";
import NavbarClientWrapper from "./Navbar/NavbarClientWrapper";

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

  // 🔥 CRITICAL FIX: useLayoutEffect runs BEFORE hydration
  useLayoutEffect(() => {
    const html = document.documentElement;
    html.setAttribute("dir", lang === "he" ? "rtl" : "ltr");
    html.lang = lang;
  }, [lang]);

  const toggleMode = useCallback(() => {
    setMode((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.cookie = `mode=${next}; path=/; max-age=31536000`;
      return next;
    });
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === "he" ? "en" : "he";

      // update cookie
      document.cookie = `lang=${next}; path=/; max-age=31536000`;

      // update <html> immediately (no flicker)
      const html = document.documentElement;
      html.setAttribute("dir", next === "he" ? "rtl" : "ltr");
      html.lang = next;

      return next;
    });
  }, []);

  // stable UI object
  const ui = useMemo(() => LANG_PACKS[lang], [lang]);

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
        {/* Navbar must be inside ThemeRegistry */}
        <NavbarClientWrapper />

        {children}
      </ThemeRegistry>
    </AppContext.Provider>
  );
}
