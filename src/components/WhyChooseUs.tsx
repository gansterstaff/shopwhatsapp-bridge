import React from 'react';
import { CheckCircle, Shield, Award, Clock, Star } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 text-primary mt-1">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
};

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Productos Verificados",
      description: "Todos nuestros productos son auténticos y pasan por un riguroso control de calidad."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Compra Segura",
      description: "Tu información personal está protegida con las últimas tecnologías de seguridad."
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Garantía Extendida",
      description: "Ofrecemos garantía extendida en todos nuestros productos para tu tranquilidad."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Soporte 24/7",
      description: "Nuestro equipo de atención al cliente está disponible para ayudarte en cualquier momento."
    }
  ];
  
  return (
    <section className="py-16 bg-gradient-to-b from-white to-secondary/10 dark:from-gray-900 dark:to-gray-800/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
              ¿Por qué elegirnos?
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Lo mejor en tecnología a un click de distancia</h2>
            <p className="text-muted-foreground text-lg">
              Nos destacamos por ofrecer los mejores productos tecnológicos con una experiencia de compra simplificada a través de WhatsApp.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {features.map((feature, index) => (
                <Feature 
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-square md:aspect-[4/5] shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?q=80&w=1000&auto=format&fit=crop" 
                alt="Tecnología de calidad" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-48 border border-border">
              <div className="text-sm font-semibold mb-1">Satisfacción del cliente</div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
