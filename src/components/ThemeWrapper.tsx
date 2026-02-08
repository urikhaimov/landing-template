"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import AppContext from "@/lib/AppContext";
import { useContext } from "react";
import { lightTheme, darkTheme } from "@/lib/theme";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const ctx = useContext(AppContext);
  if (!ctx) return children;

  const theme = ctx.mode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
