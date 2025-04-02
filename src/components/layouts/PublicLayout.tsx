
import React from 'react';
import Header from '@/components/Header';
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
    <>
      <Header />
      {showPromoBanner && <PromotionalBanner />}
      <main className="pt-20">
        {children}
      </main>
    </>
  );
};

export default PublicLayout;
