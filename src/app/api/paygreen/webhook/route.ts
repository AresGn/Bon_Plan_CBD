import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature, PayGreenWebhookEvent } from '@/lib/paygreen';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('PG-Signature');

    // Vérifier la signature du webhook (optionnel en développement)
    if (process.env.PAYGREEN_ENV === 'production' && signature) {
      const isValid = verifyWebhookSignature(
        body,
        signature,
        process.env.PAYGREEN_SECRET_KEY!
      );
      
      if (!isValid) {
        console.error('Signature webhook PayGreen invalide');
        return NextResponse.json(
          { error: 'Signature invalide' },
          { status: 401 }
        );
      }
    }

    const event: PayGreenWebhookEvent = JSON.parse(body);
    console.log('Webhook PayGreen reçu:', event.type, event.data);

    const supabaseAdmin = getSupabaseAdmin();

    switch (event.type) {
      case 'payment_order.success':
        await handlePaymentSuccess(event, supabaseAdmin);
        break;
        
      case 'payment_order.failed':
        await handlePaymentFailed(event, supabaseAdmin);
        break;
        
      case 'payment_order.cancelled':
        await handlePaymentCancelled(event, supabaseAdmin);
        break;
        
      default:
        console.log('Type d\'événement webhook non géré:', event.type);
    }

    return NextResponse.json({ received: true }, { status: 204 });

  } catch (error: any) {
    console.error('Erreur lors du traitement du webhook PayGreen:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

async function handlePaymentSuccess(event: PayGreenWebhookEvent, supabaseAdmin: any) {
  const paymentOrder = event.data.payment_order;
  
  try {
    // Trouver la commande correspondante par paymentId
    const { data: order, error: findError } = await supabaseAdmin
      .from('Order')
      .select('*')
      .eq('paymentId', paymentOrder.id)
      .single();

    if (findError || !order) {
      console.error('Commande non trouvée pour le Payment Order:', paymentOrder.id);
      return;
    }

    // Mettre à jour le statut de la commande
    const { error: updateError } = await supabaseAdmin
      .from('Order')
      .update({
        status: 'CONFIRMED',
        paymentStatus: 'PAID',
        updatedAt: new Date().toISOString()
      })
      .eq('id', order.id);

    if (updateError) {
      console.error('Erreur lors de la mise à jour de la commande:', updateError);
      return;
    }

    console.log('Commande confirmée avec succès:', order.orderNumber);
    
    // Ici vous pouvez ajouter d'autres actions :
    // - Envoyer un email de confirmation
    // - Mettre à jour le stock
    // - Déclencher la préparation de commande
    
  } catch (error) {
    console.error('Erreur lors du traitement du paiement réussi:', error);
  }
}

async function handlePaymentFailed(event: PayGreenWebhookEvent, supabaseAdmin: any) {
  const paymentOrder = event.data.payment_order;
  
  try {
    const { error } = await supabaseAdmin
      .from('Order')
      .update({
        status: 'FAILED',
        paymentStatus: 'FAILED',
        updatedAt: new Date().toISOString()
      })
      .eq('paymentId', paymentOrder.id);

    if (error) {
      console.error('Erreur lors de la mise à jour de la commande échouée:', error);
    }
    
  } catch (error) {
    console.error('Erreur lors du traitement du paiement échoué:', error);
  }
}

async function handlePaymentCancelled(event: PayGreenWebhookEvent, supabaseAdmin: any) {
  const paymentOrder = event.data.payment_order;
  
  try {
    const { error } = await supabaseAdmin
      .from('Order')
      .update({
        status: 'CANCELLED',
        paymentStatus: 'CANCELLED',
        updatedAt: new Date().toISOString()
      })
      .eq('paymentId', paymentOrder.id);

    if (error) {
      console.error('Erreur lors de la mise à jour de la commande annulée:', error);
    }
    
  } catch (error) {
    console.error('Erreur lors du traitement du paiement annulé:', error);
  }
}
