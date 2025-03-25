
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
          role: 'customer' | 'admin'
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          name?: string
          role?: 'customer' | 'admin'
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string
          role?: 'customer' | 'admin'
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
