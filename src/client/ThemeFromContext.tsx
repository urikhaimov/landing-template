"use client";

import { useContext, type ReactNode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import AppContext from "../lib/AppContext";
import { getTheme } from "../lib/theme";

interface ThemeFromContextProps {
  children: ReactNode;
}

export default function ThemeFromContext({ children }: ThemeFromContextProps) {
  const ctx = useContext(AppContext);

  const mode = ctx?.mode ?? "light";
  const lang = ctx?.lang ?? "en";

  const theme = getTheme(mode, lang);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
