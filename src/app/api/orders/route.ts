import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, handleSupabaseAdminError } from '@/lib/supabase-admin';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'votre-secret-jwt-temporaire';

// Fonction pour vérifier le token JWT
async function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cookieToken = request.cookies.get('auth-token')?.value;
  const token = authHeader?.replace('Bearer ', '') || cookieToken;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded;
  } catch (error) {
    return null;
  }
}

// GET - Récupérer les commandes de l'utilisateur connecté
export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const user = await verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    let supabaseAdmin;
    try {
      supabaseAdmin = getSupabaseAdmin();
    } catch (error) {
      return handleSupabaseAdminError();
    }

    // Récupérer les commandes de l'utilisateur
    const { data: orders, error } = await supabaseAdmin
      .from('Order')
      .select(`
        *,
        items:OrderItem(
          *,
          product:Product(*)
        )
      `)
      .eq('userId', user.userId)
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des commandes' },
        { status: 500 }
      );
    }

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error in GET /api/orders:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle commande
export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const user = await verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Vous devez être connecté pour passer une commande' },
        { status: 401 }
      );
    }

    let supabaseAdmin;
    try {
      supabaseAdmin = getSupabaseAdmin();
    } catch (error) {
      return handleSupabaseAdminError();
    }

    const body = await request.json();
    const { items, shippingAddress, billingAddress, paymentMethod, email, phone } = body;

    // Valider les données
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Le panier est vide' },
        { status: 400 }
      );
    }

    if (!shippingAddress || !email || !phone) {
      return NextResponse.json(
        { error: 'Informations manquantes' },
        { status: 400 }
      );
    }

    // Vérifier la disponibilité des produits et calculer le total
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const { data: product, error } = await supabaseAdmin
        .from('Product')
        .select('*')
        .eq('id', item.productId)
        .single();

      if (error || !product) {
        return NextResponse.json(
          { error: `Produit introuvable: ${item.productId}` },
          { status: 400 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Stock insuffisant pour ${product.name}` },
          { status: 400 }
        );
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
        total: itemTotal
      });
    }

    // Calculer les frais
    const shipping = subtotal >= 50 ? 0 : 5.99; // Livraison gratuite au-dessus de 50€
    const tax = subtotal * 0.20; // TVA 20%
    const total = subtotal + shipping + tax;

    // Générer un numéro de commande unique
    const orderNumber = `CBD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Créer la commande
    const { data: order, error: orderError } = await supabaseAdmin
      .from('Order')
      .insert({
        orderNumber,
        userId: user.userId,
        email,
        phone,
        status: 'PENDING',
        subtotal,
        shipping,
        tax,
        total,
        shippingAddress: JSON.stringify(shippingAddress),
        billingAddress: billingAddress ? JSON.stringify(billingAddress) : JSON.stringify(shippingAddress),
        paymentMethod,
        paymentStatus: 'PENDING',
        paymentProvider: 'paygreen' // Nouveau champ pour identifier le provider
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return NextResponse.json(
        { error: 'Erreur lors de la création de la commande' },
        { status: 500 }
      );
    }

    // Créer les lignes de commande
    const orderItemsWithOrderId = orderItems.map(item => ({
      ...item,
      orderId: order.id
    }));

    const { error: itemsError } = await supabaseAdmin
      .from('OrderItem')
      .insert(orderItemsWithOrderId);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      // En cas d'erreur, on devrait idéalement supprimer la commande créée
      return NextResponse.json(
        { error: 'Erreur lors de la création des lignes de commande' },
        { status: 500 }
      );
    }

    // Mettre à jour le stock des produits
    for (const item of items) {
      // Récupérer le produit pour avoir le stock actuel
      const { data: product } = await supabaseAdmin
        .from('Product')
        .select('stock')
        .eq('id', item.productId)
        .single();

      if (product) {
        const { error: stockError } = await supabaseAdmin
          .from('Product')
          .update({ 
            stock: product.stock - item.quantity
          })
          .eq('id', item.productId);

        if (stockError) {
          console.error('Error updating stock:', stockError);
        }
      }
    }

    // Retourner la commande créée
    return NextResponse.json({
      order: {
        ...order,
        items: orderItemsWithOrderId
      },
      message: 'Commande créée avec succès'
    });

  } catch (error) {
    console.error('Error in POST /api/orders:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
