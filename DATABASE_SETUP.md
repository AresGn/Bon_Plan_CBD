# Configuration de la Base de Données - Bon Plan CBD

## 🚀 Guide de Configuration Rapide

### 1. Prérequis

- Node.js 18+ installé
- PostgreSQL 14+ installé et en cours d'exécution
- npm ou yarn

### 2. Installation des dépendances

```bash
npm install
```

### 3. Configuration de PostgreSQL

#### Option A : Installation locale

1. Installez PostgreSQL depuis [postgresql.org](https://www.postgresql.org/download/)
2. Créez une base de données :

```sql
CREATE DATABASE bonplancbd;
```

#### Option B : Utiliser Docker

```bash
docker run --name bonplancbd-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=bonplancbd -p 5432:5432 -d postgres:14
```

### 4. Configuration de l'environnement

1. Copiez le fichier `.env.example` vers `.env` :

```bash
cp .env.example .env
```

2. Modifiez la variable `DATABASE_URL` dans `.env` :

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/bonplancbd?schema=public"
```

Remplacez `USERNAME` et `PASSWORD` par vos identifiants PostgreSQL.

### 5. Initialisation de la base de données

1. Générez le client Prisma :

```bash
npx prisma generate
```

2. Appliquez les migrations :

```bash
npx prisma migrate dev --name init
```

3. (Optionnel) Ajoutez des données de test :

```bash
npx prisma db seed
```

### 6. Configuration de NextAuth

1. Générez une clé secrète pour NextAuth :

```bash
openssl rand -base64 32
```

2. Ajoutez cette clé dans votre `.env` :

```env
NEXTAUTH_SECRET="votre-clé-générée"
NEXTAUTH_URL="http://localhost:3000"
```

### 7. Création d'un compte administrateur

1. Démarrez l'application :

```bash
npm run dev
```

2. Créez un compte utilisateur normal via l'interface

3. Mettez à jour le rôle en administrateur via Prisma Studio :

```bash
npx prisma studio
```

Naviguez vers la table `User` et changez le `role` de `USER` à `ADMIN`.

## 🔧 Commandes Utiles

### Prisma

- **Visualiser la base de données** : `npx prisma studio`
- **Générer une migration** : `npx prisma migrate dev --name nom_migration`
- **Réinitialiser la base** : `npx prisma migrate reset`
- **Mettre à jour le schéma** : `npx prisma db push`

### Développement

- **Démarrer en dev** : `npm run dev`
- **Build production** : `npm run build`
- **Démarrer en production** : `npm start`

## 📊 Structure de la Base de Données

### Tables principales

1. **User** : Utilisateurs (clients et admins)
2. **Product** : Produits CBD
3. **Category** : Catégories de produits
4. **Order** : Commandes
5. **OrderItem** : Lignes de commande
6. **Review** : Avis clients
7. **Address** : Adresses de livraison
8. **Favorite** : Produits favoris

### Relations importantes

- Un produit appartient à une catégorie
- Une commande peut avoir plusieurs articles
- Un utilisateur peut avoir plusieurs commandes, avis et adresses
- Les avis sont uniques par couple utilisateur/produit

## 🔐 Sécurité

1. **Mots de passe** : Hachés avec bcrypt
2. **Sessions** : Gérées par NextAuth avec JWT
3. **API Routes** : Protégées par vérification de session
4. **Admin** : Routes admin nécessitent le rôle ADMIN

## 🚨 Dépannage

### Erreur de connexion à la base

1. Vérifiez que PostgreSQL est en cours d'exécution
2. Vérifiez les identifiants dans DATABASE_URL
3. Testez la connexion : `npx prisma db pull`

### Erreur de migration

1. Réinitialisez : `npx prisma migrate reset`
2. Vérifiez le schéma : `npx prisma validate`

### Problèmes de types TypeScript

1. Régénérez : `npx prisma generate`
2. Redémarrez le serveur TypeScript dans VSCode

## 📈 Monitoring

Pour surveiller votre base de données en production :

1. Utilisez les logs PostgreSQL
2. Configurez des alertes sur la taille de la base
3. Surveillez les performances des requêtes avec `EXPLAIN ANALYZE`

## 🌐 Déploiement

### Vercel + Supabase (Recommandé)

1. Créez un projet sur [Supabase](https://supabase.com)
2. Récupérez l'URL de connexion
3. Ajoutez-la dans les variables d'environnement Vercel

### Railway / Render

1. Créez une base PostgreSQL
2. Utilisez l'URL fournie
3. Exécutez les migrations via GitHub Actions

## 📞 Support

Si vous rencontrez des problèmes :

1. Consultez les logs : `npm run dev`
2. Vérifiez Prisma Studio : `npx prisma studio`
3. Consultez la documentation Prisma : [prisma.io/docs](https://www.prisma.io/docs)

---

## 🚀 Connexion automatique à Supabase

### Script pour générer le fichier `.env.local` avec la bonne URL

Crée un fichier `setup_supabase_env.sh` à la racine du projet avec ce contenu :

```bash
#!/bin/bash


Puis rends-le exécutable et lance-le :

```bash
chmod +x setup_supabase_env.sh
./setup_supabase_env.sh
```

---

Tu peux ensuite lancer les migrations Prisma normalement :

```bash
npx prisma generate
npx prisma migrate deploy
```

---

**Ce script écrase l'ancien .env.local ! Ajoute les autres variables d'environnement si besoin (NextAuth, Stripe, etc).**
