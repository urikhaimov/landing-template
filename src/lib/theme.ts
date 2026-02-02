"use client";

import { createTheme, Theme } from "@mui/material/styles";

//
// Base theme – used only to copy default shadows
//
const baseTheme = createTheme();

//
// Shared theme settings
//
const shared = {
  direction: "rtl" as const,
  typography: {
    fontFamily: "Inter, Helvetica, Arial, sans-serif",
    h1: { fontWeight: 700, fontSize: "2.8rem" },
    h2: { fontWeight: 700, fontSize: "2.2rem" },
    h3: { fontWeight: 600, fontSize: "1.7rem" },
    h4: { fontWeight: 600 },
    button: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: (theme: Theme) => ({
        /* 
         * Strongest fix: force background everywhere
         * No matter what globals.css or browser defaults do.
         */

        html: {
          backgroundColor: `${theme.palette.background.default} !important`,
          color: theme.palette.text.primary,
          minHeight: "100%",
        },

        body: {
          backgroundColor: `${theme.palette.background.default} !important`,
          color: theme.palette.text.primary,
          margin: 0,
          padding: 0,
          minHeight: "100vh",
        },

        "#__next, #__root, main": {
          backgroundColor: `${theme.palette.background.default} !important`,
          minHeight: "100vh",
        },

        "*": {
          transition:
            "background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease",
        },
      }),
    },

    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          transition: "background-color 0.25s ease",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 10,
          paddingInline: "1.2rem",
          fontSize: "0.95rem",
        },
      },
    },
  },
};

//
// LIGHT THEME
//
export const lightTheme = createTheme({
  ...shared,
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#6C63FF" },
    background: {
      default: "#f5f5f7",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#555",
    },
  },

  shadows: baseTheme.shadows, // keep real shadows
});

//
// DARK THEME
//
export const darkTheme = createTheme({
  ...shared,
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#b39ddb" },
    background: {
      default: "#0d0d0d",
      paper: "#151515",
    },
    text: {
      primary: "#ffffff",
      secondary: "#bbbbbb",
    },
  },

  // flatten shadows for dark mode
  shadows: baseTheme.shadows.map(() => "none") as any,
});
