import { createBrowserClient } from '@supabase/ssr'

// Получаем значения из переменных окружения
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Проверяем в консоли (удалите после отладки)
if (typeof window !== 'undefined') {
  console.log('Supabase URL:', supabaseUrl ? '✓ Загружен' : '✗ Отсутствует')
  console.log('Supabase Key:', supabaseKey ? '✓ Загружен' : '✗ Отсутствует')
}

// Проверяем перед созданием клиента
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Supabase конфигурация не найдена. Проверьте файл .env.local\n' +
    'NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_ANON_KEY должны быть установлены.'
  )
}

export const createClient = () => {
  return createBrowserClient(supabaseUrl, supabaseKey)
}
