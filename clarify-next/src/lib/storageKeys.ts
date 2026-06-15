// ═════════════════════════════════════════════════════════════════
// LIB: STORAGE KEYS
// Chaves versionadas do localStorage (fonte única de verdade)
// ═════════════════════════════════════════════════════════════════

export const STORAGE_KEYS = {
  usuarios: 'usuarios:v1',
  demandas: 'demandas:v1',
  turmas: 'turmas:v1',
  chavesAtivacao: 'chavesAtivacao:v1',
  usuarioLogado: 'usuarioLogado:v1',
  auth: 'auth:v1',
} as const;
