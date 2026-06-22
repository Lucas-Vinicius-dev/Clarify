// ═════════════════════════════════════════════════════════════════
// SUPABASE BROWSER CLIENT
// Singleton do cliente Supabase para uso no navegador
// ═════════════════════════════════════════════════════════════════

'use client'

import { createBrowserClient } from '@supabase/ssr'

/**
 * Cria um cliente Supabase para uso no navegador.
 * Deve ser chamado dentro de componentes/funções client-side.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
