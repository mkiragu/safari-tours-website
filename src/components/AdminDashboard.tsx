import { useState } from 'react'
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
import { PencilSimple, Trash, Plus, SignOut, ArrowLeft, Star, Seal } from '@phosphor-icons/react'
import type { TourPackage, Testimonial } from '@/lib/types'

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [tours, setTours] = useKV<TourPackage[]>('tour-packages', [])
  const [testimonials, setTestimonials] = useKV<Testimonial[]>('testimonials', [])
  const [editingTour, setEditingTour] = useState<TourPackage | null>(null)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [isTourDialogOpen, setIsTourDialogOpen] = useState(false)
  const [isTestimonialDialogOpen, setIsTestimonialDialogOpen] = useState(false)
  
  const { register: registerTour, handleSubmit: handleSubmitTour, reset: resetTour, setValue: setValueTour, watch: watchTour, formState: { errors: errorsTour } } = useForm<TourPackage>()
  const { register: registerTestimonial, handleSubmit: handleSubmitTestimonial, reset: resetTestimonial, setValue: setValueTestimonial, watch: watchTestimonial, formState: { errors: errorsTestimonial } } = useForm<Testimonial>()

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
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="tours">Tour Packages</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
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
