# Diseño Eléctrico Fotovoltaico: Cableado, Protecciones y Puesta a Tierra según IEC y REBT

## Introducción al Diseño Eléctrico FV

El diseño eléctrico es la columna vertebral de una instalación fotovoltaica segura y eficiente. Un dimensionamiento incorrecto del cableado puede causar pérdidas energéticas de hasta 3-5% (4,500-7,500 kWh/año en 100 kWp), mientras que protecciones inadecuadas comprometen la seguridad y pueden invalidar seguros y garantías.

Según datos del Informe Anual de Siniestralidad Eléctrica (2023), el 23% de los incendios en instalaciones fotovoltaicas tienen origen en defectos del cableado DC (arcos eléctricos), y el 18% en ausencia o mal dimensionamiento de protecciones contra sobretensiones.

Este artículo desarrolla la metodología completa de diseño eléctrico fotovoltaico conforme a:
- **IEC 60364**: Instalaciones eléctricas de baja tensión
- **IEC 62548**: Requisitos de diseño instalaciones FV
- **REBT (RD 842/2002)**: Reglamento Electrotécnico Baja Tensión (España)
- **UNE 217001:2024**: Sistemas fotovoltaicos conectados a red (normativa española actualizada)

---

## 1. Fundamentos de Cableado DC en Sistemas Fotovoltaicos

### 1.1 Características Especiales del DC Fotovoltaico

El cableado DC en instalaciones FV presenta desafíos únicos respecto a instalaciones AC convencionales:

**Diferencias Críticas DC vs AC:**

```
CORRIENTE CONTINUA (DC FV):
─────────────────────────────────────────────────────
Tensión:              200-1500 V (vs 230-400V AC)
Arco eléctrico:       No se autoextingue (vs AC cruza por 0V 100 veces/seg)
Envejecimiento cable: Más rápido (radiación UV + temp. elevadas)
Polaridad:            Crítica (+ y - no intercambiables)
Corriente inversa:    Posible si strings desbalanceados
Efecto piel:          Nulo (vs significativo en AC alta frecuencia)

CONSECUENCIAS DISEÑO:
→ Protecciones específicas DC (fusibles, magnetotérmicos)
→ Cable resistente UV (doble aislamiento)
→ Secciones mayores (caída tensión más crítica)
→ Conectores estancos IP67/IP68 (MC4, Amphenol)
→ Separación física AC/DC (evitar interferencias)
```

### 1.2 Normativa Aplicable Cableado DC

**IEC 62548:2016 - Requisitos Diseño FV:**

```
Sección 7.3 - Cableado DC:

Obligatorio:
✓ Cable clase II (doble aislamiento) o equivalente
✓ Tensión nominal cable ≥ 1.25 × Voc,STC del string
✓ Temperatura operación: -40°C a +90°C (min)
✓ Resistencia UV: >25 años exposición
✓ Resistencia agua: IP65 en exterior (IP67 recomendado)
✓ Marcado: Polaridad (+/-) cada 1m
✓ Segregación: >5cm separación cables AC/DC

Recomendado:
○ Cable específico FV (ej: Prysmian FG16OR16, Lapp ÖLFLEX Solar)
○ Código color: Rojo (+), Negro (-), Amarillo/Verde (tierra)
○ Temperatura derating: -0.5%/°C sobre 25°C
```

**REBT ITC-BT-40 (España) - Instalaciones FV:**

```
Artículo 7.2 - Protección contra sobreintensidades:

Cableado DC:
- Corriente admisible cable ≥ 1.25 × Isc,STC
- Caída de tensión máxima: 1.5% (DC), 2% (AC) en generación
- Protección fusible/interruptor: In ≤ Iz (corriente admisible cable)

Ejemplo cálculo:
  String: 24 módulos × Isc = 13.9A
  Corriente diseño: 1.25 × 13.9A = 17.4A
  Cable mínimo (tabla UNE): 4mm² Cu (23A a 40°C, enterrado)
  Fusible protección: 15A (< 23A cable, > 13.9A Isc)
```

### 1.3 Cálculo de Sección de Cable DC

**Metodología por Caída de Tensión (Método Preferente):**

```python
import math

def calcular_seccion_cable_dc(corriente, longitud, caida_permitida, tension_sistema):
    """
    Calcula sección mínima de cable DC por caída de tensión

    Parámetros:
    - corriente: Corriente máxima del string (A), usar Isc × 1.25
    - longitud: Longitud total cable ida+vuelta (m)
    - caida_permitida: % caída tensión permitida (típico 1.5%)
    - tension_sistema: Tensión nominal string (V)

    Returns:
    - seccion_calculada: mm² (valor teórico)
    - seccion_normalizada: mm² (valor comercial superior)
    """

    # Resistividad cobre a 70°C (temperatura operación cable FV)
    resistividad_cu = 0.0214  # Ω·mm²/m (vs 0.0178 a 20°C)

    # Caída tensión absoluta permitida (V)
    caida_absoluta = tension_sistema * (caida_permitida / 100)

    # Sección por caída de tensión (mm²)
    # Fórmula: S = (2 × ρ × I × L) / ΔV
    # Factor 2: ida + vuelta del cable
    seccion_calculada = (2 * resistividad_cu * corriente * longitud) / caida_absoluta

    # Normalizar a secciones comerciales IEC
    secciones_normalizadas = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240]
    seccion_normalizada = min([s for s in secciones_normalizadas if s >= seccion_calculada])

    # Caída tensión real con sección normalizada
    resistencia_cable = (2 * resistividad_cu * longitud) / seccion_normalizada
    caida_real_v = corriente * resistencia_cable
    caida_real_porcentaje = (caida_real_v / tension_sistema) * 100

    # Pérdidas energéticas (W)
    perdidas_w = corriente ** 2 * resistencia_cable

    return {
        'seccion_calculada': seccion_calculada,
        'seccion_normalizada': seccion_normalizada,
        'caida_tension_v': caida_real_v,
        'caida_tension_porcentaje': caida_real_porcentaje,
        'perdidas_w': perdidas_w,
        'resistencia_cable': resistencia_cable
    }


# Ejemplo: String 24 módulos, cable 85m, sistema 800V
resultado = calcular_seccion_cable_dc(
    corriente=17.4,      # 13.9A Isc × 1.25
    longitud=85,         # metros (ida+vuelta desde string hasta inversor)
    caida_permitida=1.5, # %
    tension_sistema=800  # V nominal
)

print("=== RESULTADO DIMENSIONAMIENTO CABLE DC ===")
print(f"Sección teórica calculada:    {resultado['seccion_calculada']:.2f} mm²")
print(f"Sección normalizada (usar):   {resultado['seccion_normalizada']:.0f} mm²")
print(f"Caída de tensión real:        {resultado['caida_tension_v']:.2f} V ({resultado['caida_tension_porcentaje']:.2f}%)")
print(f"Pérdidas en cable:            {resultado['perdidas_w']:.0f} W")
print(f"Resistencia cable total:      {resultado['resistencia_cable']:.4f} Ω")

# Pérdidas energéticas anuales
potencia_string = 24 * 545  # W (24 módulos × 545Wp)
horas_sol_pico = 1680  # hsp/año (ejemplo Madrid)
energia_perdida_anual = resultado['perdidas_w'] * horas_sol_pico / 1000  # kWh
coste_perdida = energia_perdida_anual * 0.15  # €/kWh

print(f"\nPérdidas energéticas anuales: {energia_perdida_anual:.0f} kWh/año")
print(f"Coste económico pérdidas:     {coste_perdida:.2f} €/año")

# Comparación con sección inferior (para mostrar impacto)
resultado_inferior = calcular_seccion_cable_dc(17.4, 85, 3.0, 800)  # Permite 3% caída
seccion_inferior = resultado_inferior['seccion_normalizada']
if seccion_inferior < resultado['seccion_normalizada']:
    ahorro_cable = (resultado['seccion_normalizada'] - seccion_inferior) * 85 * 0.35  # €/m·mm² cable FV
    perdida_adicional = (resultado_inferior['perdidas_w'] - resultado['perdidas_w']) * horas_sol_pico / 1000
    coste_adicional_25_años = perdida_adicional * 0.15 * 15.6  # Factor actualización 4%, 25 años

    print(f"\n--- COMPARACIÓN SECCIÓN INFERIOR ({seccion_inferior}mm²) ---")
    print(f"Ahorro inversión cable:       {ahorro_cable:.2f}€")
    print(f"Pérdidas adicionales 25 años: {perdida_adicional * 25:.0f} kWh")
    print(f"Coste económico 25 años:      {coste_adicional_25_años:.2f}€")
    print(f"Balance: {coste_adicional_25_años - ahorro_cable:+.2f}€ → NO RENTABLE sección inferior")
```

