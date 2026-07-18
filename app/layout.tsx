import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KOPOSQUAD | Suomen kasvava striimaajatiimi",
  description:
    "KOPOSQUAD yhdistää striimaajat, sisällöntuottajat ja yhteisön.",

  openGraph: {
    title: "KOPOSQUAD | Suomen kasvava striimaajatiimi",
    description:
      "KOPOSQUAD yhdistää striimaajat, sisällöntuottajat ja yhteisön.",
    url: "https://koposquad.vercel.app",
    siteName: "KOPOSQUAD",
    images: [
      {
        url: "/images/publicog-image.png",
        width: 1200,
        height: 630,
        alt: "KOPOSQUAD",
      },
    ],
    locale: "fi_FI",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "KOPOSQUAD | Suomen kasvava striimaajatiimi",
    description:
      "KOPOSQUAD yhdistää striimaajat, sisällöntuottajat ja yhteisön.",
    images: ["/images/publicog-image.png"],
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
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}