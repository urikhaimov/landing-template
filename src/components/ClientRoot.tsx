"use client";

import ThemeWrapper from "./ThemeWrapper";
import { AppProvider } from "../lib/AppContext";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <ThemeWrapper>{children}</ThemeWrapper>
    </AppProvider>
  );
}
