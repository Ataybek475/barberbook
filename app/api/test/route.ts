import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'

export async function GET() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('masters')
      .select('*')

    return NextResponse.json({
      success: !error,
      error: error?.message || null,
      data: data || [],
      count: data?.length || 0
    })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message || String(e) })
  }
}
