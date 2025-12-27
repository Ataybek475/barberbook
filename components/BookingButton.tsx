"use client"

import { useRouter } from 'next/navigation'

export default function BookingButton() {
  const router = useRouter()
  
  return (
    <button
      onClick={() => router.push('/booking')}
      className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 shadow-lg hover:scale-105"
    >
      Записаться онлайн
    </button>
  )
}
