import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; alunoId: string }> }
) {
  const { id, alunoId } = await params
  const supabase = createAdminClient()

  await supabase
    .from('turma_alunos')
    .delete()
    .eq('turma_id', id)
    .eq('aluno_id', alunoId)

  return NextResponse.json({ ok: true })
}
