/**
 * Google Analytics 4 Component
 * Instrucciones:
 * 1. Obtén tu Measurement ID en https://analytics.google.com/
 * 2. Agrega NEXT_PUBLIC_GA_MEASUREMENT_ID a tu .env.local
 * 3. El componente ya está integrado en el layout principal
 */

'use client'

import Script from 'next/script'

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  // No renderizar nada si no hay ID configurado
  if (!measurementId) {
    if (process.env.NODE_ENV === 'development') {
      console.log('⚠️ Google Analytics: No se encontró NEXT_PUBLIC_GA_MEASUREMENT_ID')
    }
    return null
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />

      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

/**
 * Hook para tracking de eventos personalizados
 */
export function useAnalytics() {
  const trackEvent = (
    eventName: string,
    parameters?: Record<string, string | number | boolean>
  ) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', eventName, parameters)
    }
  }

  const trackPageView = (url: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_path: url,
      })
    }
  }

  return {
    trackEvent,
    trackPageView,
  }
}
