
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden pt-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background z-0"></div>
      
      {/* Animated background shapes */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
              <span className="mr-1 w-2 h-2 bg-primary rounded-full"></span>
              New Collection
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Shop Smarter <br />
              <span className="text-primary">Connect Faster</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md">
              Experience a seamless shopping journey with instant WhatsApp integration.
              Browse, select, and connect directly with sellers in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                to="/products" 
                className={cn(
                  "inline-flex items-center justify-center px-6 py-3 rounded-full",
                  "bg-primary text-primary-foreground font-medium",
                  "transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]",
                  "shadow-sm hover:shadow"
                )}
              >
                Explore Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              
              <Link 
                to="/about" 
                className={cn(
                  "inline-flex items-center justify-center px-6 py-3 rounded-full",
                  "bg-secondary text-secondary-foreground font-medium",
                  "transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]",
                  "border border-border"
                )}
              >
                Learn More
              </Link>
            </div>
          </div>
          
          {/* Hero image */}
          <div className="relative w-full h-full min-h-[400px] animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full max-w-lg aspect-square">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/10 rounded-full blur-xl animate-float"></div>
                <img 
                  src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000&auto=format&fit=crop" 
                  alt="Premium headphones" 
                  className="absolute inset-0 w-full h-full object-contain z-10 drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
