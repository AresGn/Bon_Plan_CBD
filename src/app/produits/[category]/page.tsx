import ProductList from '@/components/products/ProductList'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const categoryTitles: Record<string, string> = {
    'fleurs': 'Fleurs CBD',
    'resines': 'Résines CBD',
    'infusions': 'Infusions CBD',
    'cosmetiques': 'Cosmétiques CBD',
    'accessoires': 'Accessoires CBD'
  }

  const title = categoryTitles[resolvedParams.category] || 'Produits CBD'

  return {
    title: `${title} - Bon Plan CBD Rouen`,
    description: `Découvrez notre sélection de ${title.toLowerCase()} de qualité premium. Livraison rapide, produits testés en laboratoire.`
  }
}

export default async function ProductCategory({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  return <ProductList categorySlug={resolvedParams.category} />
}
