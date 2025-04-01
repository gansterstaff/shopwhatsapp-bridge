import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Send, RefreshCw } from 'lucide-react';

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
}

interface Conversation {
  user_id: string;
  user_email: string;
  user_name: string | null;
  last_message: string;
  unread_count: number;
  last_message_time: string;
}

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
      const { data, error } = await supabase
        .from('support_messages_view')
        .select('*')
        .order('last_message_time', { ascending: false });

      if (error) throw error;

      setConversations(data || []);
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
      
      const { data, error } = await supabase
        .from('support_messages')
        .select(`
          id,
          user_id,
          admin_id,
          content,
          is_from_admin,
          created_at,
          read,
          profiles(email, name)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const formattedMessages = data.map(msg => ({
        ...msg,
        user_email: msg.profiles?.email,
        user_name: msg.profiles?.name
      }));

      setMessages(formattedMessages);
      
      await supabase
        .from('support_messages')
        .update({ read: true })
        .eq('user_id', userId)
        .eq('is_from_admin', false);
        
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

  const handleSendReply = async () => {
    if (!replyText.trim() || !currentUser || !user) return;
    
    try {
      const newMessage = {
        user_id: currentUser,
        admin_id: user.id,
        content: replyText,
        is_from_admin: true,
        read: false
      };
      
      const { error } = await supabase
        .from('support_messages')
        .insert([newMessage]);
        
      if (error) throw error;
      
      setReplyText('');
      loadMessages(currentUser);
      loadConversations();
      
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

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
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
            <ScrollArea className="h-full">
              {conversations.length === 0 ? (
                <div className="flex items-center justify-center h-40 text-center text-muted-foreground">
                  No hay conversaciones disponibles
                </div>
              ) : (
                <div className="divide-y">
                  {conversations.map((conversation) => (
                    <div 
                      key={conversation.user_id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer ${currentUser === conversation.user_id ? 'bg-gray-50' : ''}`}
                      onClick={() => loadMessages(conversation.user_id)}
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar>
                          <AvatarFallback>
                            {getInitials(conversation.user_name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium truncate">
                              {conversation.user_name || conversation.user_email}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {new Date(conversation.last_message_time).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {conversation.last_message}
                          </p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-400">
                              {conversation.user_email}
                            </span>
                            {conversation.unread_count > 0 && (
                              <Badge variant="destructive" className="text-xs px-1.5 py-0">
                                {conversation.unread_count}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
          
          <div className="col-span-8 h-full flex flex-col">
            {currentUser ? (
              <>
                <ScrollArea className="flex-1 p-4">
                  {isLoadingMessages ? (
                    <div className="flex items-center justify-center h-40">
                      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div 
                          key={message.id}
                          className={`flex ${message.is_from_admin ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[70%] rounded-lg p-3 ${
                              message.is_from_admin 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted'
                            }`}
                          >
                            <p>{message.content}</p>
                            <div className={`text-xs mt-1 ${message.is_from_admin ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                              {formatDate(message.created_at)}
                            </div>
                          </div>
                        </div>
                      ))}
                      {messages.length === 0 && (
                        <div className="text-center text-muted-foreground my-12">
                          No hay mensajes en esta conversación
                        </div>
                      )}
                    </div>
                  )}
                </ScrollArea>
                
                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Textarea
                      placeholder="Escribe tu respuesta..."
                      className="flex-1"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={2}
                    />
                    <Button onClick={handleSendReply} className="self-end">
                      <Send className="h-4 w-4 mr-2" />
                      Enviar
                    </Button>
                  </div>
                </div>
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
