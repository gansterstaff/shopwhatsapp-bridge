
import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface MobileAdminLinkProps {
  isAdmin: boolean;
  onClick: () => void;
}

const MobileAdminLink: React.FC<MobileAdminLinkProps> = ({ isAdmin, onClick }) => {
  if (!isAdmin) return null;
  
  return (
    <div
      className="flex items-center px-2 py-2 text-sm rounded-md text-primary hover:bg-muted cursor-pointer"
      onClick={onClick}
    >
      <ShieldCheck className="mr-2 h-4 w-4" />
      Panel de Administración
    </div>
  );
};

export default MobileAdminLink;
