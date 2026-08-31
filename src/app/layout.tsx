import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import PageLayout from "@/components/layout/PageLayout";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import { siteUrl } from "@/lib/config";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const THEME_SCRIPT = `(function(){try{var s=localStorage.getItem("jdp-theme");var t=(s==="light"||s==="dark")?s:null;if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}var r=document.documentElement;r.classList.toggle("dark",t==="dark");r.style.colorScheme=t;}catch(e){}})();`;

export const viewport: Viewport = {
  themeColor: "#14532d",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl().replace(/\/+$/, "")),
  title: {
    default: "Jardim das Perdizes Broker",
    template: "%s | Jardim das Perdizes Broker",
  },
  description:
    "Broker independente especializado no Jardim das Perdizes, em Perdizes (São Paulo). Conteúdo de autoridade, imóveis verificados e consultoria para quem quer comprar, alugar ou investir no bairro.",
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="theme-color" content="#14532d" />
      </head>
      <body className="min-h-full">
        {/* Anti-FOUC: apply the stored/OS theme before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <ThemeProvider>
          <PageLayout>{children}</PageLayout>
        </ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}

