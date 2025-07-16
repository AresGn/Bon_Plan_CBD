import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Vérification des variables d'environnement
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Variables d\'environnement manquantes:')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl)
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Définie' : 'Non définie')
  throw new Error(
    'Les variables d\'environnement Supabase sont manquantes. ' +
    'Assurez-vous que NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY sont définies dans .env.local'
  )
}

// Client pour les opérations côté client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client pour les opérations côté serveur avec plus de privilèges
export const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null

// Types pour les tables
export interface User {
  id: string
  email: string
  password: string
  name?: string
  role: string
  emailVerified?: Date
  image?: string
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  originalPrice?: number
  stock: number
  images: string
  cbdRate: number
  thcRate: number
  origin?: string
  cultivationType?: string
  terpenes: string
  effects: string
  labAnalysis?: string
  status: string
  featured: boolean
  categoryId: string
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  orderNumber: string
  status: string
  total: number
  subtotal: number
  shipping: number
  tax: number
  discount: number
  userId?: string
  email: string
  phone: string
  shippingAddress: string
  billingAddress?: string
  paymentMethod: string
  paymentStatus: string
  paymentId?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}