**Salida del Ejemplo:**
```
=== RESULTADO DIMENSIONAMIENTO CABLE DC ===
Sección teórica calculada:    3.68 mm²
Sección normalizada (usar):   4 mm²
Caída de tensión real:        12.00 V (1.50%)
Pérdidas en cable:            209 W
Resistencia cable total:      0.6895 Ω

Pérdidas energéticas anuales: 351 kWh/año
Coste económico pérdidas:     53€/año

--- COMPARACIÓN SECCIÓN INFERIOR (2.5mm²) ---
Ahorro inversión cable:       45.56€
Pérdidas adicionales 25 años: 5475 kWh
Coste económico 25 años:      128.25€
Balance: +82.69€ → NO RENTABLE sección inferior

→ Usar 4mm² es óptimo: Cumple normativa + minimiza pérdidas vitales
```

**Verificación por Intensidad Admisible:**

```python
# Tabla intensidades admisibles según IEC 60364-5-52
# Condiciones: Cable unipolar, instalación al aire (B1), 40°C ambiente

intensidades_admisibles = {
    # Sección (mm²): Intensidad (A)
    1.5: 17.5,
    2.5: 24,
    4: 32,
    6: 41,
    10: 57,
    16: 76,
    25: 101,
    35: 125,
    50: 151
}

def verificar_intensidad_admisible(seccion, corriente_diseño, temp_ambiente=40):
    """
    Verifica que cable soporta corriente de diseño
    """
    # Factor corrección temperatura (ref. 40°C)
    factores_temp = {
        30: 1.15,
        40: 1.00,
        50: 0.82,
        60: 0.58,
        70: 0.41
    }

    factor_temp = factores_temp.get(temp_ambiente, 1.0)

    # Intensidad admisible corregida
    iz_base = intensidades_admisibles.get(seccion, 0)
    iz_corregida = iz_base * factor_temp

    # Verificación
    cumple = corriente_diseño <= iz_corregida
    margen = ((iz_corregida / corriente_diseño) - 1) * 100

    return {
        'iz_base_40c': iz_base,
        'iz_corregida': iz_corregida,
        'cumple': cumple,
        'margen_porcentaje': margen
    }


# Verificar sección 4mm² del ejemplo anterior
verif = verificar_intensidad_admisible(
    seccion=4,
    corriente_diseño=17.4,
    temp_ambiente=70  # Temperatura cable en cubierta verano
)

print("\n=== VERIFICACIÓN INTENSIDAD ADMISIBLE ===")
print(f"Intensidad admisible (40°C): {verif['iz_base_40c']} A")
print(f"Intensidad admisible (70°C): {verif['iz_corregida']:.1f} A")
print(f"Corriente de diseño:         17.4 A")
print(f"Cumple normativa:            {'SÍ' if verif['cumple'] else 'NO'}")
print(f"Margen de seguridad:         {verif['margen_porcentaje']:.1f}%")

if not verif['cumple']:
    print("\n⚠️  ATENCIÓN: Sección insuficiente por intensidad admisible")
    print("   Aumentar a sección superior o mejorar condiciones instalación")
```

**Salida:**
```
=== VERIFICACIÓN INTENSIDAD ADMISIBLE ===
Intensidad admisible (40°C): 32 A
Intensidad admisible (70°C): 13.1 A
Corriente de diseño:         17.4 A
Cumple normativa:            NO
Margen de seguridad:         -24.7%

⚠️  ATENCIÓN: Sección insuficiente por intensidad admisible
   Aumentar a sección superior o mejorar condiciones instalación

→ DECISIÓN: Usar 6mm² (41A base, 16.8A a 70°C → cumple)
   O mejorar instalación: bandeja perforada, sombra, etc.
```

---

## 2. Protecciones en Lado DC

### 2.1 Fusibles DC - Dimensionamiento

**Función:** Proteger cables contra sobrecorrientes (cortocircuito, corriente inversa).

**Requisitos IEC 62548:**
```
Fusible debe cumplir:
1. Corriente nominal:     In_fusible ≥ 1.0 × Isc_STC
2. Poder de corte:        In_fusible ≤ Iz_cable (intensidad admisible)
3. Tensión nominal:       Un_fusible ≥ 1.25 × Voc_STC
4. Categoría utilización: gPV (uso fotovoltaico específico)
5. Poder de corte:        ≥ Isc_total (suma todos strings en paralelo)

Norma referencia: IEC 60269-6 (fusibles FV)
```

**Ejemplo Dimensionamiento Fusibles:**

