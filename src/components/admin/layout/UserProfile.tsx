
import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface UserProfileProps {
  userName: string;
  userRole: string;
  isSidebarOpen: boolean;
  onSignOut: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  userName, 
  userRole, 
  isSidebarOpen, 
  onSignOut 
}) => {
  return (
    <div className="p-4">
      {isSidebarOpen ? (
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarFallback>
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="font-medium truncate">{userName}</p>
            <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onSignOut}
            className="text-gray-500 hover:text-red-500"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onSignOut}
            className="text-gray-500 hover:text-red-500"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
