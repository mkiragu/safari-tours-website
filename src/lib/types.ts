export interface TourPackage {
  id: string
  title: string
  description: string
  duration: string
  price: number
  imageUrl: string
  featured: boolean
  groupSize: string
  highlights: string[]
}

export interface Vehicle {
  id: string
  name: string
  type: string
  capacity: string
  description: string
  features: string[]
  imageUrl: string
  priceRange: string
}

export interface ContactForm {
  name: string
  email: string
  phone: string
  message: string
  tourInterest?: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  comment: string
  tourTaken: string
  date: string
  avatar?: string
  verified: boolean
}
