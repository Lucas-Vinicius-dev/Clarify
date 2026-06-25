import { describe, it, expect } from 'vitest'
import { validarEmail, validarMatricula, cn, formatarData } from '@/lib/utils'

describe('validarEmail', () => {
  it('returns true for valid emails', () => {
    expect(validarEmail('teste@teste.com')).toBe(true)
    expect(validarEmail('aluno@universidade.edu.br')).toBe(true)
    expect(validarEmail('nome.sobrenome@dominio.com.br')).toBe(true)
  })

  it('returns false for invalid emails', () => {
    expect(validarEmail('invalido')).toBe(false)
    expect(validarEmail('sem@dominio')).toBe(false)
    expect(validarEmail('@dominio.com')).toBe(false)
    expect(validarEmail('')).toBe(false)
    expect(validarEmail('user@')).toBe(false)
    expect(validarEmail('@.com')).toBe(false)
  })
})

describe('validarMatricula', () => {
  it('returns true for numeric strings', () => {
    expect(validarMatricula('123456')).toBe(true)
    expect(validarMatricula('0')).toBe(true)
    expect(validarMatricula('99999999999')).toBe(true)
  })

  it('returns false for non-numeric strings', () => {
    expect(validarMatricula('abc')).toBe(false)
    expect(validarMatricula('123abc')).toBe(false)
    expect(validarMatricula('')).toBe(false)
    expect(validarMatricula('12 34')).toBe(false)
  })
})

describe('cn', () => {
  it('joins multiple class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('filters out falsy values', () => {
    expect(cn('foo', false, 'bar', undefined, null, '')).toBe('foo bar')
  })

  it('returns empty string for no valid classes', () => {
    expect(cn(false, null, undefined)).toBe('')
  })

  it('normalizes whitespace', () => {
    expect(cn('foo  bar', '  baz  ')).toBe('foo bar baz')
  })

  it('handles single class', () => {
    expect(cn('only')).toBe('only')
  })
})

describe('formatarData', () => {
  it('formats ISO date to Brazilian short format', () => {
    expect(formatarData('2024-03-15')).toBe('15 Mar 2024')
    expect(formatarData('2024-01-01')).toBe('01 Jan 2024')
    expect(formatarData('2024-12-31')).toBe('31 Dez 2024')
  })

  it('returns empty string for empty input', () => {
    expect(formatarData('')).toBe('')
  })
})
