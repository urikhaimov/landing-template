import "./globals.css";
import { cookies } from "next/headers";
import AppProviderWrapper from "@/components/AppProviderWrapper";

export const metadata = {
  title: "My App",
  description: "My App description",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const mode =
    cookieStore.get("mode")?.value === "dark" ? "dark" : "light";

  const lang =
    cookieStore.get("lang")?.value === "he" ? "he" : "en";

  return (
    <html lang={lang} dir={lang === "he" ? "rtl" : "ltr"}  data-nextjs-devtools="disable">
      <body>
        <AppProviderWrapper initialMode={mode} initialLang={lang}>
          {children}
        </AppProviderWrapper>
      </body>
    </html>
  );
}
