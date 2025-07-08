'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCartIcon, UserIcon, Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/hooks/useCartStore'
import { motion, AnimatePresence } from 'framer-motion'

const navigation = [
  { name: 'Accueil', href: '/' },
  {
    name: 'Nos Produits',
    href: '#',
    dropdown: [
      { name: 'Fleurs CBD', href: '/produits/fleurs', icon: '🌿' },
      { name: 'Huiles CBD', href: '/produits/huiles', icon: '💧' },
      { name: 'Résines CBD', href: '/produits/resines', icon: '🟫' },
      { name: 'Infusions CBD', href: '/produits/infusions', icon: '☕' },
      { name: 'Cosmétiques CBD', href: '/produits/cosmetiques', icon: '🧴' },
      { name: 'Vaporisateurs', href: '/produits/vaporisateurs', icon: '💨' },
    ]
  },
  { name: 'Nouveautés', href: '/nouveautes' },
  { name: 'Promotions', href: '/promotions' },
  { name: 'À propos', href: '/a-propos' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const cartItems = useCartStore((state) => state.items)
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top Bar avec animations */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-primary-600 to-primary-700 text-white"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                02 35 89 45 67
              </span>
              <span className="hidden sm:flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contact@bonplancbd.fr
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="hidden md:block">🚚 Livraison gratuite dès 50€</span>
              <span className="animate-pulse">🎁 -20% avec le code BIENVENUE</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Header */}
      <header className={`bg-white sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}>
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="flex h-20 items-center justify-between">
            {/* Logo avec animation */}
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-primary-500/20 rounded-full blur-xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  />
                  <Image
                    src="/images/logo.jpg"
                    alt="Bon Plan CBD"
                    width={50}
                    height={50}
                    className="h-12 w-auto relative z-10"
                  />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                    Bon Plan CBD
                  </span>
                  <p className="text-xs text-neutral-600 font-medium">Premium Quality • Meilleurs Prix</p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation avec dropdown */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <div
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button className="flex items-center text-sm font-medium text-neutral-700 hover:text-primary-600 transition-all duration-200 group">
                        {item.name}
                        <svg className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-neutral-100 overflow-hidden"
                          >
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="flex items-center px-4 py-3 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200"
                              >
                                <span className="text-2xl mr-3">{subItem.icon}</span>
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-all duration-200 relative group"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Actions avec animations */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchOpen(!searchOpen)}
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 text-neutral-700 hover:bg-primary-100 hover:text-primary-600 transition-all duration-200"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </motion.button>
              
              {/* User Account */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/compte"
                  className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 text-neutral-700 hover:bg-primary-100 hover:text-primary-600 transition-all duration-200"
                >
                  <UserIcon className="h-5 w-5" />
                </Link>
              </motion.div>
              
              {/* Shopping Cart */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link
                  href="/panier"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-all duration-200"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-secondary-500 text-xs text-white flex items-center justify-center font-bold shadow-lg"
                    >
                      {cartItemsCount}
                    </motion.span>
                  )}
                </Link>
              </motion.div>

              {/* Mobile menu button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="lg:hidden rounded-full p-2 bg-neutral-100 text-neutral-700"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Ouvrir le menu</span>
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: 90 }}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="open"
                      initial={{ rotate: 90 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: -90 }}
                    >
                      <Bars3Icon className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Search Bar Overlay */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-neutral-100 p-4"
              >
                <div className="max-w-3xl mx-auto">
                  <form className="relative">
                    <input
                      type="search"
                      placeholder="Rechercher un produit, une catégorie..."
                      className="w-full px-12 py-3 rounded-full border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                      autoFocus
                    />
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="lg:hidden fixed inset-0 z-50 bg-white"
              >
                <div className="flex justify-between items-center p-4 border-b">
                  <span className="text-xl font-bold text-primary-700">Menu</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-neutral-100"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="p-4 space-y-2">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.dropdown ? (
                        <div className="space-y-2">
                          <span className="block px-3 py-2 text-base font-medium text-neutral-900">
                            {item.name}
                          </span>
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="flex items-center px-6 py-2 text-sm text-neutral-600 hover:bg-primary-50 hover:text-primary-600 rounded-lg"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <span className="text-xl mr-2">{subItem.icon}</span>
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="block px-3 py-2 text-base font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                  <Link
                    href="/compte"
                    className="block px-3 py-2 text-base font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg sm:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mon compte
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </>
  )
}
