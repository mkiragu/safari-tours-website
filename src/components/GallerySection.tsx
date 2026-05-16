import { useState } from 'react'
import { X, Camera, MapPin } from '@phosphor-icons/react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useKV } from '@github/spark/hooks'
import type { GalleryImage } from '@/lib/types'

const defaultGalleryImages: GalleryImage[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
    title: 'Majestic Lion',
    category: 'wildlife',
    location: 'Maasai Mara',
    description: 'King of the savanna in his natural habitat'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80',
    title: 'African Elephant',
    category: 'wildlife',
    location: 'Amboseli National Park',
    description: 'Gentle giant against Mount Kilimanjaro backdrop'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1535338454770-6c4f7d7c0c1e?w=800&q=80',
    title: 'Sunset Safari',
    category: 'landscape',
    location: 'Maasai Mara',
    description: 'Golden hour over the endless plains'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
    title: 'Giraffe Family',
    category: 'wildlife',
    location: 'Lake Nakuru',
    description: 'Graceful giraffes feeding on acacia trees'
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?w=800&q=80',
    title: 'Cheetah Sprint',
    category: 'wildlife',
    location: 'Maasai Mara',
    description: 'The fastest land animal in action'
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80',
    title: 'Mount Kenya',
    category: 'landscape',
    location: 'Mount Kenya National Park',
    description: 'Breathtaking mountain vistas'
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1551522435-a13afa10f103?w=800&q=80',
    title: 'Zebra Crossing',
    category: 'wildlife',
    location: 'Amboseli',
    description: 'Zebras migrating across the plains'
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800&q=80',
    title: 'African Sunset',
    category: 'landscape',
    location: 'Tsavo West',
    description: 'Spectacular African sunset colors'
  },
  {
    id: '9',
    url: 'https://images.unsplash.com/photo-1550808572-452bb5f84f4d?w=800&q=80',
    title: 'Leopard Watch',
    category: 'wildlife',
    location: 'Samburu',
    description: 'Elusive leopard in the trees'
  },
  {
    id: '10',
    url: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80',
    title: 'Flamingo Lake',
    category: 'landscape',
    location: 'Lake Nakuru',
    description: 'Pink flamingos covering the lake'
  },
  {
    id: '11',
    url: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800&q=80',
    title: 'Buffalo Herd',
    category: 'wildlife',
    location: 'Maasai Mara',
    description: 'Massive buffalo herd on the move'
  },
  {
    id: '12',
    url: 'https://images.unsplash.com/photo-1602977901778-ea965a5e53b5?w=800&q=80',
    title: 'Savanna Dawn',
    category: 'landscape',
    location: 'Tsavo East',
    description: 'First light over the African savanna'
  }
]

export function GallerySection() {
  const [galleryImages] = useKV<GalleryImage[]>('gallery-images', defaultGalleryImages)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [filter, setFilter] = useState<'all' | 'wildlife' | 'landscape' | 'culture' | 'adventure'>('all')

  const filteredImages = filter === 'all' 
    ? (galleryImages || [])
    : (galleryImages || []).filter(img => img.category === filter)

  const categories = [
    { value: 'all', label: 'All Photos', icon: Camera },
    { value: 'wildlife', label: 'Wildlife', icon: Camera },
    { value: 'landscape', label: 'Landscapes', icon: MapPin },
    { value: 'culture', label: 'Culture', icon: Camera },
    { value: 'adventure', label: 'Adventure', icon: Camera }
  ] as const

  return (
    <section id="gallery" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Safari Gallery
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Witness the beauty of Kenya's wildlife and landscapes
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(({ value, label, icon: Icon }) => (
              <Button
                key={value}
                variant={filter === value ? 'default' : 'outline'}
                onClick={() => setFilter(value)}
                className="gap-2"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer bg-muted"
              onClick={() => setSelectedImage(image)}
              style={{
                animationDelay: `${index * 50}ms`
              }}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                  {image.location && (
                    <div className="flex items-center gap-1 text-sm text-white/90">
                      <MapPin className="w-4 h-4" weight="fill" />
                      {image.location}
                    </div>
                  )}
                </div>
              </div>

              <Badge 
                className="absolute top-3 right-3 capitalize opacity-0 group-hover:opacity-100 transition-opacity"
                variant="secondary"
              >
                {image.category}
              </Badge>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <Camera className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">
              No photos in this category yet
            </p>
          </div>
        )}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden">
          {selectedImage && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-5 h-5" />
              </Button>

              <div className="bg-black">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              </div>

              <div className="p-6 bg-card">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-2xl font-bold text-foreground">
                    {selectedImage.title}
                  </h3>
                  <Badge variant="secondary" className="capitalize">
                    {selectedImage.category}
                  </Badge>
                </div>

                {selectedImage.location && (
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <MapPin className="w-5 h-5" weight="fill" />
                    <span className="text-lg">{selectedImage.location}</span>
                  </div>
                )}

                {selectedImage.description && (
                  <p className="text-muted-foreground">
                    {selectedImage.description}
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
