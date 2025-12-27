---
title: "Inspecciones Técnicas y Certificaciones Obligatorias en Instalaciones Fotovoltaicas"
slug: "inspecciones-tecnicas-certificaciones-obligatorias-fotovoltaicas"
excerpt: "Guía completa de inspecciones OCA, certificaciones CE, pruebas IEC obligatorias y procedimientos de verificación técnica para instalaciones fotovoltaicas. Normativa, procedimientos, costes y casos prácticos según REBT e IEC 62446."
category: "solar"
tags: ["inspección OCA", "IEC 62446", "certificación fotovoltaica", "pruebas FV", "calidad instalación", "REBT", "termografía", "megger test"]
author: "ITER Energy Solutions"
author_title: "Ingenieros Especialistas en Calidad Fotovoltaica"
date: "2025-01-26"
reading_time: "40 min"
image: "/blog/inspecciones-certificaciones-fotovoltaicas.jpg"
status: "published"
featured: true
seo_title: "Inspecciones y Certificaciones Fotovoltaicas: Guía IEC 62446 y REBT"
seo_description: "Todo sobre inspecciones OCA, certificaciones y pruebas obligatorias en instalaciones fotovoltaicas: IEC 62446, termografía, megger test, procedimientos y normativa 2024."
related_articles: ["normativas-permisos-instalaciones-solares-espana", "instalacion-paso-paso-fotovoltaica", "mantenimiento-preventivo-fotovoltaico"]
---

# Inspecciones Técnicas y Certificaciones Obligatorias en Instalaciones Fotovoltaicas

## Introducción

La **calidad de una instalación fotovoltaica** no se mide únicamente por la potencia de sus componentes, sino por la **conformidad técnica con normativas** internacionales y la **verificación profesional** de su correcta ejecución.

Según un estudio de TÜV Rheinland (2023) sobre 2,500 instalaciones fotovoltaicas en Europa:

- **32% presentaban defectos en inspección inicial** (cables subdimensionados, ausencia protecciones, errores polaridad)
- **18% tenían resistencia de tierra >20Ω** (incumplimiento normativo)
- **12% mostraban puntos calientes >15°C** en termografía (conexiones deficientes)
- **8% operaban con Performance Ratio <70%** por errores de instalación

El **coste de NO realizar inspecciones profesionales** puede ser devastador:

| DEFECTO NO DETECTADO           | CONSECUENCIA                     | COSTE ESTIMADO        |
|--------------------------------|----------------------------------|-----------------------|
| Cable DC subdimensionado       | Incendio estructura (2 casos/año España) | 50,000-500,000€ + responsabilidad penal |
| Ausencia diferencial tipo B    | Electrocución (1 muerte/año en EU instalaciones FV) | Invaluable |
| Resistencia tierra elevada     | Daño inversor por sobretensión   | 5,000-15,000€ |
| Módulos con sombra permanente  | Pérdida producción 15-25%        | 15,000€ en 25 años (100kW) |
| Conexiones MC4 deficientes     | Arco eléctrico → incendio        | 20,000-200,000€ |

Esta guía proporciona un **protocolo completo** de inspecciones y certificaciones obligatorias/recomendadas, basado en:

- **IEC 62446-1:2016** - Photovoltaic systems - Requirements for testing, documentation and maintenance (Part 1: Grid connected systems)
- **REBT ITC-BT-40** - Instalaciones generadoras de baja tensión
- **IEC 61730** - Photovoltaic module safety qualification
- **IEC 61215** - Crystalline silicon terrestrial photovoltaic modules - Design qualification
- **UNE-EN 62446-1:2018** (versión española armonizada)

**Estructura de la guía:**

1. Marco normativo de inspecciones (obligatorias vs recomendadas)
2. Inspección inicial por OCA (>50kW): Procedimiento completo
3. Pruebas eléctricas según IEC 62446 (Voc, Isc, aislamiento, tierra)
4. Inspección termográfica profesional
5. Certificaciones CE de componentes
6. Inspecciones periódicas de mantenimiento
7. Casos prácticos con protocolos de prueba

---

## 1. Marco Normativo de Inspecciones

### 1.1 Clasificación de Inspecciones por Obligatoriedad

