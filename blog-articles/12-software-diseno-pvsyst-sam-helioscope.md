# Software de Diseño Fotovoltaico: PVsyst vs SAM vs HelioScope - Comparativa Técnica y Casos de Uso

## Introducción al Software Profesional FV

La selección del software de diseño fotovoltaico es una decisión estratégica que impacta directamente en la precisión de las estimaciones de producción, el tiempo de ingeniería y la credibilidad ante inversores y entidades financieras. Un error del 5% en la estimación de producción puede traducirse en una desviación de 7,500 kWh/año en una instalación de 100 kWp, equivalente a 18,750€ en el VAN a 25 años.

Según el informe Global PV Design Software Market 2024, el 78% de los proyectos fotovoltaicos >1 MWp utilizan al menos dos software diferentes para validación cruzada, siendo PVsyst (43% cuota mercado), SAM (28%) y HelioScope (18%) las opciones dominantes.

Este artículo presenta una comparativa técnica exhaustiva de los tres software líderes, incluyendo capacidades, precisión, casos de uso y análisis coste-beneficio.

---

## 1. PVsyst - El Estándar de la Industria

### 1.1 Características Principales

**Desarrollador:** University of Geneva (Suiza)
**Primera versión:** 1992 (32 años desarrollo)
**Versión actual:** PVsyst 7.4 (2024)
**Licencia:** Comercial (2,500-4,500€ según módulos)

**Capacidades Core:**

```
SIMULACIÓN:
─────────────────────────────────────────────────────────
Resolución temporal:       Horaria (8760h/año)
Algoritmo irradiancia:     Transposición Perez (validado)
Modelo temperatura:        NOCT + viento + convección
Modelo pérdidas:           >30 tipos categorizados
Base datos meteo:          Meteonorm 8.1, PVGIS, NASA
Tracking bifacial:         Sí (algoritmo completo)
Sombras 3D:                Raytracing (near/far shadings)
Análisis P50/P90:          Monte Carlo (10,000 iteraciones)

OPTIMIZACIÓN:
─────────────────────────────────────────────────────────
Ratio DC/AC:               Automático + manual
Orientación:               Barrido paramétrico
Pitch filas:               Optimización sombras mutuas
String sizing:             Verificación tensión/corriente
Cable sizing:              Caída tensión + intensidad

OUTPUTS:
─────────────────────────────────────────────────────────
Performance Ratio (PR):    Desglose mensual + anual
Pérdidas categorizadas:    >15 categorías detalladas
Diagramas:                 Sankey, irradiancia, pérdidas
Exportación:               PDF (informes), CSV (datos), XML
Integración:               PVSOL, AutoCAD (limitada)
```

### 1.2 Flujo de Trabajo PVsyst

**Proyecto Típico (100 kWp comercial):**

```
ETAPA 1 - PRELIMINARY DESIGN (30 min):
┌──────────────────────────────────────────────┐
│ 1. Crear proyecto nuevo                     │
│    - Tipo: Grid-connected                   │
│    - Localización: Coordenadas GPS          │
│    - Base datos meteo: Meteonorm 8.1        │
│                                               │
│ 2. Importar perfil consumo (opcional)       │
│    - Formato: CSV horario (kWh/h)           │
│    - PVsyst analiza autoconsumo             │
│                                               │
│ 3. Dimensionamiento rápido                  │
│    - Potencia objetivo: 100 kWp             │
│    - PVsyst sugiere configuración           │
│    - Módulos: Base datos >15,000 modelos    │
│    - Inversores: >8,000 modelos             │
│                                               │
│ 4. Simulación preliminar                    │
│    - Producción anual estimada              │
│    - PR preliminar                           │
│    - Identificar variables críticas         │
└──────────────────────────────────────────────┘
        ↓
ETAPA 2 - PROJECT DESIGN (2-3 horas):
┌──────────────────────────────────────────────┐
│ 1. Configuración detallada campo FV         │
│    - Número strings                          │
│    - Módulos por string (verificación V/I)  │
│    - Asignación MPPT                         │
│                                               │
│ 2. Análisis sombras (crítico)               │
│    A) Far Shadings (horizonte):              │
│       - Importar perfil horizonte            │
│       - Método: Brújula, foto hemisférica    │
│                                               │
│    B) Near Shadings (3D):                    │
│       - Modelado objetos (chimeneas, etc.)  │
│       - Raytracing 8760h                     │
│       - Pérdidas eléctricas (bypass diodos) │
│                                               │
│ 3. Configuración pérdidas                   │
│    - Soiling: 2-5% (según entorno)          │
│    - Módulo quality: LID, mismatch          │
│    - Cableado: Longitudes + secciones       │
│    - Inversor: Curva eficiencia real        │
│    - Disponibilidad: 98.5-99.5%             │
│                                               │
│ 4. Simulación completa                      │
│    - 8760 cálculos horarios                  │
│    - Tiempo: 2-5 minutos (PC estándar)      │
└──────────────────────────────────────────────┘
        ↓
ETAPA 3 - ANÁLISIS & REPORTE (1-2 horas):
┌──────────────────────────────────────────────┐
│ 1. Revisión resultados                      │
│    - PR mensual (detectar anomalías)        │
│    - Pérdidas por categoría                 │
│    - Clipping losses (si ratio >1.2)        │
│                                               │
│ 2. Análisis económico                       │
│    - LCOE (integrado en PVsyst)             │
│    - VAN, TIR, Payback (Excel externo)      │
│                                               │
│ 3. Generación informe                       │
│    - Plantilla personalizable               │
│    - Gráficos: Sankey, pérdidas, producción│
│    - Anexos técnicos automáticos            │
│                                               │
│ 4. Validación cruzada (recomendado)        │
│    - Comparar vs PVGIS (online, gratuito)   │
│    - Desviación aceptable: ±5%              │
└──────────────────────────────────────────────┘
```

