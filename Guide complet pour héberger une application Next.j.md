
# Guide complet pour héberger une application Next.js 14 sur cPanel

Voici un guide détaillé pour héberger votre application Next.js 14 sur cPanel, basé sur les ressources fournies. Ce processus peut sembler complexe au début, mais en suivant ces étapes méthodiquement, vous pourrez déployer votre application avec succès.

## Prérequis

Avant de commencer, assurez-vous d'avoir :

- **Accès à un compte cPanel** avec support Node.js
- **Une application Next.js fonctionnelle** sur votre environnement local
- **Connaissances de base** en terminal et gestion de fichiers


## Étape 1 : Configuration de Next.js pour la sortie standalone

La première étape cruciale consiste à configurer votre application Next.js pour produire une build **standalone**. Cette configuration est essentielle pour le déploiement sur des environnements comme cPanel[^1].

Dans votre fichier `next.config.js` ou `next.config.mjs`, ajoutez la configuration suivante :

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
```

Cette configuration définit la `output` sur `standalone`, permettant à Next.js de créer une build autonome. Le paramètre `images.remotePatterns` permet à Next.js de gérer les images distantes de manière sécurisée[^1].

**⚠️ Important :** Depuis Next.js version 14.2.14, il peut y avoir des problèmes de compatibilité avec la sortie `standalone` lors de l'utilisation de route groups. Testez soigneusement votre configuration si vous utilisez des route groups[^1].

## Étape 2 : Build de votre application

Une fois votre application configurée pour la sortie standalone, il est temps de construire le projet. Dans votre terminal, exécutez :

```bash
npm run build
```

Cette commande compile l'application dans le répertoire `.next`, créant une version prête pour la production[^1].

## Étape 3 : Localisation du répertoire `.next` et des fichiers

Après la completion de la build, vous trouverez un répertoire `.next` dans la racine de votre projet. Ce répertoire contient tous les assets et configurations nécessaires pour faire fonctionner votre application[^1].

À l'intérieur de `.next`, vous verrez plusieurs dossiers, notamment **standalone** et **static**, qui contiennent les fichiers essentiels pour le serveur[^1].

## Étape 4 : Rassembler les fichiers et dossiers nécessaires

Du répertoire `.next`, vous devrez rassembler des fichiers et répertoires spécifiques :

- Le dossier **standalone**, qui contient tous les fichiers serveur nécessaires
- Le dossier **static**, qui contient les assets publics

Ces deux dossiers sont essentiels pour que l'application Next.js standalone fonctionne correctement[^1].

## Étape 5 : Créer un dossier personnalisé pour le déploiement

Créez un dossier dédié pour stocker vos fichiers de build. Vous pouvez nommer ce dossier comme vous voulez, par exemple `build`[^1].

La structure du répertoire `build` devrait ressembler à ceci :

```
build/
├── (tous les éléments de /src/.next/standalone/ ou /app/.next/standalone/)
├── .next/
│   └── static/
└── public/ (optionnel)
```


## Étape 6 : Test local

Avant de déployer, testez votre build localement. Naviguez vers le dossier `build` et exécutez :

```bash
node server.js
```

Cela devrait lancer votre application Next.js sur `http://localhost:3000`[^1].

## Étape 7 : Upload et extraction du dossier build dans cPanel

1. **Naviguez vers le gestionnaire de fichiers de votre cPanel**
2. **Uploadez le dossier `build`** dans le répertoire désiré sur votre serveur cPanel
3. **Extrayez les fichiers** du dossier `build` de sorte que tous les contenus de `standalone` et `static` soient placés directement dans votre répertoire cible[^1]

## Étape 8 : Configuration de l'application Node.js dans cPanel

Dans cPanel, configurez une application Node.js pour exécuter votre serveur Next.js :

1. Allez dans **Setup Node.js App** dans cPanel
2. Choisissez la version Node.js appropriée et configurez l'environnement
3. Définissez l'**Application root** sur le répertoire où vous avez extrait les dossiers `standalone` et `static`
4. Définissez le **Startup file** sur `server.js`

