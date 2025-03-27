
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Nosotros</h1>
        <p className="text-lg text-gray-600 mt-2">
          Descubre nuestra historia y misión
        </p>
      </div>
      
      {/* Company Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Nuestra Historia</h2>
          <p className="text-gray-600 mb-4">
            Fundada en 2015, ShopWhats nació con una visión clara: transformar la manera en que las personas interactúan con la tecnología en su vida cotidiana.
          </p>
          <p className="text-gray-600 mb-4">
            Lo que comenzó como una pequeña tienda en línea ha evolucionado hasta convertirse en uno de los líderes del mercado en la venta de productos tecnológicos innovadores, con un enfoque especial en dispositivos que facilitan la comunicación y mejoran la calidad de vida de nuestros clientes.
          </p>
          <p className="text-gray-600">
            A lo largo de nuestra trayectoria, nos hemos mantenido fieles a nuestros valores fundamentales: calidad, innovación, servicio al cliente excepcional y compromiso con la sostenibilidad.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Nuestro equipo" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Mission and Vision */}
      <div className="bg-gray-50 p-12 rounded-lg mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
            <p className="text-gray-600">
              Nuestra misión es proporcionar a nuestros clientes productos tecnológicos de alta calidad que mejoren su comunicación diaria y experiencia digital, ofreciendo un servicio personalizado y una experiencia de compra excepcional.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Nuestra Visión</h2>
            <p className="text-gray-600">
              Aspiramos a ser reconocidos globalmente como el destino preferido para la adquisición de tecnología innovadora, liderando la transformación digital con productos que conectan personas y simplifican la vida cotidiana.
            </p>
          </div>
        </div>
      </div>
      
      {/* Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Nuestros Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Calidad</h3>
            <p className="text-gray-600">
              Nos comprometemos a ofrecer productos de la más alta calidad, rigurosamente probados y seleccionados.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Innovación</h3>
            <p className="text-gray-600">
              Exploramos constantemente nuevas tecnologías y tendencias para ofrecer productos a la vanguardia.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Servicio</h3>
            <p className="text-gray-600">
              Ponemos a nuestros clientes en el centro de todo lo que hacemos, ofreciendo un servicio excepcional.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Sostenibilidad</h3>
            <p className="text-gray-600">
              Nos esforzamos por minimizar nuestro impacto ambiental a través de prácticas comerciales responsables.
            </p>
          </div>
        </div>
      </div>
      
      {/* Team */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Nuestro Equipo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                alt="CEO" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-medium">Miguel Sánchez</h3>
            <p className="text-gray-600">CEO & Fundador</p>
          </div>
          
          <div className="text-center">
            <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                alt="COO" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-medium">Ana Rodríguez</h3>
            <p className="text-gray-600">Directora de Operaciones</p>
          </div>
          
          <div className="text-center">
            <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                alt="CTO" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-medium">Carlos Martínez</h3>
            <p className="text-gray-600">Director de Tecnología</p>
          </div>
          
          <div className="text-center">
            <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                alt="Marketing Director" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-medium">Laura González</h3>
            <p className="text-gray-600">Directora de Marketing</p>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="text-center bg-primary/10 p-12 rounded-lg">
        <h2 className="text-3xl font-semibold mb-4">Únete a Nuestra Comunidad</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Descubre productos innovadores que transformarán tu forma de comunicarte y trabajar. ¿Estás listo para ser parte de la revolución tecnológica?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/products">Explorar Productos</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/contact">Contáctanos</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
