import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DepHaz — Deprem Hazırlık Rehberi",
  description: "Türkiye için bölgesel deprem risk analizi, aile planı ve 72h çanta hazırlık rehberi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={geist.className}>
      <body className="min-h-screen bg-gray-50 flex flex-col">
        <NavBar />
        <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 pb-12">
          {children}
        </main>
        <footer className="max-w-2xl mx-auto w-full px-4 py-4 border-t border-gray-100">
          <p className="text-[11px] text-gray-400 text-center">
            Deprem verileri: <span className="font-medium">Kandilli Rasathanesi (KOERI)</span> · Fay verileri: <span className="font-medium">MTA Aktif Fay Haritası</span>
          </p>
        </footer>
      </body>
    </html>
  );
}
