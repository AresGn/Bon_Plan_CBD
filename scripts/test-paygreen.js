#!/usr/bin/env node

/**
 * Script de test pour vérifier la configuration PayGreen
 * Usage: node scripts/test-paygreen.js
 */

require('dotenv').config({ path: '.env.local' });
const axios = require('axios');

// Configuration PayGreen
const baseURL = process.env.PAYGREEN_ENV === 'production'
  ? 'https://api.paygreen.fr'
  : 'https://sb-api.paygreen.fr';

const pgClient = axios.create({
  baseURL,
  headers: {
    'Authorization': `Bearer ${process.env.PAYGREEN_SECRET_KEY}`,
    'Content-Type': 'application/json'
  }
});

async function testPayGreenConfiguration() {
  console.log('🧪 Test de la configuration PayGreen\n');

  // Vérifier les variables d'environnement
  console.log('📋 Vérification des variables d\'environnement...');
  const requiredVars = [
    'PAYGREEN_SHOP_ID',
    'PAYGREEN_SECRET_KEY',
    'PAYGREEN_PUBLIC_KEY',
    'PAYGREEN_ENV',
    'NEXT_PUBLIC_PAYGREEN_PUBLIC_KEY'
  ];

  let configOk = true;
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      console.log(`✅ ${varName}: ${value.substring(0, 10)}...`);
    } else {
      console.log(`❌ ${varName}: Manquante`);
      configOk = false;
    }
  });

  if (!configOk) {
    console.log('\n❌ Configuration incomplète. Vérifiez votre fichier .env.local');
    process.exit(1);
  }

  console.log(`\n🌐 Environnement: ${process.env.PAYGREEN_ENV}`);
  console.log(`🔗 API URL: ${baseURL}\n`);

  try {
    // Test 1: Créer un Payment Order de test
    console.log('🔄 Test 1: Création d\'un Payment Order de test...');
    
    const testOrder = {
      amount: 100, // 1€ en centimes
      currency: 'eur',
      auto_capture: true,
      merchant_initiated: false,
      mode: 'instant',
      partial_allowed: false,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/cancel`
    };

    const { data: paymentOrder } = await pgClient.post('/payment/payment-orders', testOrder);
    
    console.log('✅ Payment Order créé avec succès !');
    console.log(`   ID: ${paymentOrder.id}`);
    console.log(`   Status: ${paymentOrder.status}`);
    console.log(`   Redirect URL: ${paymentOrder.redirect_url}\n`);

    // Test 2: Récupérer le Payment Order
    console.log('🔄 Test 2: Récupération du Payment Order...');
    
    const { data: retrievedOrder } = await pgClient.get(`/payment/payment-orders/${paymentOrder.id}`);
    
    console.log('✅ Payment Order récupéré avec succès !');
    console.log(`   ID: ${retrievedOrder.id}`);
    console.log(`   Amount: ${retrievedOrder.amount} centimes`);
    console.log(`   Currency: ${retrievedOrder.currency}\n`);

    // Test 3: Vérifier les listeners (webhooks)
    console.log('🔄 Test 3: Vérification des listeners...');
    
    try {
      const { data: listeners } = await pgClient.get('/notifications/listeners');
      
      if (listeners && listeners.length > 0) {
        console.log('✅ Listeners configurés :');
        listeners.forEach((listener, index) => {
          console.log(`   ${index + 1}. ${listener.url} (${listener.events.join(', ')})`);
        });
      } else {
        console.log('⚠️  Aucun listener configuré. Vous devrez configurer les webhooks manuellement.');
      }
    } catch (error) {
      console.log('⚠️  Impossible de récupérer les listeners (normal en sandbox)');
    }

    console.log('\n🎉 Tous les tests sont passés avec succès !');
    console.log('\n📝 Prochaines étapes :');
    console.log('   1. Configurer les webhooks dans le back-office PayGreen');
    console.log('   2. Tester les paiements avec les cartes de test');
    console.log('   3. Vérifier les redirections de succès/échec');
    console.log('\n💳 Carte de test :');
    console.log('   Numéro: 4970100000000154');
    console.log('   Expiration: 12/30');
    console.log('   CVV: 123');

  } catch (error) {
    console.error('\n❌ Erreur lors des tests PayGreen:');
    
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Message: ${error.response.data?.message || error.response.statusText}`);
      
      if (error.response.status === 401) {
        console.error('\n🔑 Erreur d\'authentification. Vérifiez :');
        console.error('   - Que PAYGREEN_SECRET_KEY est correcte');
        console.error('   - Que la clé correspond à l\'environnement (sandbox/production)');
      }
    } else {
      console.error(`   ${error.message}`);
    }
    
    process.exit(1);
  }
}

// Exécuter les tests
testPayGreenConfiguration().catch(console.error);
