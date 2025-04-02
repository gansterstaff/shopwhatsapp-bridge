
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import SalesReport from '@/components/admin/SalesReport';
import BannerManagerRefactored from '@/components/admin/BannerManagerRefactored';
import SupportMessages from '@/components/admin/SupportMessages';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { BarChart2, MessageSquare, Image, ShoppingBag, Settings } from 'lucide-react';

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('overview');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <>
      <Helmet>
        <title>Panel de Administración | E-Commerce</title>
        <meta name="description" content="Panel de administración para gestionar productos, pedidos y contenido del sitio." />
      </Helmet>

      <div className="container p-6 mx-auto">
        <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="overview" className="flex items-center justify-center">
              <BarChart2 className="h-4 w-4 mr-2" />
              <span>Reportes</span>
            </TabsTrigger>
            <TabsTrigger value="banners" className="flex items-center justify-center">
              <Image className="h-4 w-4 mr-2" />
              <span>Banners</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center justify-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              <span>Mensajes</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center justify-center">
              <ShoppingBag className="h-4 w-4 mr-2" />
              <span>Productos</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center justify-center">
              <Settings className="h-4 w-4 mr-2" />
              <span>Configuración</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <SalesReport />
          </TabsContent>

          <TabsContent value="banners">
            <BannerManagerRefactored />
          </TabsContent>

          <TabsContent value="support">
            <SupportMessages />
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Productos</CardTitle>
                <CardDescription>
                  Administra tu catálogo de productos, añade nuevos productos o actualiza los existentes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-6">
                    Accede a la gestión completa de productos para editar, crear o eliminar productos de tu catálogo.
                  </p>
                  <Button onClick={() => navigate('/admin/products')}>
                    Ir a Gestión de Productos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Sistema</CardTitle>
                <CardDescription>
                  Administra las preferencias y configuraciones generales de la tienda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-6">
                    Accede a la configuración completa de la tienda donde podrás modificar las preferencias de cuenta y compra.
                  </p>
                  <Button onClick={() => navigate('/settings')}>
                    Ir a Configuración
                  </Button>
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
