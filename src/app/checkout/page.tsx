'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useCartStore } from '@/hooks/useCartStore'
import { loadStripe } from '@stripe/stripe-js'
import toast from 'react-hot-toast'

type CheckoutFormData = {
  email: string
  firstName: string
  lastName: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  postalCode: string
  country: string
  sameAsBilling: boolean
  acceptTerms: boolean
  newsletter: boolean
}

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<CheckoutFormData>({
    defaultValues: {
      country: 'FR',
      sameAsBilling: true,
      newsletter: false
    }
  })

  const subtotal = getTotalPrice()
  const shipping = subtotal >= 50 ? 0 : 4.90
  const total = subtotal + shipping

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true)
    
    try {
      // Ici, vous intégreriez l'API Stripe et votre backend
      // Pour la démo, on simule juste le processus
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Commande validée avec succès !')
      clearCart()
      // Redirection vers la page de confirmation
      window.location.href = '/commande/confirmation'
    } catch (error) {
      toast.error('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    window.location.href = '/panier'
    return null
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Finaliser la commande</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Formulaire principal */}
          <div className="lg:col-span-7">
            {/* Informations de contact */}
            <section className="mb-10">
              <h2 className="text-lg font-medium text-neutral-900">Informations de contact</h2>
              
              <div className="mt-6 grid grid-cols-1 gap-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', { 
                      required: 'Email requis',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email invalide'
                      }
                    })}
                    className="input-field mt-1"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700">
                      Prénom
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      {...register('firstName', { required: 'Prénom requis' })}
                      className="input-field mt-1"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      {...register('lastName', { required: 'Nom requis' })}
                      className="input-field mt-1"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone', { 
                      required: 'Téléphone requis',
                      pattern: {
                        value: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
                        message: 'Numéro de téléphone invalide'
                      }
                    })}
                    className="input-field mt-1"
                    placeholder="06 12 34 56 78"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Adresse de livraison */}
            <section className="mb-10">
              <h2 className="text-lg font-medium text-neutral-900">Adresse de livraison</h2>
              
              <div className="mt-6 grid grid-cols-1 gap-y-6">
                <div>
                  <label htmlFor="addressLine1" className="block text-sm font-medium text-neutral-700">
                    Adresse
                  </label>
                  <input
                    type="text"
                    id="addressLine1"
                    {...register('addressLine1', { required: 'Adresse requise' })}
                    className="input-field mt-1"
                  />
                  {errors.addressLine1 && (
                    <p className="mt-1 text-sm text-red-600">{errors.addressLine1.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="addressLine2" className="block text-sm font-medium text-neutral-700">
                    Complément d'adresse (optionnel)
                  </label>
                  <input
                    type="text"
                    id="addressLine2"
                    {...register('addressLine2')}
                    className="input-field mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-neutral-700">
                      Ville
                    </label>
                    <input
                      type="text"
                      id="city"
                      {...register('city', { required: 'Ville requise' })}
                      className="input-field mt-1"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-neutral-700">
                      Code postal
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      {...register('postalCode', { 
                        required: 'Code postal requis',
                        pattern: {
                          value: /^[0-9]{5}$/,
                          message: 'Code postal invalide'
                        }
                      })}
                      className="input-field mt-1"
                    />
                    {errors.postalCode && (
                      <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sameAsBilling"
                    {...register('sameAsBilling')}
                    className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="sameAsBilling" className="ml-2 text-sm text-neutral-600">
                    Utiliser la même adresse pour la facturation
                  </label>
                </div>
              </div>
            </section>

            {/* Conditions et newsletter */}
            <section>
              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    {...register('acceptTerms', { required: 'Vous devez accepter les conditions' })}
                    className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 mt-1"
                  />
                  <label htmlFor="acceptTerms" className="ml-2 text-sm text-neutral-600">
                    J'accepte les{' '}
                    <a href="/cgv" className="font-medium text-primary-600 hover:text-primary-500">
                      conditions générales de vente
                    </a>{' '}
                    et la{' '}
                    <a href="/confidentialite" className="font-medium text-primary-600 hover:text-primary-500">
                      politique de confidentialité
                    </a>
                  </label>
                </div>
                {errors.acceptTerms && (
                  <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>
                )}

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="newsletter"
                    {...register('newsletter')}
                    className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 mt-1"
                  />
                  <label htmlFor="newsletter" className="ml-2 text-sm text-neutral-600">
                    Je souhaite recevoir des offres exclusives et des conseils CBD par email
                  </label>
                </div>
              </div>
            </section>
          </div>

          {/* Récapitulatif de commande */}
          <div className="mt-16 lg:col-span-5 lg:mt-0">
            <div className="sticky top-24">
              <section className="rounded-lg bg-neutral-50 px-4 py-6 sm:p-6 lg:p-8">
                <h2 className="text-lg font-medium text-neutral-900">Récapitulatif</h2>

                <ul role="list" className="mt-6 divide-y divide-neutral-200">
                  {items.map((item) => (
                    <li key={item.id} className="flex py-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-md border border-neutral-200 object-cover"
                      />
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-medium text-neutral-900">{item.name}</p>
                        <p className="text-sm text-neutral-600">{item.quantity}g</p>
                      </div>
                      <p className="text-sm font-medium text-neutral-900">
                        {(item.price * item.quantity).toFixed(2)}€
                      </p>
                    </li>
                  ))}
                </ul>

                <dl className="mt-6 space-y-4 border-t border-neutral-200 pt-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-neutral-600">Sous-total</dt>
                    <dd className="text-sm font-medium text-neutral-900">{subtotal.toFixed(2)}€</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-neutral-600">Livraison</dt>
                    <dd className="text-sm font-medium text-neutral-900">
                      {shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)}€`}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
                    <dt className="text-base font-medium text-neutral-900">Total</dt>
                    <dd className="text-base font-medium text-neutral-900">{total.toFixed(2)}€</dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="btn-primary w-full disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Traitement en cours...
                      </span>
                    ) : (
                      'Valider et payer'
                    )}
                  </button>
                </div>

                <div className="mt-6 text-center text-sm text-neutral-500">
                  <p>Paiement sécurisé par Stripe</p>
                  <div className="mt-2 flex justify-center space-x-2">
                    <Image src="/images/payments/visa.svg" alt="Visa" width={40} height={25} />
                    <Image src="/images/payments/mastercard.svg" alt="Mastercard" width={40} height={25} />
                    <Image src="/images/payments/cb.svg" alt="CB" width={40} height={25} />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
