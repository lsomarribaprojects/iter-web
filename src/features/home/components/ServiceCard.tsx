'use client'

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { Sun, Gauge, GraduationCap, ArrowRight } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

const icons = {
  sun: Sun,
  gauge: Gauge,
  'graduation-cap': GraduationCap,
}

interface ServiceCardProps {
  title: string
  description: string
  icon: keyof typeof icons
  href: string
  color: 'orange' | 'green' | 'blue'
}

export function ServiceCard({
  title,
  description,
  icon,
  href,
  color,
}: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const Icon = icons[icon]

  const colorClasses = {
    orange: 'from-electric-500/20 to-electric-600/20 group-hover:from-electric-500/30 group-hover:to-electric-600/30',
    green: 'from-green-500/20 to-green-600/20 group-hover:from-green-500/30 group-hover:to-green-600/30',
    blue: 'from-blue-500/20 to-blue-600/20 group-hover:from-blue-500/30 group-hover:to-blue-600/30',
  }

  const iconColorClasses = {
    orange: 'text-electric-500',
    green: 'text-green-500',
    blue: 'text-blue-500',
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateXValue = (y - centerY) / 10
    const rotateYValue = (centerX - x) / 10
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        className="group relative h-full overflow-hidden rounded-2xl bg-slate-800/50 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-slate-800/70"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100',
            colorClasses[color]
          )}
        />

        <div className="relative z-10">
          <div className="mb-6">
            <Icon className={cn('h-12 w-12', iconColorClasses[color])} />
          </div>

          <h3 className="mb-4 text-2xl font-bold text-white">{title}</h3>
          <p className="mb-6 text-white/70">{description}</p>

          <div className="flex items-center text-electric-500 transition-transform group-hover:translate-x-2">
            <span className="mr-2 text-sm font-semibold">Más información</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
