import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = searchParams.get('limit')

    let query = supabaseAdmin
      .from('Order')
      .select(`
        *,
        items:OrderItem(
          *,
          product:Product(name, images)
        )
      `)
      .order('createdAt', { ascending: false })

    // Si status est 'RECENT', on prend juste les commandes récentes sans filtrer par statut
    if (status && status !== 'all' && status !== 'RECENT') {
      query = query.eq('status', status)
    }

    // Appliquer la limite si spécifiée
    if (limit) {
      query = query.limit(parseInt(limit))
    }

    const { data, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data || [])
  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
