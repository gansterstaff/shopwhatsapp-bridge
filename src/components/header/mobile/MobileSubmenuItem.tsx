
import React from 'react';

interface MobileSubmenuItemProps {
  name: string;
  onClick: () => void;
}

const MobileSubmenuItem: React.FC<MobileSubmenuItemProps> = ({ name, onClick }) => {
  return (
    <div
      className="flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-muted cursor-pointer"
      onClick={onClick}
    >
      {name}
    </div>
  );
};

export default MobileSubmenuItem;
