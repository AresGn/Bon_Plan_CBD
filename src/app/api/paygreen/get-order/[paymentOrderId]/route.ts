import { NextRequest, NextResponse } from 'next/server';
import { getPaymentOrder } from '@/lib/paygreen';


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ paymentOrderId: string }> }
) {
  try {
    const { paymentOrderId } = await params;

    // TODO: Vérifier l'authentification
    // const user = await verifyToken(request);
    // if (!user) {
    //   return NextResponse.json(
    //     { error: 'Non authentifié' },
    //     { status: 401 }
    //   );
    // }

    if (!paymentOrderId) {
      return NextResponse.json(
        { error: 'Payment Order ID requis' },
        { status: 400 }
      );
    }

    // Récupérer le Payment Order depuis PayGreen
    const paymentOrder = await getPaymentOrder(paymentOrderId);

    return NextResponse.json({
      success: true,
      paymentOrder
    });

  } catch (error: any) {
    console.error('Erreur lors de la récupération du Payment Order:', error);
    
    return NextResponse.json(
      { 
        error: 'Erreur lors de la récupération du paiement',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
