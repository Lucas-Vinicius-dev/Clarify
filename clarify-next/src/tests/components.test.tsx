import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Clique aqui</Button>)
    expect(screen.getByRole('button', { name: /clique aqui/i })).toBeInTheDocument()
  })

  it('fires onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>OK</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies variant classes', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-brand-primary')

    rerender(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-gray-100')

    rerender(<Button variant="ghost">Ghost</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-transparent')

    rerender(<Button variant="danger">Danger</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-red-600')
  })

  it('passes additional className', () => {
    render(<Button className="extra-class">Teste</Button>)
    expect(screen.getByRole('button')).toHaveClass('extra-class')
  })

  it('is disabled when disabled prop is set', () => {
    render(<Button disabled>Desabilitado</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})

describe('Input', () => {
  it('renders with placeholder', () => {
    render(<Input placeholder="Digite seu nome" />)
    expect(screen.getByPlaceholderText('Digite seu nome')).toBeInTheDocument()
  })

  it('renders label when provided', () => {
    render(<Input label="Nome" />)
    expect(screen.getByLabelText('Nome')).toBeInTheDocument()
  })

  it('fires onChange when typing', async () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'a')
    expect(handleChange).toHaveBeenCalled()
  })

  it('displays error message', () => {
    render(<Input error="Campo obrigatório" />)
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument()
  })

  it('applies error styles when error is present', () => {
    render(<Input error="Erro" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-red-500')
  })
})

describe('Modal', () => {
  it('does not render when open is false', () => {
    render(
      <Modal open={false} onClose={vi.fn()}>
        <p>Conteúdo do modal</p>
      </Modal>
    )
    expect(screen.queryByText('Conteúdo do modal')).not.toBeInTheDocument()
  })

  it('renders content when open is true', () => {
    render(
      <Modal open={true} onClose={vi.fn()}>
        <p>Conteúdo do modal</p>
      </Modal>
    )
    expect(screen.getByText('Conteúdo do modal')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(
      <Modal open={true} onClose={vi.fn()} title="Meu Modal">
        <p>Conteúdo</p>
      </Modal>
    )
    expect(screen.getByText('Meu Modal')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn()
    render(
      <Modal open={true} onClose={handleClose}>
        <p>Conteúdo</p>
      </Modal>
    )
    const closeButton = screen.getByTitle('Fechar')
    await userEvent.click(closeButton)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})

describe('Card', () => {
  it('renders children', () => {
    render(
      <Card>
        <p>Conteúdo do card</p>
      </Card>
    )
    expect(screen.getByText('Conteúdo do card')).toBeInTheDocument()
  })

  it('applies additional className', () => {
    render(
      <Card className="custom-class">
        <p>Card</p>
      </Card>
    )
    const card = screen.getByText('Card').parentElement
    expect(card).toHaveClass('custom-class')
  })
})

describe('Badge', () => {
  it('renders children text', () => {
    render(<Badge>Pendente</Badge>)
    expect(screen.getByText('Pendente')).toBeInTheDocument()
  })

  it('applies variant classes', () => {
    const { rerender } = render(<Badge variant="pendente">Pendente</Badge>)
    expect(screen.getByText('Pendente')).toHaveClass('bg-yellow-100')

    rerender(<Badge variant="concluido">Concluído</Badge>)
    expect(screen.getByText('Concluído')).toHaveClass('bg-green-100')

    rerender(<Badge variant="default">Default</Badge>)
    expect(screen.getByText('Default')).toHaveClass('bg-gray-100')
  })

  it('uses default variant when none is provided', () => {
    render(<Badge>Default</Badge>)
    expect(screen.getByText('Default')).toHaveClass('bg-gray-100')
  })
})
