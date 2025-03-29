
import React from 'react';
import { CustomCarousel } from './ui/custom-carousel';
import { Link } from 'react-router-dom';

const AboutCarousel = () => {
  const aboutSlides = [
    {
      title: "Nuestra Historia",
      button: "Conoce más",
      description: "Fundada en 2015, ShopWhats nació con la visión de transformar la manera en que las personas interactúan con la tecnología en su vida cotidiana.",
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Nuestra Misión",
      button: "Nuestra Visión",
      description: "Proporcionar a nuestros clientes productos tecnológicos de alta calidad que mejoren su comunicación diaria y experiencia digital.",
      src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Nuestros Valores",
      button: "Leer más",
      description: "Calidad, innovación, servicio al cliente excepcional y compromiso con la sostenibilidad son nuestros pilares fundamentales.",
      src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Nuestro Equipo",
      button: "Conócenos",
      description: "Un equipo apasionado y comprometido con la excelencia, dedicado a brindar la mejor experiencia tecnológica a nuestros clientes.",
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background to-secondary/30" id="about-us">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sobre Nosotros</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Descubre quiénes somos y nuestra pasión por brindarte los mejores productos tecnológicos para mejorar tu experiencia digital.
          </p>
          <div className="mt-4">
            <Link to="/about" className="text-primary font-medium hover:underline">
              Ver página completa →
            </Link>
          </div>
        </div>
        
        <div className="relative overflow-hidden w-full h-full">
          <CustomCarousel slides={aboutSlides} />
        </div>
      </div>
    </section>
  );
};

export default AboutCarousel;
