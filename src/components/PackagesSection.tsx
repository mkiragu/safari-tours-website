import { Card, CardContent } from '@/components/ui/card'
import { MapTrifold, Jeep, Camera, Mountains, Tent, Binoculars } from '@phosphor-icons/react'

const tourTypes = [
  {
    icon: MapTrifold,
    title: 'Safari Tours',
    description: 'Expertly guided wildlife safaris to Kenya\'s premier national parks including Maasai Mara, Amboseli, Tsavo, and Lake Nakuru.'
  },
  {
    icon: Jeep,
    title: 'Game Drives',
    description: 'Experience thrilling game drives in comfortable 4x4 vehicles with pop-up roofs for optimal wildlife viewing and photography.'
  },
  {
    icon: Camera,
    title: 'Photography Safaris',
    description: 'Specialized tours designed for photography enthusiasts with perfect timing for golden hour shots and wildlife action.'
  },
  {
    icon: Mountains,
    title: 'Mountain Expeditions',
    description: 'Conquer Mount Kenya and explore the breathtaking highlands with experienced guides and porters.'
  },
  {
    icon: Tent,
    title: 'Camping Adventures',
    description: 'Authentic bush camping experiences that bring you closer to nature while maintaining safety and comfort.'
  },
  {
    icon: Binoculars,
    title: 'Bird Watching Tours',
    description: 'Kenya is home to over 1,000 bird species. Join our specialized birding safaris in prime locations.'
  }
]

export function PackagesSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Safari Experiences
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From classic game drives to specialized photography safaris, we offer diverse experiences tailored to your adventure preferences
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tourTypes.map((tourType, index) => {
            const Icon = tourType.icon
            return (
              <Card key={index} className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg group">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon size={40} weight="duotone" className="text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{tourType.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {tourType.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
