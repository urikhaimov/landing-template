"use client";

import { ReactNode, useMemo } from "react";
import {
  ThemeProvider,
  CssBaseline,
  StyledEngineProvider,
} from "@mui/material";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { lightTheme, darkTheme } from "@/lib/theme";

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

  // ------------------------------------------------------------------
  // 🔥 IMPORTANT: Emotion Cache MUST be stable across SSR + Client
  // ------------------------------------------------------------------
  const cache = useMemo(
    () =>
      createCache({
        key: direction === "rtl" ? "mui-rtl" : "mui-ltr",
        prepend: true, // ensures styles load FIRST -> prevents unstyled page
      }),
    [direction]
  );

  // ------------------------------------------------------------------
  // 🔥 Choose existing theme and inject dynamic direction
  // ------------------------------------------------------------------
  const theme = useMemo(() => {
    const base = mode === "dark" ? darkTheme : lightTheme;
    return { ...base, direction };
  }, [mode, direction]);

  return (
    <CacheProvider value={cache}>
      {/* Inject MUI styles FIRST before anything else */}
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
}