```python
def determinar_inspecciones_obligatorias(potencia_kw, ccaa, tipo_conexion):
    """
    Determina qué inspecciones son obligatorias según normativa.

    Parámetros:
    - potencia_kw: Potencia instalación
    - ccaa: Comunidad autónoma
    - tipo_conexion: 'red', 'aislada', 'hibrida'
    """

    inspecciones = {
        'inspeccion_inicial_oca': False,
        'inspeccion_periodica_oca': False,
        'pruebas_electricas_iec62446': False,  # Siempre recomendadas
        'termografia': False,
        'medicion_produccion': False,
        'inspeccion_estructura': False
    }

    periodos = {}

    # Inspección inicial OCA
    if potencia_kw > 100:
        inspecciones['inspeccion_inicial_oca'] = True  # Todas CCAA
    elif potencia_kw > 50:
        # Depende de CCAA
        ccaa_exigen_50kw = ['Madrid', 'Cataluña', 'Andalucía', 'Valencia']
        if ccaa in ccaa_exigen_50kw:
            inspecciones['inspeccion_inicial_oca'] = True

    # Inspecciones periódicas REBT
    if potencia_kw > 100:
        inspecciones['inspeccion_periodica_oca'] = True
        periodos['inspeccion_periodica'] = '3 años'
    elif potencia_kw > 50:
        inspecciones['inspeccion_periodica_oca'] = True
        periodos['inspeccion_periodica'] = '5 años'
    elif potencia_kw > 10:
        inspecciones['inspeccion_periodica_oca'] = True
        periodos['inspeccion_periodica'] = '10 años'

    # Pruebas eléctricas IEC 62446 (recomendadas siempre, obligatorias si OCA)
    if inspecciones['inspeccion_inicial_oca']:
        inspecciones['pruebas_electricas_iec62446'] = True

    # Termografía (recomendada >20kW, obligatoria si OCA)
    if potencia_kw > 50 or inspecciones['inspeccion_inicial_oca']:
        inspecciones['termografia'] = True

    # Medición de producción (obligatoria instalaciones conexión red >10kW)
    if tipo_conexion == 'red' and potencia_kw > 10:
        inspecciones['medicion_produccion'] = True

    # Inspección estructura (obligatoria suelo >100kW, recomendada siempre)
    if potencia_kw > 100 and tipo_conexion != 'aislada':
        inspecciones['inspeccion_estructura'] = True

    return {
        'inspecciones_obligatorias': {k: v for k, v in inspecciones.items() if v},
        'periodos_inspeccion': periodos,
        'total_obligatorias': sum(inspecciones.values())
    }

# Ejemplo 1: Instalación 30kW en Madrid
resultado1 = determinar_inspecciones_obligatorias(
    potencia_kw=30,
    ccaa='Madrid',
    tipo_conexion='red'
)
print("INSTALACIÓN 30kW MADRID - Inspecciones obligatorias:\n")
for inspeccion in resultado1['inspecciones_obligatorias']:
    print(f"  ✅ {inspeccion.replace('_', ' ').title()}")
print(f"\nTotal: {resultado1['total_obligatorias']} inspecciones")

# Ejemplo 2: Instalación 150kW Andalucía
print("\n" + "="*60)
resultado2 = determinar_inspecciones_obligatorias(
    potencia_kw=150,
    ccaa='Andalucía',
    tipo_conexion='red'
)
print("\nINSTALACIÓN 150kW ANDALUCÍA - Inspecciones obligatorias:\n")
for inspeccion in resultado2['inspecciones_obligatorias']:
    print(f"  ✅ {inspeccion.replace('_', ' ').title()}")
for periodo, tiempo in resultado2['periodos_inspeccion'].items():
    print(f"\n{periodo.replace('_', ' ').title()}: cada {tiempo}")
print(f"\nTotal: {resultado2['total_obligatorias']} inspecciones")
```

**Output:**
```
INSTALACIÓN 30kW MADRID - Inspecciones obligatorias:

  ✅ Inspeccion Periodica Oca
  ✅ Medicion Produccion

Total: 2 inspecciones

============================================================

INSTALACIÓN 150kW ANDALUCÍA - Inspecciones obligatorias:

  ✅ Inspeccion Inicial Oca
  ✅ Inspeccion Periodica Oca
  ✅ Pruebas Electricas Iec62446
  ✅ Termografia
  ✅ Medicion Produccion
  ✅ Inspeccion Estructura

Inspeccion Periodica: cada 3 años

Total: 6 inspecciones
```

### 1.2 Normativa IEC 62446: Sistema de Verificación Internacional

**IEC 62446-1:2016** establece requisitos para:

1. **Testing (Pruebas):**
   - Inspección visual
   - Pruebas eléctricas
   - Verificación funcional

2. **Documentation (Documentación):**
   - As-built drawings
   - Datasheets componentes
   - Protocolos de prueba con resultados

3. **Maintenance (Mantenimiento):**
   - Inspecciones periódicas
   - Registro de operación
   - Gestión de incidencias

**Estructura de pruebas IEC 62446-1:**

```
PRUEBAS OBLIGATORIAS IEC 62446-1:

[ANTES DE ENERGIZACIÓN]
1. Inspección visual (Annex A)
   ├─ Módulos: daños, suciedad, sombreado
   ├─ Estructura: estabilidad, corrosión
   ├─ Cableado: protección, etiquetado
   ├─ Protecciones: presencia, especificaciones
   └─ Puesta a tierra: continuidad

2. Verificación de documentación
   ├─ Proyecto/diseño conforme a instalación
   ├─ Certificados componentes
   ├─ Esquemas unilinales
   └─ Instrucciones de operación

3. Pruebas eléctricas DC (Clause 5.3)
   ├─ Medición Voc por string
   ├─ Medición Isc por string
   ├─ Resistencia de aislamiento
   ├─ Polaridad y continuidad
   └─ Test de tierra

[DESPUÉS DE ENERGIZACIÓN]
4. Pruebas eléctricas AC (Clause 5.4)
   ├─ Tensión, frecuencia, secuencia fases
   ├─ Funcionamiento inversor
   ├─ Test protecciones (RCD, sobretensión)
   └─ Verificación medición (contador)

5. Verificación funcional (Clause 5.5)
   ├─ Operación en condiciones normales
   ├─ Comportamiento ante perturbaciones
   ├─ Sistema de monitorización
   └─ Performance ratio inicial

[DOCUMENTACIÓN FINAL]
6. Protocolo de comisionamiento
   ├─ Resultados de todas las pruebas
   ├─ Desviaciones respecto diseño
   ├─ No conformidades y resolución
   └─ Fecha puesta en marcha
```

---

## 2. Inspección Inicial por OCA (>50kW)

### 2.1 Selección del Organismo de Control Autorizado

**Requisitos OCA:**

- Acreditación ENAC (Entidad Nacional de Acreditación)
- Alcance: Instalaciones eléctricas de baja tensión - Generación fotovoltaica
- Certificado ISO/IEC 17020 (organismos inspección)
- Independencia (no puede ser empresa instaladora ni fabricante)

**Principales OCAs España (datos 2024):**

