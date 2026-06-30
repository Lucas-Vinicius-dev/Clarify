import { z } from 'zod'
import { TIPOS_DEMANDA } from '@/types'

export const tipoDemandaSchema = z.enum(TIPOS_DEMANDA, 'Selecione o tipo de solicitação.')

export const novaDemandaSchema = z.object({
  tipo: tipoDemandaSchema,
  descricao: z
    .string()
    .min(10, 'Descrição deve ter no mínimo 10 caracteres.')
    .max(500, 'Descrição deve ter no máximo 500 caracteres.'),
})

export type NovaDemandaFormData = z.infer<typeof novaDemandaSchema>

export const feedbackSchema = z.object({
  texto: z
    .string()
    .min(5, 'Feedback deve ter no mínimo 5 caracteres.')
    .max(200, 'Feedback deve ter no máximo 200 caracteres.'),
})

export type FeedbackFormData = z.infer<typeof feedbackSchema>