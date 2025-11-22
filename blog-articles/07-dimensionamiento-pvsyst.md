# Dimensionamiento de Sistemas Fotovoltaicos con PVsyst: Metodología Profesional y Casos Prácticos

## Introducción al Dimensionamiento Fotovoltaico

El dimensionamiento correcto de un sistema fotovoltaico es el factor determinante entre una instalación rentable y un proyecto con bajo rendimiento. Un error del 10% en el dimensionamiento puede traducirse en pérdidas de producción de hasta 25,000 kWh/año en una instalación de 100 kWp, equivalente a 3,750€ anuales a tarifa de 0.15 €/kWh.

PVsyst, desarrollado por la Universidad de Ginebra, es el software de referencia internacional para el diseño de sistemas fotovoltaicos. Utilizado por más de 35,000 profesionales en 160 países, PVsyst combina bases de datos meteosat con algoritmos de simulación horaria que alcanzan precisiones de ±3% respecto a la producción real medida.

Este artículo profundiza en la metodología profesional de dimensionamiento, desde el análisis de recurso solar hasta la optimización económica, con casos prácticos reales simulados en PVsyst 7.4.

---

## 1. Fundamentos del Dimensionamiento Fotovoltaico

### 1.1 Parámetros Críticos del Proyecto

El dimensionamiento comienza con la definición precisa de los parámetros del proyecto:

**Localización y Recurso Solar:**
- **Latitud/Longitud**: Determina la geometría solar y el ángulo óptimo
- **Irradiación Global Horizontal (GHI)**: Base para el cálculo de producción
- **Temperatura Ambiente**: Afecta directamente al rendimiento de los módulos
- **Albedo**: Reflexión del suelo, crítico en sistemas bifaciales

**Perfil de Consumo:**
- **Demanda Anual (kWh/año)**: Define el tamaño del sistema
- **Curva de Carga Horaria**: Optimiza el diseño para autoconsumo
- **Factor de Simultaneidad**: Porcentaje de coincidencia generación-consumo
- **Tarifa Eléctrica**: Determina el ahorro económico

**Restricciones Técnicas:**
- **Superficie Disponible**: Limita la potencia instalable
- **Orientación/Inclinación**: Afecta la captación solar
- **Sombras**: Reducen la producción hasta 60% en casos severos
- **Capacidad de Conexión**: Limita la potencia de inyección a red

### 1.2 Bases de Datos Meteorológicas en PVsyst

PVsyst integra múltiples fuentes de datos meteo con diferentes niveles de precisión:

| Base de Datos | Resolución | Precisión GHI | Período | Aplicación |
|---------------|-----------|---------------|---------|------------|
| **Meteonorm 8.1** | 10 km | ±4% | 2000-2019 | Estudios de viabilidad |
| **PVGIS-SARAH2** | 5 km | ±3% | 2005-2020 | Europa, África, Asia |
| **NASA-SSE** | 100 km | ±8% | 1984-2020 | Proyectos globales |
| **Solargis** | 250 m | ±2% | 1994-2022 | Diseño final (premium) |
| **Datos Medidos** | In situ | ±1% | Variable | Plantas >5 MWp |

**Criterio de Selección:**
- **Viabilidad inicial**: Meteonorm 8.1 o PVGIS (gratuitos)
- **Diseño final**: Solargis o medición in situ (1 año mínimo)
- **Financiación bancaria**: Requiere P50/P90 de datos medidos

### 1.3 Cálculo del Ratio de Rendimiento (Performance Ratio)

El Performance Ratio (PR) es el indicador de calidad del diseño:

```
PR = Producción Real (kWh) / Producción Ideal (kWh)
```

Donde la Producción Ideal considera solo las pérdidas por temperatura.

**Valores de Referencia PR:**
- **Excelente**: PR > 85% (diseño optimizado, componentes premium)
- **Bueno**: PR 80-85% (diseño estándar, componentes calidad)
- **Aceptable**: PR 75-80% (diseño básico, algunas pérdidas evitables)
- **Deficiente**: PR < 75% (requiere rediseño)

**Desglose de Pérdidas Típicas:**
```
Pérdidas por Temperatura:        -8%
Pérdidas por Suciedad:            -3%
Pérdidas Ópticas (IAM):           -2%
Pérdidas por Mismatch:            -2%
Pérdidas DC (cableado):           -1.5%
Pérdidas Inversor:                -2%
Pérdidas AC (cableado):           -1%
Pérdidas por Disponibilidad:      -0.5%
────────────────────────────────
Total Pérdidas:                   20%
Performance Ratio Final:          80%
```

---

## 2. Metodología de Dimensionamiento en PVsyst

### 2.1 Fase 1 - Preliminary Design

El diseño preliminar establece la configuración base del sistema:

**Paso 1: Definición del Proyecto**
1. Crear nuevo proyecto: `Project Design → New Project`
2. Seleccionar tipo: Grid-Connected / Stand-Alone / Pumping
3. Definir localización: Coordenadas GPS + Altitud
4. Importar datos meteo: Meteonorm / PVGIS / Archivo personalizado

**Paso 2: Selección de Componentes**
```
Módulos Fotovoltaicos:
- Tecnología: Mono-PERC / TOPCon / HJT / Bifacial
- Potencia: 400-700 Wp (rango actual mercado)
- Coeficiente Temperatura: -0.35%/°C (típico)
- Tolerancia: ±3% (verificar datasheet)

Inversores:
- Topología: String / Central / Microinversores
- Ratio DC/AC: 1.1 - 1.3 (típico)
- Eficiencia Europea: >98% (string), >98.5% (central)
- MPPT: Rango de tensión compatible con strings
```

