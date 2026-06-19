// ═════════════════════════════════════════════════════════════════
// LIB: SUPABASE QUERIES
// Funções tipadas para cada operação do sistema contra o Supabase
// ═════════════════════════════════════════════════════════════════

import type { SupabaseClient } from '@supabase/supabase-js'
import type { AuthResponse, RegistroDados, StatusDemanda, TipoDemanda } from '@/types'

/**
 * Linha da tabela `profiles` no Supabase
 */
interface ProfileRow {
  id: string
  matricula: string
  nome: string
  email: string
  cargo: 'aluno' | 'coordenador'
  coordenador_id: string | null
  created_at: string
}

/**
 * Linha da tabela `demandas` no Supabase
 */
interface DemandaRow {
  id: string
  protocolo: string
  aluno_id: string
  tipo: string
  descricao: string
  status: string
  data_criacao: string
  data_atualizacao: string
  feedback: string
  created_at: string
}

/**
 * Linha da tabela `turmas` no Supabase
 */
interface TurmaRow {
  id: string
  nome: string
  disciplina: string
  coordenador_id: string
  created_at: string
}

// ─── Autenticação ──────────────────────────────────────────────

/**
 * Autentica um usuário via matrícula + senha.
 * Usa a RPC `get_email_by_matricula` para fazer o lookup do email.
 */
export async function loginComMatricula(
  supabase: SupabaseClient,
  matricula: string,
  senha: string
): Promise<AuthResponse> {
  const { data: email } = await supabase
    .rpc('get_email_by_matricula', { p_matricula: matricula })

  if (!email) {
    return { ok: false, mensagem: 'Usuário não encontrado.' }
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  })

  if (error) {
    return {
      ok: false,
      mensagem: error.message === 'Invalid login credentials'
        ? 'Chave de segurança incorreta.'
        : error.message,
    }
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single()

  if (!profile) {
    return { ok: false, mensagem: 'Perfil não encontrado.' }
  }

  return {
    ok: true,
    usuarioLogado: {
      id: profile.id,
      nome: profile.nome,
      matricula: profile.matricula,
      email: profile.email,
      cargo: profile.cargo,
    },
  }
}

/**
 * Registra um novo coordenador com validação de chave de ativação.
 */
export async function registrarCoordenador(
  supabase: SupabaseClient,
  dados: RegistroDados
): Promise<AuthResponse> {
  if (!dados.chaveAtivacao) {
    return { ok: false, mensagem: 'Chave de ativação é obrigatória.' }
  }

  const chaveValida = await validarChaveAtivacao(supabase, dados.chaveAtivacao)
  if (!chaveValida) {
    return { ok: false, mensagem: 'Chave de ativação inválida.' }
  }

  const { data, error } = await supabase.auth.signUp({
    email: dados.email,
    password: dados.senha,
    options: {
      data: {
        matricula: dados.matricula,
        nome: dados.nome,
        cargo: dados.cargo ?? 'aluno',
      },
    },
  })

  if (error) {
    return { ok: false, mensagem: error.message }
  }

  if (!data.user) {
    return { ok: false, mensagem: 'Erro ao criar usuário.' }
  }

  await supabase
    .from('chaves_ativacao')
    .update({ used: true })
    .eq('code', dados.chaveAtivacao)

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single()

  return {
    ok: true,
    usuarioLogado: profile
      ? {
          id: profile.id,
          nome: profile.nome,
          matricula: profile.matricula,
          email: profile.email,
          cargo: profile.cargo,
        }
      : undefined,
  }
}

// ─── Profiles / Usuários ───────────────────────────────────────

/**
 * Cria um novo aluno via API route (service role).
 */
export async function criarAluno(
  dados: { nome: string; matricula: string; email: string; senha: string },
  coordenadorId: string
) {
  const res = await fetch('/api/profiles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...dados, coordenadorId }),
  })
  return res.json() as Promise<{ ok: boolean; profile?: ProfileRow; mensagem?: string }>
}

/**
 * Deleta um aluno via API route (service role).
 */
export async function deletarAluno(alunoId: string) {
  const res = await fetch(`/api/profiles?alunoId=${alunoId}`, {
    method: 'DELETE',
  })
  return res.json() as Promise<{ ok: boolean; mensagem?: string }>
}

/**
 * Busca um profile pela matrícula.
 */
export async function getProfileByMatricula(supabase: SupabaseClient, matricula: string) {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('matricula', matricula)
    .single()
  return data as ProfileRow | null
}

/**
 * Busca um profile pelo ID.
 */
export async function getProfileById(supabase: SupabaseClient, id: string) {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()
  return data as ProfileRow | null
}

/**
 * Lista todos os alunos vinculados a um coordenador.
 */
export async function listAlunosDoCoordenador(supabase: SupabaseClient, coordenadorId: string) {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('coordenador_id', coordenadorId)
    .eq('cargo', 'aluno')
  return (data ?? []) as ProfileRow[]
}

// ─── Demandas ──────────────────────────────────────────────────

