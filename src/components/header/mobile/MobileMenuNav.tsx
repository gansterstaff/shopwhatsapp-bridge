
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileMenuItem from './MobileMenuItem';
import MobileSubmenuItem from './MobileSubmenuItem';
import { MenuItem, getMenuItems } from './mobileMenuData';

interface MobileMenuNavProps {
  openItems: Record<string, boolean>;
  toggleItem: (name: string) => void;
  onClose: () => void;
}

const MobileMenuNav: React.FC<MobileMenuNavProps> = ({ 
  openItems, 
  toggleItem, 
  onClose 
}) => {
  const navigate = useNavigate();
  const menuItems = getMenuItems();

  const handleNavigation = (path: string) => {
    console.log("Mobile navigating to:", path);
    navigate(path);
    onClose();
  };

  return (
    <nav className="flex flex-col space-y-3">
      {menuItems.map((item: MenuItem) => (
        <MobileMenuItem
          key={item.name}
          name={item.name}
          icon={item.icon}
          isOpen={openItems[item.name] || false}
          hasSubmenu={!!item.submenu && item.submenu.length > 0}
          toggleItem={() => toggleItem(item.name)}
        >
          {item.submenu && item.submenu.map((subitem) => (
            <MobileSubmenuItem
              key={subitem.name}
              name={subitem.name}
              onClick={() => handleNavigation(subitem.path)}
            />
          ))}
        </MobileMenuItem>
      ))}
    </nav>
  );
};

export default MobileMenuNav;
