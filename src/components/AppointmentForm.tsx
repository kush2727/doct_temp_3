import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card } from './Card'
import { Button } from './Button'
import { useScrollTrigger } from '@/hooks'
import { staggerContainerVariants, getScrollAnimationVariants } from '@/utils/animations'
import { AppointmentFormData } from '@/types'

const appointmentSchema = z.object({
  appointmentType: z.string().min(1, 'Please select an appointment type'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  patientName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  reason: z.string().min(10, 'Please provide more details'),
  medicalHistory: z.string().optional(),
})

type AppointmentFormValues = z.infer<typeof appointmentSchema>

interface AppointmentFormProps {
  onSubmit?: (data: AppointmentFormData) => void
  appointmentTypes?: Array<{ id: string; name: string; description: string }>
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  onSubmit,
  appointmentTypes = [
    { id: 'consultation', name: 'Consultation', description: 'Initial consultation' },
    { id: 'followup', name: 'Follow-up', description: 'Follow-up appointment' },
    { id: 'procedure', name: 'Procedure', description: 'Medical procedure' },
  ],
}) => {
  const { ref, isVisible } = useScrollTrigger()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    mode: 'onBlur',
  })

  const appointmentType = watch('appointmentType')
  const date = watch('date')
  const time = watch('time')
  const patientName = watch('patientName')
  const email = watch('email')
  const phone = watch('phone')

  const handleNext = async () => {
    if (currentStep === 1 && !appointmentType) return
    if (currentStep === 2 && (!date || !time)) return
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onFormSubmit = async (data: AppointmentFormValues) => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onSubmit?.(data as AppointmentFormData)
      setSubmitSuccess(true)
      reset()
      setTimeout(() => {
        setCurrentStep(1)
        setSubmitSuccess(false)
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="booking" className="py-20 md:py-32 px-4 md:px-8 bg-white">
      <div className="max-w-2xl mx-auto">
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
              Book Your Appointment
            </h2>
            <div className="w-16 h-1 bg-gradient-teal mx-auto rounded-full" />
          </motion.div>

          {/* Form Card */}
          <motion.div
            variants={getScrollAnimationVariants()}
          >
            <Card variant="default">
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-4 py-8"
                >
                  <div className="text-5xl">✓</div>
                  <h3 className="text-h3 font-bold text-neon-green">
                    Appointment Confirmed!
                  </h3>
                  <p className="text-body text-medium-gray">
                    We've sent a confirmation email to {email}
                  </p>
                  <p className="text-small text-medium-gray">
                    Confirmation #: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                  {/* Progress Indicator */}
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((step) => (
                      <motion.div
                        key={step}
                        className={`flex-1 h-2 rounded-full transition-all ${
                          step <= currentStep ? 'bg-gradient-teal' : 'bg-light-gray'
                        }`}
                        animate={{ width: step <= currentStep ? '100%' : '100%' }}
                      />
                    ))}
                  </div>

                  {/* Step Content */}
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                      >
                        <h3 className="text-h4 font-bold text-dark-gray">
                          Select Appointment Type
                        </h3>
                        <div className="space-y-3">
                          {appointmentTypes.map((type) => (
                            <label
                              key={type.id}
                              className="flex items-center p-4 border-2 border-soft-blue rounded-lg cursor-pointer hover:bg-soft-blue transition-colors"
                            >
                              <input
                                type="radio"
                                value={type.id}
                                {...register('appointmentType')}
                                className="w-4 h-4"
                              />
                              <div className="ml-4">
                                <p className="font-semibold text-dark-gray">{type.name}</p>
                                <p className="text-small text-medium-gray">{type.description}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.appointmentType && (
                          <p className="text-soft-red text-small">{errors.appointmentType.message}</p>
                        )}
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                      >
                        <h3 className="text-h4 font-bold text-dark-gray">
                          Select Date & Time
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-small font-semibold text-dark-gray mb-2">
                              Date
                            </label>
                            <input
                              type="date"
                              {...register('date')}
                              className="w-full px-4 py-2 border-2 border-soft-blue rounded-lg focus:border-teal-primary focus:outline-none"
                            />
                            {errors.date && (
                              <p className="text-soft-red text-small mt-1">{errors.date.message}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-small font-semibold text-dark-gray mb-2">
                              Time
                            </label>
                            <input
                              type="time"
                              {...register('time')}
                              className="w-full px-4 py-2 border-2 border-soft-blue rounded-lg focus:border-teal-primary focus:outline-none"
                            />
                            {errors.time && (
                              <p className="text-soft-red text-small mt-1">{errors.time.message}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                      >
                        <h3 className="text-h4 font-bold text-dark-gray">
                          Your Information
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-small font-semibold text-dark-gray mb-2">
                              Full Name
                            </label>
                            <input
                              type="text"
                              {...register('patientName')}
                              className="w-full px-4 py-2 border-2 border-soft-blue rounded-lg focus:border-teal-primary focus:outline-none"
                              placeholder="John Doe"
                            />
                            {errors.patientName && (
                              <p className="text-soft-red text-small mt-1">{errors.patientName.message}</p>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-small font-semibold text-dark-gray mb-2">
                                Email
                              </label>
                              <input
                                type="email"
                                {...register('email')}
                                className="w-full px-4 py-2 border-2 border-soft-blue rounded-lg focus:border-teal-primary focus:outline-none"
                                placeholder="john@example.com"
                              />
                              {errors.email && (
                                <p className="text-soft-red text-small mt-1">{errors.email.message}</p>
                              )}
                            </div>
                            <div>
                              <label className="block text-small font-semibold text-dark-gray mb-2">
                                Phone
                              </label>
                              <input
                                type="tel"
                                {...register('phone')}
                                className="w-full px-4 py-2 border-2 border-soft-blue rounded-lg focus:border-teal-primary focus:outline-none"
                                placeholder="+1 (555) 000-0000"
                              />
                              {errors.phone && (
                                <p className="text-soft-red text-small mt-1">{errors.phone.message}</p>
                              )}
                            </div>
                          </div>
                          <div>
                            <label className="block text-small font-semibold text-dark-gray mb-2">
                              Reason for Visit
                            </label>
                            <textarea
                              {...register('reason')}
                              className="w-full px-4 py-2 border-2 border-soft-blue rounded-lg focus:border-teal-primary focus:outline-none"
                              placeholder="Please describe your symptoms or reason for visit"
                              rows={3}
                            />
                            {errors.reason && (
                              <p className="text-soft-red text-small mt-1">{errors.reason.message}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-small font-semibold text-dark-gray mb-2">
                              Medical History (Optional)
                            </label>
                            <textarea
                              {...register('medicalHistory')}
                              className="w-full px-4 py-2 border-2 border-soft-blue rounded-lg focus:border-teal-primary focus:outline-none"
                              placeholder="Any relevant medical history"
                              rows={2}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                      >
                        <h3 className="text-h4 font-bold text-dark-gray">
                          Confirm Your Appointment
                        </h3>
                        <div className="space-y-3 bg-soft-blue/30 p-4 rounded-lg">
                          <div className="flex justify-between">
                            <span className="text-medium-gray">Type:</span>
                            <span className="font-semibold text-dark-gray">
                              {appointmentTypes.find((t) => t.id === appointmentType)?.name}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-medium-gray">Date & Time:</span>
                            <span className="font-semibold text-dark-gray">
                              {date} at {time}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-medium-gray">Name:</span>
                            <span className="font-semibold text-dark-gray">{patientName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-medium-gray">Email:</span>
                            <span className="font-semibold text-dark-gray">{email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-medium-gray">Phone:</span>
                            <span className="font-semibold text-dark-gray">{phone}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex gap-4 pt-6">
                    {currentStep > 1 && (
                      <Button
                        variant="outline"
                        size="md"
                        onClick={handlePrevious}
                        type="button"
                        className="flex-1"
                      >
                        Previous
                      </Button>
                    )}
                    {currentStep < 4 ? (
                      <Button
                        variant="primary"
                        size="md"
                        onClick={handleNext}
                        type="button"
                        className="flex-1"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="md"
                        type="submit"
                        isLoading={isSubmitting}
                        className="flex-1"
                      >
                        Confirm Appointment
                      </Button>
                    )}
                  </div>
                </form>
              )}
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
