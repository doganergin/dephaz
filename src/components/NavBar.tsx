'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/', label: 'Bölge Analizi', icon: '🗺️' },
  { href: '/aile-plani', label: 'Aile Planı', icon: '👨‍👩‍👧' },
  { href: '/canta', label: '72h Çanta', icon: '🎒' },
];

export default function NavBar() {
  const path = usePathname();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-2xl mx-auto px-4">
        {/* Başlık */}
        <div className="flex items-center gap-3 pt-4 pb-3 border-b border-gray-50">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-sm">
            D
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 leading-none">DepHaz</p>
            <p className="text-[10px] text-gray-400 leading-none mt-0.5">Deprem Hazırlık Rehberi</p>
          </div>
        </div>
        {/* Sekmeler */}
        <div className="flex gap-0">
          {tabs.map((t) => {
            const active = path === t.href;
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium border-b-2 transition-colors ${
                  active
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
