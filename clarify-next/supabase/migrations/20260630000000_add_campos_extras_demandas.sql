alter table public.demandas
  add column if not exists campos_extras jsonb not null default '{}'::jsonb;
