import { z } from 'zod'
import { TIPOS_DEMANDA, ANEXO_MAX_BYTES, ANEXO_TIPOS_PERMITIDOS } from '@/types'
import { CAMPOS_POR_TIPO } from '@/lib/camposDemanda'

export const tipoDemandaSchema = z.enum(TIPOS_DEMANDA, 'Selecione o tipo de solicitação.')

export const novaDemandaSchema = z
  .object({
    tipo: tipoDemandaSchema,
    descricao: z
      .string()
      .min(10, 'Descrição deve ter no mínimo 10 caracteres.')
      .max(500, 'Descrição deve ter no máximo 500 caracteres.'),
    camposExtras: z.record(z.string(), z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    for (const campo of CAMPOS_POR_TIPO[data.tipo] ?? []) {
      if (!data.camposExtras?.[campo.name]?.trim()) {
        ctx.addIssue({
          code: 'custom',
          path: ['camposExtras', campo.name],
          message: `${campo.label} é obrigatório.`,
        })
      }
    }
  })

export type NovaDemandaFormData = z.infer<typeof novaDemandaSchema>

/**
 * Valida um arquivo de anexo (tamanho e tipo).
 */
export const anexoSchema = z
  .instanceof(File)
  .refine((file) => file.size <= ANEXO_MAX_BYTES, {
    message: `Arquivo deve ter no máximo ${ANEXO_MAX_BYTES / (1024 * 1024)} MB.`,
  })
  .refine((file) => ANEXO_TIPOS_PERMITIDOS.includes(file.type as typeof ANEXO_TIPOS_PERMITIDOS[number]), {
    message: 'Tipo de arquivo não permitido.',
  })

export type AnexoFormData = z.infer<typeof anexoSchema>

export const feedbackSchema = z.object({
  texto: z
    .string()
    .min(5, 'Feedback deve ter no mínimo 5 caracteres.')
    .max(200, 'Feedback deve ter no máximo 200 caracteres.'),
})

export type FeedbackFormData = z.infer<typeof feedbackSchema>