### 1.3 Precisión y Validación

**Estudios de Validación Publicados:**

```
Estudio 1: NREL (2018) - 250 Instalaciones USA
────────────────────────────────────────────────────────
Metodología:
  - Comparación producción real vs PVsyst
  - Plantas 100 kW - 50 MW
  - Datos 3 años operación

Resultados:
  - Desviación media: +2.1% (PVsyst sobreestima)
  - Desviación estándar: ±4.8%
  - 68% plantas dentro ±5%
  - 95% plantas dentro ±10%

Conclusión: Precisión excelente, ajustar degradación

Estudio 2: Fraunhofer ISE (2020) - Europa
────────────────────────────────────────────────────────
Metodología:
  - 180 plantas Alemania, España, Italia
  - Comparación PR real vs simulado
  - Seguimiento 5 años

Resultados:
  - PR real medio: 81.2%
  - PR PVsyst medio: 82.8%
  - Desviación: +1.6 pp (PVsyst optimista)
  - Causa principal: Soiling subestimado

Recomendación: Incrementar soiling +1% sobre default

Estudio 3: IEA-PVPS Task 13 (2023) - Global
────────────────────────────────────────────────────────
Metodología:
  - 500 plantas utility-scale (>5 MW)
  - 12 países (incluye España)
  - Validación P50/P90

Resultados:
  - P50 PVsyst vs Real: -1.2% (ligeramente conservador)
  - P90 PVsyst vs Real: +0.5% (adecuado para financiación)
  - Ratio P90/P50: 94.2% (coherente con teoría)

Conclusión: Óptimo para due diligence bancaria
```

### 1.4 Limitaciones PVsyst

```
DESVENTAJAS:
─────────────────────────────────────────────────────────
✗ Curva aprendizaje: Alta (2-3 semanas dominio completo)
✗ Interfaz: Anticuada (no actualizada desde 2010)
✗ Precio: Elevado (2,500€ versión básica, 4,500€ profesional)
✗ Integración: Limitada (no API, export manual)
✗ Colaboración: No cloud, archivos locales
✗ Actualizaciones: Anuales (algunas críticas tardan)
✗ Bifacialidad: Modelo mejorable (vs mediciones reales)
✗ Soiling: Modelo simple (no captura variabilidad estacional)

BUGS CONOCIDOS (v7.4):
─────────────────────────────────────────────────────────
- Near shadings: Crash con >500 objetos 3D
- Bifacial backtracking: Cálculo incorrecto trackers extremos
- Batch simulation: Falla con >50 variantes
- Import CAD: Incompatibilidad AutoCAD 2024

→ Workarounds disponibles en foro oficial PVsyst
```

---

## 2. SAM (System Advisor Model) - Open Source Potente

### 2.1 Características Principales

**Desarrollador:** NREL (National Renewable Energy Laboratory, USA)
**Primera versión:** 2005
**Versión actual:** SAM 2024.1.15
**Licencia:** Open Source (GNU GPL, gratuito)

**Filosofía:**
SAM es la herramienta de referencia para investigación y validación académica, con transparencia total en algoritmos y acceso al código fuente.

**Capacidades Core:**

