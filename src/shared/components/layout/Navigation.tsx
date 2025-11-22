'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { MagneticButton } from '../ui/MagneticButton'
import { Logo } from '../ui/Logo'
import { LanguageSwitch } from '../ui/LanguageSwitch'
import { ThemeToggle } from '../ui/ThemeToggle'
import { cn } from '@/shared/utils/cn'
import { useLanguage } from '@/shared/i18n/LanguageContext'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const pathname = usePathname()
  const { t } = useLanguage()

  const navigation = [
    { name: t.nav.home, href: '/' },
    {
      name: t.nav.services,
      href: '/servicios',
      submenu: [
        { name: t.nav.solarConsulting, href: '/servicios/consultoria-solar' },
        { name: t.nav.energyManagement, href: '/servicios/gestion-energetica' },
        { name: t.nav.training, href: '/servicios/formacion' },
      ],
    },
    { name: t.nav.about, href: '/nosotros' },
    { name: t.nav.blog, href: '/blog' },
    { name: t.nav.contact, href: '/contacto' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setActiveSubmenu(null)
  }, [pathname])

  return (
    <motion.nav
      className={cn(
        'fixed left-0 right-0 top-0 z-40 transition-all duration-300',
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg'
          : 'bg-slate-900/60 backdrop-blur-sm'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-electric-500/20 to-energy-500/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:drop-shadow-[0_0_25px_rgba(59,130,246,0.8)] transition-all duration-300">
              <Logo className="h-14 w-auto brightness-0 invert" />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            <ThemeToggle />
            <LanguageSwitch />
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() =>
                  item.submenu && setActiveSubmenu(item.name)
                }
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                {item.submenu ? (
                  <>
                    <button className="flex items-center space-x-1 px-4 py-2 text-white/90 transition-colors hover:text-white">
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <AnimatePresence>
                      {activeSubmenu === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 top-full mt-2 w-64 rounded-lg bg-slate-800 p-2 shadow-xl"
                        >
                          {item.submenu.map((subitem) => (
                            <Link
                              key={subitem.name}
                              href={subitem.href}
                              className="block rounded-md px-4 py-2 text-white/90 transition-colors hover:bg-slate-700 hover:text-white"
                            >
                              {subitem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'px-4 py-2 text-white/90 transition-colors hover:text-white',
                      pathname === item.href && 'text-electric-500'
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-slate-900/98 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-6 space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() =>
                          setActiveSubmenu(
                            activeSubmenu === item.name ? null : item.name
                          )
                        }
                        className="flex w-full items-center justify-between py-2 text-white/90"
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform',
                            activeSubmenu === item.name && 'rotate-180'
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {activeSubmenu === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden pl-4 space-y-1"
                          >
                            {item.submenu.map((subitem) => (
                              <Link
                                key={subitem.name}
                                href={subitem.href}
                                className="block py-2 text-white/70 hover:text-white"
                              >
                                {subitem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'block py-2 text-white/90 hover:text-white',
                        pathname === item.href && 'text-electric-500'
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
