
import React from 'react';

interface NavItemContentProps {
  title: string;
  description?: string;
  onClick: () => void;
}

const NavItemContent: React.FC<NavItemContentProps> = ({ title, description, onClick }) => {
  return (
    <div 
      className="flex items-center p-2 rounded-md hover:bg-muted cursor-pointer"
      onClick={onClick}
    >
      <div className="w-full">
        <div className="text-sm font-medium">{title}</div>
        {description && (
          <div className="text-xs text-muted-foreground">{description}</div>
        )}
      </div>
    </div>
  );
};

export default NavItemContent;
