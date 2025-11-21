'use client'

import Image from 'next/image'
import { ParallaxImage } from '@/shared/components/animations/ParallaxImage'
import { MagneticButton } from '@/shared/components/ui/MagneticButton'
import { CERTIFICATIONS } from '@/shared/constants/site'
import { CheckCircle } from 'lucide-react'
import { useLanguage } from '@/shared/i18n/LanguageContext'

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&h=1080&fit=crop"
          alt="Equipo ITER"
          className="absolute inset-0"
        />

        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
                {t.aboutPage.heroTitle} <span className="text-electric-500">{t.aboutPage.heroTitleHighlight}</span>
              </h1>
              <p className="text-xl text-white/90 md:text-2xl">
                {t.aboutPage.heroSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">
                {t.aboutPage.missionTitle} <span className="text-electric-500">{t.aboutPage.missionTitleHighlight}</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t.aboutPage.missionText}
              </p>
            </div>

            <div>
              <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">
                {t.aboutPage.visionTitle} <span className="text-green-500">{t.aboutPage.visionTitleHighlight}</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t.aboutPage.visionText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              {t.aboutPage.valuesTitle} <span className="text-electric-500">{t.aboutPage.valuesTitleHighlight}</span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {t.aboutPage.values.map((value, index) => (
              <div key={index} className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  {value.title}
                </h3>
                <p className="text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              {t.aboutPage.historyTitle} <span className="text-electric-500">{t.aboutPage.historyTitleHighlight}</span>
            </h2>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="space-y-8">
              {t.aboutPage.timeline.map((item, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-orange-100">
                    <span className="text-xl font-bold text-electric-600">
                      {item.year}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-slate-900 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              {t.aboutPage.certificationsTitle}{' '}
              <span className="text-electric-500">{t.aboutPage.certificationsTitleHighlight}</span>
            </h2>
            <p className="text-lg text-white/70">
              {t.aboutPage.certificationsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {CERTIFICATIONS.map((cert, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center rounded-lg bg-white/10 p-6 backdrop-blur-sm"
              >
                <div className="mb-4 text-5xl text-electric-500">
                  <CheckCircle />
                </div>
                <p className="text-center font-semibold text-white">
                  {cert.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-electric-500 to-electric-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            {t.aboutPage.ctaTitle}
          </h2>
          <p className="mb-8 text-lg text-white/90">
            {t.aboutPage.ctaDescription}
          </p>
          <MagneticButton href="/contacto" variant="primary" size="lg" className="bg-white text-electric-600 hover:bg-slate-100">
            {t.aboutPage.ctaButton}
          </MagneticButton>
        </div>
      </section>
    </>
  )
}
