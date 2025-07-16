import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  images: string[];
  cbdRate: number;
  thcRate: number;
  origin?: string;
  cultivationType?: string;
  terpenes: string[];
  effects: string[];
  labAnalysis?: string;
  status: string;
  featured: boolean;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  reviews?: any[];
  createdAt: string;
  updatedAt: string;
}

interface UseProductsOptions {
  category?: string;
  featured?: boolean;
  status?: string;
}

export function useProducts(options: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        const params = new URLSearchParams();
        if (options.category) params.append('category', options.category);
        if (options.featured !== undefined) params.append('featured', String(options.featured));
        if (options.status) params.append('status', options.status);

        const response = await fetch(`/api/products?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des produits');
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [options.category, options.featured, options.status]);

  return { products, loading, error };
}

// Hook pour récupérer un produit par ID
export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`/api/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Produit non trouvé');
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
}
