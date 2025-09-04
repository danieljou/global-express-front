'use client'
import useLanguage from '@/hooks/useLanguage'
import { createContext, ReactNode, useContext, useEffect, useMemo } from 'react'
import en from '../locales/en.json'
import fr from '../locales/fr.json'

const translations = { en, fr }

type Locale = 'en' | 'fr'

// Recursive type for nested translation objects
type TranslationObject = { [key: string]: string | TranslationObject }

interface TranslationContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const TranslationContext = createContext<TranslationContextType>({
  locale: 'en',
  t: (k: string) => k,
  setLocale: () => {},
})

interface TranslationProviderProps {
  children: ReactNode
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [locale, setLocale] = useLanguage() as [Locale, (locale: Locale) => void]

  // keep <html lang="..."> in sync
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
    }
  }, [locale])

  // translator function: supports nested keys "hero.title"
  const t = useMemo(() => {
    return (key: string): string => {
      const parts = key.split('.')
      let obj: TranslationObject | string | undefined =
        (translations[locale] as TranslationObject) || (translations.en as TranslationObject)

      for (const p of parts) {
        if (typeof obj === 'string') break
        obj = obj?.[p]
        if (obj == null) {
          // fallback to English
          let enObj: TranslationObject | string | undefined = translations.en as TranslationObject
          for (const q of parts) {
            if (typeof enObj === 'string') break
            enObj = enObj?.[q]
            if (enObj == null) return key
          }
          return typeof enObj === 'string' ? enObj : key
        }
      }

      return typeof obj === 'string' ? obj : key
    }
  }, [locale])

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

// typed hook
export const useTranslation = (): TranslationContextType => useContext(TranslationContext)