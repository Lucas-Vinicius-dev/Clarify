import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; alunoId: string }> }
) {
  const [{ id, alunoId }, supabase] = await Promise.all([params, createClient()])

  const { error } = await supabase
    .from('turma_alunos')
    .delete()
    .eq('turma_id', id)
    .eq('aluno_id', alunoId)

  if (error) {
    return NextResponse.json(
      { ok: false, mensagem: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true })
}