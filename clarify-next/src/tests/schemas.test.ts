import { describe, it, expect } from 'vitest'
import { loginSchema, registroSchema } from '@/schemas/auth'
import { novaDemandaSchema } from '@/schemas/demandas'
import { adicionarAlunoSchema } from '@/schemas/usuarios'

describe('loginSchema', () => {
  it('accepts valid login data', () => {
    const result = loginSchema.safeParse({
      matricula: '123456',
      senha: '123456',
    })
    expect(result.success).toBe(true)
  })

  it('rejects empty matricula', () => {
    const result = loginSchema.safeParse({
      matricula: '',
      senha: '123456',
    })
    expect(result.success).toBe(false)
  })

  it('rejects non-numeric matricula', () => {
    const result = loginSchema.safeParse({
      matricula: 'abc123',
      senha: '123456',
    })
    expect(result.success).toBe(false)
  })

  it('rejects short senha', () => {
    const result = loginSchema.safeParse({
      matricula: '123456',
      senha: '12345',
    })
    expect(result.success).toBe(false)
  })

  it('rejects empty senha', () => {
    const result = loginSchema.safeParse({
      matricula: '123456',
      senha: '',
    })
    expect(result.success).toBe(false)
  })
})

describe('registroSchema', () => {
  const validData = {
    nome: 'João Silva',
    email: 'joao@teste.com',
    matricula: '123456',
    senha: '123456',
    chaveAtivacao: 'ABC123',
  }

  it('accepts valid registration data', () => {
    const result = registroSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejects short nome', () => {
    const result = registroSchema.safeParse({ ...validData, nome: 'Jo' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid email', () => {
    const result = registroSchema.safeParse({ ...validData, email: 'invalido' })
    expect(result.success).toBe(false)
  })

  it('rejects empty email', () => {
    const result = registroSchema.safeParse({ ...validData, email: '' })
    expect(result.success).toBe(false)
  })

  it('rejects non-numeric matricula', () => {
    const result = registroSchema.safeParse({ ...validData, matricula: 'abc' })
    expect(result.success).toBe(false)
  })

  it('rejects short senha', () => {
    const result = registroSchema.safeParse({ ...validData, senha: '12345' })
    expect(result.success).toBe(false)
  })

  it('rejects empty chaveAtivacao', () => {
    const result = registroSchema.safeParse({ ...validData, chaveAtivacao: '' })
    expect(result.success).toBe(false)
  })
})

describe('novaDemandaSchema', () => {
  const validData = {
    tipo: 'Solicitação de Histórico',
    descricao: 'Preciso do meu histórico escolar do último semestre.',
  }

  it('accepts valid demanda data', () => {
    const result = novaDemandaSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejects short tipo', () => {
    const result = novaDemandaSchema.safeParse({
      tipo: 'ABC',
      descricao: 'Descrição válida com mais de dez caracteres.',
    })
    expect(result.success).toBe(false)
  })

  it('rejects long tipo', () => {
    const result = novaDemandaSchema.safeParse({
      tipo: 'A'.repeat(81),
      descricao: 'Descrição válida com mais de dez caracteres.',
    })
    expect(result.success).toBe(false)
  })

  it('rejects short descricao', () => {
    const result = novaDemandaSchema.safeParse({
      tipo: 'Título válido',
      descricao: 'Curta',
    })
    expect(result.success).toBe(false)
  })

  it('rejects long descricao', () => {
    const result = novaDemandaSchema.safeParse({
      tipo: 'Título válido',
      descricao: 'A'.repeat(501),
    })
    expect(result.success).toBe(false)
  })
})

describe('adicionarAlunoSchema', () => {
  const validData = {
    nome: 'Maria Souza',
    matricula: '987654',
    email: 'maria@teste.com',
    senha: '123456',
  }

  it('accepts valid aluno data', () => {
    const result = adicionarAlunoSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejects short nome', () => {
    const result = adicionarAlunoSchema.safeParse({ ...validData, nome: 'A' })
    expect(result.success).toBe(false)
  })

  it('rejects non-numeric matricula', () => {
    const result = adicionarAlunoSchema.safeParse({ ...validData, matricula: 'abc' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid email', () => {
    const result = adicionarAlunoSchema.safeParse({ ...validData, email: 'invalido' })
    expect(result.success).toBe(false)
  })

  it('rejects short senha', () => {
    const result = adicionarAlunoSchema.safeParse({ ...validData, senha: '12345' })
    expect(result.success).toBe(false)
  })
})
