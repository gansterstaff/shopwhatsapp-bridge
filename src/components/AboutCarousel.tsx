
import React, { useState } from 'react';
import { CustomCarousel } from './ui/custom-carousel';
import { Link } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger 
} from './ui/dialog';
import { Button } from './ui/button';

const AboutCarousel = () => {
  const [openDialogs, setOpenDialogs] = useState<{[key: number]: boolean}>({});

  const toggleDialog = (index: number) => {
    setOpenDialogs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const aboutSlides = [
    {
      title: "Nuestra Historia",
      button: "Conoce más",
      description: "Fundada en 2015, ShopWhats nació con la visión de transformar la manera en que las personas interactúan con la tecnología en su vida cotidiana.",
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      dialogContent: {
        title: "Nuestra Historia",
        description: `Fundada en 2015, ShopWhats nació con una visión clara: transformar la manera en que las personas interactúan con la tecnología en su vida cotidiana.

        Lo que comenzó como una pequeña tienda en línea ha evolucionado hasta convertirse en uno de los líderes del mercado en la venta de productos tecnológicos innovadores, con un enfoque especial en dispositivos que facilitan la comunicación y mejoran la calidad de vida de nuestros clientes.

        A lo largo de nuestra trayectoria, nos hemos mantenido fieles a nuestros valores fundamentales: calidad, innovación, servicio al cliente excepcional y compromiso con la sostenibilidad.

        Nuestra sede principal se estableció inicialmente en un pequeño local, pero rápidamente expandimos nuestras operaciones a medida que nuestra reputación por ofrecer productos de calidad y un servicio excepcional se extendía. Hoy, contamos con un equipo diverso y apasionado, comprometido con nuestra misión de hacer que la tecnología sea accesible y beneficiosa para todos.`
      }
    },
    {
      title: "Nuestra Misión",
      button: "Nuestra Visión",
      description: "Proporcionar a nuestros clientes productos tecnológicos de alta calidad que mejoren su comunicación diaria y experiencia digital.",
      src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3",
      dialogContent: {
        title: "Nuestra Misión y Visión",
        description: `Misión:
        Nuestra misión es proporcionar a nuestros clientes productos tecnológicos de alta calidad que mejoren su comunicación diaria y experiencia digital, ofreciendo un servicio personalizado y una experiencia de compra excepcional. Nos esforzamos por simplificar la vida digital de nuestros clientes a través de soluciones innovadoras y un soporte técnico de primer nivel.

        Visión:
        Aspiramos a ser reconocidos globalmente como el destino preferido para la adquisición de tecnología innovadora, liderando la transformación digital con productos que conectan personas y simplifican la vida cotidiana. Buscamos expandir nuestra presencia en el mercado latinoamericano, estableciendo nuevos estándares en comercio electrónico y atención al cliente, siempre manteniendo nuestro compromiso con la sostenibilidad y la responsabilidad social.
        
        En ShopWhats, no solo vendemos tecnología; creamos experiencias y fomentamos conexiones significativas en un mundo cada vez más digital.`
      }
    },
    {
      title: "Nuestros Valores",
      button: "Leer más",
      description: "Calidad, innovación, servicio al cliente excepcional y compromiso con la sostenibilidad son nuestros pilares fundamentales.",
      src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3",
      dialogContent: {
        title: "Nuestros Valores",
        description: `En ShopWhats, nuestros valores son la brújula que guía todas nuestras decisiones y acciones:

        Calidad: Nos comprometemos a ofrecer productos de la más alta calidad, rigurosamente probados y seleccionados. Cada producto que vendemos pasa por un riguroso proceso de control de calidad para garantizar que cumpla con nuestros estándares exigentes.
        
        Innovación: Exploramos constantemente nuevas tecnologías y tendencias para ofrecer productos a la vanguardia. Fomentamos la creatividad y el pensamiento disruptivo dentro de nuestro equipo, buscando siempre mejorar la experiencia de nuestros clientes.
        
        Servicio al Cliente Excepcional: Ponemos a nuestros clientes en el centro de todo lo que hacemos. Nos esforzamos por superar las expectativas en cada interacción, ofreciendo soporte personalizado y soluciones eficientes a cualquier problema que puedan enfrentar.
        
        Sostenibilidad: Nos esforzamos por minimizar nuestro impacto ambiental a través de prácticas comerciales responsables. Trabajamos con proveedores que comparten nuestros valores ecológicos y promovemos el reciclaje y la reutilización de dispositivos electrónicos.
        
        Integridad: Actuamos con honestidad y transparencia en todas nuestras operaciones comerciales. Creemos en establecer relaciones duraderas basadas en la confianza mutua con nuestros clientes, proveedores y colaboradores.`
      }
    },
    {
      title: "Nuestro Equipo",
      button: "Conócenos",
      description: "Un equipo apasionado y comprometido con la excelencia, dedicado a brindar la mejor experiencia tecnológica a nuestros clientes.",
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
      dialogContent: {
        title: "Nuestro Equipo",
        description: `Detrás de ShopWhats hay un equipo diverso de profesionales apasionados y comprometidos:

        Liderazgo:
        - Miguel Sánchez (CEO & Fundador): Con más de 15 años de experiencia en el sector tecnológico, Miguel fundó ShopWhats con la visión de hacer la tecnología más accesible para todos.
        - Ana Rodríguez (Directora de Operaciones): Experta en logística y gestión de cadenas de suministro, Ana garantiza que nuestras operaciones sean eficientes y sostenibles.
        - Carlos Martínez (Director de Tecnología): Ingeniero informático con experiencia en desarrollo web y aplicaciones móviles, Carlos lidera nuestra infraestructura digital.
        - Laura González (Directora de Marketing): Con un enfoque innovador en marketing digital, Laura ha sido clave para construir nuestra presencia de marca.

        Departamentos:
        - Servicio al Cliente: Un equipo dedicado de especialistas en productos y soluciones, disponibles a través de WhatsApp para asistencia inmediata.
        - Logística y Distribución: Expertos en garantizar que los productos lleguen a tiempo y en perfectas condiciones.
        - Desarrollo Web: Profesionales técnicos que mantienen y mejoran constantemente nuestra plataforma online.
        - Marketing y Comunicaciones: Creativos que comparten nuestra historia y conectan con nuestra comunidad.

        Cultura:
        Fomentamos un ambiente de trabajo colaborativo, innovador y flexible. Celebramos la diversidad y promovemos el desarrollo profesional continuo. Nuestro equipo es nuestra mayor fortaleza, y su pasión por la tecnología y el servicio al cliente se refleja en cada interacción.`
      }
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
          <CustomCarousel 
            slides={aboutSlides} 
            onButtonClick={(index) => toggleDialog(index)}
          />
        </div>

        {/* Dialogs for each slide */}
        {aboutSlides.map((slide, index) => (
          <Dialog key={index} open={openDialogs[index]} onOpenChange={() => toggleDialog(index)}>
            <DialogContent className="sm:max-w-[725px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">{slide.dialogContent.title}</DialogTitle>
              </DialogHeader>
              <DialogDescription className="text-lg whitespace-pre-line">
                {slide.dialogContent.description}
              </DialogDescription>
              <div className="mt-6 flex justify-end">
                <Button onClick={() => toggleDialog(index)}>Cerrar</Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
};

export default AboutCarousel;
