import React from 'react'
import { motion } from 'framer-motion'
import { Card } from './Card'
import { useScrollTrigger, useMediaQuery } from '@/hooks'
import { staggerContainerVariants, getScrollAnimationVariants } from '@/utils/animations'

interface TimelineEntry {
  id: string
  date: string
  title: string
  organization: string
  description: string
  type: 'experience' | 'certification'
}

interface TimelineSectionProps {
  title: string
  entries: TimelineEntry[]
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ title, entries }) => {
  const { ref, isVisible } = useScrollTrigger()
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <section id="experience" className="py-20 md:py-32 px-4 md:px-8 bg-white">
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

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-teal-primary to-teal-dark"
              initial={{ scaleY: 0 }}
              animate={isVisible ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ originY: 0 }}
            />

            {/* Timeline Entries */}
            <div className="space-y-12">
              {entries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  variants={getScrollAnimationVariants(index * 0.15)}
                  className={`flex ${isMobile ? 'flex-col' : index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`w-full ${isMobile ? '' : 'md:w-1/2'} ${isMobile ? '' : index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <Card isHoverable variant="default">
                      <div className="space-y-2">
                        <p className="text-small font-semibold text-teal-primary">
                          {entry.date}
                        </p>
                        <h3 className="text-h4 font-bold text-dark-gray">
                          {entry.title}
                        </h3>
                        <p className="text-body font-semibold text-medium-gray">
                          {entry.organization}
                        </p>
                        <p className="text-body text-medium-gray leading-relaxed">
                          {entry.description}
                        </p>
                        <div className="pt-2">
                          <span className={`inline-block px-3 py-1 rounded-full text-tiny font-semibold ${
                            entry.type === 'experience'
                              ? 'bg-soft-blue text-teal-primary'
                              : 'bg-neon-green/20 text-neon-green'
                          }`}>
                            {entry.type === 'experience' ? 'Experience' : 'Certification'}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Timeline Dot */}
                  <motion.div
                    className="flex justify-center items-start md:items-center w-full md:w-auto py-4 md:py-0"
                    animate={{ scale: isVisible ? 1 : 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-4 h-4 bg-gradient-teal rounded-full border-4 border-white shadow-lg" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
