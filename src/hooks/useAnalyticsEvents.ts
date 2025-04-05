
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { AnalyticsEvent } from '@/lib/analytics';

interface UseAnalyticsEventsProps {
  eventType?: string;
  startDate?: Date;
  endDate?: Date;
  groupBy?: 'day' | 'week' | 'month';
  limit?: number;
}

export const useAnalyticsEvents = ({
  eventType,
  startDate,
  endDate = new Date(),
  groupBy = 'day',
  limit = 50
}: UseAnalyticsEventsProps = {}) => {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      
      try {
        // En una implementación real, obtendríamos los datos de analytics_events
        // Para esta demo, simulamos datos
        setTimeout(() => {
          // Generar datos de ejemplo basados en los parámetros
          const mockEvents: AnalyticsEvent[] = [];
          const start = startDate || new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 días antes por defecto
          
          // Crear registros simulados
          for (let i = 0; i < Math.min(25, limit); i++) {
            const eventDate = new Date(
              start.getTime() + Math.random() * (endDate.getTime() - start.getTime())
            );
            
            mockEvents.push({
              eventType: eventType || ['page_view', 'product_view', 'whatsapp_click', 'search'][Math.floor(Math.random() * 4)],
              userId: `user_${Math.floor(Math.random() * 100)}`,
              productId: Math.floor(Math.random() * 20) + 1,
              productName: `Producto ${Math.floor(Math.random() * 20) + 1}`,
              category: ['Electronics', 'Phones', 'Computers', 'Accessories'][Math.floor(Math.random() * 4)],
              page: `/product/${Math.floor(Math.random() * 20) + 1}`,
              referrer: ['google', 'facebook', 'direct', 'instagram'][Math.floor(Math.random() * 4)],
              timestamp: eventDate.toISOString(),
              sessionId: `session_${Math.floor(Math.random() * 50)}`
            });
          }
          
          // Ordenar por timestamp
          mockEvents.sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          
          setEvents(mockEvents);
          setTotalCount(Math.floor(Math.random() * 500) + 100);
          setIsLoading(false);
        }, 800);
        
      } catch (err) {
        console.error('Error al obtener eventos analíticos:', err);
        setError(err instanceof Error ? err : new Error('Error desconocido'));
        setIsLoading(false);
      }
    };
    
    fetchEvents();
  }, [eventType, startDate, endDate, groupBy, limit]);
  
  return { events, isLoading, error, totalCount };
};

export default useAnalyticsEvents;