Cela pointera l'environnement Node.js vers le fichier serveur généré par Next.js, lui permettant de servir votre application[^1].

## Vérification finale

Après avoir terminé toutes les étapes ci-dessus, vous devriez pouvoir naviguer vers votre domaine et voir votre application Next.js fonctionner en direct[^1].

## Points importants à retenir

- La configuration **standalone** est cruciale pour le déploiement sur cPanel
- Testez toujours votre build localement avant de déployer
- Assurez-vous que votre hébergeur cPanel supporte Node.js
- La structure des fichiers doit être respectée pour un fonctionnement correct

Ce processus peut être répliqué pour d'autres projets et applications, en faisant une méthode de déploiement polyvalente et précieuse[^1].


[^1]: https://hasanulhaquebanna.com/blog/host-nextjs-14-application-on-cpanel

[^2]: https://www.youtube.com/watch?v=wxj2l--W3cA

# Gestion des variables d'environnement dans la stratégie de déploiement Next.js standalone sur cPanel

La gestion des variables d'environnement dans un déploiement Next.js standalone sur cPanel présente des défis particuliers qu'il est crucial de comprendre pour assurer un déploiement réussi. Voici une analyse détaillée de cette problématique.

## Comprendre les types de variables d'environnement dans Next.js

### Variables Build-time vs Runtime

Next.js distingue fondamentalement deux types de variables d'environnement[1][2]:

**Variables Build-time** : Ces variables sont utilisées pendant l'exécution de `next build` et sont intégrées directement dans le code JavaScript lors de la compilation. Elles incluent :
- Les variables standard définies dans les fichiers `.env`
- Les variables préfixées `NEXT_PUBLIC_` qui sont exposées au navigateur
- Les variables définies via `env` dans `next.config.js`

**Variables Runtime** : Ces variables sont évaluées au moment de l'exécution du serveur (`next start` ou `node server.js`). Elles permettent d'utiliser la même build pour différents environnements[1].

## Problématiques spécifiques au déploiement standalone

### Limitations des variables NEXT_PUBLIC_

Les variables préfixées `NEXT_PUBLIC_` sont automatiquement intégrées dans le bundle JavaScript lors du build[2][3]. Cela signifie que :

```javascript
// Cette variable sera remplacée par sa valeur au moment du build
console.log(process.env.NEXT_PUBLIC_API_URL); // Devient 'https://api.example.com'
```

**Point crucial** : Une fois l'application buildée, ces variables ne peuvent plus être modifiées[2]. Elles sont "figées" avec la valeur présente au moment du build.

### Impact sur les déploiements standalone

Pour un déploiement standalone, cela pose un problème majeur[4][5] :
- La même build ne peut pas être utilisée pour plusieurs environnements
- Les variables d'environnement doivent être connues au moment du build
- Impossible de modifier la configuration après le déploiement

## Solutions pour la gestion des variables d'environnement

### 1. Variables serveur standard

Les variables d'environnement sans préfixe `NEXT_PUBLIC_` restent disponibles uniquement côté serveur et peuvent être modifiées au runtime[2][3]:

```javascript
// Dans une API route ou un composant serveur
export async function GET() {
  const dbUrl = process.env.DATABASE_URL; // Évalué au runtime
  // ...
}
```

### 2. Configuration dans next.config.js

Pour les variables qui doivent être accessibles au build et au runtime, vous pouvez utiliser la configuration `env` dans `next.config.js`[6][7]:

```javascript
// next.config.js
module.exports = {
  env: {
    API_URL: process.env.API_URL,
    DATABASE_URL: process.env.DATABASE_URL,
  },
};
```

**Important** : Les variables définies ainsi sont toujours intégrées au bundle JavaScript, même sans le préfixe `NEXT_PUBLIC_`.

### 3. Runtime Configuration (déprécié)

