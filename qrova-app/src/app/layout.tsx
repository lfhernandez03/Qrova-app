import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Qrova",
  description:
    "Crea, personaliza y analiza QR dinámicos con Qrova, la plataforma de generación de códigos QR fácil de usar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="es" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
        <body className={plusJakartaSans.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
