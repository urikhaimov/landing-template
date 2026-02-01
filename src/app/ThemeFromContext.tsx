"use client";

import { useContext } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AppContext } from "../lib/AppContext";
import { lightTheme, darkTheme } from "../lib/theme";

export default function ThemeFromContext({ children }: { children: React.ReactNode }) {
  const ctx = useContext(AppContext);

  const mode = ctx?.mode ?? "light";
  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
