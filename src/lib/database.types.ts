
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          created_at: string
          name: string
          description: string
          price: number
          old_price?: number
          discount?: number
          image: string
          category: string
          stock: number
          featured: boolean
        }
        Insert: {
          id?: number
          created_at?: string
          name: string
          description: string
          price: number
          old_price?: number
          discount?: number
          image: string
          category: string
          stock: number
          featured?: boolean
        }
        Update: {
          id?: number
          created_at?: string
          name?: string
          description?: string
          price?: number
          old_price?: number
          discount?: number
          image?: string
          category?: string
          stock?: number
          featured?: boolean
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          email: string
          name?: string
          role: 'owner' | 'admin' | 'customer'
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          name?: string
          role?: 'owner' | 'admin' | 'customer'
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string
          role?: 'owner' | 'admin' | 'customer'
        }
      }
      orders: {
        Row: {
          id: string
          created_at: string
          user_id: string
          status: 'pending' | 'completed' | 'cancelled'
          total: number
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          status?: 'pending' | 'completed' | 'cancelled'
          total: number
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          status?: 'pending' | 'completed' | 'cancelled'
          total?: number
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: number
          quantity: number
          price: number
        }
        Insert: {
          id?: string
          order_id: string
          product_id: number
          quantity: number
          price: number
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: number
          quantity?: number
          price?: number
        }
      }
      admin_permissions: {
        Row: {
          id: string
          owner_id: string
          admin_id: string
          created_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          admin_id: string
          created_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          admin_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_assigned_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      has_admin_access: {
        Args: Record<string, never>
        Returns: boolean
      }
    }
    Enums: {
      user_role: 'owner' | 'admin' | 'customer'
    }
  }
}
