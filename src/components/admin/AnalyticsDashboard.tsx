
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, MousePointer, ArrowRight, Phone, BarChart3, Filter } from 'lucide-react';

// Datos de muestra para las gráficas
const whatsappClicksData = [
  { name: 'Lunes', clicks: 34 },
  { name: 'Martes', clicks: 45 },
  { name: 'Miércoles', clicks: 31 },
  { name: 'Jueves', clicks: 58 },
  { name: 'Viernes', clicks: 63 },
  { name: 'Sábado', clicks: 48 },
  { name: 'Domingo', clicks: 25 },
];

const productEngagementData = [
  { name: 'Audífonos Bluetooth', engagement: 78 },
  { name: 'Smartwatch Pro', engagement: 65 },
  { name: 'Cámara 4K', engagement: 42 },
  { name: 'Altavoz Portátil', engagement: 38 },
  { name: 'Laptop Gaming', engagement: 86 },
];

const trafficSourceData = [
  { name: 'Búsqueda Orgánica', value: 45 },
  { name: 'Redes Sociales', value: 28 },
  { name: 'Directo', value: 15 },
  { name: 'Referencias', value: 8 },
  { name: 'Email', value: 4 },
];

const conversionFunnelData = [
  { name: 'Visitas', value: 1000 },
  { name: 'Vistas de Producto', value: 580 },
  { name: 'Click en WhatsApp', value: 145 },
  { name: 'Mensajes Enviados', value: 95 },
];

const productCategoryInterestData = [
  { name: 'Electrónica', value: 40 },
  { name: 'Wearables', value: 25 },
  { name: 'Computadoras', value: 20 },
  { name: 'Teléfonos', value: 10 },
  { name: 'Accesorios', value: 5 },
];

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [activePeriod, setActivePeriod] = useState('today');

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat().format(value);
  };

  // Función para generar datos simulados según el período seleccionado
  const getDataByPeriod = (period: string) => {
    // En un caso real, aquí harías una consulta a la base de datos
    // o a un servicio de analíticas según el período
    
    // Para esta demo, simplemente modificamos los datos existentes
    const multiplier = period === 'today' ? 1 : period === 'week' ? 7 : period === 'month' ? 30 : 365;
    
    return {
      totalVisits: 1245 * (multiplier / 7),
      totalEngagement: 532 * (multiplier / 7),
      whatsappClicks: 145 * (multiplier / 7),
      conversionRate: 11.6,
    };
  };

  const currentData = getDataByPeriod(activePeriod);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Dashboard de Analíticas</CardTitle>
        <CardDescription>
          Métricas de engagement y conversión a WhatsApp
        </CardDescription>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <TabsList>
              <TabsTrigger 
                value="today" 
                className={activePeriod === 'today' ? 'data-[state=active]:bg-primary' : ''}
                onClick={() => setActivePeriod('today')}
              >
                Hoy
              </TabsTrigger>
              <TabsTrigger 
                value="week" 
                className={activePeriod === 'week' ? 'data-[state=active]:bg-primary' : ''}
                onClick={() => setActivePeriod('week')}
              >
                Semana
              </TabsTrigger>
              <TabsTrigger 
                value="month" 
                className={activePeriod === 'month' ? 'data-[state=active]:bg-primary' : ''}
                onClick={() => setActivePeriod('month')}
              >
                Mes
              </TabsTrigger>
              <TabsTrigger 
                value="year" 
                className={activePeriod === 'year' ? 'data-[state=active]:bg-primary' : ''}
                onClick={() => setActivePeriod('year')}
              >
                Año
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filtrar por:</span>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoy</SelectItem>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mes</SelectItem>
                <SelectItem value="year">Este año</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Users className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-sm font-medium text-muted-foreground">Visitas Totales</h3>
                <p className="text-3xl font-bold mt-1">{formatNumber(Math.round(currentData.totalVisits))}</p>
                <div className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5%
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <MousePointer className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-sm font-medium text-muted-foreground">Engagement</h3>
                <p className="text-3xl font-bold mt-1">{formatNumber(Math.round(currentData.totalEngagement))}</p>
                <div className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8.2%
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Phone className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-sm font-medium text-muted-foreground">Clicks WhatsApp</h3>
                <p className="text-3xl font-bold mt-1">{formatNumber(Math.round(currentData.whatsappClicks))}</p>
                <div className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15.3%
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <ArrowRight className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-sm font-medium text-muted-foreground">Tasa de Conversión</h3>
                <p className="text-3xl font-bold mt-1">{currentData.conversionRate}%</p>
                <div className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2.1%
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="whatsapp_clicks" className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="whatsapp_clicks">Clicks de WhatsApp</TabsTrigger>
            <TabsTrigger value="engagement">Engagement por Producto</TabsTrigger>
            <TabsTrigger value="funnel">Embudo de Conversión</TabsTrigger>
          </TabsList>
          
          <TabsContent value="whatsapp_clicks">
            <Card>
              <CardHeader>
                <CardTitle>Clicks en Botones de WhatsApp</CardTitle>
                <CardDescription>Cantidad de veces que los usuarios hacen click en botones de WhatsApp</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={whatsappClicksData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} clicks`, 'Clicks']} />
                    <Legend />
                    <Bar dataKey="clicks" name="Clicks de WhatsApp" fill="#4CAF50" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="engagement">
            <Card>
              <CardHeader>
                <CardTitle>Engagement por Producto</CardTitle>
                <CardDescription>Productos con más interacciones (vistas, clicks, tiempo)</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={productEngagementData} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip formatter={(value) => [`${value} puntos`, 'Engagement']} />
                    <Legend />
                    <Bar dataKey="engagement" name="Puntos de Engagement" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="funnel">
            <Card>
              <CardHeader>
                <CardTitle>Embudo de Conversión</CardTitle>
                <CardDescription>Seguimiento del recorrido del usuario hasta el contacto por WhatsApp</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={conversionFunnelData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value} usuarios`, 'Cantidad']} />
                        <Legend />
                        <Line type="monotone" dataKey="value" name="Usuarios" stroke="#8884d8" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-4">Interés por Categoría</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={productCategoryInterestData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {productCategoryInterestData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Fuentes de Tráfico</CardTitle>
              <CardDescription>De dónde vienen nuestros visitantes</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={trafficSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {trafficSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Productos Más Vistos</CardTitle>
              <CardDescription>Productos que generan más interés</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productEngagementData.slice(0, 5).map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(product.engagement / 100) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <span className="text-sm font-semibold">{product.engagement} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsDashboard;
