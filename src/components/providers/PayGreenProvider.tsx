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

  const handlePayGreenError = () => {
    console.error('Erreur lors du chargement du SDK PayGreen')
  }

  // Pendant le SSR, retourner les enfants sans le provider
  if (!isClient) {
    return <>{children}</>
  }

  const payGreenUrl = process.env.NEXT_PUBLIC_PAYGREEN_ENV === 'production'
    ? 'https://paygreen.fr/js/pg.min.js'
    : 'https://sb-paygreen.fr/js/pg.min.js'

  return (
    <>
      <Script
        src={payGreenUrl}
        onLoad={handlePayGreenLoad}
        onError={handlePayGreenError}
        strategy="lazyOnload"
      />
      {children}
    </>
  )
}
