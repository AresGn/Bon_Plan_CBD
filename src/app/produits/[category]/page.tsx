import ProductList from '@/components/products/ProductList'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const categoryTitles: Record<string, string> = {
    'fleurs': 'Fleurs CBD',
    'huiles': 'Huiles CBD',
    'resines': 'Résines CBD',
    'infusions': 'Infusions CBD',
    'cosmetiques': 'Cosmétiques CBD',
    'accessoires': 'Accessoires CBD'
  }

  const title = categoryTitles[params.category] || 'Produits CBD'

  return {
    title: `${title} - Bon Plan CBD Rouen`,
    description: `Découvrez notre sélection de ${title.toLowerCase()} de qualité premium. Livraison rapide, produits testés en laboratoire.`
  }
}

export default function ProductCategory({ params }: { params: { category: string } }) {
  return <ProductList categorySlug={params.category} />
}
