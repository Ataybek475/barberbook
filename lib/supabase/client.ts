// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Всегда возвращаем клиент, даже с дефолтными значениями
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy.supabase.co"
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy_key_123"
  
  console.log("Supabase URL:", supabaseUrl ? " Установлен" : " Не установлен")
  
  return createBrowserClient(supabaseUrl, supabaseKey)
}
