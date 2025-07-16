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

// GET all products
export async function GET(req: NextRequest) {
  try {
    // Vérifier l'authentification admin
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const searchParams = req.nextUrl.searchParams
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort')
    const limit = searchParams.get('limit')

    // Construire la requête Supabase
    let query = supabaseAdmin
      .from('Product')
      .select(`
        *,
        category:Category(*),
        orderItems:OrderItem(
          *,
          order:Order(*)
        )
      `)

    // Filtres
    if (status) {
      query = query.eq('status', status)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    // Limite
    if (limit) {
      query = query.limit(parseInt(limit))
    }

    // Exécuter la requête
    const { data: products, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Si tri par popularité
    if (sort === 'popular' && products) {
      // Calculer les ventes pour chaque produit
      const productsWithSales = products.map(product => {
        const sales = product.orderItems?.filter((item: any) => 
          item.order?.paymentStatus === 'PAID'
        ).reduce((sum: number, item: any) => sum + (item.quantity || 0), 0) || 0
        
        return { ...product, totalSales: sales }
      })

      // Trier par nombre de ventes
      productsWithSales.sort((a, b) => b.totalSales - a.totalSales)
      
      return NextResponse.json(productsWithSales)
    }

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST create new product
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const body = await req.json()
    
    // Generate slug from name
    const slug = body.slug || body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const { data: product, error } = await supabaseAdmin
      .from('Product')
      .insert({
        name: body.name,
        slug,
        description: body.description,
        price: body.price,
        originalPrice: body.originalPrice,
        stock: body.stock,
        images: body.images || [],
        cbdRate: body.cbdRate,
        thcRate: body.thcRate,
        origin: body.origin,
        cultivationType: body.cultivationType,
        terpenes: body.terpenes || [],
        effects: body.effects || [],
        labAnalysis: body.labAnalysis,
        status: body.status,
        featured: body.featured || false,
        categoryId: body.categoryId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      .select(`
        *,
        category:Category(*)
      `)
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT update product
export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const body = await req.json()
    const { id, ...data } = body

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    // Generate new slug if name changed
    if (data.name && !data.slug) {
      data.slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    // Ajouter la date de mise à jour
    data.updatedAt = new Date().toISOString()

    const { data: product, error } = await supabaseAdmin
      .from('Product')
      .update(data)
      .eq('id', id)
      .select(`
        *,
        category:Category(*)
      `)
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE product
export async function DELETE(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const searchParams = req.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('Product')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
