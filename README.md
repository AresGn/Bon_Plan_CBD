# Bon Plan CBD - Site E-commerce

Site e-commerce pour la boutique Bon Plan CBD à Rouen, spécialisée dans la vente de produits CBD de qualité.

## 🚀 Fonctionnalités

- **Catalogue produits** : Fleurs, huiles, résines, infusions CBD
- **Fiches produits détaillées** : Taux CBD/THC, analyses laboratoire, avis clients
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
- `STRIPE_SECRET_KEY` : Clé Stripe production

## 🔒 Sécurité

- Authentification sécurisée avec NextAuth
- Paiements via Stripe (PCI compliant)
- Protection CSRF
- Validation des données côté serveur
- HTTPS obligatoire en production

## 📞 Support

Pour toute question : contact@bonplancbd.fr

## 📄 Licence

© 2024 Bon Plan CBD. Tous droits réservés.
