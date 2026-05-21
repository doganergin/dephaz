import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How to Prepare for an Earthquake in Istanbul | Deprem Hattı",
  description:
    "A comprehensive, science-backed preparedness guide for Istanbul residents: regional risk, building assessment, 72-hour kit, family plan, and what to do during shaking.",
  alternates: { canonical: '/blog/istanbul-depreme-nasil-hazirlanilir' },
  openGraph: {
    title: "How to Prepare for an Earthquake in Istanbul",
    description:
      "Science-backed earthquake preparedness guide for Istanbul residents living in the shadow of the North Anatolian Fault.",
    type: 'article',
    publishedTime: '2026-05-21',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
