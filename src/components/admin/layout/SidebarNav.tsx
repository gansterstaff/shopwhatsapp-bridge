
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, Package, UserRound, ShoppingBag, 
  FileBarChart, Settings
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

interface SidebarNavProps {
  isSidebarOpen: boolean;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ isSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems: NavItem[] = [
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
      href: '/settings'
    }
  ];

  // Controla la navegación especial para configuración (que sale del admin layout)
  const handleNavigation = (href: string) => {
    navigate(href);
  };

  return (
    <ScrollArea className="flex-1 py-4">
      <nav className="px-2 space-y-1">
        {navItems.map((item) => (
          <div
            key={item.href}
            onClick={() => handleNavigation(item.href)}
            className={cn(
              "flex items-center py-3 px-3 rounded-md text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer",
              location.pathname === item.href && "bg-gray-100 text-primary"
            )}
          >
            <item.icon className={cn(
              "h-5 w-5",
              isSidebarOpen ? "mr-3" : "mx-auto"
            )} />
            {isSidebarOpen && <span>{item.label}</span>}
          </div>
        ))}
      </nav>
    </ScrollArea>
  );
};

export default SidebarNav;
