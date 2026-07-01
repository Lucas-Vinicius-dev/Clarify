-- ============================================================
-- COLUNA DADOS — campos dinâmicos por tipo de demanda
-- ============================================================

alter table public.demandas
  add column if not exists dados jsonb;
