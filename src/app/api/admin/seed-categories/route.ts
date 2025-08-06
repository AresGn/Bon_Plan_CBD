import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

const defaultCategories = [
  {
    name: 'Fleurs CBD',
    slug: 'fleurs-cbd',
    description: 'Fleurs de cannabis CBD de haute qualité',
    image: null
  },
  {
    name: 'Huiles CBD',
    slug: 'huiles-cbd',
    description: 'Huiles et extraits de CBD',
    image: null
  },
  {
    name: 'Résines CBD',
    slug: 'resines-cbd',
    description: 'Résines et hash CBD',
    image: null
  },
  {
    name: 'E-liquides CBD',
    slug: 'e-liquides-cbd',
    description: 'E-liquides pour cigarettes électroniques',
    image: null
  },
  {
    name: 'Cosmétiques CBD',
    slug: 'cosmetiques-cbd',
    description: 'Produits cosmétiques au CBD',
    image: null
  }
]

export async function POST(req: NextRequest) {
  try {
    // Vérifier l'authentification admin
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    console.log('Début de la création des catégories par défaut...')
    
    // Vérifier les catégories existantes
    const { data: existingCategories, error: fetchError } = await supabaseAdmin!
      .from('Category')
      .select('*')
    
    if (fetchError) {
      console.error('Erreur lors de la récupération des catégories:', fetchError)
      return NextResponse.json({ error: fetchError.message }, { status: 500 })
    }
    
    const results = []
    
    // Créer les catégories manquantes
    for (const category of defaultCategories) {
      const exists = existingCategories.find(cat => cat.slug === category.slug)
      
      if (!exists) {
        console.log(`Création de la catégorie: ${category.name}`)
        
        const { data, error } = await supabaseAdmin!
          .from('Category')
          .insert({
            ...category,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
          .select()
          .single()
        
        if (error) {
          console.error(`Erreur lors de la création de ${category.name}:`, error)
          results.push({
            category: category.name,
            status: 'error',
            error: error.message
          })
        } else {
          console.log(`✓ Catégorie ${category.name} créée avec l'ID: ${data.id}`)
          results.push({
            category: category.name,
            status: 'created',
            id: data.id
          })
        }
      } else {
        console.log(`✓ Catégorie ${category.name} existe déjà`)
        results.push({
          category: category.name,
          status: 'exists',
          id: exists.id
        })
      }
    }
    
    // Récupérer toutes les catégories
    const { data: allCategories } = await supabaseAdmin!
      .from('Category')
      .select('*')
      .order('name')
    
    return NextResponse.json({
      message: 'Catégories initialisées avec succès',
      results,
      categories: allCategories
    })
    
  } catch (error: any) {
    console.error('Erreur lors de l\'initialisation des catégories:', error)
    return NextResponse.json({ 
      error: error.message || 'Erreur interne du serveur' 
    }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    // Récupérer toutes les catégories
    const { data: categories, error } = await supabaseAdmin!
      .from('Category')
      .select('*')
      .order('name')
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({
      categories,
      count: categories.length
    })
    
  } catch (error: any) {
    console.error('Erreur lors de la récupération des catégories:', error)
    return NextResponse.json({ 
      error: error.message || 'Erreur interne du serveur' 
    }, { status: 500 })
  }
}
