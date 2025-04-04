
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

interface NavAdminLinkProps {
  isAdmin: boolean;
}

const NavAdminLink: React.FC<NavAdminLinkProps> = ({ isAdmin }) => {
  if (!isAdmin) return null;
  
  return (
    <Link
      to="/admin"
      className="ml-6 text-sm font-medium text-primary flex items-center transition-colors hover:text-primary/80"
    >
      <ShieldCheck className="mr-1 h-4 w-4" />
      Admin
    </Link>
  );
};

export default NavAdminLink;