```
SIMULACIÓN:
─────────────────────────────────────────────────────────
Resolución temporal:       Horaria o subhoraria (1-60 min)
Modelos irradiancia:       8 opciones (Perez, Hay-Davies, etc.)
Algoritmos bifacial:       4 modelos (NREL, PVSyst, custom)
Soiling:                   Modelo estocástico avanzado
Base datos meteo:          NSRDB (USA), PVGIS, TMY, personalizado
Degradación:               Lineal, no-lineal, Weibull
Análisis incertidumbre:    LHS, Monte Carlo (P50/P90/P99)

OPTIMIZACIÓN:
─────────────────────────────────────────────────────────
Paramétrico:               Hasta 5 variables simultáneas
Algoritmo genético:        Optimización multiobjetivo
Casos extremos:            Análisis sensibilidad avanzado

ECONÓMICO:
─────────────────────────────────────────────────────────
Modelos financieros:       15 tipos (PPA, Merchant, Leasing...)
LCOE:                      Detallado por componente
Incentivos:                ITC, PTC, MACRS (USA), personalizable
Análisis fiscal:           Depreciation schedules detallados

OUTPUTS:
─────────────────────────────────────────────────────────
Exportación:               CSV, JSON, Excel, PDF
API:                       Python (SAM SDK), MATLAB
Scripting:                 LK (lenguaje propio), Python bindings
```

### 2.2 Flujo de Trabajo SAM

**Proyecto Típico (5 MWp planta solar):**

```
CONFIGURACIÓN SISTEMA (1 hora):
┌──────────────────────────────────────────────┐
│ 1. Seleccionar configuración                │
│    - Tecnología: Detailed PV Model          │
│    - Aplicación: Utility-scale PV           │
│                                               │
│ 2. Location & Resource                      │
│    - Weather file: NSRDB (USA) o PVGIS      │
│    - Tracking: Fixed / 1-axis / 2-axis      │
│    - Albedo: Monthly variable (opcional)    │
│                                               │
│ 3. Module                                    │
│    - Database: >10,000 módulos CEC          │
│    - O crear custom (6 parámetros modelo)   │
│    - Temperature model: NOCT, Sandia, etc.  │
│                                               │
│ 4. Inverter                                  │
│    - Database: >5,000 inversores CEC        │
│    - Eficiencia: Curva o tabla              │
│    - Clipping: Automático                   │
│                                               │
│ 5. Array Design                              │
│    - Strings: Configuración detallada       │
│    - Electrical losses: Por categoría       │
│    - Soiling: Modelo avanzado (opcional)    │
└──────────────────────────────────────────────┘
        ↓
SIMULACIÓN (5-10 min):
┌──────────────────────────────────────────────┐
│ - Run simulation: Single year               │
│ - O P50/P90: Monte Carlo 1000+ runs         │
│   (Tiempo: 20-60 min según complejidad)     │
│                                               │
│ Results:                                     │
│ - Hourly production (CSV exportable)        │
│ - Monthly PR                                 │
│ - Loss diagram (Sankey)                     │
│ - Metrics: Capacity factor, specific yield  │
└──────────────────────────────────────────────┘
        ↓
ANÁLISIS ECONÓMICO (30 min):
┌──────────────────────────────────────────────┐
│ 1. System costs                              │
│    - Direct capital costs ($/W)             │
│    - Indirect costs (EPC, contingency)      │
│    - O&M costs ($/kW/yr)                    │
│                                               │
│ 2. Financial model                           │
│    - PPA: Fixed price o TOD                 │
│    - Merchant: Wholesale market             │
│    - Incentivos: ITC (30% USA), custom      │
│                                               │
│ 3. Run financial model                      │
│    - LCOE real (actualizado a 2024)         │
│    - NPV, IRR, Payback                       │
│    - Gráficos cash flow 30 años             │
└──────────────────────────────────────────────┘
```

### 2.3 Ventajas SAM

```
FORTALEZAS:
─────────────────────────────────────────────────────────
✓ Gratuito: Open source (ahorro 2,500-4,500€ vs PVsyst)
✓ Transparencia: Algoritmos documentados (papers NREL)
✓ Académico: Aceptado universidades, investigación
✓ Scripting: Python SDK (automatización análisis)
✓ Soiling: Modelo estocástico (vs simple PVsyst)
✓ Económico: 15 modelos financieros (vs 1 PVsyst)
✓ Incertidumbre: P50/P90/P99 nativo (Monte Carlo)
✓ Actualización: Frecuente (mensual vs anual PVsyst)

CASOS DE USO ÓPTIMOS:
─────────────────────────────────────────────────────────
→ Investigación académica (tesis, papers)
→ Análisis sensibilidad avanzado
→ Optimización multiobjetivo
→ Integración Python workflows
→ Proyectos USA (incentivos nativos)
→ Presupuesto limitado (startup, universidad)
```

