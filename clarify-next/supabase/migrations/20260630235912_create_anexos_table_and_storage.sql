-- ============================================================
-- TABELA ANEXOS — documentos anexos às demandas
-- ============================================================

create table if not exists public.anexos (
  id uuid primary key default gen_random_uuid(),
  demanda_id uuid not null references public.demandas(id) on delete cascade,
  nome_arquivo text not null,
  caminho text not null,
  content_type text,
  tamanho_bytes bigint,
  created_at timestamptz default now()
);

create index if not exists anexos_demanda_id_idx on public.anexos(demanda_id);

-- ============================================================
-- STORAGE BUCKET (privado — URLs assinadas)
-- ============================================================

insert into storage.buckets (id, name, public)
values ('anexos-demandas', 'anexos-demandas', false)
on conflict (id) do nothing;

-- ============================================================
-- RLS — ANEXOS
-- ============================================================

alter table public.anexos enable row level security;

-- SELECT: aluno dono da demanda OU coordenador do aluno
create policy "anexos_select_own_or_vinculadas"
  on public.anexos for select
  to authenticated
  using (
    exists (
      select 1 from public.demandas d
      where d.id = anexos.demanda_id
      and (
        d.aluno_id = auth.uid()
        or exists (
          select 1 from public.profiles p
          where p.id = auth.uid()
          and p.cargo = 'coordenador'
          and exists (
            select 1 from public.profiles aluno
            where aluno.id = d.aluno_id
            and aluno.coordenador_id = auth.uid()
          )
        )
      )
    )
  );

-- INSERT: apenas o aluno dono da demanda
create policy "anexos_insert_aluno"
  on public.anexos for insert
  to authenticated
  with check (
    exists (
      select 1 from public.demandas d
      where d.id = anexos.demanda_id
      and d.aluno_id = auth.uid()
    )
  );

-- DELETE: aluno dono OU coordenador do aluno
create policy "anexos_delete_aluno_or_coordenador"
  on public.anexos for delete
  to authenticated
  using (
    exists (
      select 1 from public.demandas d
      where d.id = anexos.demanda_id
      and (
        d.aluno_id = auth.uid()
        or exists (
          select 1 from public.profiles p
          where p.id = auth.uid()
          and p.cargo = 'coordenador'
          and exists (
            select 1 from public.profiles aluno
            where aluno.id = d.aluno_id
            and aluno.coordenador_id = auth.uid()
          )
        )
      )
    )
  );
