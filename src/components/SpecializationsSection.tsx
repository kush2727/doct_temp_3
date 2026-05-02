import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from './Card'
import { useScrollTrigger } from '@/hooks'
import { staggerContainerVariants, getScrollAnimationVariants } from '@/utils/animations'

interface Specialization {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color?: string
}

interface SpecializationsSectionProps {
  title: string
  specializations: Specialization[]
}

export const SpecializationsSection: React.FC<SpecializationsSectionProps> = ({
  title,
  specializations,
}) => {
  const { ref, isVisible } = useScrollTrigger()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <section id="specializations" className="py-20 md:py-32 px-4 md:px-8 bg-light-gray">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={staggerContainerVariants}
          className="space-y-12"
        >
          {/* Section Title */}
          <motion.div
            className="text-center space-y-4"
            variants={getScrollAnimationVariants()}
          >
            <h2 className="text-h2 md:text-5xl font-bold text-dark-gray">
              {title}
            </h2>
            <div className="w-16 h-1 bg-gradient-teal mx-auto rounded-full" />
          </motion.div>

          {/* Specializations Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainerVariants}
          >
            {specializations.map((spec, index) => (
              <motion.div
                key={spec.id}
                variants={getScrollAnimationVariants(index * 0.1)}
                onClick={() => setExpandedId(expandedId === spec.id ? null : spec.id)}
              >
                <Card
                  isHoverable
                  variant="default"
                  className="cursor-pointer h-full"
                >
                  <motion.div
                    className="space-y-4 text-center"
                    animate={{
                      scale: expandedId === spec.id ? 1.02 : 1,
                    }}
                  >
                    {/* Icon */}
                    <motion.div
                      className="text-5xl flex justify-center"
                      animate={{
                        rotate: expandedId === spec.id ? 360 : 0,
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {spec.icon}
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-h4 font-bold text-dark-gray">
                      {spec.name}
                    </h3>

                    {/* Description */}
                    <motion.p
                      className="text-body text-medium-gray"
                      animate={{
                        opacity: expandedId === spec.id ? 1 : 0.7,
                      }}
                    >
                      {spec.description}
                    </motion.p>

                    {/* Expand Indicator */}
                    <motion.div
                      className="text-small text-teal-primary font-semibold"
                      animate={{
                        opacity: expandedId === spec.id ? 1 : 0,
                      }}
                    >
                      Learn More →
                    </motion.div>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
