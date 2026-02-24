import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Users, Star } from '@phosphor-icons/react'
import type { TourPackage } from '@/lib/types'

interface TourCardProps {
  tour: TourPackage
  onInquire: (tourTitle: string) => void
}

export function TourCard({ tour, onInquire }: TourCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="relative h-64 overflow-hidden bg-muted">
        {tour.imageUrl ? (
          <img
            src={tour.imageUrl}
            alt={tour.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
            <span className="text-4xl">🦁</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        {tour.featured && (
          <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
            <Star weight="fill" className="mr-1" />
            Featured
          </Badge>
        )}
      </div>
      
      <CardHeader>
        <CardTitle className="text-2xl">{tour.title}</CardTitle>
        <CardDescription className="line-clamp-2">{tour.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar weight="bold" className="text-primary" />
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users weight="bold" className="text-primary" />
            <span>{tour.groupSize}</span>
          </div>
        </div>
        
        {tour.highlights && tour.highlights.length > 0 && (
          <div className="pt-2">
            <p className="text-sm font-semibold mb-2">Highlights:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              {tour.highlights.slice(0, 3).map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="line-clamp-1">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex items-center justify-between pt-4 border-t">
        <div>
          <p className="text-sm text-muted-foreground">From</p>
          <p className="text-2xl font-bold text-primary">${tour.price}</p>
        </div>
        <Button
          className="bg-accent hover:bg-accent/90"
          onClick={() => onInquire(tour.title)}
        >
          Inquire Now
        </Button>
      </CardFooter>
    </Card>
  )
}
