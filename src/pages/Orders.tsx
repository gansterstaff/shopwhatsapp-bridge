
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { Order } from '@/lib/types';

// Mock order data
const mockOrders: Order[] = [
  {
    id: "ord-123456",
    userId: "user-123",
    status: "completed",
    total: 299.99,
    items: [
      { productId: 1, quantity: 1, price: 299.99 }
    ],
    createdAt: "2023-10-15T14:30:00Z"
  },
  {
    id: "ord-123457",
    userId: "user-123",
    status: "pending",
    total: 599.98,
    items: [
      { productId: 2, quantity: 2, price: 299.99 }
    ],
    createdAt: "2023-11-05T10:15:00Z"
  },
  {
    id: "ord-123458",
    userId: "user-123",
    status: "cancelled",
    total: 149.99,
    items: [
      { productId: 3, quantity: 1, price: 149.99 }
    ],
    createdAt: "2023-11-18T16:45:00Z"
  }
];

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // In a real app, you would fetch orders from your API
  const orders = mockOrders;
  
  // Helper function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  
  // Get order status badge color
  const getStatusColor = (status: 'pending' | 'completed' | 'cancelled') => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Translate status to Spanish
  const translateStatus = (status: 'pending' | 'completed' | 'cancelled') => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };
  
  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Acceso Restringido</h1>
          <p className="text-gray-600 mb-6">Debes iniciar sesión para ver tus pedidos.</p>
          <Button onClick={() => navigate('/login')}>Iniciar Sesión</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Mis Pedidos</h1>
          <p className="text-lg text-gray-600 mt-2">
            Visualiza y gestiona todos tus pedidos
          </p>
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="pending">Pendientes</TabsTrigger>
            <TabsTrigger value="completed">Completados</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {renderOrdersTable(orders, isLoading, getStatusColor, formatDate, translateStatus)}
          </TabsContent>
          
          <TabsContent value="pending">
            {renderOrdersTable(
              orders.filter(order => order.status === 'pending'),
              isLoading,
              getStatusColor,
              formatDate,
              translateStatus
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            {renderOrdersTable(
              orders.filter(order => order.status === 'completed'),
              isLoading,
              getStatusColor,
              formatDate,
              translateStatus
            )}
          </TabsContent>
          
          <TabsContent value="cancelled">
            {renderOrdersTable(
              orders.filter(order => order.status === 'cancelled'),
              isLoading,
              getStatusColor,
              formatDate,
              translateStatus
            )}
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Preguntas Frecuentes</CardTitle>
            <CardDescription>Información sobre tus pedidos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">¿Cuánto tarda mi pedido en llegar?</h3>
              <p className="text-gray-600">
                Los tiempos de entrega varían según tu ubicación. Generalmente, el tiempo estimado es de 3-5 días hábiles para zonas urbanas y 5-7 días para zonas rurales.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">¿Puedo cancelar mi pedido?</h3>
              <p className="text-gray-600">
                Puedes cancelar tu pedido dentro de las primeras 24 horas después de realizarlo si aún no ha sido procesado. Contacta a nuestro servicio de atención al cliente para asistencia.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">¿Cómo puedo hacer un seguimiento de mi pedido?</h3>
              <p className="text-gray-600">
                Una vez que tu pedido ha sido enviado, recibirás un correo electrónico con un número de seguimiento que podrás utilizar en la página del transportista.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => navigate('/contact')}>
              Contactar Soporte
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

// Helper function to render orders table
const renderOrdersTable = (
  orders: Order[], 
  isLoading: boolean,
  getStatusColor: (status: 'pending' | 'completed' | 'cancelled') => string,
  formatDate: (dateString: string) => string,
  translateStatus: (status: 'pending' | 'completed' | 'cancelled') => string
) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <Skeleton className="h-6 w-1/4 mb-4" />
            <div className="flex justify-between mb-4">
              <Skeleton className="h-4 w-1/5" />
              <Skeleton className="h-4 w-1/5" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }
  
  if (orders.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <h3 className="text-xl font-medium mb-2">No hay pedidos</h3>
        <p className="text-gray-600 mb-4">Aún no has realizado ningún pedido en esta categoría.</p>
        <Button onClick={() => window.location.href = '/products'}>
          Explorar Productos
        </Button>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Número de Pedido</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{formatDate(order.createdAt)}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {translateStatus(order.status)}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Detalles
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Orders;
