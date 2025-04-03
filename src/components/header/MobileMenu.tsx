
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { 
  Home, 
  ShoppingBag, 
  Info, 
  Phone, 
  MessageSquare, 
  ShieldCheck,
  ChevronDown,
  ChevronRight 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  icon: React.ReactNode;
  name: string;
  path: string;
  submenu?: {
    name: string;
    path: string;
    description?: string;
  }[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  
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

  const toggleItem = (name: string) => {
    setOpenItems(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const menuItems: MenuItem[] = [
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
        { name: 'Más Vendidos', path: '/products?collection=bestsellers' }
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

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <nav className="flex flex-col space-y-3">
            {menuItems.map((item) => (
              <div key={item.name} className="border-b pb-1">
                <Collapsible
                  open={openItems[item.name]}
                  onOpenChange={() => toggleItem(item.name)}
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full px-2 py-2 text-sm rounded-md hover:bg-muted">
                    <div className="flex items-center">
                      {item.icon}
                      {item.name}
                    </div>
                    {item.submenu && (
                      openItems[item.name] 
                        ? <ChevronDown className="h-4 w-4" /> 
                        : <ChevronRight className="h-4 w-4" />
                    )}
                  </CollapsibleTrigger>
                  
                  {item.submenu && (
                    <CollapsibleContent>
                      <div className="pl-6 mt-1 space-y-1">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            to={subitem.path}
                            className="flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-muted"
                            onClick={onClose}
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    </CollapsibleContent>
                  )}
                </Collapsible>
              </div>
            ))}
            
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center px-2 py-2 text-sm rounded-md text-primary hover:bg-muted"
                onClick={onClose}
              >
                <ShieldCheck className="mr-2 h-4 w-4" />
                Panel de Administración
              </Link>
            )}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
