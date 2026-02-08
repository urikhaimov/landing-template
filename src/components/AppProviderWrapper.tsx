"use client";

import { ReactNode, useState, useMemo } from "react";
import AppContext from "@/lib/AppContext";
import ThemeRegistry from "./ThemeRegistry";
import NavbarClientWrapper from "./Navbar/NavbarClientWrapper";
import { ui as uiPacks } from "@/lib/i18n";

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

  // 🟦 Always pull UI from your i18n dictionary
  const ui = useMemo(() => uiPacks[lang], [lang]);

  const value = useMemo(
    () => ({
      mode,
      lang,
      ui,

      toggleMode: () =>
        setMode((prev) => (prev === "dark" ? "light" : "dark")),

      toggleLang: () =>
        setLang((prev) => (prev === "en" ? "he" : "en")),
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
