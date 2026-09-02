import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roberto Jr M. Prisoris",
  description:
    "Portfolio of Roberto Jr M. Prisoris, a Web & Mobile App Developer/Graphics Designer from City of Mati, Davao Oriental, Philippines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
