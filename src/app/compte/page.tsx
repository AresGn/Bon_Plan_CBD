'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  UserCircleIcon, 
  ShoppingBagIcon, 
  HeartIcon, 
  MapPinIcon,
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline'

// Pour la démo, on simule un utilisateur connecté
const mockUser = {
  name: 'Jean Dupont',
  email: 'jean.dupont@email.com',
  memberSince: '2024',
}

export default function AccountPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('orders')

  // Formulaire de connexion
  const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault()
      // Simulation de connexion
      setIsAuthenticated(true)
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
    ]

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
                onClick={() => setIsAuthenticated(false)}
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
              <div className="card p-6">
                <h2 className="text-lg font-medium text-neutral-900 mb-4">Mes commandes</h2>
                <p className="text-neutral-600">Vous n'avez pas encore passé de commande.</p>
                <Link href="/produits/fleurs" className="btn-primary mt-4 inline-flex">
                  Découvrir nos produits
                </Link>
              </div>
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
                <p className="text-neutral-600">Aucune adresse enregistrée.</p>
                <button className="btn-primary mt-4">
                  Ajouter une adresse
                </button>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="card p-6">
                <h2 className="text-lg font-medium text-neutral-900 mb-4">Mon profil</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Nom</label>
                    <p className="mt-1 text-sm text-neutral-900">{mockUser.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Email</label>
                    <p className="mt-1 text-sm text-neutral-900">{mockUser.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Membre depuis</label>
                    <p className="mt-1 text-sm text-neutral-900">{mockUser.memberSince}</p>
                  </div>
                  <button className="btn-outline mt-4">
                    Modifier mes informations
                  </button>
                </div>
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
