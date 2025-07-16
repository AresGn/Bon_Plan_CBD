import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, handleSupabaseAdminError } from '@/lib/supabase-admin';
import { requireAdmin } from '@/middleware/auth';

// GET - Récupérer tous les produits ou filtrer par catégorie
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const status = searchParams.get('status');

    // Les filtres seront appliqués directement sur la requête Supabase

    // Vérifier que supabaseAdmin est disponible
    let supabaseAdmin;
    try {
      supabaseAdmin = getSupabaseAdmin();
    } catch (error) {
      return handleSupabaseAdminError();
    }

    // Construire la requête Supabase
    let query = supabaseAdmin
      .from('Product')
      .select(`
        *,
        category:Category(*)
      `)
      .order('createdAt', { ascending: false });

    if (category) {
      // D'abord, obtenir l'ID de la catégorie à partir du slug
      const { data: categoryData } = await supabaseAdmin
        .from('Category')
        .select('id')
        .eq('slug', category)
        .single();
      
      if (categoryData) {
        query = query.eq('categoryId', categoryData.id);
      }
    }
    
    if (featured === 'true') {
      query = query.eq('featured', true);
    }
    
    if (status) {
      query = query.eq('status', status);
    }

    const { data: products, error } = await query;

    if (error) throw error;

    // Transformer les champs JSON string en objets
    const transformedProducts = (products || []).map(product => ({
      ...product,
      images: JSON.parse(product.images || '[]'),
      terpenes: JSON.parse(product.terpenes || '[]'),
      effects: JSON.parse(product.effects || '[]')
    }));

    return NextResponse.json(transformedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des produits' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau produit (Admin seulement)
export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification admin
    const authResult = await requireAdmin(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    
    const body = await request.json();
    
    // Vérifier que supabaseAdmin est disponible
    let supabaseAdmin;
    try {
      supabaseAdmin = getSupabaseAdmin();
    } catch (error) {
      return handleSupabaseAdminError();
    }
    
    // Convertir les tableaux en JSON string pour SQLite
    const productData = {
      ...body,
      images: JSON.stringify(body.images || []),
      terpenes: JSON.stringify(body.terpenes || []),
      effects: JSON.stringify(body.effects || [])
    };

    const { data: product, error } = await supabaseAdmin
      .from('Product')
      .insert([productData])
      .select(`
        *,
        category:Category(*)
      `)
      .single();

    if (error) throw error;

    // Retourner avec les champs transformés
    const transformedProduct = {
      ...product,
      images: JSON.parse(product.images),
      terpenes: JSON.parse(product.terpenes),
      effects: JSON.parse(product.effects)
    };

    return NextResponse.json(transformedProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du produit' },
      { status: 500 }
    );
  }
}
