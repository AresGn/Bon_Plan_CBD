# Guide de Déploiement - Bon Plan CBD sur cPanel/LWS

## 📋 Résumé de la Préparation

✅ **Configuration Next.js** : Application configurée en mode `standalone`
✅ **Build réussie** : Application compilée avec succès
✅ **Test local** : Serveur standalone testé et fonctionnel
✅ **Package optimisé** : Fichier `bon-plan-cbd-cpanel-optimized.zip` (5.5 MB) prêt pour l'upload

## 📦 Contenu du Package de Déploiement

Le fichier `bon-plan-cbd-cpanel-optimized.zip` contient :

```
├── server.js                 # Serveur Next.js standalone
├── package.json             # Dépendances minimales
├── .env                     # Variables d'environnement pour production
├── src/                     # Code source de l'application
├── public/                  # Assets statiques (images, favicon, etc.)
└── .next/
    ├── static/              # Assets compilés Next.js
    └── server/              # Code serveur compilé
```

## 🚀 Étapes de Déploiement sur cPanel

### Étape 1 : Préparation de l'environnement cPanel

1. **Connectez-vous à votre cPanel LWS**
2. **Accédez au gestionnaire de fichiers**
3. **Naviguez vers le répertoire de votre domaine** (généralement `public_html` ou un sous-dossier)

### Étape 2 : Upload et extraction

1. **Uploadez le fichier** `bon-plan-cbd-cpanel-optimized.zip`
2. **Extrayez le contenu** directement dans le répertoire cible
3. **Vérifiez la structure** : vous devriez voir `server.js`, `.env`, `src/`, `public/`, etc.

### Étape 3 : Configuration Node.js dans cPanel

1. **Accédez à "Setup Node.js App"** dans cPanel
2. **Créez une nouvelle application** avec les paramètres suivants :
   - **Version Node.js** : 18.x ou 20.x (recommandé)
   - **Application root** : Le répertoire où vous avez extrait les fichiers
   - **Application URL** : Votre domaine ou sous-domaine
   - **Startup file** : `server.js`

### Étape 4 : Installation des dépendances

1. **Ouvrez le terminal** de l'application Node.js dans cPanel
2. **Exécutez la commande** :
   ```bash
   npm install --production
   ```
   
   ⚠️ **Important** : Utilisez `--production` pour éviter d'installer les dépendances de développement

### Étape 5 : Configuration des variables d'environnement

Dans l'interface "Environment Variables" de votre application Node.js, ajoutez :

### Étape 6 : Démarrage de l'application

1. **Redémarrez l'application** via l'interface cPanel
2. **Vérifiez les logs** pour s'assurer qu'il n'y a pas d'erreurs
3. **Testez l'accès** via votre domaine

## 🔧 Configuration Avancée

### Gestion des domaines

Si vous utilisez un sous-domaine ou un domaine personnalisé :

1. **Configurez le DNS** pour pointer vers votre serveur
2. **Mettez à jour** `NEXTAUTH_URL` et `NEXT_PUBLIC_URL` avec la bonne URL
3. **Redémarrez** l'application après modification

### Optimisation des performances

1. **Activez la compression gzip** dans cPanel
2. **Configurez le cache** pour les assets statiques
3. **Surveillez l'utilisation des ressources** (CPU, RAM)

## 🐛 Dépannage

### Problèmes courants

**1. Application ne démarre pas**
- Vérifiez que Node.js est bien configuré
- Contrôlez les logs d'erreur
- Assurez-vous que `server.js` est bien le startup file

**2. Erreurs de variables d'environnement**
- Vérifiez que toutes les variables sont définies
- Redémarrez l'application après modification
- Contrôlez les valeurs dans l'interface cPanel

**3. Problèmes de base de données**
- Vérifiez la connectivité à Supabase
- Contrôlez les credentials de base de données
- Testez la connexion depuis le terminal

**4. Erreurs 500**
- Consultez les logs de l'application
- Vérifiez les permissions des fichiers
- Contrôlez la configuration Next.js

### Commandes utiles

```bash
# Vérifier les logs
npm run start

# Tester la connectivité
node -e "console.log('Node.js fonctionne')"

# Vérifier les variables d'environnement
node -e "console.log(process.env.DATABASE_URL)"
```

## 📞 Support

En cas de problème :

1. **Consultez les logs** de l'application dans cPanel
2. **Vérifiez la documentation** LWS pour Node.js
3. **Contactez le support** LWS si nécessaire

## ✅ Checklist de Déploiement

- [ ] Fichier ZIP uploadé et extrait
- [ ] Application Node.js créée dans cPanel
- [ ] Dépendances installées (`npm install --production`)
- [ ] Variables d'environnement configurées
- [ ] Application démarrée et accessible
- [ ] Tests de fonctionnalité effectués
- [ ] DNS configuré (si domaine personnalisé)
- [ ] Certificat SSL activé
- [ ] Monitoring mis en place

---

**🎉 Félicitations ! Votre application Bon Plan CBD est maintenant déployée sur cPanel/LWS !**