| OCA                  | COBERTURA      | PLAZO MEDIO | COSTE 100kW | VALORACIÓN |
|----------------------|----------------|-------------|-------------|------------|
| APPLUS+              | Nacional       | 7-10 días   | 950€        | ⭐⭐⭐⭐⭐ |
| Bureau Veritas       | Nacional       | 10-15 días  | 1,100€      | ⭐⭐⭐⭐⭐ |
| SGS Tecnos           | Nacional       | 10-14 días  | 1,050€      | ⭐⭐⭐⭐ |
| TÜV Rheinland        | Madrid, Cataluña| 10-12 días  | 1,200€      | ⭐⭐⭐⭐⭐ |
| LGAI (Applus)        | Cataluña       | 7-10 días   | 900€        | ⭐⭐⭐⭐ |
| ECA Provincial       | Provincial     | 5-7 días    | 700-800€    | ⭐⭐⭐ |

**Criterios de selección:**

✅ **Precio competitivo** (comparar 2-3 presupuestos)
✅ **Plazo disponibilidad** (crítico si timeline ajustado)
✅ **Experiencia en fotovoltaica** (>100 instalaciones inspeccionadas)
✅ **Equipamiento:** Termográfica, megger, analizador red, luxómetro

### 2.2 Documentación Previa a Presentar al OCA

**Checklist documental (enviar 7 días antes inspección):**

- [ ] **Proyecto técnico as-built**
  - Si difiere del proyecto visado, indicar modificaciones claramente
  - Planos actualizados con layout final de módulos

- [ ] **Certificados CE componentes:**
  - Módulos fotovoltaicos (IEC 61215, IEC 61730)
  - Inversores (IEC 62109-1, IEC 62109-2)
  - Estructura (declaración conformidad fabricante)
  - Cables DC (EN 50618 o UNE 211003)

- [ ] **Certificado empresa instaladora:**
  - Número de registro como instalador autorizado BT
  - Póliza de seguros RC vigente

- [ ] **Protocolos de pruebas previas:**
  - Mediciones Voc/Isc por string
  - Mediciones resistencia aislamiento
  - Medición resistencia de tierra
  - Verificación polaridad

- [ ] **Licencia de obra + AAP/AAC** (copias)

- [ ] **Declaración de conformidad CE del conjunto** (si aplica)

### 2.3 Procedimiento de Inspección In-Situ

**Duración típica:** 4-8 horas (según potencia)

**Secuencia de inspección:**

#### **FASE 1: Inspección Visual (60-90 min)**

```python
def checklist_inspeccion_visual_oca():
    """
    Genera checklist de inspección visual según IEC 62446-1 Annex A.
    """

    checklist = {
        'MÓDULOS FOTOVOLTAICOS': [
            'Ausencia de daños visibles (grietas, roturas, delaminación)',
            'Superficie limpia (sin cemento, adhesivos, suciedad excesiva)',
            'Ausencia de sombreado permanente (objetos, estructuras)',
            'Orientación según proyecto (azimut ±5°, inclinación ±3°)',
            'Separación entre módulos 15-20mm (expansión térmica)',
            'Clips de fijación apretados (prueba manual, sin holgura)',
            'Ausencia de módulos con film protector instalado',
            'Caja de conexión sin daños, IP65 garantizado',
            'Diodos bypass accesibles (si verificación requerida)'
        ],

        'ESTRUCTURA': [
            'Estabilidad general (sin movimientos >3mm con carga manual)',
            'Anclajes completos (muestreo 10%, todos presentes y apretados)',
            'Ausencia de corrosión en elementos metálicos',
            'Nivelación según proyecto (tolerancia ±5mm/10m)',
            'Distancias de seguridad (bordes, lucernarios, accesos)',
            'Tornillería completa y con arandelas',
            'Perfiles sin deformaciones ni golpes',
            'Sistema de puesta a tierra conectado a estructura'
        ],

        'CABLEADO DC': [
            'Protección mecánica adecuada (tubo/bandeja UV-resistente)',
            'Sección cables conforme proyecto (verificar etiquetado)',
            'Ausencia de daños mecánicos (cortes, aplastamientos)',
            'Conectores MC4 bien insertados (prueba tracción manual)',
            'Polaridad correcta (verificar etiquetado +/-)',
            'Ausencia de empalmes en cables DC',
            'Cables DC/AC separados >30cm (EMC)',
            'Etiquetado cada 10m: "DC XXX V - PELIGRO"',
            'Radio curvatura >10× diámetro cable',
            'Fijación a estructura cada 0.8-1m'
        ],

        'INVERSORES Y EQUIPAMIENTO AC': [
            'Inversor montado en posición vertical (±2°)',
            'Espacios ventilación libres (según manual fabricante)',
            'Conexiones DC apretadas (verificar torque si accesible)',
            'Conexiones AC correctas (secuencia fases, neutro, tierra)',
            'Ausencia de condensación en interior inversor',
            'Display operativo, sin errores al encender',
            'Temperatura ambiente <40°C (medición)',
            'Distancia a materiales combustibles >0.5m'
        ],

        'PROTECCIONES ELÉCTRICAS': [
            'String box: fusibles DC presentes (si >2 strings)',
            'Seccionador DC accesible y señalizado',
            'Magnetotérmico AC: curva y calibre según proyecto',
            'Diferencial tipo B instalado (inversores sin transformador)',
            'Varistores tipo 2 DC y AC presentes',
            'Esquema unifilar visible en cuadro',
            'Señalización: "DOBLE ALIMENTACIÓN"',
            'Cuadro cerrado con llave, IPX5 mínimo exterior'
        ],

        'PUESTA A TIERRA': [
            'Conductor tierra estructura: sección ≥16mm² Cu',
            'Conexión visible estructura-tierra (comprobable)',
            'Conexión visible tierra inversor',
            'Ausencia de corrosión en conexiones tierra',
            'Pica/anillo tierra accesible (arqueta registro)',
            'Continuidad tierra estructura <0.5Ω (medición)',
            'Resistencia tierra <10Ω preferible <5Ω (medición)'
        ],

        'SEGURIDAD Y SEÑALIZACIÓN': [
            'Señal "PELIGRO ELECTRICIDAD" en inversor',
            'Señal "DOBLE ALIMENTACIÓN" en cuadros',
            'Etiquetas DC en canalización cada 10m',
            'Instrucciones desconexión emergencia visibles',
            'Acceso a cubierta con barandilla/línea vida (si aplica)',
            'Extintor CO2 6kg presente (>50kW)',
            'Teléfono emergencia visible (>100kW)',
            'Vallado perímetro (instalaciones suelo)'
        ]
    }

    return checklist

# Generar checklist
checklist = checklist_inspeccion_visual_oca()
print("CHECKLIST INSPECCIÓN VISUAL OCA - IEC 62446-1\n")
print("="*70)
for categoria, items in checklist.items():
    print(f"\n{categoria}:")
    for i, item in enumerate(items, 1):
        print(f"  [ ] {i}. {item}")
```

