'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HomeIcon,
  ShoppingBagIcon,
  UsersIcon,
  ShoppingCartIcon,
  ChartBarIcon,
  CogIcon,
  TagIcon,
  ChatBubbleLeftRightIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowLeftOnRectangleIcon,
  BellIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Produits', href: '/admin/products', icon: ShoppingBagIcon },
  { name: 'Catégories', href: '/admin/categories', icon: TagIcon },
  { name: 'Commandes', href: '/admin/orders', icon: ShoppingCartIcon },
  { name: 'Paramètres', href: '/admin/settings', icon: CogIcon },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl lg:hidden"
            >
              <div className="flex h-full flex-col">
                <div className="flex h-20 items-center justify-between px-6 border-b">
                  <Link href="/admin" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl">A</span>
                    </div>
                    <span className="text-xl font-bold text-neutral-900">Admin</span>
                  </Link>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 rounded-lg hover:bg-neutral-100"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                          isActive
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex h-full flex-col bg-white border-r">
          <div className="flex h-20 items-center px-6 border-b">
            <Link href="/admin" className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg"
              >
                <span className="text-white font-bold text-2xl">A</span>
              </motion.div>
              <div>
                <span className="text-xl font-bold text-neutral-900">Admin Panel</span>
                <p className="text-xs text-neutral-500">Bon Plan CBD</p>
              </div>
            </Link>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 shadow-sm'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary-50 rounded-xl -z-10"
                    />
                  )}
                </Link>
              )
            })}
          </nav>
          <div className="p-4 border-t">
            <button className="flex items-center gap-3 w-full px-4 py-3 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 rounded-xl font-medium transition-all">
              <ArrowLeftOnRectangleIcon className="h-5 w-5" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b">
          <div className="flex h-20 items-center justify-between px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-neutral-100 lg:hidden"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>

            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="search"
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-neutral-100">
                <BellIcon className="h-6 w-6 text-neutral-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <Image
                  src="/images/admin-avatar.jpg"
                  alt="Admin"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-neutral-900">Admin User</p>
                  <p className="text-xs text-neutral-500">admin@bonplancbd.fr</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