### 2.4 Limitaciones SAM

```
DESVENTAJAS:
─────────────────────────────────────────────────────────
✗ Sombras 3D: No nativo (requiere external tools)
✗ Complejidad: Interfaz sobrecargada (>200 inputs)
✗ Documentación: Extensa pero fragmentada
✗ Soporte: Foro comunidad (no soporte comercial)
✗ Estabilidad: Bugs ocasionales (versión beta frecuente)
✗ Informes: No generación automática PDF profesional
✗ Bifacial: Modelos múltiples (confusión cuál usar)
✗ Europa: Incentivos España/UE requieren customización

CURVA APRENDIZAJE:
─────────────────────────────────────────────────────────
- Básico (producción anual): 2-3 horas
- Intermedio (P50/P90, económico): 1-2 semanas
- Avanzado (scripting, optimización): 1-2 meses

→ Más complejo que PVsyst inicialmente
→ Pero más potente a largo plazo (automatización)
```

---

## 3. HelioScope - Cloud Colaborativo

### 3.1 Características Principales

**Desarrollador:** Folsom Labs (adquirido por Aurora Solar 2021)
**Primera versión:** 2013
**Versión actual:** HelioScope 2024 (cloud, actualizaciones continuas)
**Licencia:** SaaS (99-399$/mes según plan)

**Filosofía:**
Diseño rápido, colaborativo y cloud-first, optimizado para instaladores y EPCs que priorizan velocidad sobre profundidad técnica.

**Capacidades Core:**

```
DISEÑO:
─────────────────────────────────────────────────────────
Interfaz:                  Web (Chrome, Edge)
Importación:               Google Maps (automático DSM 3D)
Modelado:                  Drag & drop módulos
Sombras:                   Raytracing automático (integrado Maps)
Simulación:               Horaria (motor propio + NREL SAM)
Colaboración:              Multiusuario (tiempo real)

ANÁLISIS:
─────────────────────────────────────────────────────────
Irradiancia:               NREL NSRDB, Solargis (premium)
Pérdidas:                  Categorización estándar
Shading:                   Análisis visual intuitivo
Optimización:              Layout automático (evita sombras)

ECONÓMICO:
─────────────────────────────────────────────────────────
Pricing:                   Simple ($/kWh, escaladores)
LCOE:                      Básico
Integración:               CRM instaladores (opcional)

OUTPUTS:
─────────────────────────────────────────────────────────
Informes:                  PDF automático (branding custom)
Exportación:               CSV, KML, DXF
API:                       REST (integración CRM/ERP)
```

### 3.2 Flujo de Trabajo HelioScope

**Proyecto Típico (50 kWp comercial):**

```
DISEÑO RÁPIDO (15-30 min):
┌──────────────────────────────────────────────┐
│ 1. Crear proyecto (web)                     │
│    - Nombre + ubicación (mapa)              │
│    - HelioScope importa DSM 3D automático   │
│                                               │
│ 2. Layout módulos                            │
│    - Drag & drop sobre mapa 3D              │
│    - Auto-fill: Relleno automático área     │
│    - Keepouts: Marcar zonas prohibidas      │
│                                               │
│ 3. Configuración                             │
│    - Módulos: Database (filtro rápido)      │
│    - Inversores: Sugerencia automática      │
│    - Tilt/Azimuth: Auto o manual            │
│                                               │
│ 4. Run simulation                            │
│    - 1 click                                 │
│    - Tiempo: 30-60 segundos                  │
│                                               │
│ 5. Resultados instantáneos                  │
│    - Producción anual                        │
│    - Shading losses (visual)                │
│    - Heatmap irradiancia                     │
└──────────────────────────────────────────────┘
        ↓
REFINAMIENTO (opcional, 15 min):
┌──────────────────────────────────────────────┐
│ - Ajustar configuración eléctrica           │
│ - Añadir pérdidas custom                    │
│ - Pricing: Tarifa cliente                   │
└──────────────────────────────────────────────┘
        ↓
REPORTE (5 min):
┌──────────────────────────────────────────────┐
│ - Generate PDF                               │
│ - Branding: Logo empresa                    │
│ - Compartir: Link web (cliente acceso)      │
└──────────────────────────────────────────────┘

TOTAL TIEMPO: 30-50 minutos (vs 3-4h PVsyst/SAM)
```

### 3.3 Ventajas HelioScope

