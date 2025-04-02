
-- Add image column to promotional_banners table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'promotional_banners'
    AND column_name = 'image'
  ) THEN
    ALTER TABLE public.promotional_banners ADD COLUMN image TEXT;
  END IF;
END $$;

-- Create storage bucket for products if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for banners if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('banners', 'banners', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for the products bucket
BEGIN;
  -- Create a policy that allows authenticated users to upload files
  INSERT INTO storage.policies (name, bucket_id, operation, definition)
  VALUES (
    'Authenticated users can upload files to products',
    'products',
    'INSERT',
    '(auth.role() = ''authenticated'')'
  )
  ON CONFLICT (name, bucket_id, operation) DO NOTHING;

  -- Create a policy that allows everyone to download files (public access)
  INSERT INTO storage.policies (name, bucket_id, operation, definition)
  VALUES (
    'Public access to products files',
    'products',
    'SELECT',
    'true'
  )
  ON CONFLICT (name, bucket_id, operation) DO NOTHING;

  -- Create a policy that allows authenticated users to update files they own
  INSERT INTO storage.policies (name, bucket_id, operation, definition)
  VALUES (
    'Authenticated users can update files in products',
    'products',
    'UPDATE',
    '(auth.role() = ''authenticated'')'
  )
  ON CONFLICT (name, bucket_id, operation) DO NOTHING;

  -- Create a policy that allows authenticated users to delete files they own
  INSERT INTO storage.policies (name, bucket_id, operation, definition)
  VALUES (
    'Authenticated users can delete files in products',
    'products',
    'DELETE',
    '(auth.role() = ''authenticated'')'
  )
  ON CONFLICT (name, bucket_id, operation) DO NOTHING;
COMMIT;

-- Storage policies for the banners bucket
BEGIN;
  -- Create a policy that allows authenticated users to upload files
  INSERT INTO storage.policies (name, bucket_id, operation, definition)
  VALUES (
    'Authenticated users can upload files to banners',
    'banners',
    'INSERT',
    '(auth.role() = ''authenticated'')'
  )
  ON CONFLICT (name, bucket_id, operation) DO NOTHING;

  -- Create a policy that allows everyone to download files (public access)
  INSERT INTO storage.policies (name, bucket_id, operation, definition)
  VALUES (
    'Public access to banners files',
    'banners',
    'SELECT',
    'true'
  )
  ON CONFLICT (name, bucket_id, operation) DO NOTHING;

  -- Create a policy that allows authenticated users to update files they own
  INSERT INTO storage.policies (name, bucket_id, operation, definition)
  VALUES (
    'Authenticated users can update files in banners',
    'banners',
    'UPDATE',
    '(auth.role() = ''authenticated'')'
  )
  ON CONFLICT (name, bucket_id, operation) DO NOTHING;

  -- Create a policy that allows authenticated users to delete files they own
  INSERT INTO storage.policies (name, bucket_id, operation, definition)
  VALUES (
    'Authenticated users can delete files in banners',
    'banners',
    'DELETE',
    '(auth.role() = ''authenticated'')'
  )
  ON CONFLICT (name, bucket_id, operation) DO NOTHING;
COMMIT;
