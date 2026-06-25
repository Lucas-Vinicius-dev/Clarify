import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ protocolo: string }> }
) {
  const [{ protocolo }, supabase] = await Promise.all([
    params,
    createClient(),
  ])

  const { data } = await supabase
    .from('demandas')
    .select('*')
    .eq('protocolo', protocolo)
    .maybeSingle()

  if (!data) {
    return NextResponse.json(
      { ok: false, mensagem: 'Demanda não encontrada.' },
      { status: 404 }
    )
  }

  return NextResponse.json(data)
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ protocolo: string }> }
) {
  const [{ protocolo }, body, supabase] = await Promise.all([
    params,
    request.json(),
    createClient(),
  ])

  const updateData: Record<string, string> = {
    status: body.status,
    data_atualizacao: new Date().toISOString().split('T')[0],
  }
  if (body.feedback !== undefined) updateData.feedback = body.feedback

  const { data } = await supabase
    .from('demandas')
    .update(updateData)
    .eq('protocolo', protocolo)
    .select()
    .single()

  if (!data) {
    return NextResponse.json(
      { ok: false, mensagem: 'Demanda não encontrada.' },
      { status: 404 }
    )
  }

  return NextResponse.json({ ok: true, data })
}