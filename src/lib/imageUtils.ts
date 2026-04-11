export interface ResizeOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
}

export async function resizeImage(
  file: File,
  options: ResizeOptions = {}
): Promise<string> {
  const { maxWidth = 1200, maxHeight = 800, quality = 0.85 } = options

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const img = new Image()
      
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          reject(new Error('Failed to get canvas context'))
          return
        }

        let width = img.width
        let height = img.height

        if (width > maxWidth || height > maxHeight) {
          const aspectRatio = width / height

          if (width > height) {
            width = maxWidth
            height = width / aspectRatio
          } else {
            height = maxHeight
            width = height * aspectRatio
          }

          if (height > maxHeight) {
            height = maxHeight
            width = height * aspectRatio
          }

          if (width > maxWidth) {
            width = maxWidth
            height = width / aspectRatio
          }
        }

        canvas.width = width
        canvas.height = height

        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, width, height)

        ctx.drawImage(img, 0, 0, width, height)

        const resizedDataUrl = canvas.toDataURL('image/jpeg', quality)
        resolve(resizedDataUrl)
      }

      img.onerror = () => {
        reject(new Error('Failed to load image'))
      }

      img.src = e.target?.result as string
    }

    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }

    reader.readAsDataURL(file)
  })
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'Please select an image file' }
  }

  const maxSize = 10 * 1024 * 1024
  if (file.size > maxSize) {
    return { valid: false, error: 'Image size must be less than 10MB' }
  }

  return { valid: true }
}
