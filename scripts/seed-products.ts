import { supabaseAdmin } from '../src/lib/supabase'

// Produits de test à ajouter
const testProducts = [
  {
    name: 'OG Kush CBD Premium',
    slug: 'og-kush-cbd-premium',
    description: 'Fleurs compactes aux arômes sour, notes crémeuses et rondes. Une variété premium cultivée avec soin.',
    price: 9.90,
    originalPrice: 12.90,
    stock: 50,
    images: JSON.stringify(['/images/img8.jpg']),
    cbdRate: 18,
    thcRate: 0.3,
    origin: 'France',
    cultivationType: 'Greenhouse',
    terpenes: JSON.stringify(['Myrcène', 'Limonène', 'Caryophyllène']),
    effects: JSON.stringify(['Relaxation', 'Anti-stress', 'Bien-être']),
    status: 'ACTIVE',
    featured: true
  },
  {
    name: 'Small Bud Orange Bud',
    slug: 'small-bud-orange-bud',
    description: 'Goût fruité et notes d\'agrumes, idéal pour la relaxation quotidienne.',
    price: 7.50,
    originalPrice: 9.90,
    stock: 100,
    images: JSON.stringify(['/images/img9.jpg']),
    cbdRate: 15,
    thcRate: 0.3,
    origin: 'Italie',
    cultivationType: 'Greenhouse',
    terpenes: JSON.stringify(['Limonène', 'Pinène', 'Terpinolène']),
    effects: JSON.stringify(['Détente', 'Clarté mentale', 'Anti-anxiété']),
    status: 'ACTIVE',
    featured: true
  },
  {
    name: 'Super Skunk CBD',
    slug: 'super-skunk-cbd',
    description: 'Arômes amers et fruités, notes de bois et pin pour une expérience authentique.',
    price: 8.90,
    originalPrice: 11.50,
    stock: 75,
    images: JSON.stringify(['/images/img11.jpg']),
    cbdRate: 17,
    thcRate: 0.3,
    origin: 'Suisse',
    cultivationType: 'Outdoor',
    terpenes: JSON.stringify(['Pinène', 'Humulène', 'Caryophyllène']),
    effects: JSON.stringify(['Relaxation profonde', 'Soulagement', 'Sommeil']),
    status: 'ACTIVE',
    featured: false
  }
]

async function seedProducts() {
  if (!supabaseAdmin) {
    console.error('supabaseAdmin n\'est pas initialisé. Assurez-vous que SUPABASE_SERVICE_ROLE_KEY est définie.')
    return
  }
  
  try {
    // D'abord, vérifier s'il y a des catégories
    const { data: categories } = await supabaseAdmin
      .from('Category')
      .select('*')
    
    let flowerCategoryId
    
    if (!categories || categories.length === 0) {
      // Créer une catégorie Fleurs CBD
      const { data: newCategory, error: catError } = await supabaseAdmin
        .from('Category')
        .insert({
          name: 'Fleurs CBD',
          slug: 'fleurs',
          description: 'Notre sélection de fleurs CBD de qualité premium',
          image: '/images/category-fleurs.jpg'
        })
        .select()
        .single()
      
      if (catError) throw catError
      flowerCategoryId = newCategory.id
      console.log('Catégorie Fleurs CBD créée')
    } else {
      // Utiliser la première catégorie trouvée
      flowerCategoryId = categories[0].id
    }
    
    // Ajouter les produits avec la catégorie
    for (const product of testProducts) {
      const { error } = await supabaseAdmin
        .from('Product')
        .insert({
          ...product,
          categoryId: flowerCategoryId
        })
      
      if (error) {
        console.error('Erreur lors de l\'ajout du produit:', product.name, error)
      } else {
        console.log('Produit ajouté:', product.name)
      }
    }
    
    console.log('Seeding terminé !')
  } catch (error) {
    console.error('Erreur lors du seeding:', error)
  }
}

// Exécuter le script
seedProducts()
