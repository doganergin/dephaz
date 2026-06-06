import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { trTR } from "@clerk/localizations";
import NavBar from "@/components/NavBar";
import AtaturkBanner from "@/components/AtaturkBanner";
import BackBar from "@/components/BackBar";
import Footer from "@/components/Footer";
import NotificationManager from "@/components/NotificationManager";
import PwaInstallBanner from "@/components/PwaInstallBanner";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deprem Hattı — Deprem Risk Analizi ve Hazırlık Rehberi",
  description: "Bölgenizin deprem riskini öğrenin. Fay mesafesi, zemin yapısı, risk skoru. Canlı deprem takibi, tarihsel depremler ve hazırlık rehberleri.",
  keywords: [
    "deprem hattı", "depremhatti", "deprem riski", "deprem hazırlık", "fay hattı",
    "zemin analizi", "deprem risk skoru", "Türkiye deprem", "İstanbul deprem riski",
    "AFAD", "Kandilli", "deprem çantası", "deprem anında ne yapmalı",
    "canlı deprem", "deprem takibi", "earthquake risk Turkey", "depremhatti.com"
  ],
  metadataBase: new URL("https://depremhatti.com"),
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/favicon-512.png",
  },
  openGraph: {
    title: "Deprem Hattı — Deprem Risk Analizi ve Hazırlık Rehberi",
    description: "Bölgenizin deprem riskini öğrenin. Fay mesafesi, zemin yapısı, risk skoru. Canlı deprem takibi ve hazırlık rehberleri.",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Deprem Hattı" }],
    type: "website",
    locale: "tr_TR",
    siteName: "Deprem Hattı",
    url: "https://depremhatti.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deprem Hattı — Deprem Risk Analizi ve Hazırlık Rehberi",
    description: "Bölgenizin deprem riskini öğrenin. Fay mesafesi, zemin yapısı, risk skoru.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider localization={trTR}>
    <html lang="tr" className={geist.className}>
      <head>
        {/* Dark mode anti-flash: reads localStorage before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=false;if(t==='black'){document.documentElement.classList.add('black');d=true}else if(t==='dark'||(t==null&&m)){document.documentElement.classList.add('dark');d=true}if(d){var p=localStorage.getItem('dh_dark_palette');if(p){try{var c=JSON.parse(p);var r=document.documentElement;r.style.setProperty('--background',c.background);r.style.setProperty('--card-bg',c.cardBg);r.style.setProperty('--border',c.border);r.style.setProperty('--muted',c.muted);r.style.setProperty('--foreground',c.foreground)}catch(e2){}}}}catch(e){}})()`,
          }}
        />
        {/* JSON-LD Yapısal Veri */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://depremhatti.com/#website",
                  "url": "https://depremhatti.com",
                  "name": "Deprem Hattı",
                  "description": "Türkiye deprem risk analizi, canlı deprem takibi ve hazırlık rehberleri.",
                  "inLanguage": "tr-TR",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://depremhatti.com/bolge-analizi?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "Organization",
                  "@id": "https://depremhatti.com/#organization",
                  "name": "Deprem Hattı",
                  "url": "https://depremhatti.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://depremhatti.com/logo.png"
                  },
                  "sameAs": []
                }
              ]
            }),
          }}
        />
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-8704382349010084" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8704382349010084"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">
        <LanguageProvider>
          <NavBar />
          {/* Atatürk Sözü — NavBar altında, sayfanın üstünde */}
          <div className="max-w-2xl lg:max-w-4xl mx-auto w-full px-4 pt-3">
            <AtaturkBanner />
          </div>
          <BackBar />
          <main className="flex-1 max-w-2xl lg:max-w-4xl mx-auto w-full px-4 py-4 pb-12">
            {children}
          </main>
          <Footer />
          <NotificationManager />
          <PwaInstallBanner />
        </LanguageProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
