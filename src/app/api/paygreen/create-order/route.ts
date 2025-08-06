import { NextRequest, NextResponse } from 'next/server';
import { createPaymentOrder } from '@/lib/paygreen';

export async function POST(request: NextRequest) {
  try {
    // TODO: Vérifier l'authentification
    // const user = await verifyToken(request);
    // if (!user) {
    //   return NextResponse.json(
    //     { error: 'Non authentifié' },
    //     { status: 401 }
    //   );
    // }

    const body = await request.json();
    const { amount, currency = 'eur', customer_email } = body;

    // Validation des données
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Montant invalide' },
        { status: 400 }
      );
    }

    // Convertir le montant en centimes si nécessaire
    const amountInCents = Math.round(amount * 100);

    // Créer le Payment Order PayGreen
    const paymentOrder = await createPaymentOrder({
      amount: amountInCents,
      currency,
      customer_email: customer_email || 'customer@example.com',
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
      auto_capture: true,
      merchant_initiated: false,
      mode: 'instant',
      partial_allowed: false
    });

    return NextResponse.json({
      success: true,
      paymentOrder: {
        id: paymentOrder.id,
        redirect_url: paymentOrder.redirect_url,
        status: paymentOrder.status
      }
    });

  } catch (error: any) {
    console.error('Erreur lors de la création du Payment Order:', error);
    
    return NextResponse.json(
      { 
        error: 'Erreur lors de la création du paiement',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
