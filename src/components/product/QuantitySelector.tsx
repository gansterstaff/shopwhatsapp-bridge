
import React from 'react';
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  stock: number;
  onQuantityChange: (amount: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ 
  quantity, 
  stock, 
  onQuantityChange 
}) => {
  return (
    <div className="flex items-center my-2">
      <span className="text-sm mr-3">Cantidad:</span>
      <div className="flex items-center border rounded-md">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-none"
          onClick={() => onQuantityChange(-1)}
          disabled={quantity <= 1}
        >
          <MinusCircle className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-none"
          onClick={() => onQuantityChange(1)}
          disabled={quantity >= stock}
        >
          <PlusCircle className="h-4 w-4" />
        </Button>
      </div>
      <span className="text-xs text-gray-500 ml-3">Máximo {stock} unidades</span>
    </div>
  );
};

export default QuantitySelector;
