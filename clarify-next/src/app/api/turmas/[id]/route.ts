import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const [{ id }, supabase] = await Promise.all([params, createClient()])

  const { error } = await supabase.from('turmas').delete().eq('id', id)

  if (error) {
    return NextResponse.json(
      { ok: false, mensagem: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true })
}