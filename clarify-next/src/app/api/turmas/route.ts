import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()

  const [{ data: turmas }, { data: allAlunos }] = await Promise.all([
    supabase.from('turmas').select('*').order('created_at', { ascending: false }),
    supabase.from('turma_alunos').select('turma_id, aluno_id'),
  ])

  const alunosPorTurma = (allAlunos ?? []).reduce<Record<string, string[]>>((acc, a) => {
    ;(acc[a.turma_id] ??= []).push(a.aluno_id)
    return acc
  }, {})

  const turmasComAlunos = (turmas ?? []).map((t) => ({
    ...t,
    alunos: alunosPorTurma[t.id] ?? [],
  }))

  return NextResponse.json(turmasComAlunos)
}

export async function POST(request: Request) {
  const [dados, supabase] = await Promise.all([request.json(), createClient()])

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