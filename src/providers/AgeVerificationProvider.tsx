'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AgeVerificationContextType {
  isVerified: boolean | null
  isLoading: boolean
}

const AgeVerificationContext = createContext<AgeVerificationContextType>({
  isVerified: null,
  isLoading: true,
})

export function useAgeVerification() {
  return useContext(AgeVerificationContext)
}

export function AgeVerificationProvider({ children }: { children: ReactNode }) {
  const [isVerified, setIsVerified] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const ageData = localStorage.getItem('ageVerificationData')
      if (ageData) {
        const parsed = JSON.parse(ageData)
        if (parsed.verified && Date.now() - parsed.date < 30 * 24 * 60 * 60 * 1000) {
          setIsVerified(true)
          setIsLoading(false)
          return
        }
      }
    } catch (e) {
      // Silent fail
    }
    
    localStorage.removeItem('ageVerificationData')
    setIsVerified(false)
    setIsLoading(false)
  }, [])

  return (
    <AgeVerificationContext.Provider value={{ isVerified, isLoading }}>
      {children}
    </AgeVerificationContext.Provider>
  )
}
