import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { novaDemandaSchema } from '@/schemas/demandas'
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

  const validacao = novaDemandaSchema.safeParse(dados)
  if (!validacao.success) {
    return NextResponse.json(
      {
        ok: false,
        mensagem: 'Dados inválidos.',
        erros: validacao.error.flatten().fieldErrors,
      },
      { status: 400 },
    )
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json(
      { ok: false, mensagem: 'Não autorizado.' },
      { status: 401 },
    )
  }

  const supabaseAdmin = createAdminClient()
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('cargo')
    .eq('id', user.id)
    .single()

  if (profile?.cargo !== 'aluno') {
    return NextResponse.json(
      { ok: false, mensagem: 'Apenas alunos podem criar demandas.' },
      { status: 403 },
    )
  }

  const { data: protocolo } = await supabase.rpc('gerar_proximo_protocolo')
  if (!protocolo) {
    return NextResponse.json(
      { ok: false, mensagem: 'Erro ao gerar protocolo.' },
      { status: 500 },
    )
  }

  const { data } = await supabase
    .from('demandas')
    .insert({
      protocolo,
      aluno_id: user.id,
      tipo: validacao.data.tipo,
      descricao: validacao.data.descricao,
    })
    .select()
    .single()

  if (!data) {
    return NextResponse.json(
      { ok: false, mensagem: 'Erro ao criar demanda.' },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true, data })
}