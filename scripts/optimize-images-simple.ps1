# Script simple pour optimiser les images
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "OPTIMISATION DES IMAGES" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan

# Installer sharp si necessaire
Write-Host "`nVerification de sharp..." -ForegroundColor Yellow
try {
    npm list sharp --depth=0 2>$null | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Installation de sharp..." -ForegroundColor Yellow
        npm install --save-dev sharp
    } else {
        Write-Host "Sharp est deja installe." -ForegroundColor Green
    }
} catch {
    Write-Host "Installation de sharp..." -ForegroundColor Yellow
    npm install --save-dev sharp
}

# Creer le script Node.js pour optimiser les images
$optimizeScript = @'
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');
const backupDir = path.join(imagesDir, 'backup');

// Creer le dossier de backup
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
}

// Fonction pour optimiser une image
async function optimizeImage(filePath) {
    const fileName = path.basename(filePath);
    const backupPath = path.join(backupDir, fileName);
    const ext = path.extname(fileName).toLowerCase();
    
    // Sauvegarder l'original
    fs.copyFileSync(filePath, backupPath);
    
    const originalSize = fs.statSync(filePath).size / 1024;
    
    try {
        if (ext === '.jpg' || ext === '.jpeg') {
            await sharp(filePath)
                .jpeg({ quality: 85, mozjpeg: true })
                .toFile(filePath + '.tmp');
        } else if (ext === '.png') {
            await sharp(filePath)
                .png({ quality: 90, compressionLevel: 9 })
                .toFile(filePath + '.tmp');
        } else {
            return null;
        }
        
        // Remplacer l'original
        fs.unlinkSync(filePath);
        fs.renameSync(filePath + '.tmp', filePath);
        
        const newSize = fs.statSync(filePath).size / 1024;
        const reduction = ((originalSize - newSize) / originalSize) * 100;
        
        return {
            name: fileName,
            originalSize: originalSize.toFixed(2),
            newSize: newSize.toFixed(2),
            reduction: reduction.toFixed(2)
        };
    } catch (error) {
        console.error(`Erreur avec ${fileName}:`, error.message);
        return null;
    }
}

// Optimiser toutes les images
async function optimizeAllImages() {
    const files = fs.readdirSync(imagesDir);
    const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png'].includes(ext);
    });
    
    console.log(`\nOptimisation de ${imageFiles.length} images...\n`);
    
    for (const file of imageFiles) {
        const filePath = path.join(imagesDir, file);
        const result = await optimizeImage(filePath);
        
        if (result) {
            console.log(`✓ ${result.name}: ${result.originalSize}KB → ${result.newSize}KB (-${result.reduction}%)`);
        }
    }
    
    console.log(`\n✅ Optimisation terminée!`);
    console.log(`Les images originales sont dans: ${backupDir}`);
}

optimizeAllImages().catch(console.error);
'@

# Sauvegarder le script Node.js
$optimizeScript | Out-File -FilePath "scripts/optimize-images.js" -Encoding UTF8

# Executer le script Node.js
Write-Host "`nExecution de l'optimisation..." -ForegroundColor Cyan
node scripts/optimize-images.js

# Nettoyer
Remove-Item -Path "scripts/optimize-images.js" -ErrorAction SilentlyContinue

Write-Host "`nTermine!" -ForegroundColor Green
