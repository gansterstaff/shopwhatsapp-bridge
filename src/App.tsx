
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import PublicLayout from '@/components/layouts/PublicLayout';
import Index from '@/pages/Index';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import Login from '@/pages/Login';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import Cart from '@/pages/Cart';
import AuthCallback from '@/pages/AuthCallback';
import Profile from '@/pages/Profile';
import Support from '@/pages/Support';
import Chat from '@/pages/Chat';
import Orders from '@/pages/Orders';
import Settings from '@/pages/Settings';

// Admin pages
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminProducts from '@/pages/admin/Products';
import AdminOrders from '@/pages/admin/Orders';
import AdminUsers from '@/pages/admin/Users';

// Layouts
import AdminLayoutRefactored from '@/components/admin/AdminLayoutRefactored';

// Auth provider
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';

// Create React Query client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <CartProvider>
            <Routes>
              {/* Public routes using PublicLayout */}
              <Route path="/" element={<PublicLayout showPromoBanner={true}><Index /></PublicLayout>} />
              <Route path="/products" element={<PublicLayout><Products /></PublicLayout>} />
              <Route path="/product/:id" element={<PublicLayout><ProductDetail /></PublicLayout>} />
              <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
              <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
              <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/cart" element={<PublicLayout><Cart /></PublicLayout>} />
              <Route path="/profile" element={<PublicLayout><Profile /></PublicLayout>} />
              <Route path="/support" element={<PublicLayout><Support /></PublicLayout>} />
              <Route path="/chat" element={<PublicLayout><Chat /></PublicLayout>} />
              <Route path="/orders" element={<PublicLayout><Orders /></PublicLayout>} />
              <Route path="/settings" element={<PublicLayout><Settings /></PublicLayout>} />
              
              {/* Admin routes */}
              <Route path="/admin" element={<AdminLayoutRefactored />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="reports" element={<Navigate to="/admin" />} />
                <Route path="settings" element={<Navigate to="/settings" />} />
              </Route>
              
              {/* 404 */}
              <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
            </Routes>
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
