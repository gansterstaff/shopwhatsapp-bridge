
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Hero = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      
      const elements = document.querySelectorAll('.parallax-element');
      elements.forEach(el => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.getAttribute('data-speed') || '0.05');
        element.style.transform = `translate(${x * 50 * speed}px, ${y * 50 * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animate elements into view
    setIsVisible(true);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-background to-secondary/30">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="parallax-element absolute h-64 w-64 rounded-full bg-primary/5 -top-20 -left-20 blur-3xl" 
          data-speed="0.03"
          style={{ transform: `translateY(${offsetY * 0.2}px)` }}
        />
        <div 
          className="parallax-element absolute h-80 w-80 rounded-full bg-primary/5 bottom-10 -right-20 blur-3xl" 
          data-speed="0.05"
          style={{ transform: `translateY(${-offsetY * 0.3}px)` }}
        />
      </div>
      
      <div className="container mx-auto px-4 z-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={cn(
            "space-y-6 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                Tecnología de última generación
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Descubre productos <span className="text-primary">excepcionales</span> para tu vida digital
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Explorá nuestra colección exclusiva de productos de alta calidad cuidadosamente seleccionados para mejorar tu experiencia tecnológica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/products">
                  Explorar Productos
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#featured">
                  Ver Destacados
                </a>
              </Button>
            </div>
          </div>
          
          <div className={cn(
            "relative transition-all duration-1000 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-tr from-background to-muted p-2">
              <img 
                src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1470&auto=format&fit=crop"
                alt="Productos destacados" 
                className="parallax-element w-full h-full object-cover rounded-xl"
                data-speed="0.08"
              />
              
              {/* Floating badges */}
              <div className="parallax-element absolute top-10 left-5 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 text-sm font-medium text-foreground" data-speed="0.12">
                <span className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                  Envío Gratuito
                </span>
              </div>
              
              <div className="parallax-element absolute bottom-10 right-5 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 text-sm font-medium text-foreground" data-speed="0.10">
                <span className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                  Garantía 1 Año
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-sm text-muted-foreground font-medium">Scrollea para ver más</span>
          <div className="animate-bounce">
            <ArrowDown className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
