
import React from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Home, ShoppingBag, Info, Phone, MessageSquare } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: <Home className="mr-2 h-4 w-4" />, name: 'Inicio', path: '/' },
    { icon: <ShoppingBag className="mr-2 h-4 w-4" />, name: 'Productos', path: '/products' },
    { icon: <Info className="mr-2 h-4 w-4" />, name: 'Nosotros', path: '/about' },
    { icon: <MessageSquare className="mr-2 h-4 w-4" />, name: 'Chat', path: '/chat' },
    { icon: <Phone className="mr-2 h-4 w-4" />, name: 'Contacto', path: '/contact' },
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
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center px-2 py-2 text-sm rounded-md hover:bg-muted"
                onClick={onClose}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
