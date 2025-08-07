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

async function cleanupCate01() {
  try {
    console.log('🔍 Recherche de la catégorie "Cate01"...')
    
    // Chercher la catégorie Cate01
    const { data: cate01, error: searchError } = await supabase
      .from('Category')
      .select('*')
      .eq('name', 'Cate01')
      .single()
    
    if (searchError || !cate01) {
      console.log('❌ Catégorie "Cate01" non trouvée')
      return
    }
    
    console.log(`✓ Catégorie trouvée: ${cate01.name} (ID: ${cate01.id})`)
    
    // Chercher la catégorie "Fleurs CBD" pour déplacer le produit
    const { data: fleursCBD, error: fleursError } = await supabase
      .from('Category')
      .select('*')
      .eq('name', 'Fleurs CBD')
      .single()
    
    if (fleursError || !fleursCBD) {
      console.error('❌ Catégorie "Fleurs CBD" non trouvée pour déplacer le produit')
      return
    }
    
    console.log(`✓ Catégorie de destination: ${fleursCBD.name} (ID: ${fleursCBD.id})`)
    
    // Récupérer les produits associés à Cate01
    const { data: products, error: productsError } = await supabase
      .from('Product')
      .select('*')
      .eq('categoryId', cate01.id)
    
    if (productsError) {
      console.error('❌ Erreur lors de la récupération des produits:', productsError)
      return
    }
    
    if (products && products.length > 0) {
      console.log(`📦 ${products.length} produit(s) à déplacer:`)
      
      for (const product of products) {
        console.log(`  - Déplacement de "${product.name}" vers "Fleurs CBD"...`)
        
        const { error: updateError } = await supabase
          .from('Product')
          .update({ 
            categoryId: fleursCBD.id,
            updatedAt: new Date().toISOString()
          })
          .eq('id', product.id)
        
        if (updateError) {
          console.error(`❌ Erreur lors du déplacement de "${product.name}":`, updateError)
        } else {
          console.log(`✅ Produit "${product.name}" déplacé avec succès`)
        }
      }
    }
    
    // Vérifier qu'il n'y a plus de produits associés
    const { data: remainingProducts, error: checkError } = await supabase
      .from('Product')
      .select('id')
      .eq('categoryId', cate01.id)
    
    if (checkError) {
      console.error('❌ Erreur lors de la vérification:', checkError)
      return
    }
    
    if (remainingProducts && remainingProducts.length > 0) {
      console.error(`❌ Il reste ${remainingProducts.length} produit(s) associé(s). Suppression annulée.`)
      return
    }
    
    // Supprimer la catégorie Cate01
    console.log(`🗑️  Suppression de la catégorie "${cate01.name}"...`)
    
    const { error: deleteError } = await supabase
      .from('Category')
      .delete()
      .eq('id', cate01.id)
    
    if (deleteError) {
      console.error(`❌ Erreur lors de la suppression de "${cate01.name}":`, deleteError)
    } else {
      console.log(`✅ Catégorie "${cate01.name}" supprimée avec succès`)
    }
    
    // Afficher un résumé final
    console.log('\n📊 Résumé des catégories restantes:')
    const { data: finalCategories } = await supabase
      .from('Category')
      .select('*')
      .order('name')
    
    if (finalCategories && finalCategories.length > 0) {
      finalCategories.forEach(cat => {
        console.log(`  ✓ ${cat.name} (Slug: ${cat.slug})`)
      })
    }
    
    console.log(`\n🎉 Nettoyage terminé! La catégorie "Cate01" a été supprimée.`)
    
  } catch (error) {
    console.error('💥 Erreur générale:', error)
  }
}

// Exécuter le script
cleanupCate01()
  .then(() => {
    console.log('\n✅ Script terminé avec succès')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Erreur fatale:', error)
    process.exit(1)
  })
