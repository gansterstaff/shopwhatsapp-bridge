
import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Benefits from '@/components/Benefits';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Categories from '@/components/Categories';
import WhyChooseUs from '@/components/WhyChooseUs';
import PromotionalBanner from '@/components/PromotionalBanner';
import AboutCarousel from '@/components/AboutCarousel';
import FestiveBanner from '@/components/FestiveBanner';

const Index: React.FC = () => {
  // Add a smooth scroll effect when page loads
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <Categories />
        <FeaturedProducts />
        <AboutCarousel />
        <WhyChooseUs />
        <Benefits />
        <Testimonials />
        <Newsletter />
      </main>
      <PromotionalBanner />
      <FestiveBanner />
    </div>
  );
};

export default Index;
