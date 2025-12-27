// app/booking/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';

interface Master {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  description: string;
}

export default function BookingPage() {
  const [masters] = useState<Master[]>([
    {
      id: '1',
      name: 'Иван Иванов',
      specialization: 'Барбер',
      experience: 'Опыт работы 6 лет',
      description: 'Специалист по классическим и современным стрижкам'
    },
    {
      id: '2',
      name: 'Петр Петров',
      specialization: 'Стилист',
      experience: 'Опыт работы 5 лет',
      description: 'Специалист по мужским стрижкам и укладкам'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-900">
          Выберите мастера
        </h1>

        <div className="space-y-8">
          {masters.map((master) => (
            <div
              key={master.id}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Левая часть - фото мастера (заглушка) */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-500 text-4xl">
                      {master.name.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Правая часть - информация */}
                <div className="flex-grow">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {master.name}
                    </h2>
                    <div className="inline-block bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-sm font-semibold mb-3">
                      {master.specialization}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <p className="text-gray-700">
                      <span className="font-medium">Опыт:</span> {master.experience}
                    </p>
                    <p className="text-gray-600">
                      {master.description}
                    </p>
                  </div>

                  {/* Кнопка записи */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href={`/booking/time?masterId=${master.id}&masterName=${encodeURIComponent(master.name)}`}
                      className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 text-center"
                    >
                      Записаться к {master.name.split(' ')[0]}
                    </Link>
                    
                    <button
                      onClick={() => {
                        // Здесь можно добавить модальное окно или другую логику
                        alert(`Выбран мастер: ${master.name}`);
                      }}
                      className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-300 text-center"
                    >
                      Подробнее о мастере
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="mt-12 text-center text-gray-600">
          <p className="mb-4">📍 Улица Примерная, 123, Барбершоп "Элита"</p>
          <p>📞 Запись по телефону: +7 (999) 123-45-67</p>
        </div>
      </div>
    </div>
  );
}