import React from 'react'
import { motion } from 'framer-motion'
import { Card } from './Card'
import { useScrollTrigger } from '@/hooks'
import { staggerContainerVariants, getScrollAnimationVariants } from '@/utils/animations'

interface AboutCard {
  id: string
  title: string
  description: string
  icon?: React.ReactNode
}

interface AboutSectionProps {
  title: string
  cards: AboutCard[]
}

export const AboutSection: React.FC<AboutSectionProps> = ({ title, cards }) => {
  const { ref, isVisible } = useScrollTrigger()

  return (
    <section id="about" className="py-20 md:py-32 px-4 md:px-8 bg-white">
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

          {/* Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainerVariants}
          >
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                variants={getScrollAnimationVariants(index * 0.1)}
              >
                <Card isHoverable variant="default">
                  <div className="space-y-4">
                    {card.icon && (
                      <div className="text-4xl">
                        {card.icon}
                      </div>
                    )}
                    <h3 className="text-h4 font-bold text-dark-gray">
                      {card.title}
                    </h3>
                    <p className="text-body text-medium-gray leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
