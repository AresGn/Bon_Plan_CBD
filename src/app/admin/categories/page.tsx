'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  _count?: {
    products: number
  }
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: ''
  })
  const [isSeeding, setIsSeeding] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories')
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des catégories')
      }
      
      const data = await response.json()
      setCategories(data)
    } catch (error: any) {
      console.error('Erreur:', error)
      toast.error('Erreur lors du chargement des catégories')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingCategory 
        ? `/api/admin/categories/${editingCategory.id}`
        : '/api/admin/categories'
      
      const response = await fetch(url, {
        method: editingCategory ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde')
      }

      toast.success(editingCategory ? 'Catégorie modifiée' : 'Catégorie créée')
      setShowModal(false)
      resetForm()
      fetchCategories()
    } catch (error: any) {
      console.error('Erreur:', error)
      toast.error('Erreur lors de la sauvegarde')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression')
      }

      toast.success('Catégorie supprimée')
      fetchCategories()
    } catch (error: any) {
      console.error('Erreur:', error)
      toast.error('Erreur lors de la suppression')
    }
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      image: category.image || ''
    })
    setShowModal(true)
  }

  const resetForm = () => {
    setEditingCategory(null)
    setFormData({
      name: '',
      slug: '',
      description: '',
      image: ''
    })
  }

  const handleSeedCategories = async () => {
    setIsSeeding(true)
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/admin/seed-categories', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'initialisation')
      }

      const result = await response.json()
      toast.success('Catégories initialisées avec succès')
      fetchCategories()
    } catch (error: any) {
      console.error('Erreur:', error)
      toast.error('Erreur lors de l\'initialisation des catégories')
    } finally {
      setIsSeeding(false)
    }
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    const uploadFormData = new FormData()
    uploadFormData.append('file', file)

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/upload?type=categories', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadFormData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de l\'upload')
      }

      const data = await response.json()
      setFormData(prev => ({ ...prev, image: data.url }))
      toast.success('Image téléversée avec succès')
    } catch (error: any) {
      console.error('Erreur upload:', error)
      toast.error(error.message || 'Erreur lors du téléversement de l\'image')
    } finally {
      setUploadingImage(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Gestion des catégories</h1>
          <p className="mt-2 text-neutral-600">Gérez les catégories de produits</p>
        </div>
        <div className="flex gap-3">
          {categories.length === 0 && (
            <button
              onClick={handleSeedCategories}
              disabled={isSeeding}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {isSeeding ? 'Initialisation...' : 'Initialiser les catégories'}
            </button>
          )}
          <button
            onClick={() => {
              resetForm()
              setShowModal(true)
            }}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Nouvelle catégorie
          </button>
        </div>
      </div>

      {/* Grille des catégories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            {category.image && (
              <div className="aspect-w-16 aspect-h-9 bg-neutral-100">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={400}
                  height={225}
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-medium text-neutral-900">{category.name}</h3>
              <p className="text-sm text-neutral-500 mt-1">/{category.slug}</p>
              {category.description && (
                <p className="text-sm text-neutral-600 mt-2 line-clamp-2">{category.description}</p>
              )}
              <p className="text-sm text-neutral-500 mt-2">
                {category._count?.products || 0} produits
              </p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="p-2 text-primary-600 hover:bg-primary-50 rounded"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                  disabled={!!category._count?.products && category._count.products > 0}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-500">Aucune catégorie trouvée</p>
        </div>
      )}

      {/* Modal formulaire */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black opacity-30" onClick={() => setShowModal(false)}></div>
            
            <div className="relative bg-white rounded-lg max-w-md w-full p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ 
                        ...formData, 
                        name: e.target.value,
                        slug: !editingCategory ? generateSlug(e.target.value) : formData.slug
                      })
                    }}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Image de la catégorie
                  </label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                    />
                    {uploadingImage && (
                      <p className="text-sm text-neutral-500">Téléversement en cours...</p>
                    )}
                    {formData.image && (
                      <div className="mt-2">
                        <p className="text-sm text-neutral-600 mb-1">Aperçu :</p>
                        <Image
                          src={formData.image}
                          alt="Aperçu"
                          width={200}
                          height={100}
                          className="rounded-lg object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-neutral-200 text-neutral-800 rounded-lg hover:bg-neutral-300"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    {editingCategory ? 'Modifier' : 'Créer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
