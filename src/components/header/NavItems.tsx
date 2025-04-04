
import React from 'react';
import { Home, ShoppingBag, Users, MessageCircle, Phone, ChevronDown } from 'lucide-react';
import NavItemContent from './NavItemContent';
import { LucideIcon } from 'lucide-react';

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
  content?: React.ReactNode;
}

interface NavItemsProps {
  handleNavigation: (path: string) => void;
}

const NavItems: React.FC<NavItemsProps> = ({ handleNavigation }) => {
  return [
    {
      name: 'Inicio',
      url: '/',
      icon: Home,
      content: (
        <div className="grid gap-3 w-[400px]">
          <NavItemContent 
            title="Página Principal" 
            description="Volver a la página de inicio" 
            onClick={() => handleNavigation('/')} 
          />
          <NavItemContent 
            title="Destacados" 
            description="Productos destacados del momento" 
            onClick={() => handleNavigation('/#products')} 
          />
          <NavItemContent 
            title="Testimonios" 
            description="Lo que dicen nuestros clientes" 
            onClick={() => handleNavigation('/#testimonials')} 
          />
        </div>
      )
    },
    {
      name: 'Productos',
      url: '/products',
      icon: ShoppingBag,
      content: (
        <div className="grid gap-3 w-[400px] md:w-[500px] lg:w-[600px]">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <h4 className="text-sm font-medium mb-1 text-primary">Categorías</h4>
              <div 
                className="block p-2 rounded-md hover:bg-muted cursor-pointer"
                onClick={() => handleNavigation('/products?category=electronics')}
              >
                <div className="text-sm">Electrónicos</div>
              </div>
              <div 
                className="block p-2 rounded-md hover:bg-muted cursor-pointer"
                onClick={() => handleNavigation('/products?category=clothing')}
              >
                <div className="text-sm">Ropa</div>
              </div>
              <div 
                className="block p-2 rounded-md hover:bg-muted cursor-pointer"
                onClick={() => handleNavigation('/products?category=home')}
              >
                <div className="text-sm">Hogar</div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1 text-primary">Colecciones</h4>
              <div 
                className="block p-2 rounded-md hover:bg-muted cursor-pointer"
                onClick={() => handleNavigation('/products?collection=new')}
              >
                <div className="text-sm">Novedades</div>
              </div>
              <div 
                className="block p-2 rounded-md hover:bg-muted cursor-pointer"
                onClick={() => handleNavigation('/products?collection=bestsellers')}
              >
                <div className="text-sm">Más Vendidos</div>
              </div>
              <div 
                className="block p-2 rounded-md hover:bg-muted cursor-pointer"
                onClick={() => handleNavigation('/products?collection=promotion')}
              >
                <div className="text-sm">Promociones</div>
              </div>
            </div>
          </div>
          <div className="mt-3 border-t pt-3">
            <div 
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 cursor-pointer"
              onClick={() => handleNavigation('/products')}
            >
              Ver todos los productos
              <ChevronDown className="ml-1 h-3 w-3 rotate-[-90deg]" />
            </div>
          </div>
        </div>
      )
    },
    {
      name: 'Nosotros',
      url: '/about',
      icon: Users,
      content: (
        <div className="grid gap-3 w-[400px]">
          <NavItemContent 
            title="Nuestra Historia" 
            description="Conoce nuestros orígenes y misión" 
            onClick={() => handleNavigation('/about')} 
          />
          <NavItemContent 
            title="Equipo" 
            description="Las personas detrás de ShopWhats" 
            onClick={() => handleNavigation('/about#team')} 
          />
          <NavItemContent 
            title="Valores" 
            description="Nuestro compromiso contigo" 
            onClick={() => handleNavigation('/about#values')} 
          />
        </div>
      )
    },
    {
      name: 'Chat',
      url: '/chat',
      icon: MessageCircle,
      content: (
        <div className="grid gap-3 w-[400px]">
          <NavItemContent 
            title="Chat en Vivo" 
            description="Habla con nuestro equipo de soporte" 
            onClick={() => handleNavigation('/chat')} 
          />
          <NavItemContent 
            title="Centro de Ayuda" 
            description="Preguntas frecuentes y guías" 
            onClick={() => handleNavigation('/support')} 
          />
          <NavItemContent 
            title="WhatsApp Directo" 
            description="Contacta con un asesor por WhatsApp" 
            onClick={() => handleNavigation('/contact')} 
          />
        </div>
      )
    },
    {
      name: 'Contacto',
      url: '/contact',
      icon: Phone,
      content: (
        <div className="grid gap-3 w-[400px]">
          <NavItemContent 
            title="Formulario de Contacto" 
            description="Envíanos un mensaje directo" 
            onClick={() => handleNavigation('/contact')} 
          />
          <NavItemContent 
            title="Nuestras Ubicaciones" 
            description="Encuentra nuestra tienda más cercana" 
            onClick={() => handleNavigation('/contact#locations')} 
          />
          <NavItemContent 
            title="Oportunidades de Negocio" 
            description="Información para distribuidores" 
            onClick={() => handleNavigation('/contact#business')} 
          />
        </div>
      )
    }
  ];
};

export default NavItems;
