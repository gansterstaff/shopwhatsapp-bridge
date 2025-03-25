
import React from 'react';
import { ShoppingBag, MessageCircle, Truck, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitProps> = ({ icon, title, description }) => {
  return (
    <div 
      className={cn(
        "flex flex-col items-center text-center p-6",
        "bg-white dark:bg-gray-900 rounded-xl",
        "border border-border",
        "transition-all duration-300 hover:shadow-md hover:-translate-y-1"
      )}
    >
      <div 
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center mb-4",
          "bg-primary/10 text-primary"
        )}
      >
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  )
};

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: "Quality Products",
      description: "Curated selection of premium products that meet our high standards for quality and design."
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Direct Chat",
      description: "Connect directly with sellers through WhatsApp for a personalized shopping experience."
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Fast Delivery",
      description: "Quick and reliable shipping options to get your purchases to you in no time."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Shopping",
      description: "Your information is protected with advanced security measures for peace of mind."
    }
  ];
  
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="mb-10 text-center space-y-2">
          <div className="inline-flex items-center px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
            Why Choose Us
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">The ShopWhats Advantage</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience a new way of shopping with features designed to make your life easier
          </p>
        </div>
        
        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="animate-fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BenefitCard {...benefit} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
