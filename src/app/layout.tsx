import "./globals.css";
import ClientRoot from "../components/ClientRoot";

export const metadata = {
  title: "Landing Template",
  description: "Premium landing page template",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he">
      <body>
        <ClientRoot>
          {children}
        </ClientRoot>
      </body>
    </html>
  );
}
