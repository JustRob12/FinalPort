import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roberto Prisoris – Full Stack Web Developer",
  description:
    "Portfolio of Roberto Prisoris, a Full Stack Web Developer from City of Mati, Davao Oriental, Philippines.",
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
