// ═════════════════════════════════════════════════════════════════
// API ROUTE: /api/auth/login
// Autenticação via matrícula (RPC) + signInWithPassword
// ═════════════════════════════════════════════════════════════════

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

/**
 * POST /api/auth/login
 * Autentica um usuário usando matrícula + senha.
 * A matrícula é resolvida para email via RPC `get_email_by_matricula`.
 */
export async function POST(req: Request) {
  const { matricula, senha } = await req.json()
  const supabase = await createClient()

  const { data: email } = await supabase
    .rpc('get_email_by_matricula', { p_matricula: matricula })

  if (!email) {
    return NextResponse.json(
      { ok: false, mensagem: 'Usuário não encontrado.' },
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
        mensagem: error.message === 'Invalid login credentials'
          ? 'Chave de segurança incorreta.'
          : error.message,
      },
      { status: 401 }
    )
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single()

  return NextResponse.json({
    ok: true,
    usuarioLogado: profile,
  })
}
