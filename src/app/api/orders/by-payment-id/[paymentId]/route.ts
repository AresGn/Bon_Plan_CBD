import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ paymentId: string }> }
) {
  try {
    const { paymentId } = await params;

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID requis' },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();

    // Rechercher la commande par paymentId (peut être Stripe ou PayGreen)
    const { data: order, error } = await supabaseAdmin
      .from('Order')
      .select(`
        *,
        items:OrderItem(
          *,
          product:Product(*)
        )
      `)
      .eq('paymentId', paymentId)
      .single();

    if (error || !order) {
      return NextResponse.json(
        { error: 'Commande non trouvée' },
        { status: 404 }
      );
    }

    // Parser les adresses JSON
    const parsedOrder = {
      ...order,
      shippingAddress: JSON.parse(order.shippingAddress),
      billingAddress: order.billingAddress ? JSON.parse(order.billingAddress) : null
    };

    return NextResponse.json({
      success: true,
      order: parsedOrder
    });

  } catch (error: any) {
    console.error('Erreur lors de la récupération de la commande:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
