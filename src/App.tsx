import { useState, useRef } from 'react'
import { useKV } from '@github/spark/hooks'
import { Toaster } from 'sonner'
import { Navigation } from '@/components/Navigation'
import { HeroSection } from '@/components/HeroSection'
import { TourCard } from '@/components/TourCard'
import { AboutSection } from '@/components/AboutSection'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'
import { LoginDialog } from '@/components/LoginDialog'
import { AdminDashboard } from '@/components/AdminDashboard'
import type { TourPackage } from '@/lib/types'

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedTour, setSelectedTour] = useState('')
  const [tours] = useKV<TourPackage[]>('tour-packages', [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleInquire = (tourTitle: string) => {
    setSelectedTour(tourTitle)
    scrollToSection('contact')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  if (isLoggedIn) {
    return (
      <>
        <AdminDashboard onLogout={handleLogout} />
        <Toaster position="top-right" />
      </>
    )
  }

  return (
    <>
      <div className="min-h-screen">
        <Navigation 
          onLoginClick={() => setIsLoginOpen(true)}
          scrollToSection={scrollToSection}
        />
        
        <HeroSection scrollToSection={scrollToSection} />

        <section id="tours" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Our Safari Tours
              </h2>
              <p className="text-xl text-muted-foreground">
                Discover our curated selection of unforgettable safari experiences
              </p>
            </div>

            {!tours || tours.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">
                  No tours available at the moment. Please check back soon!
                </p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {tours.map((tour) => (
                  <TourCard 
                    key={tour.id} 
                    tour={tour} 
                    onInquire={handleInquire}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <AboutSection />

        <ContactForm prefilledTour={selectedTour} />

        <Footer />
        
        <LoginDialog
          open={isLoginOpen}
          onOpenChange={setIsLoginOpen}
          onLoginSuccess={() => setIsLoggedIn(true)}
        />
      </div>
      
      <Toaster position="top-right" />
    </>
  )
}

export default App