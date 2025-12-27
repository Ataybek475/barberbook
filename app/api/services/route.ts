import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'

const FAKE_SERVICES = [
  { id: 's1', name: 'Мужская стрижка', price: 1500, duration_minutes: 60 },
  { id: 's2', name: 'Стрижка + борода', price: 2500, duration_minutes: 90 },
  { id: 's3', name: 'Детская стрижка', price: 1200, duration_minutes: 45 }
]

export async function GET() {
  try {
    // Если переменные окружения не настроены — вернём фейковые данные
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({ success: true, error: null, data: FAKE_SERVICES, count: FAKE_SERVICES.length })
    }

    const supabase = createClient()

    const { data, error } = await supabase
      .from('services')
      .select('*')

    return NextResponse.json({
      success: !error,
      error: error?.message || null,
      data: data || [],
      count: data?.length || 0
    })
  } catch (e: any) {
    console.error('services API error:', e)
    return NextResponse.json({ success: false, error: e.message || String(e), data: FAKE_SERVICES, count: FAKE_SERVICES.length })
  }
}