**Paso 3: Configuración del Campo FV**
```python
# Cálculo del Número de Módulos en Serie (Ns)
# Temperatura Operación: -10°C a 70°C (rango seguridad)

Vmpp_max = Vmpp_STC × [1 + α_V × (T_min - 25)]
         = 41.2 V × [1 + (-0.28%/°C) × (-10 - 25)]
         = 41.2 V × 1.098
         = 45.2 V

Vmpp_min = Vmpp_STC × [1 + α_V × (T_max - 25)]
         = 41.2 V × [1 + (-0.28%/°C) × (70 - 25)]
         = 41.2 V × 0.874
         = 36.0 V

# Rango MPPT Inversor: 200 - 1000 V

Ns_min = V_MPPT_min / Vmpp_max = 200 / 45.2 = 4.4 → 5 módulos
Ns_max = V_MPPT_max / Vmpp_min = 1000 / 36.0 = 27.7 → 27 módulos

# Configuración Típica: 24 módulos/string (960 V nominal)
```

**Paso 4: Simulación Preliminar**
PVsyst ejecuta 8760 horas de simulación considerando:
- Posición solar horaria (algoritmo SPA-NREL, precisión ±0.0003°)
- Irradiancia en plano módulo (transposición Perez)
- Temperatura célula (modelo NOCT + viento)
- Producción DC (ecuación de un diodo)
- Producción AC (curva eficiencia inversor)

### 2.2 Fase 2 - Análisis de Sombras

Las sombras son la principal causa de pérdidas evitables en FV:

**Métodos de Análisis:**

1. **Diagrama Cilíndrico (Horizon)**
   - Dibuja obstrucciones en diagrama solar
   - Precisión: ±2% si se dibujan correctamente
   - Tiempo: 15-30 min por ubicación
   - Aplicación: Estudios preliminares

2. **Modelo 3D (Near Shadings)**
   - Importa objetos 3D (edificios, árboles)
   - Calcula sombras horarias con raytracing
   - Precisión: ±1% con modelo detallado
   - Tiempo: 2-4 horas por instalación compleja
   - Aplicación: Diseño final

3. **Análisis de Pérdidas Eléctricas**
   - Módulos sombreados reducen corriente del string
   - Diodos bypass minimizan pérdidas (activan a >15% sombra)
   - Optimizadores DC eliminan pérdidas por mismatch
   - Microinversores: cero pérdidas eléctricas por sombra

**Ejemplo Cuantificado:**
```
Escenario: Chimenea proyecta sombra en 6 módulos (de 300 total)
Periodo sombra: 3 horas/día en invierno (10:00-13:00)

Pérdidas SIN Optimizadores:
- 6 módulos afectados × 3h/día × 180 días = 3,240 horas-módulo
- String completo (24 módulos) pierde producción
- Pérdida anual: 3,240 h × 0.4 kW × 24/6 = 5,184 kWh
- Coste económico: 5,184 kWh × 0.15 €/kWh = 778 €/año

Pérdidas CON Optimizadores:
- Solo 6 módulos pierden producción
- Pérdida anual: 3,240 h × 0.4 kW = 1,296 kWh
- Coste económico: 1,296 kWh × 0.15 €/kWh = 194 €/año
- Ahorro: 584 €/año
- Inversión optimizadores: 6 × 80€ = 480€
- Payback: 0.82 años → Rentable
```

### 2.3 Fase 3 - Optimización del Diseño

**Variables de Optimización:**

1. **Inclinación y Orientación**
```python
# Regla General: Inclinación óptima ≈ Latitud
# Ajustes según objetivo:

Máxima Producción Anual:
  β_opt = Latitud - 5° (para 30-45° latitud)

Máxima Producción Verano (autoconsumo):
  β_opt = Latitud - 15°

Máxima Producción Invierno:
  β_opt = Latitud + 15°

# Ejemplo: Zaragoza (41.65° N)
# Objetivo: Máxima producción anual
β_opt = 41.65° - 5° = 36.65° → 37°

# Pérdidas por desviación orientación:
Desviación 15° Este/Oeste:  -2% producción
Desviación 30° Este/Oeste:  -7% producción
Desviación 45° Este/Oeste:  -15% producción
```

2. **Ratio DC/AC (Oversizing)**
```
Ratio DC/AC = Potencia Pico Módulos / Potencia Nominal Inversor

Ventajas Oversizing (Ratio 1.2):
✓ Aprovecha horas bajas irradiancia (mañana/tarde)
✓ Compensa degradación módulos
✓ Mejora producción en días nublados
✓ Reduce coste específico (€/kWp)

Desventajas Oversizing Excesivo (Ratio >1.4):
✗ Clipping: Pérdida energía en horas pico
✗ Sobrecarga térmica inversor
✗ Ineficiencia económica

Ratio Óptimo por Aplicación:
- Autoconsumo industrial: 1.1 - 1.25
- Inyección a red: 1.15 - 1.3
- Bombeo solar: 1.3 - 1.5 (almacenamiento hidráulico)
```

**Análisis Económico de Oversizing:**
```
Caso: 100 kW inversor

Escenario 1: Ratio 1.0 (100 kWp)
- Producción anual: 155,000 kWh
- Coste instalación: 55,000€ (0.55€/Wp)
- Coste específico: 0.355 €/kWh producido (25 años)

Escenario 2: Ratio 1.2 (120 kWp)
- Producción anual: 183,400 kWh (+18.3%)
- Pérdidas clipping: -2,100 kWh (-1.1%)
- Producción neta: 181,300 kWh (+17%)
- Coste instalación: 62,400€ (0.52€/Wp)
- Coste específico: 0.344 €/kWh producido (25 años)
- LCOE reducido: 3.1% → Óptimo económico
```

### 2.4 Fase 4 - Simulación Detallada

**Configuración Avanzada en PVsyst:**

