'use client'

import { useState } from 'react'
import { Copy, Check, KeyRound } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

interface Chave {
  id: string
  code: string
  used: boolean
  created_at: string
}

interface ListaChavesProps {
  chaves: Chave[]
  loading: boolean
  gerando: boolean
  onGerar: () => void
  ultimaGerada: Chave | null
}

export function ListaChaves({
  chaves,
  loading,
  gerando,
  onGerar,
  ultimaGerada,
}: ListaChavesProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copiarChave = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Chaves de Ativação</h2>
        <button
          type="button"
          onClick={onGerar}
          disabled={gerando}
          className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg font-semibold text-sm hover:bg-orange-700 transition-colors cursor-pointer border-none disabled:opacity-50"
        >
          {gerando ? (
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <span>+</span>
          )}
          Gerar nova chave
        </button>
      </div>

      {ultimaGerada && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
          <span className="text-green-700 text-sm font-medium">
            Chave gerada:{' '}
            <strong className="font-mono text-base">{ultimaGerada.code}</strong>
          </span>
          <button
            type="button"
            onClick={() => copiarChave(ultimaGerada.code, ultimaGerada.id)}
            className="ml-auto text-green-600 hover:text-green-800 transition-colors"
          >
            {copiedId === ultimaGerada.id ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <span className="inline-block w-8 h-8 border-2 border-orange-600/30 border-t-orange-600 rounded-full animate-spin" />
        </div>
      ) : chaves.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500 gap-3">
          <KeyRound className="w-12 h-12 text-gray-300" />
          <p className="text-lg font-medium">Nenhuma chave cadastrada</p>
          <p className="text-sm">Gere a primeira chave de ativação para começar.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Chave</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Status</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden sm:table-cell">
                    Criada em
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600 w-20">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {chaves.map((chave) => (
                  <tr key={chave.id} className="hover:bg-orange-50/30 transition-colors">
                    <td className="px-5 py-3 font-mono text-gray-700">{chave.code}</td>
                    <td className="px-5 py-3">
                      <Badge variant={chave.used ? 'default' : 'concluido'}>
                        {chave.used ? 'Usada' : 'Disponível'}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-gray-500 hidden sm:table-cell">
                      {formatarData(chave.created_at)}
                    </td>
                    <td className="px-5 py-3">
                      <button
                        type="button"
                        onClick={() => copiarChave(chave.code, chave.id)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-orange-600"
                        title="Copiar chave"
                      >
                        {copiedId === chave.id ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  )
}
