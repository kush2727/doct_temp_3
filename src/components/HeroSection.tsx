import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Hero3DBackground } from './Hero3DBackground'
import { ProfileCard } from './ProfileCard'
import { Button } from './Button'
import { useScrollPosition } from '@/hooks'
import { fadeInVariants, slideInLeftVariants, slideInRightVariants } from '@/utils/animations'

interface HeroSectionProps {
  doctorName: string
  specialization: string
  profileImage: string
  headline: string
  subheadline: string
  onBookClick?: () => void
  onLearnMoreClick?: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  doctorName,
  specialization,
  profileImage,
  headline,
  subheadline,
  onBookClick,
  onLearnMoreClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollPosition = useScrollPosition()
  const animationIntensity = Math.max(0, 1 - scrollPosition / 500)

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-white"
    >
      {/* 3D Background */}
      <div
        ref={containerRef}
        className="absolute inset-0 opacity-40"
        style={{ opacity: animationIntensity * 0.4 }}
      >
        <Hero3DBackground containerRef={containerRef} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-soft-blue/20 to-white pointer-events-none" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4 md:px-8">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-6 md:space-y-8"
            variants={slideInLeftVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="space-y-4"
              variants={fadeInVariants}
            >
              <motion.h1
                className="text-h1 md:text-5xl lg:text-6xl font-bold text-dark-gray leading-tight"
                animate={{ opacity: animationIntensity }}
              >
                {headline}
              </motion.h1>

              <motion.p
                className="text-body md:text-h4 text-medium-gray leading-relaxed"
                animate={{ opacity: animationIntensity * 0.8 }}
              >
                {subheadline}
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              variants={fadeInVariants}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={onBookClick}
                className="w-full sm:w-auto"
              >
                Book Appointment
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onLearnMoreClick}
                className="w-full sm:w-auto"
              >
                Learn More
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4 pt-8 border-t border-soft-blue"
              variants={fadeInVariants}
            >
              {[
                { number: '15+', label: 'Years Experience' },
                { number: '5000+', label: 'Happy Patients' },
                { number: '98%', label: 'Satisfaction' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-h3 font-bold text-teal-primary">{stat.number}</p>
                  <p className="text-small text-medium-gray">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Card */}
          <motion.div
            className="flex justify-center md:justify-end"
            variants={slideInRightVariants}
            initial="hidden"
            animate="visible"
          >
            <ProfileCard
              image={profileImage}
              name={doctorName}
              specialization={specialization}
              tagline="Board Certified • Award Winning"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-small text-medium-gray">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-teal-primary rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-teal-primary rounded-full mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
