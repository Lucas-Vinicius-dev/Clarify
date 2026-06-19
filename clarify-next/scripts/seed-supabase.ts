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

  // 3. Atualiza a sequence protocolo_seq para o próximo valor
  const maxProtocolo = Math.max(
    ...DEMANDAS_TESTE.map((d) => parseInt(d.protocolo.replace('REQ-', ''), 10))
  )
  const { error: seqError } = await supabase.rpc('setval', {
    sequence: 'public.protocolo_seq',
    value: maxProtocolo + 1,
  })
  if (seqError) {
    console.error(`Erro ao atualizar sequence: ${seqError.message}`)
  } else {
    console.log(`Sequence protocolo_seq atualizada para ${maxProtocolo + 1}`)
  }

  // 4. Cria demandas de teste
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
