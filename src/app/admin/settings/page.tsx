'use client'

import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

interface User {
  id: string
  email: string
  name?: string
  role: string
  createdAt: Date
}

export default function AdminSettingsPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users')
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la récupération des utilisateurs')
      }
      
      const data = await response.json()
      setUsers(data || [])
    } catch (error: any) {
      console.error('Erreur lors de la récupération des utilisateurs:', error.message)
      toast.error('Erreur lors du chargement des utilisateurs')
    } finally {
      setLoading(false)
    }
  }

const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, role: newRole }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la mise à jour du rôle')
      }

      toast.success('Rôle mis à jour avec succès')
      fetchUsers() // Recharger la liste
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour du rôle:', error)
      toast.error('Erreur lors de la mise à jour du rôle')
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
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">Paramètres</h1>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-neutral-900 mb-4">
            Gestion des utilisateurs
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Rôle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Date d'inscription
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {user.name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'ADMIN' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <select
                        value={user.role}
                        onChange={(e) => updateUserRole(user.id, e.target.value)}
                        className="text-primary-600 hover:text-primary-900 border border-neutral-300 rounded px-2 py-1"
                      >
                        <option value="USER">Utilisateur</option>
                        <option value="ADMIN">Administrateur</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <p className="text-center text-neutral-500 py-8">
              Aucun utilisateur trouvé
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
