'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { StarIcon } from '@heroicons/react/20/solid'
import { ShoppingCartIcon, HeartIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { useCartStore } from '@/hooks/useCartStore'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Produits de démonstration - à remplacer par des données de la base
const featuredProducts = [
  {
    id: '1',
    name: 'Amnesia Haze',
    category: 'Fleurs CBD',
    price: 8.90,
    originalPrice: 12.90,
    image: '/images/img3.jpg',
    cbdRate: 22,
    thcRate: 0.2,
    rating: 4.8,
    reviews: 124,
    badge: 'Best Seller',
    description: 'Une variété légendaire aux arômes citronnés',
  },
  {
    id: '2',
    name: 'Huile CBD 10%',
    category: 'Huiles CBD',
    price: 39.90,
    originalPrice: 49.90,
    image: '/images/huile.jpg',
    cbdRate: 10,
    thcRate: 0,
    rating: 4.9,
    reviews: 89,
    badge: 'Full Spectrum',
    description: 'Huile premium à spectre complet',
  },
  {
    id: '3',
    name: 'Super Skunk',
    category: 'Fleurs CBD',
    price: 7.50,
    originalPrice: 9.90,
    image: '/images/img8.jpg',
    cbdRate: 18,
    thcRate: 0.2,
    rating: 4.7,
    reviews: 67,
    badge: 'Indoor',
    description: 'Culture indoor de qualité supérieure',
  },
  {
    id: '4',
    name: 'Résine Marocaine',
    category: 'Résines CBD',
    price: 12.90,
    originalPrice: 15.90,
    image: '/images/img4.jpg',
    cbdRate: 25,
    thcRate: 0.2,
    rating: 4.9,
    reviews: 156,
    badge: 'Premium',
    description: 'Hash traditionnel de qualité exceptionnelle',
  },
]

export default function FeaturedProducts() {
  const addItem = useCartStore((state) => state.addItem)
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])

  const handleAddToCart = async (product: typeof featuredProducts[0]) => {
    setLoadingProduct(product.id)
    
    // Simuler un délai d'ajout
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
    <section className="py-24 bg-gradient-to-b from-neutral-50 to-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full mb-4">
            <SparklesIcon className="w-5 h-5 text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">Sélection Premium</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900">
            <span className="block">Nos Produits</span>
            <span className="block text-gradient mt-2">Best-Sellers</span>
          </h2>
          <p className="mt-4 text-xl text-neutral-600 max-w-2xl mx-auto">
            Découvrez les favoris de nos clients, sélectionnés pour leur qualité exceptionnelle
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 relative"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="featured-products-swiper"
          >
            {featuredProducts.map((product, index) => (
              <SwiperSlide key={product.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100">
                    <Link href={`/produits/${product.id}`}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </Link>
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.badge && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="bg-gradient-to-r from-primary-600 to-primary-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                        >
                          {product.badge}
                        </motion.span>
                      )}
                      {product.originalPrice > product.price && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.4 }}
                          className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                        >
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
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

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white text-sm font-medium mb-2">Aperçu rapide</p>
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
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                      {product.category}
                    </p>
                    
                    <Link href={`/produits/${product.id}`}>
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
                      <div>
                        <span className="text-3xl font-bold text-neutral-900">
                          {product.price.toFixed(2)}€
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="ml-2 text-sm text-neutral-500 line-through">
                            {product.originalPrice.toFixed(2)}€
                          </span>
                        )}
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(product)}
                        disabled={loadingProduct === product.id}
                        className="ml-4 px-3 py-2 bg-primary-600 text-white text-sm font-semibold rounded-full shadow-lg hover:bg-primary-700 transition-all duration-300 disabled:opacity-50 flex items-center gap-1 min-w-[80px]"
                      >
                          {loadingProduct === product.id ? (
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <>
                            <ShoppingCartIcon className="h-4 w-4" />
                              Ajouter
                            </>
                          )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link
            href="/produits"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-primary-200"
          >
            Découvrir toute la collection
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .featured-products-swiper {
          padding: 20px 0 60px;
        }
        .featured-products-swiper .swiper-button-next,
        .featured-products-swiper .swiper-button-prev {
          background: white;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.3s;
        }
        .featured-products-swiper .swiper-button-next:hover,
        .featured-products-swiper .swiper-button-prev:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
        }
        .featured-products-swiper .swiper-button-next:after,
        .featured-products-swiper .swiper-button-prev:after {
          font-size: 20px;
          color: #059669;
          font-weight: bold;
        }
        .featured-products-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #d4d4d4;
          opacity: 1;
          transition: all 0.3s;
        }
        .featured-products-swiper .swiper-pagination-bullet-active {
          width: 32px;
          border-radius: 6px;
          background: linear-gradient(to right, #059669, #047857);
        }
      `}</style>
    </section>
  )
}
