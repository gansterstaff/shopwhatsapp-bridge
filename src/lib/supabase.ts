
import { createClient } from '@supabase/supabase-js';
import { type Database } from './database.types';

// Supabase credentials
const supabaseUrl = 'https://yvwkgmvksgwtykdlhdgs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2d2tnbXZrc2d3dHlrZGxoZGdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4OTc4ODgsImV4cCI6MjA1ODQ3Mzg4OH0.gKkKf8QQcMJA9OcifX308wdv_9a-nl249f50FC7W2VQ';

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