Bien que déprécié, `serverRuntimeConfig` et `publicRuntimeConfig` permettent une gestion runtime[8][9]:

```javascript
// next.config.js
module.exports = {
  serverRuntimeConfig: {
    // Disponible uniquement côté serveur
    mySecret: process.env.MY_SECRET,
  },
  publicRuntimeConfig: {
    // Disponible côté client et serveur
    apiUrl: process.env.API_URL,
  },
};
```

**Limitation importante** : Cette approche ne fonctionne pas avec l'output `standalone`[8][2].

## Configuration spécifique pour cPanel

### Définition des variables d'environnement

Dans cPanel, les variables d'environnement peuvent être définies via l'interface "Environment Variables" de l'application Node.js[10][11]:

1. **Accès via cPanel** : Setup Node.js App → Environment Variables
2. **Format** : `VARIABLE_NAME=value`
3. **Redémarrage requis** : Après modification des variables

### Problèmes courants sur cPanel

De nombreux développeurs rencontrent des problèmes avec les variables d'environnement sur cPanel[7][12]:

```javascript
// Problème : Variables non accessibles en production
console.log(process.env.MY_VARIABLE); // undefined
```

**Solution** : Configurer explicitement les variables dans `next.config.js`[7]:

```javascript
require('dotenv').config();

module.exports = {
  env: {
    EMAIL_NAME: process.env.EMAIL_NAME,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    API_KEY: process.env.API_KEY,
  },
};
```

## Stratégies recommandées

### 1. Séparation des variables

**Variables serveur uniquement** :
```bash
# .env.local
DATABASE_URL=postgresql://...
API_SECRET=secret123
```

**Variables client** :
```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_APP_NAME=MyApp
```

### 2. Configuration pour standalone

Pour un déploiement standalone optimal[13][14]:

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    // Variables nécessaires au runtime
    API_URL: process.env.API_URL,
  },
};

export default nextConfig;
```

### 3. Utilisation des variables runtime

Pour les variables qui doivent changer selon l'environnement, utilisez des packages comme `next-runtime-env`[15][16]:

```bash
npm install next-runtime-env
```

```javascript
// next.config.js
const { configureRuntimeEnv } = require('next-runtime-env/build/configure');

configureRuntimeEnv();

module.exports = {
  output: "standalone",
};
```

## Bonnes pratiques de sécurité

### 1. Protection des secrets

- **Ne jamais** utiliser `NEXT_PUBLIC_` pour des secrets[2][3]
- **Utiliser** des variables serveur uniquement pour les clés API
- **Valider** les variables d'environnement au démarrage[17]:

```javascript
// config.js
const getEnvVar = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};

export const config = {
  apiKey: getEnvVar('API_KEY'),
  dbUrl: getEnvVar('DATABASE_URL'),
};
```

### 2. Gestion des fichiers .env

- **Ajouter** tous les fichiers `.env*` au `.gitignore`
- **Utiliser** `.env.local` pour les secrets de développement
- **Documenter** les variables requises dans un fichier `.env.example`

## Ordre de priorité des variables

Next.js suit un ordre de priorité spécifique pour les variables d'environnement[2][3]:

1. `process.env`
2. `.env.$(NODE_ENV).local`
3. `.env.local` (sauf en mode test)
4. `.env.$(NODE_ENV)`
5. `.env`

## Conclusion

La gestion des variables d'environnement dans un déploiement Next.js standalone sur cPanel nécessite une approche réfléchie qui tient compte des limitations et des spécificités de cette configuration. La clé du succès réside dans la compréhension des différents types de variables, leur moment d'évaluation, et l'utilisation appropriée des mécanismes de configuration disponibles.

Pour un déploiement réussi, il est recommandé de séparer clairement les variables build-time et runtime, d'utiliser la configuration `env` dans `next.config.js` pour les variables critiques, et de bien configurer l'interface cPanel pour les variables d'environnement spécifiques au déploiement.