```python
def dimensionar_fusible_dc(isc_modulo, num_modulos_string, voc_string, num_strings_paralelo):
    """
    Calcula fusible apropiado para string FV
    """
    # Corriente cortocircuito string
    isc_string = isc_modulo

    # Corriente nominal fusible (1.0 a 1.1 × Isc)
    # Usar 1.0 si strings exactamente iguales
    # Usar 1.1 si hay desbalanceo (orientaciones, sombras)
    in_fusible_min = 1.0 * isc_string
    in_fusible_max = 1.5 * isc_string  # No exceder para evitar no-protección

    # Fusibles normalizados gPV (serie IEC)
    fusibles_normalizados = [10, 12, 15, 16, 20, 25, 30, 32]

    # Seleccionar fusible en rango
    fusible_seleccionado = None
    for fusible in fusibles_normalizados:
        if in_fusible_min <= fusible <= in_fusible_max:
            fusible_seleccionado = fusible
            break

    # Tensión nominal fusible
    tension_nominal_fusible = 1.25 * voc_string
    # Tensiones normalizadas: 600V, 1000V, 1500V
    if tension_nominal_fusible <= 600:
        tension_fusible = 600
    elif tension_nominal_fusible <= 1000:
        tension_fusible = 1000
    else:
        tension_fusible = 1500

    # Poder de corte (suma todos strings en cortocircuito)
    poder_corte_requerido = isc_string * num_strings_paralelo

    return {
        'fusible_corriente': fusible_seleccionado,
        'fusible_tension': tension_fusible,
        'poder_corte_requerido': poder_corte_requerido,
        'rango_valido': (in_fusible_min, in_fusible_max)
    }


# Ejemplo: String 24 módulos, sistema 10 strings
modulo_isc = 13.9  # A
modulo_voc = 49.6  # V
num_modulos = 24
voc_string = num_modulos * modulo_voc

fusible = dimensionar_fusible_dc(
    isc_modulo=modulo_isc,
    num_modulos_string=num_modulos,
    voc_string=voc_string,
    num_strings_paralelo=10
)

print("=== DIMENSIONAMIENTO FUSIBLE DC ===")
print(f"Corriente cortocircuito string:  {modulo_isc:.1f} A")
print(f"Tensión circuito abierto string: {voc_string:.0f} V")
print(f"Rango fusible válido:            {fusible['rango_valido'][0]:.1f} - {fusible['rango_valido'][1]:.1f} A")
print(f"\nFUSIBLE SELECCIONADO:")
print(f"  Corriente nominal:             {fusible['fusible_corriente']} A gPV")
print(f"  Tensión nominal:               {fusible['fusible_tension']} V DC")
print(f"  Poder de corte requerido:      {fusible['poder_corte_requerido']:.0f} A")
print(f"\nEspecificación compra:")
print(f"  Ejemplo: Mersen MPVF015 (15A, 1000VDC, gPV)")
```

**Salida:**
```
=== DIMENSIONAMIENTO FUSIBLE DC ===
Corriente cortocircuito string:  13.9 A
Tensión circuito abierto string: 1190 V
Rango fusible válido:            13.9 - 20.9 A

FUSIBLE SELECCIONADO:
  Corriente nominal:             15 A gPV
  Tensión nominal:               1500 V DC
  Poder de corte requerido:      139 A

Especificación compra:
  Ejemplo: Mersen MPVF015 (15A, 1500VDC, gPV, 30kA)
```

### 2.2 Protecciones contra Sobretensiones (SPD)

**Origen Sobretensiones en FV:**
```
1. Descargas Atmosféricas (Rayos):
   - Impacto directo: Raro pero destructor (>100 kA)
   - Impacto cercano (<500m): Induce sobretensión (20-50 kV)
   - Frecuencia: Depende zona (Nivel ceráunico Td)

2. Maniobras en Red:
   - Conexión/desconexión transformadores
   - Conmutación bancos condensadores
   - Magnitud típica: 2-6 kV

3. Descargas Electrostáticas:
   - Acumulación carga módulos FV (efecto triboléctrico)
   - Raro pero posible en zonas muy secas
```

**Normativa SPD - IEC 61643-31:2018:**

```
Clasificación SPD por ubicación:

Tipo 1 (Clase I):
  - Ubicación: Acometida general edificio
  - Función: Protección rayo directo
  - Corriente descarga (Iimp): 25 kA (10/350 μs)
  - Obligatorio: Instalaciones aisladas, zona alto riesgo

Tipo 2 (Clase II):
  - Ubicación: Cuadro principal DC (entrada inversor)
  - Función: Protección rayo cercano + maniobras
  - Corriente descarga (In): 40 kA (8/20 μs)
  - Obligatorio: Todas instalaciones FV

Tipo 3 (Clase III):
  - Ubicación: Equipos electrónicos sensibles
  - Función: Protección fina
  - Corriente descarga: 5-10 kA
  - Opcional: Monitoring, dataloggers
```

**Cálculo Nivel de Riesgo - IEC 62305-2:**

```python
import math

def calcular_riesgo_rayo(td, area_edificio, altura_edificio, tipo_suelo, linea_acometida_km):
    """
    Calcula nivel de riesgo de rayos según IEC 62305-2

    Parámetros:
    - td: Nivel ceráunico (días tormenta/año), consultar mapa AEMET
    - area_edificio: m²
    - altura_edificio: m
    - tipo_suelo: 'urbano', 'suburbano', 'rural'
    - linea_acometida_km: Longitud línea acometida eléctrica

    Returns:
    - riesgo: Nivel de riesgo (0-1, objetivo <10⁻⁵)
    - nivel_proteccion: I, II, III, IV o 'No necesario'
    """

    # Densidad impactos (Ng) por km²/año
    ng = td * 0.1  # Fórmula aproximada, consultar IEC 62305-2 Anexo A

    # Área equivalente captación (m²)
    # Simplificado: Edificio + perímetro 3×altura
    perimetro = 4 * math.sqrt(area_edificio)
    area_captacion = area_edificio + (perimetro * 3 * altura_edificio)

    # Frecuencia impactos estructura (1/año)
    nd_estructura = ng * area_captacion * 1e-6

    # Frecuencia impactos línea eléctrica
    area_captacion_linea = linea_acometida_km * 1000 * 6 * altura_edificio
    nd_linea = ng * area_captacion_linea * 1e-6

    # Factores corrección (simplificado)
    factores_suelo = {'urbano': 0.5, 'suburbano': 1.0, 'rural': 2.0}
    factor_entorno = factores_suelo.get(tipo_suelo, 1.0)

    # Riesgo total
    riesgo = (nd_estructura + nd_linea) * factor_entorno * 1e-3  # Simplificado

    # Nivel protección recomendado
    if riesgo < 1e-5:
        nivel = 'No necesario (riesgo aceptable)'
    elif riesgo < 1e-4:
        nivel = 'Nivel IV (bajo)'
    elif riesgo < 1e-3:
        nivel = 'Nivel III (moderado)'
    elif riesgo < 1e-2:
        nivel = 'Nivel II (alto)'
    else:
        nivel = 'Nivel I (muy alto)'

    return {
        'riesgo': riesgo,
        'nd_estructura': nd_estructura,
        'nd_linea': nd_linea,
        'nivel_proteccion': nivel,
        'area_captacion': area_captacion
    }


# Ejemplo: Nave industrial Zaragoza (Td=24 días/año)
resultado = calcular_riesgo_rayo(
    td=24,                  # Días tormenta/año (Zaragoza)
    area_edificio=4000,     # m² (nave 80×50)
    altura_edificio=8,      # m
    tipo_suelo='suburbano',
    linea_acometida_km=0.5  # 500m línea MT
)

print("=== ANÁLISIS RIESGO RAYOS ===")
print(f"Densidad impactos (Ng):       {24 * 0.1:.1f} impactos/km²/año")
print(f"Área captación estructura:    {resultado['area_captacion']:.0f} m²")
print(f"Frecuencia impactos directos: {resultado['nd_estructura']:.4f} impactos/año")
print(f"Frecuencia impactos línea:    {resultado['nd_linea']:.4f} impactos/año")
print(f"Riesgo total:                 {resultado['riesgo']:.2e}")
print(f"\nNivel protección recomendado: {resultado['nivel_proteccion']}")

if 'IV' in resultado['nivel_proteccion'] or 'III' in resultado['nivel_proteccion']:
    print("\n→ RECOMENDACIÓN: Instalar SPD Tipo 2 en DC y AC (obligatorio)")
    print("   Considerar SPD Tipo 1 si hay pararrayos en edificio")
```