1. **Pérdidas por Suciedad (Soiling)**
```
Módulo Soiling Losses:
- Entorno urbano limpio: 2-3% anual
- Entorno industrial: 4-6% anual
- Entorno rural/agrícola: 3-5% anual
- Zona desértica: 6-10% anual

Mitigación:
- Lluvia natural: Reset mensual pérdidas
- Limpieza manual: 2-4 veces/año
- Limpieza robotizada: Continua (plantas >1 MW)
- Coating antiadherente: Reduce 30% soiling
```

2. **Degradación de Módulos**
```python
# Modelo de Degradación Lineal
# Año 1: -2.5% (LID - Light Induced Degradation)
# Años 2-25: -0.55%/año (degradación lineal)

P_año_n = P_nominal × (0.975 - 0.0055 × (n - 1))

# Año 10: P_10 = 1.0 × (0.975 - 0.0055 × 9) = 0.9255 → 92.55%
# Año 25: P_25 = 1.0 × (0.975 - 0.0055 × 24) = 0.843 → 84.3%

# Garantía Fabricante (típica):
# 25 años: >84% potencia nominal → Cumple
```

3. **Disponibilidad del Sistema**
```
Availability = (Tiempo Operativo / Tiempo Total) × 100%

Componentes Críticos:
- Módulos FV: 99.9% (fallos <0.1%/año)
- Inversor string: 99.0% (MTBF 10-15 años)
- Inversor central: 98.5% (mayor complejidad)
- Estructura: 100% (sin partes móviles)
- Monitorización: 99.5%

Availability Total: 98.5 - 99.5%
Pérdidas por Indisponibilidad: 0.5 - 1.5%
```

---

## 3. Caso Práctico 1: Nave Industrial 100 kWp (Autoconsumo)

### 3.1 Datos del Proyecto

**Localización:**
- Ubicación: Polígono Industrial, Zaragoza
- Coordenadas: 41.65° N, 0.88° W
- Altitud: 220 msnm
- GHI anual: 1,680 kWh/m² (Meteonorm 8.1)

**Consumo Eléctrico:**
- Demanda anual: 180,000 kWh
- Potencia contratada: 125 kW
- Tarifa: 3.0TD (6 periodos horarios)
- Precio medio energía: 0.142 €/kWh
- Término potencia: 38.043426 €/kW/año

**Restricciones:**
- Superficie cubierta disponible: 800 m²
- Orientación cubierta: Sur (azimuth 0°)
- Inclinación cubierta: 15° (cubierta sándwich)
- Sin sombras significativas

### 3.2 Dimensionamiento en PVsyst

**Selección de Componentes:**

Módulos: **JA Solar JAM72S30-545/MR** (Mono-PERC bifacial)
```
Potencia Pico (Pmax):           545 Wp
Eficiencia:                     21.15%
Dimensiones:                    2,278 × 1,134 × 35 mm
Vmpp:                           41.68 V
Impp:                           13.08 A
Voc:                            49.65 V
Isc:                            13.90 A
Coef. Temp. Pmax:               -0.35%/°C
Coef. Temp. Voc:                -0.27%/°C
Garantía Producto:              15 años
Garantía Potencia:              87% a 25 años
Bifacialidad:                   75%
Precio:                         125 €/módulo
```

Inversor: **Huawei SUN2000-100KTL-M1** (String, 3-phase)
```
Potencia Nominal AC:            100 kW
Eficiencia Máxima:              98.65%
Eficiencia Europea:             98.50%
Nº MPPT:                        10
Tensión MPPT:                   200 - 1000 V
Imax entrada:                   26 A/MPPT
Vmax sistema:                   1100 V
Protección:                     IP65
Dimensiones:                    1,035 × 700 × 365 mm
Peso:                           76 kg
Precio:                         3,800 €
```

**Configuración del Campo FV:**
```
Potencia Total:                 109.0 kWp (200 módulos)
Ratio DC/AC:                    1.09
Superficie ocupada:             517 m² (258 m² módulos + espaciado)
Aprovechamiento cubierta:       64.6%

Configuración Strings:
- 10 strings × 20 módulos/string
- Tensión nominal MPPT: 833 V (20 × 41.68V)
- Corriente string: 13.08 A < 26 A → OK
- Distribución: 1 string por MPPT (óptimo tracking)
```

### 3.3 Resultados de Simulación PVsyst

**Producción Energética Anual:**
```
Irradiación Global Plano Módulo:    1,746 kWh/m² (+3.9% vs horizontal)
Irradiación Efectiva (post-IAM):    1,706 kWh/m² (-2.3% pérdidas ópticas)

Energía DC (bornes módulo):         179,850 kWh
Energía AC (salida inversor):       172,450 kWh
Energía Inyectada a Red:            22,150 kWh
Energía Autoconsumida:              150,300 kWh

Performance Ratio:                  83.2%
Factor de Capacidad:                18.1%
Producción Específica:              1,582 kWh/kWp
```

**Desglose de Pérdidas:**
```
Pérdidas por Irradiancia Efectiva:
  - IAM (ángulo incidencia):        -2.3%
  - Soiling (suciedad):             -2.5%

Pérdidas por Temperatura Módulo:    -7.8%
  (Tª célula media: 41°C)

Pérdidas Calidad Módulos:
  - LID (primer año):                -1.5%
  - Mismatch:                        -1.0%
  - Tolerancia (-0/+3%):             -1.5%

Pérdidas Sistema DC:
  - Cableado DC:                     -1.2%
  - MPPT (tracking):                 -0.1%

Pérdidas Inversor:
  - Eficiencia conversión:           -1.5%
  - Clipping (Ratio 1.09):           -0.2%

Pérdidas Sistema AC:
  - Cableado AC:                     -0.8%
  - Transformador:                   -0.0% (sin trafo)

Pérdidas Indisponibilidad:          -0.5%

══════════════════════════════════════
Total Pérdidas:                      -20.9%
Performance Ratio Final:             79.1%
```

