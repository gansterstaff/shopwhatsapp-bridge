
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yvwkgmvksgwtykdlhdgs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2d2tnbXZrc2d3dHlrZGxoZGdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4OTc4ODgsImV4cCI6MjA1ODQ3Mzg4OH0.gKkKf8QQcMJA9OcifX308wdv_9a-nl249f50FC7W2VQ";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
