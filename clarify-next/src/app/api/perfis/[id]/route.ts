import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

const ALLOWED_UPDATE_FIELDS = ['coordenador_id', 'nome', 'telefone', 'ativo']

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const [{ id }, supabase] = await Promise.all([params, createClient()])

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (!data) {
    return NextResponse.json(
      { ok: false, mensagem: 'Perfil não encontrado.' },
      { status: 404 }
    )
  }

  return NextResponse.json(data)
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const [{ id }, body, supabase] = await Promise.all([
    params,
    request.json(),
    createClient(),
  ])

  const updateData = Object.fromEntries(
    Object.entries(body).filter(([k]) => ALLOWED_UPDATE_FIELDS.includes(k))
  )

  const { data, error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return NextResponse.json(
      { ok: false, mensagem: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true, data })
}