import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, className, children, ...props }, ref) => {
    const baseStyles = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2'

    const variantStyles = {
      primary: 'bg-gradient-teal text-white hover:shadow-lg focus-visible:outline-teal-primary',
      secondary: 'bg-soft-blue text-teal-primary hover:bg-teal-primary hover:text-white focus-visible:outline-teal-primary',
      outline: 'border-2 border-teal-primary text-teal-primary hover:bg-soft-blue focus-visible:outline-teal-primary',
    }

    const sizeStyles = {
      sm: 'px-4 py-2 text-small',
      md: 'px-6 py-3 text-body',
      lg: 'px-8 py-4 text-h4',
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          isLoading && 'opacity-70 cursor-not-allowed',
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Loading...
          </>
        ) : (
          children
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