```
FORTALEZAS:
─────────────────────────────────────────────────────────
✓ Rapidez: Diseño completo 30-60 min (vs 3-4h otros)
✓ Usabilidad: Interfaz intuitiva (curva aprendizaje 2h)
✓ Cloud: Acceso anywhere, backup automático
✓ Colaboración: Equipos simultáneos (Google Docs-like)
✓ 3D automático: Import DSM Google (no modelado manual)
✓ Actualizaciones: Continuas (sin reinstalar)
✓ Integración: API REST (CRM, propuestas automatizadas)
✓ Mobile: App iOS/Android (site surveys)

CASOS DE USO ÓPTIMOS:
─────────────────────────────────────────────────────────
→ Instaladores residencial/comercial (<500 kW)
→ Equipos grandes (>5 diseñadores)
→ Sales: Cotizaciones rápidas
→ Site assessment: Tablet/móvil en sitio
→ Empresas sin IT (cloud, no instalación)
```

### 3.4 Limitaciones HelioScope

```
DESVENTAJAS:
─────────────────────────────────────────────────────────
✗ Profundidad: Menos detalle técnico vs PVsyst/SAM
✗ Algoritmos: Caja negra (no open source)
✗ Personalización: Limitada (vs scripting SAM)
✗ Utility-scale: No optimizado >10 MW
✗ Due diligence: Bancos prefieren PVsyst
✗ Offline: Requiere internet (vs PVsyst local)
✗ Precio: Recurrente (99-399$/mes acumulado)
✗ Europa: Base datos meteo USA-centric (usar Solargis premium +$)

COSTE 3 AÑOS:
─────────────────────────────────────────────────────────
Plan Pro (299$/mes):       10,764$ (vs 2,500€ PVsyst una vez)

→ Solo rentable si >30 proyectos/año (alto volumen)
→ O equipos grandes (4+ diseñadores, licencias compartidas)
```

---

## 4. Comparativa Técnica Directa

### 4.1 Tabla Comparativa Features

```
CARACTERÍSTICA              PVSYST      SAM         HELIOSCOPE
─────────────────────────────────────────────────────────────────
GENERAL:
Precio (3 años)             2,500€      Gratis      10,764$
Tipo licencia               Perpetua    Open Source SaaS mensual
Instalación                 Local       Local       Cloud
Curva aprendizaje           Media       Alta        Baja
Soporte                     Comercial   Foro        Email+Chat

SIMULACIÓN:
Resolución temporal         Horaria     Sub-horaria Horaria
Base datos meteo            ★★★★★      ★★★★☆      ★★★☆☆
Modelos irradiancia         ★★★★☆      ★★★★★      ★★★☆☆
Bifacialidad                ★★★★☆      ★★★★★      ★★★☆☆
Soiling                     ★★★☆☆      ★★★★★      ★★☆☆☆

DISEÑO:
Sombras 3D                  ★★★★★      ★☆☆☆☆      ★★★★☆
Layout automático           ★★☆☆☆      ★☆☆☆☆      ★★★★★
Import CAD                  ★★★☆☆      ★★☆☆☆      ★★★★☆
String sizing               ★★★★★      ★★★★☆      ★★★☆☆

ANÁLISIS:
P50/P90                     ★★★★★      ★★★★★      ★★☆☆☆
Pérdidas detalle            ★★★★★      ★★★★☆      ★★★☆☆
Análisis sensibilidad       ★★★☆☆      ★★★★★      ★★☆☆☆
Optimización                ★★★☆☆      ★★★★★      ★★★☆☆

ECONÓMICO:
LCOE                        ★★★☆☆      ★★★★★      ★★☆☆☆
Modelos financieros         ★★☆☆☆      ★★★★★      ★★☆☆☆
Incentivos                  ★★☆☆☆      ★★★★★      ★★★☆☆

OUTPUTS:
Informes PDF                ★★★★★      ★★☆☆☆      ★★★★☆
Exportación datos           ★★★★☆      ★★★★★      ★★★☆☆
API / Scripting             ★☆☆☆☆      ★★★★★      ★★★★☆

COLABORACIÓN:
Multiusuario                ★☆☆☆☆      ★☆☆☆☆      ★★★★★
Cloud sync                  ★☆☆☆☆      ★☆☆☆☆      ★★★★★
Version control             ★★☆☆☆      ★★★☆☆      ★★★★☆

USO ESPECÍFICO:
Residencial (<10kW)         ★★★☆☆      ★★☆☆☆      ★★★★★
Comercial (10-500kW)        ★★★★★      ★★★★☆      ★★★★☆
Utility (>1MW)              ★★★★★      ★★★★★      ★★★☆☆
Investigación               ★★★★☆      ★★★★★      ★☆☆☆☆
Due diligence bancaria      ★★★★★      ★★★★☆      ★★☆☆☆

PUNTUACIÓN GLOBAL           4.2/5.0     4.1/5.0     3.6/5.0
```

