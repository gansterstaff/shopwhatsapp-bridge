
import React, { useEffect, useRef } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageItem from './MessageItem';
import LoadingSpinner from './LoadingSpinner';
import { Message } from './SupportMessageService';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length && !isLoading) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

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
          <div ref={messagesEndRef} />
        </div>
      )}
    </ScrollArea>
  );
};

export default MessagesList;
