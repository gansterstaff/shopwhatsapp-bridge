
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, ChevronDown } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const DesktopNav: React.FC = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  
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

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="space-x-2">
        {/* Inicio */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-9 px-4 py-2">
            Inicio
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-background p-4 rounded-md shadow-md">
            <div className="grid gap-3 w-[400px]">
              <NavigationMenuLink asChild>
                <Link to="/" className="flex items-center p-2 rounded-md hover:bg-muted">
                  <div>
                    <div className="text-sm font-medium">Página Principal</div>
                    <div className="text-xs text-muted-foreground">Volver a la página de inicio</div>
                  </div>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/#products" className="flex items-center p-2 rounded-md hover:bg-muted">
                  <div>
                    <div className="text-sm font-medium">Destacados</div>
                    <div className="text-xs text-muted-foreground">Productos destacados del momento</div>
                  </div>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/#testimonials" className="flex items-center p-2 rounded-md hover:bg-muted">
                  <div>
                    <div className="text-sm font-medium">Testimonios</div>
                    <div className="text-xs text-muted-foreground">Lo que dicen nuestros clientes</div>
                  </div>
                </Link>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Productos */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-9 px-4 py-2">
            Productos
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-background p-4 rounded-md shadow-md">
            <div className="grid gap-3 w-[400px] md:w-[500px] lg:w-[600px]">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <h4 className="text-sm font-medium mb-1 text-primary">Categorías</h4>
                  <NavigationMenuLink asChild>
                    <Link to="/products?category=electronics" className="block p-2 rounded-md hover:bg-muted">
                      <div className="text-sm">Electrónicos</div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="/products?category=clothing" className="block p-2 rounded-md hover:bg-muted">
                      <div className="text-sm">Ropa</div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="/products?category=home" className="block p-2 rounded-md hover:bg-muted">
                      <div className="text-sm">Hogar</div>
                    </Link>
                  </NavigationMenuLink>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1 text-primary">Colecciones</h4>
                  <NavigationMenuLink asChild>
                    <Link to="/products?collection=new" className="block p-2 rounded-md hover:bg-muted">
                      <div className="text-sm">Novedades</div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="/products?collection=bestsellers" className="block p-2 rounded-md hover:bg-muted">
                      <div className="text-sm">Más Vendidos</div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="/products?collection=promotion" className="block p-2 rounded-md hover:bg-muted">
                      <div className="text-sm">Promociones</div>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </div>
              <div className="mt-3 border-t pt-3">
                <NavigationMenuLink asChild>
                  <Link to="/products" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80">
                    Ver todos los productos
                    <ChevronDown className="ml-1 h-3 w-3 rotate-[-90deg]" />
                  </Link>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Nosotros */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-9 px-4 py-2">
            Nosotros
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-background p-4 rounded-md shadow-md">
            <div className="grid gap-3 w-[400px]">
              <NavigationMenuLink asChild>
                <Link to="/about" className="flex items-center p-2 rounded-md hover:bg-muted">
                  <div>
                    <div className="text-sm font-medium">Nuestra Historia</div>
                    <div className="text-xs text-muted-foreground">Conoce nuestros orígenes y misión</div>
                  </div>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/about#team" className="flex items-center p-2 rounded-md hover:bg-muted">
                  <div>
                    <div className="text-sm font-medium">Equipo</div>
                    <div className="text-xs text-muted-foreground">Las personas detrás de ShopWhats</div>
                  </div>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/about#values" className="flex items-center p-2 rounded-md hover:bg-muted">
                  <div>
                    <div className="text-sm font-medium">Valores</div>
                    <div className="text-xs text-muted-foreground">Nuestro compromiso contigo</div>
                  </div>
                </Link>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Chat */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-9 px-4 py-2">
            Chat
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-background p-4 rounded-md shadow-md">
            <div className="grid gap-3 w-[400px]">
              <NavigationMenuLink asChild>
                <Link to="/chat" className="flex items-center p-2 rounded-md hover:bg-muted">
                  <div>
                    <div className="text-sm font-medium">Chat en Vivo</div>
                    <div className="text-xs text-muted-foreground">Habla con nuestro equipo de soporte</div>
                  </div>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/support" className="flex items-center p-2 rounded-md hover:bg-muted">
                  <div>
                    <div className="text-sm font-medium">Centro de Ayuda</div>
                    <div className="text-xs text-muted-foreground">Preguntas frecuentes y guías</div>
                  </div>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/contact" className="flex items-center p-2 rounded-md hover:bg-muted">
                  <div>
                    <div className="text-sm font-medium">WhatsApp Directo</div>
                    <div className="text-xs text-muted-foreground">Contacta con un asesor por WhatsApp</div>
                  </div>
                </Link>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Contacto */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-9 px-4 py-2">
            Contacto
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-background p-4 rounded-md shadow-md">
            <div className="grid gap-3 w-[400px]">
              <NavigationMenuLink asChild>
                <Link to="/contact" className="flex items-center p-2 rounded-md hover:bg-muted">
                  <div>
                    <div className="text-sm font-medium">Formulario de Contacto</div>
                    <div className="text-xs text-muted-foreground">Envíanos un mensaje directo</div>
                  </div>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/contact#locations" className="flex items-center p-2 rounded-md hover:bg-muted">
                  <div>
                    <div className="text-sm font-medium">Nuestras Ubicaciones</div>
                    <div className="text-xs text-muted-foreground">Encuentra nuestra tienda más cercana</div>
                  </div>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/contact#business" className="flex items-center p-2 rounded-md hover:bg-muted">
                  <div>
                    <div className="text-sm font-medium">Oportunidades de Negocio</div>
                    <div className="text-xs text-muted-foreground">Información para distribuidores</div>
                  </div>
                </Link>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      
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
    </NavigationMenu>
  );
};

export default DesktopNav;
