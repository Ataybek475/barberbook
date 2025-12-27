'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function CheckServices() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function check() {
      try {
        const supabase = createClient()
        const { data } = await supabase.from('services').select('*')
        console.log('Сырые данные услуг:', data)
        setServices(data || [])
      } catch (e) {
        console.error('Ошибка при проверке services:', e)
        setServices([])
      } finally {
        setLoading(false)
      }
    }
    
    check()
  }, [])
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Проверка услуг в базе</h1>
      
      {loading ? (
        <div>Загрузка...</div>
      ) : (
        <>
          <div className="mb-6 p-4 bg-gray-100 rounded-lg">
            <div className="text-lg font-semibold">
              Найдено услуг: <span className={services.length > 0 ? 'text-green-600' : 'text-red-600'}>
                {services.length}
              </span>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              Активных: {services.filter(s => s.is_active).length}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-2">ID (первые 8 символов)</th>
                  <th className="border p-2">Название</th>
                  <th className="border p-2">Цена</th>
                  <th className="border p-2">is_active</th>
                  <th className="border p-2">Длина UUID</th>
                  <th className="border p-2">Статус</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => {
                  const idStr = service.id?.toString() || ''
                  const isValid = idStr.length === 36 && idStr.includes('-')
                  
                  return (
                    <tr key={index} className={isValid ? '' : 'bg-red-50'}>
                      <td className="border p-2 font-mono text-sm">{idStr.substring(0, 8)}...</td>
                      <td className="border p-2">{service.name}</td>
                      <td className="border p-2">{service.price} ₽</td>
                      <td className="border p-2 text-center">
                        <span className={`px-2 py-1 rounded ${service.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {service.is_active ? 'true' : 'false'}
                        </span>
                      </td>
                      <td className="border p-2 text-center">{idStr.length}</td>
                      <td className="border p-2 text-center">
                        {isValid ? '✅' : '❌'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          
          {services.length === 0 && (
            <div className="mt-8 p-6 bg-yellow-50 rounded-lg text-center">
              <div className="text-yellow-800 font-bold text-lg mb-2">Услуг не найдено!</div>
              <p className="text-yellow-700">
                Таблица services пустая. Нужно добавить услуги через Supabase.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
