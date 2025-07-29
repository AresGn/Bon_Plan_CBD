import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification admin - Simple check du token
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      )
    }

    // Vérifier le type de fichier
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Type de fichier non autorisé. Utilisez JPG, PNG ou WebP.' },
        { status: 400 }
      )
    }

    // Vérifier la taille du fichier (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Le fichier est trop volumineux. Taille maximale : 5MB' },
        { status: 400 }
      )
    }

    // Générer un nom de fichier unique
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}.${fileExt}`
    const filePath = `categories/${fileName}`

    // Convertir le fichier en ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    // Upload vers Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Supabase upload error:', uploadError)
      // Si le bucket n'existe pas, essayer de le créer
      if (uploadError.message.includes('bucket') || uploadError.message.includes('not found')) {
        // Créer le bucket
        const { error: createError } = await supabase.storage.createBucket('images', {
          public: true,
          allowedMimeTypes: allowedTypes
        })
        
        if (!createError) {
          // Réessayer l'upload
          const { data: retryData, error: retryError } = await supabase.storage
            .from('images')
            .upload(filePath, buffer, {
              contentType: file.type,
              cacheControl: '3600',
              upsert: false
            })
          
          if (retryError) {
            throw new Error('Erreur lors de l\'upload après création du bucket')
          }
        } else {
          throw new Error('Erreur lors de la création du bucket')
        }
      } else {
        throw uploadError
      }
    }

    // Obtenir l'URL publique
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath)

    return NextResponse.json({
      url: publicUrl,
      filename: fileName,
      size: file.size,
      type: file.type
    })

  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur lors de l\'upload du fichier' },
      { status: 500 }
    )
  }
}