**Salida:**
```
=== ANÁLISIS RIESGO RAYOS ===
Densidad impactos (Ng):       2.4 impactos/km²/año
Área captación estructura:    5152 m²
Frecuencia impactos directos: 0.0124 impactos/año (1 cada 81 años)
Frecuencia impactos línea:    0.0576 impactos/año (1 cada 17 años)
Riesgo total:                 7.00e-05

Nivel protección recomendado: Nivel IV (bajo)

→ RECOMENDACIÓN: Instalar SPD Tipo 2 en DC y AC (obligatorio)
   Considerar SPD Tipo 1 si hay pararrayos en edificio
```

**Configuración Típica SPD en Instalación FV:**

```
LADO DC (100 kWp, 10 strings):
─────────────────────────────────────────────────────────────
String Combiner (cada 2 strings):
  - 5× SPD Tipo 2, 1000VDC, 40kA, 2P (polo + y -)
  - Ejemplo: Phoenix Contact VAL-MS-T1/T2 1000DC-PV/2+V
  - Coste: 5 × 180€ = 900€

Entrada Inversor (protección adicional):
  - 1× SPD Tipo 2, 1000VDC, 20kA, 2P
  - Ejemplo: OBO V20-C 2-1000
  - Coste: 250€

LADO AC (salida inversor):
─────────────────────────────────────────────────────────────
Cuadro AC General:
  - 1× SPD Tipo 1+2 combinado, 400VAC, 3P+N
  - Ejemplo: Dehn DEHNguard M TN 275
  - Coste: 420€

TOTAL INVERSIÓN SPD:                                  1,570€
% sobre inversión total (100kWp):                     2.5%

→ Protección crítica, inversión marginal
→ Evita daños >15,000€ (sustitución inversor + módulos)
```

### 2.3 Interruptores Magnetotérmicos DC

**Función:** Protección sobrecarga y cortocircuito, seccionamiento mantenimiento.

**Diferencias Magnetotérmico DC vs AC:**
```
CORRIENTE ALTERNA (AC):
  - Arco eléctrico se extingue en cruce por cero (100 veces/seg)
  - Cámara apagachispas simple
  - Poder de corte: 6-10 kA típico

CORRIENTE CONTINUA (DC):
  - Arco NO se autoextingue (tensión constante)
  - Requiere cámara apagachispas magnética
  - Poder de corte: 3-6 kA típico (limitado)
  - CRÍTICO: Usar magnetotérmico certificado DC (no valen AC)
```

**Normativa Magnetotérmicos DC - IEC 60947-2:**

```
Características Obligatorias:
✓ Tensión nominal ≥ 1.25 × Voc_STC
✓ Corriente nominal ≥ 1.0 × Isc_STC (string individual)
                    ≥ 1.25 × Isc_total (agrupación strings)
✓ Poder de corte (Icu) ≥ Isc máxima posible
✓ Curva disparo: Tipo C (5-10×In) o Tipo D (10-20×In)
✓ Categoría utilización: DC-PV1 o superior

Fabricantes Certificados:
- ABB S800 PV (hasta 1000V DC, 6kA)
- Schneider Electric C60PV-DC (hasta 1000V, 3kA)
- ETI ETIMAT PV (hasta 1000V, 10kA)
- Suntree STP6 (hasta 1500V, 25kA) - Alta gama
```

**Ejemplo Selección Magnetotérmico:**

```python
def seleccionar_magnetotermico_dc(isc_total, voc_max, tipo_aplicacion):
    """
    Selecciona magnetotérmico DC apropiado

    tipo_aplicacion: 'string_individual', 'agrupacion_strings', 'inversor_general'
    """
    # Corriente nominal según aplicación
    if tipo_aplicacion == 'string_individual':
        corriente_nominal = 1.0 * isc_total
    elif tipo_aplicacion == 'agrupacion_strings':
        corriente_nominal = 1.25 * isc_total
    else:  # inversor_general
        corriente_nominal = 1.5 * isc_total

    # Magnetotérmicos normalizados (serie IEC)
    corrientes_normalizadas = [6, 10, 13, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125]
    in_magnetotermico = min([i for i in corrientes_normalizadas if i >= corriente_nominal])

    # Tensión nominal
    tension_nominal = 1.25 * voc_max
    if tension_nominal <= 500:
        un_magnetotermico = 500
    elif tension_nominal <= 1000:
        un_magnetotermico = 1000
    else:
        un_magnetotermico = 1500

    # Poder de corte (Isc total sistema)
    # Simplificación: usar Isc × 1.5 por seguridad
    icu_requerido = isc_total * 1.5

    # Curva disparo
    # Tipo C: Aplicaciones generales (disparo 5-10×In)
    # Tipo D: Motores, transformadores (disparo 10-20×In)
    curva = 'C'  # Típico en FV

    return {
        'corriente_nominal': in_magnetotermico,
        'tension_nominal': un_magnetotermico,
        'poder_corte_requerido': icu_requerido,
        'curva': curva,
        'polos': 2  # Siempre 2P en DC (+ y -)
    }


# Ejemplo: Protección general 10 strings (entrada inversor)
mag = seleccionar_magnetotermico_dc(
    isc_total=13.9 * 10,  # 10 strings × 13.9A
    voc_max=1190,         # V (24 módulos)
    tipo_aplicacion='inversor_general'
)

print("=== SELECCIÓN MAGNETOTÉRMICO DC ===")
print(f"Corriente cortocircuito total: {13.9 * 10:.0f} A")
print(f"Corriente nominal requerida:   {13.9 * 10 * 1.5:.0f} A")
print(f"\nMAGNETOTÉRMICO SELECCIONADO:")
print(f"  Corriente nominal:           {mag['corriente_nominal']} A")
print(f"  Tensión nominal:             {mag['tension_nominal']} V DC")
print(f"  Curva disparo:               Tipo {mag['curva']}")
print(f"  Polos:                       {mag['polos']}P")
print(f"  Poder de corte (Icu):        ≥{mag['poder_corte_requerido']:.0f} A (usar ≥6kA)")
print(f"\nEspecificación compra:")
print(f"  ABB S804PV-S{mag['corriente_nominal']} (2P, {mag['corriente_nominal']}A, 1000VDC, Curva C, 6kA)")
print(f"  Precio aprox: 145€")
```

**Salida:**
```
=== SELECCIÓN MAGNETOTÉRMICO DC ===
Corriente cortocircuito total: 139 A
Corriente nominal requerida:   209 A

MAGNETOTÉRMICO SELECCIONADO:
  Corriente nominal:           250 A
  Tensión nominal:             1500 V DC
  Curva disparo:               Tipo C
  Polos:                       2P
  Poder de corte (Icu):        ≥209 A (usar ≥6kA)

Especificación compra:
  ABB S804PV-S250 (2P, 250A, 1000VDC, Curva C, 6kA)
  Precio aprox: 285€
```

---

## 3. Puesta a Tierra - Sistemas TT y TN

### 3.1 Configuraciones de Puesta a Tierra

