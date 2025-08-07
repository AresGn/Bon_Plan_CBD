require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Variables d\'environnement Supabase manquantes')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function removeCate01() {
  try {
    console.log('Recherche de la catégorie "cate01"...')
    
    // Chercher la catégorie par nom ou slug
    const { data: categories, error: searchError } = await supabase
      .from('Category')
      .select('*')
      .or('name.ilike.%cate01%,slug.ilike.%cate01%,id.eq.cate01')
    
    if (searchError) {
      console.error('Erreur lors de la recherche:', searchError)
      return
    }
    
    if (!categories || categories.length === 0) {
      console.log('❌ Aucune catégorie "cate01" trouvée')
      return
    }
    
    console.log(`✓ ${categories.length} catégorie(s) trouvée(s):`)
    categories.forEach(cat => {
      console.log(`  - ID: ${cat.id}, Nom: ${cat.name}, Slug: ${cat.slug}`)
    })
    
    // Vérifier s'il y a des produits associés
    for (const category of categories) {
      console.log(`\nVérification des produits pour la catégorie "${category.name}"...`)
      
      const { data: products, error: productsError } = await supabase
        .from('Product')
        .select('id, name')
        .eq('categoryId', category.id)
      
      if (productsError) {
        console.error('Erreur lors de la vérification des produits:', productsError)
        continue
      }
      
      if (products && products.length > 0) {
        console.log(`⚠️  ${products.length} produit(s) associé(s) à cette catégorie:`)
        products.forEach(product => {
          console.log(`    - ${product.name} (ID: ${product.id})`)
        })
        
        // Demander confirmation ou déplacer les produits vers une autre catégorie
        console.log('❌ Suppression annulée - des produits sont associés à cette catégorie')
        console.log('Veuillez d\'abord déplacer ou supprimer ces produits')
        continue
      }
      
      // Supprimer la catégorie si aucun produit n'est associé
      console.log(`Suppression de la catégorie "${category.name}"...`)
      
      const { error: deleteError } = await supabase
        .from('Category')
        .delete()
        .eq('id', category.id)
      
      if (deleteError) {
        console.error(`❌ Erreur lors de la suppression de "${category.name}":`, deleteError)
      } else {
        console.log(`✅ Catégorie "${category.name}" supprimée avec succès`)
      }
    }
    
    // Afficher toutes les catégories restantes
    console.log('\n=== Catégories restantes ===')
    const { data: remainingCategories } = await supabase
      .from('Category')
      .select('*')
      .order('name')
    
    if (remainingCategories && remainingCategories.length > 0) {
      remainingCategories.forEach(cat => {
        console.log(`- ${cat.name} (ID: ${cat.id}, Slug: ${cat.slug})`)
      })
    } else {
      console.log('Aucune catégorie restante')
    }
    
  } catch (error) {
    console.error('Erreur générale:', error)
  }
}

// Exécuter le script
removeCate01()
  .then(() => {
    console.log('\n✓ Script terminé')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Erreur fatale:', error)
    process.exit(1)
  })
