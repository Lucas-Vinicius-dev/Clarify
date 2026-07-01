-- Adiciona coluna ativo para soft delete de contas

alter table if exists public.profiles
  add column if not exists ativo boolean not null default true;
