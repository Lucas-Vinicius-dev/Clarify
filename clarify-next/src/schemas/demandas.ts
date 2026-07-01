import { z } from 'zod'
import { TIPOS_DEMANDA, CAMPOS_POR_TIPO } from '@/types'

export const tipoDemandaSchema = z.enum(TIPOS_DEMANDA, 'Selecione o tipo de solicitação.')

export const novaDemandaSchema = z
  .object({
    tipo: tipoDemandaSchema,
    descricao: z
      .string()
      .min(10, 'Descrição deve ter no mínimo 10 caracteres.')
      .max(500, 'Descrição deve ter no máximo 500 caracteres.'),
    dados: z.record(z.string(), z.string()).optional(),
  })
  .superRefine((val, ctx) => {
    const campos = CAMPOS_POR_TIPO[val.tipo]
    if (!campos) return
    for (const campo of campos) {
      const v = val.dados?.[campo.name]
      if (campo.required && (!v || v.trim() === '')) {
        ctx.addIssue({
          path: ['dados', campo.name],
          code: z.ZodIssueCode.custom,
          message: `${campo.label} é obrigatório.`,
        })
      }
    }
  })

export type NovaDemandaFormData = z.infer<typeof novaDemandaSchema>

export const feedbackSchema = z.object({
  texto: z
    .string()
    .min(5, 'Feedback deve ter no mínimo 5 caracteres.'),
})

export type FeedbackFormData = z.infer<typeof feedbackSchema>