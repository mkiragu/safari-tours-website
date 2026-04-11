import { useKV } from '@github/spark/hooks'
import { JimfireLogo } from '@/components/JimfireLogo'

export function Footer() {
  const [logoUrl] = useKV<string>('company-logo', '')

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <JimfireLogo variant="light" className="mb-4" customLogoUrl={logoUrl} />
            <p className="text-sm opacity-90">
              Creating unforgettable safari experiences across East Africa since our founding.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li><a href="#home" className="hover:text-accent transition-colors">Home</a></li>
              <li><a href="#tours" className="hover:text-accent transition-colors">Tours</a></li>
              <li><a href="#about" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>Email: info@jimfiresafarisandtransfers.com</li>
              <li>Phone: +254 724 00 22 99</li>
              <li>Location: Nairobi, Kenya</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-secondary-foreground/20 text-center text-sm opacity-75">
          <p>&copy; {new Date().getFullYear()} Jimfire Safaris & Transfers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
