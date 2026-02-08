"use client";

import { createTheme, Theme } from "@mui/material/styles";

const baseTheme = createTheme();

function removeShadows(shadows: Theme["shadows"]): Theme["shadows"] {
  return shadows.map(() => "none") as Theme["shadows"];
}

const shared = {
  direction: "rtl" as const,
  typography: {
    fontFamily: "Inter, Helvetica, Arial, sans-serif",
  },
  shape: { borderRadius: 10 },
};

export const lightTheme = createTheme({
  ...shared,
  palette: {
    mode: "light",
    background: { default: "#f5f5f7", paper: "#ffffff" },
    text: { primary: "#1a1a1a" },
  },
  shadows: baseTheme.shadows,
});

export const darkTheme = createTheme({
  ...shared,
  palette: {
    mode: "dark",
    background: { default: "#0d0d0d", paper: "#151515" },
    text: { primary: "#ffffff" },
  },
  shadows: removeShadows(baseTheme.shadows),
});
