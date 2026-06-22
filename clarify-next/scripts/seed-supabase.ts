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
  console.log('Seed script — defina os dados de teste conforme necessário.')
}

main().catch((err) => {
  console.error('Falha no seed:', err)
  process.exit(1)
})
