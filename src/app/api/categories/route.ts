import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin } from '@/middleware/auth';

// GET - Récupérer toutes les catégories
export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Configuration serveur incorrecte' },
        { status: 500 }
      );
    }
    
    const { data: categories, error } = await supabaseAdmin
      .from('Category')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;

    // Compter les produits pour chaque catégorie
    const categoriesWithCount = await Promise.all(
      (categories || []).map(async (category) => {
        const { count } = await supabaseAdmin!
          .from('Product')
          .select('*', { count: 'exact', head: true })
          .eq('categoryId', category.id);
        
        return {
          ...category,
          _count: {
            products: count || 0
          }
        };
      })
    );

    return NextResponse.json(categoriesWithCount);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des catégories' },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle catégorie (Admin seulement)
export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification admin
    const authResult = await requireAdmin(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    
    const body = await request.json();
    
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Configuration serveur incorrecte' },
        { status: 500 }
      );
    }
    
    const { data: category, error } = await supabaseAdmin
      .from('Category')
      .insert([body])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la catégorie' },
      { status: 500 }
    );
  }
}