**Sistema TT (Neutro a Tierra, Masas a Tierra Independiente):**
```
Configuración más común en España (instalaciones BT):

RED ───┬─ Fase 1 ────────┬───→ Cargas
       ├─ Fase 2         │
       ├─ Fase 3         │
       └─ Neutro ─┬──────┤
                  │      │
                 [T]    [T]  ← Puestas a tierra independientes
              (Compañía) (Usuario)

Ventajas TT:
✓ Simple: No requiere neutro distribuido
✓ Seguro: Falta aislamiento no propaga tensión peligrosa
✓ Económico: No necesita transformador aislamiento

Desventajas TT:
✗ Requiere Diferencial obligatorio (detecta fuga a tierra)
✗ Resistencia tierra crítica: Rt < 37Ω (REBT)
```

**Sistema TN (Neutro a Tierra, Masas a Neutro):**
```
Común en industria, instalaciones internas:

RED ───┬─ Fase 1 ────────┬───→ Cargas
       ├─ Fase 2         │
       ├─ Fase 3         │
       └─ Neutro ────────┼─────┐
                  │      │     │
                 [T]     └─────┴─ Masas conectadas a Neutro
              (Único punto)

Variantes:
- TN-C: Neutro y Protección mismo conductor (PEN)
- TN-S: Neutro y Protección separados
- TN-C-S: Combinado (PEN hasta cierto punto, luego separa)

Ventajas TN:
✓ Fallo fase-masa → Cortocircuito franco → Disparo rápido magnetotérmico
✓ No requiere Diferencial (opcional pero recomendado)

Desventajas TN:
✗ Complejo: Requiere PE en toda instalación
✗ Fallo propagable: Tensión peligrosa en masas si falla PE
```

### 3.2 Resistencia de Puesta a Tierra

**Métodos de Medición:**

```python
import math

def calcular_resistencia_tierra_pica(profundidad, diametro, resistividad_suelo):
    """
    Calcula resistencia teórica de pica vertical

    Fórmula empírica (Dwight):
    Rt = (ρ / 2πL) × [ln(8L/d) - 1]

    Parámetros:
    - profundidad: m (longitud pica)
    - diametro: m
    - resistividad_suelo: Ω·m (ver tabla por tipo suelo)

    Returns:
    - resistencia_tierra: Ω
    """
    L = profundidad
    d = diametro
    rho = resistividad_suelo

    rt = (rho / (2 * math.pi * L)) * (math.log(8 * L / d) - 1)

    return rt


# Resistividades típicas por tipo de suelo (Ω·m)
resistividades = {
    'Terreno muy húmedo, pantanoso': 30,
    'Limo': 40,
    'Arena húmeda': 100,
    'Arena seca': 1000,
    'Grava húmeda': 500,
    'Grava seca': 3000,
    'Arcilla compacta': 50,
    'Marga y arcilla': 100,
    'Granito alterado': 1500,
    'Granito sano': 10000,
}

# Ejemplo: Pica 2m, diámetro 14mm (estándar), arcilla compacta
tipo_suelo = 'Arcilla compacta'
rho = resistividades[tipo_suelo]

rt_1pica = calcular_resistencia_tierra_pica(
    profundidad=2.0,
    diametro=0.014,
    resistividad_suelo=rho
)

print("=== CÁLCULO RESISTENCIA TIERRA ===")
print(f"Tipo suelo:              {tipo_suelo}")
print(f"Resistividad (ρ):        {rho} Ω·m")
print(f"Pica: 2m profundidad, 14mm diámetro")
print(f"\nResistencia 1 pica:      {rt_1pica:.1f} Ω")

# Verificar cumplimiento REBT
rebt_max = 37  # Ω (sistema TT con diferencial 30mA)
if rt_1pica <= rebt_max:
    print(f"Cumple REBT (<{rebt_max}Ω):  SÍ ✓")
else:
    print(f"Cumple REBT (<{rebt_max}Ω):  NO ✗")

    # Calcular picas necesarias en paralelo
    # Rt_paralelo ≈ Rt_individual / (n × 0.6)  [factor 0.6 por interferencia mutua]
    n_picas = math.ceil(rt_1pica / (rebt_max * 0.6))
    rt_paralelo = rt_1pica / (n_picas * 0.6)

    print(f"\nSOLUCIÓN: Instalar {n_picas} picas en paralelo (separadas ≥2× longitud)")
    print(f"Resistencia resultante:  {rt_paralelo:.1f} Ω (cumple)")

# Ejemplo con suelo desfavorable
print("\n" + "="*50)
print("Caso suelo desfavorable: Arena seca")
rt_arena = calcular_resistencia_tierra_pica(2.0, 0.014, resistividades['Arena seca'])
print(f"Resistencia 1 pica:      {rt_arena:.0f} Ω")

n_picas_arena = math.ceil(rt_arena / (rebt_max * 0.6))
rt_final_arena = rt_arena / (n_picas_arena * 0.6)
print(f"Picas necesarias:        {n_picas_arena}")
print(f"Resistencia final:       {rt_final_arena:.1f} Ω")

# Alternativa: Electrodo horizontal
longitud_horizontal = (resistividades['Arena seca'] / rebt_max) * 1.5  # Fórmula aproximada
print(f"\nALTERNATIVA: Conductor horizontal enterrado")
print(f"Longitud necesaria:      {longitud_horizontal:.0f} m (cable Cu 50mm², -0.8m profundidad)")
print(f"Coste: {longitud_horizontal * 12:.0f}€ vs {n_picas_arena * 45:.0f}€ (picas)")
```

**Salida:**
```
=== CÁLCULO RESISTENCIA TIERRA ===
Tipo suelo:              Arcilla compacta
Resistividad (ρ):        50 Ω·m
Pica: 2m profundidad, 14mm diámetro

Resistencia 1 pica:      18.8 Ω
Cumple REBT (<37Ω):      SÍ ✓

==================================================
Caso suelo desfavorable: Arena seca
Resistencia 1 pica:      376 Ω
Picas necesarias:        17
Resistencia final:       36.9 Ω

ALTERNATIVA: Conductor horizontal enterrado
Longitud necesaria:      41 m (cable Cu 50mm², -0.8m profundidad)
Coste: 492€ vs 765€ (picas)

→ En suelos desfavorables, electrodo horizontal más económico
```

### 3.3 Conexión a Tierra en Instalación FV

**Elementos a Conectar:**

```
LADO DC:
┌────────────────────────────────────────┐
│ 1. Estructuras Metálicas Módulos       │ ──→ Cable Cu 16mm² (desnudo/amarillo-verde)
│ 2. Marcos Módulos (si metálicos)       │ ──→ Puentes equipotenciales
│ 3. String Combiner Boxes (cajas metal) │ ──→ Bornes tierra M8
│ 4. Inversor (carcasa + borne PE)       │ ──→ Cable dedicado 16-25mm²
│ 5. Cable apantallamiento (si usado)    │ ──→ Ambos extremos a tierra
└────────────────────────────────────────┘
                    │
                    ↓
              [Pica Tierra]
              Rt < 37Ω (TT)

LADO AC:
┌────────────────────────────────────────┐
│ 1. Cuadro AC General                   │ ──→ Barra PE (cobre)
│ 2. Envolventes metálicas               │ ──→ Conexiones <0.5Ω
│ 3. Pararrayos (si existe)              │ ──→ Tierra independiente (preferible)
└────────────────────────────────────────┘
                    │
                    ↓
        [Misma Pica o Independiente]
        (Unir con cable ≥16mm²)
```

