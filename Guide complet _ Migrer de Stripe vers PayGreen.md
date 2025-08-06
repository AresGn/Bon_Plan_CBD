<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# Guide complet : Migrer de Stripe vers PayGreen dans une application Next.js / Node.js

**Vue d’ensemble :**
Ce guide pas-à-pas explique comment remplacer entièrement Stripe par PayGreen dans un site construit avec Next.js (front-end React) et Node.js (API Routes ou serverless). Vous trouverez : l’architecture cible, la configuration des clés, l’implémentation serveur (création de Payment Orders, webhooks, remboursements), l’intégration front-end avec PayGreenJS/PGJS-React, la gestion des statuts HTTP, la stratégie de migration des données, les tests en sandbox, la mise en production et les bonnes pratiques de sécurité et de conformité PCI-DSS. L’objectif est d’obtenir un flux de paiement fiable, compatible 3-D Secure et extensible (paiement en un clic, arrondi solidaire, titres-restaurant, etc.).

## Architecture cible

### Composants principaux

- **API PayGreen** : endpoints REST/JSON, authentification par JWT Bearer ou Secret Key[^1].
- **Payment Order** : point d’entrée unique pour chaque transaction ; le POST `/payment/payment-orders` crée un ordre et renvoie l’`id`+`redirect_url`.
- **PayGreenJS / PGJS-React** : bibliothèque front React/TS pour embarquer les champs CB ou déclencher le parcours hébergé[^2].
- **Notifications (listeners)** : webhooks PayGreen pour la confirmation serveur-à-serveur (trigger `/notifications/listeners`)[^3].
- **Base de données** : nouvelle table `paygreen_orders` faisant le lien entre votre modèle `Order` et l’ID PayGreen.
- **Next.js API Routes** : `/api/paygreen/*` pour créer l’ordre, recevoir les callbacks, traiter les remboursements.


## 1. Pré-requis et création de compte

### 1.1. Créer le compte marchand

1. S’inscrire sur le back-office PayGreen, activer la boutique et récupérer :
    - `SHOP_ID` commençant par `sh_…`
    - `SECRET_KEY` commençant par `sk_…`
    - `PUBLIC_KEY` commençant par `pk_…`
Ces identifiants sont disponibles dans *Compte › Tokens*[^4].
2. Activer le **mode Sandbox** sur `sb-api.paygreen.fr` pour vos premiers tests[^3].

### 1.2. Variables d’environnement

```bash
# .env.local
PAYGREEN_SHOP_ID=sh_xxxxx
PAYGREEN_SECRET_KEY=sk_xxxxx
PAYGREEN_PUBLIC_KEY=pk_xxxxx
PAYGREEN_ENV=sandbox           # ou production
NEXT_PUBLIC_PAYGREEN_PUBLIC_KEY=pk_xxxxx
```


## 2. Installation des dépendances

| Usage | Package | Commande NPM |
| :-- | :-- | :-- |
| Appels HTTP serveur | axios / node-fetch | `npm i axios` |
| Front-end React | `@paygreen/pgjs-react` | `npm i @paygreen/pgjs-react`[^2] |
| TypeScript types | `@types/node` etc. | selon projet |

## 3. Authentification serveur-à-serveur

```ts
// lib/paygreen.ts
import axios from 'axios';
const baseURL = process.env.PAYGREEN_ENV === 'production'
  ? 'https://api.paygreen.fr'
  : 'https://sb-api.paygreen.fr';

export function pgClient() {
  return axios.create({
    baseURL,
    headers: {
      'Authorization': `Bearer ${process.env.PAYGREEN_SECRET_KEY}`, // JWT Secret[^18]
      'Content-Type': 'application/json'
    }
  });
}
```


## 4. Création d’un Payment Order (équivalent Stripe PaymentIntent)

### 4.1. API Route Next.js

