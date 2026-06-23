import type { LabelHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

export function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        'text-xs font-bold uppercase tracking-widest text-gray-500',
        className
      )}
      {...props}
    />
  )
}