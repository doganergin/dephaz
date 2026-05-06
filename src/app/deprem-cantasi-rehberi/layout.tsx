import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '72 Saatlik Deprem Çantası Rehberi — Deprem Hattı',
  description: 'Deprem çantasına ne koyulur? AFAD ve FEMA önerilerine göre eksiksiz 72 saatlik acil durum çantası hazırlama rehberi.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
