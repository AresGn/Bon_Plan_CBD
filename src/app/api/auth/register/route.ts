import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name } = body // Ne PAS accepter le role depuis le frontend
    
    console.log('Tentative d\'inscription:', { email, name })

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: 'Email, mot de passe et nom sont requis' },
        { status: 400 }
      )
    }

    // Vérifier que supabaseAdmin est disponible
    if (!supabaseAdmin) {
      console.error('supabaseAdmin n\'est pas initialisé')
      return NextResponse.json(
        { message: 'Erreur de configuration du serveur' },
        { status: 500 }
      )
    }

    // Vérifier si l'utilisateur existe déjà
    console.log('Vérification de l\'existence de l\'utilisateur...')
    const { data: existingUser } = await supabaseAdmin
      .from('User')
      .select('id')
      .eq('email', email)
      .single()
    
    console.log('Résultat de la vérification:', existingUser)

    if (existingUser) {
      return NextResponse.json(
        { message: 'Cette adresse email est déjà utilisée' },
        { status: 400 }
      )
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12)

    // Créer l'utilisateur
    console.log('Création de l\'utilisateur...')
    const userData = {
      email,
      password: hashedPassword,
      name,
      role: 'USER', // TOUJOURS créer en tant que USER normal
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    console.log('Données à insérer:', { ...userData, password: '[HIDDEN]' })
    
    const { data: newUser, error } = await supabaseAdmin
      .from('User')
      .insert([userData])
      .select()
      .single()

    if (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error)
      console.error('Détails de l\'erreur:', JSON.stringify(error, null, 2))
      return NextResponse.json(
        { message: error.message || 'Erreur lors de la création du compte' },
        { status: 500 }
      )
    }
    
    console.log('Utilisateur créé avec succès:', newUser)

    return NextResponse.json(
      { 
        message: 'Inscription réussie',
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erreur serveur:', error)
    return NextResponse.json(
      { message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
