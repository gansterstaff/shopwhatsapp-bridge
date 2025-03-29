
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link 
      to="/" 
      className="font-heading text-2xl font-semibold tracking-tight hover:text-primary transition-colors"
    >
      ShopWhats
    </Link>
  );
};

export default Logo;
