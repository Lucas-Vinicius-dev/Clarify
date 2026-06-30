-- Adiciona telefone de contato ao perfil (ENZ-38)
alter table public.profiles add column if not exists telefone text;
