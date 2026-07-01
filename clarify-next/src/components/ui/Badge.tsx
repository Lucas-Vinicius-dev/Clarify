import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'pendente' | 'em_analise' | 'requer_ajuste' | 'concluido' | 'default' | 'orange' | 'blue'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant
}

const variantClasses: Record<Variant, string> = {
  pendente: 'bg-yellow-100 text-yellow-800',
  em_analise: 'bg-blue-100 text-blue-800',
  requer_ajuste: 'bg-orange-100 text-orange-800',
  concluido: 'bg-green-100 text-green-800',
  default: 'bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-100',
  orange: 'bg-orange-100 text-orange-700',
  blue: 'bg-blue-100 text-blue-700',
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
}