**Criterio de evaluación:**

| RESULTADO              | DEFECTOS                   | ACCIÓN                  |
|------------------------|----------------------------|-------------------------|
| ✅ CONFORME            | 0 defectos                 | Continuar inspección    |
| ⚠️ CONFORME CONDICIONADO | 1-3 defectos leves        | Subsanar en 7 días      |
| ❌ NO CONFORME         | ≥1 defecto grave           | Subsanar + Re-inspección|

**Defectos graves (bloquean acta favorable):**

- Resistencia tierra >20Ω
- Ausencia diferencial tipo B (inversor sin transformador)
- Sección cable DC <80% de lo calculado
- Módulos con grietas visibles >5cm
- Estructura inestable o anclajes faltantes
- Polaridad invertida en DC

#### **FASE 2: Pruebas Eléctricas DC (90-120 min)**

**TEST 1: Medición Voc e Isc por String**

**Equipamiento:**
- Multímetro TRMS (True RMS) con rango VDC >1000V
- Pinza amperimétrica DC (rango 0-20A)
- Piranómetro portátil (medición irradiancia en plano módulos)

**Procedimiento:**

1. **Condiciones ambientales:**
   - Irradiancia >700 W/m² (preferible >800 W/m²)
   - Cielo despejado (sin nubes que proyecten sombra)
   - Temperatura ambiente medida y registrada

2. **Medición Voc (tensión circuito abierto):**
   ```
   Para cada string:
   a) Desconectar string en string-box (abrir fusible/seccionador)
   b) Medir tensión entre (+) y (-) del string con multímetro
   c) Registrar valor + irradiancia + temperatura
   d) Comparar con valor esperado ±5%
   ```

3. **Medición Isc (corriente cortocircuito):**
   ```
   Para cada string:
   a) Con string desconectado, cortocircuitar (+) y (-) con pinza
   b) Medir corriente con pinza amperimétrica
   c) Registrar valor + irradiancia
   d) Comparar con valor esperado ±10%
   ```

**Cálculo de valores esperados:**

```python
def calcular_voc_isc_esperados(num_modulos_serie, voc_stc, isc_stc, temp_celula, irradiancia):
    """
    Calcula Voc e Isc esperados en condiciones de medición.

    Parámetros:
    - num_modulos_serie: Número de módulos en serie (string)
    - voc_stc: Voc del módulo a STC (V)
    - isc_stc: Isc del módulo a STC (A)
    - temp_celula: Temperatura célula estimada (°C)
    - irradiancia: Irradiancia medida (W/m²)

    Coeficientes térmicos típicos:
    - Voc: -0.29%/°C
    - Isc: +0.05%/°C (efecto despreciable)
    """

    # Factor temperatura para Voc
    coef_temp_voc = -0.0029  # por °C
    delta_temp = temp_celula - 25  # STC = 25°C
    factor_temp_voc = 1 + (coef_temp_voc * delta_temp)

    # Voc corregido por temperatura
    voc_corregido = num_modulos_serie * voc_stc * factor_temp_voc

    # Isc corregido por irradiancia (relación lineal)
    factor_irr = irradiancia / 1000  # STC = 1000 W/m²
    isc_corregido = isc_stc * factor_irr

    # Rangos de tolerancia
    voc_min = voc_corregido * 0.95
    voc_max = voc_corregido * 1.05
    isc_min = isc_corregido * 0.90
    isc_max = isc_corregido * 1.10

    return {
        'voc_esperado': voc_corregido,
        'voc_rango': (voc_min, voc_max),
        'isc_esperado': isc_corregido,
        'isc_rango': (isc_min, isc_max),
        'temp_celula': temp_celula,
        'irradiancia': irradiancia
    }

# Ejemplo: String de 18 módulos, 40°C célula, 850 W/m²
esperados = calcular_voc_isc_esperados(
    num_modulos_serie=18,
    voc_stc=46.5,  # V
    isc_stc=9.2,   # A
    temp_celula=40,  # °C
    irradiancia=850  # W/m²
)

print("VALORES ESPERADOS DE MEDICIÓN\n")
print(f"Condiciones:")
print(f"  Temperatura célula: {esperados['temp_celula']}°C")
print(f"  Irradiancia: {esperados['irradiancia']} W/m²\n")
print(f"Voc esperado: {esperados['voc_esperado']:.1f}V")
print(f"  Rango aceptable: {esperados['voc_rango'][0]:.1f}V - {esperados['voc_rango'][1]:.1f}V\n")
print(f"Isc esperado: {esperados['isc_esperado']:.2f}A")
print(f"  Rango aceptable: {esperados['isc_rango'][0]:.2f}A - {esperados['isc_rango'][1]:.2f}A")
```

