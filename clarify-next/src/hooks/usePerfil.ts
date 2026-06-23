'use client'

import { useQuery } from '@tanstack/react-query'
import type { UsuarioLogado } from '@/types'

function mapProfileToUser(row: Record<string, unknown>): UsuarioLogado {
  return {
    id: row.id as string,
    nome: row.nome as string,
    matricula: row.matricula as string,
    email: row.email as string,
    cargo: row.cargo as string as UsuarioLogado['cargo'],
    coordenador_id: (row.coordenador_id as string) ?? undefined,
  }
}

export function usePerfil(id: string | null | undefined) {
  return useQuery({
    queryKey: ['perfil', id],
    queryFn: async () => {
      const res = await fetch(`/api/perfis/${id}`)
      if (!res.ok) return null
      const data = await res.json()
      return mapProfileToUser(data) as UsuarioLogado
    },
    enabled: !!id,
  })
}