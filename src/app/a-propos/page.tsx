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
    icon: ShieldCheckIcon,
    title: 'Qualité Premium',
    description: 'Nous sélectionnons avec soin les produits à base de cannabinoïdes que nous vous proposons, en nous assurant de leur qualité, tant au niveau des matières premières utilisées que des processus de fabrication.'
  },
  {
    icon: BeakerIcon,
    title: 'Testé en Laboratoire',
    description: 'Tous nos produits possèdent un taux de THC inférieur au taux légal maximal (0,3%) et sont testés en laboratoire pour garantir leur conformité.'
  },
  {
    icon: HeartIcon,
    title: 'Bien-être Naturel',
    description: 'Le CBD peut notamment être très efficace pour contribuer à lutter contre l\'anxiété, le stress, les douleurs chroniques ou encore les problèmes de sommeil.'
  },
  {
    icon: TruckIcon,
    title: 'Service Client',
    description: 'Notre service client se tient à votre disposition pour vous apporter une réponse adaptée et personnalisée.'
  }
]

const benefits = [
  {
    icon: HeartIcon,
    title: 'Anxiété et Stress',
    description: 'Le CBD peut aider à apaiser le stress, calmer l\'anxiété et favoriser un meilleur sommeil.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Douleurs Chroniques',
    description: 'Certaines personnes s\'en servent pour soulager des douleurs chroniques ou inflammatoires.'
  },
  {
    icon: BeakerIcon,
    title: 'Troubles du Sommeil',
    description: 'Le CBD pourrait aider à améliorer la qualité du sommeil et lutter contre l\'insomnie.'
  },
  {
    icon: CheckCircleIcon,
    title: 'Bien-être Général',
    description: 'Utilisé pour l\'amélioration du bien-être général et la relaxation au quotidien.'
  }
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
              <span className="text-sm font-semibold text-primary-700">CBD de Qualité</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
              <span className="block text-neutral-900">À propos de</span>
              <span className="block text-gradient mt-2">Bon Plan Pro 76</span>
            </h1>

            <p className="mt-6 text-xl text-neutral-700 max-w-3xl mx-auto">
              Votre boutique CBD de confiance à Rouen. Nous vous proposons les meilleurs produits à base de cannabis légal,
              livrés rapidement et discrètement.
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
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">Le CBD, qu'est-ce que c'est ?</h2>
            <div className="space-y-4 text-neutral-600">
              <p>
                Abréviation du cannabidiol et membre de la famille des cannabinoïdes, <strong>le CBD est un principe actif extrait du plant de chanvre</strong>.
                Contrairement au THC, molécule également présente dans la plante de cannabis, le CBD ne crée pas d'effet psychotrope, de dépendance, ni d'accoutumance et ses effets indésirables sont très rares.
              </p>
              <p>
                Utilisé en Chine depuis plus de 6000 ans pour son potentiel thérapeutique, <strong>le CBD est de plus en plus recommandé pour ses nombreux effets et bienfaits généraux sur la santé.</strong>
                Il peut notamment être très efficace pour contribuer à lutter contre l'anxiété, le stress, les douleurs chroniques ou encore les problèmes de sommeil et l'insomnie.
              </p>
              <p>
                Bon Plan Pro 76 est une boutique qui vous propose <strong>les meilleurs produits à base de cannabis légal, livré chez vous rapidement et discrètement</strong>.
                Vous trouverez le CBD sous différentes formes et avec des concentrations variées afin d'améliorer votre bien-être et votre qualité de vie au quotidien.
              </p>
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
                src="/images/hero.jpg"
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
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Pourquoi choisir Bon Plan Pro 76 ?</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Nous avons sélectionné les meilleurs produits à base de chanvre afin de vous proposer, en toute légalité, une expérience optimale et une amélioration de votre bien-être au quotidien
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

      

      {/* Benefits Section */}
      <div className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Quels sont les bienfaits du CBD ?</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Le CBD pourrait aider dans de nombreux domaines du bien-être quotidien
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <benefit.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-neutral-900">{benefit.title}</h3>
                <p className="mt-2 text-neutral-600">{benefit.description}</p>
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
          <h2 className="text-3xl font-bold mb-6">Du CBD de Haute Qualité</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <CheckCircleIcon className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Qualité Contrôlée</h3>
              <p className="text-primary-100">Nous avons sélectionné avec soin les produits que nous vous proposons</p>
            </div>
            <div>
              <CheckCircleIcon className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">THC &lt; 0.3%</h3>
              <p className="text-primary-100">Tous nos produits respectent la législation française</p>
            </div>
            <div>
              <CheckCircleIcon className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Livraison Discrète</h3>
              <p className="text-primary-100">Expédition discrète et sécurisée</p>
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
            <h2 className="text-3xl font-bold mb-4">Découvrez nos produits CBD</h2>
            <p className="text-xl mb-8 text-neutral-300 max-w-2xl mx-auto">
              Fleurs, résines, infusions... Trouvez le produit CBD qui vous convient !
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

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}