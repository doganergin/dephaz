'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle, XCircle, ChevronRight, RotateCcw, Award } from 'lucide-react';

interface Soru {
  tr: string; en: string;
  secenekler: { tr: string; en: string; puan: number }[];
}

const sorular: Soru[] = [
  {
    tr: '72 saatlik acil durum çantanız hazır mı?',
    en: 'Is your 72-hour emergency kit ready?',
    secenekler: [
      { tr: 'Evet, eksiksiz ve güncel', en: 'Yes, complete and up to date', puan: 10 },
      { tr: 'Kısmen hazır', en: 'Partially ready', puan: 5 },
      { tr: 'Hayır', en: 'No', puan: 0 },
    ],
  },
  {
    tr: 'Deprem sırasında ne yapmalısınız?',
    en: 'What should you do during an earthquake?',
    secenekler: [
      { tr: 'Çök, Kapan, Tutun', en: 'Drop, Cover, Hold On', puan: 10 },
      { tr: 'Kapı çerçevesine geç', en: 'Stand in a doorframe', puan: 0 },
      { tr: 'Dışarı koş', en: 'Run outside', puan: 0 },
    ],
  },
  {
    tr: 'Aile buluşma noktanız belirlendi mi?',
    en: 'Have you agreed on a family meeting point?',
    secenekler: [
      { tr: 'Evet, herkes biliyor', en: 'Yes, everyone knows it', puan: 10 },
      { tr: 'Genel olarak konuştuk', en: 'We discussed it roughly', puan: 5 },
      { tr: 'Hayır', en: 'No', puan: 0 },
    ],
  },
  {
    tr: 'Bölgenizin deprem risk skorunu biliyor musunuz?',
    en: 'Do you know your region\'s earthquake risk score?',
    secenekler: [
      { tr: 'Evet, düzenli kontrol ediyorum', en: 'Yes, I check it regularly', puan: 10 },
      { tr: 'Genel bir fikrim var', en: 'I have a general idea', puan: 5 },
      { tr: 'Hayır', en: 'No', puan: 0 },
    ],
  },
  {
    tr: 'Evinizdeki gaz ve su vanasının yerini biliyor musunuz?',
    en: 'Do you know where your home\'s gas and water shutoffs are?',
    secenekler: [
      { tr: 'Evet, ikisini de biliyorum', en: 'Yes, I know both', puan: 10 },
      { tr: 'Birini biliyorum', en: 'I know one of them', puan: 5 },
      { tr: 'Hayır', en: 'No', puan: 0 },
    ],
  },
  {
    tr: 'DASK (zorunlu deprem sigortası) poliçeniz güncel mi?',
    en: 'Is your DASK mandatory earthquake insurance policy current?',
    secenekler: [
      { tr: 'Evet, güncel', en: 'Yes, it\'s current', puan: 10 },
      { tr: 'Kontrol etmem gerekiyor', en: 'I need to check', puan: 3 },
      { tr: 'Hayır / Bilmiyorum', en: 'No / I don\'t know', puan: 0 },
    ],
  },
  {
    tr: 'Binanız kaç yılında yapıldı?',
    en: 'When was your building constructed?',
    secenekler: [
      { tr: '2019 sonrası (güncel yönetmelik)', en: 'After 2019 (current code)', puan: 10 },
      { tr: '2000–2018 arası', en: 'Between 2000–2018', puan: 7 },
      { tr: '1999 öncesi', en: 'Before 1999', puan: 2 },
      { tr: 'Bilmiyorum', en: 'I don\'t know', puan: 0 },
    ],
  },
  {
    tr: 'Şehir dışında bir referans iletişim kişiniz var mı?',
    en: 'Do you have an out-of-city emergency contact person?',
    secenekler: [
      { tr: 'Evet, ailece biliriz', en: 'Yes, the whole family knows', puan: 10 },
      { tr: 'Hayır ama planlıyorum', en: 'No but I\'m planning to', puan: 0 },
      { tr: 'Hayır', en: 'No', puan: 0 },
    ],
  },
  {
    tr: 'Evde en az 3 günlük içme suyunuz var mı?',
    en: 'Do you have at least 3 days of drinking water at home?',
    secenekler: [
      { tr: 'Evet (kişi başı 3 lt/gün)', en: 'Yes (3 L/person/day)', puan: 10 },
      { tr: 'Kısmen', en: 'Partially', puan: 5 },
      { tr: 'Hayır', en: 'No', puan: 0 },
    ],
  },
  {
    tr: 'Enkaz altında kalsanız ne yaparsınız?',
    en: 'If trapped under debris, what would you do?',
    secenekler: [
      { tr: 'Sakin olur, SOS sinyali veririm (3×kısa vuruş)', en: 'Stay calm and signal SOS (3 short taps)', puan: 10 },
      { tr: 'Bağırırım ve hareket ederim', en: 'Shout and move around', puan: 0 },
      { tr: 'Ne yapacağımı bilmiyorum', en: 'I don\'t know what to do', puan: 0 },
    ],
  },
];

