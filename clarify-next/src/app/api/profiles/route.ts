// ═════════════════════════════════════════════════════════════════
// API ROUTE: /api/profiles
// Criação e remoção de alunos (admin / service role)
// ═════════════════════════════════════════════════════════════════

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

/**
 * Cliente Supabase com service role — usado apenas neste arquivo
 * para operações administrativas (criar/deletar usuários).
 */
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

/**
 * POST /api/profiles
 * Cria um novo usuário (aluno) via Admin API.
 * Body: { nome, matricula, email, senha, coordenadorId? }
 */
export async function POST(req: Request) {
  const { nome, matricula, email, senha, coordenadorId } = await req.json()

  if (!nome || !matricula || !email || !senha) {
    return NextResponse.json(
      { ok: false, mensagem: 'Campos obrigatórios: nome, matricula, email, senha.' },
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
      cargo: 'aluno',
    },
  })

  if (error) {
    return NextResponse.json(
      { ok: false, mensagem: error.message },
      { status: 400 }
    )
  }

  if (coordenadorId && data.user) {
    await supabaseAdmin
      .from('profiles')
      .update({ coordenador_id: coordenadorId })
      .eq('id', data.user.id)
  }

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', data.user!.id)
    .single()

  return NextResponse.json({ ok: true, profile })
}

/**
 * DELETE /api/profiles?alunoId=xxx
 * Deleta um usuário (aluno) via Admin API.
 * O CASCADE no banco remove demandas e vínculos de turma.
 */
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const alunoId = searchParams.get('alunoId')

  if (!alunoId) {
    return NextResponse.json(
      { ok: false, mensagem: 'Parâmetro alunoId é obrigatório.' },
      { status: 400 }
    )
  }

  const { error } = await supabaseAdmin.auth.admin.deleteUser(alunoId)

  if (error) {
    return NextResponse.json(
      { ok: false, mensagem: error.message },
      { status: 400 }
    )
  }

  return NextResponse.json({ ok: true })
}
