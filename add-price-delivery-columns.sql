-- Add original_price and delivery_charge columns to products table
-- Run this in Supabase SQL Editor

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS original_price INTEGER DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS delivery_charge INTEGER DEFAULT NULL;

-- Verify columns were added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'products'
  AND column_name IN ('original_price', 'delivery_charge');
