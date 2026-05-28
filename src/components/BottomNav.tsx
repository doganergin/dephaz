'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, Users, Phone, FlaskConical, LayoutDashboard } from 'lucide-react';

const items = [
  { href: '/harita',        Icon: Globe,            tr: 'Canlı Harita',    en: 'Live Map' },
  { href: '/aile-plani',    Icon: Users,            tr: 'Aile Planı',      en: 'Family' },
  { href: '/acil-numaralar',Icon: Phone,            tr: 'Acil',            en: 'Emergency' },
  { href: '/uzman',         Icon: FlaskConical,     tr: 'Uzman',           en: 'Experts' },
  { href: '/dashboard',     Icon: LayoutDashboard,  tr: 'Dashboard',       en: 'Dashboard' },
];

export default function BottomNav() {
  const path = usePathname();
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--card-bg)] border-t border-[var(--border)] safe-area-bottom">
      <div className="max-w-2xl mx-auto flex items-stretch">
        {items.map(({ href, Icon, tr, en }) => {
          const active = path === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 transition-colors ${
                active
                  ? 'text-red-500'
                  : 'text-[var(--muted)] hover:text-[var(--foreground)]'
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.2 : 1.8} />
              <span className="text-[9px] font-semibold leading-none">{TR ? tr : en}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
