import type { Metadata } from "next";
import "./globals.css";
import ClientRoot from "../components/ClientRoot";

export const metadata: Metadata = {
  title: "Landing Page Template",
  description: "Accessible, bilingual, responsive landing page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
