'use client'

import Link from 'next/link'
import { Linkedin, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react'
import { SITE_CONFIG } from '@/shared/constants/site'
import { useLanguage } from '@/shared/i18n/LanguageContext'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useLanguage()

  const navigation = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.services, href: '/servicios' },
    { name: t.nav.about, href: '/nosotros' },
    { name: t.nav.blog, href: '/blog' },
    { name: t.nav.contact, href: '/contacto' },
  ]

  const services = [
    {
      name: t.services.energyManagement.title,
      slug: 'gestion-energetica',
    },
    {
      name: t.services.energyAudit.title,
      slug: 'consultoria-solar',
    },
    {
      name: t.services.training.title,
      slug: 'formacion',
    },
  ]

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-electric-500">ITER</h3>
            <p className="text-white/70 mb-6">
              {t.footer.description}
            </p>
            <div className="flex space-x-4">
              <a
                href={SITE_CONFIG.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-electric-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <button
                disabled
                className="text-white/30 cursor-not-allowed"
                aria-label="Facebook (Próximamente)"
                title="Próximamente"
              >
                <Facebook className="h-5 w-5" />
              </button>
              <button
                disabled
                className="text-white/30 cursor-not-allowed"
                aria-label="Instagram (Próximamente)"
                title="Próximamente"
              >
                <Instagram className="h-5 w-5" />
              </button>
              <button
                disabled
                className="text-white/30 cursor-not-allowed"
                aria-label="YouTube (Próximamente)"
                title="Próximamente"
              >
                <Youtube className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-electric-500 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.services}</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="text-white/70 hover:text-electric-500 transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.contact}</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-electric-500 flex-shrink-0 mt-0.5" />
                <span className="text-white/70">
                  {SITE_CONFIG.address.city}, {SITE_CONFIG.address.country}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-electric-500 flex-shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.links.phone}`}
                  className="text-white/70 hover:text-electric-500 transition-colors"
                >
                  {SITE_CONFIG.links.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-electric-500 flex-shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.links.email}`}
                  className="text-white/70 hover:text-electric-500 transition-colors"
                >
                  {SITE_CONFIG.links.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/50 text-sm">
              © {currentYear} ITER. {t.footer.copyright}
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacidad"
                className="text-white/50 hover:text-electric-500 transition-colors"
              >
                {t.footer.privacy}
              </Link>
              <Link
                href="/terminos"
                className="text-white/50 hover:text-electric-500 transition-colors"
              >
                {t.footer.terms}
              </Link>
              <Link
                href="/cookies"
                className="text-white/50 hover:text-electric-500 transition-colors"
              >
                {t.footer.cookies}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
