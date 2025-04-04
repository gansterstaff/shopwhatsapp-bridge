
import React from 'react';
import { 
  Home, 
  ShoppingBag, 
  Info, 
  Phone, 
  MessageSquare 
} from 'lucide-react';

export interface MenuItem {
  icon: React.ReactNode;
  name: string;
  path: string;
  submenu?: {
    name: string;
    path: string;
    description?: string;
  }[];
}

export const getMenuItems = (): MenuItem[] => {
  return [
    { 
      icon: <Home className="mr-2 h-4 w-4" />, 
      name: 'Inicio', 
      path: '/',
      submenu: [
        { name: 'Página Principal', path: '/' },
        { name: 'Destacados', path: '/#products' },
        { name: 'Testimonios', path: '/#testimonials' }
      ]
    },
    { 
      icon: <ShoppingBag className="mr-2 h-4 w-4" />, 
      name: 'Productos', 
      path: '/products',
      submenu: [
        { name: 'Todos los Productos', path: '/products' },
        { name: 'Electrónicos', path: '/products?category=electronics' },
        { name: 'Ropa', path: '/products?category=clothing' },
        { name: 'Hogar', path: '/products?category=home' },
        { name: 'Novedades', path: '/products?collection=new' },
        { name: 'Más Vendidos', path: '/products?collection=bestsellers' },
        { name: 'Promociones', path: '/products?collection=promotion' }
      ]
    },
    { 
      icon: <Info className="mr-2 h-4 w-4" />, 
      name: 'Nosotros', 
      path: '/about',
      submenu: [
        { name: 'Nuestra Historia', path: '/about' },
        { name: 'Equipo', path: '/about#team' },
        { name: 'Valores', path: '/about#values' }
      ]
    },
    { 
      icon: <MessageSquare className="mr-2 h-4 w-4" />, 
      name: 'Chat', 
      path: '/chat',
      submenu: [
        { name: 'Chat en Vivo', path: '/chat' },
        { name: 'Centro de Ayuda', path: '/support' },
        { name: 'WhatsApp Directo', path: '/contact' }
      ]
    },
    { 
      icon: <Phone className="mr-2 h-4 w-4" />, 
      name: 'Contacto', 
      path: '/contact',
      submenu: [
        { name: 'Formulario de Contacto', path: '/contact' },
        { name: 'Nuestras Ubicaciones', path: '/contact#locations' },
        { name: 'Oportunidades de Negocio', path: '/contact#business' }
      ]
    },
  ];
};
