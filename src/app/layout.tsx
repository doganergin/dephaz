import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deprem Hazırlık",
  description: "Türkiye odaklı deprem hazırlık uygulaması",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={geist.className}>
      <body className="min-h-screen bg-white flex flex-col">
        <NavBar />
        <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
