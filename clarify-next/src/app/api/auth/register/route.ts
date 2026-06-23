import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { nome, matricula, email, senha, chaveAtivacao } = await req.json()

  if (!nome || !matricula || !email || !senha || !chaveAtivacao) {
    return NextResponse.json(
      { ok: false, mensagem: 'Campos obrigatórios: nome, matricula, email, senha, chaveAtivacao.' },
      { status: 400 }
    )
  }

  const supabase = await createClient()

  const { data: chave } = await supabase
    .from('chaves_ativacao')
    .select('*')
    .eq('code', chaveAtivacao)
    .eq('used', false)
    .single()

  if (!chave) {
    return NextResponse.json(
      { ok: false, mensagem: 'Chave de ativação inválida ou já utilizada.' },
      { status: 400 }
    )
  }

  const supabaseAdmin = createAdminClient()

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password: senha,
    email_confirm: true,
    user_metadata: {
      matricula,
      nome,
      cargo: 'coordenador',
    },
  })

  if (error) {
    return NextResponse.json(
      { ok: false, mensagem: error.message },
      { status: 400 }
    )
  }

  await supabaseAdmin
    .from('chaves_ativacao')
    .update({ used: true })
    .eq('code', chaveAtivacao)

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', data.user!.id)
    .single()

  return NextResponse.json({
    ok: true,
    usuarioLogado: profile
      ? {
          id: profile.id,
          nome: profile.nome,
          matricula: profile.matricula,
          email: profile.email,
          cargo: profile.cargo,
          coordenador_id: profile.coordenador_id,
        }
      : undefined,
  })
}