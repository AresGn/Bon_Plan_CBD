'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { TagIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { useCartStore } from '@/hooks/useCartStore'
import toast from 'react-hot-toast'

// Produits en promotion - à remplacer par des données de la base
const promoProducts = [
  {
    id: 'promo-1',
    name: 'Small Bud Amnesia',
    category: 'Fleurs CBD',
    price: 6.50,
    originalPrice: 11.90,
    image: '/images/img10.jpg',
    cbdRate: 16,
    thcRate: 0.3,
    rating: 4.8,
    reviews: 112,
    badge: 'Promo',
    discount: 45,
    description: 'Concentration exceptionnelle en arômes - Promotion spéciale',
  },
  {
    id: 'promo-2',
    name: 'Blue Dream CBD',
    category: 'Fleurs CBD',
    price: 5.90,
    originalPrice: 8.90,
    image: '/images/img12.jpg',
    cbdRate: 11,
    thcRate: 0.3,
    rating: 4.6,
    reviews: 78,
    badge: 'Offre Flash',
    discount: 33,
    description: 'Notes citronnées - Stock limité',
  },
  {
    id: 'promo-3',
    name: 'Super Skunk CBD',
    category: 'Fleurs CBD',
    price: 6.90,
    originalPrice: 11.50,
    image: '/images/img11.jpg',
    cbdRate: 17,
    thcRate: 0.3,
    rating: 4.8,
    reviews: 134,
    badge: 'En solde',
    discount: 40,
    description: 'Arômes boisés - Jusqu\'à épuisement des stocks',
  },
]

const categories = ['Tous', 'Fleurs CBD']

export default function PromotionsPage() {
  const addItem = useCartStore((state) => state.addItem)
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [favorites, setFavorites] = useState<string[]>([])
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null)

  const filteredProducts = selectedCategory === 'Tous'
    ? promoProducts
    : promoProducts.filter(p => p.category === selectedCategory)

  const handleAddToCart = async (product: typeof promoProducts[0]) => {
    setLoadingProduct(product.id)

    setTimeout(() => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        category: product.category,
        cbdRate: product.cbdRate,
        thcRate: product.thcRate,
      })

      toast.success(`${product.name} ajouté au panier !`)
      setLoadingProduct(null)
    }, 500)
  }

  const toggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <div className="bg-gradient-to-b from-neutral-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-primary-100 to-secondary-50">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, #f472b6 0%, transparent 50%), radial-gradient(circle at 80% 80%, #f59e0b 0%, transparent 50%)',
          }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 shadow-lg">
              <TagIcon className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">Promotions Incontournables</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
              <span className="block text-neutral-900">Promotions</span>
              <span className="block text-gradient mt-2">Été 2025</span>
            </h1>

            <p className="mt-6 text-xl text-neutral-700 max-w-2xl mx-auto">
              Profitez de nos offres exclusives sur une sélection de produits CBD. Quantités limitées, dépêchez-vous !
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                <TagIcon className="w-5 h-5 text-pink-500" />
                <span className="text-sm font-medium text-neutral-700">Économisez jusqu'à 50%</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                <TagIcon className="w-5 h-5 text-primary-600" />
                <span className="text-sm font-medium text-neutral-700">Offres limitées dans le temps</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-neutral-900">
              {filteredProducts.length} produits en promotion
            </h2>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Products Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100">
                <Link href={`/produits/${product.category.toLowerCase().replace(' ', '-')}/${product.id}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </Link>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                  >
                    {product.badge}
                  </motion.span>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                  >
                    -{product.discount}%
                  </motion.span>
                </div>

                {/* Favorite Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  {favorites.includes(product.id) ? (
                    <HeartIconSolid className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-neutral-600" />
                  )}
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                  {product.category}
                </p>

                <Link href={`/produits/${product.category.toLowerCase().replace(' ', '-')}/${product.id}`}>
                  <h3 className="mt-2 text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <p className="mt-2 text-sm text-neutral-600 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-neutral-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-neutral-600">
                    {product.rating} ({product.reviews} avis)
                  </span>
                </div>

                {/* Price and Action */}
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-3xl font-bold text-neutral-900">
                    {product.price.toFixed(2)}€
                  </span>
                  <span className="text-sm text-neutral-500 line-through">
                    {product.originalPrice.toFixed(2)}€
                  </span>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(product)}
                    disabled={loadingProduct === product.id}
                    className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    <span className="relative flex items-center gap-2">
                      {loadingProduct === product.id ? (
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <ShoppingCartIcon className="h-5 w-5" />
                          Ajouter
                        </>
                      )}
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <TagIcon className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ne ratez pas ces offres !</h2>
            <p className="text-lg sm:text-xl mb-8 text-pink-100 max-w-2xl mx-auto px-4">
              Abonnez-vous à notre newsletter pour recevoir toutes les promotions et nouveautés en exclusivité
            </p>
            <form className="max-w-md mx-auto px-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 sm:px-6 py-3 rounded-full text-neutral-900 placeholder-neutral-500 text-sm sm:text-base"
                  required
                />
                <button
                  type="submit"
                  className="px-6 sm:px-8 py-3 bg-white text-pink-700 font-semibold rounded-full hover:bg-neutral-100 transition-colors whitespace-nowrap text-sm sm:text-base"
                >
                  S'inscrire
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
