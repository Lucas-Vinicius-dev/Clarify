import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { anexoSchema } from '@/schemas/demandas'
import { ANEXO_MAX_QTD } from '@/types'
import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ protocolo: string }> }
) {
  const [{ protocolo }, supabase] = await Promise.all([
    params,
    createClient(),
  ])

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

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json(
      { ok: false, mensagem: 'Não autorizado.' },
      { status: 401 },
    )
  }

  const isAluno = user.id === demanda.aluno_id
  let isCoordenador = false
  if (!isAluno) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('cargo, id')
      .eq('id', user.id)
      .single()
    isCoordenador = profile?.cargo === 'coordenador'
  }

  if (!isAluno && !isCoordenador) {
    return NextResponse.json(
      { ok: false, mensagem: 'Sem permissão para ver estes anexos.' },
      { status: 403 },
    )
  }

  const { data: anexos } = await supabase
    .from('anexos')
    .select('*')
    .eq('demanda_id', demanda.id)
    .order('created_at', { ascending: true })

  if (!anexos || anexos.length === 0) {
    return NextResponse.json([])
  }

  const admin = createAdminClient()
  const anexosComUrl = await Promise.all(
    anexos.map(async (anexo) => {
      const { data: urlData } = await admin
        .storage
        .from('anexos-demandas')
        .createSignedUrl(anexo.caminho, 3600)

      return {
        id: anexo.id,
        demandaId: anexo.demanda_id,
        nomeArquivo: anexo.nome_arquivo,
        caminho: anexo.caminho,
        contentType: anexo.content_type ?? '',
        tamanhoBytes: anexo.tamanho_bytes ?? 0,
        urlAssinada: urlData?.signedUrl ?? '',
        createdAt: anexo.created_at,
      }
    }),
  )

  return NextResponse.json(anexosComUrl)
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ protocolo: string }> }
) {
  const [{ protocolo }, formData, supabase] = await Promise.all([
    params,
    request.formData(),
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

  if (demanda.aluno_id !== user.id) {
    return NextResponse.json(
      { ok: false, mensagem: 'Apenas o autor pode anexar arquivos.' },
      { status: 403 },
    )
  }

  const arquivos = formData.getAll('arquivos').filter((v): v is File => v instanceof File)
  if (arquivos.length === 0) {
    return NextResponse.json(
      { ok: false, mensagem: 'Nenhum arquivo recebido.' },
      { status: 400 },
    )
  }

  const { count: anexosExistentes } = await supabase
    .from('anexos')
    .select('*', { count: 'exact', head: true })
    .eq('demanda_id', demanda.id)

  if ((anexosExistentes ?? 0) + arquivos.length > ANEXO_MAX_QTD) {
    return NextResponse.json(
      { ok: false, mensagem: `Máximo de ${ANEXO_MAX_QTD} anexos por demanda.` },
      { status: 400 },
    )
  }

  const erros: string[] = []
  for (const file of arquivos) {
    const validacao = anexoSchema.safeParse(file)
    if (!validacao.success) {
      erros.push(`${file.name}: ${validacao.error.issues[0]?.message}`)
    }
  }
  if (erros.length > 0) {
    return NextResponse.json(
      { ok: false, mensagem: 'Arquivo(s) inválido(s).', erros },
      { status: 400 },
    )
  }

  const admin = createAdminClient()
  const criados: unknown[] = []

  for (const file of arquivos) {
    const extensao = file.name.includes('.') ? file.name.split('.').pop() : 'bin'
    const caminho = `${demanda.id}/${crypto.randomUUID()}.${extensao}`

    const { error: uploadError } = await admin
      .storage
      .from('anexos-demandas')
      .upload(caminho, file, {
        contentType: file.type || 'application/octet-stream',
        upsert: false,
      })

    if (uploadError) {
      erros.push(`${file.name}: falha no upload.`)
      continue
    }

    const { data: anexo } = await admin
      .from('anexos')
      .insert({
        demanda_id: demanda.id,
        nome_arquivo: file.name,
        caminho,
        content_type: file.type,
        tamanho_bytes: file.size,
      })
      .select()
      .single()

    if (anexo) {
      criados.push({
        id: anexo.id,
        demandaId: anexo.demanda_id,
        nomeArquivo: anexo.nome_arquivo,
        caminho: anexo.caminho,
        contentType: anexo.content_type ?? '',
        tamanhoBytes: anexo.tamanho_bytes ?? 0,
        createdAt: anexo.created_at,
      })
    }
  }

  if (criados.length === 0) {
    return NextResponse.json(
      { ok: false, mensagem: 'Nenhum arquivo foi anexado.', erros },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true, data: criados, erros: erros.length ? erros : undefined })
}