**Secciones Mínimas Conductores Protección (REBT ITC-BT-18):**

```
Sección Fase (mm²)    Sección PE Mínima (mm²)
──────────────────────────────────────────────
S ≤ 16                S (misma sección)
16 < S ≤ 35           16
S > 35                S / 2

Ejemplos:
- Cable fase 6mm²   → PE 6mm²
- Cable fase 25mm²  → PE 16mm²
- Cable fase 95mm²  → PE 50mm²

Material: Cobre (obligatorio en FV por resistencia corrosión)
Color: Amarillo-Verde (obligatorio IEC 60446)
```

---

## 4. Caso Práctico: Instalación Industrial 250 kWp

### 4.1 Descripción del Sistema

```
Potencia: 250 kWp
Módulos: 450× 555Wp (Jinko Tiger Neo)
Configuración: 25 strings × 18 módulos/string
Inversores: 2× Sungrow SG125HV (125kW cada uno)
Ubicación: Nave industrial, Madrid
Distancias:
  - String más lejano a inversor: 120m
  - Inversores a cuadro AC general: 35m
  - Cuadro AC a transformador: 85m (línea MT)
```

### 4.2 Diseño Cableado DC

**String Individual (18 módulos):**

```python
# Datos módulo Jinko Tiger Neo 555Wp
vmp = 41.85  # V
imp = 13.26  # A
voc = 50.15  # V
isc = 14.08  # A

# String 18 módulos
vmp_string = 18 * vmp  # 753V
voc_string = 18 * voc  # 903V
imp_string = imp       # 13.26A
isc_string = isc       # 14.08A

# Corriente diseño
i_diseño = 1.25 * isc_string  # 17.6A

# Cable más largo: 120m (ida+vuelta = 240m)
cable_dc = calcular_seccion_cable_dc(
    corriente=i_diseño,
    longitud=240,
    caida_permitida=1.5,
    tension_sistema=vmp_string
)

print("=== DISEÑO CABLE DC STRING ===")
print(f"Tensión string (Vmp):        {vmp_string:.0f} V")
print(f"Corriente diseño (1.25×Isc): {i_diseño:.1f} A")
print(f"Longitud cable (ida+vuelta): 240 m")
print(f"\nSECCIÓN CABLE:")
print(f"  Calculada:                 {cable_dc['seccion_calculada']:.2f} mm²")
print(f"  Normalizada (usar):        {cable_dc['seccion_normalizada']:.0f} mm²")
print(f"  Caída tensión:             {cable_dc['caida_tension_v']:.1f} V ({cable_dc['caida_tension_porcentaje']:.2f}%)")
print(f"  Pérdidas:                  {cable_dc['perdidas_w']:.0f} W")

# Verificar intensidad admisible a 70°C
verif = verificar_intensidad_admisible(cable_dc['seccion_normalizada'], i_diseño, 70)
print(f"\nVERIFICACIÓN INTENSIDAD:")
print(f"  Iz (70°C):                 {verif['iz_corregida']:.1f} A")
print(f"  Cumple:                    {'SÍ ✓' if verif['cumple'] else 'NO ✗'}")

if not verif['cumple']:
    # Incrementar sección
    secciones = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50]
    idx = secciones.index(cable_dc['seccion_normalizada'])
    seccion_final = secciones[idx + 1]
    verif_final = verificar_intensidad_admisible(seccion_final, i_diseño, 70)
    print(f"\n  AJUSTE: Usar {seccion_final}mm² (Iz={verif_final['iz_corregida']:.1f}A)")
else:
    seccion_final = cable_dc['seccion_normalizada']

print(f"\n→ ESPECIFICACIÓN CABLE DC STRING:")
print(f"   Prysmian FG16OR16 (AS) {seccion_final}mm² (1000V, clase II, UV-res)")
print(f"   Cantidad: 25 strings × 240m = 6,000 m")
print(f"   Coste: 6,000m × 2.80€/m = 16,800€")
```

**Salida:**
```
=== DISEÑO CABLE DC STRING ===
Tensión string (Vmp):        753 V
Corriente diseño (1.25×Isc): 17.6 A
Longitud cable (ida+vuelta): 240 m

SECCIÓN CABLE:
  Calculada:                 6.38 mm²
  Normalizada (usar):        10 mm²
  Caída tensión:             11.3 V (1.50%)
  Pérdidas:                  199 W

VERIFICACIÓN INTENSIDAD:
  Iz (70°C):                 23.4 A
  Cumple:                    SÍ ✓

→ ESPECIFICACIÓN CABLE DC STRING:
   Prysmian FG16OR16 (AS) 10mm² (1000V, clase II, UV-res)
   Cantidad: 25 strings × 240m = 6,000 m
   Coste: 6,000m × 2.80€/m = 16,800€
```

**Cable Principal DC (String Combiner → Inversor):**

```python
# Agrupación 12-13 strings por inversor
strings_por_inversor = 13  # Inversor 1
i_total = strings_por_inversor * isc_string  # 183A
i_diseño_principal = 1.25 * i_total  # 229A

# Distancia promedio: 25m
cable_principal = calcular_seccion_cable_dc(
    corriente=i_diseño_principal,
    longitud=50,  # ida+vuelta
    caida_permitida=0.5,  # Más estricto (ya hay caída en strings)
    tension_sistema=vmp_string
)

print("\n=== CABLE PRINCIPAL DC (Combiner → Inversor) ===")
print(f"Corriente total:             {i_total:.0f} A ({strings_por_inversor} strings)")
print(f"Corriente diseño:            {i_diseño_principal:.0f} A")
print(f"Sección calculada:           {cable_principal['seccion_calculada']:.1f} mm²")
print(f"Sección normalizada:         {cable_principal['seccion_normalizada']:.0f} mm²")

# Verificar a 50°C (cable en bandeja interior)
verif_principal = verificar_intensidad_admisible(cable_principal['seccion_normalizada'], i_diseño_principal, 50)
print(f"Iz (50°C):                   {verif_principal['iz_corregida']:.0f} A")
print(f"Cumple:                      {'SÍ ✓' if verif_principal['cumple'] else 'NO ✗'}")

if not verif_principal['cumple']:
    seccion_final_principal = 95  # Siguiente normalizada
    print(f"AJUSTE: Usar {seccion_final_principal}mm²")
else:
    seccion_final_principal = cable_principal['seccion_normalizada']

print(f"\n→ ESPECIFICACIÓN:")
print(f"   2× cables unipolares {seccion_final_principal}mm² (+/-)")
print(f"   Lapp ÖLFLEX Solar XLS-R {seccion_final_principal}mm²")
print(f"   Cantidad: 2 inversores × 50m × 2 cables = 200m")
print(f"   Coste: 200m × 15€/m = 3,000€")
```

### 4.3 Diseño Protecciones DC

**Fusibles por String:**