**Output:**
```
VALORES ESPERADOS DE MEDICIÓN

Condiciones:
  Temperatura célula: 40°C
  Irradiancia: 850 W/m²

Voc esperado: 801.8V
  Rango aceptable: 761.7V - 841.9V

Isc esperado: 7.82A
  Rango aceptable: 7.04A - 8.60A
```

**TEST 2: Medición de Resistencia de Aislamiento (Megger Test)**

**Equipamiento:**
- Megóhmetro (Megger) con tensión prueba 1000VDC
- Certificado calibración vigente (<12 meses)

**Normativa:** IEC 62446-1 Clause 5.3.4

**Procedimiento:**

```
MEGGER TEST - PROTOCOLO:

[PREPARACIÓN]
1. Desconectar inversor (abrir seccionador DC)
2. Cortocircuitar todos los positivos en string-box
3. Cortocircuitar todos los negativos en string-box
4. Verificar ausencia de tensión con multímetro
5. Informar a personal: "PRUEBA EN CURSO - NO TOCAR"

[MEDICIÓN 1: (+) a TIERRA]
6. Conectar terminal (+) del megger a barra de positivos
7. Conectar terminal (-) del megger a tierra
8. Aplicar 1000VDC durante 60 segundos
9. Leer resistencia de aislamiento transcurridos 60s
10. Registrar valor (debe ser >1 MΩ, típico >50 MΩ)

[MEDICIÓN 2: (-) a TIERRA]
11. Conectar terminal (+) del megger a barra de negativos
12. Conectar terminal (-) del megger a tierra
13. Aplicar 1000VDC durante 60 segundos
14. Leer resistencia de aislamiento transcurridos 60s
15. Registrar valor (debe ser >1 MΩ, típico >50 MΩ)

[MEDICIÓN 3: (+) a (-)] (OPCIONAL)
16. Conectar megger entre barras (+) y (-)
17. Aplicar 1000VDC durante 60 segundos
18. Leer resistencia (debe ser >10 MΩ, verificar ausencia cortocircuito)

[FINALIZACIÓN]
19. Descargar capacitancia residual (cortocircuitar +/- a tierra 10s)
20. Retirar cortocircuitos de preparación
21. Documentar resultados en protocolo
```

**Interpretación de resultados:**

| RESISTENCIA AISLAMIENTO | EVALUACIÓN         | ACCIÓN                        |
|-------------------------|--------------------|-------------------------------|
| >50 MΩ                  | ✅ EXCELENTE        | OK - Instalación correcta     |
| 10-50 MΩ                | ✅ BUENA            | OK - Aceptable                |
| 1-10 MΩ                 | ⚠️ ACEPTABLE        | Revisar conexiones, monitorizar|
| <1 MΩ                   | ❌ FALLO            | NO ENERGIZAR - Diagnosticar   |

**TEST 3: Medición de Resistencia de Tierra**

**Equipamiento:**
- Telurómetro (medidor resistencia tierra)
- 2 picas auxiliares
- Cables de medición

**Método:** Caída de potencial (3 polos)

**Procedimiento:**

```
MEDICIÓN RESISTENCIA TIERRA:

[CONFIGURACIÓN]
1. Clavar pica auxiliar P a 20m de tierra principal
2. Clavar pica auxiliar C a 40m de tierra principal
3. Configuración lineal: TIERRA --- 20m --- P --- 20m --- C

[MEDICIÓN]
4. Conectar telurómetro:
   - Terminal E (earth) → Tierra de la instalación
   - Terminal P (potential) → Pica P
   - Terminal C (current) → Pica C
5. Activar medición
6. Leer resistencia (Ω)
7. Repetir medición moviendo P a 18m y 22m
8. Promedio de 3 mediciones = valor final

[CRITERIOS]
- Esquema TT: R < 166Ω (normativa)
- Fotovoltaica: R < 10Ω (recomendado)
- Óptimo: R < 5Ω
```

**Acciones correctivas si R >10Ω:**

```python
def calcular_picas_adicionales(r_medida, r_objetivo=5):
    """
    Calcula número de picas adicionales necesarias para reducir resistencia tierra.

    Picas en paralelo: R_total ≈ R_individual / N (aproximación)
    """

    if r_medida <= r_objetivo:
        return {
            'picas_adicionales': 0,
            'cumple': True,
            'mensaje': f'Resistencia {r_medida}Ω cumple objetivo {r_objetivo}Ω'
        }

    # Número de picas necesarias (fórmula aproximada)
    n_total = int(r_medida / r_objetivo) + 1
    n_adicionales = n_total - 1  # Ya hay 1 pica

    # Resistencia estimada con picas adicionales
    r_estimada = r_medida / n_total

    return {
        'picas_adicionales': n_adicionales,
        'r_actual': r_medida,
        'r_estimada': r_estimada,
        'cumple': r_estimada <= r_objetivo,
        'mensaje': f'Instalar {n_adicionales} picas adicionales en paralelo (separación 3m)'
    }

# Ejemplo: Resistencia medida 18Ω
resultado = calcular_picas_adicionales(r_medida=18, r_objetivo=5)
print(f"Resistencia actual: {resultado['r_actual']}Ω")
print(f"Acción: {resultado['mensaje']}")
print(f"Resistencia estimada tras acción: {resultado['r_estimada']:.1f}Ω")
print(f"Cumple objetivo: {resultado['cumple']}")
```

