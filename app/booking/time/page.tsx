"use client"

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

const TIME_SLOTS = [
  '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'
]

export default function TimePage() {
  const searchParams = useSearchParams()
  const masterId = searchParams.get('masterId')
  const masterName = searchParams.get('masterName') || 'Мастер'

  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert('Пожалуйста, выберите дату и время')
      return
    }

    // Перейти на страницу успеха с данными
    window.location.href = `/booking/success?masterName=${encodeURIComponent(masterName)}&date=${selectedDate}&time=${selectedTime}`
  }

  const generateDates = () => {
    const dates: string[] = []
    const today = new Date()
    for (let i = 1; i <= 7; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() + i)
      if (d.getDay() !== 0) dates.push(d.toISOString().split('T')[0])
    }
    return dates
  }

  const dates = generateDates()

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/booking" className="text-amber-600 hover:text-amber-800 mb-6 inline-block">← Назад к выбору мастера</Link>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-6">Выберите дату и время</h1>

          <div className="mb-6 p-4 bg-amber-50 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Мастер</h2>
            <p className="text-gray-800">{masterName} {masterId ? `• id ${masterId.substring(0,8)}...` : ''}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3">Выберите дату</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {dates.map(d => (
                <button key={d} onClick={() => setSelectedDate(d)} className={`p-3 rounded-lg border ${selectedDate === d ? 'border-amber-600 bg-amber-50' : 'border-gray-200'}`}>
                  <div className="text-sm text-gray-600">{new Date(d).toLocaleDateString('ru-RU', { weekday: 'short' })}</div>
                  <div className="font-semibold">{new Date(d).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3">Выберите время</h3>
            <div className="grid grid-cols-3 gap-3">
              {TIME_SLOTS.map(t => (
                <button key={t} onClick={() => setSelectedTime(t)} className={`py-3 rounded-lg border ${selectedTime === t ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleConfirm} disabled={!selectedDate || !selectedTime} className={`w-full py-3 rounded-lg font-semibold ${selectedDate && selectedTime ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}>
            {selectedDate && selectedTime ? `Подтвердить на ${selectedDate} ${selectedTime}` : 'Выберите дату и время'}
          </button>

          {selectedDate && selectedTime && (
            <div className="mt-4 p-3 bg-gray-100 rounded">
              <div className="text-sm">Запись к <strong>{masterName}</strong></div>
              <div className="text-sm">Дата: {new Date(selectedDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}</div>
              <div className="text-sm">Время: {selectedTime}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
