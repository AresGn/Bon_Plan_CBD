'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ExclamationTriangleIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

export default function AgeVerification() {
  const [isVerified, setIsVerified] = useState<boolean | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Optimisation : lecture unique du localStorage
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
      // Ignorer les erreurs de parsing
    }
    
    // Effacer les données expirées et afficher le modal
    localStorage.removeItem('ageVerificationData')
    setShowModal(true)
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

  // Si vérifié, ne rien afficher
  if (isVerified === true && !showModal) {
    return null
  }

  // Si refusé, afficher un message de blocage
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

  // Afficher le modal de vérification
  return (
    <AnimatePresence>
      {showModal && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">
              {/* Header avec gradient */}
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-8 text-white text-center">
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse" />
                  <Image
                    src="/images/logo.JPg"
                    alt="Bon Plan CBD"
                    width={80}
                    height={80}
                    className="relative z-10 rounded-full"
                  />
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
                <div className="flex gap-4">
                  <button
                    onClick={handleDecline}
                    className="flex-1 px-6 py-3 bg-neutral-200 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-300 transition-colors"
                  >
                    J'ai moins de 18 ans
                  </button>
                  <button
                    onClick={handleAccept}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    J'ai 18 ans ou plus
                  </button>
                </div>

                <p className="text-xs text-neutral-400 text-center mt-4">
                  Cette vérification est conforme à la réglementation française sur la vente de produits CBD.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
