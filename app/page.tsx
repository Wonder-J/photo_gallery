'use client'

import { useEffect, useState } from 'react'
import { ImageCard } from '@/components/image-card'
import { ImageModal } from '@/components/image-modal'
import { Header } from '@/components/header'
import { Skeleton } from '@/components/ui/skeleton'
import { useSession } from 'next-auth/react'

interface PexelsImage {
  id: number
  src: {
    original: string
    large2x: string
  }
  alt: string
  photographer: string
}

export default function Page() {
  const [images, setImages] = useState<PexelsImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<PexelsImage | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { data: session } = useSession()
  useEffect(() => {
    fetchImages()
    // 添加微博登录的命名空间
    document.documentElement.setAttribute('xmlns:wb', 'http://open.weibo.com/wb');
  }, [])

  async function fetchImages(searchQuery?: string) {
    setLoading(true)
    try {
      const url = searchQuery
        ? `/api/images?query=${encodeURIComponent(searchQuery)}`
        : '/api/images'

      const response = await fetch(url)
      const data = await response.json()

      if (!response.ok) throw new Error(data.error || 'Failed to fetch images')

      setImages(data.photos)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch images')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query: string) => {
    fetchImages(query)
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <main>
      <Header onSearch={handleSearch} session={session} />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3] w-full" />
            ))
            : images.map((image) => (
              <ImageCard
                key={image.id}
                src={image.src.large2x}
                alt={image.alt || `Photo by ${image.photographer}`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
        </div>

        {selectedImage && (
          <ImageModal
            isOpen={!!selectedImage}
            onClose={() => setSelectedImage(null)}
            imageUrl={selectedImage.src.original}
            alt={selectedImage.alt || `Photo by ${selectedImage.photographer}`}
          />
        )}
      </div>
      {/* 外部微博脚本加载 */}
      {/* <Script
        src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=b48c7424e64bdf552df8c866f48462b3"
        strategy="afterInteractive" // 在交互后加载脚本
        type="text/javascript"
        onLoad={() => console.log('Script Loaded')}
        onError={(e) => console.error('Script Load Error', e)}
      /> */}
    </main>
  )
}

