import React from 'react'
import { cn } from '@/utils/cn'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  children: React.ReactNode
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'primary', className, children, ...props }, ref) => {
    const variantStyles = {
      primary: 'bg-soft-blue text-teal-primary',
      secondary: 'bg-light-gray text-dark-gray',
      success: 'bg-neon-green/20 text-neon-green',
      warning: 'bg-soft-orange/20 text-soft-orange',
      error: 'bg-soft-red/20 text-soft-red',
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-3 py-1 rounded-full text-tiny font-semibold',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
