
import React from 'react';
import { Helmet } from 'react-helmet';
import SupportChat from '@/components/SupportChat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Support = () => {
  const faqs = [
    {
      question: "¿Cómo puedo realizar un pedido?",
      answer: "Para realizar un pedido, simplemente busca los productos que deseas comprar, añádelos al carrito y sigue el proceso de pago. Puedes pagar con tarjeta de crédito o débito, así como mediante transferencia bancaria."
    },
    {
      question: "¿Cuál es el tiempo de entrega?",
      answer: "El tiempo de entrega estándar es de 3 a 5 días hábiles, dependiendo de tu ubicación. Para zonas remotas puede tomar hasta 7 días hábiles. Una vez que realices tu pedido, recibirás información de seguimiento por correo electrónico."
    },
    {
      question: "¿Cómo puedo solicitar un reembolso o devolución?",
      answer: "Disponemos de una política de devolución de 30 días. Si no estás satisfecho con tu compra, puedes solicitar un reembolso o cambio dentro de este período. Para iniciar el proceso, contacta a nuestro equipo de soporte a través del chat en esta página."
    },
    {
      question: "¿Ofrecen envío internacional?",
      answer: "Actualmente solo realizamos envíos dentro del territorio nacional. Estamos trabajando para expandir nuestros servicios a nivel internacional en el futuro próximo."
    },
    {
      question: "¿Cómo puedo cambiar mi contraseña?",
      answer: "Para cambiar tu contraseña, inicia sesión en tu cuenta, ve a la sección 'Mi Perfil', y selecciona la pestaña 'Seguridad'. Allí encontrarás la opción para actualizar tu contraseña."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Soporte - Preguntas Frecuentes y Contacto</title>
        <meta name="description" content="Página de soporte, contacto y ayuda. Resuelve tus dudas o ponte en contacto con nuestro equipo de soporte." />
      </Helmet>

      <div className="container mx-auto py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold">Centro de Soporte</h1>
            <p className="text-xl text-gray-600 mt-2">
              Estamos aquí para ayudarte
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Preguntas Frecuentes</CardTitle>
                  <CardDescription>
                    Respuestas a las preguntas más comunes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-2">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-gray-600">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Información de Contacto</CardTitle>
                  <CardDescription>
                    Otras formas de comunicarte con nosotros
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Correo Electrónico</h3>
                        <a href="mailto:soporte@mitienda.com" className="text-primary hover:underline">soporte@mitienda.com</a>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Teléfono</h3>
                        <a href="tel:+525512345678" className="text-primary hover:underline">+52 (55) 1234-5678</a>
                        <p className="text-sm text-gray-500">Lunes a Viernes, 9:00 - 18:00</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Dirección</h3>
                        <p className="text-gray-600">Av. Reforma 247, Col. Juárez</p>
                        <p className="text-gray-600">Ciudad de México, CP 06600</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-1">
              <SupportChat />
              
              <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-medium mb-2">¿Necesitas ayuda urgente?</h3>
                <p className="text-gray-600 mb-4">
                  También puedes contactarnos por WhatsApp para una respuesta más rápida.
                </p>
                <a 
                  href="https://wa.me/5215512345678" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded inline-flex items-center transition-colors w-full justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Contactar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;
