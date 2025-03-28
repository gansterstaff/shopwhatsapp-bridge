
import React from 'react';
import { Search, Menu, X } from 'lucide-react';
import NotificationsPopover from '@/components/NotificationsPopover';
import FavoritesPopover from '@/components/FavoritesPopover';
import CartPopover from './CartPopover';
import UserMenu from './UserMenu';

interface HeaderActionItemsProps {
  openSearch: () => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const HeaderActionItems: React.FC<HeaderActionItemsProps> = ({ 
  openSearch, 
  isMobileMenuOpen, 
  toggleMobileMenu 
}) => {
  return (
    <div className="flex items-center space-x-2">
      <button 
        className="p-2 hover:bg-secondary rounded-full transition-colors"
        onClick={openSearch}
      >
        <Search className="h-5 w-5" />
      </button>

      {/* Notifications */}
      <NotificationsPopover />

      {/* Favorites */}
      <FavoritesPopover />

      {/* Mini Cart */}
      <CartPopover />

      {/* User Menu */}
      <UserMenu />
      
      {/* Mobile menu button */}
      <button 
        className="md:hidden p-2 hover:bg-secondary rounded-full transition-colors"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
    </div>
  );
};

export default HeaderActionItems;
