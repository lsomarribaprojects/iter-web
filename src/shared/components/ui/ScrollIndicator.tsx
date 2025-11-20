'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function ScrollIndicator() {
  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <motion.button
      onClick={handleClick}
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center text-white/80 hover:text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      aria-label="Scroll down"
    >
      <span className="mb-2 text-sm font-medium uppercase tracking-wider">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </motion.button>
  )
}
