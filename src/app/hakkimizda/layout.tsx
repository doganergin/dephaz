import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Hakkımızda — Deprem Hattı',
  description: 'Deprem Hattı hakkında bilgi. Misyonumuz, kullandığımız veri kaynakları ve deprem bilincine katkımız.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
