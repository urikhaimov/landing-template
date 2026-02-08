import "./globals.css";
import { cookies } from "next/headers";
import AppProviderWrapper from "@/components/AppProviderWrapper";

export const metadata = {
  title: "My App",
  description: "My App description",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();

  const initialMode =
    cookieStore.get("mode")?.value === "dark" ? "dark" : "light";

  const initialLang =
    cookieStore.get("lang")?.value === "he" ? "he" : "en";

  return (
    <html lang={initialLang} dir={initialLang === "he" ? "rtl" : "ltr"}>
      <body>
        <AppProviderWrapper
          initialMode={initialMode}
          initialLang={initialLang}
        >
          {children}
        </AppProviderWrapper>
      </body>
    </html>
  );
}
