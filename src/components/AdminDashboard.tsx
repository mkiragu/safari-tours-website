import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { PencilSimple, Trash, Plus, SignOut, ArrowLeft, Star, Seal, UploadSimple, Gear } from '@phosphor-icons/react'
import type { TourPackage, Testimonial } from '@/lib/types'

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [tours, setTours] = useKV<TourPackage[]>('tour-packages', [])
  const [testimonials, setTestimonials] = useKV<Testimonial[]>('testimonials', [])
  const [logoUrl, setLogoUrl] = useKV<string>('company-logo', '')
  const [editingTour, setEditingTour] = useState<TourPackage | null>(null)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [isTourDialogOpen, setIsTourDialogOpen] = useState(false)
  const [isTestimonialDialogOpen, setIsTestimonialDialogOpen] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string>(logoUrl || '')
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const { register: registerTour, handleSubmit: handleSubmitTour, reset: resetTour, setValue: setValueTour, watch: watchTour, formState: { errors: errorsTour } } = useForm<TourPackage>()
  const { register: registerTestimonial, handleSubmit: handleSubmitTestimonial, reset: resetTestimonial, setValue: setValueTestimonial, watch: watchTestimonial, formState: { errors: errorsTestimonial } } = useForm<Testimonial>()

  useEffect(() => {
    setLogoPreview(logoUrl || '')
  }, [logoUrl])

  const handleAddTour = () => {
    resetTour({
      id: '',
      title: '',
      description: '',
      duration: '',
      price: 0,
      imageUrl: '',
      featured: false,
      groupSize: '',
      highlights: [],
    })
    setEditingTour(null)
    setIsTourDialogOpen(true)
  }

  const handleEditTour = (tour: TourPackage) => {
    setEditingTour(tour)
    resetTour(tour)
    setIsTourDialogOpen(true)
  }

  const handleDeleteTour = (id: string) => {
    if (confirm('Are you sure you want to delete this tour package?')) {
      setTours((currentTours) => (currentTours || []).filter(t => t.id !== id))
      toast.success('Tour package deleted')
    }
  }

  const onSubmitTour = (data: TourPackage) => {
    const highlights = typeof data.highlights === 'string'
      ? (data.highlights as string).split('\n').filter(h => h.trim())
      : data.highlights

    if (editingTour) {
      setTours((currentTours) =>
        (currentTours || []).map(t => t.id === editingTour.id
          ? { ...data, id: editingTour.id, highlights }
          : t
        )
      )
      toast.success('Tour package updated')
    } else {
      const newTour = {
        ...data,
        id: Date.now().toString(),
        highlights,
      }
      setTours((currentTours) => [...(currentTours || []), newTour])
      toast.success('Tour package created')
    }
    
    setIsTourDialogOpen(false)
    resetTour()
  }

  const handleAddTestimonial = () => {
    resetTestimonial({
      id: '',
      name: '',
      location: '',
      rating: 5,
      comment: '',
      tourTaken: '',
      date: new Date().toISOString().split('T')[0],
      verified: false,
    })
    setEditingTestimonial(null)
    setIsTestimonialDialogOpen(true)
  }

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    resetTestimonial({
      ...testimonial,
      date: testimonial.date.split('T')[0]
    })
    setIsTestimonialDialogOpen(true)
  }

  const handleDeleteTestimonial = (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      setTestimonials((currentTestimonials) => (currentTestimonials || []).filter(t => t.id !== id))
      toast.success('Testimonial deleted')
    }
  }

  const onSubmitTestimonial = (data: Testimonial) => {
    if (editingTestimonial) {
      setTestimonials((currentTestimonials) =>
        (currentTestimonials || []).map(t => t.id === editingTestimonial.id
          ? { ...data, id: editingTestimonial.id }
          : t
        )
      )
      toast.success('Testimonial updated')
    } else {
      const newTestimonial = {
        ...data,
        id: Date.now().toString(),
      }
      setTestimonials((currentTestimonials) => [...(currentTestimonials || []), newTestimonial])
      toast.success('Testimonial created')
    }
    
    setIsTestimonialDialogOpen(false)
    resetTestimonial()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      setLogoPreview(base64String)
      setLogoUrl(base64String)
      toast.success('Logo uploaded successfully')
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveLogo = () => {
    if (confirm('Are you sure you want to remove the custom logo?')) {
      setLogoUrl('')
      setLogoPreview('')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      toast.success('Logo removed')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your content</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => window.location.reload()}>
                <ArrowLeft className="mr-2" />
                Back to Site
              </Button>
              <Button variant="outline" onClick={onLogout}>
                <SignOut className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-8">
        <Tabs defaultValue="tours" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="tours">Tour Packages</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="tours">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Tour Packages ({tours?.length || 0})</h2>
              <Button onClick={handleAddTour} className="bg-accent hover:bg-accent/90">
                <Plus className="mr-2" />
                Add New Tour
              </Button>
            </div>

            {!tours || tours.length === 0 ? (
              <Alert>
                <AlertDescription>
                  No tour packages yet. Click "Add New Tour" to create your first package.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tours.map((tour) => (
                  <Card key={tour.id}>
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between">
                        <span className="line-clamp-1">{tour.title}</span>
                        {tour.featured && (
                          <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                            Featured
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {tour.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm"><strong>Duration:</strong> {tour.duration}</p>
                        <p className="text-sm"><strong>Group Size:</strong> {tour.groupSize}</p>
                        <p className="text-sm"><strong>Price:</strong> ${tour.price}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditTour(tour)}
                          className="flex-1"
                        >
                          <PencilSimple className="mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteTour(tour.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash className="mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="testimonials">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Testimonials ({testimonials?.length || 0})</h2>
              <Button onClick={handleAddTestimonial} className="bg-accent hover:bg-accent/90">
                <Plus className="mr-2" />
                Add Testimonial
              </Button>
            </div>

            {!testimonials || testimonials.length === 0 ? (
              <Alert>
                <AlertDescription>
                  No testimonials yet. Click "Add Testimonial" to create your first review.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id}>
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between gap-2">
                        <span className="line-clamp-1">{testimonial.name}</span>
                        {testimonial.verified && (
                          <Seal weight="fill" className="text-primary flex-shrink-0" size={20} />
                        )}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            weight={i < testimonial.rating ? 'fill' : 'regular'}
                            className={i < testimonial.rating ? 'text-yellow-500' : 'text-muted-foreground'}
                            size={16}
                          />
                        ))}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3 line-clamp-3">"{testimonial.comment}"</p>
                      <div className="space-y-1 mb-4 text-xs text-muted-foreground">
                        <p><strong>Location:</strong> {testimonial.location}</p>
                        <p><strong>Tour:</strong> {testimonial.tourTaken}</p>
                        <p><strong>Date:</strong> {new Date(testimonial.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditTestimonial(testimonial)}
                          className="flex-1"
                        >
                          <PencilSimple className="mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteTestimonial(testimonial.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash className="mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6">Company Settings</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gear />
                    Company Logo
                  </CardTitle>
                  <CardDescription>
                    Upload a custom logo to replace the default Jimfire Safaris logo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="logo-upload" className="mb-3 block">
                      Current Logo
                    </Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 bg-muted/20">
                      {logoPreview || logoUrl ? (
                        <div className="flex flex-col items-center gap-4">
                          <img
                            src={logoPreview || logoUrl}
                            alt="Company Logo"
                            className="max-w-full max-h-48 object-contain"
                          />
                          <p className="text-sm text-muted-foreground">
                            Custom logo uploaded
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-4">
                          <div className="bg-card p-4 rounded-lg">
                            <svg
                              width="80"
                              height="80"
                              viewBox="0 0 40 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="20" cy="20" r="19" fill="#6B7FD7" fillOpacity="0.15" />
                              <path
                                d="M20 8C18.5 8 17.5 9 17 10.5C16.8 11 16.5 12 16.5 13C16.5 14 16.8 15 17.5 16C18 16.8 19 17.5 20 18C21 17.5 22 16.8 22.5 16C23.2 15 23.5 14 23.5 13C23.5 12 23.2 11 23 10.5C22.5 9 21.5 8 20 8Z"
                                fill="#6B7FD7"
                              />
                              <path
                                d="M13 14C12 14.5 11.5 15.5 11.5 16.5C11.5 17.5 12 18.5 13 19L15 20.5C16 21 17 21 18 20.5C18.5 20.2 19 19.5 19 18.5C19 17.5 18.5 16.5 18 16L16 14.5C15 14 14 14 13 14Z"
                                fill="#6B7FD7"
                                fillOpacity="0.8"
                              />
                              <path
                                d="M27 14C26 14 25 14 24 14.5L22 16C21.5 16.5 21 17.5 21 18.5C21 19.5 21.5 20.2 22 20.5C23 21 24 21 25 20.5L27 19C28 18.5 28.5 17.5 28.5 16.5C28.5 15.5 28 14.5 27 14Z"
                                fill="#6B7FD7"
                                fillOpacity="0.8"
                              />
                              <ellipse cx="20" cy="24" rx="10" ry="3" fill="#6B7FD7" fillOpacity="0.2" />
                              <path
                                d="M12 22C11 22.5 10 23.5 10 25C10 26.5 11 28 12 29L14 30.5C15.5 31.5 17 32 18.5 31.5C19.5 31.2 20.5 30 20.5 28.5C20.5 27 20 25.5 19 24.5L17 23C15.5 22 13.5 21.5 12 22Z"
                                fill="#6B7FD7"
                              />
                              <path
                                d="M28 22C26.5 21.5 24.5 22 23 23L21 24.5C20 25.5 19.5 27 19.5 28.5C19.5 30 20.5 31.2 21.5 31.5C23 32 24.5 31.5 26 30.5L28 29C29 28 30 26.5 30 25C30 23.5 29 22.5 28 22Z"
                                fill="#6B7FD7"
                              />
                            </svg>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Default Jimfire Safaris logo
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="logo-upload" className="cursor-pointer">
                        <input
                          id="logo-upload"
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <UploadSimple className="mr-2" />
                          Choose Logo Image
                        </Button>
                      </Label>
                      <p className="text-xs text-muted-foreground mt-2">
                        Supported formats: JPG, PNG, SVG, GIF (Max 5MB)
                      </p>
                    </div>

                    {(logoPreview || logoUrl) && (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full text-destructive hover:text-destructive"
                        onClick={handleRemoveLogo}
                      >
                        <Trash className="mr-2" />
                        Remove Custom Logo
                      </Button>
                    )}
                  </div>

                  <Alert>
                    <AlertDescription>
                      The logo will be displayed in the navigation bar and footer. For best results, use a transparent PNG with a width of at least 200px.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={isTourDialogOpen} onOpenChange={setIsTourDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTour ? 'Edit Tour Package' : 'Add New Tour Package'}
              </DialogTitle>
              <DialogDescription>
                Fill in the details for the tour package
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmitTour(onSubmitTour)} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  {...registerTour('title', { required: 'Title is required' })}
                  placeholder="Masai Mara Safari Adventure"
                />
                {errorsTour.title && (
                  <p className="text-sm text-destructive mt-1">{errorsTour.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  {...registerTour('description', { required: 'Description is required' })}
                  placeholder="Experience the wonder of..."
                  rows={3}
                />
                {errorsTour.description && (
                  <p className="text-sm text-destructive mt-1">{errorsTour.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration *</Label>
                  <Input
                    id="duration"
                    {...registerTour('duration', { required: 'Duration is required' })}
                    placeholder="3 Days, 2 Nights"
                  />
                  {errorsTour.duration && (
                    <p className="text-sm text-destructive mt-1">{errorsTour.duration.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="groupSize">Group Size *</Label>
                  <Input
                    id="groupSize"
                    {...registerTour('groupSize', { required: 'Group size is required' })}
                    placeholder="2-6 people"
                  />
                  {errorsTour.groupSize && (
                    <p className="text-sm text-destructive mt-1">{errorsTour.groupSize.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="price">Price (USD) *</Label>
                <Input
                  id="price"
                  type="number"
                  {...registerTour('price', {
                    required: 'Price is required',
                    valueAsNumber: true,
                    min: { value: 0, message: 'Price must be positive' },
                  })}
                  placeholder="1500"
                />
                {errorsTour.price && (
                  <p className="text-sm text-destructive mt-1">{errorsTour.price.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  {...registerTour('imageUrl')}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <Label htmlFor="highlights">Highlights (one per line)</Label>
                <Textarea
                  id="highlights"
                  {...registerTour('highlights')}
                  placeholder="Big Five game viewing&#10;Professional safari guide&#10;Luxury tented accommodation"
                  rows={4}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="featured">Featured Tour</Label>
                <Switch
                  id="featured"
                  checked={watchTour('featured')}
                  onCheckedChange={(checked) => setValueTour('featured', checked)}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsTourDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-accent hover:bg-accent/90">
                  {editingTour ? 'Update Tour' : 'Create Tour'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={isTestimonialDialogOpen} onOpenChange={setIsTestimonialDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </DialogTitle>
              <DialogDescription>
                Fill in the details for the customer testimonial
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmitTestimonial(onSubmitTestimonial)} className="space-y-4">
              <div>
                <Label htmlFor="name">Customer Name *</Label>
                <Input
                  id="name"
                  {...registerTestimonial('name', { required: 'Name is required' })}
                  placeholder="John Smith"
                />
                {errorsTestimonial.name && (
                  <p className="text-sm text-destructive mt-1">{errorsTestimonial.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  {...registerTestimonial('location', { required: 'Location is required' })}
                  placeholder="New York, USA"
                />
                {errorsTestimonial.location && (
                  <p className="text-sm text-destructive mt-1">{errorsTestimonial.location.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="rating">Rating (1-5) *</Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  {...registerTestimonial('rating', {
                    required: 'Rating is required',
                    valueAsNumber: true,
                    min: { value: 1, message: 'Minimum rating is 1' },
                    max: { value: 5, message: 'Maximum rating is 5' },
                  })}
                  placeholder="5"
                />
                {errorsTestimonial.rating && (
                  <p className="text-sm text-destructive mt-1">{errorsTestimonial.rating.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="comment">Comment *</Label>
                <Textarea
                  id="comment"
                  {...registerTestimonial('comment', { required: 'Comment is required' })}
                  placeholder="This was an amazing safari experience..."
                  rows={4}
                />
                {errorsTestimonial.comment && (
                  <p className="text-sm text-destructive mt-1">{errorsTestimonial.comment.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="tourTaken">Tour Taken *</Label>
                <Input
                  id="tourTaken"
                  {...registerTestimonial('tourTaken', { required: 'Tour taken is required' })}
                  placeholder="Masai Mara Safari"
                />
                {errorsTestimonial.tourTaken && (
                  <p className="text-sm text-destructive mt-1">{errorsTestimonial.tourTaken.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  {...registerTestimonial('date', { required: 'Date is required' })}
                />
                {errorsTestimonial.date && (
                  <p className="text-sm text-destructive mt-1">{errorsTestimonial.date.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="avatar">Avatar URL (optional)</Label>
                <Input
                  id="avatar"
                  {...registerTestimonial('avatar')}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="verified">Verified Customer</Label>
                <Switch
                  id="verified"
                  checked={watchTestimonial('verified')}
                  onCheckedChange={(checked) => setValueTestimonial('verified', checked)}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsTestimonialDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-accent hover:bg-accent/90">
                  {editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
