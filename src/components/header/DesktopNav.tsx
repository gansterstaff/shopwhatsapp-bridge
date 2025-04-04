
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, ChevronDown, Home, ShoppingBag, Users, MessageCircle, Phone } from 'lucide-react';
import { TubelightNavbar } from "@/components/ui/tubelight-navbar";

const DesktopNav: React.FC = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState<string>('Inicio');
  const [currentContent, setCurrentContent] = useState<React.ReactNode | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  
  useEffect(() => {
    const checkUserRole = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();
          
          if (error) {
            console.error('Error al verificar rol de usuario:', error);
            return;
          }
          
          setIsAdmin(data?.role === 'admin');
        } catch (error) {
          console.error('Error al verificar rol de usuario:', error);
        }
      }
    };
    
    checkUserRole();
  }, [user]);

  // Set active nav item based on current path
  useEffect(() => {
    const path = location.pathname;
    if (path === '/' || path.startsWith('/#')) {
      setActiveNavItem('Inicio');
    } else if (path.startsWith('/products')) {
      setActiveNavItem('Productos');
    } else if (path.startsWith('/about')) {
      setActiveNavItem('Nosotros');
    } else if (path.startsWith('/chat')) {
      setActiveNavItem('Chat');
    } else if (path.startsWith('/contact')) {
      setActiveNavItem('Contacto');
    }
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setCurrentContent(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Define navigation items with their dropdown content
  const navItems = [
    {
      name: 'Inicio',
      url: '/',
      icon: Home,
      content: (
        <div className="grid gap-3 w-[400px]">
          <div className="flex items-center p-2 rounded-md hover:bg-muted">
            <Link to="/" className="w-full">
              <div>
                <div className="text-sm font-medium">Página Principal</div>
                <div className="text-xs text-muted-foreground">Volver a la página de inicio</div>
              </div>
            </Link>
          </div>
          <div className="flex items-center p-2 rounded-md hover:bg-muted">
            <Link to="/#products" className="w-full">
              <div>
                <div className="text-sm font-medium">Destacados</div>
                <div className="text-xs text-muted-foreground">Productos destacados del momento</div>
              </div>
            </Link>
          </div>
          <div className="flex items-center p-2 rounded-md hover:bg-muted">
            <Link to="/#testimonials" className="w-full">
              <div>
                <div className="text-sm font-medium">Testimonios</div>
                <div className="text-xs text-muted-foreground">Lo que dicen nuestros clientes</div>
              </div>
            </Link>
          </div>
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
              <div className="block p-2 rounded-md hover:bg-muted">
                <Link to="/products?category=electronics" className="w-full">
                  <div className="text-sm">Electrónicos</div>
                </Link>
              </div>
              <div className="block p-2 rounded-md hover:bg-muted">
                <Link to="/products?category=clothing" className="w-full">
                  <div className="text-sm">Ropa</div>
                </Link>
              </div>
              <div className="block p-2 rounded-md hover:bg-muted">
                <Link to="/products?category=home" className="w-full">
                  <div className="text-sm">Hogar</div>
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1 text-primary">Colecciones</h4>
              <div className="block p-2 rounded-md hover:bg-muted">
                <Link to="/products?collection=new" className="w-full">
                  <div className="text-sm">Novedades</div>
                </Link>
              </div>
              <div className="block p-2 rounded-md hover:bg-muted">
                <Link to="/products?collection=bestsellers" className="w-full">
                  <div className="text-sm">Más Vendidos</div>
                </Link>
              </div>
              <div className="block p-2 rounded-md hover:bg-muted">
                <Link to="/products?collection=promotion" className="w-full">
                  <div className="text-sm">Promociones</div>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-3 border-t pt-3">
            <Link to="/products" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80">
              Ver todos los productos
              <ChevronDown className="ml-1 h-3 w-3 rotate-[-90deg]" />
            </Link>
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
          <div className="flex items-center p-2 rounded-md hover:bg-muted">
            <Link to="/about" className="w-full">
              <div>
                <div className="text-sm font-medium">Nuestra Historia</div>
                <div className="text-xs text-muted-foreground">Conoce nuestros orígenes y misión</div>
              </div>
            </Link>
          </div>
          <div className="flex items-center p-2 rounded-md hover:bg-muted">
            <Link to="/about#team" className="w-full">
              <div>
                <div className="text-sm font-medium">Equipo</div>
                <div className="text-xs text-muted-foreground">Las personas detrás de ShopWhats</div>
              </div>
            </Link>
          </div>
          <div className="flex items-center p-2 rounded-md hover:bg-muted">
            <Link to="/about#values" className="w-full">
              <div>
                <div className="text-sm font-medium">Valores</div>
                <div className="text-xs text-muted-foreground">Nuestro compromiso contigo</div>
              </div>
            </Link>
          </div>
        </div>
      )
    },
    {
      name: 'Chat',
      url: '/chat',
      icon: MessageCircle,
      content: (
        <div className="grid gap-3 w-[400px]">
          <div className="flex items-center p-2 rounded-md hover:bg-muted">
            <Link to="/chat" className="w-full">
              <div>
                <div className="text-sm font-medium">Chat en Vivo</div>
                <div className="text-xs text-muted-foreground">Habla con nuestro equipo de soporte</div>
              </div>
            </Link>
          </div>
          <div className="flex items-center p-2 rounded-md hover:bg-muted">
            <Link to="/support" className="w-full">
              <div>
                <div className="text-sm font-medium">Centro de Ayuda</div>
                <div className="text-xs text-muted-foreground">Preguntas frecuentes y guías</div>
              </div>
            </Link>
          </div>
          <div className="flex items-center p-2 rounded-md hover:bg-muted">
            <Link to="/contact" className="w-full">
              <div>
                <div className="text-sm font-medium">WhatsApp Directo</div>
                <div className="text-xs text-muted-foreground">Contacta con un asesor por WhatsApp</div>
              </div>
            </Link>
          </div>
        </div>
      )
    },
    {
      name: 'Contacto',
      url: '/contact',
      icon: Phone,
      content: (
        <div className="grid gap-3 w-[400px]">
          <div className="flex items-center p-2 rounded-md hover:bg-muted">
            <Link to="/contact" className="w-full">
              <div>
                <div className="text-sm font-medium">Formulario de Contacto</div>
                <div className="text-xs text-muted-foreground">Envíanos un mensaje directo</div>
              </div>
            </Link>
          </div>
          <div className="flex items-center p-2 rounded-md hover:bg-muted">
            <Link to="/contact#locations" className="w-full">
              <div>
                <div className="text-sm font-medium">Nuestras Ubicaciones</div>
                <div className="text-xs text-muted-foreground">Encuentra nuestra tienda más cercana</div>
              </div>
            </Link>
          </div>
          <div className="flex items-center p-2 rounded-md hover:bg-muted">
            <Link to="/contact#business" className="w-full">
              <div>
                <div className="text-sm font-medium">Oportunidades de Negocio</div>
                <div className="text-xs text-muted-foreground">Información para distribuidores</div>
              </div>
            </Link>
          </div>
        </div>
      )
    }
  ];

  const handleNavHover = (item: any) => {
    setActiveNavItem(item.name);
    setCurrentContent(item.content);
    setIsDropdownOpen(true);
  };

  const handleNavLeave = () => {
    setIsDropdownOpen(false);
    setCurrentContent(null);
  };

  const handleMainNavClick = (item: any, event: React.MouseEvent) => {
    // Allow direct navigation when clicking on main nav items
    // Don't prevent default so the Link works
    setActiveNavItem(item.name);
    
    // Toggle dropdown state
    if (activeNavItem === item.name && isDropdownOpen) {
      setIsDropdownOpen(false);
      setCurrentContent(null);
    } else {
      setIsDropdownOpen(true);
      setCurrentContent(item.content);
    }
  };

  return (
    <div 
      className="hidden md:block relative" 
      ref={navRef}
      onMouseLeave={handleNavLeave}
    >
      <TubelightNavbar 
        items={navItems} 
        onNavHover={handleNavHover}
        activeItem={activeNavItem}
        className="mb-1"
        onNavClick={handleMainNavClick}
      />
      
      {isDropdownOpen && currentContent && (
        <div className="absolute top-full mt-1 left-0 z-10 bg-background p-4 rounded-md shadow-md animate-in fade-in slide-in-from-top-5 duration-300">
          {currentContent}
        </div>
      )}
      
      {/* Admin Link */}
      {isAdmin && (
        <Link
          to="/admin"
          className="ml-6 text-sm font-medium text-primary flex items-center transition-colors hover:text-primary/80"
        >
          <ShieldCheck className="mr-1 h-4 w-4" />
          Admin
        </Link>
      )}
    </div>
  );
};

export default DesktopNav;
