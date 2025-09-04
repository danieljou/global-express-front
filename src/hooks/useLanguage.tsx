'use client';

import { useEffect, useState } from 'react';

type SupportedLanguage = 'en' | 'fr' | string; // extend as needed
type UseLanguageReturn = [SupportedLanguage, (lang: SupportedLanguage) => void];

export default function useLanguage(): UseLanguageReturn {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('en');

  useEffect(() => {
    // Check for saved language preference
    const savedLang = localStorage.getItem('language') as SupportedLanguage | null;
    if (savedLang) {
      setCurrentLang(savedLang);
    }
  }, []);

  const switchLanguage = (lang: SupportedLanguage) => {
    setCurrentLang(lang);
    localStorage.setItem('language', lang);
  };

  return [currentLang, switchLanguage];
}
