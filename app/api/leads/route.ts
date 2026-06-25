import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      name?: string
      phone: string
      email?: string
      source?: string
    }

    if (!body.phone?.trim()) {
      return NextResponse.json({ error: 'Телефон обязателен' }, { status: 400 })
    }

    const supabase = await createClient()

    // Runtime is correct; typed once real schema is applied via `supabase gen types`.
    // eslint-disable-next-line
    const { error } = await (supabase as unknown as Record<string, Function>)['from']('leads')['insert']({
      name: body.name ?? null,
      phone: body.phone.trim(),
      email: body.email ?? null,
      source: body.source ?? 'landing_cta',
    })

    if (error) {
      console.error('Lead insert error:', error)
      return NextResponse.json({ error: 'Ошибка сохранения' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Неверный запрос' }, { status: 400 })
  }
}
