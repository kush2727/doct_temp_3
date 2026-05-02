export interface DoctorProfile {
  id: string;
  name: string;
  specialization: string;
  bio: string;
  profileImage: string;
  credentials: Credential[];
  experience: Experience[];
  specializations: Specialization[];
  testimonials: Testimonial[];
  contactInfo: ContactInfo;
  availableSlots: TimeSlot[];
}

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  date: Date;
  description?: string;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  type: 'experience' | 'certification';
}

export interface Specialization {
  id: string;
  name: string;
  description: string;
  icon: string;
  color?: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  patientPhoto: string;
  rating: number;
  text: string;
  date?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  socialMedia: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface TimeSlot {
  date: Date;
  time: string;
  available: boolean;
}

export interface AppointmentFormData {
  appointmentType: string;
  date: Date;
  time: string;
  patientName: string;
  email: string;
  phone: string;
  reason: string;
  medicalHistory?: string;
}

export interface AppointmentType {
  id: string;
  name: string;
  description: string;
  duration: number;
}

export interface NavigationLink {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export interface CTAButton {
  label: string;
  action: string;
  variant: 'primary' | 'secondary';
}
