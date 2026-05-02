import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Card } from './Card'
import { useScrollTrigger, useMediaQuery } from '@/hooks'
import { staggerContainerVariants, getScrollAnimationVariants } from '@/utils/animations'

interface Testimonial {
  id: string
  patientName: string
  patientPhoto: string
  rating: number
  text: string
  date?: string
}

interface TestimonialsCarouselProps {
  title: string
  testimonials: Testimonial[]
  autoAdvanceInterval?: number
}

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  title,
  testimonials,
  autoAdvanceInterval = 6000,
}) => {
  const { ref, isVisible } = useScrollTrigger()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1024px)')

  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoAdvance, setAutoAdvance] = useState(true)

  const visibleCards = isMobile ? 1 : isTablet ? 2 : 3

  useEffect(() => {
    if (!autoAdvance) return

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, autoAdvanceInterval)

    return () => clearTimeout(timer)
  }, [currentIndex, autoAdvance, autoAdvanceInterval, testimonials.length])

  const handlePrevious = () => {
    setAutoAdvance(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setAutoAdvance(true), 3000)
  }

  const handleNext = () => {
    setAutoAdvance(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setAutoAdvance(true), 3000)
  }

  const getVisibleTestimonials = () => {
    const visible = []
    for (let i = 0; i < visibleCards; i++) {
      visible.push(testimonials[(currentIndex + i) % testimonials.length])
    }
    return visible
  }

  return (
    <section id="testimonials" className="py-20 md:py-32 px-4 md:px-8 bg-light-gray">
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

          {/* Carousel */}
          <motion.div
            className="space-y-8"
            variants={getScrollAnimationVariants()}
          >
            {/* Cards Container */}
            <div className="relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="wait">
                  {getVisibleTestimonials().map((testimonial, index) => (
                    <motion.div
                      key={`${testimonial.id}-${currentIndex}`}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Card isHoverable variant="default" className="h-full">
                        <div className="space-y-4">
                          {/* Patient Info */}
                          <div className="flex items-center gap-4">
                            <img
                              src={testimonial.patientPhoto}
                              alt={testimonial.patientName}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                              <h4 className="text-h4 font-bold text-dark-gray">
                                {testimonial.patientName}
                              </h4>
                              {testimonial.date && (
                                <p className="text-small text-medium-gray">
                                  {testimonial.date}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Rating */}
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={i < testimonial.rating ? 'fill-neon-green text-neon-green' : 'text-light-gray'}
                              />
                            ))}
                          </div>

                          {/* Testimonial Text */}
                          <p className="text-body text-medium-gray leading-relaxed line-clamp-3">
                            "{testimonial.text}"
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4">
              {/* Previous Button */}
              <motion.button
                onClick={handlePrevious}
                className="p-2 rounded-full bg-white border-2 border-teal-primary text-teal-primary hover:bg-soft-blue transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={24} />
              </motion.button>

              {/* Dot Indicators */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setAutoAdvance(false)
                      setCurrentIndex(index)
                      setTimeout(() => setAutoAdvance(true), 3000)
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? 'bg-teal-primary w-8' : 'bg-light-gray'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>

              {/* Next Button */}
              <motion.button
                onClick={handleNext}
                className="p-2 rounded-full bg-white border-2 border-teal-primary text-teal-primary hover:bg-soft-blue transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
