'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'

export default function CheckoutErrorPage() {
  const searchParams = useSearchParams()
  
  // Récupérer les paramètres de l'URL
  const paymentOrderId = searchParams.get('payment_order_id')
  const status = searchParams.get('status')
  const error = searchParams.get('error')

  useEffect(() => {
    // Log pour le debug
    console.log('Erreur de paiement:', { paymentOrderId, status, error })
  }, [paymentOrderId, status, error])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-red-500" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Erreur de paiement
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Une erreur s'est produite lors du traitement de votre paiement.
            </p>
          </div>

          <div className="mt-8">
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Que s'est-il passé ?
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>
                      Le paiement n'a pas pu être traité. Cela peut être dû à :
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Informations de carte bancaire incorrectes</li>
                      <li>Fonds insuffisants</li>
                      <li>Carte expirée ou bloquée</li>
                      <li>Problème technique temporaire</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Que faire maintenant ?
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Vérifiez vos informations de paiement</li>
                      <li>Contactez votre banque si nécessaire</li>
                      <li>Réessayez le paiement</li>
                      <li>Contactez notre support si le problème persiste</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <Link
                href="/panier"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Réessayer le paiement
              </Link>
              
              <Link
                href="/contact"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Contacter le support
              </Link>
              
              <Link
                href="/produits"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Continuer mes achats
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Support client :{' '}
              <a href="mailto:contact@bonplancbd.fr" className="text-green-600 hover:text-green-500">
                contact@bonplancbd.fr
              </a>
              {' '}ou{' '}
              <a href="tel:+33123456789" className="text-green-600 hover:text-green-500">
                01 23 45 67 89
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
