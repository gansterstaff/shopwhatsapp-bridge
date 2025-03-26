
import React from 'react';
import { RefreshCw, Info } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ReturnPolicy = () => {
  return (
    <div className="mt-6 border border-gray-200 rounded-lg p-4">
      <div className="flex items-start">
        <RefreshCw className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-base font-medium">Devolver es fácil y gratis</h3>
          <p className="text-sm text-gray-600 mt-1">Satisfacción garantizada</p>
          
          <p className="text-sm mt-2">La mayoría de los productos tienen 30 días desde que los recibes para hacer una devolución.</p>
          
          <Accordion type="single" collapsible className="w-full mt-3">
            <AccordionItem value="plazos">
              <AccordionTrigger className="text-sm font-medium">
                Plazos para devolución y cambio de autopartes
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-500 mt-2 mr-2"></div>
                    <span>7 días: electrónica automotriz, radios, sistemas GPS y alarmas.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-500 mt-2 mr-2"></div>
                    <span>15 días: partes mecánicas y de carrocería en su empaque original.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-500 mt-2 mr-2"></div>
                    <span>30 días: accesorios diversos para vehículos sin usar.</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="requisitos">
              <AccordionTrigger className="text-sm font-medium">
                Requisitos para devoluciones
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2 text-sm font-medium">Deben estar cerrados, con todos sus sellos y etiquetas:</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-500 mt-2 mr-2"></div>
                    <span>Componentes electrónicos para vehículos.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-500 mt-2 mr-2"></div>
                    <span>Sistemas de audio y navegación.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-500 mt-2 mr-2"></div>
                    <span>Productos de limpieza y mantenimiento para vehículos.</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="excepciones">
              <AccordionTrigger className="text-sm font-medium">
                Productos sin devolución
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2 text-sm font-medium">No tienen devolución o cambio si te arrepientes de la compra:</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-500 mt-2 mr-2"></div>
                    <span>Productos de compra internacional.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-500 mt-2 mr-2"></div>
                    <span>Partes personalizadas o hechas a medida.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-500 mt-2 mr-2"></div>
                    <span>Baterías de auto abiertas o usadas.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-500 mt-2 mr-2"></div>
                    <span>Productos que hayan sido previamente instalados.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-500 mt-2 mr-2"></div>
                    <span>Fluidos, aceites y lubricantes abiertos.</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
