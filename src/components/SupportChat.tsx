
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  created_at: string;
  is_from_admin: boolean;
  read: boolean;
}

const SupportChat = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      loadMessages();
      
      // Suscribirse a actualizaciones en tiempo real
      const channel = supabase
        .channel('support_chat_changes')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'support_messages',
            filter: `user_id=eq.${user.id}`
          },
          (payload) => {
            const newMessage = payload.new as Message;
            setMessages(prevMessages => [...prevMessages, newMessage]);
            
            // Marcar como leído si es del admin
            if (newMessage.is_from_admin) {
              markMessageAsRead(newMessage.id);
            }
            
            // Scroll to bottom
            setTimeout(scrollToBottom, 100);
          }
        )
        .subscribe();
      
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('support_messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      
      setMessages(data || []);
      
      // Marcar mensajes del admin como leídos
      if (data && data.length > 0) {
        const unreadAdminMessages = data
          .filter(msg => msg.is_from_admin && !msg.read)
          .map(msg => msg.id);
          
        if (unreadAdminMessages.length > 0) {
          await supabase
            .from('support_messages')
            .update({ read: true })
            .in('id', unreadAdminMessages);
        }
      }
      
    } catch (error: any) {
      console.error('Error cargando mensajes:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los mensajes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setTimeout(scrollToBottom, 100);
    }
  };

  const markMessageAsRead = async (messageId: string) => {
    try {
      await supabase
        .from('support_messages')
        .update({ read: true })
        .eq('id', messageId);
    } catch (error) {
      console.error('Error marcando mensaje como leído:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user) return;
    
    try {
      setIsSending(true);
      
      const messageData = {
        user_id: user.id,
        content: newMessage,
        is_from_admin: false,
        read: false
      };
      
      const { error } = await supabase
        .from('support_messages')
        .insert([messageData]);
        
      if (error) throw error;
      
      setNewMessage('');
      
    } catch (error: any) {
      console.error('Error enviando mensaje:', error);
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  const formatMessageDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center">
            <p>Debes iniciar sesión para contactar con soporte.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[450px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          Soporte
        </CardTitle>
        <CardDescription>
          Envía mensajes a nuestro equipo de soporte
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden p-0">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <ScrollArea className="h-[300px] px-4 py-2" ref={scrollAreaRef as any}>
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <MessageSquare className="h-12 w-12 mb-2 opacity-20" />
                <p>No hay mensajes todavía</p>
                <p className="text-sm">Envía un mensaje para iniciar la conversación</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.is_from_admin ? 'justify-start' : 'justify-end'}`}
                  >
                    {message.is_from_admin && (
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback>S</AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div 
                      className={`max-w-[75%] rounded-lg p-3 ${
                        message.is_from_admin 
                          ? 'bg-muted' 
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p 
                        className={`text-xs mt-1 ${
                          message.is_from_admin 
                            ? 'text-muted-foreground' 
                            : 'text-primary-foreground/70'
                        }`}
                      >
                        {formatMessageDate(message.created_at)}
                      </p>
                    </div>
                    
                    {!message.is_from_admin && (
                      <Avatar className="h-8 w-8 ml-2">
                        <AvatarFallback>
                          {user.user_metadata?.name ? 
                            user.user_metadata.name.charAt(0).toUpperCase() : 
                            user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        )}
      </CardContent>
      
      <CardFooter className="border-t p-3">
        <div className="flex w-full space-x-2">
          <Textarea
            placeholder="Escribe tu mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 min-h-[60px] max-h-[120px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isSending || !newMessage.trim()}
            className="self-end"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Enviar</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SupportChat;
