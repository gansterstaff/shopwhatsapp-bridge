
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromotionalBanner from '@/components/PromotionalBanner';
import OnboardingBanner from '@/components/OnboardingBanner';

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
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
      
      {/* Banner de onboarding para nuevos usuarios */}
      <OnboardingBanner />
    </div>
  );
};

export default PublicLayout;
