-- ============================================================
-- SCHEMA COMPLETO — Clarify no Supabase
-- ============================================================

-- 2.1 SEQUENCE para protocolo REQ-XXX
create sequence if not exists public.protocolo_seq start 403;

-- 2.2 PROFILES — estende auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  matricula text unique not null,
  nome text not null,
  email text unique not null,
  cargo text not null check (cargo in ('aluno', 'coordenador')),
  coordenador_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);

-- Trigger: cria profile automaticamente no signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, matricula, nome, email, cargo)
  values (
    new.id,
    new.raw_user_meta_data ->> 'matricula',
    new.raw_user_meta_data ->> 'nome',
    new.email,
    coalesce(new.raw_user_meta_data ->> 'cargo', 'aluno')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2.3 DEMANDAS
create table if not exists public.demandas (
  id uuid primary key default gen_random_uuid(),
  protocolo text unique not null,
  aluno_id uuid not null references public.profiles(id) on delete cascade,
  tipo text not null,
  descricao text not null,
  status text not null default 'pendente'
    check (status in ('pendente','em_analise','requer_ajuste','concluido')),
  data_criacao date not null default current_date,
  data_atualizacao date not null default current_date,
  feedback text default '',
  created_at timestamptz default now()
);

-- 2.4 TURMAS
create table if not exists public.turmas (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  disciplina text not null,
  coordenador_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz default now()
);

-- 2.5 TURMA_ALUNOS (N:N)
create table if not exists public.turma_alunos (
  turma_id uuid references public.turmas(id) on delete cascade,
  aluno_id uuid references public.profiles(id) on delete cascade,
  primary key (turma_id, aluno_id)
);

-- 2.6 CHAVES DE ATIVAÇÃO
create table if not exists public.chaves_ativacao (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  used boolean default false,
  created_at timestamptz default now()
);

-- 2.7 FUNCTION: gerar próximo protocolo
create or replace function public.gerar_proximo_protocolo()
returns text
language sql
security definer
as $$
  select 'REQ-' || nextval('public.protocolo_seq');
$$;

-- 2.8 FUNCTION: lookup de email por matrícula (para login)
create or replace function public.get_email_by_matricula(p_matricula text)
returns text
language plpgsql
security definer set search_path = ''
as $$
declare
  v_email text;
begin
  select email into v_email from public.profiles
  where matricula = p_matricula;
  return v_email;
end;
$$;

-- ============================================================
-- RLS POLICIES
-- ============================================================

-- PROFILES
alter table public.profiles enable row level security;

create policy "profiles_select_anon"
  on public.profiles for select
  to anon
  using (true);

create policy "profiles_select_auth"
  on public.profiles for select
  to authenticated
  using (true);

create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- DEMANDAS
alter table public.demandas enable row level security;

create policy "demandas_insert_aluno"
  on public.demandas for insert
  to authenticated
  with check (
    auth.uid() = aluno_id
    or exists (
      select 1 from public.profiles
      where id = auth.uid() and cargo = 'coordenador'
    )
  );

create policy "demandas_select_own_or_vinculadas"
  on public.demandas for select
  to authenticated
  using (
    auth.uid() = aluno_id
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.cargo = 'coordenador'
      and exists (
        select 1 from public.profiles aluno
        where aluno.id = demandas.aluno_id
        and aluno.coordenador_id = auth.uid()
      )
    )
  );

create policy "demandas_update_coordenador"
  on public.demandas for update
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.cargo = 'coordenador'
      and exists (
        select 1 from public.profiles aluno
        where aluno.id = demandas.aluno_id
        and aluno.coordenador_id = auth.uid()
      )
    )
  );

-- TURMAS
alter table public.turmas enable row level security;

create policy "turmas_insert_coordenador"
  on public.turmas for insert
  to authenticated
  with check (auth.uid() = coordenador_id);

create policy "turmas_select_own_or_matriculado"
  on public.turmas for select
  to authenticated
  using (
    auth.uid() = coordenador_id
    or exists (
      select 1 from public.turma_alunos
      where turma_id = id and aluno_id = auth.uid()
    )
  );

create policy "turmas_update_coordenador"
  on public.turmas for update
  to authenticated
  using (auth.uid() = coordenador_id)
  with check (auth.uid() = coordenador_id);

create policy "turmas_delete_coordenador"
  on public.turmas for delete
  to authenticated
  using (auth.uid() = coordenador_id);

-- TURMA_ALUNOS
alter table public.turma_alunos enable row level security;

create policy "turma_alunos_insert_coordenador"
  on public.turma_alunos for insert
  to authenticated
  with check (
    exists (
      select 1 from public.turmas
      where id = turma_id and coordenador_id = auth.uid()
    )
  );

create policy "turma_alunos_select_own"
  on public.turma_alunos for select
  to authenticated
  using (
    aluno_id = auth.uid()
    or exists (
      select 1 from public.turmas
      where id = turma_id and coordenador_id = auth.uid()
    )
  );

create policy "turma_alunos_delete_coordenador"
  on public.turma_alunos for delete
  to authenticated
  using (
    exists (
      select 1 from public.turmas
      where id = turma_id and coordenador_id = auth.uid()
    )
  );

-- CHAVES ATIVACAO
alter table public.chaves_ativacao enable row level security;

create policy "chaves_select_all"
  on public.chaves_ativacao for select
  to anon, authenticated
  using (true);

-- ============================================================
-- SEED DATA
-- ============================================================

insert into public.chaves_ativacao (code, used) values
  ('123', false),
  ('456', false),
  ('789', false)
on conflict (code) do nothing;
