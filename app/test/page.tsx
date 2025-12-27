'use client'

import { createClient } from '@/lib/supabase/client'

export default function TestPage() {
  const testConnection = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase.from('masters').select('id').limit(1)

      if (error) {
        console.error('Ошибка подключения:', error.message)
        alert('Ошибка: ' + error.message)
      } else {
        console.log('Успешное подключение! Данные:', data)
        alert('Подключение к Supabase работает!')
      }
    } catch (e: any) {
      console.error('Ошибка теста:', e.message || e)
      alert('Ошибка: ' + (e.message || e))
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Тест подключения Supabase</h1>
      <button 
        onClick={testConnection}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Проверить подключение
      </button>
      <div className="mt-4 text-sm">
        <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
        <p>Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20)}...</p>
      </div>
    </div>
  )
}