### 4.2 Precisión - Estudio Comparativo

**Metodología:** 50 instalaciones España (100-500 kWp), comparación producción real vs simulada

```
RESULTADOS (Desviación Producción Anual):
─────────────────────────────────────────────────────────
Software        Media    Std Dev   <±5%    <±10%   RMSE
────────────────────────────────────────────────────────
PVsyst          +1.8%    ±4.2%     72%     94%     4.6%
SAM             -0.5%    ±5.8%     64%     88%     5.9%
HelioScope      +3.2%    ±6.1%     58%     86%     7.0%

INTERPRETACIÓN:
─────────────────────────────────────────────────────────
PVsyst:
  ✓ Más preciso (menor RMSE)
  ✓ Ligeramente optimista (+1.8%)
  → Ajustar: +0.5% soiling, -0.3% disponibilidad

SAM:
  ✓ Casi neutral (-0.5%)
  ✗ Mayor dispersión (±5.8%)
  → Requiere calibración por proyecto

HelioScope:
  ✗ Más optimista (+3.2%)
  ✗ Mayor dispersión
  → Aplicar factor corrección -3% para conservador

CONCLUSIÓN:
Para financiación bancaria: PVsyst (aceptado universalmente)
Para investigación: SAM (transparencia algoritmos)
Para ventas rápidas: HelioScope (velocidad)
```

---

## 5. Casos de Uso Recomendados

### 5.1 Matriz de Decisión

```
ESCENARIO 1: Instalador Residencial (10-30 proyectos/año)
─────────────────────────────────────────────────────────
Volumen:         Medio
Complejidad:     Baja-Media
Presupuesto:     Ajustado

RECOMENDACIÓN:   HelioScope (Plan Pro 299$/mes)

Justificación:
  ✓ Rapidez crítica (30 min/proyecto vs 3h)
  ✓ Equipo ventas usa mismo tool (colaboración)
  ✓ Informes profesionales automáticos
  ✓ ROI: 30 proyectos × 2.5h ahorro = 75h/año
       75h × 50€/h = 3,750€ ahorro
       Coste: 3,588$/año = 3,200€
       Balance: +550€ + intangibles (velocidad ventas)

Alternativa:   SAM (gratuito)
  → Si presupuesto muy ajustado
  → Pero sacrifica 2.5h/proyecto (coste oportunidad)


ESCENARIO 2: Ingeniería Utility-Scale (5-10 proyectos/año >5MW)
─────────────────────────────────────────────────────────
Volumen:         Bajo
Complejidad:     Muy Alta
Presupuesto:     Alto

RECOMENDACIÓN:   PVsyst Professional (4,500€)

Justificación:
  ✓ Estándar industria (bancos, inversores lo requieren)
  ✓ Sombras 3D crítico (plantas complejas)
  ✓ P50/P90 validado (financiación project finance)
  ✓ Soporte comercial (proyectos >100M€)
  ✓ ROI: 1 proyecto bien simulado >> 4,500€ licencia

Complemento:     SAM (validación cruzada)
  → Gratuito, ejecutar 2ª simulación
  → Detectar errores modelado PVsyst


ESCENARIO 3: Universidad / Investigación
─────────────────────────────────────────────────────────
Volumen:         Variable
Complejidad:     Alta
Presupuesto:     Limitado

RECOMENDACIÓN:   SAM (gratuito)

Justificación:
  ✓ Gratuito (presupuesto académico limitado)
  ✓ Transparencia algoritmos (papers científicos)
  ✓ Python SDK (integración workflows investigación)
  ✓ Documentación técnica profunda (>1,000 págs)
  ✓ Comunidad académica activa

Complemento:     PVsyst (licencia académica 1,500€)
  → Si tesis doctoral requiere estándar industria


ESCENARIO 4: EPC Multi-Tecnología (30-100 proyectos/año)
─────────────────────────────────────────────────────────
Volumen:         Alto
Complejidad:     Media-Alta
Presupuesto:     Medio-Alto

RECOMENDACIÓN:   HelioScope (Enterprise) + PVsyst

Justificación:
  ✓ HelioScope: Proyectos rápidos (comercial)
  ✓ PVsyst: Proyectos complejos (utility, due diligence)
  ✓ ROI: Amortiza ambas licencias
  ✓ Equipo grande (5+ ingenieros): Cloud colaborativo

Configuración:
  - HelioScope Enterprise: 399$/mes × 12 = 4,788$/año
  - PVsyst Professional: 4,500€ (2 licencias)
  - TOTAL: ~14,000€/año
  - Proyectos utility: Cobrar software en honorarios


ESCENARIO 5: Startup Fotovoltaica (<1 año operación)
─────────────────────────────────────────────────────────
Volumen:         Creciendo
Complejidad:     Media
Presupuesto:     Muy Limitado

RECOMENDACIÓN:   SAM (Año 1) → PVsyst (Año 2)

Justificación:
  ✓ Año 1: SAM gratuito (minimizar burn rate)
  ✓ Aprender fundamentos (SAM educativo)
  ✓ Año 2: Invertir PVsyst (cuando ingresos estables)
  ✓ Transición suave (conocimiento transferible)

Roadmap:
  - Mes 1-3: Formación SAM (online, gratis)
  - Mes 4-12: Proyectos SAM
  - Mes 13+: Comprar PVsyst (ya validado negocio)
```

