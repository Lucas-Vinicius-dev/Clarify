// ═════════════════════════════════════════════════════════════════
// SCRIPT: SEED SUPABASE
// Popula o Supabase com dados de teste para desenvolvimento
// Uso: npx tsx scripts/seed-supabase.ts
// ═════════════════════════════════════════════════════════════════

import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { createAdminClient } from '../src/lib/supabase/admin'

// ─── Carregar variáveis de ambiente do .env.local ───────────────

const envPath = resolve(process.cwd(), '.env.local')
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    let value = trimmed.slice(eqIdx + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = value
  }
}

const supabase = createAdminClient()

// ─── Dados de seed ──────────────────────────────────────────────

const COORDENADOR = {
  matricula: '123',
  nome: 'Joao',
  email: 'joao@ifpb.edu.br',
  senha: '123456',
  cargo: 'coordenador' as const,
}

const ALUNOS = [
  { matricula: '003', nome: 'Maria', email: 'maria@ifpb.edu.br', senha: '123456', cargo: 'aluno' as const },
  { matricula: '456', nome: 'Carlos', email: 'carlos@ifpb.edu.br', senha: '123456', cargo: 'aluno' as const },
]

const DEMANDAS_EXEMPLO = [
  { tipo: 'Quebra de Pré-requisito', descricao: 'Preciso de quebra de pré-requisito para cursar Banco de Dados II, pois já possuo conhecimento equivalente.' },
  { tipo: 'Revisão de Prova', descricao: 'Solicito revisão da prova de Redes, questão 3, pois acredito que minha resposta estava correta.' },
  { tipo: 'Aproveitamento de Horas AC', descricao: 'Solicito aproveitamento de 40 horas de atividades complementares realizadas em projeto de extensão.' },
  { tipo: 'Trancamento de Disciplina', descricao: 'Solicito trancamento da disciplina de Cálculo II por motivos pessoais.' },
  { tipo: 'Segunda Chamada', descricao: 'Solicito segunda chamada da prova de Programação Web, devido a atestado médico.' },
]

// ─── Helpers ────────────────────────────────────────────────────

async function profileExiste(matricula: string) {
  const { data } = await supabase
    .from('profiles')
    .select('id')
    .eq('matricula', matricula)
    .maybeSingle()
  return !!data
}

async function criarUsuario(dados: typeof COORDENADOR | typeof ALUNOS[number]) {
  const { data, error } = await supabase.auth.admin.createUser({
    email: dados.email,
    password: dados.senha,
    email_confirm: true,
    user_metadata: {
      matricula: dados.matricula,
      nome: dados.nome,
      cargo: dados.cargo,
    },
  })
  if (error) throw new Error(`Erro ao criar ${dados.email}: ${error.message}`)
  return data.user
}

async function getProfileId(matricula: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('matricula', matricula)
    .single()
  if (error) throw new Error(`Profile não encontrado para matrícula ${matricula}`)
  return data.id
}

// ─── Main ───────────────────────────────────────────────────────

async function main() {
  console.log('🔧 Populando banco com dados de teste...\n')

  // ── 1. Verificar se seed já foi executado ────────────────────

  if (await profileExiste(COORDENADOR.matricula)) {
    console.log('⏭️  Seed já executado — dados encontrados. Pulando.\n')
    return
  }

  // ── 2. Criar coordenador ─────────────────────────────────────
  // O trigger handle_new_user() cria o profile automaticamente

  console.log('Criando coordenador...')
  const coordUser = await criarUsuario(COORDENADOR)
  const coordProfileId = await getProfileId(COORDENADOR.matricula)
  console.log(`  ✓ Coordenador criado: ${coordUser.id}`)

  // ── 3. Criar alunos ──────────────────────────────────────────

  console.log('Criando alunos...')
  const alunosCriados = await Promise.all(
    ALUNOS.map(async (a) => {
      const user = await criarUsuario(a)
      const profileId = await getProfileId(a.matricula)
      console.log(`  ✓ ${a.nome} criado: ${user.id}`)
      return { profileId, matricula: a.matricula, nome: a.nome }
    })
  )

  // ── 4. Vincular alunos ao coordenador ────────────────────────
  // O trigger não define coordenador_id, então atualizamos manualmente

  console.log('\nVinculando alunos ao coordenador...')
  for (const aluno of alunosCriados) {
    const { error } = await supabase
      .from('profiles')
      .update({ coordenador_id: coordProfileId })
      .eq('id', aluno.profileId)
    if (error) throw error
    console.log(`  ✓ ${aluno.nome} → coordenador`)
  }

  // ── 5. Inserir demandas de exemplo ───────────────────────────

  console.log('\nCriando demandas de exemplo...')
  for (const aluno of alunosCriados) {
    for (const demanda of DEMANDAS_EXEMPLO) {
      const { data: protocolo, error: errProto } = await supabase
        .rpc('gerar_proximo_protocolo')
      if (errProto) throw errProto

      const { error } = await supabase.from('demandas').insert({
        protocolo,
        aluno_id: aluno.profileId,
        tipo: demanda.tipo,
        descricao: demanda.descricao,
        status: 'pendente',
      })
      if (error) throw error
      console.log(`  ✓ ${protocolo} — ${demanda.tipo} (${aluno.nome})`)
    }
  }

  // ── 6. Criar turma e vincular alunos ─────────────────────────

  console.log('\nCriando turma...')
  const { data: turma, error: errTurma } = await supabase
    .from('turmas')
    .insert({
      nome: 'Turma A',
      disciplina: 'Banco de Dados II',
      coordenador_id: coordProfileId,
    })
    .select()
    .single()
  if (errTurma) throw errTurma
  console.log(`  ✓ Turma "${turma.nome}" — ${turma.disciplina}`)

  for (const aluno of alunosCriados) {
    const { error } = await supabase
      .from('turma_alunos')
      .insert({ turma_id: turma.id, aluno_id: aluno.profileId })
    if (error) throw error
    console.log(`  ✓ ${aluno.nome} matriculado na turma`)
  }

  console.log('\n✅ Seed concluído com sucesso!')
}

main().catch((err) => {
  console.error('\n❌ Falha no seed:', err)
  process.exit(1)
})
