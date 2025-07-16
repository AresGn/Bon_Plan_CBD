'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ExclamationTriangleIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

export default function AgeVerificationLight() {
  const [isVerified, setIsVerified] = useState<boolean | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Check localStorage immediately
    const checkAge = () => {
      try {
        const ageData = localStorage.getItem('ageVerificationData')
        if (ageData) {
          const parsed = JSON.parse(ageData)
          if (parsed.verified && Date.now() - parsed.date < 30 * 24 * 60 * 60 * 1000) {
            setIsVerified(true)
            return
          }
        }
      } catch (e) {
        // Silent fail
      }
      
      localStorage.removeItem('ageVerificationData')
      setShowModal(true)
    }
    
    // Run check immediately
    checkAge()
  }, [])

  const handleAccept = () => {
    localStorage.setItem('ageVerificationData', JSON.stringify({ verified: true, date: Date.now() }))
    setIsVerified(true)
    setShowModal(false)
  }

  const handleDecline = () => {
    setIsVerified(false)
    setShowModal(false)
  }

  // Verified - render nothing
  if (isVerified === true && !showModal) {
    return null
  }

  // Declined - block access
  if (isVerified === false) {
    return (
      <div className="fixed inset-0 z-[9999] bg-neutral-900 flex items-center justify-center">
        <div className="text-center text-white p-8 max-w-md">
          <XCircleIcon className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-4">Accès Refusé</h1>
          <p className="text-neutral-300 mb-6">
            L'accès à ce site est strictement réservé aux personnes majeures et non enceintes.
          </p>
          <p className="text-sm text-neutral-400">
            Conformément à la législation en vigueur, la vente de produits CBD est interdite aux mineurs.
          </p>
        </div>
      </div>
    )
  }

  // Show verification modal
  if (!showModal) return null

  return (
    <>
      {/* Simple overlay without animation */}
      <div className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-sm" />
      
      {/* Modal without animation */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-8 text-white text-center">
            <Image
              src="/images/logo.jpg"
              alt="Bon Plan CBD"
              width={80}
              height={80}
              className="mx-auto mb-4 rounded-full"
              priority
            />
            <h1 className="text-3xl font-bold mb-2">Bon Plan CBD</h1>
            <p className="text-primary-100">Vérification d'accès requise</p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex items-center justify-center mb-6">
              <ExclamationTriangleIcon className="w-16 h-16 text-amber-500" />
            </div>

            <h2 className="text-2xl font-bold text-neutral-900 text-center mb-4">
              Confirmation d'Âge Requise
            </h2>

            <div className="space-y-4 mb-6">
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

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleDecline}
                className="flex-1 px-6 py-3 bg-neutral-200 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-300 transition-colors"
              >
                J'ai moins de 18 ans
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow"
              >
                J'ai 18 ans ou plus
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
