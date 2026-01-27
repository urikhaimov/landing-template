"use client";

import { AppProvider } from "../lib/AppContext";
import ThemeWrapper from "./ThemeWrapper";
import NavbarClientWrapper from "./NavbarClientWrapper";

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <ThemeWrapper>
        <NavbarClientWrapper />
        {children}
      </ThemeWrapper>
    </AppProvider>
  );
}
