import { cn } from '../../lib/utils'

export function Badge({ className, variant = 'default', children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none",
        {
          'bg-surface-2 text-text-secondary border border-border': variant === 'default',
          'bg-accent-dim text-accent border border-accent-border': variant === 'accent',
          'bg-error-bg text-error border border-error-border': variant === 'error',
          'bg-success-bg text-success border border-success/20': variant === 'success',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
