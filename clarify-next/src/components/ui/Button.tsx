'use client'

import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-primary text-white hover:bg-brand-primary/90 shadow-sm',
  secondary:
    'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300',
  ghost:
    'bg-transparent text-gray-700 hover:bg-gray-100',
  danger:
    'bg-red-600 text-white hover:bg-red-700',
}

export function Button({
  className,
  variant = 'primary',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50 disabled:opacity-50 disabled:pointer-events-none',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
