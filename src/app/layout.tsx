import "./globals.css";
import ClientRoot from "../components/ClientRoot";
import { metadata } from "./metadata";

export { metadata }; // <-- Re-export global metadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