```ts
// pages/api/paygreen/create-order.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { pgClient } from '../../../lib/paygreen';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { amount, currency, customer_email } = req.body;

  try {
    const { data } = await pgClient().post('/payment/payment-orders', {
      amount,                // en cents
      currency,              // 'eur'
      auto_capture: true,
      merchant_initiated: false,
      mode: 'instant',
      partial_allowed: false,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`
    });
    // data: { id: 'po_xxx', redirect_url: 'https://paygreen.fr/checkout/…' }[^52]
    res.status(200).json(data);
  } catch (e:any) {
    res.status(e.response?.status || 500).json(e.response?.data);
  }
}
```


### 4.2. Flux décisionnel

1. Front appelle `/api/paygreen/create-order` avec le panier.
2. Le serveur reçoit `id` et `redirect_url`.
3. Deux options :
    - **Page hébergée** : rediriger l’utilisateur vers `redirect_url`[^5].
    - **Champs embarqués** : initialiser PayGreenJS avec `paymentOrderID` + `publicKey`[^2].

## 5. Intégration front-end avec PGJS-React

### 5.1. Provider global

```tsx
// _app.tsx
import { PGJSProvider } from '@paygreen/pgjs-react';

export default function MyApp({ Component, pageProps }) {
  return (
    <PGJSProvider devMode={process.env.PAYGREEN_ENV !== 'production'}>
      <Component {...pageProps} />
    </PGJSProvider>
  );
}
```


### 5.2. Formulaire de paiement

```tsx
import {
  PanContainer, ExpContainer, CvvContainer,
  PaymentContainer, usePGJS
} from '@paygreen/pgjs-react';

export default function PaygreenForm({ paymentOrderID }) {
  const {
    initPGJS, isPGJSAvailable, submitPayment, Events, attachEventListener
  } = usePGJS();

  React.useEffect(() => {
    if (isPGJSAvailable) {
      initPGJS({
        mode: 'payment',
        paymentMethod: 'bank_card',
        publicKey: process.env.NEXT_PUBLIC_PAYGREEN_PUBLIC_KEY!,
        paymentOrderID,
        objectSecret: 'auto' // ou fourni par l’API
      });
    }
  }, [isPGJSAvailable, paymentOrderID]);

  // Gestion des callbacks
  React.useEffect(() => {
    attachEventListener(Events.SUCCESS, () => window.location.href = '/checkout/success');
    attachEventListener(Events.ERROR, () => window.location.href = '/checkout/error');
  }, [attachEventListener]);

  return (
    <PaymentContainer>
      <PanContainer label="Numéro de carte" />
      <ExpContainer />
      <CvvContainer />
      <button onClick={submitPayment}>Payer</button>
    </PaymentContainer>
  );
}
```

Les champs étant *iframes* hébergées, la charge PCI est équivalente à Stripe Elements (SAQ-A)[^2].

## 6. Gestion des retours et notifications

### 6.1. Redirections front-end

PayGreen appelle `return_url` (succès) ou `cancel_url` (échec). Capturez les query-params `status`, `payment_order_id` pour afficher l’état.

### 6.2. Webhooks (listeners)

1. Créer un listener via l’endpoint `/notifications/listeners` ou l’UI ; cible : `https://yourapp.com/api/paygreen/webhook`[^3].
2. Vérifier la signature HMAC envoyée dans l’en-tête `PG-Signature`.
3. Exemple d’API Route :
```ts
// pages/api/paygreen/webhook.ts
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req:NextApiRequest,res:NextApiResponse){
  const event = req.body;
  if(event.type === 'payment_order.success'){
     // Mettre à jour la commande, envoyer email, etc.
  }
  res.status(204).end();
}
```


## 7. Remboursements et gestion après-vente

| Action | Endpoint PayGreen | Méthode | Remarque |
| :-- | :-- | :-- | :-- |
| Remboursement intégral | `/payins/transaction/{id}` | `DELETE` | Annule ou rembourse selon état[^6] |
| Remboursement partiel | `/payins/transaction/{id}` | `PATCH` | Passer `{ amount: 500 }` |
| Capture différée | `/payins/transaction/{id}` | `PUT` | Si `auto_capture:false` |

## 8. Mapping Stripe → PayGreen

| Stripe | PayGreen | Commentaire |
| :-- | :-- | :-- |
| PaymentIntent | Payment Order | Même logique: créer, suivre, capturer |
| SetupIntent | `instrument` + tokenisation API | Carte enregistrée (paiement one-click)[^3] |
| Webhook `payment_intent.succeeded` | Listener `payment_order.success` |  |
| Secret key `sk_live` | `sk_xxxx` PayGreen[^4] |  |
| Publishable key `pk_live` | `pk_xxxx` PayGreen | À exposer au front |

## 9. Codes de réponse HTTP

PayGreen suit la norme : `200`, `201`, `204` pour succès; erreurs : `400`, `401`, `403`, `404`, `422`, `500`[^7]. Les significations sont identiques aux définitions RFC 9110 ; par exemple `401 Unauthorized` = problème de clé d’API[^8].


