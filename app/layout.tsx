import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KOPOSQUAD | Suomen kasvava striimaajatiimi",
  description:
    "KOPOSQUAD yhdistää striimaajat, sisällöntuottajat ja yhteisön.",
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