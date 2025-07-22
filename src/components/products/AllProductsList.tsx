'use client'

import { useProducts } from '@/hooks/useProducts'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/hooks/useCartStore'
import toast from 'react-hot-toast'

export default function AllProductsList() {
  const { products, loading, error } = useProducts({ status: 'ACTIVE' })
  const addItem = useCartStore((state) => state.addItem)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading products.</div>
  }

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      category: product.category.slug,
      cbdRate: product.cbdRate,
      thcRate: product.thcRate,
    })
    toast.success(`${product.name} ajouté au panier !`);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
          <Link href={`/produits/${product.category.slug}/${product.slug}`}>
            <div className="aspect-w-1 aspect-h-1">
              <Image
                src={product.images[0] || '/images/default-product.jpg'}
                layout="fill"
                objectFit="cover"
                alt={product.name}
              />
            </div>
            <div className="mt-2 text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600">
                {product.description}
              </p>
              <p className="mt-1 text-sm font-bold text-gray-900">
                {product.price.toFixed(2)}€
              </p>
            </div>
          </Link>
          <button
            onClick={() => handleAddToCart(product)}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
          >
            Ajouter au Panier
            <ShoppingCartIcon className="inline h-5 w-5 ml-2" />
          </button>
        </div>
      ))}
    </div>
  )
}
