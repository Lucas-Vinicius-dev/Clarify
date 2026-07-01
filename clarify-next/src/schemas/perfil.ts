import { z } from 'zod'

export const perfilSchema = z.object({
  nome: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres.'),
  telefone: z
    .string()
    .regex(/^[\d\s()+-]*$/, 'Telefone deve conter apenas números.'),
})

export type PerfilFormData = z.infer<typeof perfilSchema>

export const senhaSchema = z
  .object({
    senha: z
      .string()
      .min(6, 'Senha deve ter no mínimo 6 caracteres.'),
    confirmacao: z.string(),
  })
  .refine((d) => d.senha === d.confirmacao, {
    message: 'As senhas não coincidem.',
    path: ['confirmacao'],
  })

export type SenhaFormData = z.infer<typeof senhaSchema>
