
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminHeaderProps {
  toggleSidebar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  
  return (
    <header className="h-16 flex items-center border-b bg-white px-4 md:px-6">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSidebar}
        className="md:hidden mr-2"
      >
        <Menu className="h-5 w-5" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSidebar}
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
  );
};

export default AdminHeader;
