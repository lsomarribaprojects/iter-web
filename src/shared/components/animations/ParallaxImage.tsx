'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/shared/utils/cn'

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  speed?: number
  overlay?: boolean
  overlayClassName?: string
}

export function ParallaxImage({
  src,
  alt,
  className,
  speed = 0.5,
  overlay = true,
  overlayClassName,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        style={{ y }}
        className="absolute inset-0 h-[120%] w-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </motion.div>
      {overlay && (
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent',
            overlayClassName
          )}
        />
      )}
    </div>
  )
}
