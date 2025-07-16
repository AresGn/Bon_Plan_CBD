'use client'

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { StarIcon } from '@heroicons/react/20/solid'
import { 
  ShoppingCartIcon, 
  HeartIcon,
  ShieldCheckIcon,
  TruckIcon,
  ArrowLeftIcon,
  ChevronDownIcon 
} from '@heroicons/react/24/outline'
import { useCartStore } from '@/hooks/useCartStore'
import toast from 'react-hot-toast'

// Données de démonstration - à remplacer par des appels API
const mockProduct = {
  id: '1',
  name: 'Amnesia Haze',
  slug: 'amnesia-haze',
  category: 'fleurs',
  price: 8.90,
  originalPrice: 12.90,
  images: [
    '/images/products/amnesia-haze.jpg',
    '/images/products/amnesia-haze-2.jpg',
    '/images/products/amnesia-haze-3.jpg',
  ],
  cbdRate: 22,
  thcRate: 0.2,
  rating: 4.8,
  reviews: 124,
  cultivationType: 'Indoor',
  origin: 'Italie',
  terpenes: ['Limonène', 'Myrcène', 'Pinène'],
  effects: ['Relaxation', 'Créativité', 'Bien-être'],
  description: `L'Amnesia Haze est une variété légendaire appréciée pour ses arômes citronnés intenses et ses effets équilibrés. 
  
  Cultivée en indoor avec le plus grand soin, cette fleur CBD offre une expérience gustative exceptionnelle avec des notes d'agrumes, de terre et d'épices. Son taux élevé de CBD (22%) en fait un choix idéal pour la relaxation et le bien-être quotidien.
  
  Nos fleurs sont rigoureusement sélectionnées et testées en laboratoire pour garantir une qualité optimale et un taux de THC inférieur à 0,3% conforme à la législation française.`,
  inStock: true,
  labAnalysisUrl: '/analyses/amnesia-haze-lab.pdf',
}