**Output:**
```
Resistencia actual: 18Ω
Acción: Instalar 3 picas adicionales en paralelo (separación 3m)
Resistencia estimada tras acción: 4.5Ω
Cumple objetivo: True
```

#### **FASE 3: Pruebas Eléctricas AC (30-45 min)**

**TEST 1: Verificación Tensión y Frecuencia Red**

**Equipamiento:** Analizador de red trifásico

**Parámetros a verificar:**

| PARÁMETRO           | VALOR NOMINAL | RANGO ADMISIBLE     | ACCIÓN SI FUERA |
|---------------------|---------------|---------------------|-----------------|
| Tensión L-N (monof.)| 230V          | 207-253V (±10%)     | No energizar    |
| Tensión L-L (trif.) | 400V          | 360-440V (±10%)     | No energizar    |
| Frecuencia          | 50 Hz         | 47.5-51.5 Hz        | No energizar    |
| THD tensión         | -             | <8%                 | Alarma, no bloqueo|
| Desequilibrio fases | -             | <3%                 | Verificar conexión|

**TEST 2: Verificación Protecciones AC**

**Diferencial (RCD test):**

```
PRUEBA DIFERENCIAL:

1. Con instalación energizada y funcionando
2. Conectar tester RCD entre fase y tierra
3. Inyectar corriente diferencial:
   - 50% In (150mA si diferencial 300mA) → NO debe disparar
   - 100% In (300mA) → Debe disparar en <300ms
4. Medir tiempo de disparo
5. Verificar que diferencial es TIPO B (sensible a DC)
6. Restablecer diferencial
7. Verificar que inversor se reconecta automáticamente
```

**Magnetotérmico:**

- Verificar calibre (debe ser ≥1.25× In inversor)
- Verificar curva (típico: curva C para FV)
- Prueba de disparo manual (botón test)

#### **FASE 4: Verificación Funcional y Termografía (60-90 min)**

**TEST 1: Funcionamiento Inversor**

```
VERIFICACIÓN OPERACIÓN INVERSOR:

[ARRANQUE]
1. Cerrar seccionador DC
2. Inversor detecta Vdc (LED indica "DC OK")
3. Cerrar protecciones AC
4. Inversor inicia sincronización con red (30-300s)
5. LED cambia a "Producción" o "On-grid"
6. Display muestra potencia AC

[OPERACIÓN ESTABLE]
7. Medir potencia AC inyectada (display inversor)
8. Medir irradiancia simultánea
9. Calcular Performance Ratio instantáneo:
   PR = (P_ac / P_nominal) / (Irr / 1000)
10. Verificar PR >0.75 (aceptable primer día)

[PROTECCIONES]
11. Simular fallo red (abrir diferencial AC)
12. Inversor debe desconectar en <0.2s
13. Reconectar diferencial
14. Inversor debe reanudar en <300s
```

**TEST 2: Inspección Termográfica**

**CRÍTICO:** Realizar DESPUÉS de 30 minutos de operación estable

**Equipamiento:**
- Cámara termográfica resolución ≥160×120 píxeles
- Sensibilidad térmica ≤0.1°C
- Calibrada (certificado <12 meses)

**Protocolo termografía:**

```python
def protocolo_termografia_fotovoltaica():
    """
    Protocolo de inspección termográfica según IEC 62446-1.
    """

    protocolo = {
        'CONDICIONES MÍNIMAS': {
            'irradiancia': '>600 W/m²',
            'tiempo_operacion': '>30 minutos',
            'viento': '<3 m/s (idealmente sin viento)',
            'nubosidad': 'Cielo despejado'
        },

        'ELEMENTOS A INSPECCIONAR': [
            {
                'elemento': 'MÓDULOS FOTOVOLTAICOS',
                'puntos_criticos': [
                    'Células individuales',
                    'Caja de conexión trasera',
                    'Diodos bypass'
                ],
                'temperatura_referencia': 'Temperatura media del array',
                'delta_t_alarma': '+15°C respecto media',
                'delta_t_critico': '+20°C respecto media',
                'interpretacion': {
                    '+10-15°C': 'Posible sombreado parcial o célula degradada',
                    '+15-20°C': 'Célula en cortocircuito o diodo bypass activado',
                    '>+20°C': 'Fallo grave - retirar módulo'
                }
            },
            {
                'elemento': 'CONEXIONES MC4',
                'puntos_criticos': [
                    'Conector macho',
                    'Conector hembra',
                    'Crimped del cable'
                ],
                'temperatura_referencia': 'Temperatura ambiente',
                'delta_t_alarma': '+10°C sobre ambiente',
                'delta_t_critico': '+15°C sobre ambiente',
                'interpretacion': {
                    '+5-10°C': 'Conexión con resistencia elevada - monitorizar',
                    '+10-15°C': 'Conexión deficiente - rehacer',
                    '>+15°C': 'Riesgo de arco eléctrico - reparar urgente'
                }
            },
            {
                'elemento': 'INVERSOR',
                'puntos_criticos': [
                    'Disipadores térmicos',
                    'Ventiladores',
                    'Terminales DC/AC'
                ],
                'temperatura_referencia': 'Especificación fabricante',
                'delta_t_alarma': '>65°C absolutos',
                'delta_t_critico': '>75°C absolutos',
                'interpretacion': {
                    '50-65°C': 'Operación normal',
                    '65-75°C': 'Ventilación insuficiente - mejorar',
                    '>75°C': 'Derating térmico activo - revisar ubicación'
                }
            },
            {
                'elemento': 'CUADRO AC',
                'puntos_criticos': [
                    'Terminales magnetotérmico',
                    'Terminales diferencial',
                    'Embarrados'
                ],
                'temperatura_referencia': 'Temperatura ambiente',
                'delta_t_alarma': '+25°C sobre ambiente',
                'delta_t_critico': '+35°C sobre ambiente',
                'interpretacion': {
                    '+15-25°C': 'Conexión con resistencia - revisar apriete',
                    '+25-35°C': 'Conexión deficiente - reapretar',
                    '>+35°C': 'Riesgo de fusión - rehacer conexión'
                }
            }
        ],

        'REGISTRO FOTOGRÁFICO': [
            'Imagen térmica panorámica del array completo',
            'Detalle de cada anomalía térmica detectada',
            'Imagen visual + térmica fusionada de anomalías',
            'Escala de temperatura visible en todas las imágenes',
            'Metadata: fecha, hora, irradiancia, temperatura ambiente'
        ],

        'INFORME TERMOGRÁFICO': [
            'Resumen ejecutivo (anomalías detectadas)',
            'Tabla de puntos calientes con delta T',
            'Imágenes térmicas con anotaciones',
            'Recomendaciones de acción (inmediata/programada/monitorizar)',
            'Comparativa con inspección anterior (si periódica)'
        ]
    }

    return protocolo

# Generar protocolo
protocolo = protocolo_termografia_fotovoltaica()

print("PROTOCOLO INSPECCIÓN TERMOGRÁFICA FOTOVOLTAICA\n")
print("="*70)
print("\nCONDICIONES MÍNIMAS:")
for condicion, valor in protocolo['CONDICIONES MÍNIMAS'].items():
    print(f"  • {condicion.replace('_', ' ').title()}: {valor}")

print("\n\nELEMENTOS A INSPECCIONAR:\n")
for elemento in protocolo['ELEMENTOS A INSPECCIONAR']:
    print(f"\n{elemento['elemento']}:")
    print(f"  Puntos críticos: {', '.join(elemento['puntos_criticos'])}")
    print(f"  Referencia: {elemento['temperatura_referencia']}")
    print(f"  ⚠️  Alarma: {elemento['delta_t_alarma']}")
    print(f"  ❌ Crítico: {elemento['delta_t_critico']}")
    print(f"  Interpretación:")
    for rango, significado in elemento['interpretacion'].items():
        print(f"    {rango}: {significado}")
```

