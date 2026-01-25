"use client";

import { useContext, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AppContext } from "@/lib/AppContext";
import { lightTheme, darkTheme } from "@/lib/theme";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = useContext(AppContext);
  if (!context) return null;

  const { mode, lang } = context;

  // Fix RTL direction on first render
  useEffect(() => {
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
