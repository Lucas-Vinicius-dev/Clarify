'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { useState, ReactNode } from 'react'
import { makeQueryClient } from '@/lib/queryClient'

export function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => makeQueryClient())
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}