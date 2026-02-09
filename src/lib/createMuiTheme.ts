"use client";

import { createTheme } from "@mui/material/styles";

export function createMuiTheme(mode: "light" | "dark", lang: "he" | "en") {
  const direction = lang === "he" ? "rtl" : "ltr";

  return createTheme({
    direction, // RTL / LTR applied globally
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: { default: "#f5f5f7", paper: "#ffffff" },
            text: { primary: "#1a1a1a" },
          }
        : {
            background: { default: "#0d0d0d", paper: "#151515" },
            text: { primary: "#ffffff" },
          }),
    },
    typography: {
      fontFamily: "Inter, Helvetica, Arial, sans-serif",
    },
    shape: { borderRadius: 10 },
  });
}
