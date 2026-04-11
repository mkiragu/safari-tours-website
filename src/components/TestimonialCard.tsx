import { Star, Seal } from '@phosphor-icons/react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import type { Testimonial } from '@/lib/types'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const initials = testimonial.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-12 w-12">
            {testimonial.avatar && <AvatarImage src={testimonial.avatar} alt={testimonial.name} />}
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground truncate">{testimonial.name}</h3>
              {testimonial.verified && (
                <Seal weight="fill" className="text-primary flex-shrink-0" size={18} />
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate">{testimonial.location}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              weight={i < testimonial.rating ? 'fill' : 'regular'}
              className={i < testimonial.rating ? 'text-yellow-500' : 'text-muted-foreground'}
              size={18}
            />
          ))}
        </div>

        <p className="text-foreground leading-relaxed flex-1 mb-4">
          "{testimonial.comment}"
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Badge variant="secondary" className="text-xs">
            {testimonial.tourTaken}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {new Date(testimonial.date).toLocaleDateString('en-US', { 
              month: 'short', 
              year: 'numeric' 
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
