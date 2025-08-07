'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

interface PayGreenProviderProps {
  children: React.ReactNode
}

// Déclaration globale pour TypeScript
declare global {
  interface Window {
    PGJS: any;
  }
}

export default function PayGreenProvider({ children }: PayGreenProviderProps) {
  const [isClient, setIsClient] = useState(false)
  const [isPayGreenLoaded, setIsPayGreenLoaded] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handlePayGreenLoad = () => {
    setIsPayGreenLoaded(true)
    console.log('PayGreen SDK chargé avec succès')
  }

  const handlePayGreenError = (error: any) => {
    console.warn('PayGreen SDK non disponible en développement:', error?.message || 'Erreur inconnue')
    // En développement, on continue sans bloquer l'application
    setIsPayGreenLoaded(false)
  }

  // Pendant le SSR, retourner les enfants sans le provider
  if (!isClient) {
    return <>{children}</>
  }

  const payGreenEnv = process.env.NEXT_PUBLIC_PAYGREEN_ENV || 'sandbox'
  const payGreenUrl = payGreenEnv === 'production'
    ? 'https://paygreen.fr/js/pg.min.js'
    : 'https://sb-paygreen.fr/js/pg.min.js'

  // En développement local, on peut désactiver PayGreen si nécessaire
  const shouldLoadPayGreen = process.env.NODE_ENV === 'production' ||
                            process.env.NEXT_PUBLIC_ENABLE_PAYGREEN === 'true'

  return (
    <>
      {shouldLoadPayGreen && (
        <Script
          src={payGreenUrl}
          onLoad={handlePayGreenLoad}
          onError={handlePayGreenError}
          strategy="lazyOnload"
        />
      )}
      {children}
    </>
  )
}
