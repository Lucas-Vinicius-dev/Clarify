import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const [{ id }, dados, supabase] = await Promise.all([
    params,
    request.json(),
    createClient(),
  ])

  const { error: turmaError } = await supabase
    .from('turmas')
    .update({ nome: dados.nome, disciplina: dados.disciplina })
    .eq('id', id)

  if (turmaError) {
    return NextResponse.json(
      { ok: false, mensagem: turmaError.message },
      { status: 500 },
    )
  }

  const { error: deleteError } = await supabase
    .from('turma_alunos')
    .delete()
    .eq('turma_id', id)

  if (deleteError) {
    return NextResponse.json(
      { ok: false, mensagem: deleteError.message },
      { status: 500 },
    )
  }

  if (dados.alunos?.length > 0) {
    const inserts = dados.alunos.map((alunoId: string) => ({
      turma_id: id,
      aluno_id: alunoId,
    }))
    const { error: insertError } = await supabase.from('turma_alunos').insert(inserts)
    if (insertError) {
      return NextResponse.json(
        { ok: false, mensagem: insertError.message },
        { status: 500 },
      )
    }
  }

  return NextResponse.json({ ok: true })
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const [{ id }, supabase] = await Promise.all([params, createClient()])

  const { error } = await supabase.from('turmas').delete().eq('id', id)

  if (error) {
    return NextResponse.json(
      { ok: false, mensagem: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true })
}