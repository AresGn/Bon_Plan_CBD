'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { StarIcon } from '@heroicons/react/20/solid'
import { ShoppingCartIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/hooks/useCartStore'
import toast from 'react-hot-toast'

// Données de démonstration - à remplacer par des appels API
const mockProducts = [
  {
    id: '1',
    name: 'Amnesia Haze',
    slug: 'amnesia-haze',
    category: 'fleurs',
    price: 8.90,
    originalPrice: 12.90,
    image: '/images/products/amnesia-haze.jpg',
    cbdRate: 22,
    thcRate: 0.2,
    rating: 4.8,
    reviews: 124,
    cultivationType: 'Indoor',
    description: 'Une variété légendaire aux arômes citronnés',
    inStock: true,
  },
  {
    id: '2',
    name: 'Super Skunk',
    slug: 'super-skunk',
    category: 'fleurs',
    price: 7.50,
    originalPrice: 9.90,
    image: '/images/products/super-skunk.jpg',
    cbdRate: 18,
    thcRate: 0.2,
    rating: 4.7,
    reviews: 67,
    cultivationType: 'Greenhouse',
    description: 'Fleur CBD relaxante aux notes terreuses',
    inStock: true,
  },
  {
    id: '3',
    name: 'Huile CBD 10%',
    slug: 'huile-cbd-10',
    category: 'huiles',
    price: 39.90,
    originalPrice: 49.90,
    image: '/images/products/huile-10.jpg',
    cbdRate: 10,
    thcRate: 0,
    rating: 4.9,
    reviews: 89,
    description: 'Huile premium à spectre complet',
    inStock: true,
  },
  {
    id: '4',
    name: 'Huile CBD 20%',
    slug: 'huile-cbd-20',
    category: 'huiles',
    price: 69.90,
    originalPrice: 89.90,
    image: '/images/products/huile-20.jpg',
    cbdRate: 20,
    thcRate: 0,
    rating: 4.9,
    reviews: 156,
    description: 'Huile forte concentration pour effets renforcés',
    inStock: true,
  },
  {
    id: '5',
    name: 'Résine Marocaine',
    slug: 'resine-marocaine',
    category: 'resines',
    price: 12.90,
    originalPrice: 15.90,
    image: '/images/products/resine-maroc.jpg',
    cbdRate: 25,
    thcRate: 0.2,
    rating: 4.9,
    reviews: 156,
    description: 'Hash traditionnel de qualité exceptionnelle',
    inStock: true,
  },
]

const categoryInfo: Record<string, { title: string; description: string }> = {
  fleurs: {
    title: 'Fleurs CBD Premium',
    description: 'Découvrez notre sélection de fleurs CBD cultivées avec soin, riches en cannabidiol et aux arômes exceptionnels.',
  },
  huiles: {
    title: 'Huiles CBD de Qualité',
    description: 'Nos huiles CBD à spectre complet ou broad spectrum pour un bien-être optimal au quotidien.',
  },
  resines: {
    title: 'Résines & Hash CBD',
    description: 'Des résines CBD premium aux taux élevés de cannabidiol pour une expérience intense.',
  },
  infusions: {
    title: 'Infusions CBD Relaxantes',
    description: 'Tisanes et infusions au CBD pour des moments de détente et de bien-être.',
  },
  cosmetiques: {
    title: 'Cosmétiques au CBD',
    description: 'Crèmes, baumes et huiles de massage enrichis en CBD pour prendre soin de votre peau.',
  },
  accessoires: {
    title: 'Accessoires CBD',
    description: 'Tout le nécessaire pour profiter pleinement de vos produits CBD.',
  },
}

type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'name'

export default function ProductList({ categorySlug }: { categorySlug: string }) {
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [showFilters, setShowFilters] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  // Filtrer les produits par catégorie
  let filteredProducts = mockProducts.filter(product => product.category === categorySlug)

  // Trier les produits
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

  const handleAddToCart = (product: typeof mockProducts[0]) => {
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

  const info = categoryInfo[categorySlug] || { title: 'Produits CBD', description: '' }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="border-b border-neutral-200 pb-10">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900">{info.title}</h1>
          <p className="mt-4 text-base text-neutral-600">{info.description}</p>
        </div>

        {/* Options de tri et filtres */}
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-sm font-medium text-neutral-700 hover:text-primary-600"
            >
              <AdjustmentsHorizontalIcon className="mr-2 h-5 w-5" />
              Filtres
            </button>
            <span className="text-sm text-neutral-600">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="flex items-center">
            <label htmlFor="sort" className="mr-2 text-sm font-medium text-neutral-700">
              Trier par :
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-md border-neutral-300 text-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="name">Nom</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="rating">Meilleures notes</option>
            </select>
          </div>
        </div>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group">
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
                    {product.cultivationType && (
                      <span className="absolute top-2 left-2 bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        {product.cultivationType}
                      </span>
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

                  <div className="mt-3 flex items-center">
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
                    <span className="ml-2 text-sm text-neutral-600">({product.reviews})</span>
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
                      className="btn-primary !px-3 !py-2 flex items-center"
                    >
                      <ShoppingCartIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-500">Aucun produit trouvé dans cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  )
}
