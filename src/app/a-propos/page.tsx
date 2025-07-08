'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  HeartIcon, 
  ShieldCheckIcon, 
  BeakerIcon,
  TruckIcon,
  StarIcon,
  UsersIcon,
  SparklesIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const values = [
  {
    icon: HeartIcon,
    title: 'Passion du CBD',
    description: 'Nous sommes passionnés par les bienfaits du CBD et souhaitons partager cette passion avec vous.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Qualité Premium',
    description: 'Nous sélectionnons uniquement les meilleurs produits, testés en laboratoire et conformes aux normes.'
  },
  {
    icon: BeakerIcon,
    title: 'Naturel & Bio',
    description: 'Nos produits sont issus de cultures biologiques, sans pesticides ni produits chimiques.'
  },
  {
    icon: TruckIcon,
    title: 'Livraison Rapide',
    description: 'Commande expédiée sous 24h, livraison gratuite dès 50€ d\'achat.'
  }
]

const teamMembers = [
  {
    name: 'Marie Dupont',
    role: 'Fondatrice & CEO',
    image: '/images/team/marie.jpg',
    description: 'Passionnée par le bien-être naturel depuis 10 ans.'
  },
  {
    name: 'Thomas Martin',
    role: 'Responsable Qualité',
    image: '/images/team/thomas.jpg',
    description: 'Expert en contrôle qualité des produits CBD.'
  },
  {
    name: 'Sophie Bernard',
    role: 'Conseillère Client',
    image: '/images/team/sophie.jpg',
    description: 'À votre écoute pour vous guider dans vos choix.'
  }
]

const milestones = [
  { year: '2020', event: 'Création de Bon Plan CBD' },
  { year: '2021', event: 'Ouverture de notre première boutique à Rouen' },
  { year: '2022', event: 'Lancement de notre gamme exclusive' },
  { year: '2023', event: 'Plus de 10 000 clients satisfaits' },
  { year: '2024', event: 'Expansion nationale avec 3 nouvelles boutiques' },
  { year: '2025', event: 'Leader du CBD en Normandie' }
]

export default function AboutPage() {
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
              <span className="text-sm font-semibold text-primary-700">Depuis 2020</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
              <span className="block text-neutral-900">À propos de</span>
              <span className="block text-gradient mt-2">Bon Plan CBD</span>
            </h1>
            
            <p className="mt-6 text-xl text-neutral-700 max-w-3xl mx-auto">
              Votre boutique de confiance pour des produits CBD de qualité premium. 
              Nous sommes passionnés par le bien-être naturel et engagés à vous offrir le meilleur du CBD.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Story Section */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">Notre Histoire</h2>
            <div className="space-y-4 text-neutral-600">
              <p>
                Bon Plan CBD est né d'une passion commune pour le bien-être naturel et les bienfaits du chanvre. 
                Fondée en 2020 à Rouen, notre entreprise s'est rapidement imposée comme une référence dans le domaine du CBD en Normandie.
              </p>
              <p>
                Notre mission est simple : démocratiser l'accès à des produits CBD de qualité exceptionnelle, 
                tout en offrant des conseils personnalisés et un service client irréprochable.
              </p>
              <p>
                Aujourd'hui, avec plusieurs boutiques physiques et notre site e-commerce, nous servons des milliers 
                de clients satisfaits qui nous font confiance pour leur bien-être quotidien.
              </p>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-8">
              <div>
                <div className="text-4xl font-bold text-primary-600">5+</div>
                <div className="text-sm text-neutral-600">Années d'expérience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600">10k+</div>
                <div className="text-sm text-neutral-600">Clients satisfaits</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600">4</div>
                <div className="text-sm text-neutral-600">Boutiques physiques</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/about/store.jpg"
                alt="Notre boutique"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-primary-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-secondary-100 rounded-full blur-3xl opacity-50" />
          </motion.div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Nos Valeurs</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Ce qui nous guide au quotidien dans notre mission de vous offrir le meilleur du CBD
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-neutral-900">{value.title}</h3>
                <p className="mt-2 text-neutral-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">Notre Parcours</h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Les étapes clés de notre développement
          </p>
        </motion.div>
        
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-neutral-200" />
          
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex items-center ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              } mb-8`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="text-2xl font-bold text-primary-600 mb-2">{milestone.year}</div>
                  <p className="text-neutral-700">{milestone.event}</p>
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Notre Équipe</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Des experts passionnés à votre service
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full blur-xl opacity-20" />
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                <p className="text-neutral-600">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 text-white text-center"
        >
          <ShieldCheckIcon className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">Nos Certifications & Garanties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <CheckCircleIcon className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Produits Testés</h3>
              <p className="text-primary-100">Analyses en laboratoire indépendant</p>
            </div>
            <div>
              <CheckCircleIcon className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">THC &lt; 0.3%</h3>
              <p className="text-primary-100">Conformité légale garantie</p>
            </div>
            <div>
              <CheckCircleIcon className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Bio & Naturel</h3>
              <p className="text-primary-100">Sans pesticides ni OGM</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <UsersIcon className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Rejoignez notre communauté</h2>
            <p className="text-xl mb-8 text-neutral-300 max-w-2xl mx-auto">
              Des milliers de clients nous font déjà confiance. Découvrez pourquoi !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 font-semibold rounded-full hover:bg-neutral-100 transition-colors"
              >
                Nous contacter
              </a>
              <a
                href="/produits"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transition-colors"
              >
                Découvrir nos produits
              </a>
              <a
                href="https://www.google.com/search?rls=en&q=Bon%20Plan%20CBD%20Rouen%20(%26%20Livraison)%20Avis&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxK2MDU2NDIxNjYzNTOwMDQxMTG22MDI-IpR1Sk_TyEgJzFPwdnJRSEovzQ1T0FDTcEns6woMbM4P09TwbEss3gRK3HqABE65ZhqAAAA&rldimm=8531243365608144438&tbm=lcl&client=safari&cs=1&hl=fr&sa=X&ved=0CB0Q9fQKKABqFwoTCKjFs5WxpY4DFQAAAAAdAAAAABAH&biw=1470&bih=839&dpr=2#lkt=LocalPoiReviews"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-secondary-600 text-white font-semibold rounded-full hover:bg-secondary-700 transition-colors"
              >
                Voir les avis des clients
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}