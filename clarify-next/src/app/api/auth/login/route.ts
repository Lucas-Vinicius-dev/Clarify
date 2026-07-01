// ═════════════════════════════════════════════════════════════════
// API ROUTE: /api/auth/login
// Autenticação via matrícula (RPC) + signInWithPassword
// ═════════════════════════════════════════════════════════════════

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

/**
 * POST /api/auth/login
 * Autentica um usuário usando matrícula + senha.
 * A matrícula é resolvida para email via RPC `get_email_by_matricula`.
 */
export async function POST(req: Request) {
  const [{ matricula, senha }, supabase] = await Promise.all([
    req.json(),
    createClient(),
  ])

  const { data: email } = await supabase
    .rpc('get_email_by_matricula', { p_matricula: matricula })

  if (!email) {
    return NextResponse.json(
      { ok: false, mensagem: 'Usuário ou senha incorretos.' },
      { status: 401 }
    )
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  })

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        mensagem: 'Usuário ou senha incorretos.',
      },
      { status: 401 }
    )
  }

  const supabaseAdmin = createAdminClient()

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single()

  if (profile && !profile.ativo) {
    await supabaseAdmin.auth.admin.signOut(data.user.id)
    return NextResponse.json(
      { ok: false, mensagem: 'Conta desativada. Contate o administrador.' },
      { status: 403 }
    )
  }

  return NextResponse.json({
    ok: true,
    usuarioLogado: profile,
  })
}
