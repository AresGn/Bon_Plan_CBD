'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { XCircleIcon } from '@heroicons/react/24/solid'

export default function CheckoutCancelPage() {
  const searchParams = useSearchParams()
  
  // Récupérer les paramètres de l'URL
  const paymentOrderId = searchParams.get('payment_order_id')
  const status = searchParams.get('status')

  useEffect(() => {
    // Log pour le debug
    console.log('Paiement annulé:', { paymentOrderId, status })
  }, [paymentOrderId, status])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <XCircleIcon className="mx-auto h-16 w-16 text-red-500" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Paiement annulé
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Votre paiement a été annulé. Aucun montant n'a été débité.
            </p>
          </div>

          <div className="mt-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Que s'est-il passé ?
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Vous avez annulé le processus de paiement ou une erreur s'est produite. 
                      Vos articles sont toujours dans votre panier.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex flex-col space-y-3">
              <Link
                href="/panier"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Retourner au panier
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
              Besoin d'aide ? Contactez-nous à{' '}
              <a href="mailto:contact@bonplancbd.fr" className="text-green-600 hover:text-green-500">
                contact@bonplancbd.fr
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
