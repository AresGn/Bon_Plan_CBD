const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

// Charger les variables d'environnement
require('dotenv').config();

// Configuration
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

// Vérification des variables d'environnement critiques
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'JWT_SECRET'
];

console.log('🔍 Vérification des variables d\'environnement...');
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Variables d\'environnement manquantes:', missingVars);
  console.error('Veuillez vérifier votre fichier .env');
} else {
  console.log('✅ Toutes les variables d\'environnement sont présentes');
}

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            // Gestion des headers de sécurité
            res.setHeader('X-Powered-By', 'Bon Plan CBD');

            const parsedUrl = parse(req.url, true)
            const { pathname, query } = parsedUrl

            // Gestion des routes spécifiques si nécessaire
            if (pathname === '/api/health') {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ status: 'OK', timestamp: new Date().toISOString() }))
            } else {
                await handle(req, res, parsedUrl)
            }
        } catch (err) {
            console.error('❌ Erreur lors du traitement de la requête:', req.url, err)
            res.statusCode = 500
            res.end('Erreur interne du serveur')
        }
    })
        .once('error', (err) => {
            console.error('❌ Erreur serveur:', err)
            process.exit(1)
        })
        .listen(port, () => {
            console.log(`✅ Serveur prêt sur http://${hostname}:${port}`)
            console.log(`📊 Environnement: ${process.env.NODE_ENV}`)
            console.log(`🌐 URL publique: ${process.env.NEXTAUTH_URL || 'Non définie'}`)
        })
})