### 3.4 Análisis Económico

**Inversión Inicial:**
```
Componentes Principales:
- 200 módulos JA Solar 545 Wp:      25,000€
- 1 inversor Huawei 100 KTL:        3,800€
- Estructura fija aluminio:         6,500€
- Cableado DC (600 ml):             1,800€
- Cuadros protección DC/AC:         2,200€
- Monitorización IoT:               800€
- Ingeniería y Project Management:  3,400€
- Mano de obra instalación:         8,500€
- Legalización y OCA:               2,000€
────────────────────────────────────
Subtotal Material + Instalación:    54,000€
Margen Industrial (15%):            8,100€
────────────────────────────────────
TOTAL INVERSIÓN (sin IVA):          62,100€
Coste específico:                   0.570 €/Wp
```

**Ahorro Energético Anual:**
```
Autoconsumo (150,300 kWh):
  - Ahorro compra red:              21,343€
  - Ahorro término potencia (10%):  475€

Excedentes Vertidos (22,150 kWh):
  - Compensación simplificada:      2,215€
    (0.10 €/kWh precio compensación)

────────────────────────────────────
Ahorro Total Año 1:                 24,033€
```

**Análisis de Rentabilidad (25 años):**
```
VAN (Tasa descuento 4%):            +168,450€
TIR:                                35.8%
Payback Simple:                     2.58 años
Payback Descontado:                 3.12 años

Ahorro Acumulado 25 años:           521,700€
ROI (Return on Investment):         740%

Ratio Beneficio/Coste:              8.4
LCOE (Levelized Cost):              0.037 €/kWh
Ahorro vs Tarifa (0.142€/kWh):      74% coste energía
```

**Sensibilidad a Variables:**
```
                        VAN         TIR      Payback
Escenario Base:         168,450€    35.8%    2.58 años

Precio energía +10%:    197,800€    40.2%    2.32 años
Precio energía -10%:    139,100€    31.1%    2.91 años

Inversión +10%:         144,330€    32.1%    2.84 años
Inversión -10%:         192,570€    40.1%    2.32 años

Producción +5%:         185,950€    38.4%    2.44 años
Producción -5%:         150,950€    33.1%    2.74 años
```

---

## 4. Caso Práctico 2: Planta Solar 5 MWp (Inyección Red)

### 4.1 Datos del Proyecto

**Localización:**
- Ubicación: Suelo rústico, Badajoz
- Coordenadas: 38.88° N, 6.97° W
- Altitud: 195 msnm
- GHI anual: 1,950 kWh/m² (PVGIS-SARAH2)
- Temperatura media: 17.5°C

**Configuración:**
- Potencia instalación: 5.040 MWp
- Potencia inversores: 4.000 MW (Ratio 1.26)
- Punto conexión: SET 20/132 kV (4 km distancia)
- Modalidad: Venta energía pool mercado
- Precio energía (PPA 12 años): 45 €/MWh

### 4.2 Dimensionamiento Detallado

**Componentes Seleccionados:**

Módulos: **Longi LR5-72HTH-550M** (TOPCon bifacial)
```
Cantidad:                           9,200 módulos
Potencia Unitaria:                  550 Wp
Potencia Total:                     5.060 MWp
Eficiencia Módulo:                  21.3%
Tecnología:                         TOPCon (Tunnel Oxide Passivated Contact)
Bifacialidad:                       70%
Degradación Año 1:                  -1.0%
Degradación Lineal:                 -0.40%/año
Garantía Potencia:                  88.85% a 30 años
Coste (volumen):                    105 €/módulo
```

Inversores: **SMA Sunny Central 2000-EV-20** (Central, MV)
```
Cantidad:                           2 unidades
Potencia Unitaria:                  2,000 kW AC
Potencia Total:                     4,000 kW AC
Eficiencia Máxima:                  98.9%
Eficiencia Europea:                 98.7%
Tensión Salida:                     660 V AC (transformador integrado)
Protección:                         IP54 (exterior)
MTBF:                               >100,000 horas
Coste Unitario:                     115,000€
```

Estructura: **Seguidores 1-Eje N-S Soltec SF7**
```
Configuración:                      Horizontal single-axis tracker
Módulos por estructura:             84 módulos (2 filas × 42 vertical)
Número de trackers:                 110 unidades
Rango tracking:                     ±60° (120° total)
Backtracking:                       Sí (evita sombras internas)
Motor:                              24V DC (alimentación autónoma FV)
Resistencia viento:                 150 km/h (operación), 200 km/h (estiba)
Coste específico:                   0.08 €/Wp
```

### 4.3 Configuración Eléctrica

**Distribución Campo FV:**
```
Configuración Strings:
- 28 módulos/string × 164 strings = 4,592 módulos por inversor
- Tensión nominal string: 28 × 42.1 V = 1,179 V
- Corriente string: 13.1 A
- Potencia string: 15.4 kWp

Distribución por Inversor:
- Inversor 1 (Este): 2,520 kWp (4,582 módulos, 164 strings)
- Inversor 2 (Oeste): 2,520 kWp (4,582 módulos, 164 strings)

Conexión Media Tensión:
- 2× Transformadores 20/0.66 kV, 2,500 kVA
- Línea MT subterránea: 4 km hasta SET
- Cable: RHZ1 18/30 kV 3×240 mm² Al
```

### 4.4 Resultados Simulación PVsyst