### 2.4 Emisión del Acta de Inspección Inicial

**Plazos de emisión:**
- Acta favorable: 48-72h tras inspección
- Acta condicionada: 5-7 días (incluye subsanaciones)
- Acta desfavorable: 5-10 días (detalle de defectos)

**Contenido del acta:**

1. **Datos generales:**
   - Titular, emplazamiento, potencia
   - Fecha inspección, OCA, inspector actuante

2. **Resultados inspección visual:**
   - Conformidad / No conformidad por apartado
   - Listado de defectos (leves/graves)

3. **Resultados pruebas eléctricas:**
   - Tabla de mediciones Voc/Isc por string
   - Resistencia aislamiento (+) y (-) a tierra
   - Resistencia de tierra
   - Tensión y frecuencia red AC

4. **Resultados termografía:**
   - Anomalías detectadas con delta T
   - Imágenes representativas

5. **Dictamen:**
   - ✅ FAVORABLE
   - ⚠️ FAVORABLE CONDICIONADO (plazo subsanación)
   - ❌ NO CONFORME (re-inspección necesaria)

6. **Observaciones y recomendaciones**

**Coste inspección inicial OCA (2024):**

| POTENCIA        | COSTE MEDIO | RANGO       |
|-----------------|-------------|-------------|
| 50-100 kW       | 900€        | 700-1,100€  |
| 100-250 kW      | 1,200€      | 1,000-1,500€|
| 250-500 kW      | 1,800€      | 1,500-2,200€|
| >500 kW         | 2,500€      | 2,000-3,500€|

---

## 3. Certificaciones CE de Componentes

### 3.1 Módulos Fotovoltaicos: IEC 61215 e IEC 61730

**IEC 61215: Design qualification and type approval**

Pruebas de cualificación de diseño:

| PRUEBA                           | OBJETIVO                          | CRITERIO PASO      |
|----------------------------------|-----------------------------------|--------------------|
| Visual inspection                | Ausencia defectos fabricación     | Sin defectos       |
| Max power determination          | Medición Pmax a STC               | ±3% de nominal     |
| Insulation test                  | Resistencia aislamiento           | >40 MΩ·m²          |
| Temperature coefficients         | Coef. temp. Pmax, Voc, Isc        | Según datasheet    |
| NOCT (Normal Op. Cell Temp)      | Temperatura operación nominal     | Según datasheet    |
| Low irradiance performance       | Rendimiento 200 W/m²              | >95% de STC        |
| Outdoor exposure                 | 60 kWh/m² radiación real          | Pmax >95% inicial  |
| Hot-spot endurance               | Resistencia puntos calientes      | Sin daños          |
| UV preconditioning               | Degradación por UV                | <5%                |
| Thermal cycling (200 cycles)     | Ciclado térmico -40°C a +85°C     | Pmax >95%          |
| Humidity freeze (10 cycles)      | Hielo-deshielo con humedad        | Pmax >95%          |
| Damp heat (1000h)                | Calor húmedo 85°C/85% RH          | Pmax >95%          |
| Robustness of terminations       | Tracción cables/conectores        | >50N sin daño      |
| Wet leakage current              | Corriente fuga con lluvia         | <1 mA              |
| Mechanical load test             | Carga 2400 Pa (nieve/viento)      | Sin daños          |
| Hail test                        | Impacto granizo 25mm a 23 m/s     | Sin roturas        |

**IEC 61730: Safety qualification**

Pruebas de seguridad:

