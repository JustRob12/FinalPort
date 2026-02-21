import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roberto Prisoris",
  description:
    "Portfolio of Roberto Prisoris, a Web & Mobile App Developer/Graphics Designer from City of Mati, Davao Oriental, Philippines.",
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
