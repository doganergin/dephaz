import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Türkiye'deki Fay Hatları — Deprem Hattı",
  description: "Türkiye'deki aktif fay hatları: Kuzey Anadolu, Doğu Anadolu, Batı Anadolu fay sistemleri ve deprem riski.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
