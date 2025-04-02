
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import ConversationItem from './ConversationItem';
import LoadingSpinner from './LoadingSpinner';

interface Conversation {
  user_id: string;
  user_email: string;
  user_name: string | null;
  last_message: string;
  unread_count: number;
  last_message_time: string;
}

interface ConversationsListProps {
  conversations: Conversation[];
  loading: boolean;
  currentUser: string | null;
  onSelectConversation: (userId: string) => void;
}

const ConversationsList: React.FC<ConversationsListProps> = ({
  conversations,
  loading,
  currentUser,
  onSelectConversation
}) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ScrollArea className="h-full">
      {conversations.length === 0 ? (
        <div className="flex items-center justify-center h-40 text-center text-muted-foreground">
          No hay conversaciones disponibles
        </div>
      ) : (
        <div className="divide-y">
          {conversations.map((conversation) => (
            <ConversationItem
              key={conversation.user_id}
              userId={conversation.user_id}
              userEmail={conversation.user_email}
              userName={conversation.user_name}
              lastMessage={conversation.last_message}
              unreadCount={conversation.unread_count}
              lastMessageTime={conversation.last_message_time}
              isActive={currentUser === conversation.user_id}
              onClick={() => onSelectConversation(conversation.user_id)}
            />
          ))}
        </div>
      )}
    </ScrollArea>
  );
};

export default ConversationsList;
