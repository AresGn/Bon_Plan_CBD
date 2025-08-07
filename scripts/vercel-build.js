#!/usr/bin/env node

/**
 * Script de build pour Vercel
 * S'assure que les images sont correctement disponibles
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification des assets pour Vercel...');

// Vérifier que le logo existe
const logoPath = path.join(process.cwd(), 'public', 'images', 'logo.jpg');
if (fs.existsSync(logoPath)) {
  console.log('✅ Logo trouvé:', logoPath);
  
  // Vérifier la taille du fichier
  const stats = fs.statSync(logoPath);
  console.log('📊 Taille du logo:', Math.round(stats.size / 1024), 'KB');
} else {
  console.error('❌ Logo non trouvé:', logoPath);
  process.exit(1);
}

// Lister tous les fichiers dans public/images
const imagesDir = path.join(process.cwd(), 'public', 'images');
if (fs.existsSync(imagesDir)) {
  const files = fs.readdirSync(imagesDir);
  console.log('📁 Fichiers dans public/images:');
  files.forEach(file => {
    console.log('  -', file);
  });
} else {
  console.error('❌ Dossier public/images non trouvé');
  process.exit(1);
}

console.log('✅ Vérification terminée avec succès');