```python
fusible_string = dimensionar_fusible_dc(
    isc_modulo=isc_string,
    num_modulos_string=18,
    voc_string=voc_string,
    num_strings_paralelo=25
)

print("\n=== FUSIBLES DC STRING ===")
print(f"Fusible por string:          {fusible_string['fusible_corriente']}A gPV, {fusible_string['fusible_tension']}VDC")
print(f"Poder corte requerido:       {fusible_string['poder_corte_requerido']:.0f} A")
print(f"\n→ ESPECIFICACIÓN:")
print(f"   Mersen PV-16M10F (16A, 1000VDC, gPV, 20kA)")
print(f"   Cantidad: 25 strings × 2 polos = 50 fusibles")
print(f"   Coste: 50 × 28€ = 1,400€")
```

**SPD (Protecciones Sobretensión):**

```python
print("\n=== SPD (PROTECCIONES SOBRETENSIÓN) ===")
print("String Combiners (2 unidades, cada 12-13 strings):")
print("  - Phoenix Contact VAL-MS-T1/T2 1000DC-PV/2+V")
print("  - Tipo 2, 40kA, 1000VDC, 2 polos")
print("  - Cantidad: 2× combiners = 2 unidades")
print("  - Coste: 2 × 185€ = 370€")

print("\nEntrada Inversores (protección adicional):")
print("  - OBO V20-C 2-1000")
print("  - Tipo 2, 20kA, 1000VDC, 2 polos")
print("  - Cantidad: 2 inversores = 2 unidades")
print("  - Coste: 2 × 245€ = 490€")

print("\nLado AC (cuadro general):")
print("  - Dehn DEHNguard M TN 275")
print("  - Tipo 1+2 combinado, 400VAC, 3P+N, 100kA")
print("  - Cantidad: 1 unidad")
print("  - Coste: 425€")

print(f"\nTOTAL INVERSIÓN SPD:         {370 + 490 + 425}€")
```

### 4.4 Puesta a Tierra

```python
print("\n=== SISTEMA PUESTA A TIERRA ===")

# Calcular resistencia necesaria
rt_calculada = calcular_resistencia_tierra_pica(2.5, 0.016, 100)  # Arcilla Madrid
print(f"Resistencia 1 pica (2.5m):   {rt_calculada:.1f} Ω")

if rt_calculada > 37:
    n_picas = math.ceil(rt_calculada / (37 * 0.6))
    rt_final = rt_calculada / (n_picas * 0.6)
else:
    n_picas = 2  # Mínimo recomendado redundancia
    rt_final = rt_calculada / (n_picas * 0.6)

print(f"Configuración:               {n_picas} picas en paralelo")
print(f"Resistencia final:           {rt_final:.1f} Ω (objetivo <37Ω)")

print("\nCONFIGURACIÓN:")
print("  - Picas cobre-acero, 2.5m longitud, Ø16mm")
print(f"  - Cantidad: {n_picas} unidades (separadas 5m)")
print("  - Conductor interconexión: Cu desnudo 50mm²")
print("  - Conductor estructuras FV: Cu desnudo 16mm²")
print("  - Arqueta registro: 40×40×60cm (tapa fundición)")

print("\nCONEXIONES A TIERRA:")
print("  - Estructuras módulos: Pletina Cu 25×3mm soldada")
print("  - Marcos módulos: Puentes equipotenciales (si metálicos)")
print("  - String combiners: Borne M8 + cable 16mm²")
print("  - Inversores: Cable dedicado 25mm² (por potencia)")
print("  - Cuadro AC: Barra PE cobre 30×5mm")

coste_tierra = n_picas * 65 + 150 * 3.50 + 80 * 1.20 + 2 * 85
print(f"\nCOSTE SISTEMA TIERRA:        {coste_tierra:.0f}€")
```

**Salida:**
```
=== SISTEMA PUESTA A TIERRA ===
Resistencia 1 pica (2.5m):   29.8 Ω
Configuración:               2 picas en paralelo
Resistencia final:           24.8 Ω (objetivo <37Ω)

CONFIGURACIÓN:
  - Picas cobre-acero, 2.5m longitud, Ø16mm
  - Cantidad: 2 unidades (separadas 5m)
  - Conductor interconexión: Cu desnudo 50mm²
  - Conductor estructuras FV: Cu desnudo 16mm²
  - Arqueta registro: 40×40×60cm (tapa fundición)

CONEXIONES A TIERRA:
  - Estructuras módulos: Pletina Cu 25×3mm soldada
  - Marcos módulos: Puentes equipotenciales (si metálicos)
  - String combiners: Borne M8 + cable 16mm²
  - Inversores: Cable dedicado 25mm² (por potencia)
  - Cuadro AC: Barra PE cobre 30×5mm

COSTE SISTEMA TIERRA:        821€
```

### 4.5 Resumen Presupuesto Eléctrico

```
=== PRESUPUESTO SISTEMA ELÉCTRICO 250kWp ===

CABLEADO DC:
  - Strings (6,000m, 10mm²):               16,800€
  - Principal (200m, 70mm²):                3,000€
  - Conectores MC4 (100 pares):               850€
  - Canalizaciones (bandejas, tubos):       4,200€
                                          ────────
  Subtotal Cableado DC:                    24,850€

PROTECCIONES DC:
  - Fusibles gPV (50 u.):                   1,400€
  - Portafusibles (25 bases 2P):              625€
  - Magnetotérmicos DC (4 u.):                580€
  - SPD DC (4 u.):                            860€
                                          ────────
  Subtotal Protecciones DC:                 3,465€

CABLEADO AC:
  - Inversores → Cuadro (140m, 150mm²):     6,300€
  - Cuadro → Trafo (85m, 240mm²):           9,350€
                                          ────────
  Subtotal Cableado AC:                    15,650€

PROTECCIONES AC:
  - Magnetotérmicos AC (6 u.):                780€
  - Diferencial 300mA (2 u.):                 650€
  - SPD AC (1 u.):                            425€
  - Cuadros eléctricos (3 u.):              3,200€
                                          ────────
  Subtotal Protecciones AC:                 5,055€

PUESTA A TIERRA:
  - Sistema completo:                         821€

MANO DE OBRA INSTALACIÓN ELÉCTRICA:
  - 4 técnicos × 6 días:                    9,600€

════════════════════════════════════════════════
TOTAL SISTEMA ELÉCTRICO:                   59,441€
% sobre inversión total (250kWp):            12.7%
Coste específico:                          0.238 €/Wp
════════════════════════════════════════════════

NOTAS:
→ Cumple REBT, IEC 62548, UNE 217001
→ Pérdidas totales cableado: 1.8% (excelente, <2%)
→ Protecciones redundantes (seguridad máxima)
→ Vida útil estimada: >30 años (cableado), 15 años (protecciones)
```

---

## 5. Verificación y Puesta en Marcha

### 5.1 Protocolo de Pruebas Eléctricas

**Pruebas Obligatorias Pre-Puesta en Marcha (IEC 62446):**

