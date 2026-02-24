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
import { toast } from 'sonner'
import { PencilSimple, Trash, Plus, SignOut, ArrowLeft } from '@phosphor-icons/react'
import type { TourPackage } from '@/lib/types'

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [tours, setTours] = useKV<TourPackage[]>('tour-packages', [])
  const [editingTour, setEditingTour] = useState<TourPackage | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<TourPackage>()

  const highlightsValue = watch('highlights') || []

  const handleAddTour = () => {
    reset({
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
    setIsDialogOpen(true)
  }

  const handleEditTour = (tour: TourPackage) => {
    setEditingTour(tour)
    reset(tour)
    setIsDialogOpen(true)
  }

  const handleDeleteTour = (id: string) => {
    if (confirm('Are you sure you want to delete this tour package?')) {
      setTours((currentTours) => (currentTours || []).filter(t => t.id !== id))
      toast.success('Tour package deleted')
    }
  }

  const onSubmit = (data: TourPackage) => {
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
    
    setIsDialogOpen(false)
    reset()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your tour packages</p>
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

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTour ? 'Edit Tour Package' : 'Add New Tour Package'}
              </DialogTitle>
              <DialogDescription>
                Fill in the details for the tour package
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  {...register('title', { required: 'Title is required' })}
                  placeholder="Masai Mara Safari Adventure"
                />
                {errors.title && (
                  <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  {...register('description', { required: 'Description is required' })}
                  placeholder="Experience the wonder of..."
                  rows={3}
                />
                {errors.description && (
                  <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration *</Label>
                  <Input
                    id="duration"
                    {...register('duration', { required: 'Duration is required' })}
                    placeholder="3 Days, 2 Nights"
                  />
                  {errors.duration && (
                    <p className="text-sm text-destructive mt-1">{errors.duration.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="groupSize">Group Size *</Label>
                  <Input
                    id="groupSize"
                    {...register('groupSize', { required: 'Group size is required' })}
                    placeholder="2-6 people"
                  />
                  {errors.groupSize && (
                    <p className="text-sm text-destructive mt-1">{errors.groupSize.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="price">Price (USD) *</Label>
                <Input
                  id="price"
                  type="number"
                  {...register('price', {
                    required: 'Price is required',
                    valueAsNumber: true,
                    min: { value: 0, message: 'Price must be positive' },
                  })}
                  placeholder="1500"
                />
                {errors.price && (
                  <p className="text-sm text-destructive mt-1">{errors.price.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  {...register('imageUrl')}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <Label htmlFor="highlights">Highlights (one per line)</Label>
                <Textarea
                  id="highlights"
                  {...register('highlights')}
                  placeholder="Big Five game viewing&#10;Professional safari guide&#10;Luxury tented accommodation"
                  rows={4}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="featured">Featured Tour</Label>
                <Switch
                  id="featured"
                  checked={watch('featured')}
                  onCheckedChange={(checked) => setValue('featured', checked)}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
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
      </div>
    </div>
  )
}