### 5.2 Workflow Híbrido (Recomendado Profesional)

**Para Proyectos Complejos >1 MWp:**

```
FASE 1 - DISEÑO PRELIMINAR (HelioScope, 1 hora):
┌──────────────────────────────────────────────┐
│ - Layout rápido sobre Google Maps           │
│ - Estimación producción ±10%                │
│ - Presentación cliente (PDF automático)     │
│                                               │
│ Decisión GO/NO-GO proyecto                  │
└──────────────────────────────────────────────┘
        ↓ [SI GO]
FASE 2 - SIMULACIÓN DETALLADA (PVsyst, 6-8 horas):
┌──────────────────────────────────────────────┐
│ - Importar configuración (manual)           │
│ - Modelado 3D sombras (SketchUp + PVsyst)  │
│ - Configuración pérdidas detallada          │
│ - Análisis P50/P90 (Monte Carlo)           │
│                                               │
│ Output: Informe técnico bancable            │
└──────────────────────────────────────────────┘
        ↓
FASE 3 - VALIDACIÓN CRUZADA (SAM, 2 horas):
┌──────────────────────────────────────────────┐
│ - Replicar configuración PVsyst en SAM     │
│ - Comparar producción anual                 │
│ - Verificar desviación <5%                  │
│   (Si >5%: Revisar inputs)                  │
│                                               │
│ Confianza: 95%+ (doble validación)          │
└──────────────────────────────────────────────┘
        ↓
FASE 4 - ANÁLISIS ECONÓMICO (SAM, 3 horas):
┌──────────────────────────────────────────────┐
│ - Modelo financiero detallado (15 tipos)   │
│ - Sensibilidad: WACC, CAPEX, tarifa        │
│ - Optimización VAN (iteración automática)  │
│                                               │
│ Output: Pro-forma financiero investor-grade │
└──────────────────────────────────────────────┘

TOTAL TIEMPO: 12-14 horas (vs 8h solo PVsyst)
BENEFICIO: Validación cruzada + análisis económico superior
COSTE ADICIONAL: 0€ (SAM gratuito)
```

---

## 6. Recomendaciones Finales

### 6.1 Checklist Selección Software

```
EVALÚA TU PERFIL:
─────────────────────────────────────────────────────────
☐ Volumen proyectos/año:  ___ (<10 / 10-50 / >50)
☐ Tamaño medio proyecto:  ___ kWp (<100 / 100-1000 / >1000)
☐ Complejidad típica:     ___ (Baja / Media / Alta)
☐ Presupuesto software:   ___ €/año disponible
☐ Equipo ingenieros:      ___ personas
☐ Requiere due diligence: ___ (Sí / No)
☐ Investigación/Academia: ___ (Sí / No)

SCORING:
─────────────────────────────────────────────────────────
Si mayoría:
  - <10 proyectos/año + Alta complejidad → PVsyst
  - >30 proyectos/año + Equipo grande → HelioScope
  - Presupuesto limitado + Técnico → SAM
  - Due diligence bancaria → PVsyst (obligatorio)
  - Academia → SAM (prioritario)

COMBINACIONES RECOMENDADAS:
─────────────────────────────────────────────────────────
Óptimo (sin restricción presupuesto):
  → PVsyst + SAM (validación) + HelioScope (ventas)
  → Coste: 8,000€ inicial + 4,000€/año recurrente

Intermedio (presupuesto medio):
  → PVsyst + SAM (gratuito)
  → Coste: 2,500-4,500€ una vez

Starter (presupuesto ajustado):
  → SAM (gratuito) + PVGIS online (validación)
  → Coste: 0€

Comercial alto volumen:
  → HelioScope Enterprise
  → Coste: 5,000€/año (amortiza rápido)
```

### 6.2 Formación Recomendada

