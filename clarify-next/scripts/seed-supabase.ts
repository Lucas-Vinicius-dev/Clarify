// ═════════════════════════════════════════════════════════════════
// SCRIPT: SEED SUPABASE
// Popula o Supabase com dados de teste para desenvolvimento
// Uso: npx tsx scripts/seed-supabase.ts
// ═════════════════════════════════════════════════════════════════

import { createClient } from '@supabase/supabase-js'

/**
 * Cliente Supabase com service role — usado para criar usuários
 * via Admin API e popular tabelas.
 */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

// ─── Dados de Teste ────────────────────────────────────────────

const USUARIOS_TESTE = [
  {
    nome: 'João da Silva',
    matricula: '123',
    email: 'joao@academico.edu.br',
    senha: '123456',
    cargo: 'coordenador' as const,
    alunosCadastrados: ['003', '456'],
  },
  {
    nome: 'Maria Aparecida',
    matricula: '003',
    email: 'maria@academico.edu.br',
    senha: '123456',
    cargo: 'aluno' as const,
    coordenador: '123',
  },
  {
    nome: 'Carlos Eduardo',
    matricula: '456',
    email: 'carlos@academico.edu.br',
    senha: '123456',
    cargo: 'aluno' as const,
    coordenador: '123',
  },
]

const DEMANDAS_TESTE = [
  {
    protocolo: 'REQ-402',
    matriculaAluno: '003',
    tipo: 'Quebra de Pré-requisito',
    descricao: 'Solicitação para cursar Cálculo III sem a aprovação em Cálculo II.',
    status: 'pendente',
    dataCriacao: '2025-11-12',
    dataAtualizacao: '2025-11-12',
    feedback: '',
  },
  {
    protocolo: 'REQ-398',
    matriculaAluno: '003',
    tipo: 'Revisão de Prova',
    descricao: 'Discordância em relação à correção da questão 4 da prova de Banco de Dados.',
    status: 'em_analise',
    dataCriacao: '2025-11-08',
    dataAtualizacao: '2026-05-04',
    feedback: '',
  },
  {
    protocolo: 'REQ-385',
    matriculaAluno: '003',
    tipo: 'Aproveitamento de Horas AC',
    descricao: 'Envio de certificados de cursos extracurriculares para integralização.',
    status: 'pendente',
    dataCriacao: '2025-11-02',
    dataAtualizacao: '2025-11-02',
    feedback: '',
  },
  {
    protocolo: 'REQ-350',
    matriculaAluno: '003',
    tipo: 'Trancamento de Disciplina',
    descricao: 'Pedido de trancamento da disciplina de Sistemas Operacionais.',
    status: 'concluido',
    dataCriacao: '2025-10-15',
    dataAtualizacao: '2025-10-25',
    feedback: 'Trancamento aprovado. Disciplina removida do histórico do semestre.',
  },
  {
    protocolo: 'REQ-342',
    matriculaAluno: '003',
    tipo: 'Troca de Turma',
    descricao: 'Mudança da turma da manhã para a turma da noite por motivo de trabalho.',
    status: 'em_analise',
    dataCriacao: '2025-10-12',
    dataAtualizacao: '2025-10-22',
    feedback: '',
  },
  {
    protocolo: 'REQ-320',
    matriculaAluno: '003',
    tipo: 'Solicitação de Histórico',
    descricao: 'Emissão do histórico escolar atualizado para fins de estágio.',
    status: 'concluido',
    dataCriacao: '2025-10-05',
    dataAtualizacao: '2025-10-15',
    feedback: 'Documento disponível para retirada na secretaria.',
  },
  {
    protocolo: 'REQ-310',
    matriculaAluno: '003',
    tipo: 'Justificativa de Falta',
    descricao: 'Atestado médico referente às faltas dos dias 22 e 23 de setembro.',
    status: 'requer_ajuste',
    dataCriacao: '2025-09-25',
    dataAtualizacao: '2025-09-30',
    feedback: 'Atestado precisa estar legível e conter o CID. Reenviar.',
  },
]

// ─── Main ──────────────────────────────────────────────────────

async function main() {
  console.log('Iniciando seed do Supabase...\n')

  // 1. Cria usuários via Admin API (trigger cria profile automaticamente)
  for (const user of USUARIOS_TESTE) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.senha,
      email_confirm: true,
      user_metadata: {
        matricula: user.matricula,
        nome: user.nome,
        cargo: user.cargo,
      },
    })

    if (error) {
      console.error(`Erro ao criar ${user.nome}: ${error.message}`)
    } else {
      console.log(`Usuário criado: ${user.nome} (${user.matricula}) — ${data.user?.id}`)
    }
  }

  // 2. Vincula alunos ao coordenador
  const { data: profiles } = await supabase.from('profiles').select('*')
  const profileMap = new Map(profiles?.map((p) => [p.matricula, p]) ?? [])

  for (const user of USUARIOS_TESTE) {
    if (user.cargo === 'aluno' && user.coordenador) {
      const coordProfile = profileMap.get(user.coordenador)
      const alunoProfile = profileMap.get(user.matricula)

      if (coordProfile && alunoProfile) {
        await supabase
          .from('profiles')
          .update({ coordenador_id: coordProfile.id })
          .eq('id', alunoProfile.id)

        console.log(`  → ${user.nome} vinculado ao coordenador ${coordProfile.nome}`)
      }
    }
  }

  // 3. Cria demandas de teste
  for (const d of DEMANDAS_TESTE) {
    const alunoProfile = profileMap.get(d.matriculaAluno)

    if (!alunoProfile) {
      console.warn(`  ⚠ Aluno ${d.matriculaAluno} não encontrado, pulando demanda ${d.protocolo}`)
      continue
    }

    const { error } = await supabase.from('demandas').insert({
      protocolo: d.protocolo,
      aluno_id: alunoProfile.id,
      tipo: d.tipo,
      descricao: d.descricao,
      status: d.status,
      data_criacao: d.dataCriacao,
      data_atualizacao: d.dataAtualizacao,
      feedback: d.feedback,
    })

    if (error) {
      console.error(`Erro ao criar demanda ${d.protocolo}: ${error.message}`)
    } else {
      console.log(`Demanda criada: ${d.protocolo} — ${d.tipo}`)
    }
  }

  console.log('\nSeed concluído!')
}

main().catch((err) => {
  console.error('Falha no seed:', err)
  process.exit(1)
})
