'use client'

import { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { Toaster } from 'react-hot-toast'

// Import dynamique pour éviter les problèmes de chunk loading
const AgeVerificationFast = dynamic(() => import('@/components/AgeVerificationFast'), {
  ssr: false,
})

interface ClientProvidersProps {
  children: ReactNode
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <>
      <AgeVerificationFast />
      {children}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  )
}
