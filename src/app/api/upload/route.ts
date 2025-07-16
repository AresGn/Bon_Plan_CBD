import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { requireAdmin } from '@/middleware/auth';

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification admin
    const authResult = await requireAdmin(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    // Vérifier le type de fichier
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Type de fichier non autorisé. Utilisez JPG, PNG ou WebP.' },
        { status: 400 }
      );
    }

    // Vérifier la taille du fichier (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Le fichier est trop volumineux. Taille maximale : 5MB' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Générer un nom de fichier unique
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = file.name.replace(/\.[^/.]+$/, '') + '-' + uniqueSuffix + '.' + file.name.split('.').pop();
    
    // Chemin de sauvegarde
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const filepath = join(uploadDir, filename);

    // Créer le dossier uploads s'il n'existe pas
    try {
      await writeFile(filepath, buffer);
    } catch (error) {
      // Si le dossier n'existe pas, le créer
      const { mkdir } = await import('fs/promises');
      await mkdir(uploadDir, { recursive: true });
      await writeFile(filepath, buffer);
    }

    // Retourner l'URL de l'image
    const imageUrl = `/uploads/${filename}`;

    return NextResponse.json({
      url: imageUrl,
      filename: filename,
      size: file.size,
      type: file.type
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'upload du fichier' },
      { status: 500 }
    );
  }
}
