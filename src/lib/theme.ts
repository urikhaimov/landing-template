"use client";

import { createTheme } from "@mui/material/styles";
import type { Theme, Direction } from "@mui/material/styles";

function removeShadows(shadows: Theme["shadows"]): Theme["shadows"] {
  return shadows.map(() => "none") as Theme["shadows"];
}

export function getTheme(mode: "light" | "dark", lang: "he" | "en") {
  // ✔ Correctly typed direction
  const direction: Direction = lang === "he" ? "rtl" : "ltr";

  // Base theme to inherit correct shadow array length
  const base = createTheme({ direction });

  // Shared properties with correct types
  const shared = {
    direction,
    typography: {
      fontFamily: "Inter, Helvetica, Arial, sans-serif",
    },
    shape: { borderRadius: 10 },
  };

  // ✔ Light theme
  const light = createTheme({
    ...shared,
    palette: {
      mode: "light",
      background: { default: "#f5f5f7", paper: "#ffffff" },
      text: { primary: "#1a1a1a" },
    },
    shadows: base.shadows,
  });

  // ✔ Dark theme
  const dark = createTheme({
    ...shared,
    palette: {
      mode: "dark",
      background: { default: "#0d0d0d", paper: "#151515" },
      text: { primary: "#ffffff" },
    },
    shadows: removeShadows(base.shadows),
  });

  return mode === "light" ? light : dark;
}