export default function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ category: string; slug: string }> 
}) {
  const resolvedParams = use(params);
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showDescription, setShowDescription] = useState(true)
  const [showEffects, setShowEffects] = useState(true)
  const [showAnalysis, setShowAnalysis] = useState(false)
  
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem({
      id: mockProduct.id,
      name: mockProduct.name,
      price: mockProduct.price,
      quantity: quantity,
      image: mockProduct.images[0],
      category: mockProduct.category,
      cbdRate: mockProduct.cbdRate,
      thcRate: mockProduct.thcRate,
    })
    toast.success(`${quantity} x ${mockProduct.name} ajouté au panier !`)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    window.location.href = '/checkout'
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <Link href="/" className="text-neutral-500 hover:text-neutral-700">
            Accueil
          </Link>
          <span className="text-neutral-400">/</span>
          <Link 
            href={`/produits/${resolvedParams.category}`} 
            className="text-neutral-500 hover:text-neutral-700 capitalize"
          >
            {resolvedParams.category}
          </Link>
          <span className="text-neutral-400">/</span>
          <span className="text-neutral-900">{mockProduct.name}</span>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Galerie d'images */}
          <div className="lg:max-w-lg lg:self-start">
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-neutral-100">
              <Image
                src={mockProduct.images[selectedImage]}
                alt={mockProduct.name}
                width={600}
                height={600}
                className="h-full w-full object-cover object-center"
              />
            </div>
            
            {/* Miniatures */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              {mockProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg bg-neutral-100 ${
                    selectedImage === index 
                      ? 'ring-2 ring-primary-500' 
                      : 'ring-1 ring-neutral-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${mockProduct.name} ${index + 1}`}
                    width={100}
                    height={100}
                    className="h-full w-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Informations produit */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
              {mockProduct.name}
            </h1>

            {/* Prix et notes */}
            <div className="mt-4">
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl tracking-tight text-neutral-900">
                  {mockProduct.price.toFixed(2)}€
                </span>
                {mockProduct.originalPrice > mockProduct.price && (
                  <>
                    <span className="text-xl text-neutral-500 line-through">
                      {mockProduct.originalPrice.toFixed(2)}€
                    </span>
                    <span className="text-sm font-medium text-red-600">
                      -{Math.round(((mockProduct.originalPrice - mockProduct.price) / mockProduct.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              <div className="mt-4 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(mockProduct.rating)
                          ? 'text-yellow-400'
                          : 'text-neutral-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="ml-3 text-sm text-neutral-600">
                  {mockProduct.rating} sur 5 ({mockProduct.reviews} avis)
                </p>
              </div>
            </div>

            {/* Caractéristiques principales */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="card p-4">
                <p className="text-sm text-neutral-600">Taux de CBD</p>
                <p className="text-2xl font-bold text-primary-600">{mockProduct.cbdRate}%</p>
              </div>
              <div className="card p-4">
                <p className="text-sm text-neutral-600">Taux de THC</p>
                <p className="text-2xl font-bold text-neutral-900">&lt;{mockProduct.thcRate}%</p>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {mockProduct.cultivationType && (
                <span className="badge badge-success">{mockProduct.cultivationType}</span>
              )}
              <span className="badge badge-info">Origine: {mockProduct.origin}</span>
              <span className="badge badge-warning">Testé en labo</span>
            </div>

            {/* Description courte */}
            <p className="mt-6 text-neutral-600">
              {mockProduct.description.split('\n')[0]}
            </p>

            {/* Quantité et actions */}
            <div className="mt-8">
              <div className="flex items-center space-x-4">
                <label htmlFor="quantity" className="text-sm font-medium text-neutral-700">
                  Quantité (g)
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="rounded-md border-neutral-300 py-1.5 text-base focus:border-primary-500 focus:ring-primary-500"
                >
                  {[1, 2, 3, 5, 10, 20, 50].map((q) => (
                    <option key={q} value={q}>{q}g</option>
                  ))}
                </select>
              </div>

              <div className="mt-6 flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="btn-primary flex-1 flex items-center justify-center"
                >
                  <ShoppingCartIcon className="mr-2 h-5 w-5" />
                  Ajouter au panier
                </button>
                <button
                  onClick={handleBuyNow}
                  className="btn-secondary flex-1"
                >
                  Acheter maintenant
                </button>
                <button className="btn-outline !px-4">
                  <HeartIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Garanties */}
            <div className="mt-8 border-t border-neutral-200 pt-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <ShieldCheckIcon className="h-6 w-6 text-primary-600 flex-shrink-0" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-neutral-900">
                      Produit testé et certifié
                    </p>
                    <p className="text-sm text-neutral-600">
                      Analyses laboratoire disponibles, THC &lt;0.3% garanti
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <TruckIcon className="h-6 w-6 text-primary-600 flex-shrink-0" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-neutral-900">
                      Livraison rapide et discrète
                    </p>
                    <p className="text-sm text-neutral-600">
                      Expédition en 24h, colis neutre, livraison gratuite dès 50€
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sections détaillées */}
        <div className="mt-16 space-y-8">
          {/* Description complète */}
          <div className="border-t border-neutral-200 pt-8">
            <button
              onClick={() => setShowDescription(!showDescription)}
              className="flex w-full items-center justify-between text-left"
            >
              <h2 className="text-lg font-medium text-neutral-900">Description détaillée</h2>
              <ChevronDownIcon 
                className={`h-5 w-5 text-neutral-500 transition-transform ${
                  showDescription ? 'rotate-180' : ''
                }`} 
              />
            </button>
            {showDescription && (
              <div className="mt-4 prose prose-sm text-neutral-600">
                {mockProduct.description.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>

          {/* Effets et terpènes */}
          <div className="border-t border-neutral-200 pt-8">
            <button
              onClick={() => setShowEffects(!showEffects)}
              className="flex w-full items-center justify-between text-left"
            >
              <h2 className="text-lg font-medium text-neutral-900">Effets et profil terpénique</h2>
              <ChevronDownIcon 
                className={`h-5 w-5 text-neutral-500 transition-transform ${
                  showEffects ? 'rotate-180' : ''
                }`} 
              />
            </button>
            {showEffects && (
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium text-neutral-900">Effets ressentis</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {mockProduct.effects.map((effect) => (
                      <span key={effect} className="badge badge-info">
                        {effect}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-900">Terpènes principaux</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {mockProduct.terpenes.map((terpene) => (
                      <span key={terpene} className="badge badge-success">
                        {terpene}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Analyse laboratoire */}
          <div className="border-t border-neutral-200 pt-8">
            <button
              onClick={() => setShowAnalysis(!showAnalysis)}
              className="flex w-full items-center justify-between text-left"
            >
              <h2 className="text-lg font-medium text-neutral-900">Analyse laboratoire</h2>
              <ChevronDownIcon 
                className={`h-5 w-5 text-neutral-500 transition-transform ${
                  showAnalysis ? 'rotate-180' : ''
                }`} 
              />
            </button>
            {showAnalysis && (
              <div className="mt-4">
                <p className="text-sm text-neutral-600">
                  Tous nos produits sont analysés par des laboratoires indépendants certifiés.
                </p>
                <a
                  href={mockProduct.labAnalysisUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Télécharger l'analyse complète (PDF)
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
