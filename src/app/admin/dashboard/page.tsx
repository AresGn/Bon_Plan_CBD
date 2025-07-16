'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  CubeIcon, 
  UsersIcon, 
  ShoppingBagIcon, 
  ChartBarIcon,
  PlusIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    // Vérifier l'authentification
    const token = localStorage.getItem('adminToken');
    const userStr = localStorage.getItem('adminUser');
    
    if (!token || !userStr) {
      router.push('/admin/login');
      return;
    }

    const userData = JSON.parse(userStr);
    setUser(userData);

    // Charger les statistiques
    fetchStats();
  }, [router]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des stats');
      }

      const data = await response.json();
      setStats({
        totalProducts: data.overview.totalProducts,
        totalOrders: data.overview.totalOrders,
        totalUsers: data.overview.totalUsers,
        totalRevenue: data.overview.totalRevenue
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Erreur lors du chargement des statistiques');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    toast.success('Déconnexion réussie');
    router.push('/admin/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard Administrateur
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Bienvenue, {user.name || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Produits */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CubeIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Produits
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {stats.totalProducts}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <Link
                  href="/admin/products"
                  className="text-sm font-medium text-primary-600 hover:text-primary-900"
                >
                  Gérer les produits →
                </Link>
              </div>
            </div>

            {/* Commandes */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ShoppingBagIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Commandes
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {stats.totalOrders}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <Link
                  href="/admin/orders"
                  className="text-sm font-medium text-green-600 hover:text-green-900"
                >
                  Voir les commandes →
                </Link>
              </div>
            </div>

            {/* Utilisateurs */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UsersIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Utilisateurs
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {stats.totalUsers}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <Link
                  href="/admin/users"
                  className="text-sm font-medium text-blue-600 hover:text-blue-900"
                >
                  Gérer les utilisateurs →
                </Link>
              </div>
            </div>

            {/* Revenus */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ChartBarIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Revenus Total
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {stats.totalRevenue.toFixed(2)}€
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <Link
                  href="/admin/analytics"
                  className="text-sm font-medium text-purple-600 hover:text-purple-900"
                >
                  Voir les analytics →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="mt-8 px-4 sm:px-0">
          <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/admin/products/new"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
            >
              <div className="flex-shrink-0">
                <PlusIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">
                  Ajouter un produit
                </p>
                <p className="text-sm text-gray-500 truncate">
                  Créer un nouveau produit CBD
                </p>
              </div>
            </Link>

            <Link
              href="/admin/categories"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
            >
              <div className="flex-shrink-0">
                <CubeIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">
                  Gérer les catégories
                </p>
                <p className="text-sm text-gray-500 truncate">
                  Organiser vos produits
                </p>
              </div>
            </Link>

            <Link
              href="/admin/settings"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
            >
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">
                  Paramètres
                </p>
                <p className="text-sm text-gray-500 truncate">
                  Configuration du site
                </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
