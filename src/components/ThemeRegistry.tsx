// components/ThemeRegistry.tsx
"use client";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useMemo } from "react";
import { getTheme } from "@/lib/theme";

function createEmotionCache(dir: "rtl" | "ltr") {
  return createCache({
    key: dir === "rtl" ? "mui-rtl" : "mui-ltr",
    prepend: true,
  });
}

export default function ThemeRegistry({
  children,
  mode,
  lang,
}: {
  children: React.ReactNode;
  mode: "light" | "dark";
  lang: "he" | "en";
}) {
  const direction = lang === "he" ? "rtl" : "ltr";

  const cache = useMemo(() => createEmotionCache(direction), [direction]);
  const theme = useMemo(() => getTheme(mode, lang), [mode, lang]);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
