import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const Input = forwardRef(({ className, type = 'text', ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-text font-mono transition-all duration-200 outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      spellCheck={false}
      autoComplete="off"
      {...props}
    />
  )
})
Input.displayName = 'Input'
