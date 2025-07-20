'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  SparklesIcon,
  ShieldCheckIcon,
  BeakerIcon,
  TruckIcon
} from '@heroicons/react/24/outline'

const categories = [
  {
    name: 'Fleurs CBD',
    href: '/produits/fleurs',
    image: '/images/img1.jpg',
    description: 'Indoor, Outdoor, Greenhouse',
    color: 'from-green-400 to-green-600',
    icon: '🌿',
    badge: 'Bestseller',
  },
  {
    name: 'Résines CBD',
    href: '/produits/resines',
    image: '/images/img2.jpg',
    description: 'Hash, Pollen, Moonrock',
    color: 'from-orange-400 to-orange-600',
    icon: '🟫',
    badge: null,
  },
  {
    name: 'Infusions CBD',
    href: '/produits/infusions',
    image: '/images/img4.jpg',
    description: 'Relaxation, Sommeil, Digestion',
    color: 'from-purple-400 to-purple-600',
    icon: '☕',
    badge: 'Nouveau',
  },
  {
    name: 'Accessoires',
    href: '/produits/accessoires',
    image: '/images/img6.jpg',
    description: 'Vaporisateurs, Grinders',
    color: 'from-blue-400 to-blue-600',
    icon: '💨',
    badge: null,
  },
]

const features = [
  {
    icon: ShieldCheckIcon,
    title: 'Qualité Premium',
    description: 'Produits sélectionnés avec soin et testés en laboratoire'
  },
  {
    icon: BeakerIcon,
    title: 'THC < 0.3%',
    description: 'Conformité légale garantie sur tous nos produits'
  },
  {
    icon: TruckIcon,
    title: 'Livraison Rapide',
    description: 'Expédition discrète sous 24h'
  }
]

export default function ProduitsPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: 'radial-gradient(circle at 30% 20%, #059669 0%, transparent 50%), radial-gradient(circle at 70% 60%, #f59e0b 0%, transparent 50%)'
            }}
          />
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
              <span className="text-sm font-semibold text-primary-700">CBD de Qualité</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
              <span className="block text-neutral-900">Nos Produits</span>
              <span className="block text-gradient mt-2">CBD Premium</span>
            </h1>
            
            <p className="mt-6 text-xl text-neutral-700 max-w-3xl mx-auto">
              Découvrez notre sélection de produits CBD de qualité premium. 
              Fleurs, résines, infusions et accessoires pour votre bien-être quotidien.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-neutral-900">{feature.title}</h3>
                <p className="mt-2 text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">Nos Catégories</h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Explorez notre gamme complète de produits CBD sélectionnés pour leur qualité exceptionnelle
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={category.href}>
                <div className="card overflow-hidden group-hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                    
                    {category.badge && (
                      <span className="absolute top-4 right-4 bg-white text-primary-600 text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                        {category.badge}
                      </span>
                    )}
                    
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="text-3xl mb-2 block">{category.icon}</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="mt-2 text-neutral-600">{category.description}</p>
                    
                    <div className="mt-4 flex items-center text-primary-600 font-medium group-hover:text-primary-700">
                      <span>Découvrir</span>
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Besoin de conseils ?</h2>
            <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
              Notre équipe est là pour vous aider à choisir les produits CBD qui vous conviennent le mieux.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-full hover:bg-neutral-100 transition-colors"
              >
                Nous contacter
              </Link>
              <Link
                href="/a-propos"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-400 transition-colors"
              >
                En savoir plus
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
