'use client'

import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import toast from 'react-hot-toast'

interface Order {
  id: string
  orderNumber: string
  status: string
  total: number
  email: string
  createdAt: string
  items: OrderItem[]
  shippingAddress: any
}

interface OrderItem {
  id: string
  quantity: number
  price: number
  product: {
    name: string
    image: string
  }
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PROCESSING: 'bg-blue-100 text-blue-800',
  SHIPPED: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
}

const statusLabels = {
  PENDING: 'En attente',
  PROCESSING: 'En traitement',
  SHIPPED: 'Expédiée',
  DELIVERED: 'Livrée',
  CANCELLED: 'Annulée',
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchOrders()
  }, [filter])

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/admin/orders${filter !== 'all' ? `?status=${filter}` : ''}`)
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des commandes')
      }
      
      const data = await response.json()
      setOrders(data)
    } catch (error: any) {
      console.error('Erreur:', error)
      toast.error('Erreur lors du chargement des commandes')
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })
      
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour')
      }

      toast.success('Statut mis à jour avec succès')
      fetchOrders()
      setSelectedOrder(null)
    } catch (error: any) {
      console.error('Erreur:', error)
      toast.error('Erreur lors de la mise à jour du statut')
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">Gestion des commandes</h1>
        <p className="mt-2 text-neutral-600">Gérez et suivez toutes les commandes</p>
      </div>

      {/* Filtres */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === 'all' 
              ? 'bg-primary-600 text-white' 
              : 'bg-white text-neutral-700 border border-neutral-300'
          }`}
        >
          Toutes
        </button>
        {Object.entries(statusLabels).map(([value, label]) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === value 
                ? 'bg-primary-600 text-white' 
                : 'bg-white text-neutral-700 border border-neutral-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Liste des commandes */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                N° Commande
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                  #{order.orderNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                  {order.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                  {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true, locale: fr })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[order.status as keyof typeof statusColors]}`}>
                    {statusLabels[order.status as keyof typeof statusLabels]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  {order.total.toFixed(2)} €
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    Voir détails
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-500">Aucune commande trouvée</p>
          </div>
        )}
      </div>

      {/* Modal détails commande */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black opacity-30" onClick={() => setSelectedOrder(null)}></div>
            
            <div className="relative bg-white rounded-lg max-w-3xl w-full p-6">
              <h2 className="text-xl font-bold mb-4">Commande #{selectedOrder.orderNumber}</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-neutral-900 mb-2">Informations client</h3>
                  <p className="text-sm text-neutral-600">Email: {selectedOrder.email}</p>
                  {selectedOrder.shippingAddress && (
                    <div className="mt-2 text-sm text-neutral-600">
                      <p>{selectedOrder.shippingAddress.name}</p>
                      <p>{selectedOrder.shippingAddress.street}</p>
                      <p>{selectedOrder.shippingAddress.postalCode} {selectedOrder.shippingAddress.city}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-medium text-neutral-900 mb-2">Articles</h3>
                  {selectedOrder.items?.map((item) => (
                    <div key={item.id} className="flex justify-between py-2 text-sm">
                      <span>{item.product?.name} x{item.quantity}</span>
                      <span>{(item.price * item.quantity).toFixed(2)} €</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>{selectedOrder.total.toFixed(2)} €</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-neutral-900 mb-2">Changer le statut</h3>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                  >
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 bg-neutral-200 text-neutral-800 rounded-lg hover:bg-neutral-300"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
