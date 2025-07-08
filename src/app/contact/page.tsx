'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleBottomCenterTextIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Submit form logic here
    alert('Message envoyé !')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-primary-100 to-secondary-50">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 30% 30%, #059669 0%, transparent 40%), radial-gradient(circle at 70% 70%, #f59e0b 0%, transparent 40%)',
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
              <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">
                Entrer en contact
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
              <span className="block text-neutral-900">Contactez</span>
              <span className="block text-gradient mt-2">Bon Plan CBD</span>
            </h1>
            <p className="mt-6 text-xl text-neutral-700 max-w-3xl mx-auto">
              Nous sommes là pour répondre à toutes vos questions sur nos
              produits et services. N'hésitez pas à nous contacter !
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center">
                <PhoneIcon className="w-10 h-10 text-primary-600 mb-4" />
                <h3 className="text-lg font-medium text-neutral-900">Appelez-nous</h3>
                <p className="text-neutral-600 mt-2">02 35 89 45 67</p>
              </div>
              <div className="flex flex-col items-center">
                <EnvelopeIcon className="w-10 h-10 text-primary-600 mb-4" />
                <h3 className="text-lg font-medium text-neutral-900">Email</h3>
                <p className="text-neutral-600 mt-2">contact@bonplancbd.fr</p>
              </div>
              <div className="flex flex-col items-center">
                <MapPinIcon className="w-10 h-10 text-primary-600 mb-4" />
                <h3 className="text-lg font-medium text-neutral-900">Adresse</h3>
                <p className="text-neutral-600 mt-2">123 Rue du Commerce, 76000 Rouen</p>
              </div>
              <div className="flex flex-col items-center">
                <ChatBubbleBottomCenterTextIcon className="w-10 h-10 text-primary-600 mb-4" />
                <h3 className="text-lg font-medium text-neutral-900">Chat en direct</h3>
                <p className="text-neutral-600 mt-2">Chattez avec nous en ligne</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 lg:p-16"
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-700"
              >
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-3 border border-neutral-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700"
              >
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-3 border border-neutral-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-neutral-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-3 border border-neutral-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                rows={5}
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Envoyer le message
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Map Section (Optional) */}
      <div className="bg-gradient-to-b from-primary-50 via-secondary-50 to-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
              Trouvez-nous ici
            </h2>
            <div className="relative w-full h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2595.4641455766!2d1.0888!3d49.4432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDI2JzM1LjUiTiAxwrAwNSczMi4wIkU!5e0!3m2!1sen!2sfr!4v1234567890"
                title="Google Maps"
                className="w-full h-full rounded-xl"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

