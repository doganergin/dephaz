import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Gizlilik Politikası — Deprem Hattı',
  description: 'Deprem Hattı gizlilik politikası. Kişisel veriler, çerezler ve üçüncü taraf hizmetler hakkında bilgi.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
