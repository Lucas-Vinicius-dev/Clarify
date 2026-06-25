import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const coordenadorId = searchParams.get('coordenadorId')
  const cargo = searchParams.get('cargo')
  const matricula = searchParams.get('matricula')
  const email = searchParams.get('email')
  const supabase = await createClient()

  let query = supabase.from('profiles').select('*')

  if (coordenadorId) query = query.eq('coordenador_id', coordenadorId)
  if (cargo) query = query.eq('cargo', cargo)
  if (matricula && email) {
    query = query.or(`matricula.eq.${matricula},email.eq.${email}`)
  } else {
    if (matricula) query = query.eq('matricula', matricula)
    if (email) query = query.eq('email', email)
  }

  const { data } = await query

  return NextResponse.json(data ?? [])
}

export async function POST(req: Request) {
  const { nome, matricula, email, senha, coordenadorId, cargo } = await req.json()
  const supabase = createAdminClient()

  if (!nome || !matricula || !email || !senha) {
    return NextResponse.json(
      { ok: false, mensagem: 'Campos obrigatórios: nome, matricula, email, senha.' },
      { status: 400 }
    )
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password: senha,
    email_confirm: true,
    user_metadata: {
      matricula,
      nome,
      cargo: cargo ?? 'aluno',
    },
  })

  if (error) {
    return NextResponse.json(
      { ok: false, mensagem: error.message },
      { status: 400 }
    )
  }

  if (coordenadorId && data.user) {
    await supabase
      .from('profiles')
      .update({ coordenador_id: coordenadorId })
      .eq('id', data.user.id)
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user!.id)
    .single()

  return NextResponse.json({ ok: true, profile })
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const alunoId = searchParams.get('alunoId')
  const supabase = createAdminClient()

  if (!alunoId) {
    return NextResponse.json(
      { ok: false, mensagem: 'Parâmetro alunoId é obrigatório.' },
      { status: 400 }
    )
  }

  const { error } = await supabase.auth.admin.deleteUser(alunoId)

  if (error) {
    return NextResponse.json(
      { ok: false, mensagem: error.message },
      { status: 400 }
    )
  }

  return NextResponse.json({ ok: true })
}