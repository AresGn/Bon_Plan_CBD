'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface AdminUser {
  id: string
  email: string
  name?: string
  role: string
  image?: string
}

export const useAdminAuth = () => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAdminAuth()
  }, [])

  const checkAdminAuth = () => {
    try {
      // Vérifier qu'on est côté client
      if (typeof window === 'undefined') {
        setIsLoading(false)
        return
      }

      const token = localStorage.getItem('adminToken')
      const userStr = localStorage.getItem('adminUser')
      
      if (!token || !userStr) {
        setIsAuthenticated(false)
        setAdminUser(null)
        setIsLoading(false)
        return
      }

      const userData = JSON.parse(userStr)
      
      // Vérifier que l'utilisateur a le rôle admin
      if (userData.role !== 'ADMIN') {
        logout()
        return
      }

      setAdminUser(userData)
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification admin:', error)
      logout()
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminUser')
    }
    setAdminUser(null)
    setIsAuthenticated(false)
    router.push('/compte')
  }

  const requireAuth = () => {
    if (!isLoading && !isAuthenticated) {
      router.push('/compte')
      return false
    }
    return true
  }

  return {
    adminUser,
    isLoading,
    isAuthenticated,
    logout,
    requireAuth,
    checkAdminAuth
  }
}
