'use client'

import { TranslationProvider } from '@/context/TranslationContext'
import '../styles/globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <TranslationProvider>
          {children}
        </TranslationProvider>
      </body>
    </html>
  )
}
