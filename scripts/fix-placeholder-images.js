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

async function fixPlaceholderImages() {
  try {
    console.log('🔍 Recherche des produits avec des images via.placeholder.com...')
    
    // Chercher tous les produits avec des images placeholder
    const { data: products, error: searchError } = await supabase
      .from('Product')
      .select('*')
      .like('images', '%via.placeholder.com%')
    
    if (searchError) {
      console.error('❌ Erreur lors de la recherche:', searchError)
      return
    }
    
    if (!products || products.length === 0) {
      console.log('✅ Aucun produit avec des images placeholder trouvé')
      return
    }
    
    console.log(`📦 ${products.length} produit(s) avec des images placeholder trouvé(s):`)
    
    for (const product of products) {
      console.log(`\n🔧 Correction du produit: "${product.name}"`)
      console.log(`   Images actuelles: ${JSON.stringify(product.images)}`)
      
      // Remplacer les URLs placeholder par une image par défaut
      let updatedImages = product.images
      
      if (Array.isArray(updatedImages)) {
        updatedImages = updatedImages.map(img => {
          if (img && img.includes('via.placeholder.com')) {
            return '/images/default-product.jpg'
          }
          return img
        })
      } else if (typeof updatedImages === 'string') {
        if (updatedImages.includes('via.placeholder.com')) {
          updatedImages = ['/images/default-product.jpg']
        } else {
          updatedImages = [updatedImages]
        }
      } else {
        updatedImages = ['/images/default-product.jpg']
      }
      
      console.log(`   Nouvelles images: ${JSON.stringify(updatedImages)}`)
      
      // Mettre à jour le produit
      const { error: updateError } = await supabase
        .from('Product')
        .update({ 
          images: updatedImages,
          updatedAt: new Date().toISOString()
        })
        .eq('id', product.id)
      
      if (updateError) {
        console.error(`❌ Erreur lors de la mise à jour de "${product.name}":`, updateError)
      } else {
        console.log(`✅ Produit "${product.name}" mis à jour avec succès`)
      }
    }
    
    // Vérifier qu'il n'y a plus d'images placeholder
    console.log('\n🔍 Vérification finale...')
    const { data: remainingProducts, error: checkError } = await supabase
      .from('Product')
      .select('id, name, images')
      .like('images', '%via.placeholder.com%')
    
    if (checkError) {
      console.error('❌ Erreur lors de la vérification finale:', checkError)
      return
    }
    
    if (remainingProducts && remainingProducts.length > 0) {
      console.log(`⚠️  Il reste ${remainingProducts.length} produit(s) avec des images placeholder`)
      remainingProducts.forEach(product => {
        console.log(`   - ${product.name}: ${JSON.stringify(product.images)}`)
      })
    } else {
      console.log('✅ Plus aucune image placeholder trouvée')
    }
    
    console.log('\n🎉 Nettoyage des images placeholder terminé!')
    
  } catch (error) {
    console.error('💥 Erreur générale:', error)
  }
}

// Exécuter le script
fixPlaceholderImages()
  .then(() => {
    console.log('\n✅ Script terminé avec succès')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Erreur fatale:', error)
    process.exit(1)
  })
