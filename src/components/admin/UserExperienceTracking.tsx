
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { Activity, ShoppingCart, Users, UserCheck } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface TimeRange {
  startDate: Date;
  endDate: Date;
}

interface MetricCard {
  title: string;
  value: number | string;
  change?: number;
  icon: React.ReactNode;
}

interface EventData {
  date: string;
  count: number;
  uniqueUsers?: number;
}

const UserExperienceTracking = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [selectedView, setSelectedView] = useState('overview');

  // Calculate date range based on selected time range
  const getDateRange = (): TimeRange => {
    const endDate = new Date();
    const startDate = new Date();
    
    switch(timeRange) {
      case '7d':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(endDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(endDate.getDate() - 90);
        break;
    }
    
    return { startDate, endDate };
  };

  // Fetch user registrations
  const { data: registrationsData, isLoading: registrationsLoading } = useQuery({
    queryKey: ['user-registrations', timeRange],
    queryFn: async () => {
      try {
        const range = getDateRange();
        
        // Para demo, usamos datos simulados
        // En producción, usar:
        // const { data, error } = await supabase.rpc('get_user_registrations', {
        //   start_date: range.startDate.toISOString(),
        //   end_date: range.endDate.toISOString()
        // });
        
        // Datos simulados para la demo
        const registrationCount = Math.floor(Math.random() * 100) + 50;
        const dailyCounts: EventData[] = [];
        const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
        
        for (let i = 0; i < days; i++) {
          const date = new Date();
          date.setDate(date.getDate() - (days - i));
          dailyCounts.push({
            date: date.toISOString().split('T')[0],
            count: Math.floor(Math.random() * 10) + 1
          });
        }
        
        return {
          totalCount: registrationCount,
          dailyCounts
        };
      } catch (error) {
        console.error('Error al obtener registros de usuarios:', error);
        return { totalCount: 0, dailyCounts: [] };
      }
    }
  });

  // Fetch cart abandonments
  const { data: cartAbandonmentData, isLoading: cartAbandonmentLoading } = useQuery({
    queryKey: ['cart-abandonment', timeRange],
    queryFn: async () => {
      try {
        const range = getDateRange();
        
        // Para demo, usamos datos simulados
        // En producción, usar:
        // const { data, error } = await supabase.rpc('get_event_metrics', {
        //   event_type: 'cart_abandon',
        //   start_date: range.startDate.toISOString(),
        //   end_date: range.endDate.toISOString()
        // });
        
        // Datos simulados para la demo
        const totalCount = Math.floor(Math.random() * 30) + 20;
        const uniqueUsers = Math.floor(totalCount * 0.7);
        const dailyCounts: EventData[] = [];
        const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
        
        for (let i = 0; i < days; i++) {
          const date = new Date();
          date.setDate(date.getDate() - (days - i));
          const count = Math.floor(Math.random() * 5);
          dailyCounts.push({
            date: date.toISOString().split('T')[0],
            count,
            uniqueUsers: Math.floor(count * 0.8)
          });
        }
        
        return {
          totalCount,
          uniqueUsers,
          dailyCounts
        };
      } catch (error) {
        console.error('Error al obtener datos de abandonos de carrito:', error);
        return { totalCount: 0, uniqueUsers: 0, dailyCounts: [] };
      }
    }
  });

  // Fetch loyal users data
  const { data: loyalUsersData, isLoading: loyalUsersLoading } = useQuery({
    queryKey: ['loyal-users', timeRange],
    queryFn: async () => {
      try {
        const range = getDateRange();
        
        // Para demo, usamos datos simulados
        // En producción, usar:
        // const { data, error } = await supabase.rpc('get_loyal_user_metrics', {
        //   min_visits: 3,
        //   start_date: range.startDate.toISOString(),
        //   end_date: range.endDate.toISOString()
        // });
        
        // Datos simulados para la demo
        const loyalUsersCount = Math.floor(Math.random() * 50) + 20;
        
        return {
          count: loyalUsersCount,
          percentageOfTotal: Math.floor(Math.random() * 20) + 10,
          visitDistribution: [
            { visits: '3-5', count: Math.floor(loyalUsersCount * 0.5) },
            { visits: '6-10', count: Math.floor(loyalUsersCount * 0.3) },
            { visits: '10+', count: Math.floor(loyalUsersCount * 0.2) }
          ]
        };
      } catch (error) {
        console.error('Error al obtener datos de usuarios fieles:', error);
        return { count: 0, percentageOfTotal: 0, visitDistribution: [] };
      }
    }
  });

  // Fetch WhatsApp clicks data
  const { data: whatsappClicksData, isLoading: whatsappClicksLoading } = useQuery({
    queryKey: ['whatsapp-clicks', timeRange],
    queryFn: async () => {
      try {
        const range = getDateRange();
        
        // Para demo, usamos datos simulados
        // En producción, usar:
        // const { data, error } = await supabase.rpc('get_event_metrics', {
        //   event_type: 'whatsapp_click',
        //   start_date: range.startDate.toISOString(),
        //   end_date: range.endDate.toISOString()
        // });
        
        // Datos simulados para la demo
        const totalClicks = Math.floor(Math.random() * 200) + 100;
        const conversionRate = Math.floor(Math.random() * 30) + 10;
        const dailyClicks: EventData[] = [];
        const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
        
        for (let i = 0; i < days; i++) {
          const date = new Date();
          date.setDate(date.getDate() - (days - i));
          dailyClicks.push({
            date: date.toISOString().split('T')[0],
            count: Math.floor(Math.random() * 15) + 1
          });
        }
        
        // Top products by clicks
        const topProducts = [
          { name: 'Smartphone X-2000', clicks: Math.floor(Math.random() * 40) + 30 },
          { name: 'Laptop UltraBook Pro', clicks: Math.floor(Math.random() * 30) + 20 },
          { name: 'Audífonos Elite', clicks: Math.floor(Math.random() * 20) + 15 },
          { name: 'Smartwatch Fitness', clicks: Math.floor(Math.random() * 15) + 10 },
          { name: 'Cámara 4K ProShot', clicks: Math.floor(Math.random() * 10) + 5 }
        ];
        
        return {
          totalClicks,
          conversionRate,
          dailyClicks,
          topProducts
        };
      } catch (error) {
        console.error('Error al obtener datos de clics en WhatsApp:', error);
        return { totalClicks: 0, conversionRate: 0, dailyClicks: [], topProducts: [] };
      }
    }
  });

  const isLoading = registrationsLoading || cartAbandonmentLoading || loyalUsersLoading || whatsappClicksLoading;

  // Prepare metrics cards data
  const metricCards: MetricCard[] = [
    {
      title: 'Usuarios Registrados',
      value: registrationsData?.totalCount || 0,
      change: 12.5,
      icon: <Users className="h-6 w-6 text-blue-500" />
    },
    {
      title: 'Carritos Abandonados',
      value: cartAbandonmentData?.totalCount || 0,
      change: -8.3,
      icon: <ShoppingCart className="h-6 w-6 text-orange-500" />
    },
    {
      title: 'Usuarios Fieles',
      value: loyalUsersData?.count || 0,
      change: 5.7,
      icon: <UserCheck className="h-6 w-6 text-green-500" />
    },
    {
      title: 'Clics en WhatsApp',
      value: whatsappClicksData?.totalClicks || 0,
      change: 15.2,
      icon: <Activity className="h-6 w-6 text-purple-500" />
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short' }).format(date);
  };

  const colors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seguimiento de Experiencia de Usuario</CardTitle>
        <CardDescription>
          Análisis del comportamiento y engagement de usuarios en tu sitio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <div className="space-y-1 w-44">
            <Label htmlFor="timeRange">Rango de tiempo</Label>
            <Select value={timeRange} onValueChange={(value: '7d' | '30d' | '90d') => setTimeRange(value)}>
              <SelectTrigger id="timeRange">
                <SelectValue placeholder="Selecciona período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Últimos 7 días</SelectItem>
                <SelectItem value="30d">Últimos 30 días</SelectItem>
                <SelectItem value="90d">Últimos 90 días</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {metricCards.map((card, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                    <p className="text-2xl font-bold mt-1">{card.value}</p>
                    {card.change !== undefined && (
                      <p className={`text-xs mt-1 ${card.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {card.change >= 0 ? '+' : ''}{card.change}% vs. período anterior
                      </p>
                    )}
                  </div>
                  <div className="rounded-full bg-muted p-2">
                    {card.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Tabs 
          value={selectedView}
          onValueChange={setSelectedView}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="overview">Visión General</TabsTrigger>
            <TabsTrigger value="registrations">Registros</TabsTrigger>
            <TabsTrigger value="cart">Carritos</TabsTrigger>
            <TabsTrigger value="loyal">Usuarios Fieles</TabsTrigger>
            <TabsTrigger value="whatsapp">Conversión WhatsApp</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardContent className="pt-6 space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Registros de Usuarios vs. Clics en WhatsApp</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={formatDate}
                        allowDuplicatedCategory={false}
                      />
                      <YAxis />
                      <Tooltip labelFormatter={(label) => `Fecha: ${formatDate(label)}`} />
                      <Legend />
                      <Line 
                        name="Registros de Usuario" 
                        data={registrationsData?.dailyCounts || []} 
                        type="monotone" 
                        dataKey="count" 
                        stroke="#8884d8" 
                      />
                      <Line 
                        name="Clics en WhatsApp" 
                        data={whatsappClicksData?.dailyClicks || []} 
                        type="monotone" 
                        dataKey="count" 
                        stroke="#82ca9d" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Distribución de Usuarios Fieles</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={loyalUsersData?.visitDistribution || []}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ visits, percent }) => `${visits}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                          nameKey="visits"
                        >
                          {(loyalUsersData?.visitDistribution || []).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => [`${value} usuarios`, 'Cantidad']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Top Productos por Clics en WhatsApp</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart 
                        layout="vertical" 
                        data={whatsappClicksData?.topProducts || []}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis 
                          type="category" 
                          dataKey="name" 
                          width={150}
                          tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value} 
                        />
                        <Tooltip />
                        <Bar dataKey="clicks" fill="#8884d8" name="Clics" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="registrations">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Tendencia de Registros de Usuarios</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart 
                    data={registrationsData?.dailyCounts || []} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={formatDate} 
                    />
                    <YAxis />
                    <Tooltip labelFormatter={(label) => `Fecha: ${formatDate(label)}`} />
                    <Legend />
                    <Bar dataKey="count" name="Registros" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
                
                <div className="mt-8 bg-muted p-4 rounded-md">
                  <h4 className="text-md font-medium mb-2">Insights:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Total de registros en este período: <span className="font-medium">{registrationsData?.totalCount || 0}</span></li>
                    <li>Promedio diario: <span className="font-medium">
                      {registrationsData?.dailyCounts 
                        ? (registrationsData.dailyCounts.reduce((sum, day) => sum + day.count, 0) / registrationsData.dailyCounts.length).toFixed(1)
                        : '0'}
                    </span></li>
                    <li>Día con más registros: <span className="font-medium">
                      {registrationsData?.dailyCounts && registrationsData.dailyCounts.length > 0
                        ? formatDate(registrationsData.dailyCounts.reduce((max, day) => max.count > day.count ? max : day).date)
                        : 'N/A'}
                    </span></li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cart">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Abandonos de Carrito</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart 
                    data={cartAbandonmentData?.dailyCounts || []} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={formatDate} 
                    />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip labelFormatter={(label) => `Fecha: ${formatDate(label)}`} />
                    <Legend />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="count" 
                      name="Total Abandonos" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="uniqueUsers" 
                      name="Usuarios Únicos" 
                      stroke="#82ca9d" 
                    />
                  </LineChart>
                </ResponsiveContainer>
                
                <div className="mt-8 bg-muted p-4 rounded-md">
                  <h4 className="text-md font-medium mb-2">Insights:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Total de abandonos: <span className="font-medium">{cartAbandonmentData?.totalCount || 0}</span></li>
                    <li>Usuarios únicos que abandonaron: <span className="font-medium">{cartAbandonmentData?.uniqueUsers || 0}</span></li>
                    <li>Tasa de abandono estimada: <span className="font-medium">
                      {cartAbandonmentData?.totalCount && registrationsData?.totalCount
                        ? `${((cartAbandonmentData.totalCount / registrationsData.totalCount) * 100).toFixed(1)}%`
                        : 'N/A'}
                    </span></li>
                    <li>Recomendación: Implementar recordatorios por email para recuperar estos carritos abandonados</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="loyal">
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Distribución de Visitas</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={loyalUsersData?.visitDistribution || []}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ visits, percent }) => `${visits} visitas: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="count"
                          nameKey="visits"
                        >
                          {(loyalUsersData?.visitDistribution || []).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => [`${value} usuarios`, 'Cantidad']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Métricas de Usuarios Fieles</h3>
                    <div className="space-y-6">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <h4 className="text-muted-foreground text-sm">Total Usuarios Fieles</h4>
                            <p className="text-3xl font-bold mt-1">{loyalUsersData?.count || 0}</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <h4 className="text-muted-foreground text-sm">% del Total de Usuarios</h4>
                            <p className="text-3xl font-bold mt-1">{loyalUsersData?.percentageOfTotal || 0}%</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="mt-8 bg-muted p-4 rounded-md">
                      <h4 className="text-md font-medium mb-2">Recomendaciones:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Implementar un programa de fidelización para recompensar a los usuarios fieles</li>
                        <li>Ofrecer descuentos exclusivos a este segmento</li>
                        <li>Enviar newsletters personalizados con productos relacionados a sus intereses</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="whatsapp">
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Tendencia de Clics en WhatsApp</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart 
                        data={whatsappClicksData?.dailyClicks || []} 
                        margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={formatDate} 
                        />
                        <YAxis />
                        <Tooltip labelFormatter={(label) => `Fecha: ${formatDate(label)}`} />
                        <Legend />
                        <Bar dataKey="count" name="Clics en WhatsApp" fill="#25D366" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Top Productos por Clics</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart 
                        layout="vertical" 
                        data={whatsappClicksData?.topProducts || []}
                        margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis 
                          type="category" 
                          dataKey="name" 
                          width={150}
                          tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value} 
                        />
                        <Tooltip />
                        <Bar dataKey="clicks" fill="#25D366" name="Clics" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="mt-8 grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <h4 className="text-muted-foreground text-sm">Total de Clics</h4>
                        <p className="text-3xl font-bold mt-1">{whatsappClicksData?.totalClicks || 0}</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <h4 className="text-muted-foreground text-sm">Tasa de Conversión Estimada</h4>
                        <p className="text-3xl font-bold mt-1">{whatsappClicksData?.conversionRate || 0}%</p>
                        <p className="text-xs text-muted-foreground mt-1">Basado en datos históricos de WhatsApp</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-8 bg-muted p-4 rounded-md">
                  <h4 className="text-md font-medium mb-2">Insights y Recomendaciones:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Los productos con mayor interacción en WhatsApp son candidatos para promociones especiales</li>
                    <li>Considerando la tasa de conversión actual, se sugiere mejorar los mensajes pre-configurados</li>
                    <li>Implementar seguimiento de conversaciones para mejorar la experiencia post-clic</li>
                    <li>Ofrecer respuestas rápidas y plantillas para agilizar el proceso de venta</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="justify-between border-t p-6">
        <p className="text-sm text-muted-foreground">
          Los datos mostrados son aproximados y se actualizan cada hora
        </p>
        <p className="text-sm text-muted-foreground">
          Última actualización: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
        </p>
      </CardFooter>
    </Card>
  );
};

export default UserExperienceTracking;
