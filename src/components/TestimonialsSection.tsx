import { useKV } from '@github/spark/hooks'
import { TestimonialCard } from '@/components/TestimonialCard'
import { Star } from '@phosphor-icons/react'
import type { Testimonial } from '@/lib/types'

export function TestimonialsSection() {
  const [testimonials] = useKV<Testimonial[]>('testimonials', [])

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  const averageRating = testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length
  const totalReviews = testimonials.length

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  weight="fill"
                  className="text-yellow-500"
                  size={24}
                />
              ))}
            </div>
            <span className="text-2xl font-bold text-foreground">
              {averageRating.toFixed(1)}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Guests Say
          </h2>
          <p className="text-xl text-muted-foreground">
            Trusted by {totalReviews}+ travelers who experienced unforgettable African safaris
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials
            .sort((a, b) => {
              if (a.verified && !b.verified) return -1
              if (!a.verified && b.verified) return 1
              return new Date(b.date).getTime() - new Date(a.date).getTime()
            })
            .map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
        </div>
      </div>
    </section>
  )
}
