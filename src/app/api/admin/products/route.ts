import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET all products
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    // Check if user is admin
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = req.nextUrl.searchParams
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    const where: any = {}

    if (category) {
      where.category = { slug: category }
    }

    if (status) {
      where.status = status
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        _count: {
          select: {
            reviews: true,
            orderItems: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST create new product
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    
    // Generate slug from name
    const slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const product = await prisma.product.create({
      data: {
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
      },
      include: {
        category: true,
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT update product
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { id, ...data } = body

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    // Generate new slug if name changed
    if (data.name) {
      data.slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    const product = await prisma.product.update({
      where: { id },
      data,
      include: {
        category: true,
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE product
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = req.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    await prisma.product.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
