import * as React from 'react'
import { cn } from '@/lib/utils'

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn('h-10 w-full rounded-lg border border-border bg-white px-3 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-500 focus:border-slate-400 focus:ring-2 focus:ring-slate-200', className)} {...props} />
))
Input.displayName = 'Input'
