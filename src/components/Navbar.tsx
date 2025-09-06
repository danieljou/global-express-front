'use client'


import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useState } from 'react'
import DarkModeToggle from './DarkModeToggle'
import LanguageToggle from './LanguageToggle'


export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#tracking', label: 'Tracking' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
    { href: '#blog', label: 'Blog' },
  ]

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center mb-4">
            <Image src={"/logo.png"} alt="Global Trade Solutions" className="mr-3" width={40} height={40} />
            <span className="font-bold text-xl">Global Trade Solutions</span>
          </div>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <DarkModeToggle />

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
              aria-label="Toggle Menu"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-all duration-300 ${mobileMenuOpen ? 'block' : 'hidden'}`}
      >
        <div className="px-4 py-2 space-y-2">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="block py-2 nav-link">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
