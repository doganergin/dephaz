import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Earthquake Preparedness & Safety Guides | Deprem Hattı',
  description:
    'Expert articles and scientific guides on earthquake preparedness, fault lines, building safety, and seismic risks in Turkey.',
  alternates: { canonical: '/blog' },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
