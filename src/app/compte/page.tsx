'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import AddressForm from '@/components/user/AddressForm'
import axios from 'axios'
import { 
  UserCircleIcon, 
  ShoppingBagIcon, 
  HeartIcon, 
  MapPinIcon,
  ArrowRightOnRectangleIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

interface UserData {
  id: string
  name: string
  email: string
  role: string
  memberSince: string
}

interface Order {
  id: string
  orderNumber: string
  status: string
  total: number
  createdAt: string
  items: OrderItem[]
}

interface OrderItem {
  id: string
  quantity: number
  price: number
  total: number
  product: {
    id: string
    name: string
    images: string
  }
}

// Composant pour afficher les commandes
const OrdersSection = ({ userId }: { userId?: string }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await axios.get('/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.orders) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Erreur lors du chargement des commandes');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; icon: any; className: string }> = {
      PENDING: { label: 'En attente', icon: ClockIcon, className: 'bg-yellow-100 text-yellow-800' },
      CONFIRMED: { label: 'Confirmée', icon: CheckCircleIcon, className: 'bg-blue-100 text-blue-800' },
      SHIPPED: { label: 'Expédiée', icon: TruckIcon, className: 'bg-purple-100 text-purple-800' },
      DELIVERED: { label: 'Livrée', icon: CheckCircleIcon, className: 'bg-green-100 text-green-800' },
      CANCELLED: { label: 'Annulée', icon: XCircleIcon, className: 'bg-red-100 text-red-800' }
    };

    const config = statusConfig[status] || statusConfig.PENDING;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
        <Icon className="w-4 h-4 mr-1" />
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="card p-6">
        <h2 className="text-lg font-medium text-neutral-900 mb-4">Mes commandes</h2>
        <div className="animate-pulse">
          <div className="h-20 bg-gray-200 rounded mb-4"></div>
          <div className="h-20 bg-gray-200 rounded mb-4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="card p-6">
        <h2 className="text-lg font-medium text-neutral-900 mb-4">Mes commandes</h2>
        <p className="text-neutral-600">Vous n'avez pas encore passé de commande.</p>
        <Link href="/produits/fleurs" className="btn-primary mt-4 inline-flex">
          Découvrir nos produits
        </Link>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h2 className="text-lg font-medium text-neutral-900 mb-6">Mes commandes</h2>
      <div className="space-y-6">
        {orders.map((order) => {
          const images = order.items[0]?.product?.images ? JSON.parse(order.items[0].product.images) : [];
          const firstImage = images[0] || '/images/placeholder.jpg';
          
          return (
            <div key={order.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500">Commande</p>
                  <p className="font-medium">{order.orderNumber}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  {getStatusBadge(order.status)}
                  <p className="mt-2 text-lg font-semibold">{order.total.toFixed(2)} €</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="space-y-3">
                  {order.items.map((item) => {
                    const itemImages = item.product?.images ? JSON.parse(item.product.images) : [];
                    const itemImage = itemImages[0] || '/images/placeholder.jpg';
                    
                    return (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img
                          src={itemImage}
                          alt={item.product?.name || 'Produit'}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.product?.name || 'Produit'}</h4>
                          <p className="text-sm text-gray-500">
                            {item.quantity} x {item.price.toFixed(2)} €
                          </p>
                        </div>
                        <p className="font-medium">{item.total.toFixed(2)} €</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-4">
                <Link
                  href={`/compte/commandes/${order.id}`}
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  Voir les détails
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function AccountPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('orders')
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('auth-token')
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]))
        const { data: user } = await supabase
          .from('User')
          .select('*')
          .eq('id', decoded.userId)
          .single()

        if (user) {
          setUserData({
            id: user.id,
            name: user.name || '',
            email: user.email,
            role: user.role,
            memberSince: new Date(user.createdAt).getFullYear().toString()
          })
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Auth check error:', error)
      }
    }
    setLoading(false)
  }

  const handleAdminAccess = () => {
    if (userData && userData.role === 'ADMIN') {
      // Préparer les données admin
      const token = localStorage.getItem('auth-token')
      if (token) {
        localStorage.setItem('adminToken', token)
        localStorage.setItem('adminUser', JSON.stringify(userData))
        router.push('/admin')
      } else {
        toast.error('Erreur d\'authentification')
      }
    } else {
      toast.error('Accès non autorisé')
    }
  }

  // Formulaire de connexion
  const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault()
      
      try {
        const response = await axios.post('/api/auth/login', {
          email,
          password
        })

        if (response.data.token) {
          localStorage.setItem('auth-token', response.data.token)
          // Cookie avec expiration de 7 jours
          const expires = new Date();
          expires.setDate(expires.getDate() + 7);
          document.cookie = `auth-token=${response.data.token}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`
          
          setUserData({
            id: response.data.user.id,
            name: response.data.user.name || '',
            email: response.data.user.email,
            role: response.data.user.role,
            memberSince: new Date(response.data.user.createdAt || new Date()).getFullYear().toString()
          })
          setIsAuthenticated(true)
          toast.success('Connexion réussie !')
          
          // Réinitialiser le formulaire
          setEmail('')
          setPassword('')
        }
      } catch (error) {
        console.error('Login error:', error)
        toast.error('Email ou mot de passe incorrect')
      }
    }

    return (
      <div className="max-w-md mx-auto">
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-neutral-900">Connexion</h2>
          <form onSubmit={handleLogin} className="mt-6 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field mt-1"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field mt-1"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-900">
                  Se souvenir de moi
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Mot de passe oublié ?
                </a>
              </div>
            </div>
            <button type="submit" className="btn-primary w-full">
              Se connecter
            </button>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-neutral-500">Ou</span>
              </div>
            </div>
            <div className="mt-6">
              <Link href="/compte/inscription" className="btn-outline w-full text-center">
                Créer un compte
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Dashboard utilisateur connecté
  const UserDashboard = () => {
    const tabs = [
      { id: 'orders', name: 'Mes commandes', icon: ShoppingBagIcon },
      { id: 'favorites', name: 'Mes favoris', icon: HeartIcon },
      { id: 'addresses', name: 'Mes adresses', icon: MapPinIcon },
      { id: 'profile', name: 'Mon profil', icon: UserCircleIcon },
    ];

    // Ajouter l'onglet Admin pour les utilisateurs administrateurs
    if (userData?.role === 'ADMIN') {
      tabs.push({ id: 'admin', name: 'Administration', icon: UserCircleIcon });
    }

    return (
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <tab.icon className="flex-shrink-0 -ml-1 mr-3 h-6 w-6" />
                  {tab.name}
                </button>
              ))}
              <button
                onClick={() => {
                  localStorage.removeItem('auth-token')
                  document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
                  setIsAuthenticated(false)
                  setUserData(null)
                  toast.success('Déconnexion réussie')
                }}
                className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
              >
                <ArrowRightOnRectangleIcon className="flex-shrink-0 -ml-1 mr-3 h-6 w-6" />
                Déconnexion
              </button>
            </nav>
          </aside>

          {/* Contenu principal */}
          <main className="mt-8 lg:mt-0 lg:col-span-9">
            {activeTab === 'orders' && (
              <OrdersSection userId={userData?.id} />
            )}

            {activeTab === 'favorites' && (
              <div className="card p-6">
                <h2 className="text-lg font-medium text-neutral-900 mb-4">Mes favoris</h2>
                <p className="text-neutral-600">Vous n'avez pas encore de produits favoris.</p>
              </div>
            )}

{activeTab === 'addresses' && (
              <div className="card p-6">
                <h2 className="text-lg font-medium text-neutral-900 mb-4">Mes adresses</h2>
                <AddressForm onSuccess={() => toast.success('Nouvelle adresse ajoutée!')} />
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="card p-6">
                <h2 className="text-lg font-medium text-neutral-900 mb-4">Mon profil</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Nom</label>
                    <p className="mt-1 text-sm text-neutral-900">{userData?.name || 'Non renseigné'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Email</label>
                    <p className="mt-1 text-sm text-neutral-900">{userData?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Membre depuis</label>
                    <p className="mt-1 text-sm text-neutral-900">{userData?.memberSince}</p>
                  </div>
                  <button className="btn-outline mt-4">
                    Modifier mes informations
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'admin' && (
              <div className="card p-6">
                <h2 className="text-lg font-medium text-neutral-900 mb-4">Admin Dashboard</h2>
                <p className="text-neutral-600">Bienvenue dans la section administration.</p>
                <button
                  onClick={handleAdminAccess}
                  className="btn-primary mt-4 inline-flex"
                >
                  Aller à l'administration
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 text-center mb-8">
          Mon Compte
        </h1>
        {isAuthenticated ? <UserDashboard /> : <LoginForm />}
      </div>
    </div>
  )
}
