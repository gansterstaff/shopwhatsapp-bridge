
import React from 'react';
import { Link } from 'react-router-dom';

const DesktopNav: React.FC = () => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Chat', path: '/chat' },
    { name: 'Contact', path: '/contact' },
  ];
  
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNav;
