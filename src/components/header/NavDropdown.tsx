
import React from 'react';

interface NavDropdownProps {
  isOpen: boolean;
  content: React.ReactNode;
  activeItemIndex: number;
}

const NavDropdown: React.FC<NavDropdownProps> = ({ isOpen, content, activeItemIndex }) => {
  if (!isOpen || !content) return null;
  
  // Calculate position based on active item
  const getDropdownPosition = () => {
    switch(activeItemIndex) {
      case 0: // Inicio
        return 'left-0';
      case 1: // Productos
        return 'left-[110px]';
      case 2: // Nosotros
        return 'left-[220px]';
      case 3: // Chat
        return 'left-[330px]';
      case 4: // Contacto
        return 'left-[440px]';
      default:
        return 'left-0';
    }
  };
  
  return (
    <div className={`absolute top-full mt-1 z-10 bg-background p-4 rounded-md shadow-md animate-in fade-in slide-in-from-top-5 duration-300 ${getDropdownPosition()}`}>
      {content}
    </div>
  );
};

export default NavDropdown;
