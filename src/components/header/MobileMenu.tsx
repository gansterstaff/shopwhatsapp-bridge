
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div 
      className={cn(
        "fixed inset-0 bg-background z-40 transition-transform duration-300 ease-in-out transform md:hidden",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
      style={{ top: '72px' }}
    >
      <nav className="flex flex-col p-6 space-y-6">
        <Link 
          to="/" 
          className="text-lg font-medium p-2 hover:bg-secondary rounded-md transition-colors"
          onClick={onClose}
        >
          Home
        </Link>
        <Link 
          to="/products" 
          className="text-lg font-medium p-2 hover:bg-secondary rounded-md transition-colors"
          onClick={onClose}
        >
          Productos
        </Link>
        <Link 
          to="/about" 
          className="text-lg font-medium p-2 hover:bg-secondary rounded-md transition-colors"
          onClick={onClose}
        >
          Nosotros
        </Link>
        <Link 
          to="/contact" 
          className="text-lg font-medium p-2 hover:bg-secondary rounded-md transition-colors"
          onClick={onClose}
        >
          Contacto
        </Link>
        
        {user ? (
          <>
            <Link 
              to="/profile" 
              className="text-lg font-medium p-2 hover:bg-secondary rounded-md transition-colors"
              onClick={onClose}
            >
              Mi Perfil
            </Link>
            <Link 
              to="/orders" 
              className="text-lg font-medium p-2 hover:bg-secondary rounded-md transition-colors"
              onClick={onClose}
            >
              Mis Pedidos
            </Link>
            <button 
              onClick={() => {
                handleSignOut();
                onClose();
              }}
              className="text-lg font-medium p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors text-left"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link 
            to="/login" 
            className="text-lg font-medium p-2 hover:bg-secondary rounded-md transition-colors"
            onClick={onClose}
          >
            Iniciar sesión
          </Link>
        )}
      </nav>
    </div>
  );
};

export default MobileMenu;
