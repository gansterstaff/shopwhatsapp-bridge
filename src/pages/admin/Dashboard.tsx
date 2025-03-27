
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, Users, ShoppingBag, Package, AlertTriangle } from 'lucide-react';
import { Helmet } from 'react-helmet';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [stats, setStats] = React.useState({
    products: 0,
    users: 0,
    orders: 0,
    lowStock: 0,
    totalSales: 0,
    pendingOrders: 0
  });

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (data?.role !== 'admin') {
          navigate('/');
          return;
        }

        setRole(data.role);
        await fetchDashboardStats();
      } catch (error) {
        console.error('Error verificando permisos de administrador:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, navigate]);

  const fetchDashboardStats = async () => {
    try {
      // Obtener recuento de productos
      const { count: productsCount, error: productsError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      // Obtener recuento de usuarios
      const { count: usersCount, error: usersError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Obtener recuento de pedidos
      const { count: ordersCount, error: ordersError } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });

      // Obtener productos con stock bajo
      const { data: lowStockProducts, error: lowStockError } = await supabase
        .from('products')
        .select('*')
        .lt('stock', 10);

      // Obtener pedidos pendientes
      const { data: pendingOrders, error: pendingOrdersError } = await supabase
        .from('orders')
        .select('*')
        .eq('status', 'pending');

      // Calcular total de ventas
      const { data: allOrders, error: allOrdersError } = await supabase
        .from('orders')
        .select('total')
        .eq('status', 'completed');

      const totalSales = allOrders?.reduce((acc, order) => acc + Number(order.total), 0) || 0;

      setStats({
        products: productsCount || 0,
        users: usersCount || 0,
        orders: ordersCount || 0,
        lowStock: lowStockProducts?.length || 0,
        totalSales,
        pendingOrders: pendingOrders?.length || 0
      });
    } catch (error) {
      console.error('Error obteniendo estadísticas del dashboard:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Panel de Administración - ShopWhats</title>
        <meta name="description" content="Panel de administración para gestionar productos, pedidos y usuarios" />
      </Helmet>

      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Productos Totales</CardTitle>
              <CardDescription className="text-2xl font-bold">{stats.products}</CardDescription>
            </CardHeader>
            <CardContent>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Usuarios Registrados</CardTitle>
              <CardDescription className="text-2xl font-bold">{stats.users}</CardDescription>
            </CardHeader>
            <CardContent>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pedidos Totales</CardTitle>
              <CardDescription className="text-2xl font-bold">{stats.orders}</CardDescription>
            </CardHeader>
            <CardContent>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ventas Totales</CardTitle>
              <CardDescription className="text-2xl font-bold">${stats.totalSales.toFixed(2)}</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Resumen de ventas</CardTitle>
              <CardDescription>Ventas de los últimos 30 días</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-dashed rounded-lg">
                <p className="text-muted-foreground">Gráfico de ventas (datos de demostración)</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Alertas</CardTitle>
              <CardDescription>Situaciones que requieren atención</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Productos con stock bajo</p>
                    <p className="text-sm text-muted-foreground">{stats.lowStock} productos con menos de 10 unidades</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <ShoppingBag className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Pedidos pendientes</p>
                    <p className="text-sm text-muted-foreground">{stats.pendingOrders} pedidos esperando procesamiento</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="recent-orders">
          <TabsList className="mb-4">
            <TabsTrigger value="recent-orders">Pedidos Recientes</TabsTrigger>
            <TabsTrigger value="popular-products">Productos Populares</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent-orders">
            <Card>
              <CardHeader>
                <CardTitle>Pedidos recientes</CardTitle>
                <CardDescription>Lista de los pedidos más recientes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No hay datos de pedidos disponibles para mostrar.
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="popular-products">
            <Card>
              <CardHeader>
                <CardTitle>Productos populares</CardTitle>
                <CardDescription>Productos más vendidos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No hay datos de productos populares disponibles para mostrar.
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminDashboard;
