"use client";

import AppContext from "@/lib/AppContext";
import ThemeRegistry from "./ThemeRegistry";
import NavbarClientWrapper from "./Navbar/NavbarClientWrapper";
import { ReactNode, useState, useMemo } from "react";
import { ui as LANG_PACKS } from "@/lib/i18n";

export default function AppProviderWrapper({
  children,
  initialMode,
  initialLang,
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
      const next = prev === "he" ? "en" : "he";
      document.cookie = `lang=${next}; path=/; max-age=31536000`;
      return next;
    });
  };

  const ui = useMemo(() => LANG_PACKS[lang], [lang]);

  return (
    <AppContext.Provider
      value={{ mode, lang, ui, toggleMode, toggleLang }}
    >
      <ThemeRegistry mode={mode}>
        <NavbarClientWrapper />
        {children}
      </ThemeRegistry>
    </AppContext.Provider>
  );
}
