#!/bin/bash

set -e

echo "=== [1/6] Vérification des prérequis ==="
command -v node >/dev/null 2>&1 || { echo "Node.js n'est pas installé. Abandon."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "npm n'est pas installé. Abandon."; exit 1; }
command -v vercel >/dev/null 2>&1 || { echo "Vercel CLI n'est pas installé. Installation..."; npm i -g vercel; }

echo "=== [2/6] Vérification des fichiers d'environnement ==="
if [ ! -f .env.local ]; then
  if [ -f .env.local.example ]; then
    cp .env.local.example .env.local
    echo "Fichier .env.local créé à partir de .env.local.example"
  else
    echo "Fichier .env.local manquant et pas de .env.local.example. Abandon."
    exit 1
  fi
fi

echo "=== [3/6] Installation des dépendances ==="
npm install

echo "=== [4/6] Génération du client Prisma et migrations ==="
npx prisma generate
npx prisma migrate deploy

echo "=== [5/6] Build de l'application ==="
npm run build

echo "=== [6/6] Déploiement sur Vercel ==="
vercel --prod --confirm

echo "=== Déploiement terminé avec succès ! ==="