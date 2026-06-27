import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

function gerarChave(tamanho = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let chave = ''
  for (let i = 0; i < tamanho; i++) {
    chave += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return chave
}

export async function GET() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('chaves_ativacao')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json(
      { ok: false, mensagem: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json(data)
}

export async function POST() {
  const supabaseAdmin = createAdminClient()
  const chave = gerarChave(8)

  const { data, error } = await supabaseAdmin
    .from('chaves_ativacao')
    .insert({ code: chave, used: false })
    .select()
    .single()

  if (error) {
    return NextResponse.json(
      { ok: false, mensagem: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json(data)
}
