"use client";

import { ReactNode } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  ThemeOptions,
} from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

export default function ThemeRegistry({
  children,
  mode,
  lang,
}: {
  children: ReactNode;
  mode: "light" | "dark";
  lang: "he" | "en";
}) {
  const direction = lang === "he" ? "rtl" : "ltr";

  // Emotion cache must match direction
  const cache = createCache({
    key: direction === "rtl" ? "mui-rtl" : "mui-ltr",
    prepend: true,
  });
  cache.compat = true;

  const themeOptions: ThemeOptions = {
    direction,
    palette: {
      mode,
    },
    typography: {
      fontFamily: lang === "he" ? "Alef, sans-serif" : "Inter, sans-serif",
    },
  };

  const theme = createTheme(themeOptions);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
