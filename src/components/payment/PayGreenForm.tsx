'use client'

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface PayGreenFormProps {
  paymentOrderID: string;
  amount: number;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  onCancel?: () => void;
}

export default function PayGreenForm({
  paymentOrderID,
  amount,
  onSuccess,
  onError,
  onCancel
}: PayGreenFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  // Récupérer l'URL de redirection PayGreen
  useEffect(() => {
    const fetchPaymentOrder = async () => {
      try {
        const response = await fetch(`/api/paygreen/get-order/${paymentOrderID}`);
        const data = await response.json();

        if (data.success && data.paymentOrder.redirect_url) {
          setRedirectUrl(data.paymentOrder.redirect_url);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'ordre:', error);
        toast.error('Erreur lors de la récupération des informations de paiement');
      }
    };

    if (paymentOrderID) {
      fetchPaymentOrder();
    }
  }, [paymentOrderID]);

  const handlePayment = () => {
    if (redirectUrl) {
      setIsLoading(true);
      // Rediriger vers la page de paiement hébergée PayGreen
      if (typeof window !== 'undefined') {
        window.location.href = redirectUrl;
      }
    } else {
      toast.error('URL de paiement non disponible');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Paiement sécurisé
        </h3>
        <p className="text-sm text-gray-600">
          Montant à payer : <span className="font-semibold">{(amount / 100).toFixed(2)} €</span>
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Paiement sécurisé
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  Vous allez être redirigé vers la page de paiement sécurisée PayGreen.
                  Vos données bancaires sont protégées et ne transitent pas par notre site.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handlePayment}
            disabled={isLoading || !redirectUrl}
            className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
              isLoading || !redirectUrl
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Redirection en cours...
              </div>
            ) : (
              `Payer ${(amount / 100).toFixed(2)} € avec PayGreen`
            )}
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Paiement sécurisé par PayGreen • Conforme PCI-DSS • 3D Secure
          </p>
          <div className="mt-2 flex justify-center space-x-2">
            <span className="text-xs text-gray-400">Cartes acceptées :</span>
            <span className="text-xs text-gray-600">Visa • Mastercard • CB</span>
          </div>
        </div>
      </div>
    </div>
  );
}
