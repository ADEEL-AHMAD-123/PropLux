'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Menu, X, Heart, Plus, Search, Building2 } from 'lucide-react'
import { usePropertyStore } from '@/store/usePropertyStore'

const navLinks = [
  { label: 'Buy', href: '/buy' },
  { label: 'Rent', href: '/rent' },
  { label: 'Sell', href: '/sell', badge: 'New' },
  { label: 'Agents', href: '/agents' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const favorites = usePropertyStore((s) => s.favorites)
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navBg =
    isHomePage && !scrolled
      ? 'bg-transparent'
      : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'

  const textColor = isHomePage && !scrolled ? 'text-white' : 'text-gray-800'
  const logoColor = isHomePage && !scrolled ? 'text-white' : 'text-blue-600'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className={`p-1.5 rounded-lg ${isHomePage && !scrolled ? 'bg-white/20' : 'bg-blue-50'} transition-colors`}>
                <Building2 className={`w-6 h-6 ${logoColor}`} />
              </div>
              <span className={`text-xl font-bold tracking-tight ${logoColor} font-playfair`}>
                PropLux
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5
                    ${pathname === link.href
                      ? isHomePage && !scrolled ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'
                      : isHomePage && !scrolled ? 'text-white/90 hover:bg-white/10 hover:text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full font-medium">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/properties"
                className={`p-2 rounded-lg transition-colors ${isHomePage && !scrolled ? 'text-white/90 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Search className="w-5 h-5" />
              </Link>
              <Link
                href="/dashboard"
                className={`relative p-2 rounded-lg transition-colors ${isHomePage && !scrolled ? 'text-white/90 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {favorites.length > 9 ? '9+' : favorites.length}
                  </span>
                )}
              </Link>
              <Link
                href="/sign-in"
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isHomePage && !scrolled ? 'text-white/90 hover:bg-white/10' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                Sign In
              </Link>
              <Link
                href="/list-property"
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-blue-200"
              >
                <Plus className="w-4 h-4" />
                Post Property
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-colors ${isHomePage && !scrolled ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white z-50 lg:hidden shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-blue-600" />
                  <span className="text-xl font-bold text-blue-600 font-playfair">PropLux</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                      ${pathname === link.href ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    {link.label}
                    {link.badge && (
                      <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}

                <div className="pt-4 border-t border-gray-100 mt-4 space-y-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Heart className="w-4 h-4" />
                    Saved Properties
                    {favorites.length > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {favorites.length}
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 text-center border border-gray-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/list-property"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-1.5 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Post Property
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
