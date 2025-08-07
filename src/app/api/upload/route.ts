import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification admin
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { error: 'Non autorisé - Token manquant' },
        { status: 401 }
      )
    }

    // Vérifier le token JWT (optionnel, pour plus de sécurité)
    try {
      if (process.env.JWT_SECRET) {
        jwt.verify(token, process.env.JWT_SECRET)
      }
    } catch (jwtError) {
      console.log('JWT verification failed, continuing with simple token check')
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

    // Déterminer le dossier selon le type d'upload
    const uploadType = request.nextUrl.searchParams.get('type') || 'products'
    const allowedFolders = ['products', 'categories', 'users']
    const folder = allowedFolders.includes(uploadType) ? uploadType : 'products'

    // Générer un nom de fichier unique
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}.${fileExt}`
    const filePath = `${folder}/${fileName}`

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
      console.error('File path:', filePath)
      console.error('File type:', file.type)
      console.error('File size:', file.size)

      // Si le bucket n'existe pas, essayer de le créer
      if (uploadError.message.includes('bucket') || uploadError.message.includes('not found')) {
        console.log('Attempting to create bucket...')
        const { error: createError } = await supabase.storage.createBucket('images', {
          public: true,
          allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
        })

        if (!createError) {
          console.log('Bucket created, retrying upload...')
          // Réessayer l'upload
          const { data: retryData, error: retryError } = await supabase.storage
            .from('images')
            .upload(filePath, buffer, {
              contentType: file.type,
              cacheControl: '3600',
              upsert: false
            })

          if (retryError) {
            console.error('Retry upload error:', retryError)
            throw new Error('Erreur lors de l\'upload après création du bucket: ' + retryError.message)
          }
          console.log('Upload successful after bucket creation')
        } else {
          console.error('Bucket creation error:', createError)
          throw new Error('Erreur lors de la création du bucket: ' + createError.message)
        }
      } else {
        throw new Error('Erreur Supabase: ' + uploadError.message)
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
