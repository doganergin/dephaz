'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { depremAnindaOnlemler, depremSonrasiOnlemler, kaynaklar } from '@/data/depremOnlemleri';
import { Backpack, Users, Globe, ShieldCheck, EyeOff, Ban, TreePine, Car, DoorOpen, Waves, Flame, HeartPulse, Construction } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ANINDA_ICONS: LucideIcon[] = [ShieldCheck, EyeOff, Ban, TreePine, Car, DoorOpen];
const SONRASI_ICONS: LucideIcon[] = [Waves, Flame, HeartPulse, Construction];

export default function DepremAnindaPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  return (
    <article className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">
          {TR ? 'Hazırlık Rehberi' : 'Preparedness Guide'}
        </p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          {TR ? 'Deprem Anında Ne Yapmalı?' : 'What to Do During an Earthquake?'}
        </h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          {TR
            ? 'Sarsıntı başladığında ve sona erdiğinde hayat kurtaran adımlar.'
            : 'Life-saving steps when shaking starts and after it stops.'}
        </p>
      </div>

      {/* Özet kutu */}
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-4">
        <p className="text-xs font-bold text-red-700 dark:text-red-400 mb-1">
          {TR ? 'En Önemli Kural' : 'The Most Important Rule'}
        </p>
        <p className="text-sm font-semibold text-red-800 dark:text-red-300">
          {TR ? 'Çök — Kapan — Tutun' : 'Drop — Cover — Hold On'}
        </p>
        <p className="text-xs text-red-700 dark:text-red-400 mt-1 leading-relaxed">
          {TR
            ? 'Sarsıntı başlar başlamaz yere çök, sağlam bir masanın altına gir ve sarsıntı durana kadar bekle.'
            : 'As soon as shaking begins, drop to the ground, take cover under a sturdy table, and wait until the shaking stops.'}
        </p>
      </div>

      {/* Deprem anında */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">
          {TR ? 'Deprem Sırasında' : 'During the Earthquake'}
        </h2>
        <div className="space-y-2">
          {depremAnindaOnlemler.map((o, i) => {
            const Icon = ANINDA_ICONS[i];
            return (
            <div key={o.adim} className="flex items-start gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3 glow-card glow-red">
              <span className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center shrink-0">
                <Icon size={18} strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-xs font-bold text-[var(--foreground)]">
                  {TR ? o.baslik : o.baslikEN}
                </p>
                <p className="text-[11px] text-[var(--muted)] leading-relaxed mt-0.5">
                  {TR ? o.aciklama : o.aciklamaEN}
                </p>
              </div>
            </div>
            );
          })}
        </div>
      </section>

      {/* Deprem sonrası */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">
          {TR ? 'Deprem Sonrasında' : 'After the Earthquake'}
        </h2>
        <div className="space-y-2">
          {depremSonrasiOnlemler.map((o, i) => {
            const Icon = SONRASI_ICONS[i];
            return (
            <div key={o.adim} className="flex items-start gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3 glow-card glow-red">
              <span className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center shrink-0">
                <Icon size={18} strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-xs font-bold text-[var(--foreground)]">
                  {TR ? o.baslik : o.baslikEN}
                </p>
                <p className="text-[11px] text-[var(--muted)] leading-relaxed mt-0.5">
                  {TR ? o.aciklama : o.aciklamaEN}
                </p>
              </div>
            </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4 glow-card glow-blue">
        <p className="text-xs font-bold text-[var(--foreground)] mb-2">
          {TR ? 'Hazırlığınızı Tamamlayın' : 'Complete Your Preparedness'}
        </p>
        <div className="flex flex-col gap-2">
          <Link href="/canta" className="text-xs text-blue-500 hover:underline flex items-center gap-1">
            <Backpack size={13} className="shrink-0" /> {TR ? '72 Saatlik Deprem Çantası Listesi →' : '72-Hour Emergency Kit Checklist →'}
          </Link>
          <Link href="/aile-plani" className="text-xs text-blue-500 hover:underline flex items-center gap-1">
            <Users size={13} className="shrink-0" /> {TR ? 'Aile Buluşma Planı →' : 'Family Meeting Plan →'}
          </Link>
          <Link href="/bolge-analizi" className="text-xs text-blue-500 hover:underline flex items-center gap-1">
            <Globe size={13} className="shrink-0" /> {TR ? 'Bölgenizin Risk Skorunu Öğrenin →' : 'Check Your Region\'s Risk Score →'}
          </Link>
        </div>
      </div>

      {/* Kaynaklar */}
      <div className="text-[11px] text-[var(--muted)] space-y-1 border-t border-[var(--border)] pt-4">
        <p className="font-semibold">{TR ? 'Kaynaklar' : 'Sources'}</p>
        {kaynaklar.map((k) => (
          <p key={k.ad}>
            •{' '}
            <a href={k.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {k.ad}
            </a>
          </p>
        ))}
      </div>
    </article>
  );
}