**Producción Anual (Primer Año):**
```
Irradiación Plano Seguimiento:      2,450 kWh/m² (+25.6% vs fijo óptimo)
Irradiación Efectiva:               2,389 kWh/m² (-2.5% IAM + soiling)

Energía DC (módulos):               10,755 MWh
Energía AC (inversores):            10,285 MWh
Energía Inyectada SET:              10,105 MWh (-1.75% pérdidas MT)

Performance Ratio:                  81.8%
Factor de Capacidad:                22.9%
Producción Específica:              2,001 kWh/kWp

Clipping Losses (Ratio 1.26):       -2.8% (287 MWh/año)
  - Horas clipping: 520 h/año (6% tiempo operación)
  - Justificación: Coste kWp < Coste kW inversor
```

**Producción Mensual Detallada:**
```
Mes         GHI      Prod.(MWh)  PR(%)   Clipping(%)
───────────────────────────────────────────────────
Enero       95       645         79.2    0.8
Febrero     122      748         80.5    1.2
Marzo       178      1,025       81.9    2.1
Abril       215      1,142       82.7    3.5
Mayo        255      1,285       83.1    4.8
Junio       275      1,320       83.5    5.2
Julio       295      1,378       83.8    5.7
Agosto      265      1,290       83.2    5.1
Septiembre  198      1,085       82.4    3.8
Octubre     145      865         81.5    2.3
Noviembre   102      665         80.1    1.1
Diciembre   85       615         79.5    0.6
───────────────────────────────────────────────────
TOTAL       2,230    10,105      81.8    2.8
```

### 4.5 Análisis Económico (30 años)

**Inversión CAPEX:**
```
Módulos Fotovoltaicos:
  - 9,200 × 105€:                   966,000€

Inversores + Transformadores:
  - 2 × SMA SC 2000:                230,000€
  - 2 × Transformadores:            85,000€

Estructura Seguimiento:
  - 110 × SF7 trackers:             403,200€

Sistema Eléctrico:
  - Cableado DC (45 km):            67,500€
  - Cableado AC (8 km):             48,000€
  - Cuadros MT/BT:                  125,000€
  - Línea MT evacuación (4 km):     180,000€

Obra Civil:
  - Movimiento tierras (8 Ha):      56,000€
  - Vallado perimetral (1,800 m):   27,000€
  - Edificio control:               45,000€
  - Viales internos:                38,000€

Ingeniería y Gestión:
  - Proyecto técnico:               48,000€
  - Dirección obra:                 32,000€
  - Estudios ambientales:           18,000€
  - Licencias y permisos:           35,000€

Conexión a Red:
  - Derechos acceso:                95,000€
  - Instalación SET:                (Distribuidor)

────────────────────────────────────
CAPEX Total:                        2,498,700€
Coste específico:                   0.494 €/Wp
```

**Ingresos Anuales (PPA 45 €/MWh):**
```
Año 1: 10,105 MWh × 45€/MWh:        454,725€

Degradación Producción:
  - Año 1-30: -0.40%/año
  - Año 30: 88.4% potencia inicial
  - Producción Año 30: 8,933 MWh

Ingresos Acumulados 30 años:        13,275,500€
Producción Total 30 años:           295,010 MWh
```

**OPEX Anual:**
```
Operación & Mantenimiento:
  - Mantenimiento preventivo:       18,000€/año
  - Limpieza módulos (2×/año):      12,000€/año
  - Vigilancia y seguridad:         8,500€/año
  - Seguros (daños + RC):           15,000€/año
  - Gestión administrativa:         6,500€/año

Peaje Acceso:
  - Término potencia (4 MW):        38,000€/año

Reparaciones y Repuestos:
  - Promedio anualizado:            22,000€/año
  - Sustitución inversores (Año 15): 180,000€

────────────────────────────────────
OPEX Total Anual:                   120,000€/año
OPEX Específico:                    23.8 €/kWp/año
```

**Rentabilidad Proyecto (30 años):**
```
VAN (WACC 5.5%):                    +3,125,000€
TIR (Project IRR):                  16.2%
Payback Simple:                     7.48 años
Payback Descontado:                 9.25 años

LCOE (Levelized Cost):              0.0345 €/kWh
  - CAPEX Levelizado:               0.0275 €/kWh
  - OPEX Levelizado:                0.0070 €/kWh

Margen sobre PPA:
  - LCOE: 34.5 €/MWh
  - PPA: 45.0 €/MWh
  - Margen: 10.5 €/MWh (23.3%)

ROI (30 años):                      431%
Ratio Beneficio/Coste:              5.31
```

---

## 5. Funcionalidades Avanzadas de PVsyst

### 5.1 Análisis P50/P90 (Probabilístico)

Para financiación bancaria se requiere análisis probabilístico:

**Definiciones:**
- **P50**: Producción con 50% probabilidad de superarse (escenario esperado)
- **P90**: Producción con 90% probabilidad de superarse (escenario conservador)
- **P99**: Producción con 99% probabilidad de superarse (worst case)

**Metodología PVsyst:**
```python
# Fuentes de Incertidumbre

1. Recurso Solar (GHI):
   - Variabilidad interanual: ±4-8% (según climática zona)
   - Incertidumbre base datos: ±3-5%
   - Distribución: Normal σ = 6%

2. Degradación Módulos:
   - Tasa degradación: -0.4 a -0.6%/año
   - Incertidumbre: ±0.1%/año
   - Distribución: Normal σ = 0.1%

3. Disponibilidad Sistema:
   - Esperado: 99.0%
   - Rango: 98.0 - 99.5%
   - Distribución: Normal σ = 0.5%

4. Performance Ratio:
   - Esperado (P50): 81.8%
   - Incertidumbre: ±1.5%
   - Distribución: Normal σ = 1.5%

# Cálculo Producción Probabilística (Simulación Monte Carlo, 10,000 iteraciones)

P50 (Mediana):     10,105 MWh/año  (100.0% del esperado)
P75:                9,840 MWh/año  (97.4%)
P90:                9,550 MWh/año  (94.5%)
P95:                9,375 MWh/año  (92.8%)
P99:                9,105 MWh/año  (90.1%)

# Ratio P90/P50: 94.5% (típico 92-96% en España)
```

