
import React from 'react';

interface NavDropdownProps {
  isOpen: boolean;
  content: React.ReactNode;
}

const NavDropdown: React.FC<NavDropdownProps> = ({ isOpen, content }) => {
  if (!isOpen || !content) return null;
  
  return (
    <div className="absolute top-full mt-1 left-0 z-10 bg-background p-4 rounded-md shadow-md animate-in fade-in slide-in-from-top-5 duration-300">
      {content}
    </div>
  );
};

export default NavDropdown;
