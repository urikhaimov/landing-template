

import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "@/lib/theme";

export default function ThemeRegistry({
  children,
  mode,
}: {
  children: React.ReactNode;
  mode: "light" | "dark";
}) {
  const theme = mode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
