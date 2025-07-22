'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  MagnifyingGlassIcon,
  Squares2X2Icon,
  ListBulletIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline'
import { useCartStore } from '@/hooks/useCartStore'
import { useProducts } from '@/hooks/useProducts'
import toast from 'react-hot-toast'

const categories = [
  { slug: 'all', name: 'Tous les produits', icon: '🌟' },
  { slug: 'fleurs', name: 'Fleurs CBD', icon: '🌿' },
  { slug: 'resines', name: 'Résines CBD', icon: '🟫' },
  { slug: 'infusions', name: 'Infusions CBD', icon: '🍵' },
  { slug: 'accessoires', name: 'Accessoires', icon: '🛠️' },
]

const sortOptions = [
  { value: 'name', label: 'Nom A-Z' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'rating', label: 'Mieux notés' },
]

// Produits de démonstration
const mockProducts = [
  {
    id: '1',
    name: 'Amnesia Haze',
    slug: 'amnesia-haze',
    category: 'fleurs',
    price: 8.90,
    originalPrice: 12.90,
    image: '/images/products/amnesia-haze.jpg',
    description: 'Fleur CBD premium aux arômes citronnés',
    cbdRate: 18,
    thcRate: 0.2,
    rating: 4.8,
    inStock: true,
  },
  {
    id: '2',
    name: 'OG Kush',
    slug: 'og-kush',
    category: 'fleurs',
    price: 9.50,
    originalPrice: 0,
    image: '/images/products/og-kush.jpg',
    description: 'Variété légendaire aux effets relaxants',
    cbdRate: 20,
    thcRate: 0.2,
    rating: 4.9,
    inStock: true,
  },
  {
    id: '3',
    name: 'Hash Maroc',
    slug: 'hash-maroc',
    category: 'resines',
    price: 12.00,
    originalPrice: 15.00,
    image: '/images/products/hash-maroc.jpg',
    description: 'Résine traditionnelle du Maroc',
    cbdRate: 25,
    thcRate: 0.2,
    rating: 4.7,
    inStock: true,
  },
  {
    id: '4',
    name: 'Infusion Relaxante',
    slug: 'infusion-relaxante',
    category: 'infusions',
    price: 15.90,
    originalPrice: 0,
    image: '/images/products/infusion-relaxante.jpg',
    description: 'Mélange de plantes et CBD pour la détente',
    cbdRate: 5,
    thcRate: 0.0,
    rating: 4.6,
    inStock: true,
  },
]

export default function ProduitsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const addItem = useCartStore((state) => state.addItem)
  const { products, loading, error } = useProducts({ status: 'ACTIVE' })

  // Utiliser les produits de l'API ou les produits de démo
  const allProducts = products.length > 0 ? products.map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    category: p.category?.slug || 'autres',
    price: p.price,
    originalPrice: p.originalPrice || 0,
    image: p.images?.[0] || '/images/default-product.jpg',
    description: p.description,
    cbdRate: p.cbdRate,
    thcRate: p.thcRate,
    rating: 4.5, // Valeur par défaut
    inStock: p.stock > 0,
  })) : mockProducts

  // Filtrer les produits
  let filteredProducts = allProducts

  // Filtre par catégorie
  if (selectedCategory !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.category === selectedCategory)
  }

  // Filtre par recherche
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  // Tri
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'name':
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const handleAddToCart = (product: any) => {
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
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
              <span className="block text-neutral-900">Nos</span>
              <span className="block text-gradient mt-2">Produits CBD</span>
            </h1>
            <p className="mt-6 text-xl text-neutral-700 max-w-3xl mx-auto">
              Découvrez notre gamme complète de produits CBD premium,
              rigoureusement sélectionnés et testés en laboratoire.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filtres */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-8">
              {/* Recherche */}
              <div className="mb-6">
                <label htmlFor="search" className="block text-sm font-medium text-neutral-700 mb-2">
                  Rechercher
                </label>
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  <input
                    type="text"
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher un produit..."
                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Catégories */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-neutral-700 mb-3">Catégories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.slug}
                      onClick={() => setSelectedCategory(category.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category.slug
                          ? 'bg-primary-100 text-primary-700 font-medium'
                          : 'text-neutral-600 hover:bg-neutral-100'
                      }`}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="flex-1">
            {/* Barre d'outils */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <p className="text-sm text-neutral-600">
                  {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
                </p>

                {/* Toggle vue */}
                <div className="flex items-center border border-neutral-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-neutral-400'}`}
                  >
                    <Squares2X2Icon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-neutral-400'}`}
                  >
                    <ListBulletIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Tri */}
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm text-neutral-600">
                  Trier par:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-neutral-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grille de produits */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-neutral-500">Chargement des produits...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">Erreur lors du chargement des produits.</p>
              </div>
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group"
                      >
                        <div className="card overflow-hidden">
                          <Link href={`/produits/${product.category}/${product.slug}`}>
                            <div className="relative aspect-square overflow-hidden bg-neutral-100">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                              />
                              {product.originalPrice > product.price && (
                                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                </span>
                              )}
                              {!product.inStock && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                  <span className="text-white font-semibold">Rupture de stock</span>
                                </div>
                              )}
                            </div>
                          </Link>

                          <div className="p-4">
                            <Link href={`/produits/${product.category}/${product.slug}`}>
                              <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                                {product.name}
                              </h3>
                            </Link>

                            <p className="mt-1 text-sm text-neutral-600 line-clamp-2">
                              {product.description}
                            </p>

                            <div className="mt-2 flex items-center space-x-2">
                              <span className="badge badge-success">CBD: {product.cbdRate}%</span>
                              <span className="badge badge-info">THC: {product.thcRate}%</span>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                              <div>
                                <span className="text-xl font-bold text-neutral-900">
                                  {product.price.toFixed(2)}€
                                </span>
                                {product.originalPrice > product.price && (
                                  <span className="ml-2 text-sm text-neutral-500 line-through">
                                    {product.originalPrice.toFixed(2)}€
                                  </span>
                                )}
                              </div>

                              <button
                                onClick={() => handleAddToCart(product)}
                                disabled={!product.inStock}
                                className="btn-primary !px-3 !py-2 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <ShoppingCartIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card p-4 flex items-center gap-4"
                      >
                        <Link href={`/produits/${product.category}/${product.slug}`} className="flex-shrink-0">
                          <div className="relative w-20 h-20 overflow-hidden rounded-lg bg-neutral-100">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover object-center"
                            />
                          </div>
                        </Link>

                        <div className="flex-1">
                          <Link href={`/produits/${product.category}/${product.slug}`}>
                            <h3 className="text-lg font-semibold text-neutral-900 hover:text-primary-600 transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-neutral-600 mt-1">{product.description}</p>
                          <div className="mt-2 flex items-center space-x-2">
                            <span className="badge badge-success">CBD: {product.cbdRate}%</span>
                            <span className="badge badge-info">THC: {product.thcRate}%</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className="text-xl font-bold text-neutral-900">
                              {product.price.toFixed(2)}€
                            </span>
                            {product.originalPrice > product.price && (
                              <div className="text-sm text-neutral-500 line-through">
                                {product.originalPrice.toFixed(2)}€
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.inStock}
                            className="btn-primary !px-3 !py-2 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <ShoppingCartIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-neutral-500">Aucun produit trouvé.</p>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="mt-2 text-primary-600 hover:text-primary-700"
                      >
                        Effacer la recherche
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}