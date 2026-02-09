// app/layout.tsx
import "./globals.css";
import { cookies } from "next/headers";
import AppProviderWrapper from "@/components/AppProviderWrapper";

export const metadata = {
  title: "My App",
  description: "My App description",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();

  const initialLang = cookieStore.get("lang")?.value === "he" ? "he" : "en";
  const initialMode = cookieStore.get("mode")?.value === "dark" ? "dark" : "light";

  return (
    <html lang={initialLang} dir={initialLang === "he" ? "rtl" : "ltr"}>
      <body>
        <AppProviderWrapper initialLang={initialLang} initialMode={initialMode}>
          {children}
        </AppProviderWrapper>
      </body>
    </html>
  );
}
