
import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';

interface MobileMenuItemProps {
  name: string;
  icon: React.ReactNode;
  isOpen: boolean;
  hasSubmenu: boolean;
  toggleItem: () => void;
  children?: React.ReactNode;
}

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({ 
  name, 
  icon, 
  isOpen, 
  hasSubmenu, 
  toggleItem, 
  children 
}) => {
  return (
    <div className="border-b pb-1">
      <Collapsible
        open={isOpen}
        onOpenChange={toggleItem}
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full px-2 py-2 text-sm rounded-md hover:bg-muted">
          <div className="flex items-center">
            {icon}
            {name}
          </div>
          {hasSubmenu && (
            isOpen 
              ? <ChevronDown className="h-4 w-4" /> 
              : <ChevronRight className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        
        {hasSubmenu && (
          <CollapsibleContent>
            <div className="pl-6 mt-1 space-y-1">
              {children}
            </div>
          </CollapsibleContent>
        )}
      </Collapsible>
    </div>
  );
};

export default MobileMenuItem;
