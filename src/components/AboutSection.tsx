export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About Jimfire Safaris
            </h2>
            <p className="text-xl text-muted-foreground">
              Your trusted partner for unforgettable African adventures
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                At Jimfire Safaris & Transfers, we specialize in creating authentic safari experiences 
                that showcase the breathtaking beauty and wildlife of Kenya and East Africa. With years 
                of expertise and a passion for conservation, we bring you closer to nature while ensuring 
                comfort, safety, and unforgettable memories.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our experienced guides know the land intimately, ensuring you witness the majesty of 
                African wildlife in their natural habitats while respecting and preserving these precious ecosystems.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Our Services</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-accent text-2xl">🦁</span>
                  <div>
                    <p className="font-semibold">Safari Tours</p>
                    <p className="text-muted-foreground text-sm">
                      Expertly guided wildlife safaris to Kenya's premier national parks and reserves
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent text-2xl">🚗</span>
                  <div>
                    <p className="font-semibold">Airport Transfers</p>
                    <p className="text-muted-foreground text-sm">
                      Reliable and comfortable transportation to and from airports
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent text-2xl">🏕️</span>
                  <div>
                    <p className="font-semibold">Custom Packages</p>
                    <p className="text-muted-foreground text-sm">
                      Tailored itineraries designed to match your preferences and budget
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent text-2xl">📸</span>
                  <div>
                    <p className="font-semibold">Photography Tours</p>
                    <p className="text-muted-foreground text-sm">
                      Specialized safari experiences for wildlife photography enthusiasts
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
