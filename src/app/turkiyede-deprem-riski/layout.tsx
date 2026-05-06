import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Türkiye'de Deprem Riski — Deprem Hattı",
  description: "Türkiye'nin deprem riski neden yüksek? Kuzey Anadolu ve Doğu Anadolu fay hatları, risk bölgeleri ve tarihsel depremler.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
