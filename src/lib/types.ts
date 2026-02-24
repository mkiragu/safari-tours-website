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

export interface ContactForm {
  name: string
  email: string
  phone: string
  message: string
  tourInterest?: string
}