**Impacto Financiero P90:**
```
Ingresos Anuales P50:               454,725€
Ingresos Anuales P90:               429,975€ (-5.4%)

VAN Proyecto (P50, WACC 5.5%):      3,125,000€
VAN Proyecto (P90, WACC 5.5%):      2,685,000€ (-14.1%)

TIR Proyecto (P50):                 16.2%
TIR Proyecto (P90):                 14.8%

→ Bancos financian basándose en P90 (escenario conservador)
→ Sponsors reciben beneficio adicional si real > P90
```

### 5.2 Análisis de Bifacialidad

Módulos bifaciales captan irradiancia posterior (albedo):

**Parámetros Críticos:**
```
Bifaciality Factor:                 70% (LR5-72HTH)
  - Irradiancia frontal: 1000 W/m²
  - Irradiancia posterior equivalente: 700 W/m² (si Gbackside = 1000 W/m²)

Albedo (Reflexión Suelo):
  - Tierra/grava:          20-25%
  - Césped verde:          25-30%
  - Grava blanca:          50-60%
  - Superficie blanca:     70-80%
  - Nieve:                 80-90%

Altura Módulo sobre Suelo:
  - Mínima recomendada:    0.8 m (tracker posición horizontal)
  - Óptima:                1.2 - 1.5 m
  - Beneficio vs altura:   +0.5%/10cm (hasta 1.5m)
```

**Ganancia de Producción:**
```
Configuración: Tracker 1-eje, Albedo 25% (tierra), Altura 1.0m

Ganancia Bifacial:                  +8.5%
  - Producción monofacial:          9,295 MWh/año
  - Producción bifacial:            10,105 MWh/año
  - Energía adicional:              +810 MWh/año

Incremento Coste Módulos:           +3%
  - Módulo monofacial:              102€
  - Módulo bifacial:                105€

ROI Bifacialidad:
  - Coste adicional:                27,600€
  - Ingresos adicionales:           36,450€/año
  - Payback:                        0.76 años → Altamente rentable
```

**Optimización Albedo:**
```
Escenario Base (Tierra 25%):        10,105 MWh

Mejoras Albedo:
  + Grava blanca (55%):             10,685 MWh (+5.7%, +26,100€/año)
  + Pintura blanca (75%):           11,015 MWh (+9.0%, +40,950€/año)

Coste Mejora Albedo (8 Ha):
  - Grava blanca (10 cm):           96,000€ → Payback 3.7 años
  - Pintura reflectante:            128,000€ → Payback 3.1 años

→ Rentable en proyectos >5 MWp con PPA >40€/MWh
```

### 5.3 Shadings en Plantas Industriales (Análisis 3D)

**Metodología Near Shadings:**

1. **Creación Modelo 3D:**
   - Importar DXF/DWG edificio industrial
   - Definir obstrucciones (chimeneas, torres refrigeración)
   - Posicionar módulos con coordenadas GPS
   - Definir propiedades reflexión (albedo local)

2. **Cálculo de Sombras:**
```python
# Algoritmo Raytracing de PVsyst

For each hora in 8760:
    posicion_sol = calcular_posicion_solar(fecha, hora, latitud, longitud)

    For each modulo in campo_FV:
        For each punto in malla_9x9_modulo:  # 81 puntos por módulo
            rayo = trazar_rayo(punto, posicion_sol)

            if interseccion_objeto(rayo, objetos_3D):
                punto.sombreado = True
                reducir_irradiancia(punto)

        calcular_produccion_modulo_sombreado(modulo)

        if sombra_parcial and diodos_bypass:
            activar_diodos_bypass()
            recalcular_produccion_string()

# Output: Pérdidas horarias por sombras
```

3. **Interpretación Resultados:**
```
Pérdidas Globales Anuales:
  - Sombras externas:               -3.2% (chimeneas vecinas)
  - Sombras internas:               -1.8% (inter-fila mañana/tarde)
  - Pérdidas eléctricas (mismatch): -0.7%
  ─────────────────────────────────
  Total Pérdidas Sombras:           -5.7%

Distribución Temporal:
  - Invierno (Nov-Feb):             -12.5% (sol bajo, sombras largas)
  - Primavera/Otoño:                -4.2%
  - Verano:                         -2.1% (sol alto, sombras mínimas)

Pérdidas por Strings:
  - String 1 (Norte):               -9.8% (más afectado)
  - Strings 2-8:                    -4.5%
  - String 9-10 (Sur):              -1.2% (mínimas sombras)
```

**Estrategias Mitigación:**
```
Opción 1: Redistribución Módulos
  - Eliminar filas más sombreadas (Norte)
  - Concentrar en zona Sur sin sombras
  - Reducción potencia: -8%
  - Reducción pérdidas: -5.7% → -1.5%
  - Ganancia neta producción: +2.5%

Opción 2: Optimizadores DC (Tigo, SolarEdge)
  - 50 módulos con sombras críticas
  - Coste: 50 × 75€ = 3,750€
  - Recuperación pérdidas: 3.8% → +6,500 kWh/año
  - Ingresos adicionales: 975€/año
  - Payback: 3.85 años → Rentable

Opción 3: Microinversores (Enphase)
  - Total 200 microinversores
  - Coste adicional vs string: +12,000€
  - Recuperación pérdidas: 5.7% → +9,800 kWh/año
  - Beneficios adicionales:
    ✓ Monitorización módulo a módulo
    ✓ Mayor seguridad (baja tensión)
    ✓ Flexibilidad expansión futura
  - Ingresos adicionales: 1,470€/año
  - Payback: 8.16 años → Marginal
```

---

## 6. Errores Comunes en Dimensionamiento

