"use client"

import { useSearchParams } from 'next/navigation'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const masterName = searchParams.get('masterName') || searchParams.get('name') || 'Мастер'
  const date = searchParams.get('date') || ''
  const time = searchParams.get('time') || ''

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Запись подтверждена!</h1>
        <p className="text-lg mb-2">Вы записаны к:</p>
        <p className="text-2xl font-semibold mb-4">{masterName}</p>
        {date && (
          <p className="mb-1">Дата: <strong>{new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}</strong></p>
        )}
        {time && (
          <p className="mb-4">Время: <strong>{time}</strong></p>
        )}

        <div className="flex justify-center gap-3 mt-6">
          <button onClick={() => window.location.href = '/'} className="bg-amber-600 text-white px-5 py-2 rounded">На главную</button>
          <button onClick={() => window.location.href = '/booking'} className="bg-gray-200 px-5 py-2 rounded">Новая запись</button>
        </div>
      </div>
    </div>
  )
}
