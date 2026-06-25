import { z } from 'zod'

export const criarTurmaSchema = z.object({
  nome: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres.'),
  disciplina: z
    .string()
    .min(3, 'Disciplina deve ter no mínimo 3 caracteres.'),
  alunos: z
    .array(z.string()),
})

export type CriarTurmaFormData = z.infer<typeof criarTurmaSchema>