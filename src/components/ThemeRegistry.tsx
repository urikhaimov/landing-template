"use client";

import { ReactNode, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
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

  const cache = useMemo(
    () =>
      createCache({
        key: direction === "rtl" ? "mui-rtl" : "mui-ltr",
        stylisPlugins: [],
      }),
    [direction]
  );

  const theme = useMemo(
    () =>
      createTheme({
        direction,
        palette: { mode },
      }),
    [direction, mode]
  );

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
