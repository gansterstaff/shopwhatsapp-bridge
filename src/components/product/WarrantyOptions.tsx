
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface WarrantyOptionsProps {
  selectedWarranty?: string;
  onChange?: (warranty: string) => void;
}

const WarrantyOptions: React.FC<WarrantyOptionsProps> = ({
  selectedWarranty = "none",
  onChange
}) => {
  const handleWarrantyChange = (warranty: string) => {
    if (onChange) {
      onChange(warranty);
    }
  };

  return (
    <div className="my-4">
      <h4 className="font-medium mb-2">Extiende La Garantía Del Producto</h4>
      <div className="space-y-2">
        <div className="flex items-center border rounded-md p-2">
          <input 
            type="radio" 
            id="warranty-1" 
            name="warranty" 
            className="mr-2"
            checked={selectedWarranty === "1year"}
            onChange={() => handleWarrantyChange("1year")}
          />
          <label htmlFor="warranty-1" className="flex-1 text-sm">Garantía de 1 año: Reemplazo</label>
          <span className="text-sm font-medium">S/ 84</span>
        </div>
        
        <div className="flex items-center border rounded-md p-2 bg-amber-50">
          <input 
            type="radio" 
            id="warranty-2" 
            name="warranty" 
            className="mr-2"
            checked={selectedWarranty === "2year"}
            onChange={() => handleWarrantyChange("2year")}
          />
          <label htmlFor="warranty-2" className="flex-1 text-sm">Garantía de 2 años: Reemplazo</label>
          <span className="text-sm font-medium">S/ 192</span>
          <Badge variant="secondary" className="ml-2">Recomendado</Badge>
        </div>
        
        <div className="flex items-center border rounded-md p-2">
          <input 
            type="radio" 
            id="warranty-none" 
            name="warranty" 
            className="mr-2"
            defaultChecked={selectedWarranty === "none"}
            onChange={() => handleWarrantyChange("none")}
          />
          <label htmlFor="warranty-none" className="flex-1 text-sm">Sin garantía extendida</label>
        </div>
      </div>
    </div>
  );
};

export default WarrantyOptions;
