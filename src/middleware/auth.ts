import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'votre-secret-jwt-temporaire';

export interface AuthUser {
  userId: string;
  email: string;
  role: string;
}

export async function verifyAuth(request: NextRequest): Promise<AuthUser | null> {
  try {
    // Récupérer le token depuis le header Authorization
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    
    const token = authHeader.substring(7); // Enlever "Bearer "
    
    // Vérifier le token
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    
    // Optionnel : vérifier que l'utilisateur existe toujours dans la base
    if (supabaseAdmin) {
      const { data: user } = await supabaseAdmin
        .from('User')
        .select('id')
        .eq('id', decoded.userId)
        .single();
      
      if (!user) {
        return null;
      }
    }
    
    return decoded;
  } catch (error) {
    console.error('Auth verification error:', error);
    return null;
  }
}

export async function requireAuth(request: NextRequest): Promise<AuthUser | NextResponse> {
  const user = await verifyAuth(request);
  
  if (!user) {
    return NextResponse.json(
      { error: 'Non autorisé' },
      { status: 401 }
    );
  }
  
  return user;
}

export async function requireAdmin(request: NextRequest): Promise<AuthUser | NextResponse> {
  const user = await verifyAuth(request);
  
  if (!user) {
    return NextResponse.json(
      { error: 'Non autorisé' },
      { status: 401 }
    );
  }
  
  if (user.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Accès refusé - Admin uniquement' },
      { status: 403 }
    );
  }
  
  return user;
}
