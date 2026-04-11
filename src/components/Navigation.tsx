import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Lock } from '@phosphor-icons/react'
import { JimfireLogo } from '@/components/JimfireLogo'

interface NavigationProps {
  onLoginClick: () => void
  scrollToSection: (id: string) => void
}

export function Navigation({ onLoginClick, scrollToSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [logoUrl] = useKV<string>('company-logo', '')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => scrollToSection('home')}
            className="transition-transform hover:scale-105"
          >
            <JimfireLogo customLogoUrl={logoUrl} />
          </button>
          
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('tours')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Tours
            </button>
            <button
              onClick={() => scrollToSection('vehicles')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Vehicles
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLoginClick}
              className="text-muted-foreground hover:text-primary"
            >
              <Lock className="mr-2" />
              Admin
            </Button>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={onLoginClick}
            >
              <Lock />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
