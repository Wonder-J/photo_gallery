'use client'

import Image from 'next/image'
import { Card } from '@/components/ui/card'

interface ImageCardProps {
  src: string
  alt: string
  onClick: () => void
}

export function ImageCard({ src, alt, onClick }: ImageCardProps) {
  return (
    <Card
      className="group relative aspect-[4/3] cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </Card>
  )
}

