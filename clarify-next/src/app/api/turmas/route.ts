import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()

  const { data: turmas } = await supabase
    .from('turmas')
    .select('*')
    .order('created_at', { ascending: false })

  const { data: allAlunos } = await supabase
    .from('turma_alunos')
    .select('turma_id, aluno_id')

  const turmasComAlunos = (turmas ?? []).map((t) => ({
    ...t,
    alunos: (allAlunos ?? []).filter((a) => a.turma_id === t.id).map((a) => a.aluno_id),
  }))

  return NextResponse.json(turmasComAlunos)
}

export async function POST(request: Request) {
  const dados = await request.json()
  const supabase = await createClient()

  const { data: turma, error } = await supabase
    .from('turmas')
    .insert({
      nome: dados.nome,
      disciplina: dados.disciplina,
      coordenador_id: dados.coordenadorId,
    })
    .select()
    .single()

  if (error || !turma) {
    return NextResponse.json(
      { ok: false, mensagem: error?.message || 'Erro ao criar turma.' },
      { status: 500 }
    )
  }

  if (dados.alunos?.length > 0) {
    const inserts = dados.alunos.map((alunoId: string) => ({
      turma_id: turma.id,
      aluno_id: alunoId,
    }))
    const { error: alunosError } = await supabase.from('turma_alunos').insert(inserts)
    if (alunosError) {
      return NextResponse.json(
        { ok: false, mensagem: alunosError.message },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ ok: true, data: { ...turma, alunos: dados.alunos ?? [] } })
}