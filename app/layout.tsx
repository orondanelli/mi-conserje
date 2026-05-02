import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const fontDisplay = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
});

const fontBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mi-conserje",
  description:
    "Sistema de registro de visitas y paquetes para edificios con trazabilidad completa para auditorías",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fontDisplay.variable} ${fontBody.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
