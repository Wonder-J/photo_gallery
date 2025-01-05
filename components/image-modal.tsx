'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import Image from 'next/image'
import { ZoomIn, ZoomOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  alt: string
}

export function ImageModal({ isOpen, onClose, imageUrl, alt }: ImageModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0">
          <DialogTitle></DialogTitle>
          <div className="relative w-full h-full min-h-[50vh]">
            <Image
              src={imageUrl}
              alt={alt}
              fill
              className={cn("object-contain", isZoomed ? 'zoomed' : '')}
              priority
            />
          </div>
          <div className='flex justify-center items-center mb-4'>
            {
              isZoomed ? <ZoomOut className='h-5 w-5 cursor-pointer z-10' onClick={toggleZoom}></ZoomOut> : <ZoomIn className='h-5 w-5 cursor-pointer z-10' onClick={toggleZoom}></ZoomIn>
            }
          </div>
        </DialogContent>
      </Dialog>
      <style>
        {`
          .zoomed {
            transform: scale(2); /* 放大两倍 */
          }
        `}
      </style>
    </>
  )
}

