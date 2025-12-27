import { createBrowserClient } from '@supabase/ssr'

// Экспортируем функцию, которая создаёт клиента при вызове.
// Не бросаем ошибку на этапе импорта, чтобы модули могли безопасно импортироваться
// в средах без настроенных переменных окружения (например, при локальном тесте).
export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (typeof window !== 'undefined') {
    console.log('Supabase URL:', supabaseUrl ? '✓ Загружен' : '✗ Отсутствует')
    console.log('Supabase Key:', supabaseKey ? '✓ Загружен' : '✗ Отсутствует')
  }

  if (!supabaseUrl || !supabaseKey) {
    // Бросим ошибку только при попытке реально создать клиента
    throw new Error('Supabase конфигурация не найдена. Установите NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_ANON_KEY.')
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}
