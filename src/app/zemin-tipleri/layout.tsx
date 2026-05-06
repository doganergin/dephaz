import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Zemin Tipleri ve Deprem Riski — Deprem Hattı',
  description: 'Zemin yapısı deprem hasarını nasıl etkiler? Kaya, sıkı toprak, gevşek zemin ve sıvılaşma riski hakkında bilgi.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
