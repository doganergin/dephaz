import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'İletişim — Deprem Hattı',
  description: 'Deprem Hattı ile iletişime geçin. Hata bildirimi, öneri ve geri bildirimleriniz için bizimle iletişime geçebilirsiniz.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
