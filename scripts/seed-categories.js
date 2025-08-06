const { createClient } = require('@supabase/supabase-js')

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Variables d\'environnement Supabase manquantes')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const defaultCategories = [
  {
    name: 'Fleurs CBD',
    slug: 'fleurs-cbd',
    description: 'Fleurs de cannabis CBD de haute qualité',
    image: null
  },
  {
    name: 'Huiles CBD',
    slug: 'huiles-cbd',
    description: 'Huiles et extraits de CBD',
    image: null
  },
  {
    name: 'Résines CBD',
    slug: 'resines-cbd',
    description: 'Résines et hash CBD',
    image: null
  },
  {
    name: 'E-liquides CBD',
    slug: 'e-liquides-cbd',
    description: 'E-liquides pour cigarettes électroniques',
    image: null
  },
  {
    name: 'Cosmétiques CBD',
    slug: 'cosmetiques-cbd',
    description: 'Produits cosmétiques au CBD',
    image: null
  }
]

async function seedCategories() {
  try {
    console.log('Vérification des catégories existantes...')
    
    // Vérifier les catégories existantes
    const { data: existingCategories, error: fetchError } = await supabase
      .from('Category')
      .select('*')
    
    if (fetchError) {
      console.error('Erreur lors de la récupération des catégories:', fetchError)
      return
    }
    
    console.log(`${existingCategories.length} catégories trouvées`)
    
    // Créer les catégories manquantes
    for (const category of defaultCategories) {
      const exists = existingCategories.find(cat => cat.slug === category.slug)
      
      if (!exists) {
        console.log(`Création de la catégorie: ${category.name}`)
        
        const { data, error } = await supabase
          .from('Category')
          .insert({
            ...category,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
          .select()
          .single()
        
        if (error) {
          console.error(`Erreur lors de la création de ${category.name}:`, error)
        } else {
          console.log(`✓ Catégorie ${category.name} créée avec l'ID: ${data.id}`)
        }
      } else {
        console.log(`✓ Catégorie ${category.name} existe déjà`)
      }
    }
    
    // Afficher toutes les catégories
    const { data: allCategories } = await supabase
      .from('Category')
      .select('*')
      .order('name')
    
    console.log('\n=== Catégories disponibles ===')
    allCategories.forEach(cat => {
      console.log(`- ${cat.name} (ID: ${cat.id}, Slug: ${cat.slug})`)
    })
    
  } catch (error) {
    console.error('Erreur générale:', error)
  }
}

// Exécuter le script
seedCategories()
  .then(() => {
    console.log('\n✓ Script terminé')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Erreur fatale:', error)
    process.exit(1)
  })
