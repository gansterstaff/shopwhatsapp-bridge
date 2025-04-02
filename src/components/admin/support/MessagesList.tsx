
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageItem from './MessageItem';
import LoadingSpinner from './LoadingSpinner';

interface Message {
  id: string;
  user_id: string;
  admin_id: string | null;
  content: string;
  is_from_admin: boolean;
  created_at: string;
  read: boolean;
  user_email?: string;
  user_name?: string;
  profiles?: {
    email: string;
    name: string | null;
  };
}

interface MessagesListProps {
  messages: Message[];
  isLoading: boolean;
  formatDate: (date: string) => string;
}

const MessagesList: React.FC<MessagesListProps> = ({
  messages,
  isLoading,
  formatDate
}) => {
  return (
    <ScrollArea className="flex-1 p-4">
      {isLoading ? (
        <div className="flex items-center justify-center h-40">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              content={message.content}
              timestamp={message.created_at}
              isFromAdmin={message.is_from_admin}
              formatDate={formatDate}
            />
          ))}
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground my-12">
              No hay mensajes en esta conversación
            </div>
          )}
        </div>
      )}
    </ScrollArea>
  );
};

export default MessagesList;
