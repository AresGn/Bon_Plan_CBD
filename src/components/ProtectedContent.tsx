'use client'

import { ReactNode } from 'react'
import { useAgeVerification } from '@/providers/AgeVerificationProvider'

export default function ProtectedContent({ children }: { children: ReactNode }) {
  const { isVerified, isLoading } = useAgeVerification()

  // Afficher le contenu statique ou non sensible pendant le chargement
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-neutral-600">Chargement du contenu, veuillez patienter...</p>
        </div>
      </div>
    )
  }

  // Si non vérifié, ne rien afficher (le modal de vérification sera affiché)
  if (!isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-neutral-600">
        <p>Vérification requise pour voir le contenu</p>
      </div>
    )
  }

  // Si vérifié, afficher le contenu
  return <>{children}</>
}
