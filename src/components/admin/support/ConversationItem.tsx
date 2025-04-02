
import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ConversationProps {
  userId: string;
  userEmail: string;
  userName: string | null;
  lastMessage: string;
  unreadCount: number;
  lastMessageTime: string;
  isActive: boolean;
  onClick: () => void;
}

const ConversationItem: React.FC<ConversationProps> = ({
  userId,
  userEmail,
  userName,
  lastMessage,
  unreadCount,
  lastMessageTime,
  isActive,
  onClick
}) => {
  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

  return (
    <div 
      className={`p-4 hover:bg-gray-50 cursor-pointer ${isActive ? 'bg-gray-50' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        <Avatar>
          <AvatarFallback>
            {getInitials(userName)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <h4 className="font-medium truncate">
              {userName || userEmail}
            </h4>
            <span className="text-xs text-gray-500">
              {new Date(lastMessageTime).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-gray-600 truncate">
            {lastMessage}
          </p>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-400">
              {userEmail}
            </span>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs px-1.5 py-0">
                {unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
