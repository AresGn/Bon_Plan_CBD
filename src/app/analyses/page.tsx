'use client'

import { motion } from 'framer-motion'
import { 
  BeakerIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

const analysisTypes = [
  {
    icon: BeakerIcon,
    title: 'Analyse des Cannabinoïdes',
    description: 'Vérification des taux de CBD, THC et autres cannabinoïdes',
    items: ['CBD', 'THC', 'CBG', 'CBN', 'CBC']
  },
  {
    icon: ShieldCheckIcon,
    title: 'Contrôle des Contaminants',
    description: 'Détection des pesticides, métaux lourds et solvants',
    items: ['Pesticides', 'Métaux lourds', 'Solvants résiduels', 'Mycotoxines']
  },
  {
    icon: DocumentTextIcon,
    title: 'Tests Microbiologiques',
    description: 'Vérification de la pureté microbiologique',
    items: ['Bactéries', 'Levures', 'Moisissures', 'E. coli', 'Salmonelles']
  }
]

const certifications = [
  {
    name: 'Laboratoire Accrédité ISO 17025',
    description: 'Nos analyses sont réalisées par des laboratoires certifiés ISO 17025'
  },
  {
    name: 'Conformité Européenne',
    description: 'Tous nos produits respectent les normes européennes en vigueur'
  },
  {
    name: 'Traçabilité Complète',
    description: 'Chaque lot est tracé de la production à la vente'
  }
]

export default function AnalysesPage() {
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
            <BeakerIcon className="mx-auto h-16 w-16 text-primary-600 mb-6" />
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
              <span className="block text-neutral-900">Analyses</span>
              <span className="block text-gradient mt-2">Laboratoire</span>
            </h1>
            <p className="mt-6 text-xl text-neutral-700 max-w-3xl mx-auto">
              Tous nos produits CBD sont rigoureusement testés en laboratoire indépendant 
              pour garantir leur qualité, leur pureté et leur conformité légale.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Analysis Types */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">Types d'Analyses</h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Chaque produit subit une batterie de tests complets pour assurer votre sécurité
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {analysisTypes.map((analysis, index) => (
            <motion.div
              key={analysis.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card p-8 text-center hover:shadow-xl transition-shadow"
            >
              <div className="mx-auto w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
                <analysis.icon className="w-8 h-8 text-primary-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">{analysis.title}</h3>
              <p className="text-neutral-600 mb-6">{analysis.description}</p>
              
              <div className="space-y-2">
                {analysis.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-center gap-2 text-sm text-neutral-700">
                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Legal Compliance */}
      <div className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Conformité Légale</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Nos analyses garantissent le respect de la législation française et européenne
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">THC &lt; 0,3%</h3>
                  <p className="text-neutral-600">
                    Tous nos produits respectent le seuil légal de THC fixé par la réglementation française.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Variétés Autorisées</h3>
                  <p className="text-neutral-600">
                    Nos produits sont issus exclusivement de variétés de chanvre inscrites au catalogue européen.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Certificats Disponibles</h3>
                  <p className="text-neutral-600">
                    Chaque lot dispose de son certificat d'analyse, disponible sur demande.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-8 text-white"
            >
              <ShieldCheckIcon className="w-12 h-12 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Garantie Qualité</h3>
              <p className="text-primary-100 mb-6">
                Nous nous engageons à ne proposer que des produits de la plus haute qualité, 
                rigoureusement testés et conformes à la réglementation.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5" />
                  <span>Analyses systématiques</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5" />
                  <span>Laboratoires indépendants</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5" />
                  <span>Traçabilité complète</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">Nos Certifications</h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Nous travaillons avec des laboratoires certifiés pour garantir la fiabilité de nos analyses
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card p-6 text-center"
            >
              <div className="mx-auto w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mb-4">
                <ShieldCheckIcon className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">{cert.name}</h3>
              <p className="text-neutral-600">{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How to Request */}
      <div className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Comment Obtenir les Analyses ?</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Accédez facilement aux certificats d'analyse de vos produits
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="mx-auto w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Identifiez le Lot</h3>
              <p className="text-neutral-600">
                Trouvez le numéro de lot sur l'emballage de votre produit
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="mx-auto w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Contactez-nous</h3>
              <p className="text-neutral-600">
                Envoyez-nous le numéro de lot par email ou téléphone
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="mx-auto w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Recevez l'Analyse</h3>
              <p className="text-neutral-600">
                Nous vous envoyons le certificat d'analyse sous 24h
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <ExclamationTriangleIcon className="w-8 h-8 text-amber-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Important</h3>
              <p className="text-amber-700">
                Les analyses sont spécifiques à chaque lot de production. 
                Assurez-vous de nous communiquer le bon numéro de lot pour obtenir l'analyse correspondante.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Demander une Analyse</h2>
            <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
              Besoin du certificat d'analyse de votre produit ? Contactez-nous avec le numéro de lot
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-full hover:bg-neutral-100 transition-colors"
              >
                Nous contacter
              </a>
              <a
                href="mailto:Bonplanpro76@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-400 transition-colors"
              >
                Bonplanpro76@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
