export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      analytics_events: {
        Row: {
          button_text: string | null
          category: string | null
          event_type: string
          id: string
          page: string | null
          product_id: number | null
          product_name: string | null
          referrer: string | null
          search_query: string | null
          session_id: string
          timestamp: string
          user_id: string | null
        }
        Insert: {
          button_text?: string | null
          category?: string | null
          event_type: string
          id?: string
          page?: string | null
          product_id?: number | null
          product_name?: string | null
          referrer?: string | null
          search_query?: string | null
          session_id: string
          timestamp?: string
          user_id?: string | null
        }
        Update: {
          button_text?: string | null
          category?: string | null
          event_type?: string
          id?: string
          page?: string | null
          product_id?: number | null
          product_name?: string | null
          referrer?: string | null
          search_query?: string | null
          session_id?: string
          timestamp?: string
          user_id?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          price: number
          product_id: number
          quantity: number
        }
        Insert: {
          id?: string
          order_id: string
          price: number
          product_id: number
          quantity: number
        }
        Update: {
          id?: string
          order_id?: string
          price?: number
          product_id?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          id: string
          status: string | null
          total: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          status?: string | null
          total: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          status?: string | null
          total?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string
          created_at: string | null
          description: string
          discount: number | null
          featured: boolean | null
          id: number
          image_bucket: string | null
          image_path: string | null
          image_url: string
          name: string
          old_price: number | null
          price: number
          sku: string | null
          stock: number
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          discount?: number | null
          featured?: boolean | null
          id?: number
          image_bucket?: string | null
          image_path?: string | null
          image_url: string
          name: string
          old_price?: number | null
          price: number
          sku?: string | null
          stock?: number
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          discount?: number | null
          featured?: boolean | null
          id?: number
          image_bucket?: string | null
          image_path?: string | null
          image_url?: string
          name?: string
          old_price?: number | null
          price?: number
          sku?: string | null
          stock?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string | null
          role: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          name?: string | null
          role?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string | null
          role?: string | null
        }
        Relationships: []
      }
      promotional_banners: {
        Row: {
          active: boolean | null
          background_color: string
          code: string | null
          content: string
          created_at: string | null
          discount: number | null
          id: number
          image_bucket: string | null
          image_path: string | null
          image_url: string | null
          text_color: string
          title: string
        }
        Insert: {
          active?: boolean | null
          background_color?: string
          code?: string | null
          content: string
          created_at?: string | null
          discount?: number | null
          id?: number
          image_bucket?: string | null
          image_path?: string | null
          image_url?: string | null
          text_color?: string
          title: string
        }
        Update: {
          active?: boolean | null
          background_color?: string
          code?: string | null
          content?: string
          created_at?: string | null
          discount?: number | null
          id?: number
          image_bucket?: string | null
          image_path?: string | null
          image_url?: string | null
          text_color?: string
          title?: string
        }
        Relationships: []
      }
      support_messages: {
        Row: {
          admin_id: string | null
          content: string
          created_at: string | null
          id: string
          is_from_admin: boolean | null
          read: boolean | null
          user_id: string
        }
        Insert: {
          admin_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          is_from_admin?: boolean | null
          read?: boolean | null
          user_id: string
        }
        Update: {
          admin_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          is_from_admin?: boolean | null
          read?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      support_messages_view: {
        Row: {
          last_message: string | null
          last_message_time: string | null
          unread_count: number | null
          user_email: string | null
          user_id: string | null
          user_name: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_event_metrics: {
        Args: {
          event_type: string
          start_date: string
          end_date: string
        }
        Returns: {
          total_count: number
          unique_users: number
          daily_counts: Json
        }[]
      }
      get_loyal_user_metrics: {
        Args: {
          min_visits: number
          start_date: string
          end_date: string
        }
        Returns: {
          user_id: string
          visit_count: number
          last_visit: string
        }[]
      }
      get_user_registrations: {
        Args: {
          start_date: string
          end_date: string
        }
        Returns: {
          total_count: number
          daily_counts: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
