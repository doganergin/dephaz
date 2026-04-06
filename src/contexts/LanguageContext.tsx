'use client';
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { t as translate, type LangKey } from '@/lib/i18n';

type Lang = 'TR' | 'EN';

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: LangKey) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'TR',
  setLang: () => {},
  t: (key) => translate(key, 'TR'),
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('TR');

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang | null;
    if (stored === 'EN' || stored === 'TR') setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('lang', l);
  };

  const t = (key: LangKey) => translate(key, lang);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
