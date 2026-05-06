import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Deprem Anında Ne Yapmalı? — Deprem Hattı',
  description: 'Deprem anında ve deprem sonrasında yapılması gerekenler. Çök-Kapan-Tutun, gaz sızıntısı, tahliye ve artçı sarsıntı rehberi.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
