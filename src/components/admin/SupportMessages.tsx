
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from 'lucide-react';

import SupportMessageService, { Conversation, Message } from './support/SupportMessageService';
import ConversationsList from './support/ConversationsList';
import MessagesList from './support/MessagesList';
import MessageInput from './support/MessageInput';
import LoadingSpinner from './support/LoadingSpinner';

const SupportMessages = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const data = await SupportMessageService.getConversations();
      setConversations(data);
    } catch (error: any) {
      console.error('Error cargando conversaciones:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las conversaciones de soporte",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (userId: string) => {
    try {
      setIsLoadingMessages(true);
      setCurrentUser(userId);
      
      const messagesData = await SupportMessageService.getMessages(userId);
      setMessages(messagesData);
      
      await SupportMessageService.markMessagesAsRead(userId);
      loadConversations();
    } catch (error: any) {
      console.error('Error cargando mensajes:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los mensajes",
        variant: "destructive",
      });
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleSendReply = async (content: string) => {
    if (!currentUser || !user) return;
    
    try {
      await SupportMessageService.sendAdminReply(currentUser, user.id, content);
      loadMessages(currentUser);
    } catch (error: any) {
      console.error('Error enviando respuesta:', error);
      toast({
        title: "Error",
        description: "No se pudo enviar la respuesta",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Card className="h-[calc(100vh-16rem)]">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Mensajes de Soporte</span>
          <Button 
            variant="outline"
            size="sm"
            onClick={loadConversations}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100%-5rem)]">
        <div className="grid grid-cols-12 h-full">
          <div className="col-span-4 border-r h-full">
            <ConversationsList 
              conversations={conversations}
              loading={false}
              currentUser={currentUser}
              onSelectConversation={loadMessages}
            />
          </div>
          
          <div className="col-span-8 h-full flex flex-col">
            {currentUser ? (
              <>
                <MessagesList
                  messages={messages}
                  isLoading={isLoadingMessages}
                  formatDate={formatDate}
                />
                
                <MessageInput 
                  onSendMessage={handleSendReply}
                  disabled={!currentUser || !user}
                />
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-center text-muted-foreground p-4">
                Selecciona una conversación para ver los mensajes
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportMessages;
