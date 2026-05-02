import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Linkedin, Mail, ArrowRight } from 'lucide-react'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut' }
  }

  const fadeInLeft = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: 'easeOut' }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: 'easeOut' }
  }

  return (
    <div className="bg-slate-950 text-white overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        ></motion.div>
      </div>

      {/* Navigation */}
      <motion.nav 
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/95 backdrop-blur-md shadow-2xl shadow-blue-500/10' : 'bg-transparent'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Dr. Maheshwari M
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              {['About', 'Services', 'Experience', 'Testimonials', 'Contact'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`font-medium transition relative ${activeSection === item.toLowerCase() ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400"
                      layoutId="underline"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    ></motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button 
              className="hidden md:block px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Now
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-cyan-400"
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="md:hidden pb-4 space-y-2 bg-slate-900/50 backdrop-blur rounded-lg p-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {['About', 'Services', 'Experience', 'Testimonials', 'Contact'].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded transition"
                    whileHover={{ x: 10 }}
                  >
                    {item}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div 
                className="inline-block mb-6"
                variants={fadeInUp}
              >
                <span className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-full text-cyan-400 text-sm font-semibold">
                  Welcome to Premium Healthcare
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
                variants={fadeInUp}
              >
                Dr. Maheshwari M <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Healthcare Excellence
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-400 mb-8 leading-relaxed max-w-lg"
                variants={fadeInUp}
              >
                Board-certified specialist with 15+ years of experience. Dedicated to providing world-class medical care with compassion and expertise.
              </motion.p>
              
              <motion.div 
                className="flex gap-4"
                variants={fadeInUp}
              >
                <motion.button 
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition flex items-center gap-2"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Appointment <ArrowRight size={20} />
                </motion.button>
                <motion.button 
                  className="px-8 py-3 border-2 border-cyan-500/50 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-500/10 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div 
                className="relative w-full aspect-square"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {/* Glowing background */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                ></motion.div>
                
                {/* Main card */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-cyan-500/30 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10"></div>
                  <img 
                    src="/doctor-image.png" 
                    alt="Dr. Premium" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to SVG if image fails to load
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent flex items-end justify-center pb-8">
                    <div className="text-center">
                      <p className="text-2xl font-bold">Dr. Maheshwari M</p>
                      <p className="text-cyan-400 text-sm mt-2">Board Certified Specialist</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 md:px-8">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-5xl font-bold mb-12 text-center"
            variants={fadeInUp}
          >
            About <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Me</span>
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="relative w-full aspect-square"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-2xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                ></motion.div>
                
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-cyan-500/30 overflow-hidden">
                  <img 
                    src="/doctor-image.png" 
                    alt="Dr. Maheshwari M" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInLeft}>
              <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                I'm a board-certified healthcare professional with a passion for delivering exceptional patient care. With over 15 years of clinical experience, I've developed a comprehensive approach to medicine.
              </p>
              <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                My practice focuses on preventive medicine, early diagnosis, and personalized treatment plans tailored to each patient's unique needs.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Beyond clinical practice, I'm committed to continuous learning and contributing to medical research and education.
              </p>

              <motion.div 
                className="space-y-6 mt-8"
                variants={staggerContainer}
              >
              {[
                { icon: '🏥', title: 'Clinical Expertise', desc: '15+ years of clinical experience' },
                { icon: '🎓', title: 'Continuous Learning', desc: 'Regular participation in medical conferences' },
                { icon: '💡', title: 'Innovation', desc: 'Latest medical technologies' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  className="p-6 bg-slate-800/50 border border-cyan-500/20 rounded-xl hover:border-cyan-500/50 transition"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5, borderColor: 'rgba(34, 211, 238, 0.5)' }}
                >
                  <h3 className="text-xl font-bold mb-2">{item.icon} {item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 md:px-8">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-5xl font-bold mb-12 text-center"
            variants={fadeInUp}
          >
            My <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Services</span>
          </motion.h2>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
          >
            {[
              { icon: '❤️', name: 'Cardiology', desc: 'Heart & Cardiovascular' },
              { icon: '🧠', name: 'Neurology', desc: 'Nervous System' },
              { icon: '🦴', name: 'Orthopedics', desc: 'Bone & Joint Care' },
              { icon: '👶', name: 'Pediatrics', desc: 'Child Healthcare' },
            ].map((service) => (
              <motion.div 
                key={service.name}
                className="p-6 bg-slate-800/50 border border-cyan-500/20 rounded-xl hover:border-cyan-500/50 transition cursor-pointer group"
                variants={scaleIn}
                whileHover={{ scale: 1.1, y: -10 }}
              >
                <motion.div 
                  className="text-5xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-cyan-400 transition">{service.name}</h3>
                <p className="text-sm text-gray-400">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 md:px-8">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-5xl font-bold mb-12 text-center"
            variants={fadeInUp}
          >
            My <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Experience</span>
          </motion.h2>

          <div className="space-y-8">
            {[
              { 
                title: 'Senior Physician & Department Head', 
                org: 'Premium Medical Center', 
                year: '2015 - Present', 
                color: '#3b82f6',
                points: ['Leading 20+ healthcare professionals', 'Advanced diagnostic protocols', 'Mentoring junior physicians'] 
              },
              { 
                title: 'Attending Physician', 
                org: 'City General Hospital', 
                year: '2010 - 2015', 
                color: '#06b6d4',
                points: ['100+ patients monthly', 'Multidisciplinary collaboration', 'Medical research'] 
              }
            ].map((exp, i) => (
              <motion.div 
                key={i}
                className="p-8 bg-slate-800/50 border border-cyan-500/20 rounded-xl hover:border-cyan-500/50 transition flex gap-6"
                variants={fadeInUp}
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <svg className="w-24 h-24 rounded-lg flex-shrink-0" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="100" fill={exp.color}/>
                  <circle cx="50" cy="30" r="15" fill="#e5e7eb"/>
                  <ellipse cx="50" cy="65" rx="25" ry="20" fill="#e5e7eb"/>
                </svg>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                  <p className="text-cyan-400 font-semibold mb-1">{exp.org}</p>
                  <p className="text-gray-400 mb-4">{exp.year}</p>
                  <ul className="text-gray-400 space-y-2">
                    {exp.points.map((point, j) => (
                      <li key={j}>• {point}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 md:px-8">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-5xl font-bold mb-12 text-center"
            variants={fadeInUp}
          >
            Patient <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Testimonials</span>
          </motion.h2>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {[
              { name: 'Sarah Johnson', role: 'Patient', color: '#3b82f6' },
              { name: 'Michael Chen', role: 'Patient', color: '#06b6d4' },
              { name: 'Emma Davis', role: 'Patient', color: '#8b5cf6' }
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                className="p-8 bg-slate-800/50 border border-cyan-500/20 rounded-xl hover:border-cyan-500/50 transition"
                variants={fadeInUp}
                whileHover={{ y: -10, borderColor: 'rgba(34, 211, 238, 0.5)' }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <motion.span 
                      key={j}
                      className="text-yellow-400 text-lg"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, delay: j * 0.1 }}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  "Exceptional care and professionalism. Dr. Premium truly cares about patient wellness and recovery."
                </p>
                <div className="flex items-center gap-4">
                  <svg className="w-12 h-12 rounded-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="50" fill={testimonial.color}/>
                    <circle cx="50" cy="35" r="15" fill="#e5e7eb"/>
                    <ellipse cx="50" cy="70" rx="25" ry="20" fill="#e5e7eb"/>
                  </svg>
                  <div>
                    <p className="font-bold text-cyan-400">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-8">
        <motion.div 
          className="max-w-2xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-5xl font-bold text-center mb-12"
            variants={fadeInUp}
          >
            Get in <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Touch</span>
          </motion.h2>

          <motion.form 
            className="p-8 bg-slate-800/50 border border-cyan-500/20 rounded-xl"
            variants={fadeInUp}
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <motion.input 
                type="text" 
                placeholder="Full Name" 
                className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.input 
                type="email" 
                placeholder="Email" 
                className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
                whileFocus={{ scale: 1.02 }}
              />
            </div>
            <motion.input 
              type="tel" 
              placeholder="Phone" 
              className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition mb-6"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.textarea 
              placeholder="Message" 
              rows={4} 
              className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition mb-6"
              whileFocus={{ scale: 1.02 }}
            ></motion.textarea>
            <motion.button 
              type="submit" 
              className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="border-t border-cyan-500/20 py-12 px-4 md:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">Dr. Maheshwari M</h3>
              <p className="text-gray-400">Premium healthcare services for your wellness</p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h4 className="font-bold mb-4 text-cyan-400">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-cyan-400 transition">About</a></li>
                <li><a href="#services" className="hover:text-cyan-400 transition">Services</a></li>
                <li><a href="#experience" className="hover:text-cyan-400 transition">Experience</a></li>
              </ul>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h4 className="font-bold mb-4 text-cyan-400">Contact</h4>
              <p className="text-gray-400">📧 contact@drpremium.com</p>
              <p className="text-gray-400">📞 +1 (555) 123-4567</p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h4 className="font-bold mb-4 text-cyan-400">Follow</h4>
              <div className="flex gap-4">
                <motion.a 
                  href="#" 
                  className="text-gray-400 hover:text-cyan-400 transition"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <Linkedin size={20} />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-gray-400 hover:text-cyan-400 transition"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <Mail size={20} />
                </motion.a>
              </div>
            </motion.div>
          </div>
          <div className="border-t border-cyan-500/20 pt-8 text-center text-gray-500">
            <p>&copy; 2026 Dr. Maheshwari M. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default App
