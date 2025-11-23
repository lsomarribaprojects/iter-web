'use client'

import { ParallaxImage } from '@/shared/components/animations/ParallaxImage'
import Link from 'next/link'
import { FileText, AlertTriangle, Scale, Users, CheckCircle, XCircle } from 'lucide-react'

export default function TermsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&h=1080&fit=crop"
          alt="Términos y Condiciones"
          className="absolute inset-0"
        />

        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">
                Términos y <span className="text-electric-500">Condiciones</span>
              </h1>
              <p className="text-xl text-white/90">
                Condiciones de uso de nuestros servicios
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
                Bienvenido a ITER Energy Solutions. Al acceder y utilizar nuestro sitio web y servicios,
                aceptas cumplir con estos Términos y Condiciones. Por favor, léelos cuidadosamente antes
                de utilizar nuestros servicios.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {/* Section 1 */}
              <div>
                <div className="mb-4 flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-electric-100">
                    <FileText className="h-6 w-6 text-electric-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    1. Aceptación de los Términos
                  </h2>
                </div>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Al acceder y usar este sitio web, aceptas estar sujeto a estos Términos y Condiciones,
                    todas las leyes y regulaciones aplicables, y aceptas que eres responsable del cumplimiento
                    de cualquier ley local aplicable.
                  </p>
                  <p>
                    Si no estás de acuerdo con alguno de estos términos, se te prohíbe usar o acceder a este sitio.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <div className="mb-4 flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-electric-100">
                    <Users className="h-6 w-6 text-electric-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    2. Servicios Ofrecidos
                  </h2>
                </div>
                <div className="space-y-4 text-slate-700">
                  <p>ITER Energy Solutions ofrece los siguientes servicios profesionales:</p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>Consultoría y auditoría de proyectos solares fotovoltaicos</li>
                    <li>Implementación de Sistemas de Gestión Energética ISO 50001</li>
                    <li>Capacitación y formación técnica en energías renovables</li>
                    <li>Due diligence técnico para inversores y desarrolladores</li>
                    <li>Asesoría en eficiencia energética</li>
                  </ul>
                  <p>
                    Los servicios están sujetos a disponibilidad y pueden variar según la ubicación geográfica
                    y los requisitos específicos del proyecto.
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <div className="mb-4 flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-electric-100">
                    <CheckCircle className="h-6 w-6 text-electric-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    3. Uso Permitido
                  </h2>
                </div>
                <div className="space-y-4 text-slate-700">
                  <p>Está permitido:</p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>Navegar por el sitio web con fines informativos</li>
                    <li>Contactarnos mediante los formularios disponibles</li>
                    <li>Suscribirte a nuestro newsletter</li>
                    <li>Leer y compartir contenido del blog</li>
                    <li>Solicitar cotizaciones y asesoría profesional</li>
                  </ul>
                </div>
              </div>

              {/* Section 4 */}
              <div>
                <div className="mb-4 flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-electric-100">
                    <XCircle className="h-6 w-6 text-electric-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    4. Uso Prohibido
                  </h2>
                </div>
                <div className="space-y-4 text-slate-700">
                  <p>Está estrictamente prohibido:</p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>Copiar, modificar o distribuir el contenido sin autorización</li>
                    <li>Usar el sitio para actividades ilegales o no autorizadas</li>
                    <li>Intentar acceder a áreas restringidas del sistema</li>
                    <li>Enviar spam, malware o código malicioso</li>
                    <li>Suplantar la identidad de otra persona o entidad</li>
                    <li>Recopilar información de otros usuarios sin consentimiento</li>
                  </ul>
                </div>
              </div>

              {/* Section 5 */}
              <div>
                <div className="mb-4 flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-electric-100">
                    <Scale className="h-6 w-6 text-electric-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    5. Propiedad Intelectual
                  </h2>
                </div>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Todo el contenido de este sitio web, incluyendo pero no limitado a textos, imágenes,
                    gráficos, logotipos, iconos, fotografías, videos, y software, es propiedad de ITER
                    Energy Solutions o de sus proveedores de contenido y está protegido por las leyes de
                    propiedad intelectual de Ecuador y tratados internacionales.
                  </p>
                  <p>
                    El uso no autorizado de cualquier material puede violar las leyes de derechos de autor,
                    marcas registradas y otras leyes.
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  6. Contratos de Servicios
                </h2>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Los servicios profesionales de consultoría se rigen por contratos específicos que se
                    negocian individualmente con cada cliente. Estos Términos y Condiciones generales no
                    sustituyen los acuerdos contractuales específicos.
                  </p>
                  <p>
                    Las cotizaciones proporcionadas son válidas por 30 días a menos que se indique lo contrario.
                  </p>
                </div>
              </div>

              {/* Section 7 */}
              <div>
                <div className="mb-4 flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-electric-100">
                    <AlertTriangle className="h-6 w-6 text-electric-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    7. Limitación de Responsabilidad
                  </h2>
                </div>
                <div className="space-y-4 text-slate-700">
                  <p>
                    ITER Energy Solutions no será responsable por:
                  </p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>Daños indirectos, incidentales o consecuentes derivados del uso del sitio</li>
                    <li>Interrupciones o errores en el servicio del sitio web</li>
                    <li>Contenido de terceros enlazado desde nuestro sitio</li>
                    <li>Pérdida de datos o información</li>
                    <li>Decisiones tomadas basándose en información general del sitio web</li>
                  </ul>
                  <p>
                    La información en el blog es de carácter general y educativo. Para decisiones técnicas
                    o de inversión, recomendamos contratar nuestros servicios profesionales de consultoría.
                  </p>
                </div>
              </div>

              {/* Section 8 */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  8. Enlaces a Terceros
                </h2>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Nuestro sitio puede contener enlaces a sitios web de terceros. No tenemos control sobre
                    el contenido, políticas de privacidad o prácticas de sitios de terceros, y no asumimos
                    responsabilidad por ellos.
                  </p>
                </div>
              </div>

              {/* Section 9 */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  9. Modificaciones al Servicio
                </h2>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Nos reservamos el derecho de modificar, suspender o discontinuar, temporal o permanentemente,
                    el sitio web o cualquier servicio al que se conecta, con o sin aviso previo y sin
                    responsabilidad hacia ti.
                  </p>
                </div>
              </div>

              {/* Section 10 */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  10. Ley Aplicable y Jurisdicción
                </h2>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Estos Términos y Condiciones se rigen por las leyes de Ecuador. Cualquier disputa
                    relacionada con estos términos estará sujeta a la jurisdicción exclusiva de los
                    tribunales de Quito, Ecuador.
                  </p>
                </div>
              </div>

              {/* Section 11 */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  11. Indemnización
                </h2>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Aceptas indemnizar y eximir de responsabilidad a ITER Energy Solutions y sus afiliados,
                    directores, empleados y agentes de cualquier reclamo o demanda, incluyendo honorarios
                    razonables de abogados, hechos por terceros debido a o que surjan de tu uso del sitio
                    o violación de estos Términos y Condiciones.
                  </p>
                </div>
              </div>

              {/* Section 12 */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  12. Divisibilidad
                </h2>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Si alguna disposición de estos Términos y Condiciones se considera inválida o inaplicable,
                    dicha disposición se limitará o eliminará en la medida mínima necesaria, y las disposiciones
                    restantes permanecerán en pleno vigor y efecto.
                  </p>
                </div>
              </div>

              {/* Section 13 */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  13. Modificaciones a los Términos
                </h2>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Nos reservamos el derecho de revisar estos términos en cualquier momento. Al continuar
                    utilizando el sitio web después de dichos cambios, aceptas estar sujeto a los términos
                    revisados.
                  </p>
                </div>
              </div>

              {/* Contact Section */}
              <div className="mt-12 rounded-2xl bg-gradient-to-br from-electric-50 to-electric-100 p-8">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  ¿Preguntas sobre estos Términos?
                </h2>
                <div className="space-y-3 text-slate-700">
                  <p>
                    Si tienes preguntas sobre estos Términos y Condiciones, contáctanos:
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
