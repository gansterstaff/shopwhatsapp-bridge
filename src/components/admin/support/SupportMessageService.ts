
import { supabase } from '@/lib/supabase';

export interface Message {
  id: string;
  user_id: string;
  admin_id: string | null;
  content: string;
  is_from_admin: boolean;
  created_at: string;
  read: boolean;
  user_email?: string;
  user_name?: string;
  // Update the profiles property to accept an object or undefined
  profiles?: {
    email: string;
    name: string | null;
  };
}

export interface Conversation {
  user_id: string;
  user_email: string;
  user_name: string | null;
  last_message: string;
  unread_count: number;
  last_message_time: string;
}

const SupportMessageService = {
  async getConversations(): Promise<Conversation[]> {
    const { data, error } = await supabase
      .from('support_messages_view')
      .select('*')
      .order('last_message_time', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getMessages(userId: string): Promise<Message[]> {
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

    // Transform the data to match the Message interface
    const formattedMessages: Message[] = data.map(msg => {
      // Extract profiles data correctly - it might be null or an object, not an array
      const profileData = msg.profiles;
      
      return {
        id: msg.id,
        user_id: msg.user_id,
        admin_id: msg.admin_id,
        content: msg.content,
        is_from_admin: msg.is_from_admin,
        created_at: msg.created_at,
        read: msg.read,
        // Handle profile data appropriately
        user_email: profileData?.email,
        user_name: profileData?.name,
        profiles: profileData
      };
    });

    return formattedMessages;
  },

  async markMessagesAsRead(userId: string): Promise<void> {
    const { error } = await supabase
      .from('support_messages')
      .update({ read: true })
      .eq('user_id', userId)
      .eq('is_from_admin', false);

    if (error) throw error;
  },

  async sendAdminReply(userId: string, adminId: string, content: string): Promise<void> {
    const newMessage = {
      user_id: userId,
      admin_id: adminId,
      content,
      is_from_admin: true,
      read: false
    };
    
    const { error } = await supabase
      .from('support_messages')
      .insert([newMessage]);
      
    if (error) throw error;
  }
};

export default SupportMessageService;
