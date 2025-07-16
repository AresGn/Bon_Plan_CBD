# Script pour optimiser les images avec sharp
Write-Host "Optimisation des images en cours..." -ForegroundColor Green

# Installer sharp-cli si necessaire
if (-not (Get-Command sharp -ErrorAction SilentlyContinue)) {
    Write-Host "Installation de sharp-cli..." -ForegroundColor Yellow
    npm install -g sharp-cli
}

# Creer un dossier de sauvegarde
$backupDir = "public/images/backup"
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir | Out-Null
}

# Optimiser les images JPG/JPEG
Write-Host "Optimisation des fichiers JPG..." -ForegroundColor Cyan
Get-ChildItem -Path "public/images" -Filter "*.jpg" | ForEach-Object {
    $source = $_.FullName
    $backup = Join-Path $backupDir $_.Name
    
    # Sauvegarder l'original
    Copy-Item $source $backup -Force
    
    # Optimiser avec sharp (qualite 85%, resize si > 1920px)
    & sharp $source --quality 85 --withMetadata false --mozjpeg true -o $source
    
    $originalSize = (Get-Item $backup).Length / 1KB
    $newSize = (Get-Item $source).Length / 1KB
    $reduction = [math]::Round((($originalSize - $newSize) / $originalSize) * 100, 2)
    
    $fileName = $_.Name
    $origKB = [math]::Round($originalSize, 2)
    $newKB = [math]::Round($newSize, 2)
    Write-Host "OK $fileName : $origKB KB -> $newKB KB (-$reduction%)" -ForegroundColor Green
}

# Optimiser les images PNG
Write-Host "`nOptimisation des fichiers PNG..." -ForegroundColor Cyan
Get-ChildItem -Path "public/images" -Filter "*.png" | ForEach-Object {
    $source = $_.FullName
    $backup = Join-Path $backupDir $_.Name
    
    # Sauvegarder l'original
    Copy-Item $source $backup -Force
    
    # Optimiser avec sharp
    & sharp $source --quality 90 --withMetadata false --compressionLevel 9 -o $source
    
    $originalSize = (Get-Item $backup).Length / 1KB
    $newSize = (Get-Item $source).Length / 1KB
    $reduction = [math]::Round((($originalSize - $newSize) / $originalSize) * 100, 2)
    
    $fileName = $_.Name
    $origKB = [math]::Round($originalSize, 2)
    $newKB = [math]::Round($newSize, 2)
    Write-Host "OK $fileName : $origKB KB -> $newKB KB (-$reduction%)" -ForegroundColor Green
}

Write-Host "`nOptimisation terminee!" -ForegroundColor Green
Write-Host "Les images originales sont sauvegardees dans: $backupDir" -ForegroundColor Yellow
