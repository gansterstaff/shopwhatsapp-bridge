
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface WhatsAppStat {
  product_id: number;
  product_name: string;
  clicks: number;
}

export const useWhatsAppAnalytics = (timeRange: 'day' | 'week' | 'month' = 'week') => {
  const [stats, setStats] = useState<WhatsAppStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalClicks, setTotalClicks] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    
    // En una implementación real, aquí se obtendría los datos de Supabase
    // Para esta demo, usamos datos simulados
    setTimeout(() => {
      try {
        const mockStats = [
          { product_id: 1, product_name: "Smartphone X-2000", clicks: 45 },
          { product_id: 2, product_name: "Laptop UltraBook Pro", clicks: 38 },
          { product_id: 3, product_name: "Audífonos Bluetooth Elite", clicks: 32 },
          { product_id: 4, product_name: "Smartwatch Fitness", clicks: 29 },
          { product_id: 5, product_name: "Cámara 4K ProShot", clicks: 24 },
        ];
        
        // Ajustar los datos según el período seleccionado
        let multiplier = 1;
        if (timeRange === 'day') multiplier = 0.3;
        if (timeRange === 'month') multiplier = 4.2;
        
        const adjustedStats = mockStats.map(stat => ({
          ...stat,
          clicks: Math.round(stat.clicks * multiplier)
        }));
        
        setStats(adjustedStats);
        setTotalClicks(adjustedStats.reduce((sum, stat) => sum + stat.clicks, 0));
        setIsLoading(false);
      } catch (err) {
        console.error("Error al cargar estadísticas de WhatsApp:", err);
        setError(err instanceof Error ? err : new Error('Error desconocido'));
        setIsLoading(false);
      }
    }, 800);
    
  }, [timeRange]);
  
  return { stats, totalClicks, isLoading, error };
};