| Code | Signification PayGreen | Action recommandée |
| :-- | :-- | :-- |
| 200 | OK, requête traitée | Continuer |
| 201 | Resource created | Stocker l’ID retourné |
| 204 | No Content | Traitement réussi sans body |
| 400 | Bad Request | Valider le payload |
| 401 | Unauthorized | Vérifier `Authorization`[^7] |
| 403 | Forbidden | Droits manquants |
| 422 | Unprocessable Entity | Erreur de validation |
| 500 | Internal Server Error | Retry exponentiel |

## 10. Stratégie de migration

### 10.1. Phase 0 : préparation

- Inventorier les tables reliant vos `payment_intent_id`.
- Prévoir champ `provider` (stripe/paygreen) pour co-exister.


### 10.2. Phase 1 : mode dual

1. Les nouveaux clients créent un Payment Order PayGreen **en Sandbox**.
2. Conserver Stripe en production pour l’existant.

### 10.3. Phase 2 : bascule progressive

- Activer PayGreen en production, segmenter par feature flag.
- Sur chaque paiement Stripe réussi, créer en parallèle un ordre PayGreen de 0€ pour tester webhooks.


### 10.4. Phase 3 : arrêt Stripe

- Clôturer les webhooks Stripe, transférer les abonnements s’il y a lieu.


## 11. Tests \& Sandbox

| Élément | URL Sandbox |
| :-- | :-- |
| API | `https://sb-api.paygreen.fr`[^3] |
| PayGreenJS | `https://sb-paygreen.fr/js/pg.min.js` |
| Cartes test | CB : `4970100000000154`, exp 12/30, CVV 123 |

## 12. Sécurité \& conformité

- **PCI-DSS :** Les champs hébergés PayGreenJS vous placent en SAQ-A, comme Stripe Elements.
- **3-D Secure 2** : géré nativement côté PayGreen, activé par défaut[^2].
- **JWT rotation** : renouvelez `sk_…` périodiquement via le back-office.
- **Idempotency** : utilisez un header `Idempotency-Key` pour les POST critiques.


## 13. Fonctionnalités avancées

### 13.1. Arrondi solidaire \& ClimateKit

Exposez l’option de micro-don lors du checkout pour renforcer l’engagement RSE[^9].

### 13.2. Paiement en un clic

1. Créer un *instrument* (empreinte carte).
2. Stocker `instrument_id` et réaliser les débits ultérieurs sans saisir la CB[^3].

### 13.3. Multi-boutiques

Si vous gérez plusieurs shops, PayGreen permet une hiérarchie *parent / child* (`sh_parent` → `sh_child`)[^6].

## 14. Surveillance \& scaling

- PayGreen a validé une montée en charge à 250 transactions/min avec GKE sur Google Cloud[^10].
- Mettez en place un monitoring Grafana sur les codes `5xx` des appels API.


## 15. Dépannage courant

| Symptôme | Cause probable | Solution |
| :-- | :-- | :-- |
| `401 Unauthorized` immédiat | Mauvaise clé ou format Bearer[^7] | Vérifier variable d’env. |
| `payment_order_id` introuvable après redirect | Order expiré (>30 min) | Recréer Order |
| Inputs PayGreenJS non montés dans React | `devMode` incohérent[^2] | Passer `devMode`=true en sandbox |
| Listener ne reçoit rien | URL invalide ou 502 sandbox[^3] | Regénérer listener, tester avec ngrok |

## 16. Roadmap post-migration

1. Activer Apple Pay / Google Pay dans le back-office.
2. Automatiser l’export comptable via l’API `/payout/transfer` pour rapprochement bancaire[^6].
3. Introduire la segmentation carbone (Tree algorithm) sur la page panier[^10].

## 17. Conclusion

En suivant ce guide, vous pouvez migrer de Stripe vers PayGreen sans rupture de service :

- Les Payment Orders remplacent les PaymentIntents et couvrent tous les modes (CB, titres-restaurant, etc.).
- PGJS-React fournit une expérience front fluide, conforme PCI-DSS et 3-DS2[^2].
- Les webhooks PayGreen et la gestion fine des codes HTTP facilitent un traitement back-office robuste[^7][^8].

