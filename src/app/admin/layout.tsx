'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
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
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'

interface AdminUser {
  id: string
  email: string
  name?: string
  role: string
  image?: string
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Produits', href: '/admin/products', icon: ShoppingBagIcon },
  { name: 'Catégories', href: '/admin/categories', icon: TagIcon },
  { name: 'Commandes', href: '/admin/orders', icon: ShoppingCartIcon },
  { name: 'Utilisateurs', href: '/admin/users', icon: UsersIcon },
  { name: 'Paramètres', href: '/admin/settings', icon: CogIcon },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false)
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Récupérer les données de l'utilisateur admin connecté
  useEffect(() => {
    const checkAdminAuth = () => {
      try {


        const token = localStorage.getItem('adminToken')
        const userStr = localStorage.getItem('adminUser')

        if (!token || !userStr) {
          setIsAuthenticated(false)
          setAdminUser(null)
          setIsLoading(false)
          router.push('/compte')
          return
        }

        const userData = JSON.parse(userStr)

        // Debug: afficher les données utilisateur
        console.log('Admin user data:', userData)

        // Vérifier que l'utilisateur a le rôle admin (plus permissif)
        if (userData.role && userData.role !== 'ADMIN' && userData.role !== 'admin') {
          console.log('Role non autorisé:', userData.role)
          setIsAuthenticated(false)
          setAdminUser(null)
          setIsLoading(false)
          localStorage.removeItem('adminToken')
          localStorage.removeItem('adminUser')
          router.push('/compte')
          return
        }

        setAdminUser(userData)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Erreur lors de la récupération des données admin:', error)
        setIsAuthenticated(false)
        setAdminUser(null)
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
        router.push('/compte')
      } finally {
        setIsLoading(false)
      }
    }

    checkAdminAuth()
  }, [router])

  // Fonction de déconnexion
  const handleLogout = () => {
    setIsAuthenticated(false)
    setAdminUser(null)
    setIsLoading(true)
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    router.push('/compte')
  }

  // Afficher un loader pendant la vérification de l'authentification
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-neutral-600 font-medium">Vérification de l'authentification...</p>
        </div>
      </div>
    )
  }

  // Si l'utilisateur n'est pas authentifié après le chargement, ne pas afficher l'interface admin
  if (!isLoading && (!isAuthenticated || !adminUser)) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <div className="w-6 h-6 text-red-600">⚠</div>
          </div>
          <p className="text-neutral-600 font-medium">Accès non autorisé</p>
          <p className="text-neutral-500 text-sm mt-2">Redirection en cours...</p>
        </div>
      </div>
    )
  }



  return (
    <div className="min-h-screen bg-neutral-50 overflow-x-hidden">
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
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
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
      <div className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col transition-all duration-300 ease-in-out ${
        desktopSidebarCollapsed ? 'lg:w-20 xl:w-20' : 'lg:w-72 xl:w-80 2xl:w-80'
      }`}>
        <div className="flex h-full flex-col bg-white border-r shadow-lg backdrop-blur-sm">
          <div className="flex h-20 items-center px-6 border-b">
            <Link href="/admin" className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg"
              >
                <span className="text-white font-bold text-2xl">A</span>
              </motion.div>
              {!desktopSidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-xl font-bold text-neutral-900">Admin Panel</span>
                  <p className="text-xs text-neutral-500">Bon Plan CBD</p>
                </motion.div>
              )}
            </Link>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 shadow-sm'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                  } ${desktopSidebarCollapsed ? 'justify-center' : ''}`}
                  title={desktopSidebarCollapsed ? item.name : undefined}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!desktopSidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
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
            <button
              onClick={handleLogout}
              className={`flex items-center gap-3 w-full px-4 py-3 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 rounded-xl font-medium transition-all ${
                desktopSidebarCollapsed ? 'justify-center' : ''
              }`}
              title={desktopSidebarCollapsed ? 'Déconnexion' : undefined}
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5 flex-shrink-0" />
              {!desktopSidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  Déconnexion
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ease-in-out ${
        desktopSidebarCollapsed
          ? 'lg:pl-20 xl:pl-20'
          : 'lg:pl-72 xl:pl-80 2xl:pl-80'
      }`}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
          <div className="flex h-20 items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-neutral-100 transition-colors lg:hidden"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
              <button
                onClick={() => setDesktopSidebarCollapsed(!desktopSidebarCollapsed)}
                className="hidden lg:flex p-2 rounded-lg hover:bg-neutral-100 transition-colors group"
                title={desktopSidebarCollapsed ? 'Étendre la sidebar' : 'Réduire la sidebar'}
              >
                <Bars3Icon className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </button>
            </div>

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
              <div className="flex items-center gap-3">
                {isLoading ? (
                  <div className="w-10 h-10 bg-neutral-200 rounded-full animate-pulse"></div>
                ) : adminUser?.image ? (
                  <Image
                    src={adminUser.image}
                    alt={adminUser.name || 'Admin'}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white font-bold text-sm">
                      {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : adminUser?.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="hidden sm:block text-right">
                  {isLoading ? (
                    <>
                      <div className="h-4 w-20 bg-neutral-200 rounded animate-pulse mb-1"></div>
                      <div className="h-3 w-24 bg-neutral-200 rounded animate-pulse"></div>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-neutral-900">
                        {adminUser?.name || 'Administrateur'}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {adminUser?.email || 'admin@bonplancbd.fr'}
                      </p>
                    </>
                  )}
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
