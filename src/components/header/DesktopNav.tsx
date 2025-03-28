
import React from 'react';
import { Link } from 'react-router-dom';

const DesktopNav: React.FC = () => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Link to="/" className="nav-link font-medium text-sm">
        Home
      </Link>
      <Link to="/products" className="nav-link font-medium text-sm">
        Productos
      </Link>
      <Link to="/about" className="nav-link font-medium text-sm">
        Nosotros
      </Link>
      <Link to="/contact" className="nav-link font-medium text-sm">
        Contacto
      </Link>
    </nav>
  );
};

export default DesktopNav;
