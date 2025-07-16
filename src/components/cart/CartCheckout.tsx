'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useCartStore } from '@/hooks/useCartStore'
import toast from 'react-hot-toast'
import axios from 'axios'
import { ShoppingBagIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

interface ShippingAddress {
  name: string
  street: string
  city: string
  postalCode: string
  phone: string
}

export default function CartCheckout() {
  const router = useRouter()
  const { user, loading: authLoading, isAuthenticated } = useAuth()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const total = getTotalPrice()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1) // 1: panier, 2: adresse, 3: paiement
  
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: '',
    street: '',
    city: '',
    postalCode: '',
    phone: ''
  })

  // Vérifier l'authentification quand on passe à l'étape 2
  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Vous devez être connecté pour passer commande')
      // Rediriger vers la page de connexion avec retour au panier
      router.push('/compte?redirect=/panier')
      return
    }
    setStep(2)
  }

  const handleSubmitOrder = async () => {
    if (!isAuthenticated) {
      toast.error('Vous devez être connecté pour passer commande')
      router.push('/compte?redirect=/panier')
      return
    }

    // Valider l'adresse
    if (!shippingAddress.name || !shippingAddress.street || !shippingAddress.city || 
        !shippingAddress.postalCode || !shippingAddress.phone) {
      toast.error('Veuillez remplir tous les champs de l\'adresse')
      return
    }

    setLoading(true)
    
    try {
      const token = localStorage.getItem('auth-token')
      
      const orderData = {
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity
        })),
        shippingAddress,
        paymentMethod: 'card', // Pour l'instant, on simule le paiement par carte
        email: user?.email,
        phone: shippingAddress.phone
      }

      const response = await axios.post('/api/orders', orderData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.data.order) {
        toast.success('Commande créée avec succès !')
        clearCart()
        // Rediriger vers la page de confirmation
        router.push(`/compte/commandes/${response.data.order.id}`)
      }
    } catch (error: any) {
      console.error('Order error:', error)
      if (error.response?.status === 401) {
        toast.error('Session expirée. Veuillez vous reconnecter.')
        router.push('/compte?redirect=/panier')
      } else {
        toast.error(error.response?.data?.error || 'Erreur lors de la création de la commande')
      }
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Panier vide</h3>
        <p className="mt-1 text-sm text-gray-500">Commencez par ajouter des produits.</p>
        <div className="mt-6">
          <button
            onClick={() => router.push('/produits/fleurs')}
            className="btn-primary"
          >
            Découvrir nos produits
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Indicateur d'étapes */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className={`flex items-center ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
            <span className="font-medium">1. Panier</span>
          </div>
          <div className="flex-1 mx-4 h-1 bg-gray-200">
            <div className={`h-1 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`} style={{ width: step >= 2 ? '100%' : '0%' }} />
          </div>
          <div className={`flex items-center ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
            <span className="font-medium">2. Livraison</span>
          </div>
          <div className="flex-1 mx-4 h-1 bg-gray-200">
            <div className={`h-1 ${step >= 3 ? 'bg-primary-600' : 'bg-gray-200'}`} style={{ width: step >= 3 ? '100%' : '0%' }} />
          </div>
          <div className={`flex items-center ${step >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
            <span className="font-medium">3. Paiement</span>
          </div>
        </div>
      </div>

      {/* Étape 1: Récapitulatif du panier */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Votre panier</h2>
          <div className="space-y-4 mb-6">
            {items.map((item) => {
              const image = item.image || '/images/placeholder.jpg'
              
              return (
                <div key={item.id} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
                  <img
                    src={image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.quantity} x {item.price.toFixed(2)} €
                    </p>
                  </div>
                  <p className="font-semibold">{(item.price * item.quantity).toFixed(2)} €</p>
                </div>
              )
            })}
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{total.toFixed(2)} €</span>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleProceedToCheckout}
              className="btn-primary flex items-center"
            >
              Continuer vers la livraison
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Étape 2: Adresse de livraison */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Adresse de livraison</h2>
          <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                value={shippingAddress.name}
                onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                required
                className="input-field mt-1"
              />
            </div>
            
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                Adresse
              </label>
              <input
                type="text"
                id="street"
                value={shippingAddress.street}
                onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                required
                className="input-field mt-1"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  Ville
                </label>
                <input
                  type="text"
                  id="city"
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  required
                  className="input-field mt-1"
                />
              </div>
              
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                  Code postal
                </label>
                <input
                  type="text"
                  id="postalCode"
                  value={shippingAddress.postalCode}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                  required
                  pattern="[0-9]{5}"
                  className="input-field mt-1"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                value={shippingAddress.phone}
                onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                required
                className="input-field mt-1"
              />
            </div>

            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-outline"
              >
                Retour au panier
              </button>
              <button
                type="submit"
                className="btn-primary flex items-center"
              >
                Continuer vers le paiement
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Étape 3: Paiement */}
      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Paiement</h2>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="font-semibold mb-4">Récapitulatif de la commande</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison</span>
                <span>{total >= 50 ? 'Gratuite' : '5.99 €'}</span>
              </div>
              <div className="flex justify-between">
                <span>TVA (20%)</span>
                <span>{(total * 0.20).toFixed(2)} €</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>{((total + (total >= 50 ? 0 : 5.99)) * 1.20).toFixed(2)} €</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Mode démonstration :</strong> Le paiement réel n'est pas encore implémenté. 
              Cliquez sur "Confirmer la commande" pour simuler un paiement réussi.
            </p>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="btn-outline"
              disabled={loading}
            >
              Retour à l'adresse
            </button>
            <button
              onClick={handleSubmitOrder}
              disabled={loading}
              className="btn-primary flex items-center"
            >
              {loading ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  Traitement...
                </>
              ) : (
                <>
                  Confirmer la commande
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
