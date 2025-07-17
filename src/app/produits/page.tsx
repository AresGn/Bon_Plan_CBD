import AllProductsList from '@/components/products/AllProductsList'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tous nos produits CBD | Bon Plan CBD',
  description: 'Découvrez notre gamme complète de produits CBD : fleurs, résines, infusions, cosmétiques et accessoires. Qualité premium et prix attractifs.',
}

export default function ProduitsPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <AllProductsList />
    </div>
  )
}
