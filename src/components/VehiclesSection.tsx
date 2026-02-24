import { VehicleCard } from './VehicleCard'
import type { Vehicle } from '@/lib/types'

const vehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Toyota Land Cruiser',
    type: '4x4 Safari Vehicle',
    capacity: 'Up to 7 passengers',
    description: 'The ultimate safari experience with our flagship Toyota Land Cruiser, equipped with pop-up roof for optimal game viewing.',
    features: [
      'Pop-up roof for photography',
      'Air conditioning',
      'Spacious interior with charging ports',
      'Experienced driver-guide',
      'First aid kit & fire extinguisher',
      'Communication radio'
    ],
    imageUrl: '',
    priceRange: 'Premium'
  },
  {
    id: '2',
    name: 'Safari Minivan',
    type: 'Extended Safari Van',
    capacity: 'Up to 9 passengers',
    description: 'Perfect for group safaris with extended roof hatches allowing everyone excellent wildlife viewing opportunities.',
    features: [
      'Extended pop-up roof',
      'Climate control system',
      'Individual window seats',
      'Extra luggage space',
      'Cooler box for refreshments',
      'Professional safari guide'
    ],
    imageUrl: '',
    priceRange: 'Standard'
  },
  {
    id: '3',
    name: 'Land Cruiser Prado',
    type: '4x4 Luxury SUV',
    capacity: 'Up to 5 passengers',
    description: 'Premium comfort for smaller groups or families, combining luxury with excellent off-road capabilities.',
    features: [
      'Leather interior',
      'Advanced 4WD system',
      'Premium sound system',
      'Climate zones',
      'Panoramic viewing',
      'VIP service'
    ],
    imageUrl: '',
    priceRange: 'Luxury'
  },
  {
    id: '4',
    name: 'Airport Transfer Sedan',
    type: 'Executive Car',
    capacity: 'Up to 4 passengers',
    description: 'Comfortable and reliable airport transfers with professional chauffeur service.',
    features: [
      'Meet & greet service',
      'Flight tracking',
      'Complimentary WiFi',
      'Bottled water',
      'Professional chauffeur',
      'Luggage assistance'
    ],
    imageUrl: '',
    priceRange: 'Economy'
  },
  {
    id: '5',
    name: 'Coaster Bus',
    type: 'Group Transport',
    capacity: 'Up to 25 passengers',
    description: 'Ideal for large groups, school trips, or corporate events with comfortable seating and ample space.',
    features: [
      'Reclining seats',
      'PA system',
      'Large luggage capacity',
      'Air conditioning',
      'Experienced driver',
      'Safety equipment'
    ],
    imageUrl: '',
    priceRange: 'Group Rate'
  },
  {
    id: '6',
    name: 'Safari Jeep',
    type: 'Classic Safari 4x4',
    capacity: 'Up to 6 passengers',
    description: 'The classic safari experience with open-air viewing and rugged reliability.',
    features: [
      'Open-top design',
      'High ground clearance',
      'Off-road tires',
      'Safety roll bars',
      'Binoculars provided',
      'Expert guide'
    ],
    imageUrl: '',
    priceRange: 'Standard'
  }
]

interface VehiclesSectionProps {
  onInquire: (vehicleName: string) => void
}

export function VehiclesSection({ onInquire }: VehiclesSectionProps) {
  return (
    <section id="vehicles" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Fleet
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Modern, well-maintained vehicles to ensure your comfort and safety throughout your journey
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleCard 
              key={vehicle.id} 
              vehicle={vehicle}
              onInquire={onInquire}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
