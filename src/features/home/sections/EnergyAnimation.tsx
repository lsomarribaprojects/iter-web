'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function EnergyAnimation() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    // Generate random energy particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric-500/10 via-energy-500/10 to-electric-500/10 animate-gradient" />

      {/* Energy particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute h-2 w-2 rounded-full bg-electric-400"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Energy waves */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M0 50 Q 25 30, 50 50 T 100 50"
          stroke="url(#wave-gradient)"
          strokeWidth="2"
          fill="none"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        />
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00D9FF" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#00D9FF" />
          </linearGradient>
        </defs>
      </svg>

      {/* Glowing orbs */}
      <motion.div
        className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-electric-500/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-energy-500/20 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </div>
  )
}
