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

  let alunosIds: string[] = []

  if (dados.alunos?.length > 0) {
    const { data: perfis, error: perfisError } = await supabase
      .from('profiles')
      .select('id')
      .in('id', dados.alunos)
      .eq('coordenador_id', dados.coordenadorId)

    if (perfisError) {
      return NextResponse.json(
        { ok: false, mensagem: perfisError.message },
        { status: 500 }
      )
    }

    const idsValidos = new Set(perfis?.map((p) => p.id) ?? [])
    const invalidos = dados.alunos.filter((id: string) => !idsValidos.has(id))

    if (invalidos.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          mensagem: `Aluno(s) inválido(s) ou não vinculado(s) a você.`,
        },
        { status: 400 }
      )
    }

    alunosIds = dados.alunos

    const inserts = alunosIds.map((alunoId: string) => ({
      turma_id: turma.id,
      aluno_id: alunoId,
    }))
    const { error: alunosError } = await supabase.from('turma_alunos').insert(inserts)
    if (alunosError) {
      return NextResponse.json(
        { ok: false, mensagem: buscaError.message },
        { status: 500 }
      )
    }

    alunosIds = (alunosEncontrados ?? []).map((a) => a.id)

    if (alunosIds.length > 0) {
      const inserts = alunosIds.map((alunoId) => ({
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
  }

  return NextResponse.json({ ok: true, data: { ...turma, alunos: alunosIds } })
}