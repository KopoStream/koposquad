import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://koposquad.vercel.app"),

  title: {
    default: "KOPOSQUAD | Suomen kasvava striimaajatiimi",
    template: "%s | KOPOSQUAD",
  },

  description:
    "KOPOSQUAD on suomalainen striimaaja- ja sisällöntuottajayhteisö. Tutustu tiimin jäseniin, katso kuka on livenä ja hae mukaan yhteisöön.",

  keywords: [
    "KOPOSQUAD",
    "KopoSquad",
    "suomalaiset striimaajat",
    "striimaajatiimi",
    "Twitch Suomi",
    "Twitch-tiimi",
    "sisällöntuottajat",
    "striimaajayhteisö",
    "suomalainen Twitch-yhteisö",
    "KopoStream",
  ],

  authors: [
    {
      name: "KOPOSQUAD",
    },
  ],

  creator: "KOPOSQUAD",
  publisher: "KOPOSQUAD",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "KOPOSQUAD | Suomen kasvava striimaajatiimi",
    description:
      "Tutustu KOPOSQUADin striimaajiin ja sisällöntuottajiin, katso kuka on livenä ja hae mukaan kasvavaan yhteisöön.",
    url: "/",
    siteName: "KOPOSQUAD",
    images: [
      {
        url: "/images/publicog-image.png",
        width: 1200,
        height: 630,
        alt: "KOPOSQUAD – Suomen kasvava striimaajatiimi",
      },
    ],
    locale: "fi_FI",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "KOPOSQUAD | Suomen kasvava striimaajatiimi",
    description:
      "Tutustu KOPOSQUADin striimaajiin ja sisällöntuottajiin, katso kuka on livenä ja hae mukaan yhteisöön.",
    images: ["/images/publicog-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}