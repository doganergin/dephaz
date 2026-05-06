import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Depreme Hazırlık Rehberi — Deprem Hattı',
  description: 'Depreme nasıl hazırlanılır? Ev güvenliği, acil durum planı, deprem çantası ve deprem anında yapılacaklar rehberi.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
