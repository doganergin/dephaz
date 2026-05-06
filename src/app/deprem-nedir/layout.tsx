import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Deprem Nedir? Nasıl Oluşur? — Deprem Hattı',
  description: 'Deprem nedir, nasıl oluşur? Tektonik plakalar, fay hatları ve sismik dalgalar hakkında kapsamlı bilgi.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
