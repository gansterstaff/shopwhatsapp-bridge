
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Logo from './header/Logo';
import DesktopNav from './header/DesktopNav';
import HeaderActionItems from './header/HeaderActionItems';
import MobileMenu from './header/MobileMenu';
import SearchModal from './SearchModal';
import { ThemeToggle } from './ui/theme-toggle';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        )}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo />
            
            {/* Navegación de Escritorio */}
            <DesktopNav />
            
            {/* Iconos del lado derecho con selector de tema */}
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <HeaderActionItems 
                openSearch={openSearch}
                isMobileMenuOpen={isMobileMenuOpen}
                toggleMobileMenu={toggleMobileMenu}
              />
            </div>
          </div>
        </div>
        
        {/* Navegación Móvil */}
        <MobileMenu 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Modal de Búsqueda */}
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </header>
    </>
  );
};

export default Header;
