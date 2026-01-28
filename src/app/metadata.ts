import type { Metadata } from "next";

export const siteConfig = {
  name: "Landing Pro — Premium Web Design",
  description:
    "Fast, modern, bilingual landing pages built with Next.js. High performance, SEO-ready, and fully responsive.",
  url: "https://your-domain.com",
  ogImage: "/og-image.png",
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: "%s | Landing Pro",
  },
  description: siteConfig.description,
  keywords: [
    "Landing Page",
    "Web Design",
    "Next.js",
    "React",
    "SEO",
    "מפתח אתרים",
    "דפי נחיתה",
  ],

  metadataBase: new URL(siteConfig.url),

  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Landing Pro",
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Landing Pro Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: siteConfig.url,
    languages: {
      en: `${siteConfig.url}/en`,
      he: `${siteConfig.url}/he`,
    },
  },
};
