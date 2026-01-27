"use client";

import { useContext, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AppContext } from "../lib/AppContext";
import { lightTheme, darkTheme } from "../lib/theme";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const ctx = useContext(AppContext);

  // Always call hooks BEFORE conditionally returning!
  useEffect(() => {
    if (ctx) {
      document.documentElement.setAttribute("data-theme", ctx.mode);
    }
  }, [ctx?.mode]);

  // Now safe to branch AFTER hooks
  if (!ctx) return null;

  const { mode } = ctx;

  return (
    <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
