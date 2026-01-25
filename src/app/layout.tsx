"use client";

import "./globals.css";
import ClientRoot from "@/components/ClientRoot";

export default function RootLayout({ children }:  { children: React.ReactNode }) {
  return (
    <html lang="he">
      <body suppressHydrationWarning={true}>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
