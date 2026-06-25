import { z } from 'zod'
import { validarEmail, validarMatricula } from '@/lib/utils'

export const adicionarAlunoSchema = z.object({
  nome: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres.'),
  matricula: z
    .string()
    .min(1, 'Matrícula é obrigatória.')
    .refine((v) => validarMatricula(v), 'Matrícula deve conter apenas números.'),
  email: z
    .string()
    .min(1, 'Email é obrigatório.')
    .refine((v) => validarEmail(v), 'Email inválido.'),
  senha: z
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres.'),
})

export type AdicionarAlunoFormData = z.infer<typeof adicionarAlunoSchema>