'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

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
    name: 'Cosmétiques',
    href: '/produits/cosmetiques',
    image: '/images/img5.jpg',
    description: 'Crèmes, Baumes, Soins',
    color: 'from-pink-400 to-pink-600',
    icon: '🧴',
    badge: null,
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

export default function Categories() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-neutral-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900">
            <span className="block">Explorez nos</span>
            <span className="block text-gradient mt-2">Catégories Premium</span>
          </h2>
          <p className="mt-4 text-xl text-neutral-600 max-w-2xl mx-auto">
            Une sélection rigoureuse de produits CBD d'exception, testés et approuvés
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="relative"
            >
              <Link
                href={category.href}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
                  {/* Badge */}
                  {category.badge && (
                    <div className="absolute top-2 right-2 z-10">
                      <span className="px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full shadow-md">
                        {category.badge}
                      </span>
                    </div>
                  )}
                  
                  {/* Image Container */}
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                    
                    {/* Icon only, no image */}
                    <motion.div 
                      className="text-6xl z-10"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {category.icon}
                    </motion.div>
                    {/* Hover Arrow */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <ArrowRightIcon className="w-5 h-5 text-primary-600" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-neutral-900 group-hover:text-primary-600 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-xs text-neutral-500 group-hover:text-neutral-700 transition-colors duration-300">
                      {category.description}
                    </p>
                    
                    {/* Bottom Line Animation */}
                    <div className="mt-3 h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/produits"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Voir tous les produits
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
