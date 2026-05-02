import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass'
  children: React.ReactNode
  isHoverable?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className, children, isHoverable = false, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-white border border-soft-blue shadow-md',
      elevated: 'bg-white shadow-lg',
      glass: 'glass bg-white/30 border border-white/20',
    }

    return (
      <motion.div
        ref={ref}
        whileHover={isHoverable ? { y: -4, boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)' } : {}}
        transition={{ duration: 0.3 }}
        className={cn(
          'rounded-xl p-6 transition-all duration-300',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'
