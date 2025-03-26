
import React, { useState } from 'react';
import { RefreshCw } from "lucide-react";

const ReturnPolicy: React.FC = () => {
  const [showReturnInfo, setShowReturnInfo] = useState(false);

  return (
    <div className="my-4 border rounded-lg p-3">
      <button
        onClick={() => setShowReturnInfo(!showReturnInfo)}
        className="flex items-center text-sm font-medium text-primary hover:underline w-full"
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Devolver es fácil y gratis - Conoce nuestra Satisfacción garantizada
      </button>
      
      {showReturnInfo && (
        <div className="mt-3 text-sm">
          <p className="mb-2">La mayoría de las autopartes tienen 30 días desde que las recibes para hacer una devolución.</p>
          <p className="mb-2 text-xs text-gray-600">Sin embargo, algunas categorías cuentan con plazos diferentes:</p>
          <ul className="text-xs text-gray-600 space-y-1 list-disc pl-4 mb-2">
            <li>7 días: electrónica automotriz, radios y sistemas GPS.</li>
            <li>15 días: partes mecánicas en empaque original.</li>
            <li>Sin devolución: baterías usadas, fluidos abiertos, partes instaladas.</li>
          </ul>
          <p className="text-xs text-gray-500 italic">Consulta nuestra política completa para más detalles.</p>
        </div>
      )}
    </div>
  );
};

export default ReturnPolicy;
