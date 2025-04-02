
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';

// Import refactored components
import SidebarNav from './layout/SidebarNav';
import UserProfile from './layout/UserProfile';
import AdminHeader from './layout/AdminHeader';

const AdminLayoutRefactored = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('name, role')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (data?.role !== 'admin') {
          navigate('/');
          return;
        }
        
        setUserName(data.name || user.email?.split('@')[0] || 'Admin');
        setUserRole(data.role);
      } catch (error) {
        console.error('Error verificando permisos de administrador:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex flex-col bg-white shadow-lg transition-all duration-300 md:relative",
          isSidebarOpen ? "w-64" : "w-0 md:w-20 overflow-hidden"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          {isSidebarOpen ? (
            <Link to="/admin" className="font-bold text-xl">
              ShopWhats Admin
            </Link>
          ) : (
            <span className="font-bold text-xl mx-auto">SW</span>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <Separator />
        
        {/* Navigation Links */}
        <SidebarNav isSidebarOpen={isSidebarOpen} />
        
        <Separator />
        
        {/* User Profile */}
        <UserProfile 
          userName={userName}
          userRole={userRole}
          isSidebarOpen={isSidebarOpen}
          onSignOut={handleSignOut}
        />
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader toggleSidebar={toggleSidebar} />
        
        {/* Main content area */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
      
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-10 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayoutRefactored;
