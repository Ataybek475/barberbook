import { Calendar, Scissors, User } from 'lucide-react'
import BookingButton from '@/components/BookingButton'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          BarberBook  Запись в барбершоп
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Удобная онлайн-запись к лучшим мастерам. Выберите услугу, время и забронируйте за 2 минуты.
        </p>
        <BookingButton />
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Как это работает</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <User className="w-12 h-12 mx-auto mb-4 text-amber-600" />
            <h3 className="text-xl font-semibold mb-2">1. Выберите мастера</h3>
            <p className="text-gray-600">Опытные барберы с портфолио и отзывами</p>
          </div>
          <div className="text-center p-6">
            <Scissors className="w-12 h-12 mx-auto mb-4 text-amber-600" />
            <h3 className="text-xl font-semibold mb-2">2. Подберите услугу</h3>
            <p className="text-gray-600">Стрижки, бритье, укладки с фиксированной ценой</p>
          </div>
          <div className="text-center p-6">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-amber-600" />
            <h3 className="text-xl font-semibold mb-2">3. Забронируйте время</h3>
            <p className="text-gray-600">Удобное расписание с подтверждением записи</p>
          </div>
        </div>
      </section>
    </div>
  )
}
