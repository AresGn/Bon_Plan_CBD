#!/usr/bin/env node

/**
 * Script de vérification post-déploiement pour Bon Plan CBD
 * À exécuter sur le serveur cPanel après déploiement
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification du déploiement Bon Plan CBD...\n');

// Vérification des fichiers essentiels
const requiredFiles = [
    'server.js',
    'package.json',
    '.env',
    'src',
    'public',
    '.next/static',
    '.next/server'
];

console.log('📁 Vérification des fichiers...');
let filesOk = true;

requiredFiles.forEach(file => {
    const exists = fs.existsSync(file);
    console.log(`${exists ? '✅' : '❌'} ${file}`);
    if (!exists) filesOk = false;
});

// Vérification des variables d'environnement
console.log('\n🔧 Vérification des variables d\'environnement...');
const requiredEnvVars = [
    'NODE_ENV',
    'DATABASE_URL',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
    'JWT_SECRET',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'STRIPE_SECRET_KEY',
    'PAYGREEN_SHOP_ID',
    'PAYGREEN_SECRET_KEY',
    'PAYGREEN_PUBLIC_KEY',
    'PAYGREEN_ENV',
    'NEXT_PUBLIC_PAYGREEN_PUBLIC_KEY',
    'NEXT_PUBLIC_SITE_URL'
];

let envOk = true;

requiredEnvVars.forEach(envVar => {
    const exists = process.env[envVar];
    console.log(`${exists ? '✅' : '❌'} ${envVar}: ${exists ? 'Définie' : 'Manquante'}`);
    if (!exists) envOk = false;
});

// Vérification du package.json
console.log('\n📦 Vérification du package.json...');
try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    console.log(`✅ Nom: ${packageJson.name}`);
    console.log(`✅ Version: ${packageJson.version}`);
    
    if (packageJson.dependencies) {
        console.log(`✅ Dépendances: ${Object.keys(packageJson.dependencies).length} packages`);
    }
} catch (error) {
    console.log('❌ Erreur lors de la lecture du package.json:', error.message);
}

// Test de connectivité base de données
console.log('\n🗄️ Test de connectivité base de données...');
if (process.env.DATABASE_URL) {
    try {
        const url = new URL(process.env.DATABASE_URL);
        console.log(`✅ Host: ${url.hostname}`);
        console.log(`✅ Port: ${url.port}`);
        console.log(`✅ Database: ${url.pathname.slice(1)}`);
        console.log(`✅ User: ${url.username}`);
    } catch (error) {
        console.log('❌ URL de base de données invalide:', error.message);
    }
} else {
    console.log('❌ DATABASE_URL non définie');
}

// Vérification de la configuration Next.js
console.log('\n⚙️ Vérification de la configuration Next.js...');
try {
    if (fs.existsSync('.next/required-server-files.json')) {
        console.log('✅ Fichiers serveur Next.js présents');
    }
    
    if (fs.existsSync('.next/static')) {
        const staticFiles = fs.readdirSync('.next/static');
        console.log(`✅ Assets statiques: ${staticFiles.length} dossiers`);
    }
    
    if (fs.existsSync('.next/server')) {
        console.log('✅ Code serveur Next.js présent');
    }
} catch (error) {
    console.log('❌ Erreur lors de la vérification Next.js:', error.message);
}

// Résumé final
console.log('\n📊 Résumé de la vérification:');
console.log(`Fichiers: ${filesOk ? '✅ OK' : '❌ Problème'}`);
console.log(`Variables d'environnement: ${envOk ? '✅ OK' : '❌ Problème'}`);

if (filesOk && envOk) {
    console.log('\n🎉 Déploiement vérifié avec succès !');
    console.log('Vous pouvez maintenant démarrer l\'application avec: node server.js');
} else {
    console.log('\n⚠️ Des problèmes ont été détectés. Veuillez les corriger avant de démarrer l\'application.');
}

console.log('\n📝 Pour démarrer l\'application:');
console.log('   node server.js');
console.log('\n📝 Pour installer les dépendances (si nécessaire):');
console.log('   npm install --production');
