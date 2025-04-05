
// Funciones para registrar interacciones de usuario y enviar a una base de datos o servicio de analíticas

import { supabase } from '@/lib/supabase';

export interface AnalyticsEvent {
  eventType: string;
  productId?: number;
  productName?: string;
  category?: string;
  page?: string;
  referrer?: string;
  searchQuery?: string;
  buttonText?: string;
  userId?: string;
  sessionId?: string;
  timestamp: string;
}

// Generar un ID de sesión único para el usuario actual
export const generateSessionId = (): string => {
  // Intentar obtener un sessionId existente del almacenamiento local
  const existingSessionId = localStorage.getItem('analytics_session_id');
  if (existingSessionId) return existingSessionId;
  
  // Si no existe, crear uno nuevo
  const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  localStorage.setItem('analytics_session_id', newSessionId);
  return newSessionId;
};

// Función para registrar un evento de analíticas
export const trackEvent = async (event: Omit<AnalyticsEvent, 'timestamp' | 'sessionId'>) => {
  try {
    const sessionId = generateSessionId();
    const timestamp = new Date().toISOString();
    
    // Registrar el evento en la consola (para desarrollo)
    console.log('Evento de analíticas:', { ...event, sessionId, timestamp });
    
    // Aquí puedes enviar el evento a una base de datos, API o servicio de analíticas
    // En una implementación real, esto podría ser Supabase, Firebase Analytics, Google Analytics, etc.
    
    // Ejemplo de envío a Supabase (requiere crear una tabla 'analytics_events')
    /*
    const { error } = await supabase
      .from('analytics_events')
      .insert([{ ...event, sessionId, timestamp }]);
      
    if (error) throw error;
    */
    
    // Otra opción es enviar a un servicio de analíticas externo usando fetch
    /*
    await fetch('https://tu-api-de-analiticas.com/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...event, sessionId, timestamp }),
    });
    */
    
    return true;
  } catch (error) {
    console.error('Error al registrar evento de analíticas:', error);
    return false;
  }
};

// Función específica para registrar clics en botones de WhatsApp
export const trackWhatsAppClick = (productId: number, productName: string, category: string) => {
  return trackEvent({
    eventType: 'whatsapp_click',
    productId,
    productName,
    category,
    page: window.location.pathname,
    referrer: document.referrer,
  });
};

// Función para registrar vistas de producto
export const trackProductView = (productId: number, productName: string, category: string) => {
  return trackEvent({
    eventType: 'product_view',
    productId,
    productName,
    category,
    page: window.location.pathname,
    referrer: document.referrer,
  });
};

// Función para registrar búsquedas
export const trackSearch = (searchQuery: string) => {
  return trackEvent({
    eventType: 'search',
    searchQuery,
    page: window.location.pathname,
  });
};

// Función para registrar fuente de tráfico
export const trackTrafficSource = () => {
  const referrer = document.referrer;
  let source = 'direct';
  
  if (referrer) {
    const url = new URL(referrer);
    if (url.hostname.includes('google')) {
      source = 'google';
    } else if (url.hostname.includes('facebook')) {
      source = 'facebook';
    } else if (url.hostname.includes('instagram')) {
      source = 'instagram';
    } else if (url.hostname.includes('twitter') || url.hostname.includes('x.com')) {
      source = 'twitter';
    } else {
      source = 'referral';
    }
  }
  
  return trackEvent({
    eventType: 'page_view',
    page: window.location.pathname,
    referrer: source,
  });
};
