
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, Package, UserRound, ShoppingBag, 
  FileBarChart, Settings, Menu, X, LogOut
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const AdminLayout = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('name, role')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (data?.role !== 'admin') {
          navigate('/');
          return;
        }
        
        setUserName(data.name || user.email?.split('@')[0] || 'Admin');
        setUserRole(data.role);
      } catch (error) {
        console.error('Error verificando permisos de administrador:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      href: '/admin'
    },
    {
      icon: Package,
      label: 'Productos',
      href: '/admin/products'
    },
    {
      icon: ShoppingBag,
      label: 'Pedidos',
      href: '/admin/orders'
    },
    {
      icon: UserRound,
      label: 'Usuarios',
      href: '/admin/users'
    },
    {
      icon: FileBarChart,
      label: 'Reportes',
      href: '/admin/reports'
    },
    {
      icon: Settings,
      label: 'Configuración',
      href: '/admin/settings'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex flex-col bg-white shadow-lg transition-all duration-300 md:relative",
          isSidebarOpen ? "w-64" : "w-0 md:w-20 overflow-hidden"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          {isSidebarOpen ? (
            <Link to="/admin" className="font-bold text-xl">
              ShopWhats Admin
            </Link>
          ) : (
            <span className="font-bold text-xl mx-auto">SW</span>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <Separator />
        
        <ScrollArea className="flex-1 py-4">
          <nav className="px-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center py-3 px-3 rounded-md text-gray-700 hover:bg-gray-100 transition-colors",
                  location.pathname === item.href && "bg-gray-100 text-primary"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5",
                  isSidebarOpen ? "mr-3" : "mx-auto"
                )} />
                {isSidebarOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        </ScrollArea>
        
        <Separator />
        
        <div className="p-4">
          {isSidebarOpen ? (
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback>
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="font-medium truncate">{userName}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleSignOut}
                className="text-gray-500 hover:text-red-500"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleSignOut}
                className="text-gray-500 hover:text-red-500"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 flex items-center border-b bg-white px-4 md:px-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden mr-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden md:flex"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="ml-auto flex items-center space-x-2">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="text-sm"
            >
              Ver Tienda
            </Button>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
      
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-10 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
