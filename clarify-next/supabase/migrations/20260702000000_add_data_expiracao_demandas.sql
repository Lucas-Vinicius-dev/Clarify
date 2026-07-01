-- Adiciona coluna data_expiracao opcional nas demandas
-- Permite que coordenadores definam prazos personalizados

alter table if exists public.demandas
  add column if not exists data_expiracao date;
