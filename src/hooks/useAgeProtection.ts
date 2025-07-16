'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAgeVerification } from '@/providers/AgeVerificationProvider'

export function useAgeProtection() {
  const router = useRouter()
  const { isVerified, isLoading } = useAgeVerification()

  useEffect(() => {
    if (!isLoading && !isVerified) {
      // Rediriger vers la page d'accueil si non vérifié
      router.push('/')
    }
  }, [isVerified, isLoading, router])

  return { isVerified, isLoading }
}
