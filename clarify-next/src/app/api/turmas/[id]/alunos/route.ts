import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { alunoId } = await request.json()
  const supabase = createAdminClient()

  await supabase
    .from('turma_alunos')
    .insert({ turma_id: id, aluno_id: alunoId })

  return NextResponse.json({ ok: true })
}
