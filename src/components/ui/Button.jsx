import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const Button = forwardRef(({ className, variant = 'primary', size = 'default', children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 outline-none disabled:opacity-50 disabled:pointer-events-none",
        {
          'bg-accent text-white hover:bg-accent-hover hover:shadow-[0_0_0_3px_rgba(99,102,241,0.25)]': variant === 'primary',
          'bg-surface-2 border border-border text-text-secondary hover:bg-hover-overlay hover:border-border-hover hover:text-text': variant === 'secondary',
          'bg-transparent border border-transparent text-text-muted hover:text-text hover:bg-hover-overlay': variant === 'ghost',
          'bg-error-bg text-error border border-error-border hover:bg-red-500/20': variant === 'danger',
          'h-10 px-4 py-2': size === 'default',
          'h-8 px-3 text-xs': size === 'sm',
          'h-12 px-8 text-base': size === 'lg',
          'p-2': size === 'icon',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
Button.displayName = 'Button'
