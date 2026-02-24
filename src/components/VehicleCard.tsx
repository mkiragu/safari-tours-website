import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, CheckCircle } from '@phosphor-icons/react'
import type { Vehicle } from '@/lib/types'

interface VehicleCardProps {
  vehicle: Vehicle
  onInquire: (vehicleName: string) => void
}

export function VehicleCard({ vehicle, onInquire }: VehicleCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative h-56 overflow-hidden bg-muted">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center"
        >
          <div className="text-center p-6">
            <div className="text-6xl mb-2">🚙</div>
            <p className="text-sm text-muted-foreground">{vehicle.type}</p>
          </div>
        </div>
      </div>
      
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-2xl">{vehicle.name}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-2">
              <Users size={16} weight="bold" />
              <span>{vehicle.capacity}</span>
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-accent text-accent-foreground">
            {vehicle.priceRange}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground mb-4">{vehicle.description}</p>
        
        <div className="space-y-2">
          <p className="font-semibold text-sm">Features:</p>
          <ul className="space-y-1">
            {vehicle.features.slice(0, 4).map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle size={16} weight="fill" className="text-accent mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          className="w-full bg-primary hover:bg-primary/90"
          onClick={() => onInquire(vehicle.name)}
        >
          Request Quote
        </Button>
      </CardFooter>
    </Card>
  )
}
