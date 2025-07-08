'use client'

import { motion } from 'framer-motion'
import {
  CurrencyEuroIcon,
  ShoppingBagIcon,
  UsersIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
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

const stats = [
  {
    name: 'Revenus totaux',
    value: '€12,543',
    change: '+12.5%',
    changeType: 'increase',
    icon: CurrencyEuroIcon,
    color: 'bg-green-500',
  },
  {
    name: 'Commandes',
    value: '156',
    change: '+8.2%',
    changeType: 'increase',
    icon: ShoppingBagIcon,
    color: 'bg-blue-500',
  },
  {
    name: 'Clients actifs',
    value: '2,341',
    change: '-2.4%',
    changeType: 'decrease',
    icon: UsersIcon,
    color: 'bg-purple-500',
  },
  {
    name: 'Taux de conversion',
    value: '3.2%',
    change: '+0.8%',
    changeType: 'increase',
    icon: ChartBarIcon,
    color: 'bg-orange-500',
  },
]

const recentOrders = [
  { id: '1234', customer: 'Jean Dupont', amount: 89.90, status: 'En cours', date: '2024-01-07' },
  { id: '1235', customer: 'Marie Martin', amount: 156.50, status: 'Livrée', date: '2024-01-07' },
  { id: '1236', customer: 'Pierre Bernard', amount: 45.00, status: 'En préparation', date: '2024-01-06' },
  { id: '1237', customer: 'Sophie Durand', amount: 234.80, status: 'Expédiée', date: '2024-01-06' },
]

const topProducts = [
  { name: 'Amnesia Haze', sales: 45, revenue: 401.50 },
  { name: 'Huile CBD 10%', sales: 38, revenue: 1516.20 },
  { name: 'Super Skunk', sales: 32, revenue: 240.00 },
  { name: 'Résine Marocaine', sales: 28, revenue: 361.20 },
]

export default function AdminDashboard() {
  const salesData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Ventes',
        data: [8500, 9200, 8800, 11200, 10800, 12543],
        borderColor: 'rgb(5, 150, 105)',
        backgroundColor: 'rgba(5, 150, 105, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const productsData = {
    labels: ['Fleurs', 'Huiles', 'Résines', 'Infusions', 'Cosmétiques'],
    datasets: [
      {
        label: 'Ventes par catégorie',
        data: [45, 38, 28, 15, 12],
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
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-neutral-50">
                    <td className="px-6 py-4 text-sm font-medium text-neutral-900">#{order.id}</td>
                    <td className="px-6 py-4 text-sm text-neutral-600">{order.customer}</td>
                    <td className="px-6 py-4 text-sm font-medium text-neutral-900">€{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === 'Livrée' ? 'bg-green-100 text-green-800' :
                        order.status === 'Expédiée' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'En préparation' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-neutral-100 text-neutral-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">{order.date}</td>
                  </tr>
                ))}
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
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-700 font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{product.name}</p>
                    <p className="text-xs text-neutral-600">{product.sales} ventes</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-neutral-900">€{product.revenue}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
