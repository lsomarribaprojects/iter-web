'use client'

import { ParallaxImage } from '@/shared/components/animations/ParallaxImage'
import Link from 'next/link'
import { Cookie, Settings, BarChart, Shield, Eye } from 'lucide-react'

export default function CookiesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&h=1080&fit=crop"
          alt="Política de Cookies"
          className="absolute inset-0"
        />

        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">
                Política de <span className="text-electric-500">Cookies</span>
              </h1>
              <p className="text-xl text-white/90">
                Información sobre el uso de cookies en nuestro sitio
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Last Updated */}
            <div className="mb-8 rounded-lg bg-slate-50 p-4">
              <p className="text-sm text-slate-600">
                <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            {/* Introduction */}
            <div className="mb-12">
              <p className="text-lg leading-relaxed text-slate-700">
                ITER Energy Solutions utiliza cookies y tecnologías similares para mejorar tu experiencia
                en nuestro sitio web. Esta política explica qué son las cookies, cómo las usamos, y cómo
                puedes controlarlas.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {/* Section 1 */}
              <div>
                <div className="mb-4 flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-electric-100">
                    <Cookie className="h-6 w-6 text-electric-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    1. ¿Qué son las Cookies?
                  </h2>
                </div>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando
                    visitas un sitio web. Se utilizan ampliamente para hacer que los sitios web funcionen
                    de manera más eficiente y para proporcionar información a los propietarios del sitio.
                  </p>
                  <p>
                    Las cookies pueden ser:
                  </p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>
                      <strong>Cookies de sesión:</strong> Se eliminan cuando cierras tu navegador
                    </li>
                    <li>
                      <strong>Cookies persistentes:</strong> Permanecen en tu dispositivo durante un
                      período determinado o hasta que las elimines manualmente
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <div className="mb-4 flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-electric-100">
                    <Eye className="h-6 w-6 text-electric-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    2. Cookies que Utilizamos
                  </h2>
                </div>
                <div className="space-y-6 text-slate-700">
                  {/* Essential Cookies */}
                  <div className="rounded-lg bg-slate-50 p-6">
                    <h3 className="mb-3 text-lg font-semibold text-slate-900">
                      Cookies Esenciales (Necesarias)
                    </h3>
                    <p className="mb-3">
                      Estas cookies son estrictamente necesarias para el funcionamiento del sitio web
                      y no pueden ser desactivadas en nuestros sistemas.
                    </p>
                    <ul className="ml-6 list-disc space-y-2">
                      <li>
                        <strong>Cookies de autenticación:</strong> Mantienen tu sesión activa cuando
                        inicias sesión en el panel de administración
                      </li>
                      <li>
                        <strong>Cookies de seguridad:</strong> Protegen contra actividades maliciosas
                        como ataques CSRF
                      </li>
                      <li>
                        <strong>Cookies de preferencias:</strong> Recuerdan tus preferencias de idioma
                        y configuración
                      </li>
                    </ul>
                    <p className="mt-3 text-sm text-slate-600">
                      <strong>Proveedor:</strong> ITER Energy Solutions (primera parte)
                      <br />
                      <strong>Duración:</strong> Sesión o hasta 30 días
                    </p>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="rounded-lg bg-slate-50 p-6">
                    <h3 className="mb-3 text-lg font-semibold text-slate-900">
                      Cookies Analíticas
                    </h3>
                    <p className="mb-3">
                      Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web,
                      recopilando información de forma anónima.
                    </p>
                    <ul className="ml-6 list-disc space-y-2">
                      <li>
                        <strong>Google Analytics:</strong> Analiza el tráfico del sitio, páginas visitadas,
                        tiempo de permanencia y rutas de navegación
                      </li>
                      <li>
                        <strong>Métricas de rendimiento:</strong> Miden la velocidad de carga y rendimiento
                        del sitio
                      </li>
                    </ul>
                    <p className="mt-3 text-sm text-slate-600">
                      <strong>Proveedor:</strong> Google Analytics (tercera parte)
                      <br />
                      <strong>Duración:</strong> Hasta 2 años
                      <br />
                      <strong>Más información:</strong>{' '}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-electric-600 hover:text-electric-700"
                      >
                        Política de Google
                      </a>
                    </p>
                  </div>

                  {/* Functional Cookies */}
                  <div className="rounded-lg bg-slate-50 p-6">
                    <h3 className="mb-3 text-lg font-semibold text-slate-900">
                      Cookies Funcionales
                    </h3>
                    <p className="mb-3">
                      Permiten funcionalidades mejoradas y personalizadas, como recordar tus preferencias
                      y elecciones.
                    </p>
                    <ul className="ml-6 list-disc space-y-2">
                      <li>
                        <strong>Preferencias de idioma:</strong> Recuerdan el idioma seleccionado (español/inglés)
                      </li>
                      <li>
                        <strong>Estado del chatbot:</strong> Recuerdan si has interactuado con nuestro asistente virtual
                      </li>
                      <li>
                        <strong>Configuración de cookies:</strong> Almacenan tus preferencias de cookies
                      </li>
                    </ul>
                    <p className="mt-3 text-sm text-slate-600">
                      <strong>Proveedor:</strong> ITER Energy Solutions (primera parte)
                      <br />
                      <strong>Duración:</strong> Hasta 1 año
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <div className="mb-4 flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-electric-100">
                    <Settings className="h-6 w-6 text-electric-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    3. Cómo Controlar las Cookies
                  </h2>
                </div>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Puedes controlar y/o eliminar las cookies según desees. Tienes las siguientes opciones:
                  </p>

                  <div className="rounded-lg bg-electric-50 p-6">
                    <h3 className="mb-3 text-lg font-semibold text-slate-900">
                      Configuración del Navegador
                    </h3>
                    <p className="mb-3">
                      La mayoría de los navegadores te permiten:
                    </p>
                    <ul className="ml-6 list-disc space-y-2">
                      <li>Ver qué cookies tienes y eliminarlas individualmente</li>
                      <li>Bloquear cookies de terceros</li>
                      <li>Bloquear cookies de sitios específicos</li>
                      <li>Bloquear todas las cookies</li>
                      <li>Eliminar todas las cookies al cerrar el navegador</li>
                    </ul>

                    <div className="mt-4 space-y-2 text-sm">
                      <p><strong>Instrucciones por navegador:</strong></p>
                      <ul className="ml-6 list-disc space-y-1">
                        <li>
                          <a
                            href="https://support.google.com/chrome/answer/95647"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-electric-600 hover:text-electric-700"
                          >
                            Google Chrome
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-electric-600 hover:text-electric-700"
                          >
                            Mozilla Firefox
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-electric-600 hover:text-electric-700"
                          >
                            Safari
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-electric-600 hover:text-electric-700"
                          >
                            Microsoft Edge
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-6">
                    <h3 className="mb-2 text-lg font-semibold text-orange-900">
                      ⚠️ Importante
                    </h3>
                    <p className="text-orange-800">
                      Si bloqueas o eliminas cookies, algunas funciones del sitio pueden no funcionar
                      correctamente. Por ejemplo, es posible que no puedas iniciar sesión en el panel
                      de administración o que el sitio no recuerde tu idioma preferido.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div>
                <div className="mb-4 flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-electric-100">
                    <Shield className="h-6 w-6 text-electric-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    4. Cookies de Terceros
                  </h2>
                </div>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Algunos servicios de terceros que utilizamos pueden establecer sus propias cookies:
                  </p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>
                      <strong>Google Analytics:</strong> Para análisis de tráfico web
                    </li>
                    <li>
                      <strong>Vercel:</strong> Para hosting y entrega de contenido (CDN)
                    </li>
                    <li>
                      <strong>Supabase:</strong> Para autenticación y gestión de base de datos
                    </li>
                  </ul>
                  <p>
                    Estas cookies están sujetas a las políticas de privacidad de estos terceros y
                    no tenemos control sobre ellas.
                  </p>
                </div>
              </div>

              {/* Section 5 */}
              <div>
                <div className="mb-4 flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-electric-100">
                    <BarChart className="h-6 w-6 text-electric-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    5. Tecnologías Similares
                  </h2>
                </div>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Además de cookies, utilizamos tecnologías similares como:
                  </p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>
                      <strong>Local Storage:</strong> Para almacenar preferencias localmente en tu navegador
                    </li>
                    <li>
                      <strong>Session Storage:</strong> Para datos temporales durante tu sesión de navegación
                    </li>
                    <li>
                      <strong>Web Beacons:</strong> Para rastrear la apertura de emails (newsletter)
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 6 */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  6. Actualizaciones de esta Política
                </h2>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Podemos actualizar esta Política de Cookies ocasionalmente para reflejar cambios
                    en las cookies que utilizamos o por otras razones operativas, legales o regulatorias.
                  </p>
                  <p>
                    Te recomendamos revisar esta página periódicamente para estar informado sobre el
                    uso de cookies.
                  </p>
                </div>
              </div>

              {/* Contact Section */}
              <div className="mt-12 rounded-2xl bg-gradient-to-br from-electric-50 to-electric-100 p-8">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  ¿Preguntas sobre Cookies?
                </h2>
                <div className="space-y-3 text-slate-700">
                  <p>
                    Si tienes preguntas sobre nuestra Política de Cookies, contáctanos:
                  </p>
                  <div className="space-y-2">
                    <p>
                      <strong>ITER Energy Solutions</strong>
                    </p>
                    <p>
                      Email:{' '}
                      <a href="mailto:info@iter-energy.com" className="text-electric-600 hover:text-electric-700">
                        info@iter-energy.com
                      </a>
                    </p>
                    <p>
                      Teléfono:{' '}
                      <a href="tel:+593995654840" className="text-electric-600 hover:text-electric-700">
                        +593 99 565 4840
                      </a>
                    </p>
                    <p>Quito, Ecuador</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back to Home */}
            <div className="mt-12 text-center">
              <Link
                href="/"
                className="inline-flex items-center rounded-lg bg-electric-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-electric-600"
              >
                Volver al Inicio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
