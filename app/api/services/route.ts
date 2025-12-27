import { NextResponse } from 'next/server'

const MOCK_SERVICES = [
  {
    id: 1,
    name: "Мужская стрижка",
    price: 1500,
    duration: "60 мин",
    description: "Классическая или современная стрижка"
  },
  {
    id: 2,
    name: "Стрижка + Борода",
    price: 2500,
    duration: "90 мин",
    description: "Комплексный уход"
  },
  {
    id: 3,
    name: "Оформление бороды",
    price: 1000,
    duration: "30 мин",
    description: "Коррекция и укладка бороды"
  },
  {
    id: 4,
    name: "Детская стрижка",
    price: 1200,
    duration: "45 мин",
    description: "Для мальчиков до 12 лет"
  }
]

export async function GET(request: Request) {
  try {
    return NextResponse.json(MOCK_SERVICES, {
      status: 200,
      headers: { 'Cache-Control': 'public, max-age=3600' }
    })
  } catch (error: any) {
    console.error('Error in services API:', error)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}
