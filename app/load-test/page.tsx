'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoadTest() {
  const [masters, setMasters] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  useEffect(() => {
    async function testLoad() {
      try {
        const supabase = createClient()
        console.log('Тест: создан клиент Supabase')
        
        const { data, error } = await supabase
          .from('masters')
          .select('*')
          .eq('is_active', true)
          .limit(5)
        
        if (error) {
          setError(error.message)
          console.error('Тестовая ошибка:', error)
        } else {
          setMasters(data || [])
          console.log('Тест: загружено', data?.length, 'мастеров')
        }
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    testLoad()
  }, [])
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Тест загрузки мастеров</h1>
      
      {loading && <div>Загрузка...</div>}
      
      {error && (
        <div className="bg-red-100 p-4 rounded mb-4">
          <div className="text-red-700 font-bold">Ошибка:</div>
          <div className="text-red-600">{error}</div>
        </div>
      )}
      
      <div className="mb-4">
        <div className="font-semibold">Найдено мастеров: {masters.length}</div>
        <div className="text-sm text-gray-600">
          {process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30)}...
        </div>
      </div>
      
      {masters.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {masters.map(master => (
            <div key={master.id} className="border p-3 rounded">
              <div className="font-bold">{master.name}</div>
              <div className="text-amber-600">{master.specialization}</div>
              <div className="text-xs text-gray-500 mt-1">
                ID: {master.id.substring(0, 8)}...
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
