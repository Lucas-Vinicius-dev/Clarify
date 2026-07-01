import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type CardProps = HTMLAttributes<HTMLDivElement>

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg',
        className
      )}
      {...props}
    />
  )
}