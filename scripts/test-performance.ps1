# Script pour tester les performances avec Lighthouse
Write-Host "🚀 Test de performance avec Lighthouse" -ForegroundColor Green

# Vérifier si lighthouse est installé
if (-not (Get-Command lighthouse -ErrorAction SilentlyContinue)) {
    Write-Host "Installation de Lighthouse..." -ForegroundColor Yellow
    npm install -g lighthouse
}

# Créer le dossier pour les rapports
$reportsDir = "performance-reports"
if (-not (Test-Path $reportsDir)) {
    New-Item -ItemType Directory -Path $reportsDir | Out-Null
}

# Date pour le nom du fichier
$date = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"

# URLs à tester
$urls = @(
    "http://localhost:3000",
    "http://localhost:3000/produits",
    "http://localhost:3000/promotions"
)

Write-Host "`nDémarrage du serveur de développement..." -ForegroundColor Cyan
$npm = Start-Process npm -ArgumentList "run dev" -PassThru -WindowStyle Hidden

# Attendre que le serveur démarre
Write-Host "Attente du démarrage du serveur (15 secondes)..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

foreach ($url in $urls) {
    $pageName = if ($url -eq "http://localhost:3000") { "home" } else { $url.Split("/")[-1] }
    $outputFile = "$reportsDir/lighthouse-$pageName-$date"
    
    Write-Host "`nTest de $url..." -ForegroundColor Cyan
    
    # Exécuter Lighthouse
    & lighthouse $url `
        --output=html `
        --output=json `
        --output-path=$outputFile `
        --chrome-flags="--headless" `
        --only-categories=performance,accessibility,best-practices,seo `
        --throttling-method=simulate `
        --preset=desktop
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Rapport généré: $outputFile.html" -ForegroundColor Green
        
        # Lire et afficher le score de performance
        $jsonContent = Get-Content "$outputFile.report.json" | ConvertFrom-Json
        $perfScore = [math]::Round($jsonContent.categories.performance.score * 100)
        $accessScore = [math]::Round($jsonContent.categories.accessibility.score * 100)
        $bestScore = [math]::Round($jsonContent.categories.'best-practices'.score * 100)
        $seoScore = [math]::Round($jsonContent.categories.seo.score * 100)
        
        Write-Host "Scores pour $pageName :" -ForegroundColor Cyan
        Write-Host "  Performance: $perfScore/100" -ForegroundColor $(if ($perfScore -ge 90) { "Green" } elseif ($perfScore -ge 50) { "Yellow" } else { "Red" })
        Write-Host "  Accessibilité: $accessScore/100" -ForegroundColor $(if ($accessScore -ge 90) { "Green" } elseif ($accessScore -ge 50) { "Yellow" } else { "Red" })
        Write-Host "  Bonnes pratiques: $bestScore/100" -ForegroundColor $(if ($bestScore -ge 90) { "Green" } elseif ($bestScore -ge 50) { "Yellow" } else { "Red" })
        Write-Host "  SEO: $seoScore/100" -ForegroundColor $(if ($seoScore -ge 90) { "Green" } elseif ($seoScore -ge 50) { "Yellow" } else { "Red" })
        
        # Métriques détaillées
        $lcp = $jsonContent.audits.'largest-contentful-paint'.displayValue
        $fid = $jsonContent.audits.'max-potential-fid'.displayValue
        $cls = $jsonContent.audits.'cumulative-layout-shift'.displayValue
        $fcp = $jsonContent.audits.'first-contentful-paint'.displayValue
        $tti = $jsonContent.audits.'interactive'.displayValue
        
        Write-Host "`nMétriques Web Vitals:" -ForegroundColor Cyan
        Write-Host "  LCP (Largest Contentful Paint): $lcp"
        Write-Host "  FID (First Input Delay): $fid"
        Write-Host "  CLS (Cumulative Layout Shift): $cls"
        Write-Host "  FCP (First Contentful Paint): $fcp"
        Write-Host "  TTI (Time to Interactive): $tti"
    }
}

# Arrêter le serveur
Write-Host "`nArrêt du serveur..." -ForegroundColor Yellow
Stop-Process -Id $npm.Id -Force -ErrorAction SilentlyContinue

Write-Host "`n✅ Tests terminés! Les rapports sont dans le dossier '$reportsDir'" -ForegroundColor Green
Write-Host "Ouvrez les fichiers .html pour voir les rapports détaillés." -ForegroundColor Yellow
