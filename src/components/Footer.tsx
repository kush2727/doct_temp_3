import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

interface FooterProps {
  doctorName?: string
  email?: string
  phone?: string
  address?: string
}

export const Footer: React.FC<FooterProps> = ({
  doctorName = 'Dr. John Smith',
  email = 'contact@drportfolio.com',
  phone = '+1 (555) 123-4567',
  address = '123 Medical Center, New York, NY 10001',
}) => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ]

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-gray text-white py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-h3 font-bold">Dr. Portfolio</h3>
            <p className="text-small text-gray-400">
              Premium healthcare professional portfolio platform
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-h4 font-bold">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Services', 'Experience', 'Testimonials'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-small text-gray-400 hover:text-teal-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-h4 font-bold">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-small text-gray-400">
                <Mail size={16} className="text-teal-primary" />
                <a href={`mailto:${email}`} className="hover:text-teal-primary transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-small text-gray-400">
                <Phone size={16} className="text-teal-primary" />
                <a href={`tel:${phone}`} className="hover:text-teal-primary transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-small text-gray-400">
                <MapPin size={16} className="text-teal-primary flex-shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-h4 font-bold">Follow</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="p-2 rounded-full bg-white/10 text-white hover:bg-teal-primary transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          {/* Bottom Content */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-small text-gray-400">
              © {currentYear} {doctorName}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-small text-gray-400 hover:text-teal-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-small text-gray-400 hover:text-teal-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
