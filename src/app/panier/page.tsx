'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/hooks/useCartStore'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore()
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const subtotal = getTotalPrice()
  const shipping = subtotal >= 50 ? 0 : 4.90
  const total = subtotal + shipping - discount

  const handleApplyPromo = () => {
    // Simulation de codes promo
    if (promoCode === 'BIENVENUE10') {
      setDiscount(subtotal * 0.1)
    } else if (promoCode === 'CBD20') {
      setDiscount(subtotal * 0.2)
    } else {
      setDiscount(0)
    }
  }

  if (items.length === 0) {
    return (
      <div className="bg-white min-h-[60vh]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Panier</h1>
          <div className="mt-12 text-center">
            <svg
              className="mx-auto h-24 w-24 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h2 className="mt-6 text-xl font-medium text-neutral-900">Votre panier est vide</h2>
            <p className="mt-2 text-neutral-600">
              Découvrez nos produits CBD de qualité premium
            </p>
            <Link href="/produits/fleurs" className="btn-primary mt-8 inline-flex">
              Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Panier</h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Articles dans votre panier
            </h2>

            <ul role="list" className="divide-y divide-neutral-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-neutral-200">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-neutral-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">{(item.price * item.quantity).toFixed(2)}€</p>
                      </div>
                      <div className="mt-1 flex items-center space-x-2">
                        <span className="badge badge-success text-xs">CBD: {item.cbdRate}%</span>
                        <span className="badge badge-info text-xs">THC: {item.thcRate}%</span>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="rounded-md p-1 hover:bg-neutral-100"
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="px-2 text-neutral-700">{item.quantity}g</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="rounded-md p-1 hover:bg-neutral-100"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="font-medium text-red-600 hover:text-red-500"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={clearCart}
                className="text-sm font-medium text-red-600 hover:text-red-500"
              >
                Vider le panier
              </button>
              <Link
                href="/produits/fleurs"
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                Continuer mes achats →
              </Link>
            </div>
          </section>

          {/* Résumé de la commande */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-neutral-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-neutral-900">
              Résumé de la commande
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-neutral-600">Sous-total</dt>
                <dd className="text-sm font-medium text-neutral-900">{subtotal.toFixed(2)}€</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-neutral-600">Frais de livraison</dt>
                <dd className="text-sm font-medium text-neutral-900">
                  {shipping === 0 ? 'Gratuit' : `${shipping.toFixed(2)}€`}
                </dd>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-neutral-600">Réduction</dt>
                  <dd className="text-sm font-medium text-green-600">-{discount.toFixed(2)}€</dd>
                </div>
              )}
              <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
                <dt className="text-base font-medium text-neutral-900">Total</dt>
                <dd className="text-base font-medium text-neutral-900">{total.toFixed(2)}€</dd>
              </div>
            </dl>

            {/* Code promo */}
            <div className="mt-6">
              <label htmlFor="promo-code" className="block text-sm font-medium text-neutral-700">
                Code promo
              </label>
              <div className="mt-1 flex space-x-2">
                <input
                  type="text"
                  id="promo-code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="input-field flex-1"
                  placeholder="Entrez votre code"
                />
                <button
                  onClick={handleApplyPromo}
                  className="btn-outline !px-4"
                >
                  Appliquer
                </button>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/checkout"
                className="btn-primary w-full text-center"
              >
                Passer la commande
              </Link>
            </div>

            <div className="mt-6 text-center text-sm text-neutral-500">
              ou{' '}
              <Link href="/produits/fleurs" className="font-medium text-primary-600 hover:text-primary-500">
                Continuer mes achats
              </Link>
            </div>

            {/* Garanties */}
            <div className="mt-6 border-t border-neutral-200 pt-6">
              <div className="space-y-4 text-sm">
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-600">Livraison gratuite dès 50€</span>
                </div>
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-600">Paiement 100% sécurisé</span>
                </div>
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-600">Satisfait ou remboursé</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