PayGreen offre en outre des atouts différenciants (arrondi solidaire, calcul CO₂) qui alignent votre tunnel de paiement sur des valeurs de durabilité et d’impact social[^9][^10]. Une fois la migration finalisée, vous disposerez ainsi d’une plateforme de paiement modulaire, scalable et engagée.

<div style="text-align: center">⁂</div>

[^1]: https://developers.paygreen.fr/docs/api-key-concepts-authenfication

[^2]: https://stackoverflow.com/questions/74377107/how-to-create-order-in-admin-after-payment-is-completed

[^3]: https://github.com/orgs/PayGreen/discussions/categories/q-a

[^4]: https://help.clyosystems.com/hc/fr/articles/22337812053521-Paygreen-Paiement-par-ticket-restaurant-dématérialisé

[^5]: https://cloud.google.com/customers/paygreen

[^6]: https://packagist.org/packages/hraph/paygreen-api-php

[^7]: https://developers.sinch.com/docs/numbers/api-reference/error-codes/status-codes/

[^8]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status

[^9]: https://www.paygreen.io/foire-aux-questions

[^10]: https://developer.squareup.com/reference/square/orders-api/pay-order

[^11]: https://developers.paygreen.fr/docs/api-key-concepts-http-response-codes

[^12]: https://github.com/Hraph/PaygreenApiPHP

[^13]: https://wordpress.org/plugins/paygreen-payment-gateway/

[^14]: https://stackoverflow.com/questions/77019481/paygreen-integration-with-django

[^15]: https://www.paygreen.io/retail-kit

[^16]: https://www.paygreen.io

[^17]: https://www.francenum.gouv.fr/activateurs/paygreen

[^18]: https://integration.app/integrations/paygreen

[^19]: https://github.com/PayGreen

[^20]: https://www.cfnews.net/Annuaires-base-de-deals/Base-de-deals/Capital-Innovation-ACTIVITES-DE-PAYGREEN-vendredi-9-mars-2018

[^21]: https://www.innovorder.com/integrations/paygreen

[^22]: https://apitracker.io/a/paygreen-io

[^23]: https://www.codeur.com/migration-api

[^24]: https://help.swile.co/hc/fr/articles/22725950249490-Comment-activer-ou-désactiver-les-paiements-via-Paygreen

[^25]: https://developers.paygreen.fr/docs/how-to-use-paygreen

[^26]: https://github.com/PayGreen/paygreen-php

[^27]: https://docs.payu.in/docs/rest-api-format

[^28]: https://support.authorize.net/knowledgebase/Knowledgearticle/?code=000001111

[^29]: https://restfulapi.net/http-status-codes/

[^30]: https://plugintests.com/plugins/wporg/paygreen-payment-gateway/1.0.21

[^31]: https://docs.payone.com/integration/response-handling/json-responses

[^32]: https://docs.adyen.com/pt/development-resources/response-handling/

[^33]: https://developers.google.com/pay/api/web/reference/response-objects

[^34]: https://github.com/joho/7XX-rfc

[^35]: https://stackoverflow.com/questions/tagged/laravel_9?tab=active\&page=20

[^36]: https://developer.nuapay.com/np_httpreasons.html

[^37]: https://gist.github.com/ericewers/c2c6ed0aa0963d8a401680837ca8cc92

[^38]: https://developers.flipdish.com/reference/listpaygreenconfigurations-1

[^39]: https://docs.cpuc.ca.gov/PublishedDocs/Published/G000/M498/K964/498964652.PDF

[^40]: https://pay.weixin.qq.com/doc/global/v3/en/4012357121

[^41]: https://docs.adyen.com/api-explorer/Checkout/41/post/orders

[^42]: https://developer.payg.in/order-api.html

[^43]: https://support.greenpay.me/portal/en/kb/articles/tokenization-process-with

[^44]: https://payzen.io/content/payzen/en-EN/back-office/payment-order/tla1446562665611.pdf

[^45]: https://paiement.systempay.fr/doc/en-EN/rest/V4.0/api/payment_nfois_order_reference.html

[^46]: https://developers.payulatam.com/latam/en/docs/services/networktokenization.html

[^47]: https://github.com/PayGreen/pgjs-react

[^48]: https://developers.paygreen.fr/docs/payment-payment-orders

[^49]: https://developers.paygreen.fr/reference/get_get_payment_order

[^50]: https://docs.adyen.com/online-payments/tokenization/

[^51]: https://developers.paygreen.fr/reference/post_create_payment_order

