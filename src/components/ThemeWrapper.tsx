"use client";

import { useContext } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AppContext } from "../lib/AppContext";
import { lightTheme, darkTheme } from "../lib/theme";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const context = useContext(AppContext);
  if (!context) return null;

  const { mode } = context;

  return (
    <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
