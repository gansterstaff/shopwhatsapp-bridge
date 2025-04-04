
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { TubelightNavbar } from "@/components/ui/tubelight-navbar";
import NavDropdown from './NavDropdown';
import NavAdminLink from './NavAdminLink';
import NavItems, { NavItem } from './NavItems';

const DesktopNav: React.FC = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState<string>('Inicio');
  const [currentContent, setCurrentContent] = useState<React.ReactNode | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkUserRole = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();
          
          if (error) {
            console.error('Error al verificar rol de usuario:', error);
            return;
          }
          
          setIsAdmin(data?.role === 'admin');
        } catch (error) {
          console.error('Error al verificar rol de usuario:', error);
        }
      }
    };
    
    checkUserRole();
  }, [user]);

  // Set active nav item based on current path
  useEffect(() => {
    const path = location.pathname;
    if (path === '/' || path.startsWith('/#')) {
      setActiveNavItem('Inicio');
      setActiveItemIndex(0);
    } else if (path.startsWith('/products')) {
      setActiveNavItem('Productos');
      setActiveItemIndex(1);
    } else if (path.startsWith('/about')) {
      setActiveNavItem('Nosotros');
      setActiveItemIndex(2);
    } else if (path.startsWith('/chat')) {
      setActiveNavItem('Chat');
      setActiveItemIndex(3);
    } else if (path.startsWith('/contact')) {
      setActiveNavItem('Contacto');
      setActiveItemIndex(4);
    }
    
    // Close dropdown when changing routes
    setIsDropdownOpen(false);
    setCurrentContent(null);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setCurrentContent(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle navigation and close dropdown
  const handleNavigation = (path: string) => {
    console.log("Navigating to:", path);
    navigate(path);
    setIsDropdownOpen(false);
    setCurrentContent(null);
  };

  const navItems: NavItem[] = NavItems({ handleNavigation });

  const handleNavHover = (item: NavItem, index: number) => {
    setActiveNavItem(item.name);
    setCurrentContent(item.content);
    setActiveItemIndex(index);
    setIsDropdownOpen(true);
  };

  const handleNavLeave = () => {
    setIsDropdownOpen(false);
    setCurrentContent(null);
  };

  const handleMainNavClick = (item: NavItem, index: number, event: React.MouseEvent) => {
    setActiveNavItem(item.name);
    setActiveItemIndex(index);
    
    // Toggle dropdown state
    if (activeNavItem === item.name && isDropdownOpen) {
      setIsDropdownOpen(false);
      setCurrentContent(null);
    } else {
      setIsDropdownOpen(true);
      setCurrentContent(item.content);
    }
  };

  return (
    <div 
      className="hidden md:block relative" 
      ref={navRef}
      onMouseLeave={handleNavLeave}
    >
      <TubelightNavbar 
        items={navItems}
        onNavHover={(item, index) => handleNavHover(item, index)}
        activeItem={activeNavItem}
        className="mb-1"
        onNavClick={(item, index, event) => handleMainNavClick(item, index, event)}
      />
      
      <NavDropdown 
        isOpen={isDropdownOpen} 
        content={currentContent} 
        activeItemIndex={activeItemIndex} 
      />
      
      <NavAdminLink isAdmin={isAdmin} />
    </div>
  );
};

export default DesktopNav;
