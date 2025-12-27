"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, Calendar, User, Scissors, Clock } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Master = {
  id: string
  name: string
  specialization: string
  description?: string
}

type Service = {
  id: string
  name: string
  duration_minutes: number
  price: number
  description?: string
}

type FormData = {
  masterId: string
  serviceId: string
  date: string
  time: string
  clientName: string
  clientPhone: string
  clientEmail: string
}

export default function BookingClient() {
  const router = useRouter()
  const supabase = createClient()

  const [step, setStep] = useState(1)
  const [masters, setMasters] = useState<Master[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    masterId: '',
    serviceId: '',
    date: '',
    time: '',
    clientName: '',
    clientPhone: '',
    clientEmail: ''
  })

  useEffect(() => {
    console.log('Supabase URL (env):', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓' : '✗')
    console.log('Supabase Key (env):', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓' : '✗')
  }, [])

  useEffect(() => {
    async function loadMasters() {
      console.log('=== ЗАГРУЗКА МАСТЕРОВ ===')
      try {
        const supabaseClient = createClient()
        const { data, error, status, count } = await supabaseClient
          .from('masters')
          .select('*', { count: 'exact' })
          .eq('is_active', true)

        console.log('masters status:', status)
        console.log('masters error:', error)
        console.log('masters count:', count)
        console.log('masters data:', data)

        if (error) {
          console.error('Ошибка masters:', error)
          setMasters([
            { id: 'debug-1', name: 'Тест Мастер 1', specialization: 'Барбер', description: 'Для отладки' },
            { id: 'debug-2', name: 'Тест Мастер 2', specialization: 'Стилист', description: 'Для отладки' }
          ])
        } else {
          setMasters(data || [])
        }

        // Load services
        try {
          const { data: servicesData, error: servicesError, status: servicesStatus } = await supabaseClient
            .from('services')
            .select('id, name, duration_minutes, price, description, is_active')
            .eq('is_active', true)
            .order('price')

          console.log('services status:', servicesStatus)
          console.log('services error:', servicesError)
          console.log('services data:', servicesData)

          if (servicesError) {
            console.error('Ошибка services:', servicesError)
            setServices([
              { id: 'backup-1', name: 'Мужская стрижка', duration_minutes: 60, price: 1500, description: 'Стрижка' },
              { id: 'backup-2', name: 'Детская стрижка', duration_minutes: 45, price: 1200, description: 'Стрижка для детей' }
            ])
          } else {
            if (!servicesData || (Array.isArray(servicesData) && servicesData.length === 0)) {
              setServices([
                { id: 'backup-1', name: 'Мужская стрижка', duration_minutes: 60, price: 1500, description: 'Стрижка' },
                { id: 'backup-2', name: 'Детская стрижка', duration_minutes: 45, price: 1200, description: 'Стрижка для детей' }
              ])
            } else {
              setServices(servicesData || [])
            }
          }
        } catch (e) {
          console.error('Критическая ошибка services:', e)
          setServices([])
        }

      } catch (err) {
        console.error('Неожиданная ошибка при загрузке masters:', err)
      } finally {
        setLoading(false)
        console.log('=== ЗАГРУЗКА ЗАВЕРШЕНА ===')
      }
    }

    loadMasters()
  }, [])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    console.log('=== ДАННЫЕ ДЛЯ ОТПРАВКИ ===', formData)

    if (!formData.masterId || !formData.serviceId || !formData.date || !formData.time || !formData.clientName || !formData.clientPhone) {
      alert('Пожалуйста, заполните все обязательные поля')
      return
    }

    setSubmitting(true)
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([{
          master_id: formData.masterId,
          service_id: formData.serviceId,
          date: formData.date,
          time: formData.time,
          client_name: formData.clientName,
          client_phone: formData.clientPhone,
          client_email: formData.clientEmail || null,
          status: 'booked'
        }])
        .select()

      console.log('insert result:', { data, error })

      if (error) {
        console.error('Ошибка вставки:', error)
        const msg = (error as any).message || 'Ошибка записи'
        if (msg.includes('foreign key') || msg.includes('invalid input syntax for type uuid')) {
          alert('Ошибка: неверный ID мастера или услуги. Обновите страницу и попробуйте снова.')
        } else if (msg.includes('null value')) {
          alert('Ошибка: отсутствует обязательное поле. Проверьте форму.')
        } else {
          alert(`Ошибка: ${msg}`)
        }
        return
      }

      router.push(`/booking/success?name=${encodeURIComponent(formData.clientName)}&date=${formData.date}&time=${formData.time}`)
    } catch (err: any) {
      console.error('Неожиданная ошибка при вставке:', err)
      alert(`Ошибка записи: ${err.message || String(err)}`)
    } finally {
      setSubmitting(false)
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1: return !!formData.masterId
      case 2: return !!formData.serviceId
      case 3: return !!formData.date && !!formData.time
      case 4: return !!formData.clientName && !!formData.clientPhone
      default: return false
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка данных...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8">
          <button onClick={() => router.push('/')} className="text-amber-600 hover:text-amber-700 flex items-center">
            <ChevronLeft className="w-4 h-4 mr-1" />
            На главную
          </button>

          <div className="flex items-center justify-between mt-4">
            <h1 className="text-3xl font-bold text-gray-900">Онлайн запись</h1>
            <div className="text-gray-500">Шаг {step} из 4</div>
          </div>

          <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-amber-600 transition-all duration-300" style={{ width: `${step * 25}%` }}></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {step === 1 && (
            <div>
              <div className="flex items-center mb-6">
                <User className="w-6 h-6 text-amber-600 mr-3" />
                <h2 className="text-2xl font-semibold">Выберите мастера</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {masters.map(master => (
                  <button
                    key={master.id}
                    onClick={() => {
                      handleInputChange('masterId', master.id)
                      router.push(`/booking/time?masterId=${master.id}&masterName=${encodeURIComponent(master.name)}`)
                    }}
                    className={`p-4 border-2 rounded-xl text-left transition-all ${formData.masterId === master.id ? 'border-amber-600 bg-amber-50' : 'border-gray-200 hover:border-amber-300'}`}
                  >
                    <div className="font-semibold text-lg">{master.name}</div>
                    <div className="text-amber-600 mt-1">{master.specialization}</div>
                    <div className="text-gray-600 text-sm mt-2">{master.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center mb-6">
                <Scissors className="w-6 h-6 text-amber-600 mr-3" />
                <h2 className="text-2xl font-semibold">Выберите услугу</h2>
              </div>

              {services.length > 0 ? (
                <div className="space-y-4">
                  {services.map((service: any) => (
                    <button key={service.id} onClick={() => handleInputChange('serviceId', service.id)} className={`w-full p-4 border-2 rounded-xl text-left transition-all ${formData.serviceId === service.id ? 'border-amber-600 bg-amber-50' : 'border-gray-200 hover:border-amber-300'}`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-lg">{service.name}</div>
                          <div className="text-gray-600 text-sm mt-1">{service.duration_minutes} мин • {service.description}</div>
                        </div>
                        <div className="font-bold text-lg">{service.price} ₽</div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">✂️</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Услуги не найдены</h3>
                  <p className="text-gray-600 mb-4">В базе данных нет активных услуг.</p>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="flex items-center mb-6">
                <Calendar className="w-6 h-6 text-amber-600 mr-3" />
                <h2 className="text-2xl font-semibold">Выберите дату и время</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Дата</label>
                  <input type="date" min={new Date().toISOString().split('T')[0]} value={formData.date} onChange={(e) => handleInputChange('date', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none" />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Время</label>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-400 mr-3" />
                    <select value={formData.time} onChange={(e) => handleInputChange('time', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none">
                      <option value="">Выберите время</option>
                      {['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="flex items-center mb-6">
                <User className="w-6 h-6 text-amber-600 mr-3" />
                <h2 className="text-2xl font-semibold">Ваши контактные данные</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Имя *</label>
                  <input type="text" value={formData.clientName} onChange={(e) => handleInputChange('clientName', e.target.value)} placeholder="Введите ваше имя" className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none" />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Телефон *</label>
                  <input type="tel" value={formData.clientPhone} onChange={(e) => handleInputChange('clientPhone', e.target.value)} placeholder="Например, +7 900 000 00 00" className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none" />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Email (необязательно)</label>
                  <input type="email" value={formData.clientEmail} onChange={(e) => handleInputChange('clientEmail', e.target.value)} placeholder="example@mail.com" className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none" />
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <div>
              {step > 1 && (
                <button onClick={() => setStep(prev => Math.max(1, prev - 1))} className="px-4 py-2 rounded-lg border hover:bg-gray-50">
                  <ChevronLeft className="inline w-4 h-4 mr-2" /> Назад
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {step < 4 && (
                <button onClick={() => { if (canProceed()) setStep(prev => prev + 1) }} disabled={!canProceed()} className="px-5 py-3 bg-amber-600 text-white rounded-lg disabled:opacity-60">
                  Далее <ChevronRight className="inline w-4 h-4 ml-2" />
                </button>
              )}

              {step === 4 && (
                <button onClick={handleSubmit} disabled={submitting} className="px-6 py-3 bg-amber-600 text-white rounded-lg disabled:opacity-60">
                  {submitting ? 'Отправка...' : 'Подтвердить и записаться'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
