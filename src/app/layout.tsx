import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import PageLayout from "@/components/layout/PageLayout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

  export const metadata: Metadata = {
    title: "Jardim das Perdizes Broker",
    description:
      "Broker independente especializado no Jardim das Perdizes, em Perdizes (São Paulo). Conteúdo de autoridade, imóveis verificados e consultoria para quem quer comprar, alugar ou investir no bairro.",
  };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}
