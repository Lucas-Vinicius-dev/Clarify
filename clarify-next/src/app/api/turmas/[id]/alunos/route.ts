import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const [{ id }, { alunoId }, supabase] = await Promise.all([
    params,
    request.json(),
    createClient(),
  ])

  const { error } = await supabase
    .from('turma_alunos')
    .insert({ turma_id: id, aluno_id: alunoId })

  if (error) {
    return NextResponse.json(
      { ok: false, mensagem: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true })
}