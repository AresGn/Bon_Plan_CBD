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

    // Validation des données
    if (!body.name || !body.name.trim()) {
      return NextResponse.json({ error: 'Le nom du produit est requis' }, { status: 400 });
    }

    if (!body.categoryId || !body.categoryId.trim()) {
      return NextResponse.json({ error: 'La catégorie est requise' }, { status: 400 });
    }

    if (!body.price || isNaN(Number(body.price)) || Number(body.price) <= 0) {
      return NextResponse.json({ error: 'Le prix doit être un nombre valide supérieur à 0' }, { status: 400 });
    }

    if (isNaN(Number(body.stock)) || Number(body.stock) < 0) {
      return NextResponse.json({ error: 'Le stock doit être un nombre valide' }, { status: 400 });
    }

    if (isNaN(Number(body.cbdRate)) || Number(body.cbdRate) < 0) {
      return NextResponse.json({ error: 'Le taux CBD doit être un nombre valide' }, { status: 400 });
    }

    if (isNaN(Number(body.thcRate)) || Number(body.thcRate) < 0 || Number(body.thcRate) > 0.3) {
      return NextResponse.json({ error: 'Le taux THC doit être un nombre valide entre 0 et 0.3% (limite légale UE)' }, { status: 400 });
    }

    // Vérifier que supabaseAdmin est disponible
    let supabaseAdmin;
    try {
      supabaseAdmin = getSupabaseAdmin();
    } catch (error) {
      return handleSupabaseAdminError();
    }

    // Vérifier que la catégorie existe
    const { data: categoryExists } = await supabaseAdmin
      .from('Category')
      .select('id')
      .eq('id', body.categoryId.trim())
      .single();

    if (!categoryExists) {
      return NextResponse.json({ error: 'La catégorie sélectionnée n\'existe pas' }, { status: 400 });
    }

    // Generate slug from name
    const slug = body.slug || body.name.trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Convertir les tableaux en JSON string pour SQLite
    const productData = {
      ...body,
      name: body.name.trim(),
      slug,
      description: body.description?.trim() || '',
      price: Number(body.price),
      originalPrice: Number(body.originalPrice) || 0,
      stock: Number(body.stock),
      cbdRate: Number(body.cbdRate),
      thcRate: Number(body.thcRate),
      origin: body.origin?.trim() || '',
      cultivationType: body.cultivationType || 'indoor',
      labAnalysis: body.labAnalysis?.trim() || '',
      status: body.status || 'DRAFT',
      featured: Boolean(body.featured),
      categoryId: body.categoryId.trim(),
      images: JSON.stringify(body.images || []),
      terpenes: JSON.stringify(body.terpenes || []),
      effects: JSON.stringify(body.effects || []),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    console.log('Données produit à insérer (API products):', productData);

    const { data: product, error } = await supabaseAdmin
      .from('Product')
      .insert([productData])
      .select(`
        *,
        category:Category(*)
      `)
      .single();

    if (error) {
      console.error('Erreur Supabase (API products):', error);
      throw error;
    }

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
