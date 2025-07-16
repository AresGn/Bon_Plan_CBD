import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import jwt from 'jsonwebtoken';
import toast from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    
    // Vérifier l'authentification toutes les 5 minutes
    const interval = setInterval(() => {
      checkAuth();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      // Vérifier si le token est valide
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        
        // Vérifier si le token a expiré
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          logout();
          return;
        }

        // Récupérer les données de l'utilisateur
        const { data: userData } = await supabase
          .from('User')
          .select('*')
          .eq('id', decoded.userId)
          .single();

        if (userData) {
          setUser({
            id: userData.id,
            email: userData.email,
            name: userData.name,
            role: userData.role
          });
        } else {
          logout();
        }
      } catch (error) {
        console.error('Invalid token:', error);
        logout();
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('auth-token', data.token);
        // Cookie avec expiration de 7 jours
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        document.cookie = `auth-token=${data.token}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
        
        setUser({
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          role: data.user.role
        });

        toast.success('Connexion réussie !');
        return { success: true };
      } else {
        toast.error(data.error || 'Erreur de connexion');
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Erreur de connexion');
      return { success: false, error: 'Erreur de connexion' };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    setUser(null);
    toast.success('Déconnexion réussie');
    router.push('/');
  };

  const requireAuth = (redirectTo: string = '/compte') => {
    if (!loading && !user) {
      toast.error('Vous devez être connecté pour accéder à cette page');
      router.push(`${redirectTo}?redirect=${encodeURIComponent(window.location.pathname)}`);
      return false;
    }
    return true;
  };

  return {
    user,
    loading,
    login,
    logout,
    requireAuth,
    checkAuth,
    isAuthenticated: !!user
  };
};