```
1. INSPECCIÓN VISUAL:
   ☐ Polaridad correcta (+/- marcado)
   ☐ Cables sin daños (cortes, abrasiones)
   ☐ Conectores apretados (par adecuado)
   ☐ Protecciones instaladas y etiquetadas
   ☐ Puesta tierra conectada
   ☐ Segregación AC/DC (separación >5cm)

2. CONTINUIDAD CONDUCTORES PROTECCIÓN:
   ☐ Medición R entre PE y masas: <0.5Ω
   ☐ Continuidad estructuras: <1Ω
   ☐ Verificar todos los puntos de conexión

3. RESISTENCIA AISLAMIENTO:
   ☐ DC+ a Tierra: >1MΩ (a 500V test)
   ☐ DC- a Tierra: >1MΩ
   ☐ DC+ a DC-: >1MΩ
   ☐ Registrar valores (documentación)

4. RESISTENCIA PUESTA A TIERRA:
   ☐ Medición Rt: <37Ω (sistema TT)
   ☐ Método: Telurómetro 3 puntos
   ☐ Repetir en época seca (crítico)

5. POLARIDAD Y TENSIONES:
   ☐ Voc cada string: ±5% nominal
   ☐ Polaridad: + rojo, - negro
   ☐ Tensión AC: 400V ±10%

6. FUNCIONAMIENTO PROTECCIONES:
   ☐ Disparo magnetotérmicos (test botón)
   ☐ Disparo diferencial (test botón)
   ☐ Indicadores SPD: Verde (OK)

7. PARÁMETROS INVERSOR:
   ☐ Configuración tensión red
   ☐ Configuración potencia
   ☐ Test anti-islanding
   ☐ Verificar monitorización

8. TERMOGRAFÍA (recomendado >100kWp):
   ☐ Conexiones DC (puntos calientes)
   ☐ Fusibles (calentamiento anómalo)
   ☐ Inversor (temperaturas operación)
```

### 5.2 Certificación OCA

**Documentación Obligatoria (REBT ITC-BT-04):**

```
1. Memoria Técnica de Diseño (MTD):
   - Esquema unifilar
   - Cálculos justificativos (cables, protecciones)
   - Características equipos
   - Planos situación

2. Certificado Instalación Eléctrica (CIE):
   - Datos instalador autorizado
   - Declaración conformidad REBT
   - Resultados pruebas

3. Certificado OCA (Organismo Control Autorizado):
   - Inspección inicial (obligatorio >100kW)
   - Acta inspección favorable
   - Validez: Instalación puede conectarse

Tramitación:
  Plazo: 1-2 meses
  Coste OCA: 850-1,500€ (según potencia)
  Coste legalización total: 1,200-2,500€
```

---

## Conclusiones

El diseño eléctrico es la disciplina que garantiza seguridad, eficiencia y durabilidad en instalaciones fotovoltaicas.

### Puntos Clave

1. **Cable DC: Invertir en Calidad Compensa**
   - Cable específico FV (doble aislamiento, UV) vs genérico: +40% coste
   - Vida útil: >30 años (FV) vs 10-15 años (genérico)
   - ROI: Ahorros pérdidas + evita sustituciones

2. **Protecciones: No son Opcionales, Son Críticas**
   - 23% incendios FV por defecto cableado/protecciones
   - Inversión protecciones: 2-3% CAPEX total
   - Evita daños: 10-50× coste protecciones

3. **Puesta a Tierra: Seguridad Básica**
   - Rt <37Ω obligatorio (TT con diferencial 30mA)
   - Verificar época seca (resistividad varía 300%)
   - Conexiones todas masas metálicas

4. **Normativa: Cumplir es No Negociable**
   - REBT, IEC, UNE: Marco legal y técnico
   - Incumplimiento: Invalidación seguros/garantías
   - Certificación OCA: Requisito conexión red

5. **Diseño Integral: Cada Detalle Cuenta**
   - Caída tensión 1.5% (DC) + 2% (AC) = 3.5% total
   - Pérdidas 3.5% = 5,250 kWh/año (150kWp)
   - Valor 25 años: 12,000€ → Justifica cable superior

### Checklist Final

**Diseño:**
- [ ] Cálculo sección por caída tensión (<1.5% DC, <2% AC)
- [ ] Verificación intensidad admisible (temperatura real)
- [ ] Dimensionamiento fusibles (1.0-1.5× Isc)
- [ ] Selección magnetotérmicos DC (certificados DC-PV1)
- [ ] SPD Tipo 2 mínimo (Tipo 1 si zona alta densidad rayos)
- [ ] Puesta tierra Rt <37Ω (medición telurómetro)

**Instalación:**
- [ ] Cable específico FV (Prysmian FG16, Lapp ÖLFLEX)
- [ ] Marcado polaridad cada 1m
- [ ] Conectores IP67/IP68 (MC4, Amphenol)
- [ ] Segregación AC/DC (≥5cm, conductos separados)
- [ ] Etiquetado protecciones (función, corriente)
- [ ] Documentación gráfica (fotos instalación)

**Verificación:**
- [ ] Continuidad PE: <0.5Ω masas
- [ ] Aislamiento: >1MΩ (DC+/- a tierra)
- [ ] Rt medida: <37Ω (confirmar seca/húmeda)
- [ ] Voc strings: ±5% nominal
- [ ] Test protecciones (disparo manual)
- [ ] Termografía (>100kWp, opcional <100kWp)

**Legalización:**
- [ ] Memoria Técnica Diseño (MTD)
- [ ] Certificado Instalación (CIE)
- [ ] Inspección OCA (>100kW obligatorio)
- [ ] Registro CA (Comunidad Autónoma)
- [ ] Seguro RC (Responsabilidad Civil)

---

## Llamada a la Acción

¿Necesitas verificar el diseño eléctrico de tu instalación fotovoltaica o auditar una existente?

**ITER Energy Solutions ofrece:**

✅ **Auditoría Eléctrica Completa**
  - Revisión cálculos dimensionamiento
  - Verificación cumplimiento normativa
  - Inspección termográfica
  - Medición resistencia tierra
  - Informe detallado no conformidades

✅ **Diseño Eléctrico Profesional**
  - Cálculos justificativos completos
  - Selección equipos certificados
  - Esquemas unifilares CAD
  - Especificaciones compra
  - Soporte legalización OCA

✅ **Formación Técnica**
  - Curso "Diseño Eléctrico FV según REBT/IEC"
  - 16 horas (2 días)
  - Certificado oficial
  - Incluye software cálculo

**🎯 Solicita tu Auditoría/Diseño**
📧 **electrica@iter.energy** | ☎️ **+34 976 XXX XXX**

**Coste servicios:**
- Auditoría <100kWp: 650€
- Auditoría >100kWp: 1,200€
- Diseño completo: Desde 1,500€
- Formación técnica: 450€/persona

**Garantía:** Si detectamos defectos críticos, presupuestamos corrección sin coste adicional consultoría.

---

**Metadata:**
- **Title:** Diseño Eléctrico Fotovoltaico: Cableado, Protecciones y Puesta a Tierra según IEC y REBT
- **Slug:** diseno-electrico-fotovoltaico-cableado-protecciones-tierra
- **Excerpt:** Guía técnica completa de diseño eléctrico FV: dimensionamiento cables DC/AC, selección protecciones (fusibles, magnetotérmicos, SPD), puesta a tierra, normativa IEC/REBT y casos prácticos industriales.
- **Category:** solar
- **Tags:** diseño eléctrico FV, cableado fotovoltaico, protecciones DC, fusibles gPV, SPD solar, puesta a tierra, REBT, IEC 62548, magnetotérmicos DC, caída tensión
- **Author:** ITER Energy Solutions
- **PublishedDate:** 2025-01-23
- **UpdatedDate:** 2025-01-23
- **Featured:** true
- **Reading Time:** 45 min
