import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px',
  {
    variants: {
      variant: {
        default: 'bg-slate-950 text-white shadow-sm hover:bg-slate-800',
        secondary: 'border border-border bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-950',
        ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
      },
      size: { default: 'h-10 px-4', sm: 'h-8 rounded-md px-3 text-xs', icon: 'h-10 w-10' },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
))
Button.displayName = 'Button'
