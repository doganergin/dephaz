'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/', label: 'Bölge Analizi' },
  { href: '/aile-plani', label: 'Aile Planı' },
  { href: '/canta', label: '72h Çanta' },
];

export default function NavBar() {
  const path = usePathname();

  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex gap-1 py-2">
          {tabs.map((t) => {
            const active = path === t.href;
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`flex-1 text-center py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
