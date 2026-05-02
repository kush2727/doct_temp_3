import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useScrollPosition, useMediaQuery } from '@/hooks'
import { cn } from '@/utils/cn'

interface NavigationProps {
  sections: Array<{ id: string; label: string }>
  activeSection?: string
  onNavigate?: (sectionId: string) => void
}

export const Navigation: React.FC<NavigationProps> = ({
  sections,
  activeSection,
  onNavigate,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const scrollPosition = useScrollPosition()
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    setIsSticky(scrollPosition > 50)
  }, [scrollPosition])

  const handleNavigate = (sectionId: string) => {
    onNavigate?.(sectionId)
    setIsMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      className={cn(
        'w-full transition-all duration-300 z-sticky',
        isSticky ? 'fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-md' : 'relative bg-white'
      )}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <h1 className="text-h3 font-bold bg-gradient-teal bg-clip-text text-transparent">
              Dr. Portfolio
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex items-center gap-8">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => handleNavigate(section.id)}
                  className={cn(
                    'text-body font-medium transition-colors duration-200 relative',
                    activeSection === section.id ? 'text-teal-primary' : 'text-medium-gray hover:text-dark-gray'
                  )}
                  whileHover={{ scale: 1.05 }}
                >
                  {section.label}
                  {activeSection === section.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-teal"
                      layoutId="underline"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          )}

          {/* CTA Button */}
          <motion.button
            onClick={() => handleNavigate('booking')}
            className="hidden md:block px-6 py-2 bg-gradient-teal text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Now
          </motion.button>

          {/* Mobile Menu Button */}
          {isMobile && (
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-dark-gray hover:bg-soft-blue rounded-lg transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          )}
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && isMobile && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-soft-blue"
            >
              <div className="px-4 py-4 space-y-2">
                {sections.map((section) => (
                  <motion.button
                    key={section.id}
                    onClick={() => handleNavigate(section.id)}
                    className={cn(
                      'w-full text-left px-4 py-2 rounded-lg transition-colors duration-200',
                      activeSection === section.id
                        ? 'bg-soft-blue text-teal-primary font-semibold'
                        : 'text-medium-gray hover:bg-light-gray'
                    )}
                    whileHover={{ x: 4 }}
                  >
                    {section.label}
                  </motion.button>
                ))}
                <motion.button
                  onClick={() => handleNavigate('booking')}
                  className="w-full mt-4 px-4 py-2 bg-gradient-teal text-white rounded-lg font-semibold"
                  whileTap={{ scale: 0.95 }}
                >
                  Book Appointment
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
