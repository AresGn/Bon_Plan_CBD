'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useCartStore } from '@/hooks/useCartStore'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { clearCart } = useCartStore()
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Récupérer les paramètres de l'URL
  const paymentOrderId = searchParams.get('payment_order_id')
  const status = searchParams.get('status')

  useEffect(() => {
    // Vider le panier après un paiement réussi
    clearCart()

    // Si on a un payment_order_id, on peut récupérer les détails
    if (paymentOrderId) {
      fetchOrderDetails(paymentOrderId)
    } else {
      setLoading(false)
    }
  }, [paymentOrderId, clearCart])

  const fetchOrderDetails = async (paymentOrderId: string) => {
    try {
      // Ici vous pouvez appeler votre API pour récupérer les détails de la commande
      // basé sur le payment_order_id PayGreen
      const response = await fetch(`/api/orders/by-payment-id/${paymentOrderId}`)
      if (response.ok) {
        const data = await response.json()
        setOrderDetails(data.order)
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de commande:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Paiement réussi !
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Votre commande a été confirmée avec succès.
            </p>
          </div>

          {orderDetails && (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Détails de votre commande
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Numéro de commande :</span>
                  <span className="font-medium">{orderDetails.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Montant total :</span>
                  <span className="font-medium">{orderDetails.total.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Statut :</span>
                  <span className="font-medium text-green-600">Confirmée</span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <CheckCircleIcon className="h-5 w-5 text-green-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Que se passe-t-il maintenant ?
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Vous allez recevoir un email de confirmation</li>
                      <li>Votre commande sera préparée dans les 24h</li>
                      <li>Vous recevrez un email de suivi d'expédition</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <Link
                href="/compte/commandes"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Voir mes commandes
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
              Une question ? Contactez-nous à{' '}
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