const seviyeler = [
  { min: 0,  max: 30, tr: 'Düşük Hazırlık',    en: 'Low Preparedness',      renk: 'red',    trDesc: 'Hemen harekete geçin. Temel adımları atmak çok fazla zaman almaz.', enDesc: 'Take action now. The basic steps don\'t take much time.' },
  { min: 31, max: 60, tr: 'Orta Hazırlık',     en: 'Moderate Preparedness', renk: 'amber',  trDesc: 'İyi bir başlangıç, ancak kritik eksikler var.', enDesc: 'Good start, but there are critical gaps.' },
  { min: 61, max: 80, tr: 'İyi Hazırlık',      en: 'Good Preparedness',     renk: 'blue',   trDesc: 'Harika! Son birkaç adımı tamamlarsanız mükemmel olursunuz.', enDesc: 'Great! Complete the last few steps and you\'ll be excellent.' },
  { min: 81, max: 100,'tr': 'Mükemmel Hazırlık', en: 'Excellent Preparedness', renk: 'green', trDesc: 'Tebrikler! Depreme karşı çok iyi hazırlanmışsınız.', enDesc: 'Congratulations! You are very well prepared for an earthquake.' },
];

export default function HazirlikTestiPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';
  const [soruIndex, setSoruIndex] = useState(0);
  const [secilen, setSecilen] = useState<number[]>([]);
  const [bitti, setBitti] = useState(false);

  const soru = sorular[soruIndex];
  const toplamPuan = secilen.reduce((acc, i, qi) => acc + (sorular[qi]?.secenekler[i]?.puan ?? 0), 0);
  const maxPuan = sorular.length * 10;
  const yuzde = Math.round((toplamPuan / maxPuan) * 100);
  const seviye = seviyeler.find((s) => yuzde >= s.min && yuzde <= s.max)!;

  function secCevap(i: number) {
    const yeni = [...secilen, i];
    setSecilen(yeni);
    if (soruIndex + 1 >= sorular.length) {
      setBitti(true);
    } else {
      setTimeout(() => setSoruIndex(soruIndex + 1), 220);
    }
  }

  function yenidenBasla() {
    setSoruIndex(0);
    setSecilen([]);
    setBitti(false);
  }

  const renkMap: Record<string, { bar: string; text: string; bg: string; border: string }> = {
    red:   { bar: 'bg-red-500',   text: 'text-red-600',   bg: 'bg-red-50 dark:bg-red-900/10',   border: 'border-red-200 dark:border-red-900/30' },
    amber: { bar: 'bg-amber-500', text: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/10', border: 'border-amber-200 dark:border-amber-900/30' },
    blue:  { bar: 'bg-blue-500',  text: 'text-blue-600',  bg: 'bg-blue-50 dark:bg-blue-900/10',  border: 'border-blue-200 dark:border-blue-900/30' },
    green: { bar: 'bg-green-500', text: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/10', border: 'border-green-200 dark:border-green-900/30' },
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">
          {TR ? 'İnteraktif Test' : 'Interactive Quiz'}
        </p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          {TR ? 'Depreme Hazırlık Testiniz' : 'Your Earthquake Preparedness Quiz'}
        </h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          {TR ? '10 soruda hazırlık seviyenizi ölçün.' : 'Measure your preparedness level in 10 questions.'}
        </p>
      </div>

      {!bitti ? (
        <div className="space-y-4">
          {/* İlerleme */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-[var(--muted)]">
              <span>{TR ? `Soru ${soruIndex + 1} / ${sorular.length}` : `Question ${soruIndex + 1} / ${sorular.length}`}</span>
              <span>{Math.round(((soruIndex) / sorular.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
              <div
                className="bg-red-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${(soruIndex / sorular.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Soru */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5">
            <p className="text-sm font-bold text-[var(--foreground)] leading-relaxed mb-4">
              {TR ? soru.tr : soru.en}
            </p>
            <div className="space-y-2">
              {soru.secenekler.map((s, i) => (
                <button
                  key={i}
                  onClick={() => secCevap(i)}
                  className="w-full text-left text-sm text-[var(--foreground)] bg-gray-50 dark:bg-gray-800/50 border border-[var(--border)] rounded-xl px-4 py-3 hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center justify-between gap-2"
                >
                  <span>{TR ? s.tr : s.en}</span>
                  <ChevronRight size={14} className="text-[var(--muted)] shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Sonuç */}
          <div className={`border rounded-2xl p-5 space-y-3 ${renkMap[seviye.renk].bg} ${renkMap[seviye.renk].border}`}>
            <div className="flex items-center gap-3">
              <Award size={28} className={renkMap[seviye.renk].text} strokeWidth={1.5} />
              <div>
                <p className={`text-lg font-bold ${renkMap[seviye.renk].text}`}>
                  {TR ? seviye.tr : seviye.en}
                </p>
                <p className="text-xs text-[var(--muted)]">
                  {toplamPuan} / {maxPuan} {TR ? 'puan' : 'points'}
                </p>
              </div>
              <span className={`ml-auto text-3xl font-bold tabular-nums ${renkMap[seviye.renk].text}`}>
                {yuzde}
              </span>
            </div>
            <div className="w-full bg-white/50 dark:bg-black/20 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-700 ${renkMap[seviye.renk].bar}`}
                style={{ width: `${yuzde}%` }}
              />
            </div>
            <p className="text-sm text-[var(--foreground)] leading-relaxed">
              {TR ? seviye.trDesc : seviye.enDesc}
            </p>
          </div>

          {/* Soru cevap özeti */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide">
              {TR ? 'Cevaplarınız' : 'Your Answers'}
            </p>
            {sorular.map((s, qi) => {
              const cevap = s.secenekler[secilen[qi]];
              return (
                <div key={qi} className="flex items-start gap-2 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3">
                  {cevap?.puan === 10 ? (
                    <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
                  ) : cevap?.puan === 0 ? (
                    <XCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-amber-400 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-[var(--muted)]">{TR ? s.tr : s.en}</p>
                    <p className="text-xs font-medium text-[var(--foreground)]">{cevap ? (TR ? cevap.tr : cevap.en) : '—'}</p>
                  </div>
                  <span className="text-[11px] font-bold text-[var(--muted)] shrink-0">+{cevap?.puan ?? 0}</span>
                </div>
              );
            })}
          </div>

          {/* Aksiyonlar */}
          <div className="flex flex-col gap-2">
            <button
              onClick={yenidenBasla}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[var(--border)] text-sm font-medium text-[var(--foreground)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <RotateCcw size={14} /> {TR ? 'Testi Tekrarla' : 'Retake Quiz'}
            </button>
            <Link href="/canta" className="text-xs text-blue-500 hover:underline text-center">
              → {TR ? '72 Saatlik Çanta Listesi' : '72-Hour Emergency Kit Checklist'}
            </Link>
            <Link href="/aile-plani" className="text-xs text-blue-500 hover:underline text-center">
              → {TR ? 'Aile Planı Oluştur' : 'Create Family Plan'}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
