import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { nome, matricula, email, senha, chaveAtivacao: chaveAtivacaoRaw } = await req.json()
  const chaveAtivacao = chaveAtivacaoRaw.toUpperCase()

  if (!nome || !matricula || !email || !senha || !chaveAtivacao) {
    return NextResponse.json(
      { ok: false, mensagem: 'Campos obrigatórios: nome, matricula, email, senha, chaveAtivacao.' },
      { status: 400 }
    )
  }

  if (senha.length < 6) {
    return NextResponse.json(
      { ok: false, mensagem: 'Senha deve ter no mínimo 6 caracteres.' },
      { status: 400 }
    )
  }

  // Service-role: valida a chave no servidor sem expor chaves_ativacao via RLS.
  const supabaseAdmin = createAdminClient()

  const { data: chave } = await supabaseAdmin
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
