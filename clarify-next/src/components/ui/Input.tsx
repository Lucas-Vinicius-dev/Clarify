'use client'

import { forwardRef, InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full bg-transparent border-0 border-b border-gray-200 py-2 px-0 text-lg text-gray-900 placeholder-gray-400 transition-colors',
          'focus:outline-none focus:border-brand-primary',
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'