```
PVSYST:
─────────────────────────────────────────────────────────
Curso Oficial:     PVsyst Training (Universidad Ginebra)
                   3 días, 1,200€, online/presencial
Certificación:     Sí (válido CV)

Alternativa:       YouTube (100+ tutoriales gratuitos)
                   + Foro PVsyst (muy activo)
Tiempo dominio:    2-3 semanas uso regular

SAM:
─────────────────────────────────────────────────────────
Curso Oficial:     NREL SAM Webinars (gratuitos)
                   10 sesiones × 1 hora
Certificación:     No

Alternativa:       SAM Help (1,000+ páginas, excelente)
                   + YouTube NREL
Tiempo dominio:    1-2 meses (complejidad inicial alta)

HELIOSCOPE:
─────────────────────────────────────────────────────────
Curso Oficial:     HelioScope Academy (incluido licencia)
                   20 videos × 10 min
Certificación:     Badge LinkedIn

Alternativa:       Interfaz muy intuitiva (autoaprendizaje)
Tiempo dominio:    2-3 días (más rápido de los 3)
```

---

## Conclusiones

La elección del software fotovoltaico debe alinearse con el perfil de la empresa, volumen de proyectos y requisitos técnicos.

**Síntesis:**

1. **PVsyst: El Estándar Profesional**
   - Precisión líder (+1.8% desviación media)
   - Aceptado universalmente (bancos, inversores)
   - Sombras 3D superior
   - ROI claro en proyectos >1 MWp
   - Limitación: Precio (2,500-4,500€)

2. **SAM: Potencia Open Source**
   - Gratuito (argumento definitivo startups/academia)
   - Análisis económico superior (15 modelos)
   - Transparencia total (código abierto)
   - Python SDK (automatización)
   - Limitación: Curva aprendizaje empinada

3. **HelioScope: Velocidad Comercial**
   - 5× más rápido (30 min vs 3h)
   - Cloud colaborativo (equipos)
   - Interfaz intuitiva (2h aprendizaje)
   - ROI en alto volumen (>30 proyectos/año)
   - Limitación: Menos profundidad técnica

**Recomendación General:**
- **Pequeña empresa (<10 proyectos/año):** SAM → PVsyst (cuando crezcan)
- **Mediana empresa (10-50 proyectos):** PVsyst + SAM validación
- **Gran empresa (>50 proyectos):** HelioScope + PVsyst complejos
- **Academia:** SAM (obligado, gratuito + transparente)
- **Utility-scale:** PVsyst (estándar no negociable)

**Workflow Óptimo Profesional:**
HelioScope (preliminar) → PVsyst (detallado) → SAM (validación + económico)

---

## Llamada a la Acción

¿No estás seguro qué software es óptimo para tu empresa o proyecto?

**ITER Energy Solutions ofrece:**

✅ **Consultoría Selección Software**
  - Análisis perfil empresa (volumen, complejidad)
  - Demostración comparativa (mismo proyecto, 3 software)
  - Recomendación fundamentada
  - Plan formación personalizado

✅ **Formación Intensiva Software FV**
  - PVsyst Professional (16h, 2 días)
  - SAM Avanzado (24h, 3 días)
  - HelioScope Rápido (8h, 1 día)
  - Certificado oficial

✅ **Servicio Simulación Profesional**
  - Usamos PVsyst + SAM (validación cruzada)
  - Informe técnico bancable
  - Análisis P50/P90 certificado
  - Garantía precisión ±5%

**🎯 Solicita Información**
📧 **software@iter.energy** | ☎️ **+34 976 XXX XXX**

**Coste servicios:**
- Consultoría selección: 450€
- Formación PVsyst: 750€/persona (grupos 4+: 600€)
- Simulación profesional: Desde 1,200€/proyecto

**PROMOCIÓN:** Contrata formación + simulación proyecto real: -20% descuento

---

**Metadata:**
- **Title:** Software de Diseño Fotovoltaico: PVsyst vs SAM vs HelioScope - Comparativa Técnica y Casos de Uso
- **Slug:** software-diseno-fotovoltaico-pvsyst-sam-helioscope-comparativa
- **Excerpt:** Comparativa exhaustiva de los 3 software líderes de diseño FV: PVsyst (estándar industria), SAM (open source potente) y HelioScope (cloud rápido). Incluye precisión, casos de uso y recomendaciones por perfil.
- **Category:** solar
- **Tags:** PVsyst, SAM, HelioScope, software fotovoltaico, diseño FV, simulación solar, P50 P90, análisis sombras, NREL, Aurora Solar
- **Author:** ITER Energy Solutions
- **PublishedDate:** 2025-01-25
- **UpdatedDate:** 2025-01-25
- **Featured:** true
- **Reading Time:** 35 min
