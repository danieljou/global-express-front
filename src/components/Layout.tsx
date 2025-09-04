'use client'

import Head from 'next/head'
import { ReactNode } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Global Trade Solutions - Import/Export Excellence</title>
        <meta
          name="description"
          content="Connecting businesses worldwide through seamless import, export, and logistics solutions"
        />
        <link rel="icon" href="/logo.png" />
      </Head>

      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </div>
    </>
  )
}
