import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification admin (simple vérification du token pour l'instant)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    // Récupérer les statistiques
    const [products, categories, users, orders, reviews] = await Promise.all([
      supabaseAdmin.from('Product').select('*', { count: 'exact' }),
      supabaseAdmin.from('Category').select('*', { count: 'exact' }),
      supabaseAdmin.from('User').select('*', { count: 'exact' }),
      supabaseAdmin.from('Order').select('*'),
      supabaseAdmin.from('Review').select('*', { count: 'exact' })
    ]);

    // Statistiques des produits
    const totalProducts = products.count || 0;
    const activeProducts = products.data?.filter(p => p.status === 'ACTIVE').length || 0;
    const lowStockProducts = products.data?.filter(p => p.stock < 20 && p.status === 'ACTIVE').length || 0;

    // Statistiques des commandes
    const totalOrders = orders.data?.length || 0;
    const pendingOrders = orders.data?.filter(o => o.status === 'PENDING').length || 0;
    const paidOrders = orders.data?.filter(o => o.paymentStatus === 'PAID') || [];
    const totalRevenue = paidOrders.reduce((sum, order) => sum + (order.total || 0), 0);

    // Autres statistiques
    const totalCategories = categories.count || 0;
    const totalUsers = users.count || 0;
    const totalReviews = reviews.count || 0;

    // Récupérer les ventes par catégorie
    const orderItems = await supabaseAdmin
      .from('OrderItem')
      .select(`
        *,
        product:Product!inner(*, category:Category(*))
      `);

    // Grouper par catégorie
    const categoryStats: Record<string, { count: number; revenue: number }> = {};
    
    if (orderItems.data) {
      for (const item of orderItems.data) {
        if (item.product?.category?.name) {
          const categoryName = item.product.category.name;
          if (!categoryStats[categoryName]) {
            categoryStats[categoryName] = { count: 0, revenue: 0 };
          }
          categoryStats[categoryName].count += item.quantity || 0;
          categoryStats[categoryName].revenue += item.total || 0;
        }
      }
    }

    // Statistiques mensuelles (6 derniers mois)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyOrders = paidOrders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= sixMonthsAgo;
    });

    // Grouper par mois
    const monthlyStats = monthlyOrders.reduce((acc, order) => {
      const month = new Date(order.createdAt).toISOString().substring(0, 7); // YYYY-MM
      if (!acc[month]) {
        acc[month] = { count: 0, revenue: 0 };
      }
      acc[month].count++;
      acc[month].revenue += order.total || 0;
      return acc;
    }, {} as Record<string, { count: number; revenue: number }>);

    return NextResponse.json({
      overview: {
        totalProducts,
        activeProducts,
        totalCategories,
        totalUsers,
        totalOrders,
        pendingOrders,
        totalReviews,
        lowStockProducts,
        totalRevenue
      },
      categoryStats,
      monthlyStats,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des statistiques' },
      { status: 500 }
    );
  }
}
