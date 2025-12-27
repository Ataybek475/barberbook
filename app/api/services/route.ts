// app/api/services/route.ts - БЕЗ SUPABASE!
import { NextResponse } from 'next/server'

const MOCK_SERVICES = [
  { id: 1, name: 'Мужская стрижка', price: 1500, duration: '60 мин' },
  { id: 2, name: 'Стрижка + Борода', price: 2500, duration: '90 мин' },
  { id: 3, name: 'Детская стрижка', price: 1200, duration: '45 мин' },
  { id: 4, name: 'Королевское бритье', price: 1800, duration: '40 мин' }
];

export async function GET() {
  // Всегда возвращаем мок-данные
  return NextResponse.json(MOCK_SERVICES);
}

// Это статический API
export const dynamic = 'force-static';
