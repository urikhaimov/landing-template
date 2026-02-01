import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";
import { AppProvider } from "../lib/AppContext";
import ThemeFromContext from "./ThemeFromContext";
import ClientRoot from "../components/ClientRoot";

export const metadata = {
  title: "Landing Pro",
  description: "Landing Page Generator",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <ThemeRegistry>
          <AppProvider>
            <ThemeFromContext>
              <ClientRoot>{children}</ClientRoot>
            </ThemeFromContext>
          </AppProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
