# Migration Stripe vers PayGreen - Guide de mise en œuvre

## ✅ Étapes réalisées

### 1. Installation des dépendances
- ✅ Installation de `@paygreen/pgjs-react`
- ✅ Configuration des variables d'environnement PayGreen

### 2. Configuration serveur
- ✅ Création du client PayGreen (`src/lib/paygreen.ts`)
- ✅ API Routes PayGreen :
  - `/api/paygreen/create-order` - Création des Payment Orders
  - `/api/paygreen/webhook` - Gestion des webhooks
  - `/api/paygreen/refund` - Gestion des remboursements

### 3. Intégration front-end
- ✅ Provider PayGreen dans `layout.tsx`
- ✅ Composant `PayGreenForm` pour les paiements
- ✅ Pages de retour (success, cancel, error)
- ✅ Mise à jour de la page checkout

### 4. Base de données
- ✅ Ajout des champs PayGreen dans le schéma Prisma
- ✅ Script de migration SQL
- ✅ API pour récupérer les commandes par payment ID

## 🔧 Configuration requise

### Variables d'environnement à ajouter dans `.env.local` :

```bash
# PayGreen Configuration
PAYGREEN_SHOP_ID="sh_xxxxx"
PAYGREEN_SECRET_KEY="sk_xxxxx"
PAYGREEN_PUBLIC_KEY="pk_xxxxx"
PAYGREEN_ENV="sandbox"
NEXT_PUBLIC_PAYGREEN_PUBLIC_KEY="pk_xxxxx"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### Migration de la base de données

Exécuter la migration Prisma :
```bash
npx prisma migrate dev --name add_paygreen_fields
```

Ou exécuter manuellement le script SQL :
```bash
psql -d your_database < prisma/migrations/add_paygreen_fields/migration.sql
```

## 🧪 Tests en mode Sandbox

### Cartes de test PayGreen :
- **Visa** : `4970100000000154`
- **Expiration** : `12/30`
- **CVV** : `123`

### URLs de test :
- **API Sandbox** : `https://sb-api.paygreen.fr`
- **PayGreenJS Sandbox** : `https://sb-paygreen.fr/js/pg.min.js`

## 🚀 Mise en production

### 1. Configuration des webhooks PayGreen
Dans le back-office PayGreen, configurer le webhook :
- **URL** : `https://votre-domaine.com/api/paygreen/webhook`
- **Événements** : `payment_order.success`, `payment_order.failed`, `payment_order.cancelled`

### 2. Variables d'environnement production
```bash
PAYGREEN_ENV="production"
PAYGREEN_SHOP_ID="sh_prod_xxxxx"
PAYGREEN_SECRET_KEY="sk_prod_xxxxx"
PAYGREEN_PUBLIC_KEY="pk_prod_xxxxx"
NEXT_PUBLIC_PAYGREEN_PUBLIC_KEY="pk_prod_xxxxx"
NEXT_PUBLIC_SITE_URL="https://votre-domaine.com"
```

### 3. Mise à jour des déploiements
- Mettre à jour les variables d'environnement sur Vercel/votre plateforme
- Redéployer l'application
- Tester les paiements en production

## 🔄 Migration progressive

### Phase 1 : Mode dual (recommandé)
1. Garder Stripe actif pour les commandes existantes
2. Activer PayGreen pour les nouvelles commandes
3. Utiliser le champ `paymentProvider` pour différencier

### Phase 2 : Bascule complète
1. Désactiver Stripe pour les nouvelles commandes
2. Migrer progressivement les anciens clients
3. Supprimer le code Stripe après validation complète

## 🛠️ Fonctionnalités disponibles

### Paiements
- ✅ Paiement par carte bancaire
- ✅ 3D Secure 2 automatique
- ✅ Gestion des erreurs et annulations
- ✅ Webhooks pour confirmation serveur

### Administration
- ✅ Remboursements intégraux et partiels
- ✅ Suivi des statuts de paiement
- ✅ Logs des transactions

### Sécurité
- ✅ Conformité PCI-DSS (SAQ-A)
- ✅ Champs de paiement hébergés
- ✅ Vérification des signatures webhook

## 📞 Support

En cas de problème :
1. Vérifier les logs serveur
2. Consulter la documentation PayGreen
3. Contacter le support PayGreen si nécessaire

## 🔍 Points de vérification

Avant la mise en production, vérifier :
- [ ] Les webhooks sont configurés et fonctionnels
- [ ] Les variables d'environnement sont correctes
- [ ] Les tests de paiement passent en sandbox
- [ ] Les remboursements fonctionnent
- [ ] Les emails de confirmation sont envoyés
- [ ] La base de données est migrée
