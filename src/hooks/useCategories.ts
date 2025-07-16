import { useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    products: number;
  };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('/api/categories');
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des catégories');
        }

        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}
