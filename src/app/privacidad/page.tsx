'use client'

import { ParallaxImage } from '@/shared/components/animations/ParallaxImage'
import Link from 'next/link'
import { Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop"
          alt="Política de Privacidad"
          className="absolute inset-0"
        />

        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">
                Política de <span className="text-electric-500">Privacidad</span>
              </h1>
              <p className="text-xl text-white/90">
                Tu privacidad es nuestra prioridad
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
                En ITER Energy Solutions, respetamos y protegemos la privacidad de nuestros usuarios.
                Esta Política de Privacidad describe cómo recopilamos, usamos, compartimos y protegemos
                tu información personal cuando utilizas nuestro sitio web y servicios.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {/* Section 1 */}
              <div>
                <div className="mb-4 flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-electric-100">
                    <Database className="h-6 w-6 text-electric-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    1. Información que Recopilamos
                  </h2>
                </div>
                <div className="space-y-4 text-slate-700">
                  <p>
                    <strong>Información de Contacto:</strong> Cuando utilizas nuestros formularios de contacto
                    o te registras en nuestra plataforma, recopilamos:
                  </p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>Nombre completo</li>
                    <li>Dirección de correo electrónico</li>
                    <li>Número de teléfono (opcional)</li>
                    <li>Empresa u organización (opcional)</li>
                    <li>Cargo o puesto (opcional)</li>
                  </ul>
                  <p>
                    <strong>Información de Navegación:</strong> Recopilamos automáticamente:
                  </p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>Dirección IP</li>
                    <li>Tipo de navegador y dispositivo</li>
                    <li>Páginas visitadas y tiempo de navegación</li>
                    <li>Cookies y tecnologías similares</li>
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
                    2. Cómo Usamos tu Información
                  </h2>
                </div>
                <div className="space-y-4 text-slate-700">
                  <p>Utilizamos la información recopilada para:</p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>Responder a tus consultas y solicitudes de servicio</li>
                    <li>Proporcionar cotizaciones y asesoría personalizada</li>
                    <li>Enviar comunicaciones sobre nuestros servicios (con tu consentimiento)</li>
                    <li>Mejorar nuestro sitio web y experiencia de usuario</li>
                    <li>Cumplir con obligaciones legales y regulatorias</li>
                    <li>Analizar tendencias y optimizar nuestros servicios</li>
                  </ul>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <div className="mb-4 flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-electric-100">
                    <Lock className="h-6 w-6 text-electric-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    3. Protección de Datos
                  </h2>
                </div>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Implementamos medidas de seguridad técnicas y organizativas para proteger
                    tu información personal:
                  </p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>Cifrado SSL/TLS para todas las transmisiones de datos</li>
                    <li>Almacenamiento seguro en servidores protegidos (Supabase)</li>
                    <li>Acceso restringido solo a personal autorizado</li>
                    <li>Auditorías de seguridad regulares</li>
                    <li>Copias de seguridad automáticas</li>
                  </ul>
                </div>
              </div>

              {/* Section 4 */}
              <div>
                <div className="mb-4 flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-electric-100">
                    <UserCheck className="h-6 w-6 text-electric-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    4. Tus Derechos
                  </h2>
                </div>
                <div className="space-y-4 text-slate-700">
                  <p>Tienes derecho a:</p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li><strong>Acceso:</strong> Solicitar una copia de tu información personal</li>
                    <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
                    <li><strong>Eliminación:</strong> Solicitar la eliminación de tus datos personales</li>
                    <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado</li>
                    <li><strong>Oposición:</strong> Oponerte al procesamiento de tus datos</li>
                    <li><strong>Revocación:</strong> Retirar tu consentimiento en cualquier momento</li>
                  </ul>
                  <p className="mt-4">
                    Para ejercer estos derechos, contáctanos en:{' '}
                    <a href="mailto:info@iter-energy.com" className="text-electric-600 hover:text-electric-700">
                      info@iter-energy.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Section 5 */}
              <div>
                <div className="mb-4 flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-electric-100">
                    <Mail className="h-6 w-6 text-electric-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    5. Compartir Información
                  </h2>
                </div>
                <div className="space-y-4 text-slate-700">
                  <p>
                    No vendemos ni alquilamos tu información personal a terceros.
                    Solo compartimos datos con:
                  </p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>
                      <strong>Proveedores de servicios:</strong> Como Supabase (almacenamiento),
                      Vercel (hosting), y Resend (emails), que actúan bajo estrictas obligaciones
                      de confidencialidad
                    </li>
                    <li>
                      <strong>Autoridades competentes:</strong> Cuando sea requerido por ley o
                      para proteger nuestros derechos legales
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 6 */}
              <div>
                <div className="mb-4 flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-electric-100">
                    <Shield className="h-6 w-6 text-electric-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    6. Cookies y Tecnologías de Seguimiento
                  </h2>
                </div>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Utilizamos cookies y tecnologías similares para mejorar tu experiencia.
                    Para más información, consulta nuestra{' '}
                    <Link href="/cookies" className="text-electric-600 hover:text-electric-700">
                      Política de Cookies
                    </Link>.
                  </p>
                </div>
              </div>

              {/* Section 7 */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  7. Retención de Datos
                </h2>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Conservamos tu información personal solo durante el tiempo necesario para
                    cumplir con los fines descritos en esta política, a menos que la ley requiera
                    o permita un período de retención más prolongado.
                  </p>
                </div>
              </div>

              {/* Section 8 */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  8. Transferencias Internacionales
                </h2>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Tus datos pueden ser procesados en servidores ubicados fuera de tu país de residencia.
                    En tales casos, nos aseguramos de que existan garantías adecuadas para proteger tu
                    información de acuerdo con las leyes de protección de datos aplicables.
                  </p>
                </div>
              </div>

              {/* Section 9 */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  9. Menores de Edad
                </h2>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos
                    intencionalmente información personal de menores. Si descubrimos que hemos
                    recopilado datos de un menor, los eliminaremos de inmediato.
                  </p>
                </div>
              </div>

              {/* Section 10 */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  10. Cambios a esta Política
                </h2>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Nos reservamos el derecho de actualizar esta Política de Privacidad periódicamente.
                    Te notificaremos sobre cambios significativos publicando la nueva política en esta
                    página y actualizando la fecha de "Última actualización".
                  </p>
                </div>
              </div>

              {/* Contact Section */}
              <div className="mt-12 rounded-2xl bg-gradient-to-br from-electric-50 to-electric-100 p-8">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  Contáctanos
                </h2>
                <div className="space-y-3 text-slate-700">
                  <p>
                    Si tienes preguntas sobre esta Política de Privacidad o sobre cómo manejamos
                    tus datos personales, contáctanos:
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
