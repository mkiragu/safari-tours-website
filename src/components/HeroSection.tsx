import { Button } from '@/components/ui/button'

interface HeroSectionProps {
  scrollToSection: (id: string) => void
}

export function HeroSection({ scrollToSection }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-accent/10 to-muted"
      style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, oklch(0.68 0.19 45 / 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, oklch(0.55 0.15 50 / 0.15) 0%, transparent 50%)',
      }}
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,oklch(0.55_0.15_50_/_0.03)_20px,oklch(0.55_0.15_50_/_0.03)_40px)]" />
      
      <div className="relative z-10 text-center px-6 md:px-12 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
          Discover the Magic of Kenya
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-body">
          Unforgettable safari experiences and seamless transfers across East Africa
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg"
            onClick={() => scrollToSection('tours')}
          >
            Explore Tours
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg"
            onClick={() => scrollToSection('contact')}
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  )
}
