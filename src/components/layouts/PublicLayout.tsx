
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromotionalBanner from '@/components/PromotionalBanner';

interface PublicLayoutProps {
  children: React.ReactNode;
  showPromoBanner?: boolean;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ 
  children, 
  showPromoBanner = false 
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showPromoBanner && <PromotionalBanner />}
      <main className="pt-20 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
