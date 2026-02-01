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
       <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Landing Pro",
              url: "https://your-domain.com",
              logo: "https://your-domain.com/logo.png",
              sameAs: [
                "https://www.facebook.com/",
                "https://www.instagram.com/",
                "https://www.linkedin.com/",
              ],
            }),
          }}
        />
      </head>
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
