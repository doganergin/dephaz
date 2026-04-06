import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DepHaz — Deprem Hazırlık Rehberi",
  description: "Türkiye için bölgesel deprem risk analizi, aile planı ve 72h çanta hazırlık rehberi",
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
      </head>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">
        <LanguageProvider>
          <NavBar />
          <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 pb-12">
            {children}
          </main>
          <footer className="max-w-2xl mx-auto w-full px-4 py-5 border-t border-[var(--border)] space-y-3">
            {/* Atatürk Sözü */}
            <div className="flex items-center gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Ataturk1930s.jpg/60px-Ataturk1930s.jpg"
                alt="Mustafa Kemal Atatürk"
                width={40}
                height={50}
                className="rounded-lg object-cover shrink-0"
                style={{ height: '50px', width: '40px' }}
              />
              <div>
                <p className="text-[12px] italic text-[var(--foreground)] leading-snug">
                  &ldquo;Hayatta en hakiki mürşit ilimdir.&rdquo;
                </p>
                <p className="text-[10px] text-[var(--muted)] mt-0.5 font-medium">
                  — Mustafa Kemal Atatürk
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[11px] text-[var(--muted)] text-center">
                Deprem verileri: <span className="font-medium">Kandilli Rasathanesi (KOERI)</span> · Fay verileri: <span className="font-medium">MTA Aktif Fay Haritası</span>
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