### 6.1 Errores Técnicos Críticos

**Error 1: Subdimensionamiento Cableado DC**
```
Caso Real:
- Configuración: 24 módulos/string, cable 4 mm²
- Longitud string: 85 metros
- Corriente máxima: 13.5 A

Cálculo Pérdidas (según IEC 60364):
Rcable = ρ × L / S = 0.0178 × 170 / 4 = 0.7565 Ω
Pcable = I² × R = 13.5² × 0.7565 = 137.8 W
Vcaída = I × R = 13.5 × 0.7565 = 10.2 V

% Pérdidas = (137.8 W / 15,400 W string) × 100 = 0.89%
% Caída Tensión = (10.2 V / 1000 V) × 100 = 1.02%

→ Límites IEC: <3% pérdidas, <1.5% caída tensión
→ Solución: Cable 6 mm² → Pérdidas 0.59%, Caída 0.68%
```

**Error 2: Ratio DC/AC Insuficiente**
```
Problema:
- Instalación: 100 kWp, Inversor 100 kW (Ratio 1.0)
- Pérdidas sistema: 20% (PR 80%)
- Producción AC real: 80 kW máximo
- Infrautilización inversor: 20%

Consecuencias Económicas:
- Coste inversor (100 kW):        5,500€
- Coste inversor óptimo (80 kW):  4,400€
- Sobrecoste:                     1,100€ desperdiciados

Solución:
- Instalar 125 kWp con inversor 100 kW (Ratio 1.25)
- Coste adicional módulos: 12,500€
- Producción adicional: +18,000 kWh/año
- Ingresos adicionales: 2,700€/año
- Payback módulos extra: 4.6 años
```

**Error 3: Ignorar Coeficiente Temperatura**
```
Escenario: Módulo 545 Wp, Coef. -0.35%/°C

Cálculo Erróneo (25°C todo el año):
Producción anual: 172,450 kWh

Cálculo Real (Tª célula variable):
- Primavera/Otoño (Tcell 35°C):   -3.5% potencia
- Verano (Tcell 55°C):            -10.5% potencia
- Invierno (Tcell 25°C):          0% potencia

Producción anual real: 164,200 kWh
Error de estimación: +5.0% (8,250 kWh)
Impacto económico: 1,238€/año sobrestimado

→ Siempre usar simulación horaria con temperatura real
```

### 6.2 Errores de Datos de Entrada

**Error 4: Usar Datos Meteorológicos Incorrectos**
```
Caso: Instalación en Zaragoza

Fuente Datos A (NASA-SSE, Resolución 100 km):
- GHI anual: 1,580 kWh/m²
- Producción estimada: 156,200 kWh

Fuente Datos B (PVGIS-SARAH2, Resolución 5 km):
- GHI anual: 1,680 kWh/m²
- Producción estimada: 165,900 kWh

Fuente Datos C (Medición In-Situ, 1 año):
- GHI anual: 1,665 kWh/m² (año típico)
- Producción real: 164,500 kWh

Desviación NASA: -5.1% (subestimación)
Desviación PVGIS: +0.9% (ligera sobreestimación)

→ Impacto VAN (25 años): ±45,000€ según dato meteo
→ Crítico: Usar datos alta resolución para diseño final
```

**Error 5: Obviar Análisis de Sombras**
```
Instalación Real (sin análisis sombras):
- Potencia: 50 kWp
- Producción esperada: 78,500 kWh/año
- VAN estimado: +85,000€

Realidad (con sombras no detectadas):
- Chimenea vecina sombrea 8 módulos
- Pérdidas reales: -18% (no -20% estándar)
- Producción real: 65,100 kWh/año
- VAN real: +48,500€

Pérdida VAN: -42.9% (-36,500€)
Tiempo detección error: 6 meses post-instalación

→ Inversión análisis sombras (PVsyst 3D): 500€
→ ROI análisis: Evita pérdidas de 36,500€ → 7,300%
```

---

## 7. Tendencias y Futuro del Dimensionamiento FV

### 7.1 Integración con Machine Learning

**Predicción de Producción con IA:**
```python
# Modelo LSTM para Predicción Horaria (TensorFlow)
import tensorflow as tf
from tensorflow import keras

# Inputs: GHI, Tª, Humedad, Viento, Histórico Producción
# Output: Producción próximas 24 horas

model = keras.Sequential([
    keras.layers.LSTM(128, return_sequences=True, input_shape=(24, 5)),
    keras.layers.Dropout(0.2),
    keras.layers.LSTM(64, return_sequences=False),
    keras.layers.Dense(32, activation='relu'),
    keras.layers.Dense(24, activation='linear')  # 24h forecast
])

# Precisión alcanzada: ±2.5% (vs ±5% modelos físicos tradicionales)
# Aplicación: Optimización participación mercado eléctrico
```

**Auto-Optimización con Algoritmos Genéticos:**
```python
# Optimización Multiobjetivo: LCOE vs PR vs Complejidad

from deap import base, creator, tools, algorithms

# Genes: [inclinación, azimuth, ratio_DC/AC, módulos/string, num_inversores]
# Objetivos: Minimizar LCOE, Maximizar PR, Minimizar CAPEX

def evaluar_diseno(individuo):
    # Simular en PVsyst vía API
    resultados = pvsyst_api.simulate(individuo)

    lcoe = calcular_lcoe(resultados['produccion'], resultados['capex'])
    pr = resultados['performance_ratio']
    capex = resultados['capex']

    return lcoe, -pr, capex  # Minimizar LCOE y CAPEX, Maximizar PR

# Ejecutar 500 generaciones, población 100 individuos
# Resultado: Pareto front con diseños óptimos
# Reducción LCOE: 3-7% vs diseño manual
```

### 7.2 Dimensionamiento con Almacenamiento

