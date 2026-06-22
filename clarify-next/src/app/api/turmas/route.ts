import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createAdminClient()

  const { data: turmas } = await supabase
    .from('turmas')
    .select('*')
    .order('created_at', { ascending: false })

  const turmasComAlunos = await Promise.all(
    (turmas ?? []).map(async (t) => {
      const { data: alunos } = await supabase
        .from('turma_alunos')
        .select('aluno_id')
        .eq('turma_id', t.id)
      return { ...t, alunos: (alunos ?? []).map((a) => a.aluno_id) }
    })
  )

  return NextResponse.json(turmasComAlunos)
}

export async function POST(request: Request) {
  const dados = await request.json()
  const supabase = createAdminClient()

  const { data: turma } = await supabase
    .from('turmas')
    .insert({
      nome: dados.nome,
      disciplina: dados.disciplina,
      coordenador_id: dados.coordenadorId,
    })
    .select()
    .single()

  if (!turma) {
    return NextResponse.json(
      { ok: false, mensagem: 'Erro ao criar turma.' },
      { status: 500 }
    )
  }

  if (dados.alunos?.length > 0) {
    const inserts = dados.alunos.map((alunoId: string) => ({
      turma_id: turma.id,
      aluno_id: alunoId,
    }))
    await supabase.from('turma_alunos').insert(inserts)
  }

  return NextResponse.json({ ok: true, data: { ...turma, alunos: dados.alunos ?? [] } })
}
