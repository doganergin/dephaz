import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import AtaturkBanner from "@/components/AtaturkBanner";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deprem Hattı — Deprem Hazırlık Rehberi",
  description: "Deprem Hattı ile bölgenizin zemin yapısını inceleyin, deprem riskini öğrenin ve hazırlık adımlarını keşfedin.",
  icons: {
    icon: "/gecicilogo.png",
    apple: "/gecicilogo.png",
  },
  openGraph: {
    title: "Deprem Hattı — Deprem Hazırlık Rehberi",
    description: "Deprem Hattı ile bölgenizin zemin yapısını inceleyin, deprem riskini öğrenin ve hazırlık adımlarını keşfedin.",
    images: [{ url: "/gecicilogo.png", width: 1200, height: 630, alt: "Deprem Hattı" }],
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deprem Hattı — Deprem Hazırlık Rehberi",
    description: "Deprem Hattı ile bölgenizin zemin yapısını inceleyin, deprem riskini öğrenin ve hazırlık adımlarını keşfedin.",
    images: ["/gecicilogo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={geist.className}>
      <head>
        {/* Dark mode anti-flash: reads localStorage before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(t==null&&m))document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
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
          <div className="max-w-2xl mx-auto w-full px-4 pt-3">
            <AtaturkBanner />
          </div>
          <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-4 pb-12">
            {children}
          </main>
          <footer className="max-w-2xl mx-auto w-full px-4 py-5 border-t border-[var(--border)] space-y-3">
            <div className="space-y-1">
              <p className="text-[11px] text-[var(--muted)] text-center">
                Deprem verileri: <span className="font-medium">Kandilli Rasathanesi (KOERI)</span> · <span className="font-medium">AFAD</span> · <span className="font-medium">USGS</span> · Fay verileri: <span className="font-medium">MTA Aktif Fay Haritası</span>
              </p>
              <p className="text-[11px] text-[var(--muted)] text-center">
                © 2026 <span className="font-semibold">Doğan Ergin</span> · Tüm haklar saklıdır.
              </p>
            </div>
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
