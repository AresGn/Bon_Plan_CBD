'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useCategories } from '@/hooks/useCategories'
import {
  ArrowLeftIcon,
  PhotoIcon,
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface FormData {
  name: string
  slug: string
  categoryId: string
  price: number
  originalPrice: number
  stock: number
  cbdRate: number
  thcRate: number
  status: string
  description: string
  images: string[]
  terpenes: string[]
  effects: string[]
  featured: boolean
  origin: string
  cultivationType: string
  labAnalysis?: string
}

export default function NewProductPage() {
  const router = useRouter()
  const { categories, loading: categoriesLoading } = useCategories()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [showOptionalFields, setShowOptionalFields] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    slug: '',
    categoryId: '',
    price: 0,
    originalPrice: 0,
    stock: 0,
    cbdRate: 0,
    thcRate: 0.2,
    status: 'ACTIVE',
    description: '',
    images: [],
    terpenes: [],
    effects: [],
    featured: false,
    origin: '',
    cultivationType: 'indoor',
    labAnalysis: ''
  })

  // États pour les champs de saisie temporaires
  const [newTerpene, setNewTerpene] = useState('')
  const [newEffect, setNewEffect] = useState('')

  // Mettre à jour categoryId quand les catégories sont chargées
  useEffect(() => {
    if (categories.length > 0 && !formData.categoryId) {
      setFormData(prev => ({ ...prev, categoryId: categories[0].id }))
    }
  }, [categories, formData.categoryId])

  // Générer le slug automatiquement
  useEffect(() => {
    if (formData.name) {
      const generatedSlug = formData.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData(prev => ({ ...prev, slug: generatedSlug }))
    }
  }, [formData.name])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner une image')
      return
    }

    // Vérifier la taille (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('L\'image doit faire moins de 5MB')
      return
    }

    setIsUploading(true)
    const uploadFormData = new FormData()
    uploadFormData.append('file', file)

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadFormData
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'upload')
      }

      const data = await response.json()
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, data.url]
      }))
      
      toast.success('Image uploadée avec succès')
    } catch (error) {
      console.error('Erreur upload:', error)
      toast.error('Erreur lors de l\'upload de l\'image')
    } finally {
      setIsUploading(false)
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const addTerpene = () => {
    if (newTerpene.trim()) {
      setFormData(prev => ({
        ...prev,
        terpenes: [...prev.terpenes, newTerpene.trim()]
      }))
      setNewTerpene('')
    }
  }

  const removeTerpene = (index: number) => {
    setFormData(prev => ({
      ...prev,
      terpenes: prev.terpenes.filter((_, i) => i !== index)
    }))
  }

  const addEffect = () => {
    if (newEffect.trim()) {
      setFormData(prev => ({
        ...prev,
        effects: [...prev.effects, newEffect.trim()]
      }))
      setNewEffect('')
    }
  }

  const removeEffect = (index: number) => {
    setFormData(prev => ({
      ...prev,
      effects: prev.effects.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name || !formData.categoryId || formData.price <= 0) {
      toast.error('Veuillez remplir tous les champs obligatoires')
      return
    }

    if (formData.images.length === 0) {
      toast.error('Veuillez ajouter au moins une image')
      return
    }

    setIsSubmitting(true)

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la création')
      }

      const newProduct = await response.json()
      toast.success('Produit créé avec succès')
      router.push('/admin/products')
    } catch (error) {
      console.error('Erreur:', error)
      toast.error(error instanceof Error ? error.message : 'Erreur lors de la création du produit')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Retour aux produits
        </Link>
        <h1 className="text-3xl font-bold text-neutral-900">Nouveau produit</h1>
        <p className="text-neutral-600 mt-2">Créez un nouveau produit pour votre boutique</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Informations essentielles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-neutral-900 mb-6">1. Informations essentielles</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Nom du produit *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Ex: Amnesia Haze CBD"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Catégorie *
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  {categoriesLoading ? (
                    <option>Chargement...</option>
                  ) : (
                    categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))
                  )}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Prix (€) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="9.90"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Description courte *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Décrivez brièvement le produit et ses qualités principales..."
                required
              />
            </div>

            {/* Image principale */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Image principale *
              </label>
              {formData.images.length > 0 ? (
                <div className="relative w-40 h-40">
                  <Image
                    src={formData.images[0]}
                    alt="Image principale"
                    fill
                    className="rounded-xl object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, images: [] })}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-neutral-300 rounded-xl p-6 text-center hover:border-primary-500 transition-colors cursor-pointer block">
                  {isUploading ? (
                    <div>
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto" />
                      <p className="mt-2 text-sm text-neutral-600">Upload en cours...</p>
                    </div>
                  ) : (
                    <>
                      <PhotoIcon className="mx-auto h-8 w-8 text-neutral-400" />
                      <p className="mt-2 text-sm text-neutral-600">
                        Cliquez pour ajouter une image
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                </label>
              )}
            </div>
          </div>
        </motion.div>

        {/* Section 2: Caractéristiques CBD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-neutral-900 mb-6">2. Caractéristiques CBD</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Taux CBD (%) *
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={formData.cbdRate}
                onChange={(e) => setFormData({ ...formData, cbdRate: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="18.0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Taux THC (%) *
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="0.3"
                value={formData.thcRate}
                onChange={(e) => setFormData({ ...formData, thcRate: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="0.2"
                required
              />
              <p className="text-xs text-neutral-500 mt-1">Maximum légal : 0.3%</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Stock disponible *
              </label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="100"
                required
              />
            </div>
          </div>
        </motion.div>

        {/* Section 3: Détails optionnels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <button
            type="button"
            onClick={() => setShowOptionalFields(!showOptionalFields)}
            className="flex items-center justify-between w-full text-left"
          >
            <h2 className="text-xl font-semibold text-neutral-900">3. Détails optionnels</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-500">Ajouter plus de détails</span>
              {showOptionalFields ? (
                <ChevronUpIcon className="h-5 w-5 text-neutral-500" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-neutral-500" />
              )}
            </div>
          </button>
          
          {showOptionalFields && (
            <div className="mt-6 space-y-6">
              {/* Prix original et promotion */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Prix original (€)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Prix avant réduction"
                  />
                  <p className="text-xs text-neutral-500 mt-1">Pour afficher une promotion</p>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 text-sm text-neutral-700">
                    Mettre ce produit en avant
                  </label>
                </div>
              </div>

              {/* Images supplémentaires */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Images supplémentaires
                </label>
                {formData.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {formData.images.slice(1).map((img, index) => (
                      <div key={index + 1} className="relative">
                        <Image
                          src={img}
                          alt={`Image ${index + 2}`}
                          width={100}
                          height={100}
                          className="rounded-lg object-cover w-full aspect-square"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index + 1)}
                          className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full"
                        >
                          <XMarkIcon className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <label className="border-2 border-dashed border-neutral-300 rounded-xl p-4 text-center hover:border-primary-500 transition-colors cursor-pointer block">
                  <PhotoIcon className="mx-auto h-6 w-6 text-neutral-400" />
                  <p className="mt-1 text-xs text-neutral-600">Ajouter d'autres images</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isUploading || formData.images.length === 0}
                  />
                </label>
              </div>

              {/* Culture et Origine */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Type de culture
                  </label>
                  <select
                    value={formData.cultivationType}
                    onChange={(e) => setFormData({ ...formData, cultivationType: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="indoor">Indoor</option>
                    <option value="outdoor">Outdoor</option>
                    <option value="greenhouse">Greenhouse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Origine
                  </label>
                  <input
                    type="text"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Ex: Suisse, France, Italie..."
                  />
                </div>
              </div>

              {/* Terpènes */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Terpènes
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newTerpene}
                    onChange={(e) => setNewTerpene(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTerpene())}
                    className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                    placeholder="Ex: Limonène"
                  />
                  <button
                    type="button"
                    onClick={addTerpene}
                    className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.terpenes.map((terpene, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs"
                    >
                      {terpene}
                      <button
                        type="button"
                        onClick={() => removeTerpene(index)}
                        className="hover:text-primary-900"
                      >
                        <XMarkIcon className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Effets */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Effets
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newEffect}
                    onChange={(e) => setNewEffect(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addEffect())}
                    className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                    placeholder="Ex: Relaxation"
                  />
                  <button
                    type="button"
                    onClick={addEffect}
                    className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.effects.map((effect, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs"
                    >
                      {effect}
                      <button
                        type="button"
                        onClick={() => removeEffect(index)}
                        className="hover:text-green-900"
                      >
                        <XMarkIcon className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4 justify-end"
        >
          <Link
            href="/admin/products"
            className="px-6 py-3 text-neutral-700 hover:bg-neutral-100 rounded-xl font-medium transition-colors"
          >
            Annuler
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                Création en cours...
              </>
            ) : (
              <>
                <CheckIcon className="h-5 w-5" />
                Créer le produit
              </>
            )}
          </button>
        </motion.div>
      </form>
    </div>
  )
}
