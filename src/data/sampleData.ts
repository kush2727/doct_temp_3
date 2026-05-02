import { DoctorProfile } from '@/types'
import {
  Heart,
  Brain,
  Stethoscope,
  Activity,
  Award,
  Users,
} from 'lucide-react'

export const sampleDoctorProfile: DoctorProfile = {
  id: '1',
  name: 'Dr. Sarah Johnson',
  specialization: 'Cardiologist',
  bio: 'Board-certified cardiologist with 15+ years of experience in cardiovascular medicine.',
  profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
  credentials: [
    {
      id: '1',
      title: 'MD - Internal Medicine',
      issuer: 'Harvard Medical School',
      date: new Date('2008-06-01'),
      description: 'Doctor of Medicine with honors',
    },
    {
      id: '2',
      title: 'Board Certification - Cardiology',
      issuer: 'American Board of Internal Medicine',
      date: new Date('2012-03-01'),
      description: 'Subspecialty certification in cardiovascular disease',
    },
    {
      id: '3',
      title: 'Fellowship - Interventional Cardiology',
      issuer: 'Johns Hopkins Medical Center',
      date: new Date('2014-06-01'),
      description: 'Advanced training in interventional procedures',
    },
  ],
  experience: [
    {
      id: '1',
      title: 'Chief of Cardiology',
      organization: 'Metropolitan Medical Center',
      startDate: new Date('2018-01-01'),
      description: 'Leading the cardiology department with a team of 12 specialists',
      type: 'experience',
    },
    {
      id: '2',
      title: 'Senior Cardiologist',
      organization: 'City Hospital',
      startDate: new Date('2014-06-01'),
      endDate: new Date('2017-12-31'),
      description: 'Provided comprehensive cardiac care and mentored junior physicians',
      type: 'experience',
    },
    {
      id: '3',
      title: 'Cardiology Fellow',
      organization: 'Johns Hopkins Medical Center',
      startDate: new Date('2011-07-01'),
      endDate: new Date('2014-06-30'),
      description: 'Completed advanced fellowship in interventional cardiology',
      type: 'certification',
    },
  ],
  specializations: [
    {
      id: '1',
      name: 'Coronary Artery Disease',
      description: 'Expert diagnosis and treatment of coronary conditions',
      icon: '❤️',
      color: '#FF6B6B',
    },
    {
      id: '2',
      name: 'Heart Failure',
      description: 'Comprehensive heart failure management',
      icon: '💓',
      color: '#FF8C42',
    },
    {
      id: '3',
      name: 'Arrhythmia',
      description: 'Treatment of irregular heartbeats',
      icon: '⚡',
      color: '#FFD93D',
    },
    {
      id: '4',
      name: 'Preventive Cardiology',
      description: 'Heart disease prevention strategies',
      icon: '🛡️',
      color: '#6BCB77',
    },
  ],
  testimonials: [
    {
      id: '1',
      patientName: 'Michael Chen',
      patientPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      rating: 5,
      text: 'Dr. Johnson provided exceptional care and took time to explain everything. Highly recommended!',
      date: '2 months ago',
    },
    {
      id: '2',
      patientName: 'Emily Rodriguez',
      patientPhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      rating: 5,
      text: 'Professional, knowledgeable, and compassionate. Best cardiologist I\'ve seen.',
      date: '1 month ago',
    },
    {
      id: '3',
      patientName: 'James Wilson',
      patientPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      rating: 5,
      text: 'Dr. Johnson helped me manage my heart condition effectively. Very satisfied with the treatment.',
      date: '3 weeks ago',
    },
    {
      id: '4',
      patientName: 'Lisa Anderson',
      patientPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      rating: 5,
      text: 'Excellent bedside manner and thorough examination. Highly professional.',
      date: '1 week ago',
    },
  ],
  contactInfo: {
    email: 'contact@drportfolio.com',
    phone: '+1 (555) 123-4567',
    address: '123 Medical Center, New York, NY 10001',
    socialMedia: [
      { platform: 'LinkedIn', url: '#', icon: 'linkedin' },
      { platform: 'Twitter', url: '#', icon: 'twitter' },
      { platform: 'Facebook', url: '#', icon: 'facebook' },
    ],
  },
  availableSlots: [
    { date: new Date('2024-01-15'), time: '09:00', available: true },
    { date: new Date('2024-01-15'), time: '10:00', available: true },
    { date: new Date('2024-01-15'), time: '14:00', available: true },
    { date: new Date('2024-01-16'), time: '09:00', available: true },
    { date: new Date('2024-01-16'), time: '11:00', available: true },
  ],
}

export const aboutCards = [
  {
    id: '1',
    title: 'Patient-Centered Care',
    description: 'I believe in treating each patient as an individual with unique needs and concerns.',
    icon: '👥',
  },
  {
    id: '2',
    title: 'Latest Technology',
    description: 'Utilizing cutting-edge diagnostic and treatment technologies for optimal outcomes.',
    icon: '🔬',
  },
  {
    id: '3',
    title: 'Continuous Learning',
    description: 'Committed to staying updated with the latest medical research and advancements.',
    icon: '📚',
  },
]

export const navigationSections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'specializations', label: 'Specializations' },
  { id: 'experience', label: 'Experience' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'booking', label: 'Booking' },
]
