#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de test des clés API Paygree
Permet de vérifier la validité et le fonctionnement des clés API
"""

import requests
import json
import os
from datetime import datetime

class PaygreeAPITester:
    def __init__(self, api_key, secret_key=None, environment='sandbox'):
        """
        Initialise le testeur d'API Paygree
        
        Args:
            api_key (str): Clé API publique (obligatoire)
            secret_key (str): Clé secrète (optionnelle)
            environment (str): 'sandbox' ou 'production'
        """
        self.api_key = api_key
        self.secret_key = secret_key
        self.environment = environment
        
        # URLs de base selon l'environnement
        self.base_urls = {
            'sandbox': 'https://sandbox-api.paygree.com',
            'production': 'https://api.paygree.com'
        }
        
        self.base_url = self.base_urls.get(environment, self.base_urls['sandbox'])
        
        # Headers par défaut
        self.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': f'Bearer {self.api_key}' if self.api_key else None
        }

    def print_header(self, title):
        """Affiche un en-tête formaté"""
        print(f"\n{'='*50}")
        print(f" {title}")
        print(f"{'='*50}")

    def print_result(self, test_name, success, message, response_data=None):
        """Affiche le résultat d'un test"""
        status = "✅ SUCCÈS" if success else "❌ ÉCHEC"
        print(f"\n{test_name}: {status}")
        print(f"Message: {message}")
        
        if response_data:
            print(f"Données reçues: {json.dumps(response_data, indent=2, ensure_ascii=False)}")

    def test_api_connectivity(self):
        """Test de connectivité de base à l'API"""
        try:
            response = requests.get(f"{self.base_url}/health", timeout=10)
            
            if response.status_code == 200:
                return True, "Connexion à l'API réussie", response.json()
            else:
                return False, f"Erreur de connexion (Code: {response.status_code})", None
                
        except requests.exceptions.RequestException as e:
            return False, f"Erreur de réseau: {str(e)}", None

    def test_api_key_validation(self):
        """Test de validation de la clé API"""
        if not self.api_key:
            return False, "Clé API manquante", None
            
        try:
            # Test avec un endpoint qui nécessite une authentification
            response = requests.get(
                f"{self.base_url}/v1/account/info",
                headers=self.headers,
                timeout=10
            )
            
            if response.status_code == 200:
                return True, "Clé API valide et authentifiée", response.json()
            elif response.status_code == 401:
                return False, "Clé API invalide ou expirée", None
            else:
                return False, f"Erreur d'authentification (Code: {response.status_code})", response.text
                
        except requests.exceptions.RequestException as e:
            return False, f"Erreur lors du test d'authentification: {str(e)}", None

    def test_payment_creation(self):
        """Test de création d'un paiement fictif"""
        if not self.api_key:
            return False, "Clé API requise pour ce test", None
            
        test_payment_data = {
            "amount": 1000,  # 10.00 en centimes
            "currency": "XOF",  # Franc CFA
            "description": "Test de paiement - Script de validation",
            "customer": {
                "email": "test@example.com",
                "name": "Client Test"
            },
            "metadata": {
                "test": True,
                "script_version": "1.0",
                "timestamp": datetime.now().isoformat()
            }
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/v1/payments",
                headers=self.headers,
                json=test_payment_data,
                timeout=10
            )
            
            if response.status_code in [200, 201]:
                return True, "Création de paiement test réussie", response.json()
            elif response.status_code == 400:
                return False, "Données de paiement invalides", response.json()
            elif response.status_code == 401:
                return False, "Authentification échouée", None
            else:
                return False, f"Erreur lors de la création (Code: {response.status_code})", response.text
                
        except requests.exceptions.RequestException as e:
            return False, f"Erreur réseau lors de la création: {str(e)}", None

    def test_webhook_verification(self):
        """Test de vérification des webhooks (si clé secrète disponible)"""
        if not self.secret_key:
            return False, "Clé secrète requise pour tester les webhooks", None
            
        # Simulation d'une signature webhook
        import hmac
        import hashlib
        
        test_payload = '{"event": "payment.completed", "data": {"id": "test_payment_123"}}'
        expected_signature = hmac.new(
            self.secret_key.encode(),
            test_payload.encode(),
            hashlib.sha256
        ).hexdigest()
        
        return True, f"Simulation de signature webhook: {expected_signature[:20]}...", {
            "payload": test_payload,
            "signature": expected_signature
        }

    def run_all_tests(self):
        """Exécute tous les tests disponibles"""
        self.print_header("TESTS DES CLÉS API PAYGREE")
        
        print(f"Environnement: {self.environment.upper()}")
        print(f"URL de base: {self.base_url}")
        print(f"Clé API: {'✅ Configurée' if self.api_key else '❌ Manquante'}")
        print(f"Clé secrète: {'✅ Configurée' if self.secret_key else '❌ Manquante'}")
        
        # Test 1: Connectivité
        self.print_header("Test 1: Connectivité API")
        success, message, data = self.test_api_connectivity()
        self.print_result("Connectivité", success, message, data)
        
        # Test 2: Validation clé API
        self.print_header("Test 2: Validation de la clé API")
        success, message, data = self.test_api_key_validation()
        self.print_result("Validation clé API", success, message, data)
        
        # Test 3: Création de paiement
        self.print_header("Test 3: Création de paiement test")
        success, message, data = self.test_payment_creation()
        self.print_result("Création paiement", success, message, data)
        
        # Test 4: Webhooks
        self.print_header("Test 4: Vérification webhooks")
        success, message, data = self.test_webhook_verification()
        self.print_result("Webhooks", success, message, data)
        
        self.print_header("RÉSUMÉ DES TESTS TERMINÉ")

def main():
    """Fonction principale"""
    print("🚀 Script de test des clés API PayGreen")
    print("=" * 50)
    print()

    # Configuration directe des clés PayGreen
    api_key = "pk_af4042561413469f9d56b328b49ba32f"  # Clé publique PayGreen
    secret_key = "sk_bb5039c5564c4fe89fd1a19f20a83a7a"  # Clé secrète PayGreen
    environment = 'sandbox'  # Environnement sandbox

    # Récapitulatif de la configuration
    print(f"📊 CONFIGURATION AUTOMATIQUE")
    print("-" * 40)
    print(f"🔑 Clé API: {api_key[:10]}...{api_key[-10:]}")
    print(f"🔐 Clé secrète: {'✅ Configurée' if secret_key else '❌ Non fournie'}")
    print(f"🌍 Environnement: {environment.upper()}")
    print()

    # Initialisation et exécution des tests
    tester = PaygreeAPITester(
        api_key=api_key,
        secret_key=secret_key if secret_key else None,
        environment=environment
    )

    tester.run_all_tests()

if __name__ == "__main__":
    main()