
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import MobileMenuNav from './mobile/MobileMenuNav';
import MobileAdminLink from './mobile/MobileAdminLink';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
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

  const toggleItem = (name: string) => {
    setOpenItems(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleAdminNavigation = () => {
    navigate('/admin');
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <MobileMenuNav 
            openItems={openItems} 
            toggleItem={toggleItem} 
            onClose={onClose} 
          />
          
          <MobileAdminLink 
            isAdmin={isAdmin} 
            onClick={handleAdminNavigation} 
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
