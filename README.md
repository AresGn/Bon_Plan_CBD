# Bon Plan CBD - Site E-commerce

Site e-commerce pour la boutique Bon Plan CBD à Rouen, spécialisée dans la vente de produits CBD de qualité.

## 🚀 Fonctionnalités

- **Catalogue produits** : Fleurs, huiles, résines, infusions CBD
- **Fiches produits détaillées** : Taux CBD/THC, avis clients
- **Panier & Commande** : Gestion du panier, checkout sécurisé
- **Compte client** : Inscription, connexion, historique commandes
- **Paiement sécurisé** : Intégration Stripe (compatible CBD)
- **Admin** : Gestion des produits, commandes, clients
- **Responsive** : Optimisé mobile, tablette et desktop

## 🛠️ Technologies

- **Frontend** : Next.js 14, React 18, TypeScript
- **Styling** : Tailwind CSS, Headless UI
- **Base de données** : PostgreSQL, Prisma ORM
- **Authentification** : NextAuth.js
- **Paiement** : Stripe
- **State Management** : Zustand
- **Animations** : Framer Motion

## 📦 Installation

1. Cloner le repository
```bash
git clone https://github.com/votre-username/bon-plan-cbd.git
cd bon-plan-cbd
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer les variables d'environnement
```bash
cp .env.local.example .env.local
# Éditer .env.local avec vos propres valeurs
```

4. Configurer la base de données
```bash
npx prisma migrate dev
npx prisma generate
```

5. Lancer le serveur de développement
```bash
npm run dev
```

## 📋 GUIDE DE CRÉATION DE PRODUITS

### Étapes pour créer un produit dans l'interface admin :

1. **Connexion admin** : Allez sur `/admin` et connectez-vous
2. **Actualisez la page** de création de produit (F5)
3. **Vérifiez le sélecteur de catégorie** - vous devriez voir toutes les catégories disponibles :
   - Fleurs CBD
   - Huiles CBD
   - Résines CBD
   - E-liquides CBD
   - Cosmétiques CBD
   - Infusions CBD
   - Cristaux CBD
   - Accessoires

4. **Remplissez tous les champs obligatoires** :
   - ✅ **Nom** : Nom du produit (ex: "Ares")
   - ✅ **Catégorie** : Choisissez la catégorie appropriée (ex: "Fleurs CBD")
   - ✅ **Prix** : Prix en euros (ex: 17.02)
   - ✅ **Stock** : Quantité disponible (ex: 50)
   - ✅ **Taux CBD** : Pourcentage de CBD (ex: 15.5)
   - ✅ **Taux THC** : Pourcentage de THC (**MAXIMUM 0.3%** - limite légale UE)
   - ✅ **Description** : Description du produit
   - ✅ **Image** : Au moins une image du produit

5. **Soumettez le formulaire**

### ⚠️ **IMPORTANT - Limite légale THC** :
Le taux de THC ne doit **JAMAIS dépasser 0.3%** en France et dans l'UE. L'interface bloquera automatiquement les valeurs supérieures. Utilisez des valeurs comme :
- 0.1%
- 0.2%
- 0.3% (maximum légal)

### 🌿 **Catégories disponibles** :
- **Fleurs CBD** : Fleurs premium cultivées avec soin
- **Huiles CBD** : Extraites par CO2 supercritique
- **Résines CBD** : Hash artisanal riche en terpènes
- **E-liquides CBD** : Pour cigarettes électroniques
- **Cosmétiques CBD** : Crèmes et baumes
- **Infusions CBD** : Tisanes et thés
- **Cristaux CBD** : CBD pur à 99%
- **Accessoires** : Vaporisateurs, grinders

## 🗂️ Structure du projet

```
bon-plan-cbd/
├── src/
│   ├── app/              # Pages et routes Next.js
│   ├── components/       # Composants React réutilisables
│   │   ├── layout/      # Header, Footer
│   │   ├── home/        # Composants page accueil
│   │   └── ui/          # Composants UI génériques
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilitaires et configurations
│   ├── styles/          # Styles globaux CSS
│   └── types/           # Types TypeScript
├── prisma/              # Schema et migrations base de données
├── public/              # Assets statiques
└── package.json
```

## 🎨 Design System

### Couleurs
- **Primary** : Vert nature (#22c55e)
- **Secondary** : Jaune chaleureux (#eab308)
- **Neutral** : Nuances de gris

### Typographie
- **Headings** : Poppins
- **Body** : Inter

## 📝 Déploiement

### Vercel (recommandé)
```bash
# Installation Vercel CLI
npm i -g vercel

# Déploiement
vercel
```

### Variables d'environnement production
- `DATABASE_URL` : URL PostgreSQL production
- `NEXTAUTH_URL` : URL du site en production
- `PAYGREEN_SECRET_KEY` : Clé PayGreen production
- `PAYGREEN_PUBLIC_KEY` : Clé publique PayGreen production

## 🔒 Sécurité

- Authentification sécurisée avec NextAuth
- Paiements via PayGreen (PCI compliant, 3D Secure 2)
- Protection CSRF
- Validation des données côté serveur
- HTTPS obligatoire en production

## 📞 Support

Pour toute question : contact@bonplancbd.fr

## 📄 Licence

© 2024 Bon Plan CBD. Tous droits réservés.
