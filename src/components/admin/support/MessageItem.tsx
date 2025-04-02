
import React from 'react';

interface MessageItemProps {
  content: string;
  timestamp: string;
  isFromAdmin: boolean;
  formatDate: (date: string) => string;
}

const MessageItem: React.FC<MessageItemProps> = ({
  content,
  timestamp,
  isFromAdmin,
  formatDate
}) => {
  return (
    <div className={`flex ${isFromAdmin ? 'justify-end' : 'justify-start'} mb-3`}>
      <div 
        className={`max-w-[70%] rounded-lg p-3 ${
          isFromAdmin 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-muted'
        }`}
      >
        <p className="break-words">{content}</p>
        <div className={`text-xs mt-1 ${isFromAdmin ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
          {formatDate(timestamp)}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
