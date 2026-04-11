import { VehicleCard } from './VehicleCard'
import type { Vehicle } from '@/lib/types'

const vehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Executive Open Game Viewer 4X4 Safari Land Cruiser',
    type: 'Best for Photography',
    capacity: 'Up to 7 passengers',
    description: 'Our premium safari vehicle designed specifically for wildlife photography enthusiasts. Features an extended open roof and reinforced stability for the perfect shot.',
    features: [
      'Extended open roof for 360° photography',
      'Stabilized platform for camera equipment',
      'Individual window seats with swivel capability',
      'Premium suspension for smooth rides',
      'Charging stations for camera batteries',
      'Professional wildlife guide',
      'Communication radio system',
      'Cooler box & refreshments'
    ],
    imageUrl: '',
    priceRange: 'Executive'
  },
  {
    id: '2',
    name: 'Open Roof 4X4 Safari Land Cruiser',
    type: '4X4 Safari Vehicle',
    capacity: 'Up to 7 passengers',
    description: 'The classic safari experience with our flagship Land Cruiser, equipped with open pop-up roof for optimal game viewing and photography.',
    features: [
      'Pop-up open roof for game viewing',
      'Air conditioning',
      'Spacious interior with charging ports',
      'All-terrain 4X4 capability',
      'Experienced driver-guide',
      'First aid kit & safety equipment',
      'Communication radio',
      'Window seats for all passengers'
    ],
    imageUrl: '',
    priceRange: 'Premium'
  },
  {
    id: '3',
    name: 'Standard Open Roof Safari Van',
    type: 'Extended Safari Van',
    capacity: 'Up to 9 passengers',
    description: 'Perfect for group safaris with extended roof hatches allowing everyone excellent wildlife viewing opportunities at an affordable price.',
    features: [
      'Extended pop-up roof',
      'Climate control system',
      'Individual window seats',
      'Extra luggage space',
      'Cooler box for refreshments',
      'Professional safari guide',
      'USB charging ports',
      'Comfortable seating'
    ],
    imageUrl: '',
    priceRange: 'Standard'
  },
  {
    id: '4',
    name: 'Unique Open Roof Safari Mini-Van',
    type: 'Compact Safari Vehicle',
    capacity: 'Up to 6 passengers',
    description: 'Perfectly sized for small groups or families, offering an intimate safari experience with all the essential features for game viewing.',
    features: [
      'Open pop-up roof',
      'Compact & maneuverable',
      'Air conditioning',
      'Personal space for each guest',
      'Large windows for viewing',
      'Expert driver-guide',
      'Safety equipment',
      'Luggage storage'
    ],
    imageUrl: '',
    priceRange: 'Standard'
  },
  {
    id: '5',
    name: '4X4 Jeep Prado',
    type: '4X4 Luxury SUV',
    capacity: 'Up to 5 passengers',
    description: 'Premium comfort for smaller groups or families, combining luxury with excellent off-road capabilities for exclusive safari experiences.',
    features: [
      'Leather interior',
      'Advanced 4WD system',
      'Premium sound system',
      'Dual climate zones',
      'Panoramic viewing windows',
      'VIP guide service',
      'Privacy glass',
      'Luxury amenities'
    ],
    imageUrl: '',
    priceRange: 'Luxury'
  },
  {
    id: '6',
    name: 'Executive 6 Seater Alphard Transfer Van',
    type: 'Executive Transfer Vehicle',
    capacity: '6 passengers',
    description: 'Ultimate luxury for airport transfers and city transport. The Alphard offers executive comfort with premium amenities for discerning travelers.',
    features: [
      'Executive leather seating',
      'Captain seats with leg rests',
      'Climate control system',
      'Entertainment system',
      'Complimentary WiFi',
      'Meet & greet service',
      'Flight tracking',
      'Premium chauffeur service'
    ],
    imageUrl: '',
    priceRange: 'Executive'
  },
  {
    id: '7',
    name: 'Coaster',
    type: 'Group Transport',
    capacity: 'Up to 25 passengers',
    description: 'Ideal for large groups, school trips, corporate events, or team-building safaris with comfortable seating and ample luggage space.',
    features: [
      'Reclining seats',
      'PA system',
      'Large luggage capacity',
      'Air conditioning',
      'Experienced driver',
      'Safety equipment',
      'USB charging ports',
      'Spacious aisle'
    ],
    imageUrl: '',
    priceRange: 'Group Rate'
  },
  {
    id: '8',
    name: 'Sedans',
    type: 'Executive Car',
    capacity: 'Up to 4 passengers',
    description: 'Comfortable and reliable sedans for airport transfers, business meetings, or city tours with professional chauffeur service.',
    features: [
      'Meet & greet service',
      'Flight tracking',
      'Complimentary WiFi',
      'Bottled water',
      'Professional chauffeur',
      'Luggage assistance',
      'Air conditioning',
      'GPS navigation'
    ],
    imageUrl: '',
    priceRange: 'Economy'
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
