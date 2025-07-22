'use client'

import { useState, useEffect, ReactNode } from 'react'
import { ExclamationTriangleIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

interface AgeGateProps {
  children: ReactNode
}

export default function AgeGate({ children }: AgeGateProps) {
  const [isVerified, setIsVerified] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà confirmé son âge
    try {
      const ageData = localStorage.getItem('ageVerificationData')
      if (ageData) {
        const parsed = JSON.parse(ageData)
        // Vérifier si la vérification date de moins de 30 jours
        if (parsed.verified && Date.now() - parsed.date < 30 * 24 * 60 * 60 * 1000) {
          setIsVerified(true)
          setShowContent(true)
          setIsLoading(false)
          return
        }
      }
    } catch (e) {
      console.error('Erreur lors de la lecture des données de vérification:', e)
    }
    
    // Si pas de données valides, supprimer et demander la vérification
    localStorage.removeItem('ageVerificationData')
    setIsVerified(null) // null = pas encore de réponse
    setIsLoading(false)
  }, [])

  const handleAccept = () => {
    // Enregistrer la vérification d'âge
    localStorage.setItem('ageVerificationData', JSON.stringify({ 
      verified: true, 
      date: Date.now() 
    }))
    setIsVerified(true)
    setShowContent(true)
  }

  const handleDecline = () => {
    // Refuser l'accès et rediriger vers Google
    setIsVerified(false)
    // Rediriger immédiatement vers Google
    window.location.href = 'https://www.google.com'
  }

  // Pendant le chargement, afficher un écran de chargement
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white z-[10000] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Chargement...</p>
        </div>
      </div>
    )
  }

  // Si l'utilisateur est vérifié, afficher le contenu
  if (isVerified === true && showContent) {
    return <>{children}</>
  }

  // Si l'accès est explicitement refusé, afficher un message de blocage
  if (isVerified === false) {
    return (
      <div className="fixed inset-0 z-[10000] bg-neutral-900 flex items-center justify-center p-4">
        <div className="text-center text-white p-8 max-w-md">
          <XCircleIcon className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Accès Refusé</h1>
          <p className="text-neutral-300 mb-6">
            L'accès à ce site est strictement réservé aux personnes majeures.
          </p>
          <p className="text-sm text-neutral-400 mb-8">
            Conformément à la législation française en vigueur, la vente de produits CBD est interdite aux mineurs.
          </p>
          <button
            onClick={() => {
              setIsVerified(null)
              localStorage.removeItem('ageVerificationData')
            }}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  // Sinon, afficher le modal de vérification d'âge
  return (
    <>
      {/* Overlay qui bloque tout le site */}
      <div className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-fadeIn">
          {/* Header avec gradient */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-8 text-white text-center">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse" />
              <div className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-primary-600">CBD</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Bon Plan CBD</h1>
            <p className="text-primary-100">Vérification d'accès requise</p>
          </div>

          {/* Contenu */}
          <div className="p-8">
            <div className="flex items-center justify-center mb-6">
              <ExclamationTriangleIcon className="w-16 h-16 text-amber-500" />
            </div>

            <h2 className="text-2xl font-bold text-neutral-900 text-center mb-4">
              Confirmation d'Âge Requise
            </h2>

            <div className="space-y-4 mb-6">
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 mb-4">
                <p className="text-red-800 font-semibold text-center">
                  ⚠️ ACCÈS INTERDIT AUX MINEURS ⚠️
                </p>
              </div>
              <p className="text-neutral-700 text-center">
                Ce site contient des produits à base de CBD strictement réservés aux adultes.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-800 font-medium mb-2">
                  En accédant à ce site, vous confirmez :
                </p>
                <ul className="space-y-2 text-sm text-amber-700">
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Avoir 18 ans ou plus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Ne pas être enceinte ou allaitante</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Accepter notre politique de confidentialité</span>
                  </li>
                </ul>
              </div>

              <p className="text-xs text-neutral-500 text-center">
                Les produits CBD ne sont pas des médicaments et ne peuvent se substituer à un traitement médical.
              </p>
            </div>

            {/* Boutons */}
            <div className="space-y-3">
              <button
                onClick={handleAccept}
                className="w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 text-lg"
              >
                ✓ J'ai 18 ans ou plus - Entrer sur le site
              </button>
              <button
                onClick={handleDecline}
                className="w-full px-6 py-3 bg-neutral-100 text-neutral-600 font-medium rounded-xl hover:bg-neutral-200 transition-colors text-sm"
              >
                ✗ J'ai moins de 18 ans - Quitter le site
              </button>
            </div>

            <p className="text-xs text-neutral-400 text-center mt-4">
              Cette vérification est conforme à la réglementation française sur la vente de produits CBD.
            </p>
          </div>
        </div>
      </div>

    </>
  )
}
