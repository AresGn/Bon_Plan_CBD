'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronDownIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  TruckIcon,
  CreditCardIcon,
  BeakerIcon
} from '@heroicons/react/24/outline'

const faqCategories = [
  {
    id: 'general',
    name: 'Général',
    icon: QuestionMarkCircleIcon,
    questions: [
      {
        question: "Qu'est-ce que le CBD ?",
        answer: "Le CBD (cannabidiol) est un composé naturel extrait du chanvre. Contrairement au THC, il n'a pas d'effet psychotrope et est légal en France avec un taux de THC inférieur à 0,3%."
      },
      {
        question: "Le CBD est-il légal en France ?",
        answer: "Oui, le CBD est légal en France depuis 2022, à condition que les produits contiennent moins de 0,3% de THC et soient issus de variétés de chanvre autorisées."
      },
      {
        question: "Quels sont les effets du CBD ?",
        answer: "Le CBD peut aider à réduire le stress, l'anxiété, améliorer le sommeil et soulager certaines douleurs. Les effets varient selon les personnes et ne sont pas garantis."
      },
      {
        question: "Le CBD crée-t-il une dépendance ?",
        answer: "Non, le CBD ne crée pas de dépendance physique ou psychologique. L'OMS a confirmé que le CBD ne présente pas de potentiel d'abus."
      }
    ]
  },
  {
    id: 'products',
    name: 'Produits',
    icon: BeakerIcon,
    questions: [
      {
        question: "Comment choisir le bon produit CBD ?",
        answer: "Le choix dépend de vos besoins : fleurs pour un effet rapide, huiles pour un dosage précis, infusions pour la relaxation. N'hésitez pas à nous demander conseil."
      },
      {
        question: "Quelle est la différence entre Indoor, Outdoor et Greenhouse ?",
        answer: "Indoor : culture en intérieur, qualité premium. Outdoor : culture en extérieur, plus naturelle. Greenhouse : culture sous serre, bon compromis qualité/prix."
      },
      {
        question: "Comment conserver mes produits CBD ?",
        answer: "Conservez vos produits dans un endroit frais, sec et à l'abri de la lumière. Utilisez les emballages d'origine et respectez les dates de péremption."
      },
      {
        question: "Vos produits sont-ils testés ?",
        answer: "Oui, tous nos produits sont testés en laboratoire indépendant pour garantir leur qualité et leur conformité légale."
      }
    ]
  },
  {
    id: 'orders',
    name: 'Commandes',
    icon: CreditCardIcon,
    questions: [
      {
        question: "Comment passer une commande ?",
        answer: "Vous pouvez commander sur notre site web, par téléphone au 07 88 64 69 83, ou directement en boutique au 7 Rue Saint-Gervais à Rouen."
      },
      {
        question: "Quels sont les moyens de paiement acceptés ?",
        answer: "Nous acceptons les cartes bancaires (Visa, Mastercard, CB), les virements bancaires et les espèces en boutique."
      },
      {
        question: "Puis-je modifier ou annuler ma commande ?",
        answer: "Vous pouvez modifier ou annuler votre commande tant qu'elle n'a pas été expédiée. Contactez-nous rapidement au 07 88 64 69 83."
      },
      {
        question: "Puis-je retourner un produit ?",
        answer: "Oui, vous disposez de 14 jours pour retourner un produit non ouvert. Les frais de retour sont à votre charge sauf en cas de produit défectueux."
      }
    ]
  },
  {
    id: 'delivery',
    name: 'Livraison',
    icon: TruckIcon,
    questions: [
      {
        question: "Quels sont les délais de livraison ?",
        answer: "24-48h en France métropolitaine, 3-5 jours en Corse, 5-7 jours dans les DOM-TOM. Expédition sous 24h après validation du paiement."
      },
      {
        question: "La livraison est-elle discrète ?",
        answer: "Oui, nos colis sont neutres sans aucune mention du contenu. Seul votre nom et adresse apparaissent sur l'emballage."
      },
      {
        question: "À partir de quel montant la livraison est-elle gratuite ?",
        answer: "La livraison est gratuite à partir de 50€ d'achat en France métropolitaine (hors Chronopost Express)."
      },
      {
        question: "Puis-je suivre ma commande ?",
        answer: "Oui, vous recevrez un numéro de suivi par email dès l'expédition de votre commande. Vous pourrez suivre votre colis en temps réel."
      }
    ]
  },
  {
    id: 'legal',
    name: 'Légal',
    icon: ShieldCheckIcon,
    questions: [
      {
        question: "Puis-je conduire après avoir consommé du CBD ?",
        answer: "Bien que le CBD ne soit pas psychotrope, nous déconseillons la conduite après consommation. Les tests de dépistage peuvent détecter des traces de THC."
      },
      {
        question: "Le CBD est-il détectable aux tests de dépistage ?",
        answer: "Les tests de dépistage recherchent le THC, pas le CBD. Cependant, nos produits contenant des traces de THC (<0,3%), un test pourrait être positif en cas de consommation importante."
      },
      {
        question: "Puis-je voyager avec du CBD ?",
        answer: "En France, oui. À l'étranger, vérifiez la législation locale car elle varie selon les pays. Gardez toujours les emballages d'origine."
      },
      {
        question: "Le CBD est-il un médicament ?",
        answer: "Non, le CBD n'est pas un médicament. Nos produits sont des compléments alimentaires ou des produits de bien-être. Consultez un médecin pour tout usage thérapeutique."
      }
    ]
  }
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('general')
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)

  const activeQuestions = faqCategories.find(cat => cat.id === activeCategory)?.questions || []

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
            <QuestionMarkCircleIcon className="mx-auto h-16 w-16 text-primary-600 mb-6" />
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
              <span className="block text-neutral-900">Questions</span>
              <span className="block text-gradient mt-2">Fréquentes</span>
            </h1>
            <p className="mt-6 text-xl text-neutral-700 max-w-3xl mx-auto">
              Trouvez rapidement les réponses à vos questions sur le CBD, 
              nos produits et nos services.
            </p>
          </motion.div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Catégories</h2>
              <nav className="space-y-2">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id)
                      setOpenQuestion(null)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeCategory === category.id
                        ? 'bg-primary-100 text-primary-700 border border-primary-200'
                        : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <category.icon className="w-5 h-5" />
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Questions */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-neutral-900 mb-8">
                {faqCategories.find(cat => cat.id === activeCategory)?.name}
              </h2>
              
              <div className="space-y-4">
                {activeQuestions.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-neutral-900 pr-4">
                        {faq.question}
                      </h3>
                      <ChevronDownIcon 
                        className={`w-5 h-5 text-neutral-500 transition-transform ${
                          openQuestion === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    <AnimatePresence>
                      {openQuestion === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 text-neutral-600 border-t border-neutral-100">
                            <div className="pt-4">
                              {faq.answer}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
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
            <h2 className="text-3xl font-bold mb-4">Vous ne trouvez pas votre réponse ?</h2>
            <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
              Notre équipe est là pour répondre à toutes vos questions sur le CBD et nos produits
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-full hover:bg-neutral-100 transition-colors"
              >
                Nous contacter
              </a>
              <a
                href="tel:0788646983"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-400 transition-colors"
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
