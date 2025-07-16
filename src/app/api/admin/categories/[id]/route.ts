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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  try {
    const body = await request.json();
    const { name, slug, description, image } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('Category')
      .update({
        name,
        slug,
        description,
        image,
        updatedAt: new Date().toISOString(),
      })
      .eq('id', resolvedParams.id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  try {
    // First check if category has products
    const { data: products } = await supabaseAdmin
      .from('Product')
      .select('id')
      .eq('categoryId', resolvedParams.id)
      .limit(1);

    if (products && products.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete category with products' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('Category')
      .delete()
      .eq('id', resolvedParams.id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
