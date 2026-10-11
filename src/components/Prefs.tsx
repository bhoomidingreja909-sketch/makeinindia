'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { HI } from '@/data/site';

export type Lang = 'en' | 'hi';
export type Theme = 'light' | 'dark' | 'contrast';
interface Ctx { lang: Lang; setLang: (l: Lang) => void; theme: Theme; setTheme: (t: Theme) => void; size: number; setSize: (n: number) => void }

const PrefCtx = createContext<Ctx>({ lang: 'en', setLang: () => {}, theme: 'light', setTheme: () => {}, size: 100, setSize: () => {} });
const KEY = 'mii-prefs-v1';

export function PrefsProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const [theme, setTheme] = useState<Theme>('light');
  const [size, setSize] = useState(100);

  // Load saved choices once (storage can throw in private windows — everything still works without it).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p.lang === 'hi' || p.lang === 'en') setLang(p.lang);
        if (['light', 'dark', 'contrast'].includes(p.theme)) setTheme(p.theme);
        if (typeof p.size === 'number' && p.size >= 85 && p.size <= 150) setSize(p.size);
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    const el = document.documentElement;
    el.dataset.theme = theme;
    el.style.fontSize = `${size}%`;
    el.lang = lang === 'hi' ? 'hi' : 'en-IN';
    try { localStorage.setItem(KEY, JSON.stringify({ lang, theme, size })); } catch { /* ignore */ }
  }, [lang, theme, size]);

  const value = useMemo(() => ({ lang, setLang, theme, setTheme, size, setSize }), [lang, theme, size]);
  return <PrefCtx.Provider value={value}>{children}</PrefCtx.Provider>;
}

export const usePrefs = () => useContext(PrefCtx);

/** Inline bilingual text. Hindi is provided for navigation and key labels only. */
export function T({ id, en }: { id: string; en: string }) {
  const { lang } = usePrefs();
  return <>{lang === 'hi' && HI[id] ? HI[id] : en}</>;
}

export function useT() {
  const { lang } = usePrefs();
  return useCallback((id: string, en: string) => (lang === 'hi' && HI[id] ? HI[id] : en), [lang]);
}
