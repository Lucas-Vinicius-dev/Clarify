import { z } from 'zod'
import { validarEmail, validarMatricula } from '@/lib/utils'

export const loginSchema = z.object({
  matricula: z
    .string()
    .min(1, 'Matrícula é obrigatória.')
    .refine((v) => validarMatricula(v), 'Matrícula deve conter apenas números.'),
  senha: z
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres.'),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const registroSchema = z.object({
  nome: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres.'),
  email: z
    .string()
    .min(1, 'Email é obrigatório.')
    .refine((v) => validarEmail(v), 'Email inválido.'),
  matricula: z
    .string()
    .min(1, 'Matrícula é obrigatória.')
    .refine((v) => validarMatricula(v), 'Matrícula deve conter apenas números.'),
  senha: z
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres.'),
  chaveAtivacao: z
    .string()
    .min(1, 'Chave de ativação é obrigatória.'),
})

export type RegistroFormData = z.infer<typeof registroSchema>

export const recuperarSenhaSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório.')
    .refine((v) => validarEmail(v), 'Email inválido.'),
})

export type RecuperarSenhaFormData = z.infer<typeof recuperarSenhaSchema>

export const redefinirSenhaSchema = z
  .object({
    senha: z
      .string()
      .min(6, 'Senha deve ter no mínimo 6 caracteres.'),
    confirmarSenha: z
      .string()
      .min(1, 'Confirme a senha.'),
  })
  .refine((d) => d.senha === d.confirmarSenha, {
    message: 'As senhas não coincidem.',
    path: ['confirmarSenha'],
  })

export type RedefinirSenhaFormData = z.infer<typeof redefinirSenhaSchema>