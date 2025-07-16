import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Configuration JWT
const JWT_SECRET = process.env.JWT_SECRET || 'votre-secret-jwt-temporaire';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Vérifier que les champs sont présents
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    // Vérifier que supabaseAdmin est initialisé
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Configuration serveur incorrecte' },
        { status: 500 }
      );
    }

    // Rechercher l'utilisateur
    const { data: user, error } = await supabaseAdmin
      .from('User')
      .select('*')
      .eq('email', email)
      .single();

    if (!user) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Créer le token JWT avec une durée de vie de 7 jours
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '7d' } // Session de 7 jours
    );

    // Retourner les informations de l'utilisateur et le token
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.image
      },
      token
    });

  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  }
}
