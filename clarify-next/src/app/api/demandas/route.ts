import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const alunoId = searchParams.get('alunoId')
  const status = searchParams.get('status')
  const supabase = await createClient()

  let query = supabase.from('demandas').select('*')

  if (alunoId) query = query.eq('aluno_id', alunoId)
  if (status) query = query.eq('status', status)

  const { data } = await query.order('created_at', { ascending: false })

  return NextResponse.json(data ?? [])
}

export async function POST(request: Request) {
  const [dados, supabase] = await Promise.all([
    request.json(),
    createClient(),
  ])

  const { data: protocolo } = await supabase.rpc('gerar_proximo_protocolo')
  if (!protocolo) {
    return NextResponse.json(
      { ok: false, mensagem: 'Erro ao gerar protocolo.' },
      { status: 500 }
    )
  }

  const { data } = await supabase
    .from('demandas')
    .insert({
      protocolo,
      aluno_id: dados.alunoId,
      tipo: dados.tipo,
      descricao: dados.descricao,
    })
    .select()
    .single()

  if (!data) {
    return NextResponse.json(
      { ok: false, mensagem: 'Erro ao criar demanda.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true, data })
}