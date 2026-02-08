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

  const initialMode =
    cookieStore.get("mode")?.value === "dark" ? "dark" : "light";

  const initialLang =
    cookieStore.get("lang")?.value === "en" ? "en" : "he";

  return (
    <html lang="en" dir="ltr">
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
