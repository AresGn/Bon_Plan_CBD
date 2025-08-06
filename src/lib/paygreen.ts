import axios from 'axios';

// Configuration de l'environnement PayGreen
const baseURL = process.env.PAYGREEN_ENV === 'production'
  ? 'https://api.paygreen.fr'
  : 'https://sb-api.paygreen.fr';

// Client PayGreen pour les appels serveur-à-serveur
export function pgClient() {
  return axios.create({
    baseURL,
    headers: {
      'Authorization': `Bearer ${process.env.PAYGREEN_SECRET_KEY}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
}

// Types PayGreen
export interface PayGreenPaymentOrder {
  id: string;
  redirect_url: string;
  status: string;
  amount: number;
  currency: string;
}

export interface CreatePaymentOrderRequest {
  amount: number;
  currency: string;
  customer_email?: string;
  return_url: string;
  cancel_url: string;
  auto_capture?: boolean;
  merchant_initiated?: boolean;
  mode?: string;
  partial_allowed?: boolean;
}

export interface PayGreenWebhookEvent {
  type: string;
  data: {
    payment_order: PayGreenPaymentOrder;
  };
}

// Fonction utilitaire pour créer un Payment Order
export async function createPaymentOrder(orderData: CreatePaymentOrderRequest): Promise<PayGreenPaymentOrder> {
  try {
    const { data } = await pgClient().post('/payment/payment-orders', {
      amount: orderData.amount, // en cents
      currency: orderData.currency || 'eur',
      auto_capture: orderData.auto_capture ?? true,
      merchant_initiated: orderData.merchant_initiated ?? false,
      mode: orderData.mode || 'instant',
      partial_allowed: orderData.partial_allowed ?? false,
      return_url: orderData.return_url,
      cancel_url: orderData.cancel_url
    });
    
    return data;
  } catch (error: any) {
    console.error('Erreur lors de la création du Payment Order PayGreen:', error.response?.data || error.message);
    throw new Error(`Erreur PayGreen: ${error.response?.data?.message || error.message}`);
  }
}

// Fonction pour récupérer un Payment Order
export async function getPaymentOrder(paymentOrderId: string): Promise<PayGreenPaymentOrder> {
  try {
    const { data } = await pgClient().get(`/payment/payment-orders/${paymentOrderId}`);
    return data;
  } catch (error: any) {
    console.error('Erreur lors de la récupération du Payment Order:', error.response?.data || error.message);
    throw new Error(`Erreur PayGreen: ${error.response?.data?.message || error.message}`);
  }
}

// Fonction pour effectuer un remboursement
export async function refundPayment(transactionId: string, amount?: number): Promise<any> {
  try {
    if (amount) {
      // Remboursement partiel
      const { data } = await pgClient().patch(`/payins/transaction/${transactionId}`, {
        amount
      });
      return data;
    } else {
      // Remboursement intégral
      const { data } = await pgClient().delete(`/payins/transaction/${transactionId}`);
      return data;
    }
  } catch (error: any) {
    console.error('Erreur lors du remboursement:', error.response?.data || error.message);
    throw new Error(`Erreur PayGreen: ${error.response?.data?.message || error.message}`);
  }
}

// Fonction pour vérifier la signature des webhooks
export function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  // Implémentation de la vérification HMAC
  const crypto = require('crypto');
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}
