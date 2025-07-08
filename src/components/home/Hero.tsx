'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { StarIcon, ShieldCheckIcon, TruckIcon, SparklesIcon } from '@heroicons/react/24/solid'

export default function Hero() {
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-neutral-50 via-primary-50/30 to-secondary-50/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-96 h-96 bg-secondary-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-80 h-80 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-6"
            >
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-white flex items-center justify-center">
                    <StarIcon className="w-4 h-4 text-white" />
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium text-neutral-700">+1000 clients satisfaits</span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-neutral-900">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="block"
              >
                Le CBD
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="block bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 bg-clip-text text-transparent"
              >
                Premium
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="block text-3xl lg:text-5xl mt-2"
              >
                à prix accessible
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-lg lg:text-xl text-neutral-600 leading-relaxed"
            >
              Découvrez notre sélection exceptionnelle de produits CBD.
              <span className="font-semibold text-neutral-800"> 100% légaux, testés en laboratoire</span>, 
              pour votre bien-être au quotidien.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/produits"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  <span className="relative flex items-center">
                    Explorer la boutique
                    <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/promotions"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary-200 hover:border-primary-300"
                >
                  <SparklesIcon className="w-5 h-5 mr-2 text-secondary-500" />
                  Voir les promotions
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Features Grid */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6"
            >
              {[
                { icon: ShieldCheckIcon, value: "100%", label: "Légal & Testé" },
                { icon: StarIcon, value: "4.9/5", label: "Note clients" },
                { icon: TruckIcon, value: "24-48h", label: "Livraison" },
                { icon: SparklesIcon, value: "Premium", label: "Qualité" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <item.icon className="w-8 h-8 text-primary-600 mb-2" />
                  <div className="text-2xl font-bold text-neutral-900">{item.value}</div>
                  <div className="text-sm text-neutral-600">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 lg:mt-0 relative"
          >
            {/* Main Product Showcase */}
            <div className="relative">
              {/* Floating Elements */}
              <motion.div
                animate={floatingAnimation}
                className="absolute -top-10 -left-10 w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full opacity-20 blur-xl"
              />
              <motion.div
                animate={floatingAnimation}
                transition={{ delay: 1 }}
                className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full opacity-20 blur-xl"
              />
              
              {/* Product Cards Stack */}
              <div className="relative">
                {/* Background Cards */}
                <motion.div
                  animate={{ rotate: -5 }}
                  className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl transform -rotate-6"
                />
                <motion.div
                  animate={{ rotate: 5 }}
                  className="absolute inset-0 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-3xl transform rotate-6"
                />
                
                {/* Main Card */}
                <motion.div
                  whileHover={{ y: -10 }}
                  className="relative bg-white rounded-3xl shadow-2xl overflow-hidden"
                >
                  <div className="p-8">
                    <div className="relative h-[400px] rounded-2xl overflow-hidden">
                      <Image
                        src="/images/hero.jpg"
                        alt="Produits CBD Premium"
                        fill
                        className="object-cover"
                        priority
                      />
                      
                      {/* Overlay Badges */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      
                      {/* Promo Badge */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 1, type: "spring" }}
                        className="absolute top-4 right-4"
                      >
                        <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-xl flex items-center gap-2">
                          <SparklesIcon className="w-5 h-5" />
                          -20% OFFERT
                        </div>
                      </motion.div>
                      
                      {/* Product Info */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.2 }}
                          className="bg-white/90 backdrop-blur-md rounded-2xl p-4"
                        >
                          <p className="text-sm text-primary-600 font-semibold mb-1">Bestseller</p>
                          <h3 className="text-xl font-bold text-neutral-900">Fleur CBD Premium</h3>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon key={i} className="w-4 h-4 text-yellow-500" />
                              ))}
                              <span className="text-sm text-neutral-600 ml-1">(127 avis)</span>
                            </div>
                            <p className="text-lg font-bold text-primary-600">9.90€/g</p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Floating Product Pills */}
              <motion.div
                animate={floatingAnimation}
                className="absolute -top-5 left-10 bg-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2"
              >
                <span className="text-2xl">🌿</span>
                <span className="text-sm font-medium">100% Bio</span>
              </motion.div>
              
              <motion.div
                animate={floatingAnimation}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-5 right-10 bg-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2"
              >
                <span className="text-2xl">🔬</span>
                <span className="text-sm font-medium">Testé en labo</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}
