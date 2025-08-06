import { NextRequest, NextResponse } from 'next/server';
import { refundPayment } from '@/lib/paygreen';

import { getSupabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: NextRequest) {
  try {
    // TODO: Vérifier l'authentification admin
    // const user = await verifyToken(request);
    // if (!user || user.role !== 'ADMIN') {
    //   return NextResponse.json(
    //     { error: 'Accès non autorisé' },
    //     { status: 403 }
    //   );
    // }

    const body = await request.json();
    const { orderId, amount, reason } = body;

    // Validation des données
    if (!orderId) {
      return NextResponse.json(
        { error: 'ID de commande requis' },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();

    // Récupérer la commande
    const { data: order, error: orderError } = await supabaseAdmin
      .from('Order')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Commande non trouvée' },
        { status: 404 }
      );
    }

    // Vérifier que la commande a un paymentId PayGreen
    if (!order.paymentId) {
      return NextResponse.json(
        { error: 'Aucun ID de paiement PayGreen trouvé' },
        { status: 400 }
      );
    }

    // Vérifier que la commande est payée
    if (order.paymentStatus !== 'PAID') {
      return NextResponse.json(
        { error: 'La commande n\'est pas payée' },
        { status: 400 }
      );
    }

    // Effectuer le remboursement via PayGreen
    let refundAmount = amount;
    if (amount) {
      // Remboursement partiel - convertir en centimes
      refundAmount = Math.round(amount * 100);
    }

    const refundResult = await refundPayment(order.paymentId, refundAmount);

    // Mettre à jour la commande dans la base de données
    const updateData: any = {
      updatedAt: new Date().toISOString()
    };

    if (!amount || amount >= order.total) {
      // Remboursement intégral
      updateData.status = 'REFUNDED';
      updateData.paymentStatus = 'REFUNDED';
    } else {
      // Remboursement partiel
      updateData.status = 'PARTIALLY_REFUNDED';
      updateData.paymentStatus = 'PARTIALLY_REFUNDED';
    }

    const { error: updateError } = await supabaseAdmin
      .from('Order')
      .update(updateData)
      .eq('id', orderId);

    if (updateError) {
      console.error('Erreur lors de la mise à jour de la commande:', updateError);
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour de la commande' },
        { status: 500 }
      );
    }

    // Log du remboursement (optionnel - vous pouvez créer une table RefundLog)
    console.log('Remboursement effectué:', {
      orderId,
      paymentId: order.paymentId,
      amount: refundAmount,
      reason,
      adminId: 'admin-temp-id'
    });

    return NextResponse.json({
      success: true,
      message: amount 
        ? `Remboursement partiel de ${amount}€ effectué`
        : 'Remboursement intégral effectué',
      refundResult
    });

  } catch (error: any) {
    console.error('Erreur lors du remboursement:', error);
    
    return NextResponse.json(
      { 
        error: 'Erreur lors du remboursement',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