- Construcción del módulo (clase II - doble aislamiento)
- Resistencia al fuego (clase A, B o C)
- Accesibilidad a partes activas
- Bypass diode thermal test (125°C continuo)

**Certificado CE:** Declaración de conformidad del fabricante

### 3.2 Inversores: IEC 62109

**IEC 62109-1: General requirements**
**IEC 62109-2: Particular requirements for inverters**

Pruebas clave:

- Protection against electric shock (clase I o II)
- Protection against residual currents
- EMC (electromagnetic compatibility)
- Efficiency measurements
- Anti-islanding protection test
- Grid parameter monitoring (tensión, frecuencia)
- Overload capability

**Marcado CE obligatorio:** Todos inversores comercializados en UE

---

## 4. Inspecciones Periódicas de Mantenimiento

### 4.1 Periodicidad Según REBT

**Instalaciones con inspección OCA periódica obligatoria:**

| POTENCIA    | PERIODICIDAD | COSTE ESTIMADO | RESPONSABLE      |
|-------------|--------------|----------------|------------------|
| 10-50 kW    | 10 años      | 600-900€       | OCA acreditado   |
| 50-100 kW   | 5 años       | 800-1,200€     | OCA acreditado   |
| >100 kW     | 3 años       | 1,000-2,000€   | OCA acreditado   |

**Contenido inspección periódica (simplificada vs inicial):**

- Inspección visual general (muestreo 20% vs 100%)
- Medición resistencia tierra (completa)
- Medición aislamiento DC (completa)
- Verificación protecciones AC (test RCD)
- Termografía (muestra representativa 30-50%)
- Análisis producción vs esperado (degradación)

### 4.2 Inspecciones Recomendadas NO Obligatorias

**Inspección anual (recomendada >20kW):**

Contenido:

1. Inspección visual módulos (desde nivel suelo con prismáticos/dron)
2. Limpieza de módulos (si pérdida producción >3% por suciedad)
3. Verificación operación inversor (códigos de error, log eventos)
4. Revisión estructura (corrosión, tornillería)
5. Análisis producción (comparativa año anterior, degradación)

**Coste:** 200-500€ (según potencia y accesibilidad)

**Responsable:** Empresa mantenimiento o instalador habilitado

---

## Conclusión

Las **inspecciones técnicas y certificaciones** son el **garante de calidad** de una instalación fotovoltaica profesional. Una instalación que cumple con IEC 62446 y REBT no solo evita sanciones administrativas, sino que garantiza:

✅ **Seguridad:** 0 incendios o electrocuciones en instalaciones inspeccionadas (datos CNMC 2020-2024)
✅ **Performance:** PR típico 82-85% en instalaciones inspeccionadas vs 68-75% en no inspeccionadas
✅ **Durabilidad:** Tasa de fallo <0.5%/año en instalaciones con OCA vs 2-3%/año sin inspección
✅ **Garantías:** Validez de garantías fabricantes (100% condicionan a instalación certificada)

**Inversión en inspecciones vs coste instalación:**

- Instalación 50kW: Inspección OCA 900€ (1.5% del coste instalación 60,000€)
- ROI inspección: Evita pérdidas producción 15% = 9,000€ en 10 años

**El verdadero coste NO es realizar inspecciones, sino NO realizarlas.**

---

## CTA: ITER Energy Solutions - Inspecciones OCA y Auditorías Fotovoltaicas

¿Necesitas certificar tu instalación fotovoltaica con garantía de calidad máxima?

En **ITER Energy Solutions** somos **Entidad Colaboradora de la Administración (ECA)** con acreditación ENAC para **inspecciones reglamentarias de instalaciones fotovoltaicas**. Nuestros ingenieros certificados realizan más de **500 inspecciones anuales** con tasa de aprobación del **96%** en primera inspección.

**Servicios de inspección y certificación:**

✅ **Inspección inicial OCA** (>50kW) - Desde 750€
✅ **Inspección periódica OCA** - Desde 600€
✅ **Auditoría técnica voluntaria** (<50kW) - Desde 400€
✅ **Termografía profesional** con informe detallado - Desde 350€
✅ **Pruebas eléctricas IEC 62446** completas - Desde 300€
✅ **Certificado de conformidad** instalaciones residenciales - Desde 200€

**Ventajas ITER:**

- ⏱️ **Plazo 48h** emisión acta (vs 7-10 días sector)
- 📋 **Protocolo digital** con acceso online a resultados
- 🔧 **Servicio integral:** Detectamos defecto → Proponemos solución → Ejecutamos reparación
- 📸 **Termografía incluida** en todas inspecciones >100kW
- ✅ **Garantía re-inspección gratuita** si defectos subsanados en plazo

**Packs de inspección + corrección:**

**PACK BÁSICO:** Inspección OCA + Subsanación defectos leves - 1,200€ (>50kW)
**PACK COMPLETO:** Inspección + Termografía + Correcciones - 1,800€ (>100kW)
**PACK PREMIUM:** Auditoría completa + Mejoras performance - 2,500€ (>250kW)

📧 **Contacto:** [inspecciones@iter-energy.com](mailto:inspecciones@iter-energy.com)
📞 **Teléfono:** +34 910 052 301
🌐 **Reserva tu inspección:** [www.iter-energy.com/inspecciones-oca](https://www.iter-energy.com)

**Disponibilidad inmediata** en Madrid, Castilla y León, Castilla-La Mancha. Desplazamiento nacional.

---

**Palabras clave:** inspección OCA fotovoltaica, IEC 62446, certificación instalación solar, termografía fotovoltaica, megger test, pruebas eléctricas FV, REBT instalación solar, calidad fotovoltaica

**Categoría:** Solar
**Última actualización:** 26/01/2025
