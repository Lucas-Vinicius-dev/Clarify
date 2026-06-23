import { z } from 'zod'
import { TIPOS_DEMANDA } from '@/types'

export const novaDemandaSchema = z.object({
  tipo: z
    .string()
    .min(4, 'Título deve ter no mínimo 4 caracteres.')
    .max(80, 'Título deve ter no máximo 80 caracteres.'),
  descricao: z
    .string()
    .min(10, 'Descrição deve ter no mínimo 10 caracteres.')
    .max(500, 'Descrição deve ter no máximo 500 caracteres.'),
})

export type NovaDemandaFormData = z.infer<typeof novaDemandaSchema>

export const feedbackSchema = z.object({
  texto: z
    .string()
    .min(5, 'Feedback deve ter no mínimo 5 caracteres.'),
})

export type FeedbackFormData = z.infer<typeof feedbackSchema>

export const tipoDemandaSchema = z.enum([
  TIPOS_DEMANDA[0],
  TIPOS_DEMANDA[1],
  TIPOS_DEMANDA[2],
  TIPOS_DEMANDA[3],
  TIPOS_DEMANDA[4],
  TIPOS_DEMANDA[5],
  TIPOS_DEMANDA[6],
])