/**
 * Cria uma nova demanda usando a RPC `gerar_proximo_protocolo`.
 */
export async function criarDemanda(
  supabase: SupabaseClient,
  dados: { alunoId: string; tipo: TipoDemanda; descricao: string }
) {
  const { data: protocolo } = await supabase.rpc('gerar_proximo_protocolo')

  if (!protocolo) return null

  const { data } = await supabase
    .from('demandas')
    .insert({
      protocolo,
      aluno_id: dados.alunoId,
      tipo: dados.tipo,
      descricao: dados.descricao,
    })
    .select()
    .single()

  return data as DemandaRow | null
}

/**
 * Lista demandas com filtros opcionais (status, alunoId).
 */
export async function listarDemandas(
  supabase: SupabaseClient,
  filtros?: { status?: StatusDemanda; alunoId?: string }
) {
  let query = supabase.from('demandas').select('*')

  if (filtros?.status) query = query.eq('status', filtros.status)
  if (filtros?.alunoId) query = query.eq('aluno_id', filtros.alunoId)

  const { data } = await query.order('created_at', { ascending: false })
  return (data ?? []) as DemandaRow[]
}

/**
 * Lista demandas de um aluno específico.
 */
export async function listarDemandasDoAluno(supabase: SupabaseClient, alunoId: string) {
  const { data } = await supabase
    .from('demandas')
    .select('*')
    .eq('aluno_id', alunoId)
    .order('created_at', { ascending: false })
  return (data ?? []) as DemandaRow[]
}

/**
 * Lista demandas vinculadas a um coordenador (via alunos).
 */
export async function listarDemandasDoCoordenador(supabase: SupabaseClient, coordenadorId: string) {
  const { data: alunos } = await supabase
    .from('profiles')
    .select('id')
    .eq('coordenador_id', coordenadorId)

  const alunoIds = alunos?.map((a) => a.id) ?? []
  if (alunoIds.length === 0) return []

  const { data } = await supabase
    .from('demandas')
    .select('*')
    .in('aluno_id', alunoIds)
    .order('created_at', { ascending: false })

  return (data ?? []) as DemandaRow[]
}

/**
 * Atualiza o status e/ou feedback de uma demanda.
 */
export async function atualizarStatusDemanda(
  supabase: SupabaseClient,
  protocolo: string,
  status: StatusDemanda,
  feedback?: string
) {
  const updateData: Record<string, string> = {
    status,
    data_atualizacao: new Date().toISOString().split('T')[0],
  }

  if (feedback !== undefined) updateData.feedback = feedback

  const { data } = await supabase
    .from('demandas')
    .update(updateData)
    .eq('protocolo', protocolo)
    .select()
    .single()

  return data as DemandaRow | null
}

// ─── Turmas ────────────────────────────────────────────────────

/**
 * Cria uma nova turma com vínculos de alunos.
 */
export async function criarTurma(
  supabase: SupabaseClient,
  dados: { nome: string; disciplina: string; alunos: string[]; coordenadorId: string }
) {
  const { data: turma } = await supabase
    .from('turmas')
    .insert({
      nome: dados.nome,
      disciplina: dados.disciplina,
      coordenador_id: dados.coordenadorId,
    })
    .select()
    .single()

  if (!turma) return null

  if (dados.alunos.length > 0) {
    const turmaAlunosInserts = dados.alunos.map((alunoId) => ({
      turma_id: turma.id,
      aluno_id: alunoId,
    }))

    await supabase.from('turma_alunos').insert(turmaAlunosInserts)
  }

  return turma as TurmaRow
}

/**
 * Lista turmas de um coordenador.
 */
export async function listarTurmasDoCoordenador(supabase: SupabaseClient, coordenadorId: string) {
  const { data } = await supabase
    .from('turmas')
    .select('*')
    .eq('coordenador_id', coordenadorId)
    .order('created_at', { ascending: false })
  return (data ?? []) as TurmaRow[]
}

/**
 * Adiciona um aluno a uma turma.
 */
export async function adicionarAlunoTurma(
  supabase: SupabaseClient,
  turmaId: string,
  alunoId: string
) {
  const { error } = await supabase
    .from('turma_alunos')
    .insert({ turma_id: turmaId, aluno_id: alunoId })
  return !error
}

/**
 * Remove um aluno de uma turma.
 */
export async function removerAlunoTurma(
  supabase: SupabaseClient,
  turmaId: string,
  alunoId: string
) {
  const { error } = await supabase
    .from('turma_alunos')
    .delete()
    .eq('turma_id', turmaId)
    .eq('aluno_id', alunoId)
  return !error
}

// ─── Chaves de Ativação ────────────────────────────────────────

/**
 * Valida se uma chave de ativação é válida e não foi usada.
 */
export async function validarChaveAtivacao(supabase: SupabaseClient, code: string) {
  const { data } = await supabase
    .from('chaves_ativacao')
    .select('*')
    .eq('code', code)
    .eq('used', false)
    .single()

  return !!data
}
