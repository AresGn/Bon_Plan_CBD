'use client'

import { motion } from 'framer-motion'
import { 
  TruckIcon,
  ClockIcon,
  ShieldCheckIcon,
  MapPinIcon,
  CreditCardIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const deliveryOptions = [
  {
    icon: TruckIcon,
    name: 'Colissimo Suivi',
    description: 'Livraison standard avec suivi',
    price: '4,90€',
    delay: '24-48h',
    features: ['Suivi en ligne', 'Remise en main propre ou boîte aux lettres', 'Assurance incluse']
  },
  {
    icon: ClockIcon,
    name: 'Chronopost Express',
    description: 'Livraison express garantie',
    price: '9,90€',
    delay: '24h',
    features: ['Livraison avant 13h', 'Suivi en temps réel', 'Signature obligatoire']
  },
  {
    icon: MapPinIcon,
    name: 'Point Relais',
    description: 'Retrait en point relais',
    price: '3,90€',
    delay: '24-48h',
    features: ['Plus de 10 000 points relais', 'Horaires étendus', 'Retrait sous 14 jours']
  },
  {
    icon: ShieldCheckIcon,
    name: 'Retrait Boutique',
    description: 'Retrait gratuit en magasin',
    price: 'Gratuit',
    delay: '2h',
    features: ['Préparation rapide', 'Conseils personnalisés', 'Pas de frais de port']
  }
]

const zones = [
  {
    name: 'France Métropolitaine',
    delay: '24-48h ouvrées',
    methods: ['Colissimo', 'Chronopost', 'Point Relais']
  },
  {
    name: 'Corse',
    delay: '3-5 jours ouvrés',
    methods: ['Colissimo']
  },
  {
    name: 'DOM-TOM',
    delay: '5-7 jours ouvrés',
    methods: ['Colissimo International']
  }
]

export default function LivraisonPage() {
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
            <TruckIcon className="mx-auto h-16 w-16 text-primary-600 mb-6" />
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
              <span className="block text-neutral-900">Livraison</span>
              <span className="block text-gradient mt-2">Rapide & Discrète</span>
            </h1>
            <p className="mt-6 text-xl text-neutral-700 max-w-3xl mx-auto">
              Recevez vos produits CBD rapidement et en toute discrétion. 
              Plusieurs options de livraison pour s'adapter à vos besoins.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Delivery Options */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">Nos Options de Livraison</h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Choisissez le mode de livraison qui vous convient le mieux
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {deliveryOptions.map((option, index) => (
            <motion.div
              key={option.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div className="mx-auto w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-4">
                <option.icon className="w-8 h-8 text-primary-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">{option.name}</h3>
              <p className="text-neutral-600 mb-4">{option.description}</p>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-primary-600">{option.price}</span>
                <span className="text-sm text-neutral-500">{option.delay}</span>
              </div>
              
              <ul className="space-y-2 text-sm text-neutral-600">
                {option.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Delivery Zones */}
      <div className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Zones de Livraison</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Nous livrons dans toute la France et les territoires d'outre-mer
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {zones.map((zone, index) => (
              <motion.div
                key={zone.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-6"
              >
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">{zone.name}</h3>
                <p className="text-primary-600 font-medium mb-4">{zone.delay}</p>
                <div>
                  <p className="text-sm text-neutral-600 mb-2">Modes disponibles :</p>
                  <ul className="space-y-1">
                    {zone.methods.map((method, idx) => (
                      <li key={idx} className="text-sm text-neutral-700 flex items-center">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                        {method}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Important Information */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 text-white"
        >
          <div className="text-center mb-8">
            <ShieldCheckIcon className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Livraison Discrète & Sécurisée</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Emballage Discret</h3>
              <p className="text-primary-100">Aucune mention du contenu sur le colis</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Expédition Rapide</h3>
              <p className="text-primary-100">Commandes traitées sous 24h</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Suivi Inclus</h3>
              <p className="text-primary-100">Numéro de suivi envoyé par email</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Questions Fréquentes</h2>
          </motion.div>

          <div className="space-y-8">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                À partir de quel montant la livraison est-elle gratuite ?
              </h3>
              <p className="text-neutral-600">
                La livraison est gratuite à partir de 50€ d'achat pour la France métropolitaine 
                (hors Chronopost Express).
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Puis-je modifier mon adresse de livraison après commande ?
              </h3>
              <p className="text-neutral-600">
                Vous pouvez modifier votre adresse de livraison tant que votre commande n'a pas été expédiée. 
                Contactez-nous rapidement au 07 88 64 69 83.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Que faire si je ne suis pas présent à la livraison ?
              </h3>
              <p className="text-neutral-600">
                Le transporteur laissera un avis de passage. Vous pourrez récupérer votre colis 
                au bureau de poste ou programmer une nouvelle livraison.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Les produits CBD peuvent-ils être saisis par les douanes ?
              </h3>
              <p className="text-neutral-600">
                Non, tous nos produits respectent la législation française (THC &lt; 0,3%) et sont 
                accompagnés des certificats d'analyse nécessaires.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Une Question sur la Livraison ?</h2>
            <p className="text-xl mb-8 text-neutral-300 max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour vous renseigner
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transition-colors"
              >
                Nous contacter
              </a>
              <a
                href="tel:0788646983"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 font-semibold rounded-full hover:bg-neutral-100 transition-colors"
              >
                07 88 64 69 83
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