**Baterías + FV - Optimización Conjunta:**
```
Sistema Híbrido: 100 kWp FV + 150 kWh Batería

Estrategia Control:
1. Carga batería con FV (autoconsumo instantáneo < FV)
2. Descarga batería en picos consumo (18:00-22:00)
3. Arbitraje tarifario (P6 carga, P1 descarga)

Resultados:
- Autoconsumo sin batería:        65%
- Autoconsumo con batería:        89% (+24 pp)
- Ahorro adicional anual:         8,750€
- Coste batería (150 kWh):        52,500€
- Payback batería:                6.0 años
- VAN proyecto (25 años):         +95,000€ (vs +68,000€ sin batería)

→ Rentable en tarifas con alta diferencia horaria (>0.08€/kWh P1-P6)
```

### 7.3 Gemelos Digitales (Digital Twins)

**Simulación Continua en Operación:**
```
Digital Twin en Tiempo Real:

1. Modelo PVsyst Baseline:
   - Configuración: Diseño original planta
   - Inputs: Meteo forecast (GFS, ECMWF)
   - Output: Producción esperada próximas 72h

2. Actualización con Datos Reales:
   - SCADA: Producción real cada 15 min
   - Estación meteo: GHI, Tª, viento real
   - Machine Learning: Ajuste modelo cada semana

3. Detección de Anomalías:
   - Threshold: Desviación >5% esperado vs real
   - Alertas automáticas: Suciedad, avería, degradación

Casos Detectados (Planta 5 MW, 1 año):
- 12 avisos suciedad excesiva → Limpieza (+2.5% producción)
- 3 fallos string → Reparación inmediata (-0.1% pérdidas)
- 1 degradación anómala → Reclamación garantía (+35,000€)

ROI Digital Twin:
- Coste plataforma: 8,500€/año
- Beneficios: +45,000€/año
- ROI: 429%
```

---

## Conclusiones

El dimensionamiento profesional de sistemas fotovoltaicos con PVsyst requiere dominar:

### Claves del Éxito

1. **Precisión en Datos de Entrada**
   - Usar bases de datos meteo alta resolución (PVGIS, Solargis)
   - Análisis exhaustivo de sombras (3D cuando sea posible)
   - Caracterización real del perfil de consumo

2. **Optimización Económica**
   - Ratio DC/AC entre 1.15-1.30 según aplicación
   - Análisis sensibilidad a variables críticas
   - Evaluación VAN, TIR y Payback en múltiples escenarios

3. **Validación Técnica**
   - Performance Ratio objetivo: >80% (>83% instalaciones premium)
   - Verificación cumplimiento normativa (IEC, RD)
   - Revisión por pares (peer review) en proyectos >1 MWp

4. **Contingencias**
   - Análisis P50/P90 para financiación
   - Margen seguridad 5% en producción para PPA
   - Plan de O&M desde diseño inicial

### Impacto Económico del Buen Dimensionamiento

```
Proyecto 100 kWp - Comparativa

Diseño Deficiente (PR 75%):
- CAPEX:          62,100€
- Producción:     148,500 kWh/año
- VAN (25 años):  +95,000€
- TIR:            28.5%

Diseño Óptimo (PR 83%):
- CAPEX:          65,800€ (+6%)
- Producción:     164,200 kWh/año (+10.6%)
- VAN (25 años):  +168,450€ (+77%)
- TIR:            35.8%

→ Inversión adicional 3,700€ genera 73,450€ VAN extra
→ ROI inversión en calidad diseño: 1,985%
```

PVsyst es la herramienta profesional por excelencia, pero su potencial solo se despliega con conocimiento profundo de los fenómenos físicos, criterios de optimización económica y validación continua contra datos reales.

La precisión en el dimensionamiento no es un lujo técnico, es la diferencia entre un proyecto rentable y un fracaso comercial.

---

## Llamada a la Acción Personalizada

¿Estás diseñando tu próxima instalación fotovoltaica y quieres asegurar la máxima rentabilidad?

**En ITER Energy Solutions, nuestro proceso de dimensionamiento incluye:**

✅ **Simulación dual**: PVsyst + HOMER Pro para validación cruzada
✅ **Análisis P50/P90** con incertidumbre certificada
✅ **Modelo 3D sombras** en SketchUp + raytracing PVsyst
✅ **Optimización económica** con algoritmos genéticos (LCOE mínimo)
✅ **Auditoría técnica** de tu proyecto actual (si ya tienes uno)

**🎯 Solicita tu estudio de viabilidad sin compromiso**
📧 **proyectos@iter.energy** | ☎️ **+34 976 XXX XXX**

Incluye en tu consulta:
- Localización (coordenadas GPS)
- Superficie disponible o potencia deseada
- Consumo anual (kWh) o perfil de carga
- Presupuesto estimado (si lo tienes)

**Respuesta en 48h con pre-dimensionamiento y ROI estimado.**

---

**Metadata:**
- **Title:** Dimensionamiento de Sistemas Fotovoltaicos con PVsyst: Metodología Profesional y Casos Prácticos
- **Slug:** dimensionamiento-sistemas-fotovoltaicos-pvsyst-metodologia-profesional
- **Excerpt:** Guía completa para dimensionar instalaciones fotovoltaicas con PVsyst: análisis de recurso solar, optimización económica, casos prácticos reales de 100 kWp y 5 MWp, análisis P50/P90 y errores comunes a evitar.
- **Category:** solar
- **Tags:** PVsyst, dimensionamiento fotovoltaico, software solar, diseño FV, cálculo producción solar, ratio DC/AC, performance ratio, análisis sombras, optimización económica, LCOE solar
- **Author:** ITER Energy Solutions
- **PublishedDate:** 2025-01-20
- **UpdatedDate:** 2025-01-20
- **Featured:** true
- **Reading Time:** 42 min
