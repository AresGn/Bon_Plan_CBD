'use client'

import { useState, useEffect } from 'react'

export default function AgeVerificationFast() {
  const [showModal, setShowModal] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Vérification simple et rapide
    if (typeof window !== 'undefined') {
      const verified = localStorage.getItem('ageVerified')
      if (!verified) {
        setShowModal(true)
      }
    }
  }, [])

  const handleAccept = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ageVerified', 'true')
      setShowModal(false)
    }
  }

  const handleDecline = () => {
    if (typeof window !== 'undefined') {
      window.location.href = 'https://www.google.com'
    }
  }

  // Éviter les problèmes de rendu SSR
  if (!mounted || !showModal) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Vérification d'âge</h2>
        <p className="mb-6">Vous devez avoir 18 ans ou plus pour accéder à ce site.</p>
        <div className="flex gap-4">
          <button
            onClick={handleDecline}
            className="flex-1 px-4 py-2 bg-gray-200 rounded-lg"
          >
            Non
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            J'ai 18 ans ou plus
          </button>
        </div>
      </div>
    </div>
  )
}
