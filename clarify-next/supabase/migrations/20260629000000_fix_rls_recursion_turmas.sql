-- ============================================================
-- FIX: Recursão infinita nas RLS policies de turmas/turma_alunos
-- ============================================================
-- Problema: a policy de SELECT de turmas referencia turma_alunos,
-- e a policy de SELECT de turma_alunos referencia turmas,
-- criando uma recursão infinita no Postgres.
-- Solução: substituir as referências cruzadas por funções SECURITY DEFINER,
-- que bypassam RLS e quebram o ciclo.

-- 1. Função: verifica se o usuário atual é coordenador da turma (bypassa RLS)
create or replace function public.is_coordenador_of_turma(p_turma_id uuid)
returns boolean
language sql
security definer set search_path = ''
as $$
  select exists (
    select 1 from public.turmas
    where id = p_turma_id and coordenador_id = auth.uid()
  );
$$;

-- 2. Função: verifica se o usuário atual é aluno matriculado na turma (bypassa RLS)
create or replace function public.is_aluno_in_turma(p_turma_id uuid)
returns boolean
language sql
security definer set search_path = ''
as $$
  select exists (
    select 1 from public.turma_alunos
    where turma_id = p_turma_id and aluno_id = auth.uid()
  );
$$;

-- 3. Recria policy de SELECT de turmas usando a função (sem referenciar turma_alunos diretamente)
drop policy if exists "turmas_select_own_or_matriculado" on public.turmas;
create policy "turmas_select_own_or_matriculado"
  on public.turmas for select
  to authenticated
  using (
    auth.uid() = coordenador_id
    or public.is_aluno_in_turma(id)
  );

-- 4. Recria policy de SELECT de turma_alunos usando a função (sem referenciar turmas diretamente)
drop policy if exists "turma_alunos_select_own" on public.turma_alunos;
create policy "turma_alunos_select_own"
  on public.turma_alunos for select
  to authenticated
  using (
    aluno_id = auth.uid()
    or public.is_coordenador_of_turma(turma_id)
  );
