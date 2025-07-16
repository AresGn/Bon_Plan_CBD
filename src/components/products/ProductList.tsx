'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { StarIcon } from '@heroicons/react/20/solid'
import { ShoppingCartIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/hooks/useCartStore'
import { useProducts } from '@/hooks/useProducts'
import toast from 'react-hot-toast'

// Type pour les produits mock simplifiés
interface SimplifiedProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  cbdRate: number;
  thcRate: number;
  rating: number;
  reviews: number;
  cultivationType?: string;
  description: string;
  inStock: boolean;
}

// Données de démonstration - à remplacer par des appels API
const mockProducts: SimplifiedProduct[] = [
  {
    id: '1',
    name: 'OG Kush CBD',
    slug: 'og-kush-cbd',
    category: 'fleurs',
    price: 9.90,
    originalPrice: 12.90,
    image: '/images/img8.jpg',
    cbdRate: 18,
    thcRate: 0.3,
    rating: 4.9,
    reviews: 145,
    cultivationType: 'Greenhouse',
    description: 'Fleurs compactes aux arômes sour, notes crémeuses et rondes',
    inStock: true,
  },
  {
    id: '2',
    name: 'Small Bud Orange Bud',
    slug: 'small-bud-orange-bud',
    category: 'fleurs',
    price: 7.50,
    originalPrice: 9.90,
    image: '/images/img9.jpg',
    cbdRate: 15,
    thcRate: 0.3,
    rating: 4.7,
    reviews: 89,
    cultivationType: 'Greenhouse',
    description: 'Goût fruité et notes d\'agrumes, idéal pour la relaxation',
    inStock: true,
  },
  {
    id: '3',
    name: 'Small Bud Amnesia',
    slug: 'small-bud-amnesia',
    category: 'fleurs',
    price: 8.50,
    originalPrice: 11.90,
    image: '/images/img10.jpg',
    cbdRate: 16,
    thcRate: 0.3,
    rating: 4.8,
    reviews: 112,
    cultivationType: 'Indoor',
    description: 'Concentration exceptionnelle en arômes, relaxation profonde',
    inStock: true,
  },
  {
    id: '4',
    name: 'Super Skunk CBD',
    slug: 'super-skunk-cbd',
    category: 'fleurs',
    price: 8.90,
    originalPrice: 11.50,
    image: '/images/img11.jpg',
    cbdRate: 17,
    thcRate: 0.3,
    rating: 4.8,
    reviews: 134,
    cultivationType: 'Outdoor',
    description: 'Arômes amers et fruités, notes de bois et pin',
    inStock: true,
  },
  {
    id: '5',
    name: 'Blue Dream CBD',
    slug: 'blue-dream-cbd',
    category: 'fleurs',
    price: 6.90,
    originalPrice: 8.90,
    image: '/images/img12.jpg',
    cbdRate: 11,
    thcRate: 0.3,
    rating: 4.6,
    reviews: 78,
    cultivationType: 'Greenhouse',
    description: 'Notes citronnées avec des touches de pin et fruits doux',
    inStock: true,
  },
  {
    id: '6',
    name: 'Dutch Chocolate',
    slug: 'dutch-chocolate',
    category: 'fleurs',
    price: 10.90,
    originalPrice: 13.90,
    image: '/images/img13.jpg',
    cbdRate: 19,
    thcRate: 0.3,
    rating: 4.9,
    reviews: 167,
    cultivationType: 'Outdoor',
    description: 'Parfum doux et gourmand rappelant le chocolat fin',
    inStock: true,
  },
  {
    id: '7',
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
    description: 'Crèmes, baumes et soins de massage enrichis en CBD pour prendre soin de votre peau.',
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
  
  // Récupérer les produits depuis l'API
  const { products, loading, error } = useProducts({ category: categorySlug, status: 'ACTIVE' })
  
  // Convertir les produits de l'API en produits simplifiés pour l'affichage
  const simplifiedProducts: SimplifiedProduct[] = products.map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    category: p.category.slug,
    price: p.price,
    originalPrice: p.originalPrice || p.price,
    image: p.images?.[0] || '/images/default-product.jpg',
    cbdRate: p.cbdRate,
    thcRate: p.thcRate,
    rating: 4.5, // Valeur par défaut car pas de reviews pour l'instant
    reviews: 0,
    cultivationType: p.cultivationType,
    description: p.description,
    inStock: p.stock > 0,
  }))
  
  // Utiliser les produits de l'API ou les produits de démo si aucun produit n'est trouvé
  let filteredProducts = simplifiedProducts.length > 0 ? simplifiedProducts : mockProducts.filter(product => product.category === categorySlug)

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

  const handleAddToCart = (product: SimplifiedProduct) => {
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

  // Afficher un état de chargement
  if (loading) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-neutral-900">Chargement des produits...</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-neutral-200 rounded-lg aspect-square"></div>
                  <div className="p-4">
                    <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Afficher une erreur si nécessaire
  if (error) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Erreur lors du chargement des produits</p>
          </div>
        </div>
      </div>
    )
  }

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
