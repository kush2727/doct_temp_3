import React from 'react'
import { motion } from 'framer-motion'
import { useTilt } from '@/hooks'
import { cn } from '@/utils/cn'

interface ProfileCardProps {
  image: string
  name: string
  specialization: string
  tagline?: string
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  image,
  name,
  specialization,
  tagline,
}) => {
  const { ref, tilt, handlers } = useTilt(10)
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <motion.div
      ref={ref}
      {...handlers}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
      style={{
        perspective: '1000px',
        transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.div
        className={cn(
          'glass rounded-2xl overflow-hidden w-full max-w-sm',
          'bg-white/30 backdrop-blur-md border border-white/20',
          'shadow-glass transition-all duration-300'
        )}
        animate={{
          boxShadow: isHovered
            ? '0 0 40px rgba(0, 212, 255, 0.4), 0 20px 40px rgba(0, 0, 0, 0.1)'
            : '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Image Container */}
        <div className="relative h-80 overflow-hidden">
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="p-6 space-y-3">
          <motion.h3
            className="text-h3 font-bold text-dark-gray"
            animate={{ y: isHovered ? -2 : 0 }}
          >
            {name}
          </motion.h3>

          <motion.p
            className="text-body font-semibold text-teal-primary"
            animate={{ y: isHovered ? -2 : 0 }}
          >
            {specialization}
          </motion.p>

          {tagline && (
            <motion.p
              className="text-small text-medium-gray"
              animate={{ y: isHovered ? -2 : 0 }}
            >
              {tagline}
            </motion.p>
          )}

          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{
              boxShadow: isHovered
                ? 'inset 0 0 20px rgba(0, 212, 255, 0.2)'
                : 'inset 0 0 0px rgba(0, 212, 255, 0)',
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
