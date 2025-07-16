'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useProducts } from '@/hooks/useProducts'
import { useCategories } from '@/hooks/useCategories'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowUpTrayIcon,
  EyeIcon,
  XMarkIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

// Types
interface Product {
  id: string
  name: string
  slug: string
  category: {
    id: string
    name: string
    slug: string
  }
  categoryId: string
  price: number
  originalPrice?: number
  stock: number
  cbdRate: number
  thcRate: number
  status: string
  images: string[]
  description: string
  createdAt: string
  updatedAt: string
  featured: boolean
  effects: string[]
  terpenes: string[]
  origin?: string
  cultivationType?: string
}


export default function ProductsPage() {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const router = useRouter();

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category.name === selectedCategory
    return matchesSearch && matchesCategory
  })

  useEffect(() => {
    if(error) {
      toast.error('Erreur lors de la récupération des produits');
    }
  }, [error]);

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      toast.success('Produit supprimé avec succès');
      // Refresh products list
      window.location.reload();
    } catch (error) {
      toast.error('Erreur lors de la suppression du produit');
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Produits</h1>
          <p className="text-neutral-600">Gérez votre catalogue de produits</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          Ajouter un produit
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un produit..."
                className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
            >
              <option value="all">Toutes les catégories</option>
              <option value="Fleurs CBD">Fleurs CBD</option>
              <option value="Résines CBD">Résines CBD</option>
              <option value="Infusions CBD">Infusions CBD</option>
            </select>
            <button className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl hover:bg-neutral-100 transition-colors">
              <FunnelIcon className="h-5 w-5 text-neutral-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <span className="ml-3 text-gray-600">Chargement des produits...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun produit trouvé</p>
          </div>
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                  Produit
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                  Taux CBD/THC
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-neutral-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredProducts.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-neutral-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.images?.[0] || '/images/placeholder.jpg'}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-neutral-900">{product.name}</p>
                        <p className="text-sm text-neutral-500 line-clamp-1">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
                      {product.category?.name || 'Sans catégorie'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-neutral-900">
                    €{product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${
                        product.stock > 50 ? 'text-green-600' : 
                        product.stock > 20 ? 'text-yellow-600' : 
                        'text-red-600'
                      }`}>
                        {product.stock}
                      </span>
                      <span className="text-sm text-neutral-500">unités</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="text-neutral-500">CBD:</span>
                        <span className="ml-1 font-medium text-neutral-900">{product.cbdRate}%</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-neutral-500">THC:</span>
                        <span className="ml-1 font-medium text-neutral-900">{product.thcRate}%</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      product.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                      product.status === 'INACTIVE' ? 'bg-red-100 text-red-800' :
                      'bg-neutral-100 text-neutral-800'
                    }`}>
                      {product.status === 'ACTIVE' ? 'Actif' :
                       product.status === 'INACTIVE' ? 'Inactif' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => window.open(`/produits/${product.slug || product.id}`, '_blank')}
                        className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                        title="Voir"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingProduct(product)
                          setShowAddModal(true)
                        }}
                        className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      <AnimatePresence>
        {showAddModal && (
          <ProductModal
            product={editingProduct}
            onClose={() => {
              setShowAddModal(false)
              setEditingProduct(null)
            }}
            onSave={(product) => {
              if (editingProduct) {
                toast.success('Produit modifié avec succès')
              } else {
                toast.success('Produit ajouté avec succès')
              }
              setShowAddModal(false)
              setEditingProduct(null)
              // Reload to refresh the product list
              window.location.reload()
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// Product Modal Component
function ProductModal({ 
  product, 
  onClose, 
  onSave 
}: { 
  product: Product | null
  onClose: () => void
  onSave: (product: Product) => void
}) {
  const { categories } = useCategories();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<any>(
    product ? {
      ...product,
      categoryId: product.category?.id || product.categoryId
    } : {
      name: '',
      slug: '',
      categoryId: categories[0]?.id || '',
      price: 0,
      originalPrice: 0,
      stock: 0,
      cbdRate: 0,
      thcRate: 0,
      status: 'DRAFT',
      description: '',
      images: [],
      terpenes: [],
      effects: [],
      featured: false,
      origin: '',
      cultivationType: ''
    }
  )

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'upload');
      }

      const data = await response.json();
      setFormData((prev: any) => ({
        ...prev,
        images: [...(prev.images || []), data.url]
      }));
      
      toast.success('Image uploadée avec succès');
    } catch (error) {
      toast.error('Erreur lors de l\'upload de l\'image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('adminToken');
      const url = product ? `/api/products/${product.id}` : '/api/products';
      const method = product ? 'PUT' : 'POST';
      
      // Generate slug from name if not provided
      if (!formData.slug) {
        formData.slug = formData.name.toLowerCase().replace(/\s+/g, '-');
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde');
      }

      const savedProduct = await response.json();
      toast.success(product ? 'Produit modifié avec succès' : 'Produit créé avec succès');
      onClose();
      window.location.reload();
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde du produit');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-neutral-900">
              {product ? 'Modifier le produit' : 'Ajouter un produit'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Images du produit
            </label>
            
            {/* Images existantes */}
            {formData.images && formData.images.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mb-4">
                {formData.images.map((img: any, index: number) => (
                  <div key={index} className="relative group">
                    <Image
                      src={img}
                      alt={`Product ${index + 1}`}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover w-full h-24"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev: any) => ({
                          ...prev,
                          images: prev.images.filter((_: any, i: number) => i !== index)
                        }));
                      }}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <label className="border-2 border-dashed border-neutral-300 rounded-xl p-6 text-center hover:border-primary-500 transition-colors cursor-pointer block">
              {isUploading ? (
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto" />
              ) : (
                <>
                  <PhotoIcon className="mx-auto h-12 w-12 text-neutral-400" />
                  <p className="mt-2 text-sm text-neutral-600">
                    Cliquez ou glissez une image ici
                  </p>
                  <p className="text-xs text-neutral-500">
                    PNG, JPG jusqu'à 5MB
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
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Nom du produit
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Catégorie
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              >
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Prix (€)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Stock
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Taux CBD (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.cbdRate}
                onChange={(e) => setFormData({ ...formData, cbdRate: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Taux THC (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.thcRate}
                onChange={(e) => setFormData({ ...formData, thcRate: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Statut
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="ACTIVE">Actif</option>
              <option value="INACTIVE">Inactif</option>
              <option value="DRAFT">Brouillon</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-neutral-700 hover:bg-neutral-100 rounded-xl font-medium transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enregistrement...' : (product ? 'Modifier' : 'Ajouter')}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
