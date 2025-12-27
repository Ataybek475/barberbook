'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function DebugPage() {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string>('')
  
  useEffect(() => {
    async function test() {
      try {
        const supabase = createClient()
        console.log('Тест Supabase: отправляю запрос к таблице masters')
        const { data, error } = await supabase.from('masters').select('*')
        if (error) {
          setError(error.message)
          console.error('Ошибка:', error)
        } else {
          setData(data)
          console.log('Успех! Данные:', data)
        }
      } catch (e: any) {
        setError(e.message || String(e))
        console.error('Критическая ошибка:', e)
      }
    }

    test()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Отладка Supabase</h1>

      {error && (
        <div className="bg-red-50 p-4 rounded mb-4">
          <div className="text-red-700 font-bold">Ошибка:</div>
          <div className="text-red-600">{error}</div>
        </div>
      )}

      {data && (
        <div className="bg-green-50 p-4 rounded mb-4">
          <div className="text-green-700 font-bold">Успешно! Мастеров: {data.length}</div>
          <pre className="mt-2 text-sm">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Информация:</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 p-3 rounded">
            <div className="text-sm text-gray-500">Порт</div>
            <div className="font-mono">{typeof window !== 'undefined' ? window.location.port : '—'}</div>
          </div>
          <div className="bg-gray-100 p-3 rounded">
            <div className="text-sm text-gray-500">Домен</div>
            <div className="font-mono">{process.env.NEXT_PUBLIC_SUPABASE_URL}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
