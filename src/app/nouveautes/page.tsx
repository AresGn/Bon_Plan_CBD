'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SparklesIcon, ClockIcon, FireIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { useCartStore } from '@/hooks/useCartStore'
import toast from 'react-hot-toast'

// Produits nouveautés - à remplacer par des données de la base
const newProducts = [
  {
    id: 'new-1',
    name: 'OG Kush CBD',
    category: 'Fleurs CBD',
    price: 9.90,
    image: '/images/img8.jpg',
    cbdRate: 18,
    thcRate: 0.3,
    rating: 4.9,
    reviews: 145,
    isNew: true,
    arrivalDate: '2025-01-05',
    description: 'Fleurs compactes aux arômes sour, culture Greenhouse d\'Italie',
  },
  {
    id: 'new-2',
    name: 'Dutch Chocolate',
    category: 'Fleurs CBD',
    price: 10.90,
    image: '/images/img13.jpg',
    cbdRate: 19,
    thcRate: 0.3,
    rating: 4.9,
    reviews: 167,
    isNew: true,
    arrivalDate: '2025-01-03',
    description: 'Parfum doux et gourmand rappelant le chocolat fin hollandais',
  },
  {
    id: 'new-3',
    name: 'Small Bud Orange Bud',
    category: 'Fleurs CBD',
    price: 7.50,
    image: '/images/img9.jpg',
    cbdRate: 15,
    thcRate: 0.3,
    rating: 4.7,
    reviews: 89,
    isNew: true,
    arrivalDate: '2025-01-02',
    description: 'Goût fruité et notes d\'agrumes pour apaiser l\'anxiété',
  },
  {
    id: 'new-4',
    name: 'Crème Visage CBD',
    category: 'Cosmétiques CBD',
    price: 34.90,
    image: '/images/img16.jpg',
    cbdRate: 500,
    thcRate: 0,
    rating: 4.9,
    reviews: 6,
    isNew: true,
    arrivalDate: '2025-01-01',
    description: 'Soin anti-âge enrichi au CBD',
  },
  {
    id: 'new-5',
    name: 'Small Bud Amnesia',
    category: 'Fleurs CBD',
    price: 8.50,
    image: '/images/img10.jpg',
    cbdRate: 16,
    thcRate: 0.3,
    rating: 4.8,
    reviews: 112,
    isNew: true,
    arrivalDate: '2024-12-28',
    description: 'Concentration exceptionnelle en arômes, relaxation profonde',
  },
  {
    id: 'new-6',
    name: 'Infusion Nuit Paisible',
    category: 'Infusions CBD',
    price: 12.90,
    image: '/images/img11.jpg',
    cbdRate: 5,
    thcRate: 0,
    rating: 4.9,
    reviews: 18,
    isNew: true,
    arrivalDate: '2024-12-25',
    description: 'Mélange relaxant pour un sommeil réparateur',
  },
]

const categories = ['Tous', 'Fleurs CBD', 'Cosmétiques CBD', 'Infusions CBD']

export default function NouveautesPage() {
  const addItem = useCartStore((state) => state.addItem)
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [favorites, setFavorites] = useState<string[]>([])
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null)

  const filteredProducts = selectedCategory === 'Tous' 
    ? newProducts 
    : newProducts.filter(p => p.category === selectedCategory)

  const handleAddToCart = async (product: typeof newProducts[0]) => {
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

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="bg-gradient-to-b from-white to-neutral-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-primary-100 to-secondary-50">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, #059669 0%, transparent 50%), radial-gradient(circle at 80% 80%, #f59e0b 0%, transparent 50%)',
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
              <SparklesIcon className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">Découvrez nos dernières arrivées</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
              <span className="block text-neutral-900">Nouveautés</span>
              <span className="block text-gradient mt-2">Premium CBD</span>
            </h1>
            
            <p className="mt-6 text-xl text-neutral-700 max-w-2xl mx-auto">
              Les derniers produits sélectionnés avec soin pour enrichir notre collection. 
              Qualité exceptionnelle, toujours au meilleur prix.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                <FireIcon className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium text-neutral-700">Arrivages hebdomadaires</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                <ClockIcon className="w-5 h-5 text-primary-600" />
                <span className="text-sm font-medium text-neutral-700">Stock limité</span>
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
              {filteredProducts.length} nouveaux produits
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
                    className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                  >
                    NOUVEAU
                  </motion.span>
                  {getDaysAgo(product.arrivalDate) <= 7 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse"
                    >
                      Cette semaine
                    </motion.span>
                  )}
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

                {/* CBD/THC Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex gap-2">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                      CBD: {product.cbdRate}%
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                      THC: {product.thcRate}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                    {product.category}
                  </p>
                  <p className="text-xs text-neutral-500">
                    Il y a {getDaysAgo(product.arrivalDate)} jours
                  </p>
                </div>
                
                <Link href={`/produits/${product.category.toLowerCase().replace(' ', '-')}/${product.id}`}>
                  <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
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

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <SparklesIcon className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Ne manquez aucune nouveauté !</h2>
            <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
              Inscrivez-vous à notre newsletter et soyez les premiers informés de nos dernières arrivées
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-6 py-3 rounded-full text-neutral-900 placeholder-neutral-500"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-white text-primary-700 font-semibold rounded-full hover:bg-neutral-100 transition-colors"
              >
                S'inscrire
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
