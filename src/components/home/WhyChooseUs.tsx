'use client'

import { 
  ShieldCheckIcon, 
  TruckIcon, 
  BeakerIcon, 
  UserGroupIcon,
  CurrencyEuroIcon,
  LockClosedIcon,
  CheckBadgeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Image from 'next/image'

const features = [
  {
    name: 'Produits Certifiés',
    description: 'Tous nos produits sont testés en laboratoire indépendant. Analyses disponibles sur demande.',
    icon: ShieldCheckIcon,
    gradient: 'from-emerald-400 to-emerald-600',
    delay: 0,
  },
  {
    name: 'Livraison Express',
    description: 'Expédition en 24h. Livraison gratuite dès 50€. Colis discret et suivi garantis.',
    icon: TruckIcon,
    gradient: 'from-blue-400 to-blue-600',
    delay: 0.1,
  },
  {
    name: 'Qualité Premium',
    description: 'Sélection rigoureuse des meilleurs producteurs européens. THC < 0.3% garanti.',
    icon: BeakerIcon,
    gradient: 'from-purple-400 to-purple-600',
    delay: 0.2,
  },
  {
    name: 'Conseils Experts',
    description: 'Notre équipe est formée pour vous conseiller et répondre à toutes vos questions.',
    icon: UserGroupIcon,
    gradient: 'from-orange-400 to-orange-600',
    delay: 0.3,
  },
  {
    name: 'Meilleurs Prix',
    description: 'Prix compétitifs et promotions régulières. Programme de fidélité avantageux.',
    icon: CurrencyEuroIcon,
    gradient: 'from-yellow-400 to-yellow-600',
    delay: 0.4,
  },
  {
    name: 'Paiement Sécurisé',
    description: 'Transactions 100% sécurisées. Paiement par CB, virement ou crypto-monnaies.',
    icon: LockClosedIcon,
    gradient: 'from-red-400 to-red-600',
    delay: 0.5,
  },
]

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full mb-4">
            <CheckBadgeIcon className="w-5 h-5 text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">Nos Engagements</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900">
            <span className="block">Pourquoi Choisir</span>
            <span className="block text-gradient mt-2">Bon Plan CBD ?</span>
          </h2>
          <p className="mt-4 text-xl text-neutral-600 max-w-2xl mx-auto">
            Découvrez ce qui fait de nous le leader du CBD en France
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay, duration: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="relative group"
            >
              <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Icon Container */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                    <feature.icon className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                </motion.div>
                
                {/* Content */}
                <h3 className="mt-6 text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                  {feature.name}
                </h3>
                <p className="mt-3 text-base text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Decorative Element */}
                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full opacity-0 group-hover:opacity-50 transition-all duration-500 blur-2xl" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-20 relative"
        >
          <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 rounded-3xl p-12 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <Image
                src="/images/pattern.png"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
            />
            <motion.div
              animate={{
                y: [0, 20, 0],
                rotate: [0, -5, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
            />
            
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6"
              >
                <SparklesIcon className="w-5 h-5 text-white" />
                <span className="text-sm font-semibold text-white">Satisfaction Garantie</span>
              </motion.div>
              
              <h3 className="text-3xl font-bold text-white mb-4">
                Rejoignez des milliers de clients satisfaits
              </h3>
              <p className="text-lg text-white/90 max-w-3xl mx-auto mb-12">
                Nous nous engageons à vous offrir la meilleure expérience CBD possible.
                Satisfait ou remboursé sous 14 jours.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {[
                  { value: '98%', label: 'Clients satisfaits', icon: '😊' },
                  { value: '4.9/5', label: 'Note moyenne', icon: '⭐' },
                  { value: '+5000', label: 'Clients fidèles', icon: '❤️' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
                  >
                    <div className="text-4xl mb-2">{stat.icon}</div>
                    <div className="text-4xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-white/80 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 }}
                className="mt-12"
              >
                <a
                  href="https://www.google.com/search?rls=en&q=Bon%20Plan%20CBD%20Rouen%20(%26%20Livraison)%20Avis&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxK2MDU2NDIxNjYzNTOwMDQxMTG22MDI-IpR1Sk_TyEgJzFPwdnJRSEovzQ1T0FDTcEns6woMbM4P09TwbEss3gRK3HqABE65ZhqAAAA&rldimm=8531243365608144438&tbm=lcl&client=safari&cs=1&hl=fr&sa=X&ved=0CB0Q9fQKKABqFwoTCKjFs5WxpY4DFQAAAAAdAAAAABAH&biw=1470&bih=839&dpr=2#lkt=LocalPoiReviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Voir les avis clients
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
