import { useContext, useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import AppContext from "../lib/AppContext";
import { getTheme } from "../lib/theme";

export default function ThemeFromContext({ children }) {
  const ctx = useContext(AppContext);
  const mode = ctx?.mode ?? "light";
  const lang = ctx?.lang ?? "en";

  const theme = useMemo(() => getTheme(mode, lang), [mode, lang]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
