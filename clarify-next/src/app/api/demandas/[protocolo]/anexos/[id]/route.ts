import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ protocolo: string; id: string }> }
) {
  const [{ protocolo, id }, supabase] = await Promise.all([
    params,
    createClient(),
  ])

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json(
      { ok: false, mensagem: 'Não autorizado.' },
      { status: 401 },
    )
  }

  const { data: demanda } = await supabase
    .from('demandas')
    .select('id, aluno_id')
    .eq('protocolo', protocolo)
    .maybeSingle()

  if (!demanda) {
    return NextResponse.json(
      { ok: false, mensagem: 'Demanda não encontrada.' },
      { status: 404 },
    )
  }

  const isAluno = user.id === demanda.aluno_id
  let isCoordenador = false
  if (!isAluno) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('cargo')
      .eq('id', user.id)
      .single()
    isCoordenador = profile?.cargo === 'coordenador'
  }

  if (!isAluno && !isCoordenador) {
    return NextResponse.json(
      { ok: false, mensagem: 'Sem permissão.' },
      { status: 403 },
    )
  }

  const { data: anexo } = await supabase
    .from('anexos')
    .select('caminho')
    .eq('id', id)
    .eq('demanda_id', demanda.id)
    .maybeSingle()

  if (!anexo) {
    return NextResponse.json(
      { ok: false, mensagem: 'Anexo não encontrado.' },
      { status: 404 },
    )
  }

  const admin = createAdminClient()
  await admin.storage.from('anexos-demandas').remove([anexo.caminho])
  await admin.from('anexos').delete().eq('id', id).eq('demanda_id', demanda.id)

  return NextResponse.json({ ok: true })
}
