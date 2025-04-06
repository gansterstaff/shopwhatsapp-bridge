
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
        // Check if we need to query all events or a specific type
        let query = supabase
          .from('analytics_events')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(limit);
        
        if (eventType) {
          query = query.eq('event_type', eventType);
        }
        
        if (startDate) {
          query = query.gte('timestamp', startDate.toISOString());
        }
        
        if (endDate) {
          query = query.lte('timestamp', endDate.toISOString());
        }
        
        const { data, error: fetchError } = await query;
        
        if (fetchError) {
          throw fetchError;
        }
        
        // Get the total count for this type of event in the specified period
        let totalCountQuery;
        
        if (eventType) {
          // If an eventType is specified, use the get_event_metrics function
          const { data: metricsData, error: metricsError } = await supabase.rpc(
            'get_event_metrics',
            {
              event_type: eventType,
              start_date: startDate ? startDate.toISOString() : new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
              end_date: endDate.toISOString()
            }
          );
          
          if (metricsError) {
            console.warn('Error fetching metrics:', metricsError);
            // We'll still show the data we were able to fetch
          } else if (metricsData && metricsData.length > 0) {
            setTotalCount(metricsData[0].total_count || 0);
          }
        } else {
          // If no specific eventType, just count all events
          const { count: countData, error: countError } = await supabase
            .from('analytics_events')
            .select('*', { count: 'exact', head: true });
          
          if (!countError) {
            setTotalCount(countData || 0);
          }
        }
        
        if (data && data.length > 0) {
          // Map the data to match our AnalyticsEvent interface
          const mappedEvents = data.map((event): AnalyticsEvent => ({
            eventType: event.event_type,
            userId: event.user_id,
            productId: event.product_id,
            productName: event.product_name,
            category: event.category,
            page: event.page,
            referrer: event.referrer,
            searchQuery: event.search_query,
            buttonText: event.button_text,
            sessionId: event.session_id,
            timestamp: event.timestamp
          }));
          
          setEvents(mappedEvents);
        } else {
          // Fall back to demo data if no real data is available
          console.log('No real analytics data found, using demo data');
          
          // Generate mock data similar to the original implementation
          const mockEvents: AnalyticsEvent[] = [];
          const start = startDate || new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
          
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
          
          // Sort by timestamp in descending order to match the database query
          mockEvents.sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          
          setEvents(mockEvents);
          setTotalCount(Math.floor(Math.random() * 500) + 100);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error al obtener eventos analíticos:', err);
        setError(err instanceof Error ? err : new Error('Error desconocido'));
        setIsLoading(false);
        
        // Fall back to demo data in case of error
        const mockEvents: AnalyticsEvent[] = [];
        const start = startDate || new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
        
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
        
        mockEvents.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        
        setEvents(mockEvents);
        setTotalCount(Math.floor(Math.random() * 500) + 100);
      }
    };
    
    fetchEvents();
  }, [eventType, startDate, endDate, groupBy, limit]);
  
  return { events, isLoading, error, totalCount };
};

export default useAnalyticsEvents;
