
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface SalesData {
  period: string;
  sales: number;
}

interface CategoryData {
  name: string;
  value: number;
}

const colors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

const SalesReport = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [timeRange, setTimeRange] = useState('month');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSalesData();
    loadCategoryData();
  }, [timeRange]);

  const loadSalesData = async () => {
    try {
      setIsLoading(true);
      // En un caso real, esta sería una consulta a la base de datos
      // Para esta demo, generamos datos de muestra
      
      // Simulamos diferentes datos según el rango de tiempo seleccionado
      let data: SalesData[] = [];
      
      if (timeRange === 'week') {
        data = [
          { period: 'Lunes', sales: 1200 },
          { period: 'Martes', sales: 1800 },
          { period: 'Miércoles', sales: 1400 },
          { period: 'Jueves', sales: 2000 },
          { period: 'Viernes', sales: 2400 },
          { period: 'Sábado', sales: 1800 },
          { period: 'Domingo', sales: 1200 },
        ];
      } else if (timeRange === 'month') {
        data = [
          { period: 'Semana 1', sales: 6000 },
          { period: 'Semana 2', sales: 7200 },
          { period: 'Semana 3', sales: 8400 },
          { period: 'Semana 4', sales: 9100 },
        ];
      } else {
        data = [
          { period: 'Enero', sales: 24000 },
          { period: 'Febrero', sales: 22000 },
          { period: 'Marzo', sales: 26000 },
          { period: 'Abril', sales: 28000 },
          { period: 'Mayo', sales: 30000 },
          { period: 'Junio', sales: 28000 },
          { period: 'Julio', sales: 32000 },
          { period: 'Agosto', sales: 34000 },
          { period: 'Septiembre', sales: 36000 },
          { period: 'Octubre', sales: 38000 },
          { period: 'Noviembre', sales: 40000 },
          { period: 'Diciembre', sales: 48000 },
        ];
      }
      
      setSalesData(data);
      
    } catch (error) {
      console.error('Error cargando datos de ventas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategoryData = async () => {
    try {
      // En un caso real, esta sería una consulta a la base de datos
      // para obtener ventas por categoría
      
      // Datos de muestra
      const data: CategoryData[] = [
        { name: 'Electronics', value: 35 },
        { name: 'Clothing', value: 20 },
        { name: 'Home', value: 15 },
        { name: 'Beauty', value: 10 },
        { name: 'Sports', value: 8 },
        { name: 'Books', value: 7 },
        { name: 'Other', value: 5 },
      ];
      
      setCategoryData(data);
    } catch (error) {
      console.error('Error cargando datos de categorías:', error);
    }
  };

  const calculateTotalSales = () => {
    return salesData.reduce((total, item) => total + item.sales, 0);
  };

  const calculateAverageSales = () => {
    if (salesData.length === 0) return 0;
    return calculateTotalSales() / salesData.length;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reporte de Ventas</CardTitle>
        <CardDescription>
          Visualización de ventas y análisis de categorías
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <div className="space-y-1 w-44">
            <Label htmlFor="timeRange">Rango de tiempo</Label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger id="timeRange">
                <SelectValue placeholder="Selecciona período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mes</SelectItem>
                <SelectItem value="year">Este año</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-xl font-medium text-muted-foreground">Ventas Totales</h3>
                <p className="text-3xl font-bold mt-2">{formatCurrency(calculateTotalSales())}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-xl font-medium text-muted-foreground">Promedio</h3>
                <p className="text-3xl font-bold mt-2">{formatCurrency(calculateAverageSales())}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-xl font-medium text-muted-foreground">Tendencia</h3>
                <p className="text-3xl font-bold text-green-500 mt-2">+12.5%</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="chart" className="space-y-4">
          <TabsList>
            <TabsTrigger value="chart">Gráfico de Ventas</TabsTrigger>
            <TabsTrigger value="categories">Ventas por Categoría</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chart">
            <Card>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis 
                      tickFormatter={(value) => 
                        new Intl.NumberFormat('es-MX', { 
                          style: 'currency', 
                          currency: 'MXN',
                          notation: 'compact',
                          compactDisplay: 'short'
                        }).format(value)
                      } 
                    />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value as number), 'Ventas']}
                    />
                    <Legend />
                    <Bar dataKey="sales" name="Ventas" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="categories">
            <Card>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SalesReport;
