'use client'

import { forwardRef, TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full resize-none border border-gray-200 rounded-xl p-3.5 text-sm text-gray-900 placeholder-gray-400 bg-white',
          'transition-colors focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10',
          className
        